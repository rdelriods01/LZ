import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

import { ConfigService } from './services/config.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

// TODO: Crear componente configuraciones, en donde se escogera el theme y en el div, se cambiará

  constructor(public router: Router,private afAuth: AngularFireAuth,public renderer:Renderer2, public conf:ConfigService){

    this.afAuth.authState.subscribe(us=>{
      if(us){
        // Si ya hay usuario, then=> cargar configuracion (cliente, logo, theme)
        this.conf.getConfig().subscribe(cliente=>{
          if(cliente){
            this.conf.cliente=cliente;
            this.setTheme();
            this.router.navigate(['']);
          }else{
            console.log('No hay datos del cliente');
          }
        })
      }
      else{
        console.log('No hay usuario');
        this.router.navigate(['login']);
      }
    })
  }

  setTheme(){
    let tema = this.conf.cliente.theme;
    switch(tema){
      case 'indigo': 
          this.renderer.addClass(document.body, 'indigo-theme');
          this.renderer.removeClass(document.body, 'purple-theme');
          this.renderer.removeClass(document.body, 'red-theme');
          this.renderer.removeClass(document.body, 'green-theme');
          break;
      case 'purple': 
          this.renderer.addClass(document.body, 'purple-theme');
          this.renderer.removeClass(document.body, 'indigo-theme');
          this.renderer.removeClass(document.body, 'red-theme');
          this.renderer.removeClass(document.body, 'green-theme');
          break;
      case 'green': 
          this.renderer.addClass(document.body, 'green-theme');
          this.renderer.removeClass(document.body, 'indigo-theme');
          this.renderer.removeClass(document.body, 'red-theme');
          this.renderer.removeClass(document.body, 'purple-theme');
          break;
      default: 
          this.renderer.addClass(document.body, 'red-theme');
          this.renderer.removeClass(document.body, 'indigo-theme');
          this.renderer.removeClass(document.body, 'purple-theme');
          this.renderer.removeClass(document.body, 'green-theme');
      }
  }


}



