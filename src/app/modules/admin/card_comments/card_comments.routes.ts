import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { Card_commentsListComponent } from 'app/modules/admin/card_comments/card_comments.component';
import { Card_commentService } from './card_comments.service';

export default [
  
    {
        path     : '',
        component: Card_commentsListComponent,
        resolve  : {
               
            card_comments  : () => inject(Card_commentService).getCard_comments(),
      
        },
      
        
    },
] as Routes;
