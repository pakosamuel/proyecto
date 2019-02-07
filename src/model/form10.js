const mongoose = require('mongoose');
const { Schema } = mongoose;
const Audita = require('./Audit');
const Form10Schema = new Schema ({
 	zona: {
		type: String,
		required: true
	},
		user:{
		type:String,
	},

	semana: {
		type: String,
		required: true
	},
		fecha: {
		type: String,
		required: true
	},
		actividad: {
		type: String,
		required: true
	},
	
		lugar: {
		type: String,
		required: true
	},
	
		firmauno: {
		type: String,
		required: true
	},
		firmados: {
		type: String,
		required: true
	},
	
	
	fechacreacion:{
		type: Date,
		default: Date.now
	}
});

Form10Schema.methods.saveWithAudit = async function (usuario) {
    this.save();
    const nuevoAudit = new Audita();
    nuevoAudit.tabla = 'Operaciones';
    nuevoAudit.registro = JSON.stringify(this);
    nuevoAudit.operacion = 'ADD';
    nuevoAudit.usuario = usuario;
    return await nuevoAudit.save();
};


module.exports = mongoose.model('formulario10', Form10Schema);