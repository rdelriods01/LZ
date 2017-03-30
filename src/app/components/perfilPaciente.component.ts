import {Component} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

// import { ConsultarComponent } from './consultar.component';
// import {ProxCitaComponent} from './proxcita.component';
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

export class PerfilPacienteComponent {
    
    public paciente:Paciente;
    public visitas: any[]=[];
    public ordenados: any[];
    public citas: any[];
    public errorMessage : any;
    public totaldevisitas:number=0;
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

    constructor (
        private _route:ActivatedRoute,
        private _router: Router,
        private visitaService: VisitaService,
        private pacienteService: PacienteService,
        public dialog: MdDialog,
    ){
         this.paciente=new Paciente("","","","","","",{calle:"",colonia:"",ciudad:""},"","","","","","","","",false);
         this.mostrarPaciente();
    }

    mostrarPaciente(){
        this._route.params.forEach((params:Params)=>{
            let id = params['id'];
            this.paciente= this.pacienteService.getPaciente(id);
            if(!this.paciente){alert('Sin Paciente')}
            else{
                this.visitas=this.visitaService.getVisitasP(id);
                if(!this.visitas){alert('Paciente Sin Visitas')}
                else{
                    this.totaldevisitas=this.visitas.length;
                    if(this.visitas[this.totaldevisitas-1].completo == true){
                        this.proxcita=true;
                        this.pesoactual=this.visitas[this.totaldevisitas-1].peso;
                    }else{
                        this.proxcita=false;
                        this.pesoactual=this.visitas[this.totaldevisitas-2].peso;
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
                    this.citas=this.ordenados.reverse();
                }
            }
        });
    }


// Funciones para los Dialogs Consultar / Proxima Cita / Editar historiaClinica
    openConsultarDialog(){console.log('openConsultarDialog()');

//         for(let i=0;i<this.totaldevisitas;i++){
//             this.fechaSplit =  this.visitas[i].fecha.split("-");
//             for(let j=1;j<=12;j++){
//                 if(this.fechaSplit[1]==this.mes[j-1]){
//                     this.fechaSplit[1]=j;
//                     if(this.fechaSplit[1]<10){
//                         this.fechaSplit[1]=('0'+this.fechaSplit[1]);
//                     }
//                 }
//             }
//             this.visitas[i].fecha=(this.fechaSplit[0]+'-'+this.fechaSplit[1]+'-'+this.fechaSplit[2]);
        // }

//         this.visitas=this.visitas.reverse();
//         if(this.visitas[this.totaldevisitas-1].completo == true){
//             this.proxcita=true;
//         }else{
//             CONST.miVisitaActual=this.visitas[this.totaldevisitas-1];
//             if(this.totaldevisitas==1){
//                 CONST.miUltimaVisita=CONST.miVisitaActual;
//             }else{
//                 CONST.miUltimaVisita=this.visitas[this.totaldevisitas-2];
//             }
//             this.proxcita=false;
//         }
//         let dialogRef = this.dialog.open(ConsultarComponent);
//         dialogRef.afterClosed().subscribe(result => {
//             this.proxcita=result[0];
//             this.pesoactual=result[1].peso;
//             this.totalbajado=this.pesoinicial-this.pesoactual;
//             this.mostrarPaciente();
//         });

    }

    openProxCitaDialog(P){console.log('openProxCitaDialog()');
//         CONST.miPacienteActual=P;
//         let dialogRef = this.dialog.open(ProxCitaComponent);
//         dialogRef.afterClosed().subscribe(result => {
//             if(result==null){}else{
//                 this.visitas.push(result);
//             }
//         });
    }

    openHisCliDialog(P){
        console.log('openHisCliDialog()');
//         CONST.miPacienteActual=P;
         let dialogRef = this.dialog.open(HistoriaClinicaComponent);
         dialogRef.componentInstance.paciente =P;
  }
// Funciones para eliminar Paciente
    seguroElim(){
        this.seguro=true;
    }
    noEliminar(){
        this.seguro=false;
    }
    siEliminar(){
        console.log('siEliminar()');
    //     console.log('Se eliminará el paciente: ' + this.paciente.nombre);
    //     // ya tengo las visitas del paciente en this.visitas,
    //     // ahora a eliminarlas una por una por id
    //     for(let i=0; i < this.totaldevisitas; i++){
    //         let id=this.visitas[i]._id;
    //         this._visitaService.deleteVisita(id).subscribe(
    //             result=>{
    //                 if(!result){
    //                     alert('Error al eliminar visita ' + i);
    //                 }
    //                 else{
    //                     console.log('Visita eliminada: '+ id);
    //                 }
    //             },
    //             error=>{
    //                 this.errorMessage = <any>error;
    //                 if (this.errorMessage != null){
    //                     console.log(this.errorMessage);
    //                     this._router.navigate(['/']);
    //                 }
    //             }
    //         );
    //     }
    //     // finalmente eliminar paciente por id
    //     this._route.params.forEach((params:Params)=>{
    //         let idP = params['id'];
    //         this._pacienteService.deletePaciente(idP)
    //             .subscribe(
    //                 result => {
    //                     if(!result){
    //                         alert('Error al eliminar Paciente ' + idP);
    //                     }
    //                     else{
    //                         console.log('Paciente eliminado: '+ idP);
    //                         this._GLOBAL.getDatos();
    //                     }
    //                 },
    //                 error=>{
    //                     this.errorMessage = <any>error;
    //                     if (this.errorMessage != null){
    //                         console.log(this.errorMessage);
    //                         this._router.navigate(['/']);
    //                     } 
    //                 }
    //             );
    //     });
    //     // reiniciar variable seguro e ir a dashboard
    //     this.seguro=false;
    //     this._router.navigate(['/']);
    }

    showAdvance(){
        this.visible=!this.visible;
    }

    editVisita(v){
        console.log('editVisita()');
    //     this.fechaSplit =  v.fecha.split("-");
    //     for(let j=1;j<=12;j++){
    //         if(this.fechaSplit[1]==this.mes[j-1]){
    //             this.fechaSplit[1]=j;
    //             if(this.fechaSplit[1]<10){
    //                 this.fechaSplit[1]=('0'+this.fechaSplit[1]);
    //             }
    //         }
    //     }
    //     v.fecha=(this.fechaSplit[0]+'-'+this.fechaSplit[1]+'-'+this.fechaSplit[2]);

    //     // Se pasa la visita a editar por medio de la variable v, y se inician las constantes igual a variable
    //     // para no alterar el dialog ConsultarComponent.
    //     CONST.miUltimaVisita=v;
    //     CONST.miVisitaActual=v;
    //     let dialogRef = this.dialog.open(ConsultarComponent);
    //     dialogRef.afterClosed().subscribe(result => {
    //         this.mostrarPaciente();
    //     });

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
        console.log('siDelVisita()');
    //     this._visitaService.deleteVisita(id).subscribe(
    //             result=>{
    //                 if(!result){
    //                     alert('Error al eliminar visita ' + id);
    //                 }
    //                 else{
    //                     console.log('Visita eliminada: '+ id);
    //                 }
    //             },
    //             error=>{
    //                 this.errorMessage = <any>error;
    //                 if (this.errorMessage != null){
    //                     console.log(this.errorMessage);
    //                     this._router.navigate(['/']);
    //                 }
    //             }
    //         );
    //     this.mostrarPaciente();
    //     this.seguroV=false;
    //     this.visible=true;
    }


}