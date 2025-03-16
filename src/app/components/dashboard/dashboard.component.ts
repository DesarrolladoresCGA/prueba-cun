import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild, viewChild } from '@angular/core';
import { ApiPosgresSqlService } from '../../services/api-posgres-sql.service';
import { ModalComponent } from "../modal/modal.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  idUser: string;
  nameUser: string;
  token: string;
  url: string;
  pokemos: any[] = [];

  limit: number;

  page: number;
  totalRegi: number;
  startPage: number;
  endPage: number;

  @Output() idPokemon: string;
  @ViewChild(ModalComponent) modal!: ModalComponent;

  constructor(private apiDB: ApiPosgresSqlService) {
    this.idUser = "";
    this.nameUser = "";
    this.token = "";
    this.url = "http://localhost/apiCun/img/pokemons/";
    this.idPokemon = "";



    this.limit = 10;
    this.page = 1;
    this.totalRegi = 0;

    this.startPage = 1;
    this.endPage = 0;
  }

  ngOnInit(): void {
    this.datosProfile();
  }

  ngAfterViewInit(): void {
    this.traerPokemos();
  }

  async traerPokemos() {

    const request = await this.apiDB.traerPokemos(this.page, this.token);


    if (request.status == 200) {
      this.totalRegi = request.registros;
      this.endPage = request.paginas;
      this.pokemos = request.datos;
    }
  }

 
  traerPokemonPorId(idPokemon : string){
    this.idPokemon = idPokemon;
    setTimeout(() => {
        this.modal.traerPokemonPorId();
    }, 100);

  }


  eliminarPokemon(idPokemon : string){
    this.idPokemon = idPokemon;
    setTimeout(() => {
        this.modal.eliminarPokemon();
    }, 100);

  }



  changePage(newPage: number) {
    //carlular las paginas para next y previos
    if (newPage >= 1 && newPage <= this.endPage) {
      this.page = newPage;
      this.pokemos = [];
      this.traerPokemos();
      // Actualizar el rango de páginas a mostrar
      this.updatePageRange();
    }
  }

  updatePageRange() {
    // Actualizar el rango de páginas a mostrar (páginas de 10 en 10)
    const block = Math.floor((this.page - 1) / this.limit);
    this.startPage = block * this.limit + 1;
    this.endPage = Math.min(this.startPage + 9, this.endPage);
  }



  datosProfile() {
    const tokenEncrip = this.apiDB.getToken("token");

    const datos = this.apiDB.decencriptarToken(tokenEncrip);

    let array = datos.split('*');

    this.token = array[0] + "," + array[1];
    this.idUser = array[1];
    this.nameUser = array[2];


    return array[0];
  }



}
