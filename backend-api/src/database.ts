import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Creamos la instancia de conexión
export const sequelize = new Sequelize(
    process.env.DB_NAME || 'reparaciones_db',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || '',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: false, // Pon en true si quieres ver los SELECT/INSERT en la terminal
    }
);

// Función para probar la conexión
export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a MySQL exitosa');

        // Esto sincroniza tus modelos con la BD (crea tablas si no existen)
        await sequelize.sync();
        console.log('🔄 Tablas sincronizadas');
    } catch (error) {
        console.error('❌ Error conectando a MySQL:', error);
    }
};