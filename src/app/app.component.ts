import { Component } from '@angular/core';
import { LiveWaitlistService } from './services/live-waitlist.service';
import { Subscription, catchError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'live-waitlist';
  isLoading = true;
  waitlistSize = 0;
  addedToWaitlist = false;

  private partyAdded$: Subscription;
  private partyRemoved$: Subscription;
  private userAdded$: Subscription;
  private userRemoved$: Subscription;

  constructor(private liveWaitlistService: LiveWaitlistService) {}

  ngOnInit() {
    this.partyAdded$ = this.liveWaitlistService.partyAdded.subscribe((data) => { this.onPartyAdded(data) });
    this.partyRemoved$ = this.liveWaitlistService.partyRemoved.subscribe((data) => { this.onPartyRemoved(data) });
    this.userAdded$ = this.liveWaitlistService.userAdded.subscribe((data) => { this.onUserAdded(data) });
    this.userRemoved$ = this.liveWaitlistService.userRemoved.subscribe((data) => { this.onUserRemoved(data) });

    // this.liveWaitlistService.startConnection()
    //   .then(() => this.liveWaitlistService.printConnectionId())
    //   .catch((err) => console.error(`Error while starting connection.`))
    //   .finally(() => this.isLoading = false);

    this.liveWaitlistService.getWaitlistSize()
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe(
        (value) => { this.waitlistSize = value }
      );
  }

  addToWaitList() {
    this.liveWaitlistService.addToWaitlist('', 1) // TODO: Validate and pass forms values
      .then(() => { this.addedToWaitlist = true; });
  }

  onUserAdded(data: any) {
    this.waitlistSize++;
  }

  onUserRemoved(data: any) {
    if (this.waitlistSize > 0)
      this.waitlistSize--;
  }

  onPartyAdded(data: any) {
    this.waitlistSize++;
  }

  onPartyRemoved(data: any) {
    if (this.waitlistSize > 0)
      this.waitlistSize--;
  }

  ngOnDestroy() {
    this.partyAdded$.unsubscribe();
    this.partyRemoved$.unsubscribe();
    this.userAdded$.unsubscribe();
    this.userRemoved$.unsubscribe();
  }
}
