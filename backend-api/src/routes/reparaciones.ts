import { Router } from 'express';
import { Reparacion } from '../models/Reparacion';

const router = Router();

// 1. RUTA PARA CREAR (POST)
// La App llamará aquí para guardar una nueva reparación
router.post('/', async (req, res) => {
    try {
        const nuevaReparacion = await Reparacion.create(req.body);
        res.json({ exito: true, datos: nuevaReparacion });
    } catch (error) {
        res.status(500).json({ exito: false, error: error });
    }
});

// 2. RUTA PARA LEER (GET)
// La App llamará aquí para mostrar la lista de equipos en taller
router.get('/', async (req, res) => {
    try {
        const lista = await Reparacion.findAll();
        res.json(lista);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos' });
    }
});


// 3. RUTA PARA ACTUALIZAR ESTADO (PUT)
// Recibimos el ID en la URL y el nuevo estado en el cuerpo
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body; // Esperamos algo como { "estado": "LISTO" }

        const reparacion = await Reparacion.findByPk(id);

        if (reparacion) {
            reparacion.estado = estado;
            await reparacion.save(); // Guardamos el cambio en MySQL
            res.json({ exito: true, datos: reparacion });
        } else {
            res.status(404).json({ error: 'Reparación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar' });
    }
});

export default router;