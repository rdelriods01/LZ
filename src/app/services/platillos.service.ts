import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Platillo } from '../models/platillo';


@Injectable()
export class PlatilloService{


    constructor(private af: AngularFireDatabase){}

    // getDesayunos():FirebaseListObservable<any> {
    //     return this.af.list('platillos/Desayuno/');
    // }

    getPlatillos(t) {
        let temp=[];
        let miP= this.af.object('platillos/'+t, {preserveSnapshot:true});
        miP.subscribe(data => {
            data.forEach( res=>{
                temp.push(res.val())
            })
        })
        return temp;
    }

    savePlatillo(platillo:Platillo, tiempo:string){
        let idP=this.af.list('platillos/'+tiempo ).push(platillo).key;
        platillo.id=idP;
        this.af.list('platillos/'+tiempo).update(idP,platillo);
    }
    updatePlatillo(id,platillo,t){
        this.af.list('platillos/'+t).update(id,platillo);
    }
    deletePlatillo(id,t){
        this.af.object('platillos/'+t+'/'+id).remove();
    }
}