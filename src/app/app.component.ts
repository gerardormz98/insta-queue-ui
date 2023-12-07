import { Component, OnDestroy, OnInit } from '@angular/core';
import { LiveWaitlistService } from './services/live-waitlist.service';
import { AppAlert, AppNotification } from './model/appNotification';
import { NotificationService } from './services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  notifications: AppNotification[] = [];
  alert?: AppAlert;

  private appNotified$: Subscription;
  private appAlerted$: Subscription;

  constructor(private liveWaitlistService: LiveWaitlistService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.liveWaitlistService.startConnection();

    this.appNotified$ = this.notificationService.appNotified.subscribe((notification) => { this.onNewNotification(notification) });
    this.appAlerted$ = this.notificationService.appAlerted.subscribe((alert) => { this.onNewAlert(alert) });
  }

  onNewNotification(notification: AppNotification) {
    this.notifications.push(notification);
  }

  onCloseNotification(notification: AppNotification) {
    const notificationIndex = this.notifications.indexOf(notification);
    this.notifications.splice(notificationIndex, 1);
  }

  onNewAlert(alert: AppAlert) {
    this.alert = alert;
  }

  onAlertClosed() {
    this.alert = undefined;
  }

  ngOnDestroy(): void {
    this.appNotified$.unsubscribe();
    this.appAlerted$.unsubscribe();
  }
}
