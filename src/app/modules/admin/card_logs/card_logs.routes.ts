import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { Card_logsListComponent } from 'app/modules/admin/card_logs/card_logs.component';
import { Card_logService } from './card_logs.service';

export default [
  
    {
        path     : '',
        component: Card_logsListComponent,
        resolve  : {
               
            cardlogs  : () => inject(Card_logService).getCard_logs(),
      
        },
      
        
    },
] as Routes;
