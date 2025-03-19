import { Component } from '@angular/core';
import { couchchatbotService } from '../../../services/couchchatbot.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-free-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './free-courses.component.html',
  styleUrl: './free-courses.component.css'
})
export class FreeCoursesComponent {

  activeIndex: number | null = null;
  showAll: boolean = false;
  visibleCount: number = 3;
  newcards: any[] = [];
  visibleCards: any[] = [];
  departments: string[] = []; 
  selectedDepartment: string | null = null;

  constructor(private Couch: couchchatbotService) {}

  ngOnInit() {
    this.getcarddetails();
  }

  getcarddetails() {
    this.Couch.getCardDetails().subscribe({
      next: (response: any) => {
        console.log('API Response:', response);

        if (response && response.rows && response.rows.length > 0) {
          this.newcards = response.rows.map((row: any) => ({
            id: row.id,
            imageUrl: row.doc?.data?.imageUrl || 'assets/default.jpg',
            title: row.doc?.data?.Title || 'No Title',
            description: row.doc?.data?.Description || 'No Description',
            duration: row.doc?.data?.Duration || 'N/A',
            department: row.doc?.data?.Department || 'General', 
          }));

          this.updateVisibleCards();
          this.updateDepartments();
        }
      },
      error: (error) => {
        console.error('Error fetching card details:', error);
      },
    });
  }

  updateVisibleCards() {
    if (this.selectedDepartment) {
      this.visibleCards = this.newcards.filter(card => card.department === this.selectedDepartment);
    } else {
      this.visibleCards = this.showAll ? [...this.newcards] : this.newcards.slice(0, this.visibleCount);
    }
  }

  toggleView() {
    this.showAll = !this.showAll;
    this.updateVisibleCards();
  }

  setActiveIndex(index: number) {
    this.activeIndex = index;
    this.selectedDepartment = this.departments[index]; 
    this.updateVisibleCards();
  }

  updateDepartments() {
    const departmentSet = new Set(this.newcards.map(card => card.department)); 
    this.departments = Array.from(departmentSet);
  }

}
