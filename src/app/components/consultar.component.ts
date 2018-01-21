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

    public paciente:any;
    public errorMessage:any;
    public resultado:[Boolean,{}];

    constructor(public dialogRef: MdDialogRef<ConsultarComponent>,
                private visitaService: VisitaService,
                private _route:ActivatedRoute,
                private _router: Router,
                )  {
    //pasarle los datos de la ultima visita
}

    ngOnInit(){
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

    consultar(){
        console.log(this.visit.fecha);
        this.visit.completo=true;
        this.visit.numero++;
        this.resultado[0]=true;  //habilitar proxCita en perfilP  
        this.visitaService.editVisita(this.visit.id, this.visit)
        this.resultado[1]=this.visit;
    }




//FIN
}
