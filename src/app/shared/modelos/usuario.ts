export class Usuario {
    uid: string;
    nombre: string;
    email: string;
    fotoURL: string;
    emailVerificado: boolean;
    familiaId:string;

    constructor(uid: string,nombre: string,email: string, fotoURL: string="", emailVerificado: boolean=true,familiaId:string=""
    ){
        this.uid=uid;
        this.nombre=nombre;
        this.email=email;
        this.emailVerificado=emailVerificado;
        this.fotoURL=fotoURL;
        this.familiaId=uid;
    }

    setFamiliaID(familiaId:string){
        this.familiaId=familiaId;
    }
}
