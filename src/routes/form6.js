const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');
const Form6 = require('../model/form6');
//eliminar 
router.get('/forms/pdf-form6/:id', isAuthenticated, async function(request, response){
	const form6s6 = await Form6.findById(request.params.id);
	response.render('forms/pdf-form6',{form6s6});
});


router.get('/forms/delete6/:id', isAuthenticated, async function (request, response){
	await Form6.findByIdAndDelete(request.params.id);
	request.flash('success_msg', 'se elimino correctamente');
	response.redirect('/consulta6/');
});

//eliminar 
router.get('/forms/editar-form6/:id', isAuthenticated, async function(request, response){
	const form6s = await Form6.findById(request.params.id);
	response.render('forms/editar-form6',{form6s});
});

router.put('/forms/editar-form6/:id', isAuthenticated, async function(request, response) {
		const {nombre, zona, tipo, horae, horas, email, telefono} = request.body;
		await Form6.findByIdAndUpdate(request.params.id, {nombre, zona, tipo, horae, horas, email, telefono});
		request.flash('success_msg', 'se actualizo correctamente');
		response.redirect('/consulta6');
})
//select y agregar
router.get('/consulta6', isAuthenticated, async function(request, response){
	const form6 = await Form6.find({user: request.user.id}).sort({fechacreacion:'desc'});
	response.render("forms/consulta6",{form6});
});
router.get('/forms/form6', isAuthenticated, function(request, response){
	response.render('forms/form6');
});

router.post('/forms/form6', isAuthenticated, async function(request, response){
	//request.body contiene los datos enviados desde el servidor.

	//obtenemos los datos en constantes
	const {nombre, zona, tipo, horae, horas, email, telefono, fecha} = request.body;
	const errores = [];

	if (!nombre){
		errores.push({text: 'Por favor inserta el nombre'});
	}
	if (!zona){
		errores.push({text: 'Por favor inserta la zona'});
	}
	if (!tipo){
		errores.push({text: 'Por favor inserta el tipo'});
	}
 
 if (!horae){
		errores.push({text: 'Por favor inserta la hora de entrada'});
	}
	if (!horas){
		errores.push({text: 'Por favor inserta la hora de salida'});
	}
	
	if (!telefono){
		errores.push({text: 'Por favor inserta el telefono'});
	}

	if (!fecha) {
		errores.push({text: 'por favor inserta la fecha'});
	}

 
 
	if (errores.length > 0){
		response.render('forms/form6', {
			errores,
			nombre, zona, tipo, horae, horas, email, telefono, fecha

		});
	} else{
		const nuevoForm6 = new Form6({nombre, zona, tipo, horae, horas, email, telefono, fecha});
		nuevoForm6.user = request.user.id;
		console.log(nuevoForm6);
		await nuevoForm6.saveWithAudit(request.user._id);
		//await nuevoForm6.save();
		response.redirect('/consulta6');
	}
});
module.exports = router;