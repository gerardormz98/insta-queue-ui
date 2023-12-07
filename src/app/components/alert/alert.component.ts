import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NotificationStyle } from 'src/app/model/appNotification';

@Component({
  selector: 'app-alert',
  standalone: false,
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent implements AfterViewInit, OnChanges {
  @Input() text: string;
  @Input() alertStyle?: NotificationStyle;

  @Output() alertClosed = new EventEmitter<void>();

  @ViewChild('alertContainer') alertDiv: ElementRef<HTMLDivElement>;

  private closeTimeout: any;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.alertDiv.nativeElement.classList.replace("-top-full", "top-0");
    }, 0);

    this.startAutocloseTimer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.startAutocloseTimer();
  }

  private startAutocloseTimer() {
    if (!this.alertStyle || this.alertStyle === NotificationStyle.Success) {
      this.closeTimeout = setTimeout(() => {
        this.closeAlert();
      }, 3000);
    }
    else {
      clearTimeout(this.closeTimeout);
    }
  }

  closeAlert() {
    this.alertDiv.nativeElement.classList.replace("top-0", "-top-full");

    setTimeout(() => {
      this.alertClosed.emit();
      this.alertDiv.nativeElement.remove();
    }, 550);
  }

  getBackgroundColor() {
    switch (this.alertStyle) {
      case NotificationStyle.Danger:
        return "bg-danger";
      case NotificationStyle.Info:
        return "bg-secondary";
      case NotificationStyle.Warning:
        return "bg-warning";
      case NotificationStyle.Success:
      default:
          return "bg-success";
    }
  }
}
