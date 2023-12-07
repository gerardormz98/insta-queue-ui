import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordUnmatchValidator } from 'src/app/validators/password-unmatch-validator';
import { LoadingSpinnerComponent } from 'src/app/components/loading-spinner/loading-spinner.component';
import { passwordWeakValidator } from 'src/app/validators/password-weak-validator';
import { WaitlistHostService } from 'src/app/services/waitlist-host.service';
import { WaitlistHostCreateRequest } from 'src/app/model/DTO/waitlistHostCreateRequest';
import { take } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';

@Component({
  selector: 'app-create-waitlist-page',
  standalone: true,
  imports: [CommonModule, FooterComponent, RouterModule, ReactiveFormsModule, LoadingSpinnerComponent, LogoComponent, BackButtonComponent],
  templateUrl: './create-waitlist-page.component.html',
  styleUrl: './create-waitlist-page.component.scss'
})
export class CreateWaitlistPageComponent {
  isLoading = false;
  errorMessage = '';

  txtName = new FormControl('', [Validators.required, Validators.minLength(2)]);
  txtDescription = new FormControl('', [Validators.required, Validators.minLength(20)]);
  txtPassword = new FormControl('', [Validators.required, Validators.minLength(6), passwordWeakValidator]);
  txtConfirmPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);

  txtNameInvalid = () => this.txtName.invalid && this.txtName.dirty && this.txtName.touched;
  txtDescriptionInvalid = () => this.txtDescription.invalid && this.txtDescription.dirty && this.txtDescription.touched;
  txtPasswordInvalid = () => this.txtPassword.invalid && this.txtPassword.dirty && this.txtPassword.touched;
  txtConfirmPasswordInvalid = () => this.txtConfirmPassword.invalid && this.txtConfirmPassword.dirty && this.txtConfirmPassword.touched;
  passwordsUnmatch = () => this.createWaitlistForm.errors?.['passwordUnmatch'] && this.txtPassword.dirty && this.txtPassword.touched && this.txtConfirmPassword.dirty && this.txtConfirmPassword.touched;

  createWaitlistForm = new FormGroup({
    name: this.txtName,
    description: this.txtDescription,
    password: this.txtPassword,
    confirmPassword: this.txtConfirmPassword
  }, {
    validators: passwordUnmatchValidator
  });

  constructor(private waitlistHostService: WaitlistHostService, private router: Router, private loginService: LoginService) { }

  createWaitlist() {
    this.isLoading = true;

    let waitlistHostRequest: WaitlistHostCreateRequest = {
      hostName: this.txtName.value ?? '',
      hostDescription: this.txtDescription.value ?? '',
      password: this.txtPassword.value ?? ''
    };

    this.waitlistHostService.createWaitlistHost(waitlistHostRequest).pipe(take(1)).subscribe({
      next: (response) => {
        const code = response.waitlistCode;
        this.loginService.tryLoginAsAdmin(code, waitlistHostRequest.password).pipe(take(1)).subscribe(() => {
          this.router.navigate(['waitlist-admin', code]);
        });
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      }
    });
  }
}
