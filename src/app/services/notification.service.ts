import { Injectable } from '@angular/core';
import { AppAlert, AppNotification, NotificationStyle } from '../model/appNotification';
import { v4 as uuidv4 } from 'uuid';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  appNotified = new Subject<AppNotification>();
  appAlerted = new Subject<AppAlert>();

  constructor() { }

  triggerNotification(title: string, description: string, style?: NotificationStyle) {
    const id = uuidv4();

    this.appNotified.next({
      id: id,
      title: title,
      description: description,
      style: style
    });
  }

  triggerAlert(text: string, style?: NotificationStyle) {
    this.appAlerted.next({
      text: text,
      style: style
    });
  }
}
