import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';



@Component({
    selector     : 'task_logs',
    standalone   : true,
    templateUrl  : './task_logs.component.html',
    encapsulation: ViewEncapsulation.None,
    imports : [CommonModule]
})
export class Task_logsComponent
{  task_logs = [
  {
    "actiondescription": "Create user registration page",
    "actionname": "Create User Registration",
    "companyID": "company123",
    "createdAt": "2023-05-15T08:00:00Z",
    "id": "action001",
    "TaskID": "Task123",
    "projectID": "project789"
  },
  {
    "actiondescription": "Implement authentication system",
    "actionname": "Implement Authentication",
    "companyID": "company456",
    "createdAt": "2023-07-20T10:45:00Z",
    "id": "action002",
    "TaskID": "Task456",
    "projectID": "project012"
  },
  {
    "actiondescription": "Design dashboard UI",
    "actionname": "Design Dashboard",
    "companyID": "company789",
    "createdAt": "2023-09-10T16:20:00Z",
    "id": "action003",
    "TaskID": "Task789",
    "projectID": "project345"
  },
  {
    "actiondescription": "Optimize database queries",
    "actionname": "Optimize Database",
    "companyID": "company012",
    "createdAt": "2023-11-25T11:10:00Z",
    "id": "action004",
    "TaskID": "Task012",
    "projectID": "project678"
  },
  {
    "actiondescription": "Fix bug causing login error",
    "actionname": "Fix Login Bug",
    "companyID": "company345",
    "createdAt": "2024-01-03T14:55:00Z",
    "id": "action005",
    "TaskID": "Task345",
    "projectID": "project901"
  },
  {
    "actiondescription": "Deploy application to userion server",
    "actionname": "Deploy to Userion",
    "companyID": "company678",
    "createdAt": "2024-02-18T09:30:00Z",
    "id": "action006",
    "TaskID": "Task678",
    "projectID": "project234"
  }
]




    /**
     * Constructor
     */
    constructor()
    {
    }
}
