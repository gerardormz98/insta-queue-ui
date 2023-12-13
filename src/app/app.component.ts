import { Component, OnDestroy, OnInit } from '@angular/core';
import { LiveWaitlistService } from './services/live-waitlist.service';
import { AppAlert, AppNotification } from './model/appNotification';
import { NotificationService } from './services/notification.service';
import { Subscription } from 'rxjs';
import { GuardsCheckEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  notifications: AppNotification[] = [];
  alert?: AppAlert;
  loading = false;
  serverResponded = false;

  private appNotified$: Subscription;
  private appAlerted$: Subscription;

  constructor(private liveWaitlistService: LiveWaitlistService, private notificationService: NotificationService, private router: Router) {}

  ngOnInit(): void {
    this.liveWaitlistService.startConnection();

    this.appNotified$ = this.notificationService.appNotified.subscribe((notification) => { this.onNewNotification(notification) });
    this.appAlerted$ = this.notificationService.appAlerted.subscribe((alert) => { this.onNewAlert(alert) });

    setInterval(() => {
      if (!this.serverResponded) {
        this.loading = true;
      }
    }, 850);

    this.router.events.subscribe(event => {
      if (event instanceof GuardsCheckEnd) {
        this.loading = false;
        this.serverResponded = true;
      }
    });
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
