// import { CommonModule } from '@angular/common';
// import { Component, inject } from '@angular/core';
// import { RouterModule, Router } from '@angular/router';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { Course } from '../../../services/course.service';
// import { AdminService } from '../../admin-module/admin-view/admin_view.service';
// import { TrendingcourseService } from '../../../services/trendingcourse.service';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-trending-courses',
//   standalone: true,
//   imports: [
//     CommonModule,RouterModule, HttpClientModule,FormsModule,
//   ],
//   providers:[AdminService, HttpClient, Router,TrendingcourseService],
//   templateUrl: './trending-courses.component.html',
//   styleUrl: './trending-courses.component.css'
// })
// export class TrendingCoursesComponent {

//  constructor(private router: Router, private courseService : TrendingcourseService){}

//  course :Course  = inject(Course);
 
//  searchTerm: string = '';
// courseDetails = [
//   {
//     title: 'BUSINESS',
//     imagelocation: 'assets/bussiness.jpg',
//     paragraph: 'Business is the backbone of economic growth, fostering innovation, job creation, and societal development. It involves identifying opportunities, managing resources efficiently, and delivering value to customers while generating profits. Successful businesses are built on strong strategies, market research, and a deep understanding of consumer needs. ',
//     button: 'INFO'
//   },
//   {
//     title: 'ARTFICIAL  INTELLIGENCE & MACHINE LEARNING',
//     imagelocation: 'assets/artifical machine.jpg',
//     paragraph: 'AI and ML drive innovation across industries, including healthcare, finance, robotics, and autonomous systems. This field involves building intelligent systems that learn from data and improve over time.',
//     button: 'INFO'
//   },
//   {
//     title: 'CYBER SECURITY',
//     imagelocation: 'assets/cybersecurity.jpg',
//     paragraph: 'Cybersecurity has become one of the most critical fields in the digital age, safeguarding organizations, governments, and individuals from the increasing threat of cyberattacks. It encompasses a wide range of practices, technologies, and strategies designed to protect systems, networks, and data..',
//     button: 'INFO'
//   },

//   {
//     title:'ASTROPHYSICS AND SPACE SCIENCE',
//     imagelocation: 'assets/astrophysices.jpg',
//     paragraph: 'Astrophysics and Space Science are among the most fascinating and cutting-edge fields, combining theoretical physics, observational studies, and advanced technology to explore the universe',
//      button: 'INFO'
//   },
//   {
//     title: 'BIOTECHNOLOGY AND BIOINFORMATICS',
//     imagelocation: 'assets/biotechnology.jpg',
//     paragraph: 'Biotechnology and Bioinformatics are rapidly advancing fields that combine biology, technology, and computational tools to revolutionize healthcare, agriculture, and environmental science..',
//     button: 'INFO'
//   }, {
//     title: 'TELEMEDICINE AND REMOTE HEALTHCARE',
//     imagelocation: 'assets/telemedicine.jpg',
//     paragraph: 'Telemedicine and Remote Healthcare are transforming the healthcare industry by making medical services accessible, efficient, and convenient through digital technologies and virtual platforms..',
//     button: 'INFO'
//   },{
//     title: 'FINE ARTS AND CREATIVE DESIGN',
//     imagelocation: 'assets/arts science.jpg',
  
//     paragraph: 'Fine Arts and Creative Design encompass diverse disciplines that celebrate creativity, innovation, and artistic expression, offering individuals a chance to transform ideas into visual, tangible, and impactful works..',
//     button: 'INFO'
//   },
//   {
//     title: 'NETWORK SECURITY ARCHITECTURE',
//     imagelocation: 'assets/networking.jpg',
//     paragraph: 'A network security engineer is responsible for designing, implementing, and maintaining security measures to protect an organizationNetwork Security courses cover protecting computer networks and data through firewalls, intrusion detection, and secure protocols. Mastering Network Security is crucial for IT professionals, security analysts, and anyone interested in cybersecurity..',
//     button: 'INFO'
//   }


// ];

// // Dynamic search value
// somevalue = ''; // User input for search

// // Handle button click
// apply(courseTitle: string) {
//   this.course.courseName = courseTitle;
//     this.router.navigate(['more-info']);

//   // Add application logic here
// }

//   courseFromDB: any[] = [];
  
//   ngOnInit(){
//     this.courseService.get_document().subscribe({
//       next : (response) =>{
//         console.log("Succesfully get");
//         console.log(response);
//         response.rows.forEach((e : any) =>{
//           this.courseFromDB.push({coursename : e.value.data.coursename, coursedescription: e.value.data.coursedescription})
//         })
//         console.log(this.courseFromDB);
        
//       },
//       error : () => {
//         console.log("error in trending course");
        
//       }
//     });
//   }
// }
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// import { AdminService } from '../../admin-module/admin-view/admin_view.service';
// import { TrendingcourseService } from '../../../services/trendingcourse.service';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';


@Component({
  selector: 'app-trending-courses',
  standalone:true,
  imports: [
    CommonModule, RouterModule, HttpClientModule, FormsModule,NavBarComponent
  
],
  providers: [HttpClient], // Removed HttpClient & Router
  templateUrl: './trending-courses.component.html',
  styleUrls: ['./trending-courses.component.css']
})
export class TrendingCoursesComponent {
  courseService: any;
  constructor(private router: Router) {}

  // If Course is a class, initialize it properly
  // course: Course = { courseName: '' }; 

  searchTerm: string = '';
  courseDetails = [
    { title: 'BUSINESS', imagelocation: 'assets/bussiness.jpg', paragraph: '', button: 'INFO' },
    // { title: 'ARTIFICIAL INTELLIGENCE & MACHINE LEARNING', imagelocation: 'assets/artificial_machine.jpg', paragraph: '...', button: 'INFO' },
    { title: 'CYBER SECURITY', imagelocation: 'assets/cybersecurity.jpg', paragraph: '', button: 'INFO' },
    // { title: 'ASTROPHYSICS AND SPACE SCIENCE', imagelocation: 'assets/astrophysics.jpg', paragraph: '...', button: 'INFO' },
    { title: 'BIOTECHNOLOGY AND BIOINFORMATICS', imagelocation: 'assets/biotechnology.jpg', paragraph: '', button: 'INFO' },
    { title: 'TELEMEDICINE AND REMOTE HEALTHCARE', imagelocation: 'assets/telemedicine.jpg', paragraph: '', button: 'INFO' },
    // { title: 'FINE ARTS AND CREATIVE DESIGN', imagelocation: 'assets/arts_science.jpg', paragraph: '...', button: 'INFO' },
    { title: 'NETWORK SECURITY ARCHITECTURE', imagelocation: 'assets/networking.jpg', paragraph: '', button: 'INFO' }
  ];

  // Dynamic search value
  somevalue = '';

  // Handle button click
  apply(courseTitle: string) {
    // this.course.courseName = courseTitle;
    this.router.navigate(['/more-info']);
  }

  courseFromDB: any[] = [];

  // ngOnInit() {
  //   this.courseService.get_document().subscribe({
  //     next: (response:any) => {
  //       console.log("Successfully fetched:", response);
  //       if (response && response.rows) {
  //         response.rows.forEach((e: any) => {
  //           this.courseFromDB.push({
  //             coursename: e.value?.data?.coursename ?? 'Unknown Course',
  //             coursedescription: e.value?.data?.coursedescription ?? 'No description available'
  //           });
  //         });
  //       }
  //       console.log("Processed courses:", this.courseFromDB);
  //     },
  //     error: (err:any) => {
  //       console.error("Error in fetching trending courses:", err);
  //     }
  //   });
  // }
}
