import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/model/user';
import * as moment from 'moment';
import { LiveWaitlistService } from 'src/app/services/live-waitlist.service';

@Component({
  selector: 'app-waitlist-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './waitlist-user-card.component.html',
  styleUrl: './waitlist-user-card.component.scss'
})
export class WaitlistUserCardComponent {
  @Input() user: User;

  @Output() notifyClicked = new EventEmitter<void>();
  @Output() completeClicked = new EventEmitter<void>();
  @Output() removeClicked = new EventEmitter<void>();

  getCheckInTimeAgo() {
    if (moment().diff(this.user.checkInTime, 'hours') > 0)
      return moment().diff(this.user.checkInTime, 'hours') + " h";

    return moment().diff(this.user.checkInTime, 'minutes') + " m";
  }

  notifyClick() {
    this.notifyClicked.emit();
  }

  completeClick() {
    this.completeClicked.emit();
  }

  removeClick() {
    this.removeClicked.emit();
  }
}
