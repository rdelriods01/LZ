import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Paciente } from '../models/paciente';

@Injectable()
export class PacienteService{

    public items:FirebaseListObservable<any>;

    constructor( private af: AngularFire){
        this.items = this.af.database.list('pacientes');
    }

    getPacientes() {
        return this.items;
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