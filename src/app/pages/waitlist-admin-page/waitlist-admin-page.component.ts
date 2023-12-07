import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { WaitlistHostService } from 'src/app/services/waitlist-host.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTE_NAME_ADMIN_ACCESS, ROUTE_NAME_ENQUEUE, ROUTE_NAME_WAITLIST_EDIT, ROUTE_PARAM_WAITLIST_CODE } from 'src/app/constants';
import { WaitlistHost } from 'src/app/model/waitlistHost';
import { Subscription, take } from 'rxjs';
import { User } from 'src/app/model/user';
import { WaitlistUserCardComponent } from 'src/app/components/waitlist-user-card/waitlist-user-card.component';
import { LiveWaitlistService } from 'src/app/services/live-waitlist.service';
import { LocalUserIdService } from 'src/app/services/local-user-id.service';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { NotificationStyle } from 'src/app/model/appNotification';
import { NotificationService } from 'src/app/services/notification.service';
import { QrModalComponent } from 'src/app/components/qr-modal/qr-modal.component';

@Component({
  selector: 'app-waitlist-admin-page',
  standalone: true,
  imports: [CommonModule, FooterComponent, WaitlistUserCardComponent, AlertModalComponent, LogoComponent, QrModalComponent],
  templateUrl: './waitlist-admin-page.component.html',
  styleUrl: './waitlist-admin-page.component.scss'
})
export class WaitlistAdminPageComponent implements OnInit, OnDestroy {
  host: WaitlistHost;
  waitlistCode: string;
  waitlist: User[] = [];
  selectedUser: User;
  enqueueUrl: string = "";

  isRemoveUserAlertModalVisible = false;
  isCompleteUserAlertModalVisible = false;
  isNotifyUserAlertModalVisible = false;
  isQRAlertModalVisible = false;

  private partyAdded$: Subscription;
  private partyRemoved$: Subscription;
  private waitlistClosed$: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private waitlistHostService: WaitlistHostService, private liveWaitlistService: LiveWaitlistService, private localUserIdService: LocalUserIdService, private router: Router, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.waitlistCode = this.activatedRoute.snapshot.params[ROUTE_PARAM_WAITLIST_CODE];

    const urlTree = this.router.createUrlTree([ROUTE_NAME_ENQUEUE, this.waitlistCode]);
    const url = this.router.serializeUrl(urlTree);
    const protocol = window.location.protocol;
    const hostname = location.hostname;
    const port = location.port ? `:${location.port}` : '';
    this.enqueueUrl = `${protocol}//${hostname}${url}`;

    this.waitlistHostService.getWaitlistHost(this.waitlistCode).pipe(take(1)).subscribe({
      next: (hostData) => {
        this.host = hostData;
      }
    });

    this.waitlistHostService.getWaitlistQueue(this.waitlistCode).pipe(take(1)).subscribe({
      next: (usersInWaitlist) => {
        this.waitlist = usersInWaitlist;
      }
    });

    this.liveWaitlistService.connectionStarted.pipe(take(2)).subscribe({
      next: (isConnectionStarted) => {
        if (isConnectionStarted)
          this.liveWaitlistService.addToGroup(this.localUserIdService.getUserId(), this.waitlistCode);
      }
    });

    this.partyAdded$ = this.liveWaitlistService.partyAdded.subscribe((data) => { this.onPartyAdded(data) });
    this.partyRemoved$ = this.liveWaitlistService.partyRemoved.subscribe((data) => { this.onPartyRemoved(data) });
    this.waitlistClosed$ = this.liveWaitlistService.waitlistClosed.subscribe((data) => { this.onWaitlistClosed(data) });
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
      }
    }
  }

  onPartyAdded(data: User) {
    this.waitlist.push(data);
  }

  onPartyRemoved(data: User) {
    this.removeUser(data.userId);
  }

  onWaitlistClosed(data: any) {
    this.router.navigate([''], { replaceUrl: true });
    this.notificationService.triggerNotification("Waitlist closed!", "We're sorry! The waitlist has been closed by another administrator.", NotificationStyle.Danger);
  }

  handleNotifyUserClick(user: User) {
    this.selectedUser = user;
    this.isNotifyUserAlertModalVisible = true;
  }

  handleCompleteUserClick(user: User) {
    this.selectedUser = user;
    this.isCompleteUserAlertModalVisible = true;
  }

  handleRemoveUserClick(user: User) {
    this.selectedUser = user;
    this.isRemoveUserAlertModalVisible = true;
  }

  handleEditWaitlistClick() {
    this.router.navigate([ROUTE_NAME_WAITLIST_EDIT, this.host.waitlistCode]);
  }

  handleQRClick() {
    this.isQRAlertModalVisible = true;
  }

  // Alert handlers

  handleNotifyUserModalCancel() {
    this.isNotifyUserAlertModalVisible = false;
  }

  handleNotifyUserModalConfirm() {
    this.liveWaitlistService.adminNotifyUser(this.selectedUser.userId).then(() => {
      this.selectedUser.notifyCount++;
      this.isNotifyUserAlertModalVisible = false;
    })
    .catch((err) => {
      console.error(err);
      this.router.navigate([ROUTE_NAME_ADMIN_ACCESS, this.host.waitlistCode]);
    });
  }

  handleCompleteUserModalCancel() {
    this.isCompleteUserAlertModalVisible = false;
  }

  handleCompleteUserModalConfirm() {
    this.liveWaitlistService.adminCompleteUser(this.selectedUser.userId).then(() => {
      this.removeUser(this.selectedUser.userId);
      this.isCompleteUserAlertModalVisible = false;
    })
    .catch((err) => {
      console.error(err);
      this.router.navigate([ROUTE_NAME_ADMIN_ACCESS, this.host.waitlistCode]);
    });
  }

  handleRemoveUserModalCancel() {
    this.isRemoveUserAlertModalVisible = false;
  }

  handleRemoveUserModalConfirm() {
    this.liveWaitlistService.adminRemoveFromWaitlistQueue(this.selectedUser.userId).then(() => {
      this.removeUser(this.selectedUser.userId);
      this.isRemoveUserAlertModalVisible = false;
    })
    .catch((err) => {
      console.error(err);
      this.router.navigate([ROUTE_NAME_ADMIN_ACCESS, this.host.waitlistCode]);
    });
  }

  handleQRModalClose() {
    this.isQRAlertModalVisible = false;
  }

  ngOnDestroy() {
    this.partyAdded$.unsubscribe();
    this.partyRemoved$.unsubscribe();
    this.waitlistClosed$.unsubscribe();
  }
}
