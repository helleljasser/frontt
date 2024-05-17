import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ProjectsListComponent } from 'app/modules/admin/projects/projects.component';
import { ProjectService } from './projects.service';

export default [
  
    {
        path     : '',
        component: ProjectsListComponent,
        resolve  : {
               
            projects  : () => inject(ProjectService).getProjects(),
      
        },
      
        
    },
] as Routes;
