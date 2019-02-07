const mongoose = require('mongoose');
const { Schema } = mongoose;
const Audita = require('./Audit');

const Form1Schema = new Schema ({
	oficio: {
		type: String,
		required: true
	},
	oficina: {
		type: String,
		required: true
	},
		asunto: {
		type: String,
		required: true
	},
		Referencias: {
		type: String,
		required: true
	},
		Lugar: {
		type: String,
		required: true
	},
	fecha: {
		type: String,
		required: true
	},
		dirigido: {
		type: String,
		required: true
	},
		firmador: {
		type: String,
		required: true
	},

	fechacreacion:{
		type: Date,
		default: Date.now
	},
	user:{
		type:String,
	}
});

Form1Schema.methods.saveWithAudit = async function (usuario) {
    this.save();
    const nuevoAudit = new Audita();
    nuevoAudit.tabla = 'Operaciones';
    nuevoAudit.registro = JSON.stringify(this);
    nuevoAudit.operacion = 'ADD';
    nuevoAudit.usuario = usuario;
    return await nuevoAudit.save();
};

module.exports = mongoose.model('formulario1', Form1Schema);