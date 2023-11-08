import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class LiveWaitlistService {
  private connection: HubConnection;
  private readonly baseUrl = 'http://localhost:5252';

  partyAdded = new Subject<any>();
  partyRemoved = new Subject<any>();
  userAdded = new Subject<any>();
  userRemoved = new Subject<any>();

  constructor(private httpClient: HttpClient) {
    this.connection = new HubConnectionBuilder().withUrl(`${this.baseUrl}/hubs/live-waitlist`).build(); // TODO: Change to config

    this.connection.on("UserAdded", data => this.onUserAdded(data));
    this.connection.on("UserRemoved", data => this.onUserRemoved(data));
    this.connection.on("PartyAdded", data => this.onPartyAdded(data));
    this.connection.on("PartyRemoved", data => this.onPartyRemoved(data));
  }

  public startConnection() {
    return this.connection.start();
  }

  public getWaitlistSize() {
    return this.httpClient.get<number>(`${this.baseUrl}/api/waitlist/size`);
  }

  public addToWaitlist(name: string, partyNumber: number) {
    return this.connection.invoke("AddToWaitlist", "Test", 1);
  }

  private onUserAdded(data: any) {
    console.log(data);
    this.userAdded.next(data);
  }

  private onUserRemoved(data: any) {
    console.log(data);
    this.userRemoved.next(data);
  }

  private onPartyAdded(data: any) {
    console.log(data);
    this.partyAdded.next(data);
  }

  private onPartyRemoved(data: any) {
    console.log(data);
    this.partyRemoved.next(data);
  }
}
