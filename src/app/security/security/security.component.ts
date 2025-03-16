import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiPosgresSqlService } from '../../services/api-posgres-sql.service';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-security',
  standalone: true,
  imports: [],
  templateUrl: './security.component.html',
  styleUrl: './security.component.css'
})
export class SecurityComponent implements OnInit{

  token : string;
  tokenKey: string;
  objToken: any ={};

  @Output() datosEnviados = new EventEmitter<string>();

  constructor(private cooki: CookieService, private router : Router, private apiDB : ApiPosgresSqlService){
    this.token = "";
    this.tokenKey = "token";
  }

  ngOnInit(): void {
    this.getToken();
  }

  verificarToken(){
    if(this.token != ""){
      let miToken = this.apiDB.decencriptarToken(this.token);
      
      this.objToken = {
        "token" : miToken
      }

    }
  }

  getToken(): string{
    this.token = this.cooki.get(this.tokenKey);

    return this.token = this.cooki.get(this.tokenKey);

  }

  enviarUserDatos(){
    this.verificarToken();
    let token = this.apiDB.decencriptarToken(this.token);
    this.datosEnviados.emit(this.objToken);
  }
}
