export class Visita{
    constructor(
        public id:string,
        public numero: number,
        public fecha: string,
        public hora:string,
        public peso: number,
        public grasa: number,
        public musculo: number,
        public abdomen:number,
        public cadera:number,
        public glucosa: number,
        public menu: string,
        public comentarios: string,
        public completo: boolean,
        public paciente: any,
        public menuCompleto:{
            desayuno:any[],
            comida:any[],
            cena:any[],
            snack:any[]
        },
        public menuF:boolean
    ){
        this.id=id;
        this.numero=numero;
        this.fecha=fecha;
        this.hora=hora;
        this.peso=peso;
        this.grasa=grasa;
        this.musculo=musculo;;
        this.abdomen=abdomen;
        this.cadera=cadera;
        this.glucosa=glucosa;
        this.menu=menu;
        this.comentarios=comentarios;
        this.completo=completo;
        this.paciente=paciente;
        this.menuCompleto.desayuno=menuCompleto.desayuno;
        this.menuCompleto.comida=menuCompleto.comida;
        this.menuCompleto.cena=menuCompleto.cena;
        this.menuCompleto.snack=menuCompleto.snack;
        this.menuF=menuF;
    }

}


// export interface Visita {
//     id?:string;
//     numero: number,
//     fecha: string,
//     hora:string,
//     peso: number,
//     grasa: number,
//     musculo: number,
//     abdomen:number,
//     cadera:number,
//     glucosa: number,
//     menu: string,
//     comentarios: string,
//     completo: boolean,
//     paciente: string,
//     menuCompleto:{
//         desayuno:any[],
//         comida:any[],
//         cena:any[],
//         snack:any[]
//     },
//     menuF:boolean    
//  }