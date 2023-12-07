import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from 'src/app/components/loading-spinner/loading-spinner.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTE_PARAM_WAITLIST_CODE } from 'src/app/constants';
import { WaitlistHostService } from 'src/app/services/waitlist-host.service';
import { take } from 'rxjs';
import { WaitlistHost } from 'src/app/model/waitlistHost';
import { FormsModule } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';

@Component({
  selector: 'app-admin-access-page',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent, FooterComponent, FormsModule, LogoComponent, BackButtonComponent],
  templateUrl: './admin-access-page.component.html',
  styleUrl: './admin-access-page.component.scss'
})
export class AdminAccessPageComponent implements OnInit, AfterViewInit {
  @ViewChild('txtPassword') txtPassword: ElementRef<HTMLInputElement>;

  errorMessage = "";
  isLoading = false;
  password = "";
  host: WaitlistHost;

  constructor(private activatedRoute: ActivatedRoute, private waitlistHostService: WaitlistHostService, private loginService: LoginService, private router: Router) {}

  ngAfterViewInit(): void {
    this.txtPassword.nativeElement.focus();
  }

  ngOnInit(): void {
    let waitlistCode = this.activatedRoute.snapshot.params[ROUTE_PARAM_WAITLIST_CODE];

    this.waitlistHostService.getWaitlistHost(waitlistCode).pipe(take(1)).subscribe({
      next: (hostData) => {
        this.host = hostData;
      }
    });
  }

  handleAccessClick() {
    this.isLoading = true;

    this.loginService.tryLoginAsAdmin(this.host.waitlistCode, this.password).pipe(take(1)).subscribe({
      next: (data) => {
        this.router.navigate(['waitlist-admin', this.host.waitlistCode], { replaceUrl: true });
      },
      error: (err) => {
        this.errorMessage = "The password is not correct.";
        this.isLoading = false;
      }
    });
  }
}
