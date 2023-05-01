class Familia{
    constructor(idFamilia, nombreFamilia, listaUsuarios =[], listaNeveras=[],listaProductosFamilia=[]){
        this.idFamilia=idFamilia;
        this.nombreFamilia=nombreFamilia;
        this.listaUsuarios=listaUsuarios;
        this.listaNeveras=listaNeveras;
        this.listaProductosFamilia=listaProductosFamilia;
    }

    addUsuario(usuario){
        this.listaUsuarios.push(usuario);
    }

    
}