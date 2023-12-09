import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { LocalUserIdService } from './local-user-id.service';
import { LoginService } from './login.service';
import { NotificationService } from './notification.service';
import { NotificationStyle } from '../model/appNotification';

@Injectable({
  providedIn: 'root'
})
export class LiveWaitlistService {
  private connection: HubConnection;
  private readonly baseUrl = `${environment.apiBaseUrl}/hubs`

  connectionStarted = new BehaviorSubject<boolean>(false);

  notified = new Subject<any>();
  completed = new Subject<any>();
  removed = new Subject<any>();
  partyAdded = new Subject<any>();
  partyRemoved = new Subject<any>();
  waitlistClosed = new Subject<any>();
  waitlistFullError = new Subject<any>();

  constructor(private userIdService: LocalUserIdService, private loginService: LoginService, private notificationService: NotificationService) {
    this.connection = new HubConnectionBuilder().withUrl(`${this.baseUrl}/live-waitlist`, { accessTokenFactory: () => this.loginService.getToken() ?? '' }).withAutomaticReconnect([1000, 2000, 4000, 8000, 16000, 32000]).build();

    this.connection.serverTimeoutInMilliseconds = 15000;

    this.connection.on("OnNotified", data => this.onNotified(data));
    this.connection.on("OnCompleted", data => this.onCompleted(data));
    this.connection.on("OnRemoved", data => this.onRemoved(data));
    this.connection.on("OnPartyAdded", data => this.onPartyAdded(data));
    this.connection.on("OnPartyRemoved", data => this.onPartyRemoved(data));
    this.connection.on("OnWaitlistClosed", data => this.onWaitlistClosed(data));
    this.connection.on("OnWaitlistFullError", data => this.onWaitlistFullError(data));

    this.connection.onclose(() => this.onConnectionLost());
    this.connection.onreconnecting(() => this.onReconnecting());
    this.connection.onreconnected(() => this.onReconnected());
  }

  public startConnection() {
    return this.connection.start().then(() => {
      this.connectionStarted.next(true);
      this.addOrUpdateUserMapping(this.userIdService.getUserId());
    });
  }

  public addOrUpdateUserMapping(userId: string) {
    return this.connection.invoke("AddOrUpdateUserMapping", userId);
  }

  public addToGroup(userId: string, waitlistCode: string) {
    return this.connection.invoke("AddToGroup", userId, waitlistCode);
  }

  public removeFromGroup(userId: string, waitlistCode: string) {
    return this.connection.invoke("RemoveFromGroup", userId, waitlistCode);
  }

  public addToWaitlistQueue(waitlistCode: string, userId: string, name: string, partyNumber: number) {
    return this.connection.invoke("AddToWaitlistQueue", waitlistCode, userId, name, partyNumber);
  }

  public removeFromWaitlistQueue(userId: string) {
    return this.connection.invoke("RemoveFromWaitlistQueue", userId);
  }

  public adminRemoveFromWaitlistQueue(userId: string) {
    return this.connection.invoke("Admin_RemoveFromWaitlistQueue", userId);
  }

  public adminCompleteUser(userId: string) {
    return this.connection.invoke("Admin_CompleteUser", userId);
  }

  public adminNotifyUser(userId: string) {
    return this.connection.invoke("Admin_NotifyUser", userId);
  }

  // Events from Hub

  private onNotified(data: any) {
    this.notified.next(data);
  }

  private onCompleted(data: any) {
    this.completed.next(data);
  }

  private onRemoved(data: any) {
    this.removed.next(data);
  }

  private onPartyAdded(data: any) {
    this.partyAdded.next(data);
  }

  private onPartyRemoved(data: any) {
    this.partyRemoved.next(data);
  }

  private onWaitlistClosed(data: any) {
    this.waitlistClosed.next(data);
  }

  private onWaitlistFullError(data: any) {
    this.waitlistFullError.next(data);
  }

  private onConnectionLost() {
    this.notificationService.triggerAlert("You are disconnected. Refresh the page to reconnect.", NotificationStyle.Danger);
  }

  private onReconnecting() {
    this.notificationService.triggerAlert("Connection lost, trying to reconnect...", NotificationStyle.Warning);
  }

  private onReconnected() {
    this.notificationService.triggerAlert("Reconnected!", NotificationStyle.Success);
    this.addOrUpdateUserMapping(this.userIdService.getUserId());
  }
}
