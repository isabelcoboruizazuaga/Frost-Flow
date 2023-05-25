import { ProductoFamilia } from "./producto-familia";

export class Cajon {
    idCajon: string;
    nombreCajon: string;
    tipoCajon: string;
    idNevera:string;
    listaProductos: ProductoFamilia[];

    constructor (idCajon: string,idNevera:string, nombreCajon: string="",tipoCajon:string="", listaProductos=[]){
        this.idCajon=idCajon;
        this.idNevera=idNevera;
        this.nombreCajon=nombreCajon;
        this.tipoCajon=tipoCajon;
        this.listaProductos=listaProductos;
    }

    addProducto(producto:ProductoFamilia){
        this.listaProductos.push(producto);
    }

    setNombre(nombreCajon:string){
        this.nombreCajon=nombreCajon;
    }
}
