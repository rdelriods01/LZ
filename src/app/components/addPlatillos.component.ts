import { Component , OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';

import {PlatilloService} from '../services/platillos.service';

@Component({
  selector: 'addPlatillosC',
  templateUrl: '../views/addPlatillos.html',
  styleUrls: ['../css/addPlatillos.css'],
  providers:[PlatilloService]

})
export class AddPlatillosComponent implements OnInit{

    tiempo:String;

    platillo:String;
    descripcion:String;
    temp:any;
    sugerencias:any;
    seleccionados:any[];

    constructor(public dialogRef: MdDialogRef<AddPlatillosComponent>,public platilloService: PlatilloService){
    }

    ngOnInit(){
        this.sugerencias=this.platilloService.getPlatillos(this.tiempo);
    }

    select(p){
        let n=this.seleccionados.length;
        if(n==0){
            this.seleccionados.push(p);
            for(let i=0;i<this.sugerencias.length;i++){
                if(p.platillo==this.sugerencias[i].platillo){
                    this.sugerencias[i].flag=true;
                }
            }
        }else{
            let yasta:Boolean=false;
            for(let i=0;i<n;i++){
                if(p.platillo==this.seleccionados[i].platillo){
                    yasta=true;
                    this.seleccionados.splice(i,1);
                    n--;
                    for(let j=0;j<this.sugerencias.length;j++){
                        if(p.platillo==this.sugerencias[j].platillo){
                            this.sugerencias[j].flag=false;
                        }
                    }
                }
            }
            if(yasta==false){
                this.seleccionados.push(p);
                for(let j=0;j<this.sugerencias.length;j++){
                    if(p.platillo==this.sugerencias[j].platillo){
                        this.sugerencias[j].flag=true;
                    }
                }
            }
        }      
    }

    addPlatillo(){
        this.temp={id:"",platillo:this.platillo,descripcion:this.descripcion,flag:true};
        this.seleccionados.push(this.temp);
        this.sugerencias.push(this.temp);
        this.platillo="";
        this.descripcion="";
        this.temp={};
    }

    delPlatillo(p){
        let n=this.seleccionados.length;
        for(let i=0;i<n;i++){
            if(p.platillo==this.seleccionados[i].platillo){
                this.seleccionados.splice(i,1);
                n--;
                for(let j=0;j<this.sugerencias.length;j++){
                    if(p.platillo==this.sugerencias[j].platillo){
                        this.sugerencias[j].flag=false;
                    }
                }
            }
        }
    }

    enviar(){
        this.dialogRef.close(this.seleccionados);
    }

}