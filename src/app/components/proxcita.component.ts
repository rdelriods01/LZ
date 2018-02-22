import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router} from '@angular/router';

import { VisitaService } from '../services/visita.service';
import { Visita } from '../models/visita';

@Component({
   selector: 'proxcita',
   templateUrl: '../views/proxcita.html',
    styleUrls: ['../css/proxcita.css'],
    providers:[VisitaService]
})
export class ProxCitaComponent implements OnInit{
    public visita:Visita;
    public paciente:any;
    public btnGuardarB:boolean=false;
    public min:string="today";
    public editFlag:Boolean=false;

    constructor(public dialogRef: MdDialogRef<ProxCitaComponent>,
                private visitaService: VisitaService,
                private _router: Router,
                ) {
                }

    ngOnInit(){
        if(this.editFlag==true){
            console.log(this.visita);
        }else{
            this.visita = new Visita("",0,"","",0,0,0,0,0,0,"","",false,this.paciente.id,{desayuno:[],comida:[],cena:[],snack:[]},false);
        }
    }
    sendFecha(event){
        let fyh =event.mifecha.split(" ");
        this.visita.fecha=fyh[0];
        this.visita.hora=fyh[1];
        if(fyh==""){
            this.btnGuardarB=false;
        }else{
            this.btnGuardarB=true;
        }
    }

    agendar(){
        if(this.editFlag==true){
            this.visita.paciente=this.paciente.id;
            this.visitaService.editVisita(this.visita.id,this.visita);
            this.dialogRef.close();
        }else{
            this.visitaService.saveVisita(this.visita);
            this._router.navigate(['/']);
            this.dialogRef.close();
        }
    }
}
