import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonBadge,
  IonButtons, IonBackButton,             // <--- Faltaban estos
  IonRefresher, IonRefresherContent,     // <--- Faltaban estos
  ActionSheetController
} from '@ionic/angular/standalone';
import { ReparacionesService } from '../../services/reparaciones';

@Component({
  selector: 'app-taller',
  templateUrl: './taller.page.html',
  styleUrls: ['./taller.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonBadge,
    IonButtons, IonBackButton,           // <--- Importante: Agregarlos aquí también
    IonRefresher, IonRefresherContent
  ]
})
export class TallerPage {

  // 1. Variable que el HTML estaba buscando y no encontraba
  listaReparaciones: any[] = [];

  constructor(
    private reparacionesService: ReparacionesService,
    private actionSheetCtrl: ActionSheetController
  ) { }

  // Se ejecuta cada vez que entras a la pantalla
  ionViewWillEnter() {
    this.cargarDatos();
  }

  // 2. Función que el HTML reclamaba ("cargarDatos does not exist")
  cargarDatos(event?: any) {
    this.reparacionesService.obtenerTodas().subscribe({
      next: (datos) => {
        this.listaReparaciones = datos;
        if (event) event.target.complete(); // Detener la animación de recarga
      },
      error: (e) => {
        console.error(e);
        if (event) event.target.complete();
      }
    });
  }

  // 3. Función del menú desplegable
  async abrirOpciones(reparacion: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Actualizar: ' + reparacion.equipoModelo,
      buttons: [
        {
          text: '🛠️ Pendiente / En Revisión',
          handler: () => this.cambiarEstado(reparacion.id, 'PENDIENTE')
        },
        {
          text: '✅ ¡LISTO PARA ENTREGAR!',
          handler: () => this.cambiarEstado(reparacion.id, 'LISTO')
        },
        {
          text: '👋 Entregado al Cliente',
          role: 'destructive',
          handler: () => this.cambiarEstado(reparacion.id, 'ENTREGADO')
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          data: { action: 'cancel' }
        }
      ]
    });

    await actionSheet.present();
  }

  // 4. Función para guardar cambios en BD
  cambiarEstado(id: number, nuevoEstado: string) {
    this.reparacionesService.actualizarEstado(id, nuevoEstado).subscribe({
      next: () => {
        this.cargarDatos(); // Recargar lista para ver el nuevo color
      },
      error: (e) => alert('Error al actualizar estado')
    });
  }
}
