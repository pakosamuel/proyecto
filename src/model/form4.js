const mongoose = require('mongoose');
const { Schema } = mongoose;
const Audita = require('./Audit');
const Form4Schema = new Schema ({
	
 	dirigido: {
		type: String,
		required: true
	},

	cct:{
		type:String,
		required: true
	},

	fecha:{
		type: String
		
	},
		user:{
		type:String,
	},

	dia: {
		type: String
		
	},
		actividad: {
		type: String,
		required: true
	},
		lugar: {
		type: String,
		required: true
	},
		localidad: {
		type: String,
		required: true
	},
		observaciones: {
		type: String,
		required: true
	},
		firma: {
		type: String,
		required: true
	},
	
	fechacreacion:{
		type: Date,
		default: Date.now
	}
});
Form4Schema.methods.saveWithAudit = async function (usuario) {
    this.save();
    const nuevoAudit = new Audita();
    nuevoAudit.tabla = 'Operaciones';
    nuevoAudit.registro = JSON.stringify(this);
    nuevoAudit.operacion = 'ADD';
    nuevoAudit.usuario = usuario;
    return await nuevoAudit.save();
};


module.exports = mongoose.model('formulario4', Form4Schema);