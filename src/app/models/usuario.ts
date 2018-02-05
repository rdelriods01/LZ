export class Usuario{
    constructor(public id: string,
                public name: string,
                public email:string,
                public avatar:string,
                public role:string
                ){
        this.id=id;
        this.name=name;
        this.email=email;
        this.avatar=avatar;
        this.role=role;
    }
}