import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { VisitaService } from './visita.service';
import { Paciente } from '../models/paciente';


@Injectable()
export class PacienteService{

    public items:FirebaseListObservable<any>;
    public actualP:any;


    constructor( private visitaService:VisitaService, private af: AngularFireDatabase){
        this.items = this.af.list('pacientes');
    }

    getPacientes() {
        return this.items;
    }
    getPaciente(idP) {
         let miP= this.af.object('pacientes/'+idP, {preserveSnapshot:true});
         miP.subscribe(res=>{
            this.actualP=res.val();
         });
         return this.actualP;
    }
    savePaciente(paciente:Paciente){
        let idP=this.items.push(paciente).key;
        paciente.id=idP;
        this.items.update(idP,paciente);
    }
    updatePaciente(id:any,paciente:Paciente){
        this.items.update(id,paciente);
// regresamos el objeto paciente para despues actualizar cada visita del paciente
        let miP=this.getPaciente(id);
// obtener las visitas que tengan como paciente el id del paciente
        this.af.object('visitas', {preserveSnapshot:true})
            .subscribe(res=>{
                res.forEach(res=>{
                    let Vis=res.val();
                    if(Vis.paciente.id==id){
                        // si la visita corresponde al paciente
        // ntonces actualiza el campo Paciente con el nuevo objeto Paciente
                        Vis.paciente=miP;
                        // actualizar esta visita con el nuevo objeto Visita
                        this.visitaService.editVisita(Vis.id,Vis);
                    }
                });
            });
    }

    deletePaciente(id){
        this.af.object('pacientes/'+id).remove();
    }
}