export class Visita{
    constructor(
        public id:String,
        public numero: Number,
        public fecha: String,
        public hora:String,
        public peso: Number,
        public grasa: Number,
        public musculo: Number,
        public abdomen:Number,
        public cadera:Number,
        public glucosa: Number,
        public menu: String,
        public comentarios: String,
        public completo: Boolean,
        public paciente: any,
        public menuCompleto:{
            desayuno:any[],
            comida:any[],
            cena:any[],
            snack:any[]
        },
        public menuF:Boolean
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