const express = require("express");
const { createUsuario , getAllUser, getUserById, deleteUsuarioID, actualizarUsuario} = require('../controllers/usuario');
const router = express.Router();

// create user
router.post("/", createUsuario );

  // get all users
router.get("/", getAllUser);

// get a user
router.get("/:id", getUserById);

// delete a user
router.delete("/:id", deleteUsuarioID);

// update a user
router.put("/:id", actualizarUsuario);

module.exports = router;