import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { RolesListComponent } from 'app/modules/admin/roles/roles.component';
import { RoleService } from './roles.service';

export default [
  
    {
        path     : '',
        component: RolesListComponent,
        resolve  : {
               
            roles  : () => inject(RoleService).getRoles(),
      
        },
      
        
    },
] as Routes;
