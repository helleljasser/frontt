import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { Issue_logsListComponent } from 'app/modules/admin/issue_logs/issue_logs.component';
import { Issue_logService } from './issue_logs.service';

export default [
  
    {
        path     : '',
        component: Issue_logsListComponent,
        resolve  : {
               
            issue_logs  : () => inject(Issue_logService).getIssue_logs(),
      
        },
      
        
    },
] as Routes;
