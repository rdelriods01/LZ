import { Component, OnInit, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef , 
    // MatRadioChange
} from '@angular/material';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { PacienteService } from '../services/paciente.service';
import { Paciente } from '../models/paciente';

@Component({
   selector: 'historia-clinica',
   templateUrl: '../views/historiaClinica.html',
    styleUrls: ['../css/historiaClinica.css'],
})
export class HistoriaClinicaComponent implements OnInit, OnChanges{
    public paciente:any;
    public males:any=[
      [' Estreñimiento ','0'],[' Insomnio ','0'],[' Dolor de cabeza ','0'],[' Zumbido de oidos ','0'],[' Cansancio excesivo ','0'],[' Inflamación ','0']
      ];
    public enfercb:any=[
      [' Diabetes',false],[' Hipertensión',false],[' Cardiopatía',false],[' Resistencia a la insulina',false],[' Hipotiroidismo',false],[' Hipertiroidismo',false],[' Colitis',false],[' Gastritis',false]
    ];
    public flag:boolean;

    constructor(public dialogRef: MatDialogRef<HistoriaClinicaComponent>,
                private pacienteService: PacienteService,
                private route:ActivatedRoute,
                private router: Router,
                ) {}

    ngOnInit(){
        // Cargar enfermedades y malestares
        if(this.paciente.malestares==""){this.paciente.malestares=this.males;}
        if(this.paciente.enfermedades==""){this.paciente.enfermedades=this.enfercb;}
        if(this.flag==true){}else{this.flag=false;}
        console.log(this.paciente);
    }

    ngOnChanges(){
      console.log(this.paciente.motivo);
    }

     actualizarHisCli(){
       this.paciente.completo=true;
      //  Llenar array de malestares con el nombre del malestar en [i][0]
      for (let i=0;i<6;i++){
        this.paciente.malestares[i][0]=this.males[i][0];
      }
       this.pacienteService.updatePaciente(this.paciente);
      //  Agregar flag para indicar que se inicio desde un dialog y cerrarlo
      console.log(this.paciente);
      if(this.flag==true){
        this.dialogRef.close();
      } else{
        this.router.navigate(['paciente',this.paciente.id]);
      }
    }

    togglecb(x){
      this.paciente.enfermedades[x][1]=!this.paciente.enfermedades[x][1];
    }


//FIN     <script src="https://unpkg.com/@angular/material@2.0.0-beta.5/bundles/material.umd.js"></script>

}
