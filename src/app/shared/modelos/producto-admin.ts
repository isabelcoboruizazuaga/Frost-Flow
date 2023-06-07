export class ProductoAdmin {
    idProducto: string;
    nombreProducto: string;
    fotoProducto: string;

    /**
     * This is a constructor function that initializes the properties of a product object with an ID,
     * name, and optional photo.
     * @param {string} idProducto - A string representing the unique identifier of a product.
     * @param {string} nombreProducto - The parameter "nombreProducto" is a string that represents the
     * name of a product.
     * @param {string} [fotoProducto] - fotoProducto is a string parameter that represents the URL or
     * file path of the product's photo. It is an optional parameter, as indicated by the default value
     * of an empty string (""). If a photo is not provided, the product will be created without a
     * photo.
     */
    constructor (idProducto:string, nombreProducto: string,fotoProducto:string="" ){
        this.idProducto=idProducto;
        this.nombreProducto=nombreProducto;
        this.fotoProducto=fotoProducto;
    }
}
