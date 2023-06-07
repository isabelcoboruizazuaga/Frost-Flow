export class Usuario {
    uid: string;
    nombre: string;
    email: string;
    fotoURL: string;
    emailVerificado: boolean;
    familiaId:string;
/**
     * This is a constructor function that initializes properties for a user object in TypeScript.
     * @param {string} uid - a string representing the unique identifier of the user.
     * @param {string} nombre - The name of the user.
     * @param {string} email - A string representing the email address of the user.
     * @param {string} [fotoURL] - This parameter is a string that represents the URL of the user's
     * profile picture. It is an optional parameter and if not provided, an empty string will be
     * assigned to it.
     * @param {boolean} [emailVerificado=true] - a boolean value indicating whether the user's email
     * has been verified or not. If not specified, it defaults to true.
     * @param {string} [familiaId] - familiaId is a string parameter that represents the unique
     * identifier of the family to which the user belongs. It is set to the value of the user's uid by
     * default.
     */
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
