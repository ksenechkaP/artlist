import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})
export class RegistrationComponent implements OnInit {
  public registrationsForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registrationsForm = this.formBuilder.group({
           artistName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(32)]],
           artistEmail: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(280)]],
           country: [false],
           bio: [false],
           profession: [false],
           isPro: [false],
       });
  }

  // convenience getter for easy access to form fields
get f() { return this.registrationsForm.controls; }

  onSubmit() {
    // stop here if form is invalid
    if (this.registrationsForm.invalid) {
        return;
    }
    console.log('submitted form: ', this.registrationsForm);
  }
}
