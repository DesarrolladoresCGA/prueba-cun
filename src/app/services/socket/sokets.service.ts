import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoketsService {
  private server = io("http://localhost:3000", { autoConnect: false });
  private mensajesSubject = new BehaviorSubject<{ user: string, destinatario: string, text: string }[]>([]);
  mensajes$ = this.mensajesSubject.asObservable();

  constructor() {
    this.server.on("connect", () => {
      console.log("Conectado al WebSocket");
    });

    // Escuchar mensajes desde el servidor
    this.server.on("mensajeCliente", (mensaje) => {
      console.log("Mensaje recibido en Angular:", mensaje);
      const mensajesActuales = this.mensajesSubject.value;
      this.mensajesSubject.next([...mensajesActuales, mensaje]); // Agrega el nuevo mensaje
    });

    this.server.connect();
  }

  // Registrar usuario en el servidor
  registrarUsuario(usuario: string) {
    this.server.emit('registrarUsuario', usuario);
  }

  // Enviar mensaje al servidor
  enviarMensaje(user: string, destinatario: string, mensaje: string) {
    const msgData = { user, destinatario, text: mensaje };
    this.server.emit("mensajeCliente", msgData);
  }
}
