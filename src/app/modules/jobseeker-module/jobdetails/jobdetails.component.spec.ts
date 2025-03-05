import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetails } from './jobdetails.component';
import { JobdetailformComponent } from '../../admin-module/jobdetailform/jobdetailform.component';

describe('JobdetailsComponent', () => {
  let component: JobdetailformComponent;
  let fixture: ComponentFixture<JobdetailformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobDetails]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobdetailformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
