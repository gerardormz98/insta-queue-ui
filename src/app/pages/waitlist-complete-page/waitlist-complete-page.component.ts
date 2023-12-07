import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import * as moment from 'moment';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { ROUTE_QUERY_CHECK_IN_TIME, ROUTE_QUERY_COMPLETED_TIME } from 'src/app/constants';

@Component({
  selector: 'app-waitlist-complete-page',
  standalone: true,
  imports: [CommonModule, FooterComponent, RouterModule, LogoComponent],
  templateUrl: './waitlist-complete-page.component.html',
  styleUrl: './waitlist-complete-page.component.scss'
})
export class WaitlistCompletePageComponent implements OnInit {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  totalWaitTime: string;

  ngOnInit(): void {
    const checkInTime = this.activatedRoute.snapshot.queryParams[ROUTE_QUERY_CHECK_IN_TIME];
    const completedTime = this.activatedRoute.snapshot.queryParams[ROUTE_QUERY_COMPLETED_TIME];

    var startTime = moment(checkInTime);
    var endTime = moment();

    if (completedTime) {
      endTime = moment(completedTime);
    }

    var duration = moment.duration(endTime.diff(startTime));
    var hours = parseInt(duration.asHours().toString());
    var minutes = parseInt((duration.asMinutes() % 60).toString());

    if (hours === 0)
      this.totalWaitTime = `${minutes} minute${ minutes > 1 ? 's' : ''}`;
    else
      this.totalWaitTime = `${hours} hour${ hours > 1 ? 's' : ''} and ${minutes} minutes.`;
  }
}
