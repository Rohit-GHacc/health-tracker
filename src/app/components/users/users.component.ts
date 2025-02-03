import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms'; 
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
    MatIconModule,
    FormsModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'workouts', 'minutes', 'workoutType'];
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = ''; // This will hold the search term
  selectedWorkout: string = '';
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
          this.filteredUsers = this.users
        }
      }
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }

  applyFilter() {
    let filtered = this.users;

    // Filter by username
    if (this.searchTerm.trim()) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Filter by workout type
    if (this.selectedWorkout) {
      filtered = filtered.filter(user =>
        user.workoutType.some(type => type.toLowerCase() === this.selectedWorkout.toLowerCase())
      );
    }

    // Update the filtered users
    this.filteredUsers = filtered;
  }
  
}