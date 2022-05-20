const express = require("express");
const userSchema = require("../models/user");

const router = express.Router();

// create user
// no he usado async ya que me parece importante imprimir si hay un error....
router.post("/users", (req, res) => {
    const user = userSchema(req.body);
    user.save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });

  // get all users
  // usar async - await que es mas legible
router.get("/users", async (req, res) => {
    const result = await userSchema.find();
    res.json(result);
});

// get a user
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete a user
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update a user
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, estado, fechaCreacion, fechaActualizacion } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { name, email, estado, fechaCreacion, fechaActualizacion } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;