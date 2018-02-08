import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { VisitaService } from '../services/visita.service';
import { Visita } from '../models/visita';
import { Paciente } from '../models/paciente';

@Component({
   selector: 'consultar',
   templateUrl: '../views/consultar.html',
    styleUrls: ['../css/consultar.css'],
    providers:[VisitaService]
})
export class ConsultarComponent implements OnInit {
    public visit:any;
    public miUltimaVisita:any;

    public flag:Boolean;
    public paciente:any;
    public errorMessage:any;
    public resultado:[Boolean,{}];
    public mes:string[]=[
        'ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'
    ];

    constructor(public dialogRef: MdDialogRef<ConsultarComponent>,
                private visitaService: VisitaService,
                private _route:ActivatedRoute,
                private _router: Router,
                )  {
    //pasarle los datos de la ultima visita
}

    ngOnInit(){

        if(this.flag==true){
            // entro desde editVisita() de PP 
            this.resultado=[false,this.visit];
            console.log("True a flag");
        }else{
            console.log("False a flag");
            this.visit=new Visita(this.visit.id,
                                  this.miUltimaVisita.numero,
                                  this.visit.fecha,
                                  this.visit.hora,
                                  this.miUltimaVisita.peso,
                                  this.miUltimaVisita.grasa,
                                  this.miUltimaVisita.musculo,
                                  this.miUltimaVisita.abdomen,
                                  this.miUltimaVisita.cadera,
                                  this.miUltimaVisita.glucosa,
                                  this.miUltimaVisita.menu,
                                  "",
                                  false,
                                  this.paciente.id );
            this.resultado=[false,this.visit];
        }
    console.log("ngOnInit de Consultar component");
    console.log(this.paciente);
    console.log(this.visit);
    console.log(this.miUltimaVisita);
   

    }

    consultar(){
        // Necesito volver a ajustar la fecha al formato YYYY-MM-DD
        let dateSplit =  this.visit.fecha.split("-");
        for(let j=1;j<=12;j++){
            if(dateSplit[1]==this.mes[j-1]){
                dateSplit[1]=j;
                if(dateSplit[1]<10){
                    dateSplit[1]=('0'+dateSplit[1]);
                }
            }
        }
        this.visit.fecha=(dateSplit[0]+'-'+dateSplit[1]+'-'+dateSplit[2]);
        // 
        if(this.flag){
            this.visitaService.editVisita(this.visit.id, this.visit)
            this.flag=false;
            this.dialogRef.close();
        }else{
            this.visit.completo=true;
            this.visit.numero++;
            this.resultado[0]=true;  //habilitar proxCita en perfilP  
            this.visitaService.editVisita(this.visit.id, this.visit)
            this.resultado[1]=this.visit;
            console.log("Se activo el boton guardar en consultar component y el resultado es: ")
            console.log(this.resultado);
            this.dialogRef.close(this.resultado);
        }
    }




//FIN
}
