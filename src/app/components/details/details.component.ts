import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{

  pokemons : any = [];
  name     : string;

  imgPrin  : string;
  constructor(private api: ApiService, private acRouter: ActivatedRoute){
    this.name = "";
    this.imgPrin = "";
    this.acRouter.params.subscribe(param =>{
      this.name = param['name'];
    });
  }

  ngOnInit(): void {
    this.datosPokemo();
  }


  async datosPokemo() {
    try {
      const data = await this.api.traerPokemonPorNombreApi(this.name);
      this.pokemons = [];

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

      this.imgPrin = this.pokemons[0].img1;

      console.log(this.pokemons);

      
    } catch (error) {
      
    }
  }

  cmabiarImange(pokemon : string){
    this.imgPrin = pokemon;
  }
}
