const express = require("express");
const {  getEstados, getEstadoById, createEstado, updateEstadoById, deleteEstado, getEstadosActive} = require('../controllers/estadoEquipo');
const router = express.Router();

// create estado
router.post("/", createEstado );

  // get todos los estados
router.get("/", getEstados);

 // get estados activos
 router.get("/active", getEstadosActive);

// get estado
router.get("/:id", getEstadoById);

// delete estado
router.delete("/:id", deleteEstado);

// update estado
router.put("/:id",  updateEstadoById);

module.exports = router;