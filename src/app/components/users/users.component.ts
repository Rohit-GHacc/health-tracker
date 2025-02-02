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
  users: User[] = [];
  displayedColumns: string[] = ['name', 'workouts', 'goal', 'progress', 'actions'];

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    const data = localStorage.getItem('workoutData');
    if (data) {
      this.users = JSON.parse(data);
    }
  }

  incrementWorkout(user: User) {
    const updatedUsers = this.users.map(u => {
      if (u.id === user.id) {
        return { ...u, workouts: u.workouts + 1 };
      }
      return u;
    });
    localStorage.setItem('workoutData', JSON.stringify(updatedUsers));
    this.loadUsers();
  }

  decrementWorkout(user: User) {
    if (user.workouts > 0) {
      const updatedUsers = this.users.map(u => {
        if (u.id === user.id) {
          return { ...u, workouts: u.workouts - 1 };
        }
        return u;
      });
      localStorage.setItem('workoutData', JSON.stringify(updatedUsers));
      this.loadUsers();
    }
  }

  calculateProgress(workouts: number, goal: number): number {
    return Math.round((workouts / goal) * 100);
  }
}