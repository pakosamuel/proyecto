const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema ({
	nombre: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true 
	},
	
	zona: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

UserSchema.methods.encryptPassword = async function (password){
	//Aplicamos un hash 10 veces
	const salt = await bcrypt.genSalt(10);
	const hash = bcrypt.hash(password,salt);
	return hash;
};

//Toma la contraseña y la compara contra la base de datos
UserSchema.methods.matchPassword = async function (password){
	return await bcrypt.compare(password,this.password);
};

module.exports = mongoose.model ('Usuario', UserSchema);