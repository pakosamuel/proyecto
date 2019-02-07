const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');
const Form11 = require('../model/form11');

router.get('/forms/pdf-form11/:id', isAuthenticated, async function(request, response){
	const form11s11 = await Form11.findById(request.params.id);
	response.render('forms/pdf-form11',{form11s11});
});


//eliminar
router.get('/forms/delete11/:id', isAuthenticated, async function (request, response){
	await Form11.findByIdAndDelete(request.params.id);
	request.flash('success_msg', 'se elimino correctamente');
	response.redirect('/consulta11');
});

router.get('/forms/editar-form11/:id', isAuthenticated, async function(request, response){
	const form11s = await Form11.findById(request.params.id);
	response.render('forms/editar-form11',{form11s});
});

router.put('/forms/editar-form11/:id', isAuthenticated, async function(request, response) {
		const {fecha, nombre,cct, saldoca, ingresoca, saldoac, egreso, caja, observaciones, nombref} = request.body;
		await Form11.findByIdAndUpdate(request.params.id,{fecha, nombre,cct, saldoca, ingresoca, saldoac, egreso, caja, observaciones, nombref} );
		request.flash('success_msg', 'se actualizo correctamente');
		response.redirect('/consulta11');
});

//select y agregar
router.get('/consulta11', isAuthenticated, async function(request, response){
	const form11 = await Form11.find({user: request.user.id}).sort({fechacreacion:'desc'});
	response.render("forms/consulta11",{form11});
});

router.get('/forms/form11', isAuthenticated, function(request, response){
	response.render('forms/form11');
});





router.post('/forms/form11',isAuthenticated, async function(request, response){
	//request.body contiene los datos enviados desde el servidor.

	//obtenemos los datos en constantes
	const {fecha, nombre,cct, saldoca, ingresoca, saldoac, egreso, caja, observaciones, nombref} = request.body;
	const errores = [];

	if (!fecha){
		errores.push({text: 'Por favor inserta la fecha'});
	}
	if (!nombre){
		errores.push({text: 'Por favor inserta el nombre'});
	}
	if (!cct){
		errores.push({text: 'Por favor inserta el cct'});
	}
 
 if (!saldoca){
		errores.push({text: 'Por favor inserta el saldo del ciclo anterior'});
	}
	if (!ingresoca){
		errores.push({text: 'Por favor inserta los ingresos ciclo anterior'});
	}
	if (!saldoac){
		errores.push({text: 'Por favor inserta el saldo actual'});
	}
	if (!egreso){
		errores.push({text: 'Por favor inserta el egreso'});
	}
 if (!caja){
		errores.push({text: 'Por favor inserta la caja'});
	} 
	 if (!nombref){
		errores.push({text: 'Por favor inserta quien firma'});
	} 
 
 
 
	if (errores.length > 0){
		response.render('forms/form11', {
			errores,
			fecha, nombre,cct, saldoca, ingresoca, saldoac, egreso, caja, observaciones, nombref

		});
	} else{
		const nuevoForm11 = new Form11({fecha, nombre,cct, saldoca, ingresoca, saldoac, egreso, caja, observaciones, nombref});
		nuevoForm11.user = request.user.id;
		console.log(nuevoForm11);
		await nuevoForm11.saveWithAudit(request.user._id);
		//await nuevoForm11.save();
		response.redirect('/consulta11');
	}
});
module.exports = router;