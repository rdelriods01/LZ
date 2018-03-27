import { Component } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { ConfigService } from '../services/config.service';


@Component({
  selector: 'loginC',
  templateUrl: '../views/login.html',
  styleUrls: ['../css/login.css']
})
export class LoginComponent {
  
  email:string;
  pass:string;

  constructor(public auth: AuthService, public conf:ConfigService) { }
  

}
