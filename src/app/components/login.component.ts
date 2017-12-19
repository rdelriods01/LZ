import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: '../views/login.html',
  styleUrls: ['../css/login.css']
})
export class LoginComponent{

  constructor(public authService: AuthService, private router:Router) { }

  login() {
    this.authService.loginWithGoogle();
  }

}