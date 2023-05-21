import { Cajon } from "./cajon";

export class Nevera {
    idNevera: string;
    nombreNevera: string;
    fotoNevera: string;
    idFamilia:string;
    listaCajones: Cajon[];

    constructor (idNevera: string,idFamilia:string, nombreNevera: string="",fotoNevera:string="", listaCajones=[]){
        this.idNevera=idNevera;
        this.idFamilia=idFamilia;
        this.nombreNevera=nombreNevera;
        this.fotoNevera=fotoNevera;
        this.listaCajones=listaCajones;
    }

    addCajon(cajon:Cajon){
        this.listaCajones.push(cajon);
    }

    setNombre(nombreNevera:string){
        this.nombreNevera=nombreNevera;
    }
}
