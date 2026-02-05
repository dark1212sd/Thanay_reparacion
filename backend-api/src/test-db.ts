import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
    console.log('🕵️ Iniciando prueba de conexión directa...');

    const config = {
        host: process.env.DB_HOST || '127.0.0.1',
        user: process.env.DB_USER || 'leonard',
        password: process.env.DB_PASS || '123456',
        database: process.env.DB_NAME || 'reparaciones_db',
        port: 3306
    };

    console.log('📋 Usando configuración:', { ...config, password: '****' });

    try {
        const connection = await mysql.createConnection(config);
        console.log('✅ ¡ÉXITO! Conexión establecida correctamente.');
        await connection.end();
    } catch (error: any) {
        console.error('❌ FALLÓ la conexión. Motivo:');
        console.error(error.message);
    }
}

testConnection();