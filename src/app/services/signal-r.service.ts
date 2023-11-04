import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl('https://localhost:5001/hub/liveWaitlistHub').build(); // TODO: Change to config
  }

  public startConnection() {
    return this.hubConnection.start();
  }
}
