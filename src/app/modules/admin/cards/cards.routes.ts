import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { CardsListComponent } from 'app/modules/admin/cards/cards.component';
import { CardService } from './cards.service';

export default [
  
    {
        path     : '',
        component: CardsListComponent,
        resolve  : {
               
            cards  : () => inject(CardService).getCards(),
      
        },
      
        
    },
] as Routes;
