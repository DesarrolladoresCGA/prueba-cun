import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiPosgresSqlService } from '../services/api-posgres-sql.service';

export const tokenGuard: CanActivateFn = async (route, state) => {

  const apiDB = inject(ApiPosgresSqlService);
  const router = inject(Router);
  
  const tokenEncrip =  apiDB.getToken("token");

  const datos = apiDB.decencriptarToken(tokenEncrip);

    let array = datos.split('*');
    let token =  array[0];
    let idUser = array[1];

    const datosDB = await apiDB.traerToken(idUser);

 
    if(datosDB.status == 200){

      let tokenDB =  datosDB.datos[0].token

      if(tokenDB == token){
        return true;
      }else{
        apiDB.cerrarSeccion("token");
        router.navigate(['login']);
        return false;
      }
    }else{
      apiDB.cerrarSeccion("token");
      router.navigate(['login']);
      return false;
    }


};
