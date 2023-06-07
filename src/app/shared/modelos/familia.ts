import { Nevera } from "./nevera";
import { ProductoFamilia } from "./producto-familia";
import { Usuario } from "./usuario";

export class Familia{
    idFamilia: string;
    nombreFamilia: string;
    
    /**
     * This is a constructor function that initializes properties for a family object, including an ID,
     * name, list of users, and list of refrigerators.
     * @param {string} idFamilia - a string representing the unique identifier of the family.
     * @param {string} [nombreFamilia] - The parameter "nombreFamilia" is a string that represents the
     * name of a family. It is an optional parameter with a default value of an empty string.
     * @param listaUsuarios - It is an optional parameter that represents an array of users belonging
     * to the family. If no value is provided, an empty array will be assigned as the default value.
     * @param listaNeveras - It is an optional parameter that represents an array of refrigerators
     * belonging to the family.
     */
    constructor(idFamilia: string, nombreFamilia: string=''){
        this.idFamilia=idFamilia;
        this.nombreFamilia=nombreFamilia;
    }    
}