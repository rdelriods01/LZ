import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router} from '@angular/router';

import { VisitaService } from '../services/visita.service';
import { Visita } from '../models/visita';

// import {GLOBAL} from '../services/global';
// import {CONST} from '../services/constantes';

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

    constructor(public dialogRef: MdDialogRef<ProxCitaComponent>,
                private visitaService: VisitaService,
                private _router: Router,
                ) {
                }

    ngOnInit(){
                    this.visita = new Visita("",0,"","",0,0,0,0,0,0,"","",false,this.paciente);
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

        this.visitaService.saveVisita(this.visita)
        this._router.navigate(['/']);


        // this._visitaService.addVisita(this.visita).subscribe(
        //     result =>{
        //         this.visita= result.visita;
        //         if(!this.visita){
        //             alert('Error en el servidor al agendar proxima visita');
        //         }else{
        //             this._router.navigate(['/']);
        //         }
        //     },
        //     error =>{
        //         this.errorMessage = <any>error;
        //         if (this.errorMessage != null){
        //             console.log(this.errorMessage);
        //         }
        //     }
        // );
    }




//FIN
}
