import { Component, OnInit } from '@angular/core';
import { ApiPosgresSqlService } from '../../services/api-posgres-sql.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule ,ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  frmLogin : FormGroup;
  constructor(private apiBD: ApiPosgresSqlService, private router: Router){
    this.frmLogin = new FormGroup ({
      usuario: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.apiBD.cerrarSeccion("token");
  }


   async login(frmLogin: any){
    
    const rest = await this.apiBD.login(frmLogin);

    if(rest.status == 200){

      let tokenEncriptar =  this.apiBD.encriptarToken(rest.token,rest.datos[0].id,rest.datos[0].user);

      this.apiBD.setToken(tokenEncriptar, 4);

      setTimeout(() => {
        this.router.navigate(['dashboard']);
      }, 100);


    }else{
      alert(rest.mensaje);
    }


  }
}
