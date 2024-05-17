import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { Task_commentsListComponent } from 'app/modules/admin/task_comments/task_comments.component';
import { Task_commentService } from './task_comments.service';

export default [
  
    {
        path     : '',
        component: Task_commentsListComponent,
        resolve  : {
               
            Task_comments  : () => inject(Task_commentService).getTask_comments(),
      
        },
      
        
    },
] as Routes;
