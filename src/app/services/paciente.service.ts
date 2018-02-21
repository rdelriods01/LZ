import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { Paciente } from '../models/paciente';


@Injectable()
export class PacienteService{

    public actualP:any;

    constructor(private af: AngularFireDatabase){}

    getPacientes():FirebaseListObservable<any> {
        return this.af.list('pacientes');
    }
    getPaciente(idP) {
         let miP= this.af.object('pacientes/'+idP, {preserveSnapshot:true});
         miP.subscribe(res=>{
            this.actualP=res.val();
         });
         return this.actualP;
    }
    savePaciente(paciente:Paciente){
        let idP=this.af.list('pacientes').push(paciente).key;
        paciente.id=idP;
        this.af.list('pacientes').update(idP,paciente);
    }
    updatePaciente(id,paciente){
        this.af.list('pacientes').update(id,paciente);
    }
    deletePaciente(id){
        this.af.object('pacientes/'+id).remove();
    }
}