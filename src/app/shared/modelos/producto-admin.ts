export class ProductoAdmin {
    idProducto: string;
    nombreProducto: string;
    fotoProducto: string;

    constructor (idProducto:string, nombreProducto: string,fotoProducto:string="" ){
        this.idProducto=idProducto;
        this.nombreProducto=nombreProducto;
        this.fotoProducto=fotoProducto;
    }
}
