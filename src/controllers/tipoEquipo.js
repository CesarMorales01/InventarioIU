const { request, response } = require('express');
const TipoEquipo = require('../models/tipoEquipo');
const usuarioModel = require('../models/user');

/**
 * Consulta solo los tipos de equipo activos
 */
 const getTiposEquipoActive = async (req, res = response) => {
    const query = {"estado": true};    
    const tiposEquipoBD = await TipoEquipo.find(query);
    res.json(tiposEquipoBD);
}

/**
 * Consultar un tipo de equipo por Id
 */
const getTiposEquipoById = async (req = request, res = response) => {
    try{
        const id  = req.params.id;
        console.log(id)
        const query = { _id: id };
        const tipoEquipo = await TipoEquipo.findOne(query);
        res.json(tipoEquipo);
    }catch(e){
        return res.status(500).json({msg: e});
    }
}

/**
 * Actualiza un tipo de equipo por su ID
 */
const updateTipoEquipoById = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const {...data } = req.body;// destructuring, spread (...)
        const usuarioBD = await Usuario.findOne( { email: data.usuario.email });
        if(!usuarioBD){
          return res.status(404).json({msg: 'No existe usuario'});   
        }
        const tipoEquipoBD = await TipoEquipo.findById(id)
        if(tipoEquipoBD==null){
            return res.status(404).json({
                msj: "No existe tipo equipo"
            })
        }
        data.usuario = usuarioBD._id;
        data.fechaCreacion = tipoEquipoBD.fechaCreacion
        data.fechaActualizacion = new Date()
        const tipoEquipo = await TipoEquipo.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(tipoEquipo);
    }catch(e){
        return res.status(500).json({msg: e});
    }
   
}

/**
 * Borrar un tipo de equipo por su ID
 */
const deleteTipoEquipoByID = async (req = request, res = response) => {
    // try- catch
    const id = req.params.id;
    const tipoEquipo = await TipoEquipo.findByIdAndDelete(id);
    res.status(204).json(tipoEquipo);
}

/**
 * Consulta todos los tipos de equipo
 */
const getTiposEquipo = async (req, res = response) => {
    const query = {};    
    const tiposEquipoBD = await TipoEquipo.find(query);
    res.json(tiposEquipoBD);
}

/**
 * crea un tipo de eqipo
 */
const createTipoEquipo = async (req = request, res = response) => {
    const nombre = req.body.nombre;
    const email = req.body.usuario.email;
    const tipoEquipoBD = await TipoEquipo.findOne({ nombre });
    if(tipoEquipoBD){// ya existe el equipo
        return res.status(400).json({msg: 'Ya existe tipo equipo'});
    }
    const usuarioBD = await usuarioModel.findOne({ email });
    if(!usuarioBD){// no existe usuario
        return res.status(404).json({msg: 'No existe usuario'});
    }
    const datos = {
        nombre,
        usuario: usuarioBD._id
    };
    const tipoEquipo = new TipoEquipo(datos); 
    await tipoEquipo.save();
    res.status(201).json(tipoEquipo);
}

module.exports = { getTiposEquipo, getTiposEquipoActive, createTipoEquipo, getTiposEquipoById, updateTipoEquipoById, deleteTipoEquipoByID};
