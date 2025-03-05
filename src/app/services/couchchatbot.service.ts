
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class couchchatbotService {

  private chatApiUrl = 'http://127.0.0.1:5000/chat'; // Flask backend URL
  private predictApiUrl = 'http://127.0.0.1:5000/predict'; // Flask API URL

  private baseUrl = 'https://192.168.57.185:5984/dpg_chatbot'; 
  private username = 'd_couchdb'; 
  private password = 'Welcome#2'; 

  private headers = new HttpHeaders({
    'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`),
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) { }

  // Get chatbot response
  getBotResponse(userInput: string): Observable<string> {
    return this.http.post<{ response: string }>(this.chatApiUrl, { user_input: userInput })
      .pipe(
        map(res => res.response) // Extract only the response text
      );
  }

  // Predict department based on answers
  predictDepartment(answers: string[]): Observable<{ department: string }> {
    return this.http.post<{ department: string }>(this.predictApiUrl, { answers });
  }
  predictscore(answers: string[]): Observable<{ department: string }> {
    return this.http.post<{ department: string }>(this.predictApiUrl, { answers }); // ✅ No change needed (HttpClient automatically stringifies JSON)
  }
  

  // Send a message to the chatbot
  sendMessage(message: string): Observable<string> {
    return this.getBotResponse(message);
  }
  
  getsubstream():Observable<any>{
    const url=`${this.baseUrl}/_design/view/_view/substream_by_streamid?include_docs=true`;
    return this.http.get(url,{headers:this.headers});
  }

  getcourses():Observable<any>{
    const url=`${this.baseUrl}/_design/view/_view/stream_by_id`;
    return this.http.get(url,{headers:this.headers});
  }




  getSkillPrediction(answers: string[]): Observable<any> {
    return this.http.post<any>(this.predictApiUrl, { answers });
  }
}
