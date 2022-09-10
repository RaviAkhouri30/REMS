import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   * @Variables
   */
  private showPassword: boolean;
  private loginForm!: FormGroup;

  /**
   * @description Class Constructor
   * @param fb FormBuilder
   */
  constructor(
    private fb: FormBuilder
  ) {
    this.showPassword = false;
  }

  /**
   * @description Angular 1st Life Cycle hook helps initialize formGroup
   */
  ngOnInit(): void {
    this.createForm();
  }

  /**
   * @description To create the form with Validation
   */
  public createForm = (): void => {
    this.loginForm = this.fb.group({
      userId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]]
    });
  }

  /**
   * @description To get the Form
   */
  public get form(): FormGroup {
    return this.loginForm;
  }

  /**
   * TO get the value of showPassword
   * @returns value of showPassword
   */
  public isShowPassword(): boolean {
    return this.showPassword;
  }

  /**
   * @description To change the value of showPassword when user clicks on visibility icon
   * @returns To stop execution when new value is set to showPassword, it helps avoid else statement
   */
  public onShowPassword = (): void => {
    if (this.showPassword) {
      this.showPassword = false;
      return;
    }
    this.showPassword = true;
  }

  public onLogin = (): void => {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }
    // try to do login
  }

  @HostListener('window:keypress', ['$event'])
  public onEnterPress = (event: KeyboardEvent): void => {
    if(event.key === 'Enter'){
      event.stopPropagation();
      event.preventDefault();
      this.onLogin();
    }
  }

}
