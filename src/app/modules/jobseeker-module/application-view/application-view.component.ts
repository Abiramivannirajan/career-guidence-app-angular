import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { forkJoin, map, Observable } from 'rxjs';
import { couchchatbotService } from '../../../services/couchchatbot.service';

interface Application {
  _id: string;
  _rev: string;
  data: {
    applicationFormId: string;
    userId: string;
    jobId: string;
    jobName: string;
    applicationStatus: 'favorite' | 'applied' | 'joined' | 'rejected';
  };
}

@Component({
  selector: 'app-application-view',
  standalone: true,
  imports: [RouterModule, NgFor, CommonModule],
  providers: [ HttpClientModule],
  templateUrl: './application-view.component.html',
  styleUrls: ['./application-view.component.css']
})
export class ApplicationViewComponent implements OnInit {
  applications: Application[] = [];
  favorite: Application[] = [];
  applied: Application[] = [];
  joined: Application[] = [];
  rejected: Application[] = [];
  draggedApp: Application | null = null;

  constructor(private http: HttpClient, readonly jobService: couchchatbotService) {}

  ngOnInit() {
    this.fetchApplications();
  }

  fetchApplications() {
    this.jobService
      .getParticularUserApplications('register_2_87a01413-d73b-4589-a4cb-d325de2fba5')
      .subscribe({
        next: (response: any) => {
          console.log(response);
          const allJobName = response.rows.map((e: any) =>
            this.jobService
              .getParticularJob(e.doc.data.jobId)
              .pipe(
                map((jobResponse) => ({
                  _id: e.doc._id,
                  _rev: e.doc._rev,
                  data: { ...e.doc.data, jobName: jobResponse.rows[0].value },
                }))
              )
          );

          forkJoin(allJobName).subscribe({
            next: (response: any) => {
              console.log('INSIDE', response);
              this.applications = response.map((e: Application) => e);
              this.categorizeApplications();
            },
            error: (error) => {
              console.log(error);
            },
          });
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  categorizeApplications() {
    this.favorite = this.applications.filter((app) => app.data.applicationStatus === 'favorite');
    this.applied = this.applications.filter((app) => app.data.applicationStatus === 'applied');
    this.joined = this.applications.filter((app) => app.data.applicationStatus === 'joined');
    this.rejected = this.applications.filter((app) => app.data.applicationStatus === 'rejected');
  }

  trackByFn(index: number, item: Application) {
    return item.data.applicationFormId;
  }

  onDragStart(event: DragEvent, app: Application): void {
    this.draggedApp = app;
    event.dataTransfer?.setData('application/json', JSON.stringify(app));
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault(); // Required to allow drop
  }

  onDrop(event: DragEvent, newStatus: 'favorite' | 'applied' | 'joined' | 'rejected'): void {
    event.preventDefault();

    if (!this.draggedApp) return;

    // Remove from old array
    this.removeFromPreviousList(this.draggedApp);

    // Update status locally
    this.draggedApp.data.applicationStatus = newStatus;

    // Add to new array
    this.getListByStatus(newStatus).push(this.draggedApp);

    // Persist in DB
    this.jobService.changeJobStatus(this.draggedApp._id, this.draggedApp).subscribe({
      next: (response: any) => {
        console.log('Job status updated successfully:', response);

        // Update the local state with the new _rev and status
        this.updateLocalJob(this.draggedApp, response.rev);
        this.draggedApp = null
      },
      error: (error) => {
        console.error('Error updating job status:', error);

        // Revert the local changes if the API call fails
        this.revertLocalChanges(this.draggedApp!, newStatus);
      },
    });

    // Reset draggedApp
  }

  removeFromPreviousList(app: Application) {
    this.favorite = this.favorite.filter((a) => a.data.applicationFormId !== app.data.applicationFormId);
    this.applied = this.applied.filter((a) => a.data.applicationFormId !== app.data.applicationFormId);
    this.joined = this.joined.filter((a) => a.data.applicationFormId !== app.data.applicationFormId);
    this.rejected = this.rejected.filter((a) => a.data.applicationFormId !== app.data.applicationFormId);
  }

  getListByStatus(status: 'favorite' | 'applied' | 'joined' | 'rejected'): Application[] {
    switch (status) {
      case 'favorite':
        return this.favorite;
      case 'applied':
        return this.applied;
      case 'joined':
        return this.joined;
      case 'rejected':
        return this.rejected;
      default:
        return [];
    }
  }

  // Update the local job with the new _rev and status
  updateLocalJob(updatedJob: Application | null, revId :string) {
    if(updatedJob){
    // Find the index of the job in the applications array
    const index = this.applications.findIndex((app) => app._id === updatedJob._id);
    if (index !== -1) {
      // Update the job in the applications array
      updatedJob._rev = revId;
      this.applications[index] = updatedJob;
      console.log(this.applications);
      
      this.categorizeApplications();
    }
  }
  else{
    alert("No job to update")
  }
  }

  // Revert local changes if the API call fails
  revertLocalChanges(app: Application, oldStatus: 'favorite' | 'applied' | 'joined' | 'rejected') {
    // Remove from the new array
    const newStatusArray = this.getListByStatus(app.data.applicationStatus);
    const newIndex = newStatusArray.findIndex((a) => a._id === app._id);
    if (newIndex !== -1) {
      newStatusArray.splice(newIndex, 1);
    }

    // Revert the status
    app.data.applicationStatus = oldStatus;

    // Add back to the old array
    this.getListByStatus(oldStatus).push(app);
  }
}