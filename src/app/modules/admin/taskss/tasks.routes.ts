import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { TasksListComponent } from 'app/modules/admin/taskss/tasks.component';
import { TaskService } from './tasks.service';

export default [
  
    {
        path     : '',
        component: TasksListComponent,
        resolve  : {
               
            tasks  : () => inject(TaskService).getTasks(),
      
        },
      
        
    },
] as Routes;
