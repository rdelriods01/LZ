import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';

import { Visita } from '../models/visita';

@Injectable()
export class VisitaService{

    constructor( private af: AngularFireDatabase){}

    getVisitas(){
        return this.af.list('visitas').valueChanges();
    }
    getVisitasP(){
        return this.af.list('visitas').snapshotChanges()
    }
    saveVisita(visita:Visita){
        let idV=this.af.list('visitas').push(visita).key;
        visita.id=idV;
        this.af.list('visitas').update(idV,visita);
    }
    editVisita(id,V){
        this.af.list('visitas').update(id,V);
    }
    deleteVisita(id){
        this.af.object('visitas/'+id).remove();
    }

}