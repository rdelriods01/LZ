export class Platillo{
    constructor(public id: string,
                public platillo: string,
                public descripcion:string,
                public flag:Boolean
                ){
        this.id=id;
        this.platillo=platillo;
        this.descripcion=descripcion;
        this.flag=flag;
    }
}