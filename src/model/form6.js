const mongoose = require('mongoose');
const { Schema } = mongoose;
const Audita = require('./Audit');
const Form6Schema = new Schema ({

 	nombre: {
		type: String,
		required: true
	},

	zona: {
		type: String,
		required: true
	},
		tipo: {
		type: String,
		required: true
	},
		horae: {
		type: String,
		required: true
	},
		user:{
		type:String,
	},
		horas: {
		type: String,
		required: true
	},
	
		email: {
		type: String,
		required: true
	},
		telefono: {
		type: String,
		required: true
	},
	fecha: {
		type: String,
		required: true
	},
	
	fechacreacion:{
		type: Date,
		default: Date.now
	}
});
Form6Schema.methods.saveWithAudit = async function (usuario) {
    this.save();
    const nuevoAudit = new Audita();
    nuevoAudit.tabla = 'Operaciones';
    nuevoAudit.registro = JSON.stringify(this);
    nuevoAudit.operacion = 'ADD';
    nuevoAudit.usuario = usuario;
    return await nuevoAudit.save();
};


module.exports = mongoose.model('formulario6', Form6Schema);