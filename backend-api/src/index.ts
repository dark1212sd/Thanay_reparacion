import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './database';
import './models/Reparacion'; // Importamos el modelo
import reparacionesRoutes from './routes/reparaciones'; // <--- 1. Importación

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB();

// 👇 2. ESTA ES LA LÍNEA CLAVE QUE FALTABA O ESTABA MAL UBICADA 👇
app.use('/api/reparaciones', reparacionesRoutes);

app.get('/', (req, res) => {
    res.send('Servidor de Reparaciones: EN LÍNEA 🟢');
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});