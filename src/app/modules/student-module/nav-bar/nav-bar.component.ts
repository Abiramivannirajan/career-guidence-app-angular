import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RegisterService } from '../../../services/register.service.service';
import { NgIf } from '@angular/common';
import { log } from 'console';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule,NgIf],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  currentuser: any = null;  // Store user data
 

  constructor(private registerservice:RegisterService, private router: Router) {}

  ngDoCheck() {
    this.currentuser = this.registerservice.getLoggedInUser(); // Get user data from service
    console.log(this.currentuser);
  }
// home.component.ts
logout() {
  this.registerservice.logout(); // Clear session data
  this.router.navigate(['/login']); // Navigate to login page
}




}
