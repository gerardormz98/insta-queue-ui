import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-modal.component.html',
  styleUrl: './alert-modal.component.scss'
})
export class AlertModalComponent implements AfterViewInit {
  @Output() modalCancel = new EventEmitter<void>;
  @Output() modalConfirm = new EventEmitter<void>;

  @Input() modalTitle: string;
  @Input() modalMessage: string;
  @Input() confirmButtonText: string;
  @Input() cancelButtonText: string;
  @Input() alertStyle: "Danger" | "Warning" | "Confirm" | "Success" = "Danger";

  @ViewChild('modalBackground') modalBackgroundDiv: ElementRef<HTMLDivElement>;
  @ViewChild('modalContent') modalContentDiv: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.modalContentDiv.nativeElement.classList.replace("-bottom-full", "bottom-0");
    }, 0);
  }

  cancelModal() {
    this.modalContentDiv.nativeElement.classList.replace("bottom-0", "-bottom-full");

    setTimeout(() => {
      this.modalCancel.emit();
    }, 200);
  }

  confirmModal() {
    this.modalConfirm.emit();
  }

  getConfirmButtonStyle() {
    switch (this.alertStyle)
    {
      case 'Danger': return "bg-danger hover:bg-danger-dark";
      case 'Warning': return "bg-warning hover:bg-warning-dark"
      case 'Confirm': return "bg-secondary hover:bg-secondary-dark"
      case 'Success': return "bg-success hover:bg-success-dark"
    }
  }
}
