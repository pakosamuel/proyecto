const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');
const Form17 = require('../model/form17');

router.get('/forms/pdf-form17/:id', isAuthenticated, async function(request, response){
	const form17s17 = await Form17.findById(request.params.id);
	response.render('forms/pdf-form17',{form17s17});
});


//eliminar
router.get('/forms/delete17/:id', isAuthenticated, async function (request, response){
	await Form17.findByIdAndDelete(request.params.id);
	request.flash('success_msg', 'se elimino correctamente');
	response.redirect('/consulta17');
});

router.get('/forms/editar-form17/:id', isAuthenticated, async function(request, response){
	const form17s = await Form17.findById(request.params.id);
	response.render('forms/editar-form17',{form17s});
});

router.put('/forms/editar-form17/:id', isAuthenticated, async function(request, response) {
		const {oficio, oficina, asunto, referencia, lugar, fecha, presentador, ct, nombre_es, 
		municipio, localidad, tipo, nombre_firma} = request.body;
		await Form17.findByIdAndUpdate(request.params.id, {oficio, oficina, asunto, referencia, lugar, fecha, presentador, ct, nombre_es, 
		municipio, localidad, tipo, nombre_firma});
		request.flash('success_msg', 'se actualizo correctamente');
		response.redirect('/consulta17');
});

//select y agregar
router.get('/consulta17', isAuthenticated, async function(request, response){
	const form17 = await Form17.find({user: request.user.id}).sort({fechacreacion:'desc'});
	response.render("forms/consulta17",{form17});
});

router.get('/forms/form17', isAuthenticated, function(request, response){
	response.render('forms/form17');
});


router.post('/forms/form17',isAuthenticated, async function(request, response){
	//request.body contiene los datos enviados desde el servidor.

	//obtenemos los datos en constantes
	const {oficio, oficina, asunto, referencia, lugar, fecha, presentador, ct, nombre_es, 
		municipio, localidad, tipo, nombre_firma} = request.body;
	const errores = [];

	if (!oficio){
		errores.push({text: 'Por favor inserta el oficio'});
	}
	if (!oficina){
		errores.push({text: 'Por favor inserta la oficina'});
	}
	if (!asunto){
		errores.push({text: 'Por favor inserta el asunto'});
	}
 
 if (!referencia){
		errores.push({text: 'Por favor inserta la referencia'});
	}
	if (!lugar){
		errores.push({text: 'Por favor inserta el lugar'});
	}
	if (!fecha){
		errores.push({text: 'Por favor inserta la fecha'});
	}
	if (!presentador){
		errores.push({text: 'Por favor inserta a quien va dirigido'});
	}
 if (!ct){
		errores.push({text: 'Por favor inserta el cct'});
	} 
 if (!nombre_es){
		errores.push({text: 'Por favor inserta el nombre de la escuela'});
	} 
 
 if (!municipio){
		errores.push({text: 'Por favor inserta el municipio'});
	} 
 
 if (!localidad){
		errores.push({text: 'Por favor inserta la localidad'});
	} 
	if (!tipo){
		errores.push({text: 'Por favor inserta el tipo'});
	} 
 if (!nombre_firma){
		errores.push({text: 'Por favor inserta el nombre de quien firma'});
	} 
 
 
 
	if (errores.length > 0){
		response.render('forms/form17', {
			errores,
			oficio, oficina, asunto, referencia, lugar, fecha, presentador, ct, nombre_es, 
			municipio, localidad, tipo, nombre_firma

		});
	} else{
		const nuevoForm17 = new Form17({oficio, oficina, asunto, referencia, lugar, fecha, presentador, ct, nombre_es, municipio, localidad, tipo, nombre_firma});
		nuevoForm17.user = request.user.id;
		console.log(nuevoForm17);
		await nuevoForm17.saveWithAudit(request.user._id);
		//await nuevoForm17.save();
		response.redirect('/consulta17');
	}
});

module.exports = router;