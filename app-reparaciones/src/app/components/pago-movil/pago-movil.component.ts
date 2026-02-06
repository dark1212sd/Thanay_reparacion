import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pago-movil',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importante para que funcionen los inputs
  templateUrl: './pago-movil.component.html',
  styleUrls: ['./pago-movil.component.scss']
})
export class PagoMovilComponent {
  @Input() totalUsd: number = 0;
  @Input() tasaBcv: number = 0;

  datosComercio = {
    banco: '0105 - Mercantil',
    telefono: '0414-1234567',
    cedula: 'V-12345678',
    nombre: 'Tecni-Reparaciones CA'
  };

  pago = { referencia: '', fecha: new Date().toISOString().substring(0, 10) };

  @Output() onPagoReportado = new EventEmitter<any>();

  get totalBolivares(): number {
    return this.totalUsd * this.tasaBcv;
  }

  copiarDato(dato: string) {
    navigator.clipboard.writeText(dato);
    alert('Copiado: ' + dato);
  }

  reportarPago() {
    this.onPagoReportado.emit({
      metodo: 'PAGO_MOVIL',
      monto_bs: this.totalBolivares,
      referencia: this.pago.referencia
    });
  }
}
