import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatTabsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Health-Challenge-Tracker';

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.initializeLocalStorage();
  }

  initializeLocalStorage() {
    if (!localStorage.getItem('workoutData')) {
      localStorage.setItem('workoutData', JSON.stringify([]));
    }
  }
}