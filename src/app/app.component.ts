import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Usuario } from './models/usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
[x: string]: any;
  usuarioArray: Usuario[] = [
    { id: 1, nombre: "Juan", pais: "Colombia" },
    { id: 2, nombre: "María", pais: "Colombia" },
    { id: 3, nombre: "Pedro", pais: "Colombia" }
  ];

  selectedUsuario: Usuario = new Usuario(); // Instancia de Usuario vacía

  openForEdit(usuario: Usuario){
    this.selectedUsuario = usuario;
  }
  // Método para manejar los cambios en el campo 'nombre'
  onNombreChange(event: any) {
    this.selectedUsuario.nombre = event.target.value;
  }

  // Método para manejar los cambios en el campo 'pais'
  onPaisChange(event: any) {
    this.selectedUsuario.pais = event.target.value;
  }

  agregar() {
    // Asegura que el id se asigne correctamente
    this.selectedUsuario.id = this.usuarioArray.length + 1;

    // Agregar el nuevo usuario a la lista
    this.usuarioArray.push({ ...this.selectedUsuario });

    // Reiniciar el formulario
    this.selectedUsuario = new Usuario();
  }
}

