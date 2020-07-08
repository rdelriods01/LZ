import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Platillo } from '../models/platillo';


@Injectable()
export class PlatilloService{


    constructor(private af: AngularFireDatabase){}

    getPlatillos(t) {
        let temp=[];
        let miP= this.af.list('platillos').snapshotChanges().subscribe(data => {
            data.forEach( res=>{
                temp.push(res.payload.val())
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