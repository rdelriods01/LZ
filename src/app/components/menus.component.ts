import { Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

import { AddPlatillosComponent } from './addPlatillos.component';

import {VisitaService} from '../services/visita.service';

@Component({
  selector: 'menusC',
  templateUrl: '../views/menus.html',
  styleUrls: ['../css/menus.css'],
  providers:[VisitaService]
})
export class MenusComponent {

    @Input() Cita:any;
    @Output() yaGuardado = new EventEmitter<string>();

    temp:any;
    mes:string[]=[
        'ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'
    ];
    fechaPrint:any;

    constructor(public dialog: MatDialog,public visitaService: VisitaService,){
        this.clearTemp();
    }

    ngOnChanges(){
        console.log(this.Cita);
        if(this.Cita.menuCompleto){
            this.temp=this.Cita.menuCompleto;
        }
        let temp=this.Cita.fecha.split("-");
        for(let j=1;j<=12;j++){
            if(temp[1]==j){
                temp[1]=this.mes[j-1];
            }
        }
        this.fechaPrint=(temp[2] + " de " + temp[1] + " de " + temp[0]);
    }

    clearTemp(){
        this.temp={desayuno:[],comida:[],cena:[],snack:[]}
    }

    openPlatillosDialog(T){ //lee a cual cita corresponde, y el tiempo de comida
        if(this.Cita.menuF==false){ //si es false(esta unlock o es nuevo)
            let dialogRef = this.dialog.open(AddPlatillosComponent);
            dialogRef.componentInstance.tiempo=T; //enviar al dialog el tiempo
            dialogRef.componentInstance.seleccionados=this.temp[T];
            dialogRef.afterClosed().subscribe(result => { //recoger del dialog
                if(result!=null){
                    this.temp[T]=result;
                }        
            });
        }
    }

    guardar(){
        if(this.temp.desayuno.length==0 || this.temp.comida.lengt==0 || this.temp.cena.length==0 || this.temp.snack.length==0 ){
            alert('Es necesario llenar todos los tiempos de comida para poder guardar el menú');
        }else{
            this.Cita.menuF=true;
            this.Cita.menuCompleto=this.temp;
            console.log(this.Cita.fecha);
            this.formatoFecha();
            this.visitaService.editVisita(this.Cita.id,this.Cita);
            this.yaGuardado.next();
            this.clearTemp();
        }
    }

    imprimir(){
        window.print();
    }
    
    editarMenu(){
        this.Cita.menuF=false;
        this.formatoFecha();
        this.visitaService.editVisita(this.Cita.id,this.Cita);
        this.yaGuardado.next();
    }


    formatoFecha(){
        let dateSplit =  this.Cita.fecha.split("-");
        for(let j=1;j<=12;j++){
            if(dateSplit[1]==this.mes[j-1]){
                dateSplit[1]=j;
                if(dateSplit[1]<10){
                    dateSplit[1]=('0'+dateSplit[1]);
                }
            }
        }
        this.Cita.fecha=(dateSplit[0]+'-'+dateSplit[1]+'-'+dateSplit[2]);
    }
}
