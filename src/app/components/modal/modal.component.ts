import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiPosgresSqlService } from '../../services/api-posgres-sql.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit{
  imgPokemon: string
  ocultar   : boolean;
  frmCrearPokemon: FormGroup;
  frmUpdatePokemon: FormGroup;

  guardarPokemon : boolean;

  idUser: string;
  token: string;
  @Input() idPokemon: string;
  @Output() datosEnviados = new EventEmitter<string>();

  constructor (private apiBD: ApiPosgresSqlService){
    this.imgPokemon = "./img/default.png";
    this.ocultar    = true;
    this.idUser     = "";
    this.token      = "";
    this.idPokemon  = "";
    this.guardarPokemon = true;

    this.frmCrearPokemon = new FormGroup({
      image: new FormControl('',Validators.required),
      name: new FormControl('', Validators.required),
      group: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      slot: new FormControl('', Validators.required),
    });

    this.frmUpdatePokemon = new FormGroup({
      id    : new FormControl('', Validators.required),
      image : new FormControl(''),
      name  : new FormControl('', Validators.required),
      group : new FormControl('', Validators.required),
      type  : new FormControl('', Validators.required),
      slot  : new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
   this.datosProfile();
  }

  async traerPokemonPorId(){
    const request = await this.apiBD.traerPokemonPorId(this.idPokemon, this.token);

    if(request.status == 200){
      this.imgPokemon = "http://localhost/apiCun/img/pokemons/" +  request.datos[0].image,

      this.frmUpdatePokemon.patchValue({
        id:     request.datos[0].id_pokemon,
        name:   request.datos[0].name,
        image:  null,
        group:  request.datos[0].group,
        type:   request.datos[0].type,
        slot:   request.datos[0].slot,
      });
      
    }else{
      alert (request.mensaje);
    }
  }



  async crearNuevoPokemon(form: any){


    let token = this.token + "," + this.idUser;

   
    const request =  await this.apiBD.crearNuevoPokemon(form,token);

    if(request.status == 200){
      const btnClose = document.getElementById("btnCerrar") as HTMLInputElement;

      if(btnClose){
        btnClose.click();
      }
      alert(request.mensaje);
      this.limpiar();
      this.datosEnviados.emit("eeuu");
    }else{
      alert(request.mensaje);
    }
  }

  async editarPokemon(form: any){

    const request = await this.apiBD.editarPokemon(form, this.token);

    if(request.status == 200){
      alert(request.mensaje);
      this.limpiar();
      this.datosEnviados.emit("eeuu");

    }else{
      alert(request.mensaje);
    }
  }

  async eliminarPokemon(){
    const request = await this.apiBD.eliminnarPokemon(this.idPokemon, this.token);

    if(request.status == 200){
      alert(request.mensaje);
      this.limpiar();
      this.datosEnviados.emit("eeuu");
    }else{
      alert(request.mensaje);
    }
  }


  cargarimgPokemon(event: any){
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target?.result as string; 
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          //comprimir imagen
          const compressedBase64Image = canvas.toDataURL('image/jpeg', 1); 
          //this.cedulafrontal = "" + compressedBase64Image;
          const textarea = document.getElementById('image') as HTMLTextAreaElement;
          textarea.value = '' +compressedBase64Image;
          // Actualiza el valor del campo reciboservicio en el formulario
          this.frmCrearPokemon.patchValue({
            image: textarea.value 
          });

          this.frmUpdatePokemon.patchValue({
            image: textarea.value 
          });

        };
        img.src = base64Image;
      };
      reader.readAsDataURL(file);
      this.imgPokemon = URL.createObjectURL(file);
    } else {
     alert('No se ha seleccionado ninguna imagen');
    }
  }

  limpiar(){

    this.frmCrearPokemon.patchValue({
      image: null,
      name:  null,
      group: null,
      type:  null,
      slot:  null,
    });

    this.frmUpdatePokemon.patchValue({
      id:    null,
      image: null,
      name:  null,
      group: null,
      type:  null,
      slot:  null,
    });

    this.imgPokemon = "./img/default.png";


  }

  datosProfile() {
    const tokenEncrip = this.apiBD.getToken("token");

    const datos = this.apiBD.decencriptarToken(tokenEncrip);

    let array = datos.split('*');

    this.token = array[0] + "," + array[1];
    this.idUser = array[1];



    return array[0];
  }


}
