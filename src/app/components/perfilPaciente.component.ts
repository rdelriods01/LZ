import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
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

export class PerfilPacienteComponent implements OnInit, OnChanges{
    
    public paciente:Paciente;
    public visitas: any[]=[];
    public ordenados: any[];
    public cita: any[];
    public citas: any[];
    public citas1: any[];
    public errorMessage : any;
    public totaldevisitas:number;
    public pesoactual:number;
    public pesoinicial:number;
    public totalbajado:any;
    public proxcita:Boolean;
    public seguro:Boolean=false;
    public visible:Boolean=false;
    public seguroV:Boolean=false;
    public fechaSplit:any[];
    public mes:string[]=[
        'ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'
    ];
    public  enf:string; 
            malesta:string;
            alerg:String;
            noinclu:String;
            observa:String;
            genero:String;
    public horaCita:String;
    public temp:any=[];
    public incompleta:any=null;
    public yaConsultar:Boolean=false;
           fechaProx:String;
    public showList:Boolean=false;
    public showAvances:Boolean=false;

    // variables para graficos y calculos
    public gDpeso:any[]=[];
    public gDgrasa:any[]=[];
    public gDmusculo:any[]=[];
    public gDabdomen:any[]=[];
    public gDcadera:any[]=[];
    public gDglucosa:any[]=[];
    public gDfechas:any[]=[];

    public gData:Array<any> = [];
    public lineChartLabels:Array<any> =[];
    
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';
    public showGraf:Boolean=false;



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
    
    ngOnInit(){
    }

    ngOnChanges(){
        this.parseGraficos();
    }

    mostrarPaciente(){
        this._route.params.forEach((params:Params)=>{
            let id = params['id'];
            this.paciente= this.pacienteService.getPaciente(id);
            if(!this.paciente){this._router.navigate(['/'])}
            else{
                // Ajustar datos del paciente para poder visualizarlos correctamente al iniciar 
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
                // otros
                this.alerg=this.paciente.alergias;
                this.noinclu=this.paciente.noincluir;
                this.observa=this.paciente.observaciones;
                this.genero=this.paciente.sexo;
                // Ya que se tiene el paciente, ahora hay que mostrar las visitas
                this.mostrarVisitasP();
            }
        });
    }

    mostrarVisitasP(){
        // Obtener visitas del paciente actual
        // puede tener 0 visitas 
            // entonces poner boton de agregara visita si tiene 0 visitas
        // puede tener 1 visita programada pero no completa
            // entonces mostrar que tiene cita programa y poner boton de consultar
        // al termino de consultar (tiene 1 visita completa), 
            // volver al perfil paciente y mostrar en la lista su visita recien
            // asi tambien poner un boton para agendar siguiente cita
        // tendrá 1 visita completas y una mas programada
            // volver a dashboard, y al entrar a su perfil habilitar boton consultar hasta que sea la fecha
        // ---> cuando sea tiempo de consultar la siguiente cita, consultar y finalizar
            // mostrar avances y comparativa y boton de programar la siguiente cita
        // tendrá X visitas completas y una mas programada
            // volver a dashboard, y al entrar a su perfil habilitar boton consultar hasta que sea la fecha
            // Se repite desde flecha --->

        this.gDfechas=[];
        this.gDgrasa=[];
        this.gDpeso=[];
        this.gDmusculo=[];
        this.gDabdomen=[];
        this.gDcadera=[];
        this.gDglucosa=[];
        this.visitas=this.visitaService.getVisitasP(this.paciente.id);
        console.log(this.visitas);
        this.totaldevisitas=this.visitas.length;
        if(this.visitas.length==0){ // Si no tiene citas
            // Cambiar boton de consultar por agendar cita
            this.yaConsultar=true; //muestra botones por que aun no hay fecha de cita
            this.proxcita=true;
            this.showList=false;
            console.log('Paciente Sin Visitas');
        }
        else{
            if(this.visitas.length==1){ // Si es la primer cita
                if(this.visitas[0].completo==false){ //y aun no se consulta
                    // pregunta si es el día de la consulta
                    if(this.yaConsultar=this.yaEsHoraDeConsultar(this.visitas[0])){// si si es el dia
                        this.showList=false;
                        this.proxcita=false; //Se habilita boton Consultar
                        this.horaCita=this.visitas[0].hora;
                        this.citas=this.visitas;
                    }else{
                        this.showList=false;
                        this.proxcita=false; //Se habilita boton Consultar
                        this.horaCita=this.visitas[0].hora;
                        let temp=this.visitas[0].fecha.split("-");
                        for(let j=1;j<=12;j++){
                            if(temp[1]==j){
                                temp[1]=this.mes[j-1];
                            }
                        }
                        this.fechaProx=(temp[2] + " de " + temp[1]);
                        this.cita=this.visitas[0];                    
                    }
                }else{ //Si ya se consulto entonces muestra btn prox cita
                    this.showList=true;
                    this.showGraf=false;
                    this.proxcita=true;
                    this.yaConsultar=true;
                    this.citas1=this.visitas;
                }
             }else{ //Si tiene mas de una cita
                this.showList=true;                
                this.showGraf=false;

                // Estan completas?
                for(let i=0;i<this.totaldevisitas;i++){
                    if(this.visitas[i].completo==true){
                        
                        // si esta completa
                        console.log("Visita No: " + i + " completa");
                        // guardar datos en un array
                        this.gDpeso.push(this.visitas[i].peso);
                        this.gDgrasa.push(this.visitas[i].grasa);
                        this.gDmusculo.push(this.visitas[i].musculo);
                        this.gDabdomen.push(this.visitas[i].abdomen);
                        this.gDcadera.push(this.visitas[i].cadera);
                        this.gDglucosa.push(this.visitas[i].glucosa);

                        this.gDfechas.push(this.visitas[i].fecha);

                    }else{
                        // si no esta completa guarda la que no esta completa
                        console.log("Visita No: " + i + " incompleta");
                        this.incompleta=this.visitas[i];
                    }
                }
                console.log(this.incompleta);
                if(this.incompleta!=null){ // Si hay una incompleta habilita boton de consultar, siempre y cuando sea dia de consulta
                    this.yaConsultar=this.yaEsHoraDeConsultar(this.incompleta); // Es dia de consulta?
                    this.proxcita=false; //<-- Btn consultar habilitado
                    this.horaCita=this.incompleta.hora;
                    // Si no es dia de la cita, habilita el mensaje diciendo que aun no es la cita
                    // Y muestralo en el formato correcto
                    let temp=this.incompleta.fecha.split("-");
                    for(let j=1;j<=12;j++){
                        if(temp[1]==j){
                            temp[1]=this.mes[j-1];
                        }
                    }
                    this.fechaProx=(temp[2] + " de " + temp[1]);
                    this.cita=this.incompleta;
                }else{
                    this.yaConsultar=true;
                    this.proxcita=true;
                }
                // Si ya es hora de consultar, ordena el listado cn el mas nuevo arriba y el mes en formato MMM
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
                this.calcularAvances();
                this.citas=this.ordenados.slice().reverse();
                this.citas1=this.ordenados.slice().reverse();
                // Esto es para que al momento de consultar no se vea en la lista la cita en ceros.
                if (this.proxcita == false){
                    this.citas1.shift();                        
                }
                if(this.gDfechas.length>1){this.parseGraficos()}
                
            }    
            // LA VISITA con i = totaldevisitas-1 es la mas reciente <===============
            
            // Calcular peso bajado

            // if(this.visitas[this.totaldevisitas-1].completo == true){
            //     this.proxcita=true;
            //     this.pesoactual=this.visitas[this.totaldevisitas-1].peso;
            // }else{
            //     this.proxcita=false;
            //     if(this.totaldevisitas>1){this.pesoactual=this.visitas[this.totaldevisitas-2].peso;}
            // }
            // this.pesoinicial=this.visitas[0].peso;
            // this.totalbajado=Math.round((this.pesoinicial-this.pesoactual) * 10)/10;
            
        }
    }
// Para hacer pruebas con el spinner
    calculatePercent(V){
        this.spinval=V;
    }

public spinval:number;
public subio:Boolean=false;
public porbajar:any;
    calcularAvances(){
        this.showAvances=true;

        let tov=this.gDpeso.length;

        let arrP:any[]=[];
        let arrG:any[]=[];
        let arrM:any[]=[];
        let arrA:any[]=[];
        let arrC:any[]=[];
        let arrGl:any[]=[];

        let pesos=this.gDpeso;
        let grasas=this.gDgrasa;
        let musculos=this.gDmusculo;
        let abdomenes=this.gDabdomen;
        let caderas=this.gDcadera;
        let glucosas=this.gDglucosa;

        // Calcular peso bajado
        let des=Number(this.paciente.pesoajustado);
        let ini=this.pesoinicial=pesos[0];
        let act=this.pesoactual=pesos[tov-1];
        let baj=ini-act;
        // si total bajado es negativo, quiere decir que subio de peso
        if(baj<0){
            this.subio=true;
            baj=baj*-1;
            this.totalbajado=Number(baj).toFixed(1);
        }else{
            this.subio=false;
            // El peso inicial es el 100% y el peso deseado es el 0%
            let cien=ini-des; //cien es el total de kilos entre el max y el min
            let xbaj =cien-baj; //el total menos lo bajado da, por bajar
            this.spinval=xbaj*100/cien; //regla de 3, spinval esta en % con respecto a 100
            // Y luego spinval se transforma en el ngstyle del arc2
            this.totalbajado=Number(baj).toFixed(1);
            this.porbajar=Number(xbaj).toFixed(1);
        }
        
        // Mostrar 
        for(let k=0; k<tov; k++){
            if(k==0){
                arrP[k]=arrG[k]=arrM[k]=arrA[k]=arrC[k]=arrGl[k]='black';
                this.ordenados[k].colP=arrP[k];
                this.ordenados[k].colG=arrG[k];
                this.ordenados[k].colM=arrM[k];
                this.ordenados[k].colA=arrA[k];
                this.ordenados[k].colC=arrC[k];
                this.ordenados[k].colGl=arrGl[k];
            }else{
                // peso
                arrP[k]=this.calculosTabla(k,pesos[k],pesos[k-1],this.ordenados[k].peso,false);
                this.ordenados[k].colP=arrP[k][0];
                this.ordenados[k].arrowP=arrP[k][1];
                this.ordenados[k].difP=arrP[k][2];
                this.ordenados[k].peso=arrP[k][3];
                // grasa
                arrG[k]=this.calculosTabla(k,grasas[k],grasas[k-1],this.ordenados[k].grasa,false);
                this.ordenados[k].colG=arrG[k][0];
                this.ordenados[k].arrowG=arrG[k][1];
                this.ordenados[k].difG=arrG[k][2];
                this.ordenados[k].grasa=arrG[k][3];
                // musculo
                arrM[k]=this.calculosTabla(k,musculos[k],musculos[k-1],this.ordenados[k].musculo,true);
                this.ordenados[k].colM=arrM[k][0];
                this.ordenados[k].arrowM=arrM[k][1];
                this.ordenados[k].difM=arrM[k][2];
                this.ordenados[k].musculo=arrM[k][3];
                // abdomen
                arrA[k]=this.calculosTabla(k,abdomenes[k],abdomenes[k-1],this.ordenados[k].abdomen,false);
                this.ordenados[k].colA=arrA[k][0];
                this.ordenados[k].arrowA=arrA[k][1];
                this.ordenados[k].difA=arrA[k][2];
                this.ordenados[k].abdomen=arrA[k][3];
                // cadera
                arrC[k]=this.calculosTabla(k,caderas[k],caderas[k-1],this.ordenados[k].cadera,false);
                this.ordenados[k].colC=arrC[k][0];
                this.ordenados[k].arrowC=arrC[k][1];
                this.ordenados[k].difC=arrC[k][2];
                this.ordenados[k].cadera=arrC[k][3];
                // glucosa
                arrGl[k]=this.calculosTabla(k,glucosas[k],glucosas[k-1],this.ordenados[k].glucosa,false);
                this.ordenados[k].colGl=arrGl[k][0];
                this.ordenados[k].arrowGl=arrGl[k][1];
                this.ordenados[k].difGl=arrGl[k][2];
                this.ordenados[k].glucosa=arrGl[k][3];
            }
        }
    }

// Funciones para los Dialogs Consultar / Proxima Cita / Editar historiaClinica / Editar fecha de visita
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
        // Preparar datos de la ultima visita para que se despliegen en el dialog
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
                console.log(result);
                this.proxcita=result[0];
                this.pesoactual=result[1].peso;
                this.incompleta=null;
                this.showGraf=false;
            }        
            this.totalbajado=this.pesoinicial-this.pesoactual;
            this.mostrarPaciente();
        });
    }

    openProxCitaDialog(P){
        let dialogRef = this.dialog.open(ProxCitaComponent);
        dialogRef.componentInstance.paciente=P;
        dialogRef.componentInstance.editFlag=false;
    }

    openHisCliDialog(P){
         let dialogRef = this.dialog.open(HistoriaClinicaComponent);
         dialogRef.componentInstance.paciente=P;
         dialogRef.componentInstance.flag=true;
         dialogRef.afterClosed().subscribe(result=>{
             this.mostrarPaciente();
         });
    }

    editCita(V){
        let dialogRef = this.dialog.open(ProxCitaComponent);
        dialogRef.componentInstance.paciente=this.paciente;
        dialogRef.componentInstance.visita=V;
        dialogRef.componentInstance.editFlag=true;
        dialogRef.afterClosed().subscribe(result=>{
            this.mostrarPaciente();
        });
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

// Funciones para eliminar o editar visita del List
    showMore(){
        this.visible=!this.visible;
    }

    editVisita(v,P){
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


// Funcion para actualizar los graficos
    public lineChartOptions:any = {
        maintainAspectRatio: false,
        responsive: true,
        // scales: {
        //     yAxes: [{
        //         ticks: {
        //             max: 5,
        //             min: 0,
        //             stepSize: 0.5
        //         }
        //     }]
        // }
    };
    parseGraficos(){
        this.showGraf=false;
        this.gData=[
            {data: this.gDpeso, label: 'Peso'},
            // {data: this.gDgrasa, label: 'Grasa'},
        ];
        this.lineChartLabels=this.gDfechas;
        setTimeout(()=>this.showGraf=true, 100);
    }

// Otras funciones utiles para comprimir codigo

    yaEsHoraDeConsultar(X){
        console.log(X);
        let d = new Date();
        let miFecha:any[]=[];
        miFecha[0]=d.getFullYear();
        miFecha[1]=d.getMonth()+1;
        if(miFecha[1]<10){
            miFecha[1]=('0'+miFecha[1]);
        }
        miFecha[2]=d.getDate();
        if(miFecha[2]<10){
            miFecha[2]=('0'+miFecha[2]);
        }
        let hoy=miFecha[0]+'-'+miFecha[1]+'-'+miFecha[2];
        console.log(hoy);
        if(X.fecha==hoy){
            return true;
        }else{
            return false;
        }
    }

    calculosTabla(i,datA,datB,X,m){
        let arr:any[]=[];
        datA=Number(datA);
        datB=Number(datB);
        if(datA<datB){
            (m==true) ? arr[0]='red': arr[0]='green';
            arr[1]='arrow_downward';
            arr[2]=((datA-datB)*-1).toFixed(1);
            arr[3]=Number(X).toFixed(1);
            return arr;
        }else{
            if(datA==datB){
                arr[0]='#555';
                arr[1]='swap_horiz';
                arr[2]=((datA-datB)*-1).toFixed(1);
                arr[3]=Number(X).toFixed(1);
                return arr;
            }else{
                (m==true) ? arr[0]='green' : arr[0]='red';
                arr[1]='arrow_upward';
                arr[2]=(datA-datB).toFixed(1);
                arr[3]=Number(X).toFixed(1);
                return arr;
            }
        }
    }

}