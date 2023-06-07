import { ProductoFamilia } from "./producto-familia";

export class Cajon {
    idCajon: string;
    nombreCajon: string;
    tipoCajon: string;
    idNevera:string;

    /**
     * This is a constructor function in TypeScript that initializes properties for a "cajon" object.
     * @param {string} idCajon - a string representing the unique identifier of a drawer.
     * @param {string} idNevera - This parameter is a string that represents the ID of a refrigerator.
     * @param {string} [nombreCajon] - This parameter is a string that represents the name of a drawer
     * or compartment in a fridge or freezer.
     * @param {string} [tipoCajon] - tipoCajon is a string parameter that represents the type of the
     * drawer. It is an optional parameter with a default value of an empty string.
     */
    constructor (idCajon: string,idNevera:string, nombreCajon: string="",tipoCajon:string=""){
        this.idCajon=idCajon;
        this.idNevera=idNevera;
        this.nombreCajon=nombreCajon;
        this.tipoCajon=tipoCajon;
    }
}
