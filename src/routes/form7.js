const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');
const Form7 = require('../model/form7');

router.get('/forms/pdf-form7/:id', isAuthenticated, async function(request, response){
	const form7s7 = await Form7.findById(request.params.id);
	response.render('forms/pdf-form7',{form7s7});
});


router.get('/forms/form7', function(request, response){
	response.render('forms/form7');
});

router.post('/forms/form7', async function(request, response){
	//request.body contiene los datos enviados desde el servidor.

	//obtenemos los datos en constantes
	const {nombre, cantidad, monto, solicitud, fotoa, fotod} = request.body;
	const errores = [];

	if (!nombre){
		errores.push({text: 'Por favor inserta el nombre'});
	}
	if (!cantidad){
		errores.push({text: 'Por favor inserta la cantidad'});
	}
	if (!monto){
		errores.push({text: 'Por favor inserta el monto'});
	}
 
 if (!solicitud){
		errores.push({text: 'Por favor inserta la solicitud'});
	}
	if (!fotoa){
		errores.push({text: 'Por favor inserta la foto 1'});
	}
	if (!fotod){
		errores.push({text: 'Por favor inserta la foto 2'});
	}

 
 
	if (errores.length > 0){
		response.render('notes/nueva-nota', {
			errores,
			nombre, cantidad, monto, solicitud, fotoa, fotod
		});
	} else{
		var data = {
			title: req.body.title,
			creator: res.locals.user._id
		}
		 var imagen = new Imagen(data);
		 imagen.save(function(err){
		 	if(!err) {
		 		res.redirect("/forms/form7"+imagen._id)
		 	}
		 	else {
		 		console.log(imagen);
		 		res.render(err);
		 	}
		 });
	}
});


module.exports = router;