import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Usuario } from './models/usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  usuarioArray: Usuario[] = [
    { id: 1, nombre: "Juan", pais: "Colombia" },
    { id: 2, nombre: "María", pais: "Colombia" },
    { id: 3, nombre: "Pedro", pais: "colombia" }
  ];
}
