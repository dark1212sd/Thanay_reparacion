import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReparacionesService {
  // Ajusta esto si pruebas en un celular real (ej: http://192.168.1.X:3000...)
  private apiUrl = 'http://localhost:3000/api/reparaciones';

  constructor(private http: HttpClient) { }

  // Enviar una nueva reparación al servidor
  crearReparacion(datos: any): Observable<any> {
    return this.http.post(this.apiUrl, datos);
  }

  // Obtener la lista de reparaciones
  obtenerTodas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  actualizarEstado(id: number, nuevoEstado: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { estado: nuevoEstado });
  }
}
