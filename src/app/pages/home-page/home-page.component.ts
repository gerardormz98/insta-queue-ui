import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  waitlistCode: string = '';

  formatWaitlist() {
    this.waitlistCode = this.waitlistCode.trim().replaceAll(' ', '').toUpperCase();
  }
}
