const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');
const Form3 = require('../model/form3');

//formulario tres
router.get('/forms/pdf-form3/:id', isAuthenticated, async function(request, response){
	const form3s3 = await Form3.findById(request.params.id);
	response.render('forms/pdf-form3',{form3s3});
});

//select y agregar
router.get('/forms/delete3/:id', isAuthenticated, async function (request, response){
	await Form3.findByIdAndDelete(request.params.id);
	request.flash('success_msg', 'Documento eliminado correctamente');
	response.redirect('/consulta3/');
});
router.get('/forms/editar-form3/:id', isAuthenticated, async function(request, response){
	const form3s = await Form3.findById(request.params.id);
	response.render('forms/editar-form3',{form3s});
});

router.put('/forms/editar-form3/:id', isAuthenticated, async function(request, response) {
		const {zona, cct, nombre, nombrefirma, saldoca, ingresoca, saldoac, egresos, existencia, observaciones} = request.body;
		await Form3.findByIdAndUpdate(request.params.id,{zona, cct, nombre, nombrefirma, saldoca, ingresoca, saldoac, egresos, existencia, observaciones} );
		request.flash('success_msg', 'se actualizo correctamente');
		response.redirect('/consulta3');
});
router.get('/consulta3', isAuthenticated, async function(request, response){
	const form3 = await Form3.find({user: request.user.id}).sort({fechacreacion:'desc'});
	response.render("forms/consulta3",{form3});
});

router.get('/forms/form3', isAuthenticated, function(request, response){
	response.render('forms/form3');
});

router.post('/forms/form3', isAuthenticated, async function(request, response){
	//request.body contiene los datos enviados desde el servidor.

	//obtenemos los datos en constantes
	const {zona, cct, nombre, nombrefirma, saldoca, ingresoca, saldoac, egresos, existencia, observaciones} = request.body;
	const errores = [];

	if (!zona){
		errores.push({text: 'Por favor inserta la zona'});
	}
	if (!cct){
		errores.push({text: 'Por favor inserta el cct'});
	}
	if (!nombre){
		errores.push({text: 'Por favor inserta el nombre'});
	}
 
 if (!saldoca){
		errores.push({text: 'Por favor inserta el saldo del ciclo anterior'});
	}
	if (!ingresoca){
		errores.push({text: 'Por favor inserta el ingreso ciclo actual'});
	}
	if (!saldoac){
		errores.push({text: 'Por favor inserta el saldo actual'});
	}
	if (!egresos){
		errores.push({text: 'Por favor inserta los egresos'});
	}
 if (!existencia){
		errores.push({text: 'Por favor inserta la existencia del saldo'});
	} 
 
 
	if (errores.length > 0){
		response.render('forms/form3', {
			errores,
			zona, cct, nombre, nombrefirma, saldoca, ingresoca, saldoac, egresos, existencia, observaciones

		});
	} else{
		const nuevoForm3 = new Form3({zona, cct, nombre, nombrefirma, saldoca, ingresoca, saldoac, egresos, existencia, observaciones});
			nuevoForm3.user = request.user.id;
			console.log(nuevoForm3);
			await nuevoForm3.saveWithAudit(request.user._id);
		//await nuevoForm3.save();
		response.redirect('/consulta3');
	}
});

module.exports = router;