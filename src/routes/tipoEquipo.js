const { Router } = require('express');
const { getTiposEquipo, getTiposEquipoActive, createTipoEquipo, getTiposEquipoById, updateTipoEquipoById, deleteTipoEquipoByID } = require('../controllers/tipoEquipo');

const router = Router();

/**
 * btiene todos los tipos de equipos los cuales los usuarios
 * son activos
 */
router.get('/active', getTiposEquipoActive);

/**
 * Obtiene todos los tipos de equipos
 */
router.get('/', getTiposEquipo);

/**
 * Obtiene un tipos de equipos por id
 */
 router.get('/:id', getTiposEquipoById);

/**
 * Crear un tipos de equipos
 */
router.post('/', createTipoEquipo);

/**
 * Actualiza un tipos de equipos por id
 */
router.put('/:id', updateTipoEquipoById);

/**
 * Actualiza una parte del tipos de equipos
 */
router.patch('/:id', (req, res) => {
    res.json({});
});

/**
 * Borra un tipos de equipos por id
 */
 router.delete('/:id', deleteTipoEquipoByID);

module.exports = router;