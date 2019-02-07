const mongoose = require('mongoose');
const { Schema } = mongoose;
const Audita = require('./Audit');
const Form2Schema = new Schema ({
	nombre: {
		type: String,
		required: true
	},
	zona: {
		type: String,
		required: true
	},
		nosala: {
		type: String,
		required: true
	},
		asunto: {
		type: String,
		required: true
	},
		user:{
		type:String,
	},
		
	fecha: {
		type: String,
		default: Date.now
	},
		hora: {
		type: String,
		required: true
	},
		cantidad: {
		type: String,
		required: true
	},

	fechacreacion:{
		type: Date,
		default: Date.now
	}
});
Form2Schema.methods.saveWithAudit = async function (usuario) {
    this.save();
    const nuevoAudit = new Audita();
    nuevoAudit.tabla = 'Operaciones';
    nuevoAudit.registro = JSON.stringify(this);
    nuevoAudit.operacion = 'ADD';
    nuevoAudit.usuario = usuario;
    return await nuevoAudit.save();
};

module.exports = mongoose.model('formulario2', Form2Schema);