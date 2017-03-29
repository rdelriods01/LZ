export class Visita{
    constructor(
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
        public paciente: any 
    ){
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
    }

}