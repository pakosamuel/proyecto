const mongoose = require('mongoose');
const { Schema } = mongoose;

const AuditSchema = new Schema ({
	tabla: {
		type: String,
		required: true
	},
	operacion: {
		type: String,
		required: true
	},
	registro: {
		type: String,
		required: true
	},
	usuario: {
		type: String
	},
	fecha: {
		type: Date,
		default: Date.now
	}
});



module.exports = mongoose.model('Audit', AuditSchema);

