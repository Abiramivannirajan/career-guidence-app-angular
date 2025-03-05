import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../../../services/register.service.service';

@Component({
  selector: 'app-mock-interview',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './mock-interview.component.html',
  styleUrls: ['./mock-interview.component.css'], // Use styleUrls (plural)
})
export class MockInterviewComponent implements OnInit {
  questions: any[] = [];
  userAnswers: string[] = [];

  constructor(private http: HttpClient,readonly registerservice:RegisterService) {}

  ngOnInit() {
    this.registerservice.getMockInterviewQuestions().subscribe(response => {
      if (response && response.rows) {
        this.questions = response.rows.map((row: { doc: any; }) => row.doc.data);
        this.userAnswers = new Array(this.questions.length); // Initialize userAnswers array with the same length as questions
      }
    }, error => {
      console.error('Error fetching questions:', error);
    });
  }
  
  

  submitAnswers() {
    let correctAnswers = 0;
    let totalMarks = 0;
  
    this.questions.forEach((question, index) => {
      console.log(`Question: ${question.question}`);
      console.log(`User's Answer: ${this.userAnswers[index]}`);
      console.log(`Correct Answer: ${question.correctAnswer}`);
      
      // Compare selected option with the correct answer key (option1, option2, etc.)
      if (this.userAnswers[index] === question.correctAnswer) {
        correctAnswers++;
        totalMarks += question.marks;
      }
    });
  
    console.log(`Total Correct Answers: ${correctAnswers}`);
    console.log(`Total Marks: ${totalMarks}`);
    
    alert(`You answered ${correctAnswers} questions correctly out of ${this.questions.length}. Total Marks: ${totalMarks}`);
  }
   
}

