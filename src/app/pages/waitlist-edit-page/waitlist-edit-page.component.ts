import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordUnmatchValidator } from 'src/app/validators/password-unmatch-validator';
import { WaitlistHostService } from 'src/app/services/waitlist-host.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { LoadingSpinnerComponent } from 'src/app/components/loading-spinner/loading-spinner.component';
import { ROUTE_PARAM_WAITLIST_CODE } from 'src/app/constants';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';
import { WaitlistHostUpdateRequest } from 'src/app/model/DTO/waitlistHostUpdateRequest';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';

@Component({
  selector: 'app-waitlist-edit-page',
  standalone: true,
  imports: [CommonModule, LogoComponent, FooterComponent, ReactiveFormsModule, LoadingSpinnerComponent, AlertModalComponent, BackButtonComponent],
  templateUrl: './waitlist-edit-page.component.html',
  styleUrl: './waitlist-edit-page.component.scss'
})
export class WaitlistEditPageComponent implements OnInit {
  isLoading = false;
  errorMessage = '';
  isCloseWaitlistModalOpened = false;

  txtName = new FormControl('', [Validators.required, Validators.minLength(2)]);
  txtDescription = new FormControl('', [Validators.required, Validators.minLength(20)]);

  txtNameInvalid = () => this.txtName.invalid && this.txtName.dirty && this.txtName.touched;
  txtDescriptionInvalid = () => this.txtDescription.invalid && this.txtDescription.dirty && this.txtDescription.touched;

  createWaitlistForm = new FormGroup({
    name: this.txtName,
    description: this.txtDescription
  }, {
    validators: passwordUnmatchValidator
  });

  constructor(private waitlistHostService: WaitlistHostService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let waitlistCode = this.activatedRoute.snapshot.params[ROUTE_PARAM_WAITLIST_CODE];
    this.isLoading = true;

    this.waitlistHostService.getWaitlistHost(waitlistCode).pipe(take(1)).subscribe({
      next: (hostData) => {
        this.createWaitlistForm.controls.name.setValue(hostData.hostName);
        this.createWaitlistForm.controls.description.setValue(hostData.hostDescription);

        this.isLoading = false;
      }
    });
  }

  handleCloseWaitlistClick() {
    this.isCloseWaitlistModalOpened = true;
  }

  handleCloseWaitlistModalCancel() {
    this.isCloseWaitlistModalOpened = false;
  }

  handleCloseWaitlistModalConfirm() {
    this.isLoading = true;
    let waitlistCode = this.activatedRoute.snapshot.params[ROUTE_PARAM_WAITLIST_CODE];

    this.waitlistHostService.deleteWaitlistHost(waitlistCode).pipe(take(1)).subscribe({
      next: (hostData) => {
        this.router.navigate([''], { replaceUrl: true });
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      }
    });
  }

  updateWaitlist() {
    this.isLoading = true;
    let waitlistCode = this.activatedRoute.snapshot.params[ROUTE_PARAM_WAITLIST_CODE];

    let waitlistHostRequest: WaitlistHostUpdateRequest = {
      hostName: this.txtName.value ?? '',
      hostDescription: this.txtDescription.value ?? '',
    };

    this.waitlistHostService.updateWaitlistHost(waitlistCode, waitlistHostRequest).pipe(take(1)).subscribe({
      next: (response) => {
        this.router.navigate(['waitlist-admin', waitlistCode]);
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      }
    });
  }
}
