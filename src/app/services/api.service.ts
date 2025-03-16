import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = "https://pokeapi.co/api/v2/pokemon";
  constructor( private http: HttpClient) { 

  }

  async traerDatosPokemonApi(page: number, limite: number){


    const offset = (page - 1 ) * limite;

    let url = this.url  + "?limit=" + limite  + "&offset=" + offset;

    try {
      const  request = await fetch(url);
      const data = await request.json();

      if(request.status == 200){

        return data.results;

      }else{
        throw '404';
      }


    } catch (error) {

      return new Error('404');

    }
  }

  async traerPokemonPorNombreApi(name: string) {
    let url = `${this.url}/${name}`;

    try {
        const request = await fetch(url);

        if (!request.ok) {
            // No lanzar error, sino devolver un objeto con error
            return { error: `No se encontró el Pokémon: ${name}` };
        }

        const data = await request.json();

        let url2 = data.forms?.[0]?.url;
        if (!url2) return { error: "URL de formulario no encontrada." };

        const request2 = await fetch(url2);

        if (!request2.ok) {
            return { error: `No se encontró la segunda URL ${url2}.` };
        }

        return await request2.json();
    } catch (error) {
        return { error: "Ocurrió un error al obtener los datos." };
    }
}


  async numRegistros(page : number, limite: number){
    const offset = (page - 1 ) * limite;

    let url = this.url  + "?limit=" + limite  + "&offset=" + offset;

    try {
      const  request = await fetch(url);
      const data = await request.json();

      if(request.status == 200){

        return data.count;

      }else{
        throw '404';
      }


    } catch (error) {

      return new Error('404');

    }
  }



}
