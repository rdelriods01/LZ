import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

import { Visita } from '../models/visita'

@Injectable()
export class VisitaService {

    colRefVisitas: AngularFirestoreCollection<Visita>;
    docRefVisita: AngularFirestoreDocument<Visita>;

    constructor( private afs: AngularFirestore ){
        this.colRefVisitas = this.afs.collection<Visita>('visitas');
    }

    getAllVisitas(){
        return this.colRefVisitas.snapshotChanges().map(visi =>{
            return visi.map(v=>{
                const data = v.payload.doc.data();
                data.id = v.payload.doc.id;
                return data;
            })
        });
    }
    
    getVisita(idV){
        return this.colRefVisitas.doc(idV).snapshotChanges().map(vis=>{
            let data = vis.payload.data();
            return data;
        })   
    }

    getVisitasP(idP){
        return this.afs.collection('visitas', ref=> ref.where('paciente','==',idP)).snapshotChanges().map( visi =>{
            return visi.map(v=>{
                const data = v.payload.doc.data();
                data.id = v.payload.doc.id;
                return data;
            });
        });
    }

    getVisitasXFecha(dia){
        return this.afs.collection('visitas', ref=> ref.where('fecha','==',dia)).snapshotChanges().map( visi =>{
            return visi.map(v=>{
                const data = v.payload.doc.data();
                data.id = v.payload.doc.id;
                return data;
            });
        });
    }

    saveVisita(visita: Visita){
        this.colRefVisitas.add(visita).then(data=>{
            visita.id=data.id;
            this.updateVisita(visita);
        })
    }

    deleteVisita(idV){
        this.afs.doc('visitas/'+idV).delete();
    }

    updateVisita(visita: Visita){
        this.afs.doc('visitas/'+visita.id).update(visita);
    }


}