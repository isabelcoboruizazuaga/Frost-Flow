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
