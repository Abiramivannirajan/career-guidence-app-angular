import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Question {
  id: number;
  category: string;
  question: string;
}

@Component({
  selector: 'app-skill-assessent',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './skill-assessent.component.html',
  styleUrl: './skill-assessent.component.css'
})
export class SkillAssessentComponent {
  questions: Question[] = [
    { id: 1, category: 'Aptitude', question: 'How would you rate your problem-solving skills in mathematics?' },
    { id: 2, category: 'IT', question: 'How proficient are you with programming languages (e.g., Python, Java)?' },
    { id: 3, category: 'Communication', question: 'How confident are you in public speaking and communication?' },
    { id: 4, category: 'HR', question: 'How well do you understand employee management and HR processes?' },
    { id: 5, category: 'Non-IT', question: 'How familiar are you with non-IT industries such as healthcare or construction?' }
  ];

  answers: { [key: number]: string } = {};
  predictedScore: string | null = null;
  confidence: string | null = null;

  constructor() {}

  submitAnswers(): void {
    // Collect answers for all 5 questions
    const userAnswers = this.questions.map(q => this.answers[q.id] || 'No');  // Default 'No' for missing answers
  
    // Log answers to make sure everything is correct
    console.log("User Answers:", userAnswers);
  
    // Check if the answers length is exactly 5
    if (userAnswers.length !== 5) {
      console.error("Error: Please answer all 5 questions.");
      return; // Prevent submission if there are less than 5 answers
    }
  
    console.log(userAnswers);
    
    // Send request to Flask backend
   
    fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ answers: userAnswers }) // ✅ Convert to JSON string
    })
    
    .then(response => response.json())
    .then(data => {
      this.predictedScore = data.score;
      this.confidence = data.confidence;
    })
    .catch(error => {
      console.error("Error predicting score:", error);
    });
  }
  
  

  getAnswer(level: number): string {
    return level >= 3 ? 'Yes' : 'No';
  }
}
