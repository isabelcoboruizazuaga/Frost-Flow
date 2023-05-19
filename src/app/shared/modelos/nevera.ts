import { Cajon } from "./cajon";

export class Nevera {
    idNevera: string;
    nombreNevera: string;
    listaCajones: Cajon[];

    constructor (idNevera: string, nombreNevera: string, listaCajones=[]){
        this.idNevera=idNevera;
        this.nombreNevera=nombreNevera;
        this.listaCajones=listaCajones;
    }

    addCajon(cajon:Cajon){
        this.listaCajones.push(cajon);
    }

    setNombre(nombreNevera:string){
        this.nombreNevera=nombreNevera;
    }
}
