const express = require("express");
const { createMarca, getAllBrands, getMarcaById, deleteMarcaID, actualizarMarca, getMarcasActivas} = require('../controllers/marca');
const router = express.Router();

// create marca
router.post("/", createMarca );

  // obtener todas las marcas
router.get("/", getAllBrands);

// obtener solo las marcas activas
router.get("/active", getMarcasActivas);

// obtener una marca
router.get("/:id", getMarcaById);

// delete una marca
router.delete("/:id", deleteMarcaID);

// update una marca
router.put("/:id", actualizarMarca);

module.exports = router;