const mongoose = require('mongoose');
const { Schema } = mongoose;
const Audita = require('./Audit');
const Form16Schema = new Schema ({

	
	fecha: {
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
	nombre: {
		type: String,
		required: true
	},
		actividad: {
		type: String,
		required: true
	},
	
	fechacreacion:{
		type: Date,
		default: Date.now
	}
});
Form16Schema.methods.saveWithAudit = async function (usuario) {
    this.save();
    const nuevoAudit = new Audita();
    nuevoAudit.tabla = 'Operaciones';
    nuevoAudit.registro = JSON.stringify(this);
    nuevoAudit.operacion = 'ADD';
    nuevoAudit.usuario = usuario;
    return await nuevoAudit.save();
};


module.exports = mongoose.model('formulario16', Form16Schema);