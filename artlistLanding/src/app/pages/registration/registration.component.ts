import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  public registrationsForm: FormGroup;
  private subscription: Subscription;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registrationsForm = this.formBuilder.group({
           artistName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(32)]],
           artistEmail: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(280)]],
           country: [false],
           bio: [false],
           profession: [false],
           isPro: [false],
           files: this.formBuilder.array([])
       });


    // set values in local storage
    this.subscription = this.registrationsForm.valueChanges.subscribe(formValue => {
        localStorage.setItem('formdata', JSON.stringify(this.registrationsForm.value));
      });

    if (localStorage.getItem('formdata')) {
       this.setSavedData();
     }
   }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setSavedData() {
    const data = JSON.parse(localStorage.getItem('formdata'));
    if (data) {
      Object.keys(data).forEach(key => {
        this.registrationsForm.controls[key].setValue(data[key]);
      });
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.registrationsForm.controls; }

  // Help to get all photos controls as form array.
  get files(): FormArray {
    return this.registrationsForm.get('files') as FormArray;
  }

  // We will create multiple form controls inside defined form controls photos.
  createItem(data): FormGroup {
      return this.formBuilder.group(data);
  }

  uploadFile(event) {
    const files = event;
    if (files) {
        Object.keys(files).forEach(index => {
        const element = event[index];
        this.files.push(this.createItem({
                 name: element.name
             }));
      });
    }
   }
   deleteAttachment(index) {
     // this.files.splice(index, 1)
     this.files.removeAt(index);
   }
  onSubmit() {
    // stop here if form is invalid
    if (this.registrationsForm.invalid) {
        return;
    }

    // clear data from local storage
    localStorage.clear();
    console.log('submitted form: ', this.registrationsForm);
  }


}
