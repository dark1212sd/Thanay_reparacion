import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // <--- 1. Importante para la navegación
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonInput, IonList,
  IonButtons, IonButton // <--- 2. Importamos los componentes del error
} from '@ionic/angular/standalone';
import { PagoMovilComponent } from '../components/pago-movil/pago-movil.component';
import { ReparacionesService } from '../services/reparaciones';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule, // <--- 3. Agregado aquí
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonInput, IonList,
    IonButtons, IonButton, // <--- 4. Agregados aquí
    PagoMovilComponent
  ],
})
export class HomePage { // Ya no necesitamos OnInit aquí porque movimos la lista

  cliente: string = '';
  equipo: string = '';
  costo: number = 25;

  constructor(private reparacionesService: ReparacionesService) {}

  procesarPago(datosPago: any) {
    if (!this.cliente || !this.equipo) {
      alert('⚠️ Completa los datos primero.');
      return;
    }

    const datosParaGuardar = {
      clienteNombre: this.cliente,
      equipoModelo: this.equipo + " (Ref: " + datosPago.referencia + ")",
      costoTotalUsd: this.costo
    };

    this.reparacionesService.crearReparacion(datosParaGuardar).subscribe({
      next: () => {
        alert('✅ Equipo Ingresado al Taller');
        this.cliente = '';
        this.equipo = '';
        // Ya no recargamos lista aquí, eso lo hace la página de Taller
      },
      error: () => alert('❌ Error al guardar')
    });
  }
}
