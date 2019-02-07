const mongoose = require('mongoose');
const { Schema } = mongoose;
const Audita = require('./Audit');
const Form3Schema = new Schema ({

 	zona: {
		type: String,
		required: true
	},
	cct: {
		type: String,
		required: true
	},
		nombre: {
		type: String,
		required: true
	},
		nombrefirma: {
		type: String,
		required: true
	},
		user:{
		type:String,
	},
		saldoca: {
		type: String,
		required: true
	},
		ingresoca: {
		type: String,
		required: true
	},
		saldoac: {
		type: String,
		required: true
	},
	
		egresos: {
		type: String,
		required: true
	},
		existencia: {
		type: String,
		required: true
	},
		observaciones: {
		type: String,
		required: true
	},

	fechacreacion:{
		type: Date,
		default: Date.now
	}
});
Form3Schema.methods.saveWithAudit = async function (usuario) {
    this.save();
    const nuevoAudit = new Audita();
    nuevoAudit.tabla = 'Operaciones';
    nuevoAudit.registro = JSON.stringify(this);
    nuevoAudit.operacion = 'ADD';
    nuevoAudit.usuario = usuario;
    return await nuevoAudit.save();
};


module.exports = mongoose.model('formulario3', Form3Schema);