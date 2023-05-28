export class Producto {
    idProducto: string;
    idCajon:string;
    nombreProducto: string;
    fotoProducto: string;

    constructor (idProducto:string,idCajon: string, nombreProducto: string,fotoProducto:string="" ){
        this.idProducto=idProducto;
        this.idCajon=idCajon;
        this.nombreProducto=nombreProducto;
        this.fotoProducto=fotoProducto;
    }
}
