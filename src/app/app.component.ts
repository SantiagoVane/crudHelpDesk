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
  usuarioArray: Usuario[] = [
    { id: 1, nombre: "Juan", pais: "Colombia" },
    { id: 2, nombre: "María", pais: "Colombia" },
    { id: 3, nombre: "Pedro", pais: "Colombia" }
  ];

  selectedUsuario: Usuario = new Usuario(); // Instancia de Usuario vacía

  // Método para manejar los cambios en el campo 'nombre'
  onNombreChange(event: any) {
    this.selectedUsuario.nombre = event.target.value;
  }

  // Método para manejar los cambios en el campo 'pais'
  onPaisChange(event: any) {
    this.selectedUsuario.pais = event.target.value;
  }

  // Método para agregar o actualizar el usuario
  agregar() {
    if (this.selectedUsuario.id) {
      // Si ya tiene id, actualizar el usuario
      const index = this.usuarioArray.findIndex(usuario => usuario.id === this.selectedUsuario.id);
      if (index !== -1) {
        this.usuarioArray[index] = { ...this.selectedUsuario };
      }
    } else {
      // Si no tiene id, agregar un nuevo usuario
      this.selectedUsuario.id = this.usuarioArray.length + 1;
      this.usuarioArray.push({ ...this.selectedUsuario });
    }

    // Reiniciar el formulario
    this.selectedUsuario = new Usuario();
  }

  // Método para abrir el formulario de edición con los datos del usuario seleccionado
  abriredit(usuario: Usuario) {
    this.selectedUsuario = { ...usuario };  // Hacemos una copia del usuario para evitar referencias
  }
}
