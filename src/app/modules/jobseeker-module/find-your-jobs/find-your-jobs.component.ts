import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { couchchatbotService } from '../../../services/couchchatbot.service';


@Component({
  selector: 'app-find-your-jobs',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
  templateUrl: './find-your-jobs.component.html',
  styleUrls: ['./find-your-jobs.component.css'],
  providers: [HttpClient]
})
export class FindYourJobsComponent implements OnInit {
  
  jobs: any[] = [];  // Store fetched jobs
  filteredJobs: any[] = []; // Filtered job list
  favoriteJobIds: Set<string> = new Set(); // Track favorite jobs
  
  selectedLocation: string = '';  // Selected location (district)
  selectedSalaryRange: string = '';  // Selected salary range
  selectedExperience: string = '';  // Selected experience range
  searchTerm: string = '';  // Search term
  isLoading: boolean = true;  // Loading state
  errorMessage: string = '';  // Error message

  searchbarValue : string = "";
  currentUserId : string = "register_2_87a01413-d73b-4589-a4cb-d325de2fba5";

  // List of districts in Tamil Nadu
  tamilNaduDistricts: string[] = [
    'Chennai', 'Madurai', 'Coimbatore', 'Trichy', 'Salem', 'Tirunelveli', 
    'Vellore', 'Thanjavur', 'Tiruppur', 'Erode', 'Nagapattinam', 'Dindigul', 
    'Kanyakumari', 'Karur', 'Cuddalore', 'Krishnagiri', 'Pudukkottai', 
    'Theni', 'Villupuram', 'Ramanathapuram'
  ];

  constructor(private couchservice: couchchatbotService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchJobs(); // Fetch jobs from database
    this.fetchFavoriteJobs();
  }

  fetchJobs(): void {
    this.couchservice.getJobs().subscribe({
      next: (response) => {
        this.jobs = response.rows.map((row: any) => row.doc); // Extract jobs from response
        this.filteredJobs = [...this.jobs]; // Initialize filtered jobs
        this.isLoading = false;
        console.log(this.filteredJobs);
        
      },
      error: (error) => {
        console.error('Error fetching jobs:', error);
        this.errorMessage = 'Failed to fetch jobs. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  fetchFavoriteJobs(): void {
    this.couchservice.getParticularUserApplications(this.currentUserId).subscribe({
      next: (response :any) => {
        console.log(response);
        
        this.favoriteJobIds = new Set(response.rows.filter((e : any) => e.doc.data.applicationStatus === 'favorite').map((row: any) => row.doc.data.jobId));
        console.log("Favorite")
        console.log(this.favoriteJobIds)
      },
      error: (error) => {
        console.error('Error fetching favorite jobs:', error);
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

  markFavorite(jobId: string): void {

    if (this.favoriteJobIds.has(jobId)) {
      console.log("Job is already marked as favorite.");
      return;
    }

    const favoriteApplication = {
      userId: this.currentUserId,
      jobId: jobId,
      applicationStatus: 'favorite',
      type : 'application'
    };
    // console.log(favoriteApplication);
    
    this.couchservice.createJobApplication(favoriteApplication).subscribe({
      next : (response : any) =>{
        console.log(response);
        console.log("Created successfully");
        this.favoriteJobIds.clear();
        this.fetchFavoriteJobs();
      },
      error : (error) => {
        console.log(error)
      }
    }) 
  }

  isFavorite(jobId: string): boolean {
    return this.favoriteJobIds.has(jobId);
  }

  searchForJob(){
    if(this.searchbarValue.length == 0){
      this.fetchJobs();
      return;
    }
    this.couchservice.searchForJob(this.searchbarValue).subscribe({
      next : (response) =>{
        console.log(response)
  
          this.filteredJobs = response.rows.map((e : any) => e.doc);
        
      },
      error : (error) =>{
        console.log(error)
      }
    }
    )
  }


}