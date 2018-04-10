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
    paci:any;

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

    agregarPaciente(n,e){
        let PAC = new Paciente("","","","","","",{calle:"",colonia:"",ciudad:""},"","","","","","","","","","","",false);
        PAC.nombre=n;
        PAC.edad=e;
        this.pacSer.savePaciente(PAC);
        this.getPacientes();
    }

    agregarVisita(f,p){
        let VIS = new Visita('',0,"","",0,0,0,0,0,0,"","",false,"",{desayuno:[],comida:[],cena:[],snack:[]},false);
        VIS.fecha=f;
        VIS.paciente=p;
        this.visSer.saveVisita(VIS);
        this.getVisitasP(p);
    }

    getVisitasP(p){
        this.visitas=this.visSer.getVisitasP(p);
        console.log(this.visitas);
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