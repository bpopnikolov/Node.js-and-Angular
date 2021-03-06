import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('f') signupForm: NgForm;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignup() {
    let email: string = this.signupForm.value.email;
    let password: string = this.signupForm.value.password;
    this.authService.signupUser(email, password);
    this.signupForm.reset();
  }

}
