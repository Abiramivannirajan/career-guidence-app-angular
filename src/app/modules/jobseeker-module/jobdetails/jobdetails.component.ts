import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { couchchatbotService } from '../../../services/couchchatbot.service';
import { NavBarComponent } from '../../student-module/nav-bar/nav-bar.component';



@Component({
  selector: 'app-JobDetails',
  standalone: true,
  providers: [couchchatbotService],
  imports: [CommonModule, NavBarComponent],
  templateUrl: './JobDetails.component.html',
  styleUrls: ['./JobDetails.component.css']
})
export class JobDetails implements OnInit {
  jobs: any[] = []; // Array to store job details

  constructor(private couchchatbot: couchchatbotService) {}

  ngOnInit(): void {
    this.fetchJobs();
  }
  fetchJobs(): void {
    this.couchchatbot.getJobs().subscribe({
      next: (data) => {
        console.log(data);
        
        this.jobs = data; // Store job details in array
      },
      error: (error) => {
        console.error('Error fetching jobs:', error);
      }
    });
  }
}
