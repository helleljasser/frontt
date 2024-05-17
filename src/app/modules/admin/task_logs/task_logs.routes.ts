import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { Task_logsListComponent } from 'app/modules/admin/task_logs/task_logs.component';
import { Task_logService } from './task_logs.service';

export default [
  
    {
        path     : '',
        component: Task_logsListComponent,
        resolve  : {
               
            task_logs  : () => inject(Task_logService).getTask_logs(),
      
        },
      
        
    },
] as Routes;
