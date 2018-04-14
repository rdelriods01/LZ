import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

interface Config {
  nombre: string;
  logoURL: string;
  theme: string;
}

@Injectable()
export class ConfigService {

  cliente:any;

  constructor(  private afs: AngularFirestore  ) { 
  
  }

  getConfig(){
    return this.afs.doc('/configuracion/cliente').snapshotChanges().map(pac=>{
      let data = pac.payload.data();
      return data;
    })
  }

  updateConfig(cliente:Config){
    this.afs.doc('configuracion/cliente').update(cliente);
  }



}