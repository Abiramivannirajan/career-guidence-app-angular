import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../../services/register.service.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-find-your-jobs',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
  templateUrl: './find-your-jobs.component.html',
  styleUrls: ['./find-your-jobs.component.css'],
  providers: [RegisterService, HttpClient]
})
export class FindYourJobsComponent implements OnInit {
  jobs: any[] = [];  // Store fetched jobs
  filteredJobs: any[] = []; // Filtered job list
  selectedLocation: string = '';  // Selected location (district)
  selectedSalaryRange: string = '';  // Selected salary range
  selectedExperience: string = '';  // Selected experience range
  searchTerm: string = '';  // Search term
  isLoading: boolean = true;  // Loading state
  errorMessage: string = '';  // Error message

  // List of districts in Tamil Nadu
  tamilNaduDistricts: string[] = [
    'Chennai', 'Madurai', 'Coimbatore', 'Trichy', 'Salem', 'Tirunelveli', 
    'Vellore', 'Thanjavur', 'Tiruppur', 'Erode', 'Nagapattinam', 'Dindigul', 
    'Kanyakumari', 'Karur', 'Cuddalore', 'Krishnagiri', 'Pudukkottai', 
    'Theni', 'Villupuram', 'Ramanathapuram'
  ];

  constructor(private registerService: RegisterService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchJobs(); // Fetch jobs from database
  }

  fetchJobs(): void {
    this.registerService.getJobs().subscribe({
      next: (response) => {
        this.jobs = response.rows.map((row: any) => row.doc); // Extract jobs from response
        this.filteredJobs = [...this.jobs]; // Initialize filtered jobs
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching jobs:', error);
        this.errorMessage = 'Failed to fetch jobs. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  // Filter jobs based on location, salary range, experience, and search term
  filterJobs(): void {
    let filtered = this.jobs;

    // Apply location filter
    if (this.selectedLocation) {
      filtered = filtered.filter(job => 
        job.data.location.toLowerCase().includes(this.selectedLocation.toLowerCase())
      );
    }

    // Apply salary filter
    if (this.selectedSalaryRange) {
      filtered = filtered.filter(job => {
        const salary = parseInt(job.data.salary.replace(/[^0-9.-]+/g, ""), 10);  // Remove non-numeric characters
        if (this.selectedSalaryRange === '20000-30000') {
          return salary >= 20000 && salary <= 30000;
        } else if (this.selectedSalaryRange === '30000-50000') {
          return salary >= 30000 && salary <= 50000;
        } else if (this.selectedSalaryRange === '50000') {
          return salary > 50000;
        }
        return true;
      });
    }

    // Apply experience filter
    if (this.selectedExperience) {
      filtered = filtered.filter(job => {
        const experience = parseInt(job.data.experience.replace(/[^0-9.-]+/g, ""), 10);  // Parse the experience years
        if (this.selectedExperience === 'fresher') {
          return experience === 0;  // Fresher is 0 years of experience
        } else if (this.selectedExperience === '1') {
          return experience === 1;
        } else if (this.selectedExperience === '2') {
          return experience === 2;
        } else if (this.selectedExperience === '3') {
          return experience > 3;
        }
        return true;
      });
    }

    // Apply search term filter
    if (this.searchTerm.trim() !== '') {
      filtered = filtered.filter(job => 
        job.data.jobRole.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        job.data.companyName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        job.data.location.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        job.data.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.filteredJobs = filtered;  // Update the filtered jobs
  }

  // Navigate to job application form
  apply(): void {
    console.log('Applying...');
    this.router.navigate(['form']);
  }
}
