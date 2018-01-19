import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { ConsultarComponent } from './consultar.component';
import {ProxCitaComponent} from './proxcita.component';
import { HistoriaClinicaComponent } from './historiaClinica.component';

import { Paciente } from '../models/paciente';
import { Visita } from '../models/visita';

import {VisitaService} from '../services/visita.service';
import {PacienteService} from '../services/paciente.service';

@Component({
    selector: 'perfil-paciente',
    templateUrl:'../views/perfilPaciente.html',
    styleUrls:['../css/perfilPaciente.css'],
    providers:[VisitaService,PacienteService]
})

export class PerfilPacienteComponent implements OnInit{
    
    public paciente:Paciente;
    public visitas: any[]=[];
    public ordenados: any[];
    public citas: any[];
    public citas1: any[];
    public errorMessage : any;
    public totaldevisitas:number=1;
    public pesoactual:number;
    public pesoinicial:number;
    public totalbajado:number;
    public proxcita:Boolean;
    public seguro:Boolean=false;
    public visible:Boolean=false;
    public seguroV:Boolean=false;
    public fechaSplit:any[];
    public mes:string[]=[
        'ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'
    ];
    public enf:string;
    public malesta:string;
    public temp:any=[];

    constructor (
        private _route:ActivatedRoute,
        private _router: Router,
        private visitaService: VisitaService,
        private pacienteService: PacienteService,
        public dialog: MdDialog,
    ){}
    
    ngOnInit(){
        //  this.paciente=new Paciente("","","","","","",{calle:"",colonia:"",ciudad:""},"","","","","","","","",false);
         this.mostrarPaciente();
    }

    mostrarPaciente(){
        this._route.params.forEach((params:Params)=>{
            let id = params['id'];
            this.paciente= this.pacienteService.getPaciente(id);
            if(!this.paciente){this._router.navigate(['/'])}
            else{
                // Ajustar datos del paciente para poder visualizarlos correctamente
                // enfermedades
                for(let i=0;i<8;i++){
                    if(this.paciente.enfermedades[i][1]){
                        this.temp.push(this.paciente.enfermedades[i][0])
                    }
                }
                if(this.temp.length>0){this.enf=this.temp.toString();}else{this.enf="";}
                this.temp=[];
                // malestares
                for(let i=0;i<6;i++){
                    if(this.paciente.malestares[i][1]!="0"){
                        this.temp.push(this.paciente.malestares[i][0]+' '+this.paciente.malestares[i][1]+' dias a la semana');        
                    }
                }
                if(this.temp.length>0){this.malesta=this.temp.toString();}else{this.malesta="";}
                this.temp=[];
                // Obtener visitas del paciente actual
                this.visitas=this.visitaService.getVisitasP(id);
                if(!this.visitas){alert('Paciente Sin Visitas')}
                else{
                    this.totaldevisitas=this.visitas.length;
                    if(this.visitas[this.totaldevisitas-1].completo == true){
                        this.proxcita=true;
                        this.pesoactual=this.visitas[this.totaldevisitas-1].peso;
                    }else{
                        this.proxcita=false;
                        if(this.totaldevisitas>1){this.pesoactual=this.visitas[this.totaldevisitas-2].peso;}
                    }
                    this.pesoinicial=this.visitas[0].peso;
                    this.totalbajado=Math.round((this.pesoinicial-this.pesoactual) * 10)/10;
                    // ordenar visitas de ultima a primera
                    this.ordenados = this.visitas
                    for(let i=0;i<this.totaldevisitas;i++){
                        this.fechaSplit =  this.ordenados[i].fecha.split("-");
                        for(let j=1;j<=12;j++){
                            if(this.fechaSplit[1]==j){
                                this.fechaSplit[1]=this.mes[j-1];
                            }
                        }
                        this.ordenados[i].fecha=(this.fechaSplit[0]+'-'+this.fechaSplit[1]+'-'+this.fechaSplit[2])
                    }
                    this.citas=this.ordenados.slice().reverse();
                     this.citas1=this.ordenados.slice().reverse();
                     if (this.proxcita == false){
                        this.citas1.shift();                        
                     }
                }
            }
        });
    }


// Funciones para los Dialogs Consultar / Proxima Cita / Editar historiaClinica
    openConsultarDialog(P,V){
        for(let i=0;i<this.totaldevisitas-1;i++){
            let dateSplit =  V[i].fecha.split("-");
            for(let j=1;j<=12;j++){
                if(dateSplit[1]==this.mes[j-1]){
                    dateSplit[1]=j;
                    if(dateSplit[1]<10){
                        dateSplit[1]=('0'+dateSplit[1]);
                    }
                }
            }
            V[i].fecha=(dateSplit[0]+'-'+dateSplit[1]+'-'+dateSplit[2]);
        }
        let VA={};
        let UV={};
        if(V[0].completo == true){
            this.proxcita=true;
        }else{
            VA=V[0];            
            if(this.totaldevisitas==1){
                UV=VA;
            }else{
                UV=V[1];  
            }
            this.proxcita=false;
        }
        let dialogRef = this.dialog.open(ConsultarComponent);
        dialogRef.componentInstance.paciente=P;
        dialogRef.componentInstance.miUltimaVisita=UV;
        dialogRef.componentInstance.visit=VA;
        dialogRef.afterClosed().subscribe(result => {
            if(result!=null){
                this.proxcita=result[0];
                this.pesoactual=result[1].peso;
            }        
            this.totalbajado=this.pesoinicial-this.pesoactual;

            this.mostrarPaciente();
        });

    }

    openProxCitaDialog(P){
        let dialogRef = this.dialog.open(ProxCitaComponent);
        dialogRef.componentInstance.paciente=P;
//         dialogRef.afterClosed().subscribe(result => {
//             if(result==null){}else{
//                 this.visitas.push(result);
//             }
//         });
    }

    openHisCliDialog(P){
         let dialogRef = this.dialog.open(HistoriaClinicaComponent);
         dialogRef.componentInstance.paciente=P;
         dialogRef.componentInstance.flag=true;
         dialogRef.afterClosed().subscribe(result=>{
             this.mostrarPaciente();
         })
  }
// Funciones para eliminar Paciente
    seguroElim(){
        this.seguro=true;
    }
    noEliminar(){
        this.seguro=false;
    }
    siEliminar(){
        console.log('Se eliminará el paciente: ' + this.paciente.nombre);
        // ya tengo las visitas del paciente en this.visitas,
        // ahora a eliminarlas una por una por id
        for(let i=0; i < this.totaldevisitas; i++){
            let id=this.visitas[i].id;
            this.visitaService.deleteVisita(id);
            console.log('Visita eliminada: '+ id);
        }
        // finalmente eliminar paciente por id
        this._route.params.forEach((params:Params)=>{
            let idP = params['id'];
            this.pacienteService.deletePaciente(idP)
            console.log('Paciente eliminado: '+ idP);
        });
        // reiniciar variable seguro e ir a dashboard
        this.seguro=false;
        this._router.navigate(['/']);
    }

    showAdvance(){
        this.visible=!this.visible;
    }

    editVisita(v,P){
        console.log('editVisita()');
        this.fechaSplit =  v.fecha.split("-");
        for(let j=1;j<=12;j++){
            if(this.fechaSplit[1]==this.mes[j-1]){
                this.fechaSplit[1]=j;
                if(this.fechaSplit[1]<10){
                    this.fechaSplit[1]=('0'+this.fechaSplit[1]);
                }
            }
        }
        v.fecha=(this.fechaSplit[0]+'-'+this.fechaSplit[1]+'-'+this.fechaSplit[2]);

        // Se pasa la visita a editar por medio de la variable v, y se inician las constantes igual a variable
        // para no alterar el dialog ConsultarComponent.
        let dialogRef = this.dialog.open(ConsultarComponent);
        dialogRef.componentInstance.paciente=P;
        dialogRef.componentInstance.miUltimaVisita=v;
        dialogRef.componentInstance.visit=v;
        dialogRef.afterClosed().subscribe(result => {
            this.mostrarPaciente();
        });

}

    seguroDelVisita(){
        this.seguroV=true;
        this.visible=false
    }
    noDelVisita(){        
        this.seguroV=false;
        this.visible=true;
    }
    siDelVisita(id){
        this.visitaService.deleteVisita(id);
        console.log('Visita eliminada: '+ id);
        this.mostrarPaciente();
        this.seguroV=false;
        this.visible=true;
    }


}