const express = require("express");
const { createMarca, getAllBrands, getMarcaById, deleteMarcaID, actualizarMarca} = require('../controllers/marca');
const router = express.Router();

// create user
router.post("/", createMarca );

  // get all users
router.get("/", getAllBrands);

// get a user
router.get("/:id", getMarcaById);

// delete a user
router.delete("/:id", deleteMarcaID);

// update a user
router.put("/:id", actualizarMarca);

module.exports = router;