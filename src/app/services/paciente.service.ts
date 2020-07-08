import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';

import { Paciente } from '../models/paciente';


@Injectable()
export class PacienteService{

    constructor(private af: AngularFireDatabase){}

    getPacientes(){
        return this.af.list('pacientes').valueChanges();
    }
    getPaciente(idP) {
         return this.af.object('pacientes/'+idP).snapshotChanges();
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