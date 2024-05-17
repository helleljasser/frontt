import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ListsListComponent } from 'app/modules/admin/lists/lists.component';
import { ListService } from './lists.service';

export default [
  
    {
        path     : '',
        component: ListsListComponent,
        resolve  : {
               
            lists  : () => inject(ListService).getLists(),
      
        },
      
        
    },
] as Routes;
