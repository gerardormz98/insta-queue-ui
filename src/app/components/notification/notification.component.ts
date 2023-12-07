import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NotificationStyle } from 'src/app/model/appNotification';

@Component({
  selector: 'app-notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements AfterViewInit {
  @Input() title: string;
  @Input() description: string;
  @Input() notificationStyle?: NotificationStyle = NotificationStyle.Danger;

  @Output() notificationClosed = new EventEmitter<void>();

  @ViewChild('notificationCard') notificationCardDiv: ElementRef<HTMLDivElement>;

  private closeTimeout: any;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.notificationCardDiv.nativeElement.classList.add("animate-bounce");
      this.notificationCardDiv.nativeElement.classList.replace("opacity-0", "opacity-100");
    }, 100);

    this.startAutocloseTimer();
  }

  private startAutocloseTimer() {
    this.closeTimeout = setTimeout(() => {
      this.closeNotification();
    }, 10000);
  }

  closeNotification() {
    this.notificationCardDiv.nativeElement.classList.replace("opacity-100", "opacity-0");

    setTimeout(() => {
      this.notificationClosed.emit();
      this.notificationCardDiv.nativeElement.remove();
    }, 550);
  }

  handleMouseOver() {
    clearTimeout(this.closeTimeout);
  }

  handleMouseOut() {
    this.startAutocloseTimer();
  }

  getNotificationIcon() {
    switch (this.notificationStyle) {
      case NotificationStyle.Danger:
        return "error";
      case NotificationStyle.Info:
        return "info";
      case NotificationStyle.Warning:
        return "warning";
      case NotificationStyle.Success:
      default:
          return "check_circle";
    }
  }

  getNotificationColor() {
    switch (this.notificationStyle) {
      case NotificationStyle.Danger:
        return "text-danger";
      case NotificationStyle.Info:
        return "text-secondary";
      case NotificationStyle.Warning:
        return "text-warning";
      case NotificationStyle.Success:
      default:
          return "text-success";
    }
  }
}
