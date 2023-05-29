export class Producto {
    idProducto: string; //FK PK
    idCajon:string; //PK 

    nombreProducto: string;
    fotoProducto: string;

    cantidad:[number,""];
    caducicad:Date;
    paquetes:number;

    constructor (idProducto:string,idCajon: string, nombreProducto: string,fotoProducto:string="", cantidad:[number,""],caducicad:Date, paquetes:number){
        this.idProducto=idProducto;
        this.idCajon=idCajon;
        this.nombreProducto=nombreProducto;
        this.fotoProducto=fotoProducto;
        this.cantidad=cantidad;
        this.caducicad=caducicad;
        this.paquetes=paquetes;
    }
}
