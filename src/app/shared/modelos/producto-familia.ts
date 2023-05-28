export class ProductoFamilia {
    idProducto: string;
    idFamilia:string;
    nombreProducto: string;
    fotoProducto: string;

    constructor (idProducto:string, idFamilia: string,nombreProducto: string,fotoProducto:string="" ){
        this.idProducto=idProducto;
        this.idFamilia=idFamilia;
        this.nombreProducto=nombreProducto;
        this.fotoProducto=fotoProducto;
    }
}
