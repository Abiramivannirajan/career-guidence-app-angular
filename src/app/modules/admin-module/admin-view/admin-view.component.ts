import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { RegisterService } from '../../../services/register.service.service';

import { FAQService } from '../../../services/faq.service';
import { v4 as uuidv4 } from 'uuid';
import { log } from 'console';

@Component({
  selector: 'app-admin-view',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css'],
})
export class AdminViewComponent implements OnInit {
  
  streamOptions: any;
  User: any;
  formVisible = false;
  coursesform = false;
  isFormsubmitted = false;
  jobform = false;
  substreamform = false;
  substream: string[] = [];
  streamNameIdMap: Map<string, string> = new Map();
  selectedStream: string = "";

  newPlan = {
    _id: `pricing_2_${uuidv4()}`,
    data: {
      planName: '',
      description: '',
      price: null,
      duration: '',
      type: 'pricing'
    }
  };

  newcourses = {
    _id: `stream_2_${uuidv4()}`,
    data: {
      stream_Name: '',
      description: '',
      imageUrl: '',
      colleges: '',
      type: 'stream'
    }
  };

  newstream = {
    _id: `substream_2_${uuidv4()}`,
    data: {
      streamId: '',
      substream_Name: '',
      description: '',
      imageurl: '',
      type: 'substream',
      extraDescription: '',
      extraImageUrl: '',
      duration: ''
    }
  };

  newJob = {
    _id: `job-details_2_${uuidv4()}`,
    data: {
      companyName: '',
      location: '',
      jobRole: '',
      email: '',
      applyLink: '',
      description: '',
      experience: '',
      salary:'',
      type: 'job-details'
    }
  };
  faqService: any;
  
  constructor(private registerService: RegisterService, private http: HttpClient,
    
private router: Router ,faqService: FAQService) {}

  ngOnInit(): void {
    this.fetchUserList();
    this.fetchsubstreams();
    this.fetchcourses();
    this.getFaq();
    this.fetchMockInterviewQuestions(); 
   
  }

  fetchUserList() {
    this.registerService.getAllUser().subscribe({
      next: (response: any) => {
        this.User = response.rows.map((row: any) => row.doc.data);
      },
      error: (err: any) => console.error('Error fetching users:', err),
    });
  }

  fetchsubstreams(): void {
    this.registerService.getCourses().subscribe({
      next: (response: any) => {
        this.streamNameIdMap.clear();
        response.rows.forEach((user: any) => {
          this.streamNameIdMap.set(user.value, user.key);
        });
      },
      error: (error: any) => console.error('Error fetching substreams:', error),
    });
  }

  fetchcourses() {
    this.registerService.getCourses().subscribe({
      next: (response: any) => {
        this.substream = response.rows.map((row: any) => row);
      },
      error: (error: any) => console.error('Error fetching courses:', error),
    });
  }

  openForm(formType: string) {
    this.formVisible = this.jobform = this.coursesform = this.substreamform = false;
    if (formType === 'job') this.jobform = true;
    else if (formType === 'courses') this.coursesform = true;
    else if (formType === 'substream') this.substreamform = true;
    else if (formType === 'pricing') this.formVisible = true;
  }

  closeForm() {
    this.formVisible = this.jobform = this.coursesform = this.substreamform = false;
  }

  addPlan() {
    const planData = {
      ...this.newPlan,
      createdAt: new Date().toISOString(),
    };

    this.registerService.addPlan(planData).subscribe({
      next: () => {
        alert('Plan added successfully.');
        this.newPlan = { _id: `pricing_2_${uuidv4()}`, data: { planName: '', description: '', price: null, duration: '', type: 'pricing' } };
        this.formVisible = false;
      },
      error: () => alert('Failed to add plan. Please try again.'),
    });
  }

  addCoursesAndColleges() {
    if (!this.newcourses.data.stream_Name || !this.newcourses.data.description || !this.newcourses.data.imageUrl || !this.newcourses.data.colleges) {
      alert("Please fill all fields.");
      return;
    }

    const streamData = {
      _id: `stream_2_${uuidv4()}`,
      data: { ...this.newcourses.data, createdAt: new Date().toISOString() }
    };

    this.registerService.addCourses(streamData).subscribe({
      next: () => {
        alert('Course added successfully.');
        this.coursesform = false;
      },
      error: () => alert('Failed to add course.'),
    });
  }

  addSubstream() {
    if (!this.newstream.data.substream_Name || !this.newstream.data.description || !this.newstream.data.extraDescription ||
        !this.newstream.data.duration || !this.newstream.data.extraImageUrl || !this.newstream.data.imageurl) {
      alert("Please fill all fields.");
      return;
    }

    this.registerService.addPlan(this.newstream).subscribe({
      next: () => alert('Substream added successfully.'),
      error: () => alert('Failed to add substream.'),
    });
  }

  addJobdetails() {
    if (!this.newJob.data.companyName || !this.newJob.data.location || !this.newJob.data.jobRole ||
        !this.newJob.data.email || !this.newJob.data.applyLink || !this.newJob.data.description || !this.newJob.data.salary
       || !this.newJob.data.experience) {
      alert("Please fill all fields.");
      return;
    }

    this.registerService.addJob(this.newJob).subscribe({
      next: () => {
        alert('Job added successfully!');
        this.jobform = false;
      },
      error: () => alert('Failed to add job.'),
    });
  }

  // FAQ Section
  faqs: any[] = [];
  filteredFaqs: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  newFaq: boolean = false;

  newFaqQuestion: string = '';
  newFaqAnswer: string = '';
  categoryFaq: string = '';

  faqCategories = [
    { category: 'Student Search Tips' },
    { category: 'Job Search Tips' }
  ];

  getFaq(): void {
    this.faqService.get_faqs().subscribe({
      next: (response: { rows: any[] }) => {
        this.faqs = response.rows.map((row: any) => row.value);
        this.filteredFaqs = [...this.faqs];
      },
      error: (error: any) => console.error('Error fetching FAQs:', error),
    });
  }

  addFaq(): void {
    if (!this.newFaqQuestion.trim() || !this.newFaqAnswer.trim() || !this.categoryFaq.trim()) {
      alert('All fields are required.');
      return;
    }

    const newFAQ = {
      _id: this.newFaqQuestion.replace(/\s+/g, '_').toLowerCase(),
      data: {
         question: this.newFaqQuestion, 
         answer: this.newFaqAnswer, 
         faqCategory: this.categoryFaq,
          type: 'faq' },
    };

    this.faqService.add_faq(newFAQ).subscribe({
      next: () => {
        alert('FAQ added successfully.');
        this.getFaq();
      },
      error: () => console.error('Error adding FAQ'),
    });
  }
  question: string = '';
  options: string[] = ['', '', '', ''];  // Store the options
  correctAnswer: string = '';
  marks: number = 0;


  // To hold data from CouchDB (for instance, mock interview questions)
  mockInterviewQuestions: any[] = [];
 

  // Fetch the questions from CouchDB
  fetchMockInterviewQuestions(): void {
    this.registerService.getMockInterviewQuestions().subscribe({
      next: (data: any) => {
        console.log('Mock interview questions:', data);
        this.mockInterviewQuestions = data.rows?.map((row: any) => row.doc.data) || [];
      },
      error: (error: any) => {
        console.error('Error fetching mock interview questions:', error);
      }
    });
  }
  

  // Method to submit a new question to CouchDB
  submit(): void {
    console.log(this.question);
    
    const newQuestion = {
      question: this.question,
      options: this.options,
      correctAnswer: this.correctAnswer,
      marks: this.marks,
      type:"mockinterview"

    };
    console.log(newQuestion)
  
    this.registerService.addMockInterviewQuestion(newQuestion).subscribe({
      next: (response: any) => {
        console.log(newQuestion);
        
        console.log('Question added successfully:', response);
        this.resetForm();
        this.fetchMockInterviewQuestions();
      },
      error: (error: any) => {
        console.error('Error saving question:', error);
      }
    });
  }
  
  // Reset the form after submission
  resetForm(): void {
    this.question = '';
    this.options = ['', '', '', ''];
    this.correctAnswer = '';
    this.marks = 0;
  }

  // Navigate to a specific question's details
  navigateToQuestion(questionId: any): void {
    this.router.navigate([`/question/${questionId}`]);
  }
}
