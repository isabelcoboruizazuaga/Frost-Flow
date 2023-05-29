export class Producto {
    idProducto: string;
    idProductoFam: string;
    idCajon:string;

    nombreProducto: string;
    fotoProducto: string;

    cantidad:[number,string];
    caducicad:Date;
    paquetes:number;

    constructor (idProducto:string,idCajon: string, idProductoFam: string, nombreProducto: string,fotoProducto:string="", cantidad:[number,string],caducicad:Date, paquetes:number){
        this.idProducto=idProducto;
        this.idCajon=idCajon;
        this.idProductoFam=idProductoFam;
        this.nombreProducto=nombreProducto;
        this.fotoProducto=fotoProducto;
        this.cantidad=cantidad;
        this.caducicad=caducicad;
        this.paquetes=paquetes;
    }
}
