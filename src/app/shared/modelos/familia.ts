import { Nevera } from "./nevera";
import { ProductoFamilia } from "./producto-familia";
import { Usuario } from "./usuario";

export class Familia{
    idFamilia: string;
    nombreFamilia: string;
    listaUsuarios: Usuario[];
    listaNeveras: Nevera[];
    listaProductosFamilia: ProductoFamilia[];
    
    constructor(idFamilia: string, nombreFamilia: string='', listaUsuarios =[], listaNeveras=[],listaProductosFamilia=[]){
        this.idFamilia=idFamilia;
        this.nombreFamilia=nombreFamilia;
        this.listaUsuarios=listaUsuarios;
        this.listaNeveras=listaNeveras;
        this.listaProductosFamilia=listaProductosFamilia;
    }

    addUsuario(usuario:Usuario){
        this.listaUsuarios.push(usuario);
    }

    addNevera(nevera:Nevera){
        this.listaNeveras.push(nevera);
    }

    
}