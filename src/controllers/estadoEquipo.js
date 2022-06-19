const { request, response } = require('express');
const Estado = require('../models/estadoEquipo');

/**
 * Consultar todos los estados
 */
 const getEstados = async (req, res = response) => {
    try{
        const estadosBD = await Estado.find();
        res.json(estadosBD);
    }catch(e){
        return res.status(500).json({
            error: e
        })
    }
}

/**
 * Consultar todos estados activos
 */
const getEstadosActive = async (req, res = response) => {
    try{
        const query = { estado: true}; // estado del equipo
        const estadosBD = await Estado.find(query);
        res.json(estadosBD);
    }catch(e){
        return res.status(500).json({
            error: e
        })
    }
}

/**
 * Consultar un ESTADO por Id
 */
const getEstadoById = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const query = {_id: id}; 
        const estadosBD = await Estado.findOne(query);
        res.json(estadosBD);
    }catch(e){
        return res.status(500).json({
            error: e
        });
    }
}

/**
 * crea un estado
 */
 const createEstado = async (req = request, res = response) => {
     console.log(req)
    try{
        const nombre = req.body.name;
        const estadoBody=req.body.estado
        const query = { name: nombre}; 
        const estadoBD = await Estado.findOne(query);
        if(estadoBD){
            return res.status(400).json({msg: 'Ya existe estado'});
        }
        const datos = {
            name: nombre,
            estado: estadoBody
        };
        const estado = new Estado(datos); 
        await estado.save();
        res.status(201).json(estado);
    }catch(e){
        return res.status(500).json({
            error: e
        });
    }
}

/**
 * Actualiza un estado por su ID
 */
const updateEstadoById = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const { nombre, ...data } = req.body;// destructuring, spread (...)
    
        const estadoBD = await Estado.findOne({ _id: id });
    
        if(!estadoBD){
            return res.status(404).json({
                msj: 'No existe estado'
            });
        }
        data.fechaCreacion = estadoBD.fechaCreacion;
        data.fechaActualizacion = new Date();
        const estado = await Estado.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(estado);
    }catch(e){
        return res.status(500).json({
            error: e
        });
    }
}

const deleteEstado = async (req = request, res = response) => {
    try{
        const id = req.params.id;
         const tipoEquipo = await Estado.findByIdAndDelete(id);
        res.status(204).json(tipoEquipo);
    }catch(e){
        return res.status(500).json({
            error: e
        });
    }
    
}


module.exports = { getEstados, getEstadoById, createEstado, updateEstadoById, deleteEstado, getEstadosActive };