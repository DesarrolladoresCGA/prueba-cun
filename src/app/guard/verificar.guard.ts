import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

export const verificarGuard: CanActivateFn = async (route, state) => {

  let pokemon = route.params['name'];
  const api = inject(ApiService);
  const router = inject(Router);

  try {
    let data = await api.traerPokemonPorNombreApi(pokemon);
    if (data?.error) {
      router.navigate(['']); // Redirigir al home si no existe el Pokémon
      return false;
    }else{
      return true;
    }

  } catch (error) {
    router.navigate(['']);
    return false;
  }

};
