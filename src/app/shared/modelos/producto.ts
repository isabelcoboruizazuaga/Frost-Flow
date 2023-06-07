import { Timestamp } from "@angular/fire/firestore";

export class Producto {
    idProducto: string;
    idProductoFam: string;
    idCajon:string;

    nombreProducto: string;
    fotoProducto: string;

    cantidad:[number,string];
    caducidad:Timestamp;
    paquetes:number;

    /**
     * This is a constructor function that initializes properties for a product object.
     * @param {string} idProducto - A string representing the unique identifier of the product.
     * @param {string} idCajon - A string representing the ID of the crate where the product is stored.
     * @param {string} idProductoFam - This parameter is a string that represents the ID of the product
     * family to which the product belongs. A product family is a group of related products that share
     * similar characteristics or attributes. For example, a product family could be "fruits" and the
     * products within that family could be "apples", "
     * @param {string} nombreProducto - This parameter is a string that represents the name of the
     * product.
     * @param {string} [fotoProducto] - This parameter is a string that represents the URL or file path
     * of the product's photo. It is an optional parameter, which means that if no value is provided,
     * it will default to an empty string.
     * @param cantidad - It is a tuple that contains two values: a number and a string. It is used to
     * represent the quantity of the product. The number represents the amount of the product, while
     * the string represents the unit of measurement (e.g. "kg", "lbs", "pieces", etc.).
     * @param {Timestamp} caducidad - Timestamp is a data type that represents a specific point in
     * time, typically measured in seconds or milliseconds since a certain epoch. In this case, the
     * parameter "caducidad" is likely representing the expiration date or "use by" date of the
     * product, and is being stored as a Timestamp value.
     * @param {number} paquetes - The "paquetes" parameter is a number that represents the number of
     * packages of the product.
     */
    constructor (idProducto:string,idCajon: string, idProductoFam: string, nombreProducto: string,fotoProducto:string="", cantidad:[number,string],caducidad:Timestamp, paquetes:number){
        this.idProducto=idProducto;
        this.idCajon=idCajon;
        this.idProductoFam=idProductoFam;
        this.nombreProducto=nombreProducto;
        this.fotoProducto=fotoProducto;
        this.cantidad=cantidad;
        this.caducidad=caducidad;
        this.paquetes=paquetes;
    }
}
