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

  // RSA Encrypt (placeholder)
  rsaEncrypt(text: string): string {
    return btoa(text); // Base64 como ejemplo
  }

  // RSA Decrypt (placeholder)
  rsaDecrypt(cipher: string): string {
    return atob(cipher); // Base64 como ejemplo
  }
}
