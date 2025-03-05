import { Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../../services/register.service.service'; 
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-commonlogin',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, HttpClientModule],
  templateUrl: './commonlogin.component.html',
  styleUrl: './commonlogin.component.css',
  providers: [HttpClient],
})
export class CommonloginComponent {
  email: string = '';
  password: string = ''; //undefined
  userType: string = '';
  isFormSubmitted = false;
  data:any

  loginStatus : boolean = false;

  emailError='';
  passwordError='';
  
  private router = inject(Router);

  constructor(private registerService: RegisterService) {}
  // Handle form submission
  onLogin(form: NgForm) {
    this.isFormSubmitted = true;

    if (form.invalid) {
      alert('Please fill all fields correctly');
      return;
    }

    // Call getUser to check if the user exists
    this.registerService.checkUser(this.email).subscribe({
      next: (response: any) => {
        if(response.rows.length===0){
          this.emailError='email not found'
          return ;
        }
        const userdata=response.rows[0].doc.data
        console.log(userdata);

        if(userdata.password!== this.password){
          this.passwordError='Incorrect Password'
          return
        }
        
        let userType : string = userdata.userType;
        console.log('Response from DB:',userType);
        
        this.registerService.currentuser = userdata.name;
        this.loginStatus=true;

        this.registerService.setLoggedUser(userdata.name);
        if(this.loginStatus === true){
          if(userType === 'student')
            this.router.navigate(['/home']);
          else if(userType ==='jobseeker')
            this.router.navigate(['/job-seeker-home-page']);
          else if(userType==='Admin')
            this.router.navigate(['./admin-view'])
        }
      },
    });
  }
  // reset the form 
  resetForm(form: NgForm) {
    form.resetForm(); 
    this.email = '';
    this.password = '';
    this.userType = '';
    this.loginStatus=false;
    this.emailError='';
    this.passwordError='';
  }
}
