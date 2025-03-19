import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { couchchatbotService } from '../../../services/couchchatbot.service';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-mock-interview',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule,HttpClientModule,],
  providers:[couchchatbotService,HttpClient],
  templateUrl: './mock-interview.component.html',
  styleUrls: ['./mock-interview.component.css'], // Use styleUrls (plural)
})
export class MockInterviewComponent implements OnInit {
  questions: any[] = [];
  userAnswers: string[] = [];
  answerStatus: boolean[] = []; // To track correct (true) or incorrect (false) answers

  correctAnswers : number = 0;
  totalMarks : number = 0;

  constructor(private http: HttpClient, readonly couchchatbot: couchchatbotService) {}

  currentUser : string = "";



  ngOnInit() {
    this.couchchatbot.getMockInterviewQuestions().subscribe({
      next : (response) => {
      if (response && response.rows) {
        this.questions = response.rows.map((row: { doc: any; }) => row.doc.data);
        this.userAnswers = new Array(this.questions.length); // Initialize userAnswers array
        this.answerStatus = new Array(this.questions.length).fill(null); // Initialize answer status array
      }
    }, error : (error) => {
      console.error('Error fetching questions:', error);
    }});


    this.currentUser = this.couchchatbot.getLoggedInUser() ?? "";
  }

  submitAnswers() {
    this.correctAnswers = 0;
    this.totalMarks = 0;

    this.questions.forEach((question, index) => {
      console.log(`Question: ${question.question}`);
      console.log(`User's Answer: ${this.userAnswers[index]}`);
      console.log(`Correct Answer: ${question.correctAnswer}`);

      if (this.userAnswers[index] === question.correctAnswer) {
        this.answerStatus[index] = true; // Mark as correct
        this.correctAnswers++
        this.totalMarks += question.marks;
      } else {
        this.answerStatus[index] = false; // Mark as incorrect
      }
    });

    console.log(`Total Correct Answers: ${this.correctAnswers}`);
    console.log(`Total Marks: ${this.totalMarks}`);

    alert(`You answered ${this.correctAnswers} questions correctly out of ${this.questions.length}. Total Marks: ${this.totalMarks}`);
  }

  resetForm(){
    this.answerStatus = [];
    this.totalMarks = 0;
    this.correctAnswers= 0;
  }
  
  logOut(){
    this.couchchatbot.logout();
    this.currentUser = "";
  }
}