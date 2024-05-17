import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { Issue_commentsListComponent } from 'app/modules/admin/issue_comments/issue_comments.component';
import { Issue_commentService } from './issue_comments.service';

export default [
  
    {
        path     : '',
        component: Issue_commentsListComponent,
        resolve  : {
               
            Issue_comments  : () => inject(Issue_commentService).getIssue_comments(),
      
        },
      
        
    },
] as Routes;
