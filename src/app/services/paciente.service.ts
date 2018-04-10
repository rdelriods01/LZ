import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

// import { Observable } from 'rxjs/Observable';

import { Paciente } from '../models/paciente'

@Injectable()
export class PacienteService {

    colRefPacientes: AngularFirestoreCollection<Paciente>;
    docRefPaciente: AngularFirestoreDocument<Paciente>;

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
        this.colRefPacientes.add(paciente);
    }

    deletePaciente(idP){
        this.docRefPaciente = this.afs.doc('pacientes/'+idP);
        this.docRefPaciente.delete();
    }

    updatePaciente(paciente: Paciente){
        this.docRefPaciente = this.afs.doc('pacientes/'+paciente.id);
        this.docRefPaciente.update(paciente);
    }


}