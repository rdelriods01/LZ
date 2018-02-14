export class Paciente{
    constructor(
        public id:String,
        public nombre: String,
        public sexo: String,
        public edad: String,
        public telefono: String,
        public correo: String,
        public direccion: {
            calle: String,
            colonia: String,
            ciudad: String,
        },
        public estatura: String,
        public pesoajustado: String,
        public pesoideal: String,
        public enfermedades: String, 
        public malestares: String,
        public motivo:String,
        public alergias: String,
        public noincluir: String,
        public agua: String,
        public ejercicio: String,
        public observaciones: String,
        public completo:Boolean
    ){
        this.id=id;
        this.nombre=nombre;
        this.sexo=sexo;
        this.edad=edad;
        this.telefono=telefono;
        this.correo=correo;
        this.direccion.calle=direccion.calle;
        this.direccion.colonia=direccion.colonia;
        this.direccion.ciudad=direccion.ciudad;
        this.estatura=estatura;
        this.pesoajustado=pesoajustado;
        this.pesoideal=pesoideal;
        this.enfermedades=enfermedades;
        this.malestares=malestares;
        this.motivo=motivo;
        this.alergias=alergias;
        this.noincluir=noincluir;
        this.agua=agua;
        this.ejercicio=ejercicio;
        this.observaciones=observaciones;
        this.completo=completo;
    }
}