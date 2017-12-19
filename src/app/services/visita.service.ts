import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { Visita } from '../models/visita';

@Injectable()
export class VisitaService{

    public visitasP:any=[];

    constructor( private af: AngularFireDatabase){

    }

    getVisitas(): FirebaseListObservable<any> {
        return this.af.list('visitas');
    }

    getVisitasP(idP){
        this.visitasP=[];
        let misV = this.af.object('visitas', {preserveSnapshot:true});
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