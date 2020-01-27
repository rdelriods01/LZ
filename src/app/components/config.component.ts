import { Component, Renderer2} from '@angular/core';

import { ConfigService } from '../services/config.service';

@Component({
  selector: 'configC',
  templateUrl: '../views/config.html',
  styleUrls: ['../css/config.css']
})
export class ConfigComponent {

    nombre:string;
    colors=[
        {color: '#F44336', nombre:'red'},
        {color: '#303F9F', nombre:'indigo'},
        {color: '#7B1FA2', nombre:'purple'},
        {color: '#388E3C', nombre:'green'},
    ];
    temaElegido:string;


  constructor(public conf:ConfigService, public renderer:Renderer2 ) { 

    this.nombre=this.conf.cliente.nombre;
    this.temaElegido=this.conf.cliente.theme;

  }
  
   dale(){
        this.conf.cliente.nombre=this.nombre;
    }
 
    themeChange(a){
        switch(a){
            case 'indigo': 
                this.renderer.addClass(document.body, 'indigo-theme');
                this.renderer.removeClass(document.body, 'purple-theme');
                this.renderer.removeClass(document.body, 'red-theme');
                this.renderer.removeClass(document.body, 'green-theme');
                this.temaElegido=a;
                break;
            case 'purple': 
                this.renderer.addClass(document.body, 'purple-theme');
                this.renderer.removeClass(document.body, 'indigo-theme');
                this.renderer.removeClass(document.body, 'red-theme');
                this.renderer.removeClass(document.body, 'green-theme');
                this.temaElegido=a;
                break;
            case 'green': 
                this.renderer.addClass(document.body, 'green-theme');
                this.renderer.removeClass(document.body, 'indigo-theme');
                this.renderer.removeClass(document.body, 'red-theme');
                this.renderer.removeClass(document.body, 'purple-theme');
                this.temaElegido=a;
                break;
            default: 
                this.renderer.addClass(document.body, 'red-theme');
                this.renderer.removeClass(document.body, 'indigo-theme');
                this.renderer.removeClass(document.body, 'purple-theme');
                this.renderer.removeClass(document.body, 'green-theme');
                this.temaElegido=a;
            }
        
    }

    guardarConfig(){
        let newCliente={
            nombre: this.nombre,
            logoURL:'assets/images/logo.png',
            theme:this.temaElegido
        }
        this.conf.updateConfig(newCliente);
    }

}
