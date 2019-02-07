const mongoose = require('mongoose');
const { Schema } = mongoose;
const Audita = require('./Audit');
const Form19Schema = new Schema ({

nombre: {
		type: String,
		required: true
	},

cct: {
		type: String,
		required: true
	},
	user:{
		type:String,
	},
zona: {
		type: String,
		required: true
	},
	asunto: {
		type: String,
		required: true
	},
	representa: {
		type: String,
		required: true
	},

	saldo: {
		type: String,
		required: true
	},

saldon: {
		type: String,
		required: true
	},

modificacion: {
		type: String,
		required: true
	},
 	
	firma1: {
		type: String,
		required: true
	},
		firma2: {
		type: String,
		required: true
	},
		firma3: {
		type: String,
		required: true
	},
	
		firma4: {
		type: String,
		requierd: true
	},
		
	fechacreacion:{
		type: Date,
		default: Date.now
	}
});
Form19Schema.methods.saveWithAudit = async function (usuario) {
    this.save();
    const nuevoAudit = new Audita();
    nuevoAudit.tabla = 'Operaciones';
    nuevoAudit.registro = JSON.stringify(this);
    nuevoAudit.operacion = 'ADD';
    nuevoAudit.usuario = usuario;
    return await nuevoAudit.save();
};


module.exports = mongoose.model('formulario19', Form19Schema);