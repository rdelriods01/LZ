import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { Paciente } from '../models/paciente';

@Injectable()
export class PacienteService{

    public items:FirebaseListObservable<any>;
    public actualP:any;


    constructor( private af: AngularFire){
        this.items = this.af.database.list('pacientes');
    }

    getPacientes() {
        return this.items;
    }
    getPaciente(idP) {
         let miP= this.af.database.object('pacientes/'+idP, {preserveSnapshot:true});
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
}