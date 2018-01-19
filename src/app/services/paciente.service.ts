import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { VisitaService } from './visita.service';
import { Paciente } from '../models/paciente';


@Injectable()
export class PacienteService{

    public items:FirebaseListObservable<any>;
    public actualP:any;


    constructor( private visitaService:VisitaService, private af: AngularFireDatabase){
        this.items = this.af.list('pacientes');
    }

    getPacientes() {
        return this.items;
    }
    getPaciente(idP) {
         let miP= this.af.object('pacientes/'+idP, {preserveSnapshot:true});
         miP.subscribe(res=>{
            this.actualP=res.val();
         });
         return this.actualP;
    }
    savePaciente(paciente:Paciente){
        let idP=this.items.push(paciente).key;
        paciente.id=idP;
        this.items.update(idP,paciente);
    }
    updatePaciente(id:any,paciente:Paciente){
        this.items.update(id,paciente);
    }

    deletePaciente(id){
        this.af.object('pacientes/'+id).remove();
    }
}