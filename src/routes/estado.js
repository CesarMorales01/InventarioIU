const express = require("express");
const {  getEstados, getEstadoById, createEstado, updateEstadoById, deleteEstado} = require('../controllers/estadoEquipo');
const router = express.Router();

// create user
router.post("/", createEstado );

  // get all users
router.get("/", getEstados);

// get a user
router.get("/:id", getEstadoById);

// delete a user
router.delete("/:id", deleteEstado);

// update a user
router.put("/:id",  updateEstadoById);

module.exports = router;