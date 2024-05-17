import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'; // Import Angular Material button module
import { FuseCardComponent } from "../../../../@fuse/components/card/card.component";

@Component({
    selector: 'example',
    standalone: true,
    templateUrl: './example.component.html',
    styleUrls :['./example.component.scss'] ,
    encapsulation: ViewEncapsulation.None,
    imports: [
      CommonModule,
      MatButtonModule,
      FuseCardComponent
  ]
})
export class ExampleComponent
{  users = [
    {
      "id": "987654321",
      "firstname": "Alice",
      "lastname": "Smith",
      "email": "alice.smith@example.com",
      "country": "United States",
      "createdAt": "2024-03-30T08:30:00Z",
      "status": true
    },
    {
      "id": "123456789",
      "firstname": "Bob",
      "lastname": "Johnson",
      "email": "bob.johnson@example.com",
      "country": "Canada",
      "createdAt": "2024-03-29T15:45:00Z",
      "status": true
    },
    {
      "id": "456789123",
      "firstname": "Elena",
      "lastname": "Garcia",
      "email": "elena.garcia@example.com",
      "country": "Spain",
      "createdAt": "2024-03-30T10:20:00Z",
      "status": true
    },
    {
      "id": "789123456",
      "firstname": "Michael",
      "lastname": "Brown",
      "email": "michael.brown@example.com",
      "country": "Australia",
      "createdAt": "2024-03-30T13:15:00Z",
      "status": true
    },
    
    {
      "id": "890123456",
      "firstname": "Luisa",
      "lastname": "Martinez",
      "email": "luisa.martinez@example.com",
      "country": "Mexico",
      "createdAt": "2024-03-29T17:20:00Z",
      "status": true
    }]
    /**
     * Constructor
     */
    constructor()
    {
    }
}
