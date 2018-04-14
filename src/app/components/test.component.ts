import { Component, ChangeDetectionStrategy, OnInit, ViewChild} from '@angular/core';

import { MatSort, Sort , MatPaginator, PageEvent} from '@angular/material';


import { PacienteService } from '../services/paciente.service';
import { VisitaService } from '../services/visita.service';

import { Observable  } from 'rxjs/Observable';
import { of  } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';

import { fromMatSort, sortRows } from './datasource-utils';
import { fromMatPaginator, paginateRows } from './datasource-utils';
import { Paciente } from '../models/paciente';
import { Visita } from '../models/visita';


@Component({
  selector: 'testC',
  templateUrl: '../views/test.html',
  styleUrls: ['../css/test.css']
})
export class TestComponent {

    pacientes:any[];
    visitas:Observable<any[]>;

    temp:any=[];
    btnGuardarB:boolean=false;

    // Variables para la tabla
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedRows$:Observable<any[]>;
    totalRows$: Observable<number>;
    filteredList;
    buscado;
    
    constructor(public pacSer: PacienteService, public visSer: VisitaService) 
    {
        this.getPacientes();
    }
    
    getPacientes(){
        this.pacSer.getPacientes().subscribe(pacs=>{
            this.pacientes=pacs;
            console.log(this.pacientes);
            this.defineDataSource(this.pacientes);
        })
    }
// Funcion para definir los datos de la tabla
    defineDataSource(data){
        const sortEvents$: Observable<Sort> = fromMatSort(this.sort);
        const pageEvents$: Observable<PageEvent> = fromMatPaginator(this.paginator);
        const rows$ = of(data);
        this.totalRows$ = rows$.pipe(map(rows => rows.length));
        this.displayedRows$ = rows$.pipe(sortRows(sortEvents$), paginateRows(pageEvents$));
    }

// Funciones para buscar en la tabla
    filter(){
        this.filteredList=this.filterByProperty(this.pacientes ,"nombre",this.buscado.toLowerCase());
        this.defineDataSource(this.filteredList);
    }
    filterByProperty(array, prop, value){
        var filtered = [];
        for(var i = 0; i < array.length; i++){
            var obj = array[i];
            if(obj[prop].toLowerCase().indexOf(value)>=0){
                    filtered.push(obj);
            }
        }   
        return filtered;
    }

    agregarPaciente(n,t){
        let PAC = new Paciente("","","","","","",{calle:"",colonia:"",ciudad:""},"","","","","","","","","","","",false);
        PAC.nombre=n;
        PAC.telefono=t;
        PAC=JSON.parse(JSON.stringify(PAC))
        this.pacSer.savePaciente(PAC);
        this.getPacientes();
    }

    sendFecha(event){
        let fyh =event.mifecha.split(" ");
        this.temp.fecha=fyh[0];
        this.temp.hora=fyh[1];
        if(fyh==""){
            this.btnGuardarB=false;
        }else{
            this.btnGuardarB=true;
        }
    }

    agregarVisita(idP){
        let VIS = new Visita('',0,"","",0,0,0,0,0,0,"","",false,"",{desayuno:[],comida:[],cena:[],snack:[]},false);
        VIS.fecha=this.temp.fecha;
        VIS.hora=this.temp.hora;
        this.temp=[];
        VIS.paciente=idP;
        VIS=JSON.parse(JSON.stringify(VIS));
        this.visSer.saveVisita(VIS);
        this.getVisitasP(idP);
    }

    getVisitasP(idP){
        this.visitas=this.visSer.getVisitasP(idP);
    }

    deleteP(idP){
        this.visSer.getVisitasP(idP).subscribe(vis=>{
            vis.forEach(v=>{
                this.visSer.deleteVisita(v.id);
            })
        })
        this.pacSer.deletePaciente(idP);
    }

    showP(idP){
        this.pacientes.forEach(pac => {
            if(pac.id == idP){console.log(pac)}
        });
        

        this.pacSer.getPaciente(idP).subscribe(pac=>{
            console.log(pac);
        })

    }


}