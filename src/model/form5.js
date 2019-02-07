const mongoose = require('mongoose');
const { Schema } = mongoose;
const Audita = require('./Audit');
const Form5Schema = new Schema ({

 	escuela: {
		type: String,
		required: true
	},
			cct: {
		type: String,
		required: true
	},
	domicilio: {
		type: String,
		required: true
	},
		localidad: {
		type: String,
		required: true
	},
		user:{
		type:String,
	},
		escuela: {
		type: String,
		required: true
	},
	fecha:{
		type: String
		
	},

		municipio: {
		type: String,
		required: true
	},
	
	fechacreacion:{
		type: Date,
		default: Date.now
	}
});
Form5Schema.methods.saveWithAudit = async function (usuario) {
    this.save();
    const nuevoAudit = new Audita();
    nuevoAudit.tabla = 'Operaciones';
    nuevoAudit.registro = JSON.stringify(this);
    nuevoAudit.operacion = 'ADD';
    nuevoAudit.usuario = usuario;
    return await nuevoAudit.save();
};

module.exports = mongoose.model('formulario5', Form5Schema);