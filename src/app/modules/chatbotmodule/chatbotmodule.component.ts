import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { couchchatbotService } from '../../services/couchchatbot.service';



@Component({
  selector: 'app-chatbotmodule',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './chatbotmodule.component.html',
  styleUrls: ['./chatbotmodule.component.css'] ,
  providers:[couchchatbotService]// Fixed typo (should be styleUrls)
})
export class ChatbotmoduleComponent {
  isListening: boolean = false;
  userMessage: string = '';
  messages: { sender: string, text: string }[] = []; // Stores chat history

  constructor(private chatbotService: couchchatbotService) {}

  sendMessage() {
    if (this.userMessage.trim() === '') return;

    const userInput = this.userMessage.trim();
    this.messages.push({ sender: 'user', text: userInput });

    this.chatbotService.sendMessage(userInput).subscribe({
      next: (response: string) => {
        console.log("Bot Response:", response);
        this.messages.push({ sender: 'bot', text: response });
      },
      error: (error: any) => {
        console.error('Error:', error);
        this.messages.push({ sender: 'bot', text: 'Error connecting to chatbot!' });
      }
    });

    this.userMessage = ''; // Clear input after sending
  }

  startListening(): void {
    this.isListening = true;
    console.log("Listening started...");
  }
}
