import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild('f') signinForm: NgForm;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignin() {
    let email: string = this.signinForm.value.email;
    let password: string = this.signinForm.value.password;
    this.authService.signinUser(email, password);
    this.signinForm.reset();
  }

}
