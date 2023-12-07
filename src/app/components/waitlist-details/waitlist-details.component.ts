import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/model/user';
import * as moment from 'moment';

@Component({
  selector: 'app-waitlist-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './waitlist-details.component.html',
  styleUrl: './waitlist-details.component.scss'
})
export class WaitlistDetailsComponent implements AfterViewInit {
  @Input() waitlistData: User[];
  @Input() currentLinePosition: number;

  @Output() waitlistClosed = new EventEmitter<void>;

  @ViewChild('modalBackground') modalBackgroundDiv: ElementRef<HTMLDivElement>;
  @ViewChild('waitlistPanel') waitlistPanelDiv: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.waitlistPanelDiv.nativeElement.classList.replace("-bottom-full", "bottom-0");
    }, 0);
  }

  closeWaitlist() {
    this.waitlistPanelDiv.nativeElement.classList.replace("bottom-0", "-bottom-full");

    setTimeout(() => {
      this.waitlistClosed.emit();
    }, 200);
  }

  getCheckInTimeAgo(checkInDate: Date) {
    return moment(checkInDate).fromNow();
  }
}
