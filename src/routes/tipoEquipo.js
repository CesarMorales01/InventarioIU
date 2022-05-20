const express = require("express");
const userSchema = require("../models/tipoEquipo");

const router = express.Router();

// create 
router.post("/tipoEquipos", (req, res) => {
    const user = userSchema(req.body);
    user.save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });

  // get all
  // usar async - await que es mas legible
router.get("/tipoEquipos", async (req, res) => {
    const result = await userSchema.find();
    res.json(result);
});

  // get equipos activos con usuario activo
  router.get("/tipoEquiposUserAtice", async (req, res) => {
    const query ={estado: true};
    let result = await userSchema.find(query).populate({
      path: 'usuario',
      match:{estado:true}
    });
    result.filter(t=>{t.estado !=null})
    res.json(result);
});

// get a one
router.get("/tipoEquipos/:id", (req, res) => {
  const { id } = req.params;
  userSchema.findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete
router.delete("/tipoEquipos/:id", (req, res) => {
  const { id } = req.params;
  userSchema.remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update
router.put("/tipoEquipos/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, estado, fechaCreacion, fechaActualizacion } = req.body;
  userSchema.updateOne({ _id: id }, { $set: { name, email, estado, fechaCreacion, fechaActualizacion } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;