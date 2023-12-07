import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveWaitlistService } from '../../services/live-waitlist.service';
import { Subscription, take } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from 'src/app/components/loading-spinner/loading-spinner.component';
import { WaitlistHost } from 'src/app/model/waitlistHost';
import { ROUTE_PARAM_WAITLIST_CODE, ROUTE_NAME_WAITLIST } from 'src/app/constants';
import { WaitlistHostService } from 'src/app/services/waitlist-host.service';
import { LocalUserIdService } from 'src/app/services/local-user-id.service';
import { User } from 'src/app/model/user';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationStyle } from 'src/app/model/appNotification';

@Component({
  selector: 'app-enqueue-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FooterComponent, LoadingSpinnerComponent, LogoComponent, BackButtonComponent],
  templateUrl: './enqueue-page.component.html',
  styleUrl: './enqueue-page.component.scss'
})
export class EnqueuePageComponent implements OnDestroy {
  host: WaitlistHost;
  isLoading = false;
  addedToWaitlist = false;

  name = '';
  partySize: number = 1;

  private partyAdded$: Subscription;
  private partyRemoved$: Subscription;
  private waitlistClosed$: Subscription;

  constructor(private liveWaitlistService: LiveWaitlistService, private waitlistHostService: WaitlistHostService, private localUserIdService: LocalUserIdService, private activatedRoute: ActivatedRoute, private router: Router, private notificationService: NotificationService) {}

  ngOnInit() {
    let waitlistCode = this.activatedRoute.snapshot.params[ROUTE_PARAM_WAITLIST_CODE];

    this.waitlistHostService.getWaitlistHost(waitlistCode).pipe(take(1)).subscribe({
      next: (hostData) => {
        this.host = hostData;
      }
    });

    this.liveWaitlistService.connectionStarted.pipe(take(2)).subscribe({
      next: (isConnectionStarted) => {
        if (isConnectionStarted)
          this.liveWaitlistService.addToGroup(this.localUserIdService.getUserId(), waitlistCode);
      }
    });

    this.partyAdded$ = this.liveWaitlistService.partyAdded.subscribe((data) => { this.onPartyAdded(data) });
    this.partyRemoved$ = this.liveWaitlistService.partyRemoved.subscribe((data) => { this.onPartyRemoved(data) });
    this.waitlistClosed$ = this.liveWaitlistService.waitlistClosed.subscribe((data) => { this.onWaitlistClosed(data) });
  }

  isEnqueueFormValid() {
    if (this.name.trim().length === 0)
      return false;

    if (this.partySize <= 0)
      return false;

    return true;
  }

  addToWaitlistQueue() {
    if (this.isEnqueueFormValid()) {
      this.isLoading = true;

      this.liveWaitlistService.addToWaitlistQueue(this.host.waitlistCode, this.localUserIdService.getUserId(), this.name, this.partySize)
        .then(() => {
          this.addedToWaitlist = true;
          this.router.navigate([ROUTE_NAME_WAITLIST, this.host.waitlistCode]);
        })
        .catch((err) => {
          console.error(err);
          this.isLoading = false;
        });
    }
  }

  onPartyAdded(data: User) {
    this.host.size++;
  }

  onPartyRemoved(data: User) {
    if (this.host.size > 0)
      this.host.size--;
  }

  onWaitlistClosed(data: any) {
    this.router.navigate([''], { replaceUrl: true });
    this.notificationService.triggerNotification("Waitlist closed!", "We're sorry! The waitlist has been closed by the host.", NotificationStyle.Danger);
  }

  ngOnDestroy() {
    this.partyAdded$.unsubscribe();
    this.partyRemoved$.unsubscribe();
    this.waitlistClosed$.unsubscribe();

    if (!this.addedToWaitlist) {
      let waitlistCode = this.activatedRoute.snapshot.params[ROUTE_PARAM_WAITLIST_CODE];
      this.liveWaitlistService.removeFromGroup(this.localUserIdService.getUserId(), waitlistCode);
    }
  }
}
