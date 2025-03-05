import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class RegisterService {
  getQuestions() {
    throw new Error('Method not implemented.');
  }

  private baseUrl = 'https://192.168.57.185:5984/dpg_chatbot';
  private username = 'd_couchdb';
  private password = 'Welcome#2';

  currentuser: string = '';

  private headers = new HttpHeaders({
    'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`),
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) { }

  // Register User
  registerUser(data: any): Observable<any> {
    console.log("Registering user...");
    return this.http.post(this.baseUrl, data, { headers: this.headers });
  }

  setLoggedUser(userName : string){
    localStorage.setItem('currentUser', userName);
    console.log(localStorage);
    
  }

  getLoggedInUser(): any {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser;
  }

  // Logout Method - Clear session and remove from localStorage
  logout() {
    localStorage.removeItem('currentUser'); // Clear from localStorage
    console.log('User logged out');
  }
  // Get All Users
  getAllUser(): Observable<any> {
    const url = `${this.baseUrl}/_design/view/_view/register_by_email?include_docs=true`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  // Check if User Exists
  checkUser(email: string): Observable<any> {
    const url = `${this.baseUrl}/_design/view/_view/register_by_email?key="${email}"&include_docs=true`;
    return this.http.get<any>(url, { headers: this.headers });
  }


  // Pricing Plans
  addPlan(plan: any): Observable<any> {
    return this.http.post(this.baseUrl, plan, { headers: this.headers });
  }

  getPlans(): Observable<any> {
    const url = `${this.baseUrl}/_design/view/_view/pricing_by_id?include_docs=true`;
    return this.http.get(url, { headers: this.headers });
  }

  // Job Details
  addJob(jobData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, jobData, { headers: this.headers });
  }

  getJobs(): Observable<any> {
    const url = `${this.baseUrl}/_design/view/_view/jobdetails_by_id?include_docs=true`;
    return this.http.get<any>(url, { headers: this.headers });
  }



  // Courses
  addCourses(course: any): Observable<any> {
    return this.http.post(this.baseUrl, course, { headers: this.headers });
  }

  getCourses(): Observable<any> {
    const url = `${this.baseUrl}/_design/view/_view/stream_by_id?include_docs=true`;
    return this.http.get(url, { headers: this.headers });
  }

  // Colleges
  addColleges(college: any): Observable<any> {
    return this.http.post(this.baseUrl, college, { headers: this.headers });
  }

  getColleges(streamId: any): Observable<any> {
    const url = `${this.baseUrl}/_design/view/_view/colleges_by_streamid?key="${streamId}"&include_docs=true`;
    console.log(url);
    return this.http.get(url, { headers: this.headers });
  }

  // Substreams
  addSubstream(substream: any): Observable<any> {
    return this.http.post(this.baseUrl, substream, { headers: this.headers });
  }

  getSubstream(): Observable<any> {
    const url = `${this.baseUrl}/_design/view/_view/substream_by_streamid?include_docs=true`;
    return this.http.get(url, { headers: this.headers });
  }


  onJobApplicationEmail(data: any) {
    return this.http.post<any>(`http://localhost:8000/apply-job`, data);
  }
  

 
  
  // Get the questions from CouchDB
  getMockInterviewQuestions(): Observable<any> {
    const url = `${this.baseUrl}/_design/view/_view/mockinterview_by_id?include_docs=true`;
    return this.http.get(url, { headers: this.headers });
  }

  // Add a question to CouchDB
  addMockInterviewQuestion(questionData: any): Observable<any> {
    const url = `${this.baseUrl}`
    return this.http.post(url,{data:questionData}, { headers: this.headers });
  }


  
}


