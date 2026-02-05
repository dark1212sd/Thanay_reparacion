import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

export class Reparacion extends Model {
    public id!: number;
    public clienteNombre!: string;
    public equipoModelo!: string;
    public costoTotalUsd!: number;
    public estado!: string;
    public fechaIngreso!: Date;
}

Reparacion.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    clienteNombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    equipoModelo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    costoTotalUsd: {
        type: DataTypes.DECIMAL(10, 2), // Ejemplo: 50.00
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('PENDIENTE', 'LISTO', 'ENTREGADO'),
        defaultValue: 'PENDIENTE'
    },
    fechaIngreso: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Reparacion',
    tableName: 'reparaciones', // Así se llamará la tabla en MySQL
    timestamps: true // Crea columnas de "creado el" y "actualizado el" automáticamente
});