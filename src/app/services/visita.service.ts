import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { Visita } from '../models/visita';

@Injectable()
export class VisitaService{

    public visitasP:any=[];

    constructor( private af: AngularFire){

    }

    getVisitas(): FirebaseListObservable<any> {
        return this.af.database.list('visitas');
    }

    getVisitasP(idP){
        this.visitasP=[];
        let misV = this.af.database.object('visitas', {preserveSnapshot:true});
        misV.subscribe(res=>{
            res.forEach(res=>{
                let Vis=res.val();
                 if(Vis.paciente.id==idP){
                     this.visitasP.push(Vis);
                }
            });
        });
        return this.visitasP;
    }

    saveVisita(visita:Visita){
        this.af.database.list('visitas').push(visita);
    }

}