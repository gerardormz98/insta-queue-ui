import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-qr-modal',
  standalone: true,
  imports: [CommonModule, QRCodeModule],
  templateUrl: './qr-modal.component.html',
  styleUrl: './qr-modal.component.scss'
})
export class QrModalComponent {
  @Output() modalClose = new EventEmitter<void>;

  @Input() qrText: string;

  @ViewChild('modalBackground') modalBackgroundDiv: ElementRef<HTMLDivElement>;
  @ViewChild('modalContent') modalContentDiv: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    console.log(this.qrText);

    setTimeout(() => {
      this.modalContentDiv.nativeElement.classList.replace("-bottom-full", "bottom-0");
    }, 0);
  }

  closeModal() {
    this.modalContentDiv.nativeElement.classList.replace("bottom-0", "-bottom-full");

    setTimeout(() => {
      this.modalClose.emit();
    }, 200);
  }
}
