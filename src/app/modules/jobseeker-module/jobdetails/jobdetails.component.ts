import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../../../services/register.service.service';


@Component({
  selector: 'app-JobDetails',
  standalone: true,
  providers: [RegisterService],
  imports: [CommonModule],
  templateUrl: './JobDetails.component.html',
  styleUrls: ['./JobDetails.component.css']
})
export class JobDetails implements OnInit {
  jobs: any[] = []; // Array to store job details

  constructor(private registerservice: RegisterService) {}

  ngOnInit(): void {
    this.fetchJobs();
  }
  fetchJobs(): void {
    this.registerservice.getJobs().subscribe({
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
