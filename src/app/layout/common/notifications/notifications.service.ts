import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { Notification } from 'app/layout/common/notifications/notifications.types';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
 private userID :string;
 private companyID :string ;
 private apiUrl = 'http://localhost:8080/api/notifications';
  private _notifications: ReplaySubject<Notification[]> = new ReplaySubject<Notification[]>(1);
    

  constructor(private _httpClient: HttpClient , _userService : UserService) {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {

      this.userID = currentUser.ID;
      this.companyID = currentUser.workCompanyId;

    }else {
      this.userID = "f8c3a4ca-c222-4f69-9b3e-d0227d4f92e8";
      this.companyID = "4c40be29-6140-4f52-bc45-19d1e04d421d";
    }

  }


  get notifications$(): Observable<Notification[]> {
    return this._notifications.asObservable();
  }

  getAll(): Observable<Notification[]> {
    return this._httpClient.get<Notification[]>(`${this.apiUrl}/${this.userID}`);
  }

  getNotification( notificationID: string): Observable<Notification> {
    return this._httpClient.get<Notification>(`${this.apiUrl}/${this.userID}/${notificationID}`);
  }

  updateNotification( notificationID: string, notification: Notification): Observable<Notification> {
    return this._httpClient.put<Notification>(`${this.apiUrl}/${this.userID}`, notification);
  }

  deleteNotification( notificationID: string): Observable<boolean> {
    return this._httpClient.delete<boolean>(`${this.apiUrl}/${this.userID}/${notificationID}`);
  }
}
