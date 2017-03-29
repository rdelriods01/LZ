import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Visita } from '../models/visita';

@Injectable()
export class VisitaService{

    constructor( private af: AngularFire){

    }

    getVisitas(): FirebaseListObservable<any> {
        return this.af.database.list('visitas');
    }

    saveVisita(visita:Visita){
        this.af.database.list('visitas').push(visita);
    }

}