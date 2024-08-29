import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginData = {
    username: '',
    password: '',
    userType: ''
  };

  constructor() {}

  login() {
    console.log(this.loginData);
    
  }
}
