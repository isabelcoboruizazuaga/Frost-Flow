export class ProductoFamilia {
    idProducto: string;
    idFamilia:string;
    nombreProducto: string;
    fotoProducto: string;

    /**
     * This is a constructor function that initializes properties for a product object.
     * @param {string} idProducto - A string representing the unique identifier of a product.
     * @param {string} idFamilia - The idFamilia parameter is a string that represents the identifier
     * of the product family to which the product belongs.
     * @param {string} nombreProducto - This parameter represents the name of a product.
     * @param {string} [fotoProducto] - The parameter "fotoProducto" is a string that represents the
     * URL or file path of the product's photo. It is an optional parameter, as indicated by the equal
     * sign and empty string in the parameter declaration. If no value is provided for this parameter
     * when creating a new instance of the class, it
     */
    constructor (idProducto:string, idFamilia: string,nombreProducto: string,fotoProducto:string="" ){
        this.idProducto=idProducto;
        this.idFamilia=idFamilia;
        this.nombreProducto=nombreProducto;
        this.fotoProducto=fotoProducto;
    }
}
