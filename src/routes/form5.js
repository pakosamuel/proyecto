const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');
const Form5 = require('../model/form5');

//formulario numero cnco 

router.get('/forms/pdf-form5/:id', isAuthenticated, async function(request, response){
	const form5s5 = await Form5.findById(request.params.id);
	response.render('forms/pdf-form5',{form5s5});
});

//select y agregar
router.get('/forms/delete5/:id', isAuthenticated, async function (request, response){
	await Form5.findByIdAndDelete(request.params.id);
	request.flash('success_msg', 'Documento eliminado correctamente');
	response.redirect('/consulta5/');
});

//eliminar 
router.get('/forms/editar-form5/:id', isAuthenticated, async function(request, response){
	const form5s = await Form5.findById(request.params.id);
	response.render('forms/editar-form5',{form5s});
});

router.put('/forms/editar-form5/:id', isAuthenticated, async function(request, response) {
		const {escuela, cct, domicilio, localidad, fecha, municipio} = request.body;
		await Form5.findByIdAndUpdate(request.params.id,{escuela, cct, domicilio, localidad, fecha, municipio} );
		request.flash('success_msg', 'se actualizo correctamente');
		response.redirect('/consulta5');
})
//select y agregar
router.get('/consulta5', isAuthenticated, async function(request, response){
	const form5 = await Form5.find({user: request.user.id}).sort({fechacreacion:'desc'});
	response.render("forms/consulta5",{form5});
});
router.get('/forms/form5', isAuthenticated, function(request, response){
	response.render('forms/form5');
});


router.post('/forms/form5', isAuthenticated, async function(request, response){
	//request.body contiene los datos enviados desde el servidor.

	//obtenemos los datos en constantes
	const {escuela, cct, domicilio, localidad, fecha, municipio} = request.body;
	const errores = [];

	if (!escuela){
		errores.push({text: 'Por favor inserta la escuela'});
	}
	if (!cct){
		errores.push({text: 'Por favor inserta el cct'});
	}
	if (!domicilio){
		errores.push({text: 'Por favor inserta el domicilio'});
	}
 
 if (!localidad){
		errores.push({text: 'Por favor inserta la localidad'});
	}
	if (!fecha){
		errores.push({text: 'Por favor inserta la fecha'});
	}
	if (!municipio){
		errores.push({text: 'Por favor inserta el municipio'});
	}
	 
	if (errores.length > 0){
		response.render('forms/form5', {
			errores,
			escuela, cct, domicilio, localidad, fecha, municipio

		});
	} else{
		const nuevoForm5 = new Form5({escuela, cct, domicilio, localidad, fecha, municipio});
		nuevoForm5.user = request.user.id;
		console.log(nuevoForm5);
		await nuevoForm5.saveWithAudit(request.user._id);
		//await nuevoForm5.save();
		response.redirect('/consulta5');
	}
});

module.exports = router;