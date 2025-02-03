import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface User {
  id: string;
  name: string;
  workouts: number;
  goal: number;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'workouts', 'minutes'];
  users: User[] = [];

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    try {
      if (typeof window !== 'undefined') {  // Add this check
        const data = localStorage.getItem('workoutData');
        if (data) {
          this.users = JSON.parse(data);
        }
      }
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }
}