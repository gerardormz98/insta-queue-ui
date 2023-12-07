import { Injectable } from '@angular/core';
import { LOCAL_STORAGE_USER_ID_KEY } from '../constants';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class LocalUserIdService {
  setUserId(userId: string) {
    localStorage.setItem(LOCAL_STORAGE_USER_ID_KEY, userId);
  }

  getUserId() {
    let userId = localStorage.getItem(LOCAL_STORAGE_USER_ID_KEY);

    if (!userId) {
      userId = uuidv4();
      this.setUserId(userId);
    }

    return userId;
  }

  removeUserId() {
    localStorage.removeItem(LOCAL_STORAGE_USER_ID_KEY);
  }
}
