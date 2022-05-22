const { request, response } = require('express');

const marcaModel = require('../models/marca');

const createMarca = async (req = request, res = response) => {
    try{
        const body = req.body;
        const marca = new marcaModel( body )
        await marca.save();
        res.status(201).json(marca);
    }catch(e){
        return res.status(500).json({error: e});
    }
}

const getAllBrands = async (req = request, res = response) => {
    try{
        const result = await marcaModel.find();
        res.json(result);
    } catch (e){
        return res.status(500).json({mensaje: e})
    }
}

const getMarcaById = async (req = request, res = response) => {
    const { id } = req.params;
    marcaModel
      .findById(id)
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
}

const deleteMarcaID = async (req = request, res = response) => {
   try {
    const id = req.params.id;
    const usu = await marcaModel.findByIdAndDelete(id);
    res.status(204).json(usu);
   }catch (e){
        return res.status(500).json({mensaje: e})
    } 
}

const actualizarMarca = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const {...data } = req.body;// destructuring, spread (...)
        
        const tipoMarcaBD = await marcaModel.findById(id)
        if(tipoMarcaBD==null){
            return res.status(404).json({
                msj: "No existe la marca!"
            })
        }
        
        data.fechaCreacion = tipoMarcaBD.fechaCreacion
        data.fechaActualizacion = new Date()
        const tipoMarca = await marcaModel.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(tipoMarca);
    }catch(e){
        return res.status(500).json({msg: e});
    }
}

module.exports = { createMarca , getAllBrands, getMarcaById, deleteMarcaID, actualizarMarca }