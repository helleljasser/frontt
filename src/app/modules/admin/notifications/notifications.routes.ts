import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { NotificationsNotificationComponent } from 'app/modules/admin/notifications/notifications.component';
import { NotificationService } from './notifications.service';

export default [
  
    {
        path     : '',
        component: NotificationsNotificationComponent,
        resolve  : {
               
            notifications  : () => inject(NotificationService).getNotifications(),
      
        },
      
        
    },
] as Routes;
