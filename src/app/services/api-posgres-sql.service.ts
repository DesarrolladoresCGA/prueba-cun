import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class ApiPosgresSqlService {

  url = "http://localhost/apiCun/"

  constructor(private http: HttpClient, private cooki: CookieService) { }

  async login(form: any) {

    let url = this.url + "login/consultarUsuario.php";
    try {

      const request = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
      });

      const data = await request.json();

      return data;
    } catch (error) {
      return new Error("usuario no encontrado");
    }
  }

  async traerPokemos(page: number, token: string) {

    let url = this.url + "admin/dashboard/traerPokemos.php";
    try {

      const request = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": token
        },
        body: JSON.stringify(page)
      });

      const data = await request.json();

      return data;
    } catch (error) {
      return new Error("Error en la consulta");
    }
  }

  async crearNuevoPokemon(form: any, token: string){
    let url = this.url + "admin/dashboard/crearPokemon.php";
    try {

      const request = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": token
        },
        body: JSON.stringify(form)
      });

      const data = await request.json();

      return data;

    } catch (error) {
      return new Error("Error no se puede guardar el pokémon");
    }
  }

  async editarPokemon(form: any, token: string) {

    let url = this.url + "admin/dashboard/editarPokemon.php";
    try {

      const request = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": token
        },
        body: JSON.stringify(form)
      });

      const data = await request.json();

      return data;
    } catch (error) {
      return new Error("Error en la consulta");
    }
  }

  async eliminnarPokemon(idPokemon: string, token: string) {
    let url = this.url + "admin/dashboard/eliminarPokemon.php";
    try {

      const request = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": token
        },
        body: JSON.stringify(idPokemon)
      });

      const data = await request.json();

      return data;
    } catch (error) {
      return new Error("Error en la consulta");
    }
  }

  async traerToken(idUser: string) {
    let url = this.url + "login/consultarToken.php";
    try {

      const request = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: idUser
      });

      const data = await request.json();

      return data;

    } catch (error) {
      return new Error("Token no encontrado");
    }
  }

  async traerPokemonPorId(idUser: string, token:string) {

    let url = this.url + "admin/dashboard/traerPokemonPorId.php";

    try {

      const request = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": token
        },
        body: idUser
      });

      const data = await request.json();

      return data;

    } catch (error) {
      return new Error("Token no encontrado");
    }
  }

  decencriptarToken(token: string) {
    let contra = "A*asfasdfsdf//AMBVoedf25/*wfsddf+-ADW3DWDnvccEw32/154Aqv";
    return CryptoJS.AES.decrypt(token, contra).toString(CryptoJS.enc.Utf8);
  }

  encriptarToken(token: string, id: string, usuario: string) {
    let contraToken = "A*asfasdfsdf//AMBVoedf25/*wfsddf+-ADW3DWDnvccEw32/154Aqv";
    //this.tokenEncrip = CryptoJS.AES.encrypt(token+","+id,contraToken).toString();
    return CryptoJS.AES.encrypt(token + "*" + id + "*" + usuario, contraToken).toString();
  }

  getToken(tokenkey: string): string {
    //this.token = this.cooki.get(tokenkey);
    return this.cooki.get(tokenkey);
  }

  setToken(token: string, expiryDays: number): void {
    var now = new Date();

    var expiration = new Date(now.getTime() + expiryDays * 3600000);

    this.cooki.set("token", token, expiration, '/');

  }

  cerrarSeccion(tokenkey: string) {
    this.cooki.delete(tokenkey, '/');
  }
}
