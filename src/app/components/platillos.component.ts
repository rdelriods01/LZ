import { Component, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Platillo } from '../models/platillo';

import {PlatilloService} from '../services/platillos.service';

@Component({
  selector: 'platillosC',
  templateUrl: '../views/platillos.html',
  styleUrls: ['../css/platillos.css'],
  providers:[PlatilloService]
})
export class PlatillosComponent {

    platillo:string;
    descripcion:string;
    desayunos:any[]=[];
    comidas:any[]=[];
    cenas:any[]=[];
    snacks:any[]=[];

    editF:Boolean=false;
    temp:any;
    tdc:string=''; //tiempo de comida
    tiempos=['desayuno','comida','cena','snack'];


    constructor (
        public platilloService: PlatilloService
    ){  
        this.showTodo();
    }

    showTodo(){
        this.desayunos=[];
        this.comidas=[];
        this.cenas=[];
        this.snacks=[];
        this.desayunos= this.platilloService.getPlatillos('desayuno');
        this.comidas= this.platilloService.getPlatillos('comida');
        this.cenas= this.platilloService.getPlatillos('cena');
        this.snacks= this.platilloService.getPlatillos('snack'); 
    }

    addPlatillo(t){
        this.temp={id:"",platillo:this.platillo,descripcion:this.descripcion,flag:false};
        this.platilloService.savePlatillo(this.temp,t);
        this.platillo="";
        this.descripcion="";
        this.temp={};
        this.showTodo();
    }

    edit(x,t){
        this.editF=true;
        this.temp=x;
        this.platillo=x.platillo;
        this.descripcion=x.descripcion;
        this.tdc=t;
    }
    actualizar(){
        this.temp.platillo=this.platillo;
        this.temp.descripcion=this.descripcion;
        this.platilloService.updatePlatillo(this.temp.id,this.temp,this.tdc);
        this.editF=false;
        this.platillo="";
        this.descripcion="";
        this.temp={};
        this.tdc='';
        this.showTodo();
    }
    delete(x,t){
        this.platilloService.deletePlatillo(x.id,t);
        this.showTodo();
    }

}
