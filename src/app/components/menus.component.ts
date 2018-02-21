import { Component, Input, Output, EventEmitter, OnChanges, OnInit} from '@angular/core';
import {MdDialog, MdDialogRef, MdTabChangeEvent} from '@angular/material';

import { AddPlatillosComponent } from './addPlatillos.component';

import {VisitaService} from '../services/visita.service';

@Component({
  selector: 'menusC',
  templateUrl: '../views/menus.html',
  styleUrls: ['../css/menus.css'],
  providers:[VisitaService]
})
export class MenusComponent implements OnChanges, OnInit {

    @Input() paciente:any;
    @Input() Citas:any;
    @Input() yaConsulto:Boolean;

    @Output() yaGuardado = new EventEmitter<string>();

    temp:any;
    save:Boolean=false;
    inicial:any;
    nTabs:any;
    nuevoMenu:Boolean=false;

    constructor(public dialog: MdDialog,public visitaService: VisitaService,){
        this.clearTemp();
        // console.log(this.Citas);
        // this.nTabs=this.Citas.length-1;
    }
    ngOnInit(){
        // console.log(this.Citas);
        // this.nTabs=this.Citas.length-1;
    }
    indexviejo:any[]=[];

    ngOnChanges(){
        console.log(this.Citas);
        this.nTabs=this.Citas.length-1;
        this.indexviejo.push(this.nTabs);
        // let n=this.nTabs.toString();
        if(!this.yaConsulto){ this.Citas.shift() }
        if(this.Citas[this.nTabs].menuF==false){
            this.save=true;
        }
    }

    clearTemp(){
        this.temp={desayuno:[],comida:[],cena:[],snack:[]}
    }

    onTabChange(e: MdTabChangeEvent){
        console.log('index => ', e.index);
        this.indexviejo.push(e.index);
        let n = this.indexviejo[this.indexviejo.length-2];
        console.log(n);
        if(e.index==this.nTabs){
            this.save=true;
            this.Citas[e.index].menuF=false;
            this.clearTemp();
            if(this.save==false){  this.Citas[n].menuCompleto=this.inicial }
        }else{
            if(this.save==false){
                this.Citas[e.index].menuF=true;
                this.Citas[n].menuCompleto=this.inicial;
                this.save=true;

            //     this.clearTemp();
            }
        }
        console.log(this.Citas);
    }
    
    openPlatillosDialog(C,T){ //lee a cual cita corresponde, y el tiempo de comida
        if(C.menuF==false){ //si es false(esta unlock o es nuevo)
            let dialogRef = this.dialog.open(AddPlatillosComponent);
            dialogRef.componentInstance.tiempo=T; //enviar al dialog el tiempo
            if(!C.menuCompleto){ this.nuevoMenu=true}else{this.nuevoMenu=false}
            if(this.nuevoMenu==true){
                dialogRef.componentInstance.newM=true; //avisar que es nuevo menu
            }else {
                dialogRef.componentInstance.newM=false;
                console.log('no es nuevo, está unlock');
                console.log(C.menuCompleto[T]);
                dialogRef.componentInstance.seleccionados=this.temp[T];
            } 

            // if(this.save==false){dialogRef.componentInstance.seleccionados=C.menuCompleto[T]}
            dialogRef.afterClosed().subscribe(result => { //recoger del dialog
                if(result!=null){
                    this.temp[T]=result;
                }        
            });
        }
    }

    unlock(C){
        this.inicial = JSON.parse(JSON.stringify(C.menuCompleto))
        this.temp = JSON.parse(JSON.stringify(C.menuCompleto))
        this.save=false;
        C.menuF=false;
    }

    lock(C){
        C.menuCompleto=this.inicial;
        this.save=true;
        C.menuF=true;
    }

    guardar(C){
        if(this.temp.desayuno.length==0 || this.temp.comida.lengt==0 || this.temp.cena.length==0 || this.temp.snack.length==0 ){
            alert('Es necesario llenar todos los tiempos de comida para poder guardar el menú');
        }else{
            C.menuF=true;
            C.menuCompleto=this.temp;
            // volver a poner la fecha como es
            let dateSplit =  C.fecha.split("-");
            let mes:string[]=[
                'ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'
            ];
            for(let j=1;j<=12;j++){
                if(dateSplit[1]==mes[j-1]){
                    dateSplit[1]=j;
                    if(dateSplit[1]<10){
                        dateSplit[1]=('0'+dateSplit[1]);
                    }
                }
            }
            C.fecha=(dateSplit[0]+'-'+dateSplit[1]+'-'+dateSplit[2]);
            this.visitaService.editVisita(C.id,C);
            this.yaGuardado.next();
            this.save=true;
            this.clearTemp();
        }
    }
}
