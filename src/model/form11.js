const mongoose = require('mongoose');
const { Schema } = mongoose;
const Audita = require('./Audit');
const Form11Schema = new Schema ({
  	
	fecha: {
		type: String,
		required: true
	},
 	nombre: {
		type: String,
		required: true
	},
	user:{
		type:String,
	},
	cct: {
		type: String,
		required: true
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
	
		egreso: {
		type: String,
		required: true
	},
		caja: {
		type: String,
		required: true
	},
	
			observaciones: {
		type: String,
		required: true
	},
			nombref: {
		type: String,
		required: true
	},
	
	fechacreacion:{
		type: Date,
		default: Date.now
	}
});
Form11Schema.methods.saveWithAudit = async function (usuario) {
    this.save();
    const nuevoAudit = new Audita();
    nuevoAudit.tabla = 'Operaciones';
    nuevoAudit.registro = JSON.stringify(this);
    nuevoAudit.operacion = 'ADD';
    nuevoAudit.usuario = usuario;
    return await nuevoAudit.save();
};


module.exports = mongoose.model('formulario11', Form11Schema);