import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormIn } from 'src/app/shared/interfaces/form-in';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, FormIn {

  /**
   * @Variables
   */
  private signUpForm!: FormGroup<any>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SignUpComponent>
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  /**
   * @description TO create the Form
   */
  public createForm(): void {
    this.signUpForm = this.fb.group({
      fName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{3,}$/)]],
      lName: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z]){3,}$/)]],
      userId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
      cPassword: ['', [Validators.required]]
    }, {
      validators: this.matchPassword.bind(this)
    });
  }

  /**
   * @description TO check password Match Validation
   * @param formGroup signUpForm
   * @returns object/null
   */
  public matchPassword = (formGroup: FormGroup) => {
    const password = formGroup.get('password')?.value;
    const cPassword = formGroup.get('cPassword')?.value;
    if (password === cPassword) {
      formGroup.get('cPassword')?.setErrors(null);
      return null;
    }
    formGroup.get('cPassword')?.setErrors({ passwordNotMatch: true });
    return { passwordNotMatch: true };
  }

  /**
   * @description TO get the Form
   */
  public get form(): FormGroup<any> {
    return this.signUpForm;
  }

  /**
   * @description TO do sign up
   * @returns nothing when form validation fails
   */
  public doSignUp = (): void => {
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.invalid) {
      // show toastr message
      return;
    }
    // do sign up
  }

  /**
   * @description To close the Dialog
   */
  public doClose = (): void => {
    this.dialogRef.close();
  }

}
