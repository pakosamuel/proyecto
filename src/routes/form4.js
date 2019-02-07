const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');
const Form4 = require('../model/form4');


//formulario 4
//PDF
router.get('/forms/pdf-form4/:id', isAuthenticated, async function(request, response){
	const form4s4 = await Form4.findById(request.params.id);
	response.render('forms/pdf-form4',{form4s4});
});

//eliminar
router.get('/forms/delete4/:id', isAuthenticated, async function (request, response){
	await Form4.findByIdAndDelete(request.params.id);
	request.flash('success_msg', 'se elimino correctamente');
	response.redirect('/consulta4');
});

router.get('/forms/editar-form4/:id', isAuthenticated, async function(request, response){
	const form4s = await Form4.findById(request.params.id);
	response.render('forms/editar-form4',{form4s});
});

router.put('/forms/editar-form4/:id', isAuthenticated, async function(request, response) {
		const {dirigido, fecha, dia, actividad, lugar, localidad, observaciones, firma} = request.body;
		await Form4.findByIdAndUpdate(request.params.id, {dirigido, fecha, dia, actividad, lugar, localidad, observaciones, firma} );
		request.flash('success_msg', 'se actualizo correctamente');
		response.redirect('/consulta');
});

router.get('/consulta4', isAuthenticated, async function(request, response){
	const form4 = await Form4.find({user: request.user.id}).sort({fechacreacion:'desc'});
	response.render("forms/consulta4",{form4});
});

router.get('/forms/form4', isAuthenticated, function(request, response){
	response.render('forms/form4');
});

router.post('/forms/form4',isAuthenticated, async function(request, response){
	//request.body contiene los datos enviados desde el servidor.

	//obtenemos los datos en constantes
	const {dirigido,cct, fecha, dia, actividad, lugar, localidad, observaciones, firma} = request.body;
	const errores = [];

	if (!dirigido){
		errores.push({text: 'Por favor inserta a quien va dirigid'});
	}
	if (!cct) {
		errores.push({text:'por favor inserta el CCT'})
	}
	if (!fecha){
		errores.push({text: 'Por favor inserta la fecha'});
	}
	if (!dia){
		errores.push({text: 'Por favor inserta el dia'});
	}
 
 if (!actividad){
		errores.push({text: 'Por favor inserta la actividad'});
	}
	if (!lugar){
		errores.push({text: 'Por favor inserta el lugar'});
	}
	if (!localidad){
		errores.push({text: 'Por favor inserta la localidad'});
	}
	
 if (!firma){
		errores.push({text: 'Por favor inserta quien firma'});
	} 
 
 
	if (errores.length > 0){
		response.render('forms/form4', {
			errores,
		dirigido,cct, fecha, dia, actividad, lugar, localidad, observaciones, firma

		});
	} else{
		const nuevoForm4 = new Form4({dirigido,cct, fecha, dia, actividad, lugar, localidad, observaciones, firma});
		nuevoForm4.user = request.user.id;
		console.log(nuevoForm4);
		await nuevoForm4.saveWithAudit(request.user._id);
		//await nuevoForm4.save();
		response.redirect('/consulta4');
	}
});

module.exports = router;