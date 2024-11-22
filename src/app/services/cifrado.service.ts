import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CifradoService {

  constructor() { }
  
  // Rail Fence Encrypt
  railFenceEncrypt(text: string, numRails: number): string {
    if (numRails <= 1) return text;
    const rail: string[][] = Array.from({ length: numRails }, () => []);
    let direction = 1;
    let row = 0;

    for (const char of text) {
      rail[row].push(char);
      if (row === 0) direction = 1;
      else if (row === numRails - 1) direction = -1;
      row += direction;
    }

    return rail.flat().join('');
  }


 // Cifrado por sustitución
 sustitucionEncrypt(text: string): string {
  const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Alfabeto en mayúsculas
  const alfabetoCifrado = 'QAZWSXEDCRFVTGBYHNUJMIKOLP'; // Un ejemplo de alfabeto cifrado

  let cifrado = '';
  
  // Recorrer cada caracter del texto
  for (let char of text.toUpperCase()) {
    const index = alfabeto.indexOf(char); // Buscar el índice de la letra en el alfabeto
    if (index !== -1) {
      cifrado += alfabetoCifrado[index]; // Reemplazar por la letra correspondiente
    } else {
      cifrado += char; // Si no está en el alfabeto (como un espacio o signo de puntuación), no se cambia
    }
  }

  return cifrado;
  }

  // Rail Fence Decrypt
  railFenceDecrypt(cipher: string, numRails: number): string {
    if (numRails <= 1) return cipher;
    const rail: string[][] = Array.from({ length: numRails }, () => []);
    let direction = 1;
    let row = 0;

    // Marcar las posiciones
    for (let i = 0; i < cipher.length; i++) {
      rail[row].push('*');
      if (row === 0) direction = 1;
      else if (row === numRails - 1) direction = -1;
      row += direction;
    }

    // Rellenar las posiciones marcadas con el texto cifrado
    let index = 0;
    for (let r = 0; r < numRails; r++) {
      for (let c = 0; c < rail[r].length; c++) {
        if (rail[r][c] === '*') {
          rail[r][c] = cipher[index++];
        }
      }
    }

    // Leer el texto en zigzag
    let result = '';
    row = 0;
    direction = 1;
    for (let i = 0; i < cipher.length; i++) {
      result += rail[row].shift();
      if (row === 0) direction = 1;
      else if (row === numRails - 1) direction = -1;
      row += direction;
    }

    return result;
  }

  // Transposición Encrypt
  transposicionEncrypt(password: string): string {
    const clave = 3; // Número de columnas o clave de transposición (ahora con 3 columnas)
    const filas = Math.ceil(password.length / clave); // Calcular el número de filas necesarias
    let matriz = Array(filas).fill('').map(() => Array(clave).fill('')); // Crear la matriz
  
    // Llenar la matriz con los caracteres del password
    let index = 0;
    for (let i = 0; i < filas; i++) {
      for (let j = 0; j < clave; j++) {
        if (index < password.length) {
          matriz[i][j] = password[index]; // Asignar el carácter a la matriz
          index++;
        } else {
          matriz[i][j] = ' '; // Relleno en caso de que falten caracteres
        }
      }
    }
  
    // Leer la matriz por columnas para crear el texto cifrado
    let cifrado = '';
    for (let j = 0; j < clave; j++) {
      for (let i = 0; i < filas; i++) {
        cifrado += matriz[i][j]; // Concatenar los caracteres por columnas
      }
    }
  
    return cifrado; // Retornar el texto cifrado
  }
  

  // RSA Encrypt (placeholder)
  rsaEncrypt(text: string): string {
    return btoa(text); // Base64 como ejemplo
  }

  // RSA Decrypt (placeholder)
  rsaDecrypt(cipher: string): string {
    return atob(cipher); // Base64 como ejemplo
  }
}
