import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { OrdinalNumberPipe } from 'src/app/pipes/ordinal-number.pipe';
import { WaitlistDetailsComponent } from 'src/app/components/waitlist-details/waitlist-details.component';
import { User } from 'src/app/model/user';
import { WaitlistHost } from 'src/app/model/waitlistHost';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTE_NAME_ENQUEUE, ROUTE_NAME_WAITLIST_COMPLETE, ROUTE_PARAM_WAITLIST_CODE } from 'src/app/constants';
import { WaitlistHostService } from 'src/app/services/waitlist-host.service';
import { Subscription, take } from 'rxjs';
import { LocalUserIdService } from 'src/app/services/local-user-id.service';
import { LiveWaitlistService } from 'src/app/services/live-waitlist.service';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationStyle } from 'src/app/model/appNotification';

@Component({
  selector: 'app-waitlist-page',
  standalone: true,
  imports: [CommonModule, FooterComponent, WaitlistDetailsComponent, AlertModalComponent, OrdinalNumberPipe, LogoComponent],
  templateUrl: './waitlist-page.component.html',
  styleUrl: './waitlist-page.component.scss'
})
export class WaitlistPageComponent implements OnInit {
  user: User = new User();
  host: WaitlistHost = new WaitlistHost();
  waitlist: User[];

  isWaitlistOpened = false;
  isLeaveWaitlistModalOpened = false;

  private notified$: Subscription;
  private completed$: Subscription;
  private removed$: Subscription;
  private partyAdded$: Subscription;
  private partyRemoved$: Subscription;
  private waitlistClosed$: Subscription;

  @ViewChild('notificationCard') notificationCardDiv: ElementRef<HTMLDivElement>;

  constructor(private liveWaitlistService: LiveWaitlistService, private waitlistHostService: WaitlistHostService, private localUserIdService: LocalUserIdService, private router: Router, private activatedRoute: ActivatedRoute, private notificationService: NotificationService) {}

  ngOnInit(): void {
    let waitlistCode = this.activatedRoute.snapshot.params[ROUTE_PARAM_WAITLIST_CODE];

    this.waitlistHostService.getWaitlistHost(waitlistCode).pipe(
      take(1)
    ).subscribe({
      next: (hostData) => {
        this.host = hostData;
      }
    });

    this.waitlistHostService.getWaitlistQueue(waitlistCode).pipe(
      take(1)
    ).subscribe({
      next: (hostData) => {
        this.waitlist = hostData;

        let currUser = this.waitlist.find(u => u.userId == this.localUserIdService.getUserId());

        if (currUser)
          this.user = currUser;
      }
    });

    this.notified$ = this.liveWaitlistService.notified.subscribe((data) => { this.onNotified(data) });
    this.completed$ = this.liveWaitlistService.completed.subscribe((data) => { this.onCompleted(data) });
    this.removed$ = this.liveWaitlistService.removed.subscribe((data) => { this.onRemoved(data) });
    this.partyAdded$ = this.liveWaitlistService.partyAdded.subscribe((data) => { this.onPartyAdded(data) });
    this.partyRemoved$ = this.liveWaitlistService.partyRemoved.subscribe((data) => { this.onPartyRemoved(data) });
    this.waitlistClosed$ = this.liveWaitlistService.waitlistClosed.subscribe((data) => { this.onWaitlistClosed(data) });
  }

  hideNotification() {
    this.notificationCardDiv.nativeElement.classList.add('opacity-0');
    setTimeout(() => this.notificationCardDiv.nativeElement.classList.add('hidden'), 700);
  }

  openWaitlist() {
    this.isWaitlistOpened = true;
  }

  confirmLeaveWaitlist() {
    this.isLeaveWaitlistModalOpened = true;
  }

  handleWaitlistClosed() {
    this.isWaitlistOpened = false;
  }

  handleLeaveWaitlistModalCancel() {
    this.isLeaveWaitlistModalOpened = false;
  }

  handleLeaveWaitlistModalConfirm() {
    this.isLeaveWaitlistModalOpened = false;

    this.liveWaitlistService.removeFromWaitlistQueue(this.localUserIdService.getUserId())
      .then(() => this.router.navigate([ROUTE_NAME_ENQUEUE, this.host.waitlistCode]));
  }

  onNotified(data: any) {
    this.notificationService.triggerNotification("Host is waiting!", "The host is calling you! Go check-in.", NotificationStyle.Warning);
  }

  onCompleted(data: any) {
    this.router.navigate([ROUTE_NAME_WAITLIST_COMPLETE, this.host.waitlistCode], {
      queryParams: {
        checkInTime: this.user.checkInTime,
        completedTime: new Date().toISOString()
      }
    });
  }

  onRemoved(data: any) {
    this.router.navigate([ROUTE_NAME_ENQUEUE, this.host.waitlistCode]);
    this.notificationService.triggerNotification("Removed from waitlist", "We're sorry! You have been removed from the waitlist by the host.", NotificationStyle.Danger);
  }

  onPartyAdded(data: User) {
    this.waitlist.push(data);
  }

  onPartyRemoved(data: User) {
    this.removeUser(data.userId);
  }

  onWaitlistClosed(data: any) {
    this.router.navigate([''], { replaceUrl: true });
    this.notificationService.triggerNotification("Waitlist closed!", "We're sorry! The waitlist has been closed by the host.", NotificationStyle.Danger);
  }

  private removeUser(userId: string) {
    let userIndex = this.waitlist.findIndex(u => u.userId === userId);

    if (userIndex !== -1)
    {
      this.waitlist.splice(userIndex, 1);

      for (let i = userIndex; i < this.waitlist.length; i++)
      {
        let user = this.waitlist[i];
        user.currentPosition--;

        if (user.userId == this.localUserIdService.getUserId())
          this.user = user;
      }
    }
  }

  ngOnDestroy() {
    this.notified$.unsubscribe();
    this.completed$.unsubscribe();
    this.removed$.unsubscribe();
    this.partyAdded$.unsubscribe();
    this.partyRemoved$.unsubscribe();
    this.waitlistClosed$.unsubscribe();
  }
}
