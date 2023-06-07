import { Cajon } from "./cajon";

export class Nevera {
    idNevera: string;
    nombreNevera: string;
    fotoNevera: string;
    idFamilia:string;

    /**
     * This is a constructor function that initializes properties for a "Nevera" object in TypeScript.
     * @param {string} idNevera - a string representing the unique identifier of a refrigerator.
     * @param {string} idFamilia - A string representing the ID of the family to which the refrigerator
     * belongs.
     * @param {string} [nombreNevera] - This parameter is a string that represents the name of a
     * refrigerator.
     * @param {string} [fotoNevera] - It is a string parameter that represents the photo or image of
     * the refrigerator.
     */
    constructor (idNevera: string,idFamilia:string, nombreNevera: string="",fotoNevera:string=""){
        this.idNevera=idNevera;
        this.idFamilia=idFamilia;
        this.nombreNevera=nombreNevera;
        this.fotoNevera=fotoNevera;
    }
}
