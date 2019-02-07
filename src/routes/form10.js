const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');
const Form16 = require('../model/form16');
//formulario16

router.get('/forms/pdf-form16/:id', isAuthenticated, async function(request, response){
	const form16s16 = await Form16.findById(request.params.id);
	response.render('forms/pdf-form16',{form16s16});
});


//eliminar
router.get('/forms/delete16/:id', isAuthenticated, async function (request, response){
	await Form16.findByIdAndDelete(request.params.id);
	request.flash('success_msg', 'se elimino correctamente');
	response.redirect('/consulta16');
});

router.get('/forms/editar-form16/:id', isAuthenticated, async function(request, response){
	const form16s = await Form16.findById(request.params.id);
	response.render('forms/editar-form16',{form16s});
});

router.put('/forms/editar-form16/:id', isAuthenticated, async function(request, response) {
		const {fecha, asunto, nombre, actividad} = request.body;
		await Form16.findByIdAndUpdate(request.params.id,{fecha, asunto, nombre, actividad} );
		request.flash('success_msg', 'se actualizo correctamente');
		response.redirect('/consulta16');
});

//select y agregar
router.get('/consulta16', isAuthenticated, async function(request, response){
	const form16 = await Form16.find({user: request.user.id}).sort({fechacreacion:'desc'});
	response.render("forms/consulta16",{form16});
});

router.get('/forms/form16', isAuthenticated, function(request, response){
	response.render('forms/form16');
});





router.post('/forms/form16',isAuthenticated, async function(request, response){
	//request.body contiene los datos enviados desde el servidor.

	//obtenemos los datos en constantes
	const {fecha, asunto, nombre, actividad} = request.body;
	const errores = [];

	if (!fecha){
		errores.push({text: 'Por favor inserta la fecha'});
	}
	if (!asunto){
		errores.push({text: 'Por favor inserta el asunto'});
	}
	if (!nombre){
		errores.push({text: 'Por favor inserta el nombre'});
	}
 
 if (!actividad){
		errores.push({text: 'Por favor inserta la actividad'});
	}
  
	if (errores.length > 0){
		response.render('forms/form16', {
			errores,
		fecha, asunto, nombre, actividad

		});
	} else{
		const nuevoForm16 = new Form16({fecha, asunto, nombre, actividad});
		nuevoForm16.user = request.user.id;
		console.log(nuevoForm16);
		await nuevoForm16.saveWithAudit(request.user._id);
		//await nuevoForm16.save();
		response.redirect('/consulta16');
	}
});

module.exports = router;