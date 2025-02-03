import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; // Import MatSelectModule
import { MatOptionModule } from '@angular/material/core'; // Import MatOptionModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule, // Add MatSelectModule
    MatOptionModule // Add MatOptionModule
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  userData = {
    name: '',
    goal: 0,
    workoutType: ''
  };

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.userData.name && this.userData.goal > 0) {
      let existingData = JSON.parse(localStorage.getItem('workoutData') || '[]');
      let existingUser = existingData.find((user: any) => user.name === this.userData.name);
  
      if (existingUser) {
        existingUser.goal += this.userData.goal;
  
        // Ensure workoutType is always an array
        if (!Array.isArray(existingUser.workoutType)) {
          existingUser.workoutType = [existingUser.workoutType]; // Convert string to array
        }
  
        if (!existingUser.workoutType.includes(this.userData.workoutType)) {
          existingUser.workoutType.push(this.userData.workoutType);
        }
      } else {
        existingData.push({
          id: Date.now().toString(),
          name: this.userData.name,
          workouts: 0,
          goal: this.userData.goal,
          workoutType: [this.userData.workoutType] // Store as an array
        });
      }
  
      localStorage.setItem('workoutData', JSON.stringify(existingData));
      this.dialogRef.close(true);
    }
  }
    

  onCancel(): void {
    this.dialogRef.close();
  }
}