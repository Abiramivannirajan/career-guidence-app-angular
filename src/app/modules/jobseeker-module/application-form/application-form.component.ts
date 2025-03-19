import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { couchchatbotService } from '../../../services/couchchatbot.service';

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ],
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent {
  applicationForm: FormGroup;

  constructor(readonly couchchatbot: couchchatbotService, private fb: FormBuilder) {
    this.applicationForm = this.fb.group({

      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],

      gender: ['', Validators.required],
      email: ['vabi4135@gmail.com', Validators.required],
      education: ['', Validators.required],
      cv: [null, Validators.required]
    });
  }

  onFileSelected(event: any) { //This method is called when there is change in the file input
    const file = event.target.files[0];
    if (file) {
      this.applicationForm.patchValue({ cv: file });  
      //patchValue is a method in Angular's Reactive Forms that allows you to update specific form control values without affecting the entire form
    }
  }

  onSubmit() {
    console.log(this.applicationForm);
    alert("Application submitted Sucessfully, we will react out through mail!")

    // if (this.applicationForm.valid)  
    const formData = new FormData();
    formData.append('name', this.applicationForm.value.name);
    formData.append('age', this.applicationForm.value.age);
    formData.append('gender', this.applicationForm.value.gender);
    formData.append('email', this.applicationForm.value.email);
    formData.append('education', this.applicationForm.value.education);
    formData.append('cv', this.applicationForm.value.cv);
    const emailData = { name: this.applicationForm.value.name, age: this.applicationForm.value.age, gender: this.applicationForm.value.gender, education: this.applicationForm.value.education, email: this.applicationForm.value.email }
    this.couchchatbot.onJobApplicationEmail(emailData).subscribe(
      { 
        next: (response) => console.log(response) 
      }
    );

  }




}
