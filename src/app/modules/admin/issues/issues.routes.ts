import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { IssuesListComponent } from 'app/modules/admin/issues/issues.component';
import { IssueService } from './issues.service';

export default [
  
    {
        path     : '',
        component: IssuesListComponent,
        resolve  : {
               
            issues  : () => inject(IssueService).getIssues(),
      
        },
      
        
    },
] as Routes;
