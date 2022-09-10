import { ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormIn } from 'src/app/shared/interfaces/form-in';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, FormIn {

  /**
   * @Variables
   */
  private showPassword: boolean;
  private loginForm!: FormGroup<any>;
  private scrollStrategy: ScrollStrategy;

  /**
   * @description Class Constructor
   * @param fb FormBuilder
   */
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private sso: ScrollStrategyOptions
  ) {
    this.showPassword = false;
    this.scrollStrategy = this.sso.noop();
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
  public get form(): FormGroup<any> {
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

  public doLogin = (): void => {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }
    // try to do login
  }

  public doSignUp = (): void => {
    this.dialog.open(SignUpComponent, {
      width: '400px',
      disableClose: true,
      height: '95%',
      scrollStrategy: this.scrollStrategy
    });
  }

  @HostListener('window:keypress', ['$event'])
  public onEnterPress = (event: KeyboardEvent): void => {
    if(event.key === 'Enter'){
      event.stopPropagation();
      event.preventDefault();
      this.doLogin();
    }
  }

}
