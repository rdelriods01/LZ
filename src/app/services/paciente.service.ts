import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

interface Paciente {
    id?:string;
  nombre: string;
  edad: string;
}

@Injectable()
export class PacienteService {

    pacienteColRef: AngularFirestoreCollection<Paciente>;
    pacienteDocRef: AngularFirestoreDocument<Paciente>;
    pacientes: Observable<Paciente[]>;
    paciente:Observable<Paciente>;
    pacienteDoc: AngularFirestoreDocument<Paciente>;

    constructor( private afs: AngularFirestore ){
        this.pacienteColRef = this.afs.collection<Paciente>('pacientes');
        this.pacientes = this.pacienteColRef.snapshotChanges().map(pacs =>{
            return pacs.map(p=>{
                const data = p.payload.doc.data() as Paciente;
                data.id = p.payload.doc.id;
                return data;
            })
        });
        console.log(this.pacientes);
    }

    getPacientes(){
        return this.pacientes;
    }

    getPaciente(idP){
        this.pacienteDocRef = this.afs.doc('pacientes/'+idP);
        this.paciente=this.pacienteDocRef.valueChanges();
        return this.paciente;
    }

    savePaciente(paciente: Paciente){
        this.pacienteColRef.add(paciente);
    }

    deletePaciente(idP){
        this.pacienteDoc = this.afs.doc('pacientes/'+idP);
        this.pacienteDoc.delete();
    }

    updatePaciente(paciente: Paciente){
        this.pacienteDoc = this.afs.doc('pacientes/'+paciente.id);
        this.pacienteDoc.update(paciente);
    }


}