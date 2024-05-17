import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ProjectsListComponent } from 'app/modules/projects/projects.component';
import { ProjectsService } from './projects.service';

export default [
  
    {
        path     : '',
        component: ProjectsListComponent,
        resolve  : {
               
            projects  : () => inject(ProjectsService).getProjects(),
      
        },
      
        
    },
] as Routes;
