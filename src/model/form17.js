const mongoose = require('mongoose');
const { Schema } = mongoose;
const Audita = require('./Audit');
const Form17Schema = new Schema ({
  	
	
oficio: {
		type: String,
		required: true
	},

oficina: {
		type: String,
		required: true
	},
	user:{
		type:String,
	},

asunto: {
		type: String,
		required: true
	},
	referencia: {
		type: String,
		required: true
	},
	lugar: {
		type: String,
		required: true
	},



	fecha: {
		type: String,
		required: true
	},
 	
	presentador: {
		type: String,
		required: true
	},
		ct: {
		type: String,
		required: true
	},
		nombre_es: {
		type: String,
		required: true
	},
	
		municipio: {
		type: String,
		requierd: true
	},
	
		localidad: {
		type: String,
		requierd: true
	},
		tipo: {
		type: String,
		requierd: true
	},
	
			nombre_firma: {
		type: String,
		requierd: true
	},
		
	fechacreacion:{
		type: Date,
		default: Date.now
	}
});
Form17Schema.methods.saveWithAudit = async function (usuario) {
    this.save();
    const nuevoAudit = new Audita();
    nuevoAudit.tabla = 'Operaciones';
    nuevoAudit.registro = JSON.stringify(this);
    nuevoAudit.operacion = 'ADD';
    nuevoAudit.usuario = usuario;
    return await nuevoAudit.save();
};


module.exports = mongoose.model('formulario17', Form17Schema);