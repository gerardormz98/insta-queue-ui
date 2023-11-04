import { Component } from '@angular/core';
import { SignalRService } from './services/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'live-waitlist';
  isLoading: boolean = true;

  constructor(private signalRService: SignalRService) {}

  ngOnInit() {
    this.signalRService.startConnection()
    .then(() => console.log('Connection started'))
    .catch((err) => console.error(`Error while starting connection.`))
    .finally(() => this.isLoading = false);
  }
}
