export class Paciente{
    constructor(
        public id:string,
        public nombre: string,
        public sexo: string,
        public edad: string,
        public telefono: string,
        public correo: string,
        public direccion: {
            calle: string,
            colonia: string,
            ciudad: string,
        },
        public estatura: string,
        public pesoajustado: string,
        public pesoideal: string,
        public enfermedades: string, 
        public malestares: string,
        public motivo:string,
        public alergias: string,
        public noincluir: string,
        public agua: string,
        public ejercicio: string,
        public observaciones: string,
        public completo:boolean
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


// export interface Paciente {
//    id?:string;
//    nombre: string;
//    edad: string;
//    sexo: string,
//    telefono: string,
//    correo: string,
//    direccion: {
//       calle: string,
//       colonia: string,
//       ciudad: string,
//    },
//    estatura: string,
//    pesoajustado: string,
//    pesoideal: string,
//    enfermedades: string, 
//    malestares: string,
//    motivo:string,
//    alergias: string,
//    noincluir: string,
//    agua: string,
//    ejercicio: string,
//    observaciones: string,
//    completo:boolean
// }
