import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { BoardsListComponent } from 'app/modules/admin/boards/boards.component';
import { BoardService } from './boards.service';

export default [
  
    {
        path     : '',
        component: BoardsListComponent,
        resolve  : {
               
            boards  : () => inject(BoardService).getBoards(),
      
        },
      
        
    },
] as Routes;
