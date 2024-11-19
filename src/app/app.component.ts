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
    { id: 2, nombre: "María", pais: "México" },
    { id: 3, nombre: "Pedro", pais: "Argentina" }
  ];

  selectedUsuario: Usuario = { id: 0, nombre: '', pais: '' };
  nombre: string = '';
  pais: string = '';
  
  
  openForEdit(usuario: Usuario){
    this.selectedUsuario = usuario;
    this.nombre = usuario.nombre;
    this.pais = usuario.pais;
  }
  // Método para manejar los cambios en el campo 'nombre'
  onNombreChange(event: any) {
    const input = event.target as HTMLInputElement;
    this.nombre = input.value;
    this.selectedUsuario.nombre = input.value;
  }

  // Método para manejar los cambios en el campo 'pais'
  onPaisChange(event: any) {
    const input = event.target as HTMLInputElement;
    this.pais = input.value;
    this.selectedUsuario.pais = input.value;
  }

  agregar(): void {
    if (this.selectedUsuario.id === 0) {
      const newId = this.usuarioArray.length + 1;
      this.usuarioArray.push({
        id: newId,
        nombre: this.nombre,
        pais: this.pais
      });
    } else {
      const index = this.usuarioArray.findIndex(u => u.id === this.selectedUsuario.id);
      if (index > -1) {
        this.usuarioArray[index].nombre = this.nombre;
        this.usuarioArray[index].pais = this.pais;
      }
    }
    this.resetForm();
  }

  delete(){
    if(confirm('Estás seguro de que quieres eliminar este usuario?')){
    this.usuarioArray = this.usuarioArray.filter(x => x != this.selectedUsuario);
    this.selectedUsuario = new Usuario();
    }
  }

  resetForm(): void {
    this.selectedUsuario = { id: 0, nombre: '', pais: '' };
    this.nombre = '';
    this.pais = '';
  }
}

