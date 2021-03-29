import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms' // "FormBuilder" is a service thus needs to be injected
// import { FormGroup, FormControl } from '@angular/forms'; // same as formbuilder but longer syntax

import { Validators } from '@angular/forms'
import { myCustomPasswordValidator } from './shared/password.validator';
import { myCustomValidator } from './shared/user-name.validator';

import { FormArray } from '@angular/forms' // needed for Dynamic forms

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  sampleForm: FormGroup

  hide = true // for password field
  submitted = false
  
  // Form Model
  // 2 ways to create:
  //
  // 1. use FormBuilder (less syntax)
  // 2. use FormGroup, FormControl (alternative)

  constructor(private fb: FormBuilder) { }

  // (for conditional validation) we want to subscribe to the ngOnInit lifecycle hook
  ngOnInit () {

    this.sampleForm = this.fb.group({

      username: ['defaultValue', [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(/^[a-zA-Z]+$/),
          myCustomValidator.forbidNameValidator, // custom validation
          myCustomValidator.otherValidator(/password/), // with parameters
        ]
      ],
      password: [''],
      confirmPassword: [''],
      address: this.fb.group({
        street: [''],
        city: ['Seoul'],
        postalCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]]
      }),
      subscription: [false],
      email: [''],
      altEmails: this.fb.array([])

    }, { validators: myCustomPasswordValidator.validateConfirmPassword } )

    // add Validators to the 'email' if subscription = true
    // conditional validation
    this.sampleForm.get('subscription').valueChanges
      .subscribe( (checkedValue)=> {
        const email = this.sampleForm.get('email')
        
        if (checkedValue) {
          email.setValidators([Validators.required, Validators.email])
        } else {
          email.clearValidators()
        }

        email.updateValueAndValidity()
      })
    
  }
  get username() { // commonly used in the html
    return this.sampleForm.get('username')
  }

  get postalCode() { // commonly used in the html
    return this.sampleForm.get('address').get('postalCode')
  }

  get email() { // commonly used in the html
    return this.sampleForm.get('email')
  }

  get altEmails() {
    return this.sampleForm.get('altEmails') as FormArray
  }

  // for Dynamic forms
  addAltEmails() { // used in html button
    // this.altEmails -- was generated by the get altEmails()
    this.altEmails.push(this.fb.control('alternate@email.com'))
    console.log(this.addAltEmails)
  }

  // for Dynamic forms
  removeAltEmail(i) {
    this.altEmails.removeAt(i)
    console.log(this.addAltEmails)
  }

  // the longer syntax ************** if not using FormBuilder
  // sampleForm = new FormGroup({
  //   username: new FormControl('defaultValue'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl('Seoul'),
  //     state: new FormControl(''),
  //     postalCode: new FormControl('')
  //   })
  // })

  loadData() {
    this.sampleForm.patchValue({ // use .setValue() instead if all values will be populated
      username: 'Brucelee',
      password: 'test',
      confirmPassword: 'test',
      address: {
        city: 'San Francisco',
        postalCode: 12345
      }
    })
  }
  
  sampleFormSubmit() {
    this.submitted = true
    
    alert(JSON.stringify(this.sampleForm.value, null, 4))
  }  

}
