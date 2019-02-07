const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');
const Form10 = require('../model/form10');

//formulario10

router.get('/forms/pdf-form10/:id', isAuthenticated, async function(request, response){
	const form10s10 = await Form10.findById(request.params.id);
	response.render('forms/pdf-form10',{form10s10});
});

//eliminar 
router.get('/forms/delete10/:id', isAuthenticated, async function (request, response){
	await Form10.findByIdAndDelete(request.params.id);
	request.flash('success_msg', 'se elimino correctamente');
	response.redirect('/consulta10/');
});

//eliminar 
router.get('/forms/editar-form10/:id', isAuthenticated, async function(request, response){
	const form10s = await Form10.findById(request.params.id);
	response.render('forms/editar-form10',{form10s});
});

router.put('/forms/editar-form10/:id', isAuthenticated, async function(request, response) {
		const {zona, semana, fecha, actividad, lugar, firma1, firma2} = request.body;
		await Form10.findByIdAndUpdate(request.params.id, {zona, semana, fecha, actividad, lugar, firma1, firma2});
		request.flash('success_msg', 'se actualizo correctamente');
		response.redirect('/consulta10');
})
//select y agregar
router.get('/consulta10', isAuthenticated, async function(request, response){
	const form10 = await Form10.find({user: request.user.id}).sort({fechacreacion:'desc'});
	response.render("forms/consulta10",{form10});
});
router.get('/forms/form10', isAuthenticated, function(request, response){
	response.render('forms/form10');
});


router.post('/forms/form10', isAuthenticated, async function(request, response){
	//request.body contiene los datos enviados desde el servidor.

	//obtenemos los datos en constantes
	const {zona, semana, fecha, actividad, lugar, firmauno, firmados} = request.body;
	const errores = [];

	if (!zona){
		errores.push({text: 'Por favor inserta la zona'});
	}
	if (!semana){
		errores.push({text: 'Por favor inserta la semana'});
	}
	if (!fecha){
		errores.push({text: 'Por favor inserta la fecha'});
	}
 
 if (!actividad){
		errores.push({text: 'Por favor inserta la actividad'});
	}
	if (!lugar){
		errores.push({text: 'Por favor inserta el lugar'});
	}
	if (!firmauno){
		errores.push({text: 'Por favor inserta la firma 1'});
	}
	if (!firmados){
		errores.push({text: 'Por favor inserta la firma 2'});
	}
 
 
 
	if (errores.length > 0){
		response.render('forms/form10', {
			errores,
			zona, semana, fecha, actividad, lugar, firmauno, firmados

		});
	} else{
		const nuevoForm10 = new Form10({zona, semana, fecha, actividad, lugar, firmauno, firmados});
		nuevoForm10.user = request.user.id;
		console.log(nuevoForm10);
		await nuevoForm10.saveWithAudit(request.user._id);
		//await nuevoForm10.save();
		response.redirect('/consulta10');
	}
});


module.exports = router;