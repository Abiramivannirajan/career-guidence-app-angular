import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root' // Ensures the service is available throughout the app
})
export class FAQService {
  private readonly baseURL = 'https://192.168.57.185:5984/dpg_chatbot';
  private readonly userName = 'd_couchdb';
  private readonly password = 'Welcome#2';

  private readonly headers = new HttpHeaders({
    'Authorization': 'Basic ' + btoa(`${this.userName}:${this.password}`),
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  // Add an FAQ document to the database
  add_faq(faq_data: any): Observable<any> {
    const url = `${this.baseURL}`;
    console.log("Adding FAQ:", faq_data);
    return this.http.post<any>(url, faq_data, { headers: this.headers });
  }

  // Fetch all FAQ documents from the database
  get_faqs(): Observable<any> {
    const url = `${this.baseURL}/_design/view/_view/faq_by_faqid`;
    console.log("Fetching FAQs...");
    return this.http.get<any>(url, { headers: this.headers });
  }
}
