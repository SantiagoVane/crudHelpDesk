import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Usuario } from './models/usuario';
import { CommonModule } from '@angular/common';
import { CifradoService } from './services/cifrado.service';
import { FormsModule } from '@angular/forms'; // Importar FormsModule


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
[x: string]: any;
  usuarioArray: Usuario[] = [
    //{ id: 1, nombre: "Juan", pais: "Colombia" },
    //{ id: 2, nombre: "María", pais: "Colombia" },
    //{ id: 3, nombre: "Pedro", pais: "Colombia" }
  ];

  password: string = ''; // Contraseña ingresada
  cifradoSeleccionado: string = 'railFence';
  texto: string = '';
  cifradoResultado: string = '';

  constructor(private cifradoService: CifradoService) {}


  selectedUsuario: Usuario = new Usuario(); // Instancia de Usuario vacía

  openForEdit(usuario: Usuario){
    this.selectedUsuario = usuario;
    
  }
  // Método para manejar los cambios en el campo 'nombre'
  onNombreChange(event: any) {
    this.selectedUsuario.nombre = event.target.value;
  }

  onPasswordChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.password = inputElement.value;
    console.log('Contraseña actualizada:', this.password); // Verifica si el valor se actualiza correctamente
  }

  agregar() {
    if (!this.password || this.password.trim() === '') {
      alert('Por favor, ingrese una contraseña antes de enviar.');
      return;
    }

    // Aplicar el cifrado según la selección
    if (this.cifradoSeleccionado === 'railFence') {
      this.cifradoResultado = this.cifradoService.railFenceEncrypt(
        this.password,
        3
      ); // Rail Fence con 3 rieles
    } else if (this.cifradoSeleccionado === 'rsa') {
      this.cifradoResultado = this.cifradoService.rsaEncrypt(this.password); // RSA
    }

    // Simular el envío al backend (puedes reemplazar esto con una llamada HTTP)
    console.log('Contraseña Cifrada:', this.cifradoResultado);

    // Aquí puedes realizar cualquier acción adicional con los datos cifrados
    alert('Usuario agregado con contraseña cifrada: ' + this.cifradoResultado);

    const nuevoUsuario: Usuario = {
      id: this.usuarioArray.length + 1, // Generar un nuevo ID
      nombre: this.selectedUsuario.nombre,
      contrasenaCifrada: this.cifradoResultado, // Añadir la contraseña cifrada
    };

    this.usuarioArray.push(nuevoUsuario);

    this.selectedUsuario = new Usuario();
    this.password = '';
    alert(`Usuario agregado: ${nuevoUsuario.nombre} con contraseña cifrada: ${nuevoUsuario.contrasenaCifrada}`);
  
    if(this.selectedUsuario.id === 0){
      this.selectedUsuario.id = this.usuarioArray.length + 1;
      this.usuarioArray.push(this.selectedUsuario);
    }
    // Asegura que el id se asigne correctamente
    
    // Agregar el nuevo usuario a la lista
  

    // Reiniciar el formulario
    this.selectedUsuario = new Usuario();
  }

  delete(){
    if(confirm('Estás seguro de que quieres eliminar este usuario?')){
    this.usuarioArray = this.usuarioArray.filter(x => x != this.selectedUsuario);
    this.selectedUsuario = new Usuario();
    }
  }
}

