import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

// import { Observable } from 'rxjs/Observable';

import { Paciente } from '../models/paciente'

@Injectable()
export class PacienteService {

    colRefPacientes: AngularFirestoreCollection<Paciente>;

    constructor( private afs: AngularFirestore ){
        this.colRefPacientes = this.afs.collection<Paciente>('pacientes');
    }

    getPacientes(){
        return this.colRefPacientes.snapshotChanges().map(pacs =>{
            return pacs.map(p=>{
                const data = p.payload.doc.data();
                data.id = p.payload.doc.id;
                return data;
            })
        });
    }
    
    getPaciente(idP){
        return this.colRefPacientes.doc(idP).snapshotChanges().map(pac=>{
            let data = pac.payload.data();
            return data;
        })   
    }

    savePaciente(paciente: Paciente){
        return this.colRefPacientes.add(paciente).then(data=>{
            paciente.id=data.id;
            this.updatePaciente(paciente);
            return paciente;
        })
    }

    deletePaciente(idP){
        this.afs.doc('pacientes/'+idP).delete();
    }

    updatePaciente(paciente: Paciente){
        this.afs.doc('pacientes/'+paciente.id).update(paciente);
    }


}