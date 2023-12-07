import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { LoadingSpinnerComponent } from 'src/app/components/loading-spinner/loading-spinner.component';
import { WaitlistHostService } from 'src/app/services/waitlist-host.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FooterComponent, LoadingSpinnerComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('txtWaitlistCode') txtWaitlistCode: ElementRef<HTMLInputElement>;

  waitlistCode: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  private getWaitlistHost$: Subscription;

  constructor(private router: Router, private waitlistHostService: WaitlistHostService) { }

  ngAfterViewInit(): void {
    this.txtWaitlistCode.nativeElement.focus();
  }

  formatWaitlist() {
    this.waitlistCode = this.waitlistCode.trim().replaceAll(' ', '').toUpperCase();
    this.errorMessage = '';
  }

  handleValidateClick() {
    this.isLoading = true;

    if (this.getWaitlistHost$) {
      this.getWaitlistHost$.unsubscribe();
    }

    this.getWaitlistHost$ = this.waitlistHostService.getWaitlistHost(this.waitlistCode).subscribe({
      next: (data) => {
        this.router.navigate(['enqueue', this.waitlistCode]);
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = "The waitlist code doesn't exist";
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy(): void {
    if (this.getWaitlistHost$) this.getWaitlistHost$.unsubscribe();
  }
}
