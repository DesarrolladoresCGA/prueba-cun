import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SoketsService } from '../../services/socket/sokets.service';

@Component({
  selector: 'app-sokets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sokets.component.html',
  styleUrl: './sokets.component.css'
})
export class SoketsComponent implements OnInit {
  mensajePersona1 = '';
  mensajePersona2 = '';
  mensajes: { user: string, destinatario: string, text: string }[] = [];

  constructor(private socketService: SoketsService) {}

  ngOnInit() {
    // Registrar usuarios
    this.socketService.registrarUsuario('persona1');
    this.socketService.registrarUsuario('persona2');

    // Escuchar los mensajes
    this.socketService.mensajes$.subscribe(mensajes => {
      this.mensajes = mensajes;
    });
  }

  enviarMensaje(usuario: string, destinatario: string, mensaje: string) {
    if (mensaje.trim()) {
      this.socketService.enviarMensaje(usuario, destinatario, mensaje);
      if (usuario === 'persona1') {
        this.mensajePersona1 = '';
      } else {
        this.mensajePersona2 = '';
      }
    }
  }
}
