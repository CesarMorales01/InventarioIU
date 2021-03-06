const { Schema, model } = require('mongoose');

const TipoEquipoSchema = Schema({
    name: {
        type: String,
        required: [true, 'Debe colocar un nombre']
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: false
    }
});

module.exports = model('TipoEquipo', TipoEquipoSchema);