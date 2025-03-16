import { Component, Input, input, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{

  pokemons: any[] = [];

  @Input() limit: number;

  page      : number;
  numPages  : number;
  totalRegi : number;
  canPorPage: number;
  startPage : number;
  endPage   : number;

  paginador : boolean;

  constructor(private api: ApiService, private router: Router){
    this.limit      = 10;
    this.page       = 1;
    this.numPages   = this.page;
    this.totalRegi  = 0;
    this.canPorPage = 20;
    this.startPage  = 1;
    this.endPage    = 10;
    this.paginador  = true;

  }

  ngOnInit(): void {
    this.traerDatos();
    this.numPaginas();
  }

  async traerDatos() {
    try {
      const data = await this.api.traerDatosPokemonApi(this.page, this.limit);

      for (let i = 0; data.length > i; i++) {

        let name = data[i].name

        try {
          const data2 = await this.api.traerPokemonPorNombreApi(name);

          this.pokemons.push({
            'name': data2.name,
            'group': data2.version_group.name,
            'slot': data2.types[0].slot,
            'type': data2.types[0].type.name,
            'img1': data2.sprites.back_default,
            'img2': data2.sprites.back_female,
            'img3': data2.sprites.back_shiny,
            'img4': data2.sprites.back_shiny_female,
            'img5': data2.sprites.front_default,
            'img6': data2.sprites.front_female,
            'img7': data2.sprites.front_shiny,
            'img8': data2.sprites.front_shiny_female,

          });

        } catch (error) {

        }


      }

    } catch (error) {

    }

  }

  buscarPorNombre(event: any){
    let texto = event.target.value;
    this.datosPokemo(texto);
  }

  async datosPokemo(name: string) {
    try {
      const data = await this.api.traerPokemonPorNombreApi(name);
      this.pokemons = [];
      this.paginador = false;

      this.pokemons.push({
        'name': data.name,
        'group': data.version_group.name,
        'slot': data.types[0].slot,
        'type': data.types[0].type.name,
        'img1': data.sprites.back_default,
        'img2': data.sprites.back_female,
        'img3': data.sprites.back_shiny,
        'img4': data.sprites.back_shiny_female,
        'img5': data.sprites.front_default,
        'img6': data.sprites.front_female,
        'img7': data.sprites.front_shiny,
        'img8': data.sprites.front_shiny_female,

      });

      
    } catch (error) {
      this.limpiar();
    }
  }

  changePage(newPage: number) {
    //carlular las paginas para next y previos
    if (newPage >= 1 && newPage <= this.numPages) {
      this.page = newPage;
      this.pokemons = [];
      this.traerDatos();
       // Actualizar el rango de páginas a mostrar
      this.updatePageRange(); 
    }
  }

  changeRecordsPerPage(newCount: number) {
    this.canPorPage = newCount;
    this.page = 1;
    this.pokemons = [];
    this.numPaginas();
    this.traerDatos();
  }


  updatePageRange() {
    // Actualizar el rango de páginas a mostrar (páginas de 10 en 10)
    const block = Math.floor((this.page - 1) / this.limit);
    this.startPage = block * this.limit + 1;
    this.endPage = Math.min(this.startPage + 9, this.numPages);
  }

  async numPaginas() {
    try {
      const data = await this.api.numRegistros(this.page, this.limit);

      this.totalRegi = parseInt(data, this.limit); 
     
      this.numPages = Math.ceil(this.totalRegi / this.canPorPage);  

    } catch (error) {
      console.error('Error al cargar el número de páginas:', error);
    }
  }

  viewDetails(name: string){
    this.router.navigate(['details', name])
  }

  limpiar(){
    const input = document.getElementById("txtBuscar") as HTMLInputElement;

    if (input) {
      input.value = "";
    }
    
    this.pokemons = [];
    this.traerDatos();
    this.paginador = true;
  }
}
