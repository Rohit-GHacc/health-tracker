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
  workoutType: string[];
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
  displayedColumns: string[] = ['name', 'workouts', 'minutes', 'workoutType'];
  users: User[] = [];

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    try {
      if (typeof window !== 'undefined') {
        const data = localStorage.getItem('workoutData');
        if (data) {
          this.users = JSON.parse(data).map((user: any) => ({
            ...user,
            workoutType: Array.isArray(user.workoutType) ? user.workoutType : [user.workoutType]
          }));
        }
      }
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }
  
}