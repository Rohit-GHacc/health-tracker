import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  userData = {
    name: '',
    goal: 0
  };

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>
  ) {}

  onSubmit(): void {
    if (this.userData.name && this.userData.goal > 0) {
      const existingData = JSON.parse(localStorage.getItem('workoutData') || '[]');
      existingData.push({
        id: Date.now().toString(),
        name: this.userData.name,
        workouts: 0,
        goal: this.userData.goal
      });
      localStorage.setItem('workoutData', JSON.stringify(existingData));
      this.dialogRef.close(true);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}