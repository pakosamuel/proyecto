const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');
const Form19 = require('../model/form19');

//PDF
router.get('/forms/pdf-form19/:id', isAuthenticated, async function(request, response){
	const form19s19 = await Form19.findById(request.params.id);
	response.render('forms/pdf-form19',{form19s19});
});


//eliminar
router.get('/forms/delete19/:id', isAuthenticated, async function (request, response){
	await Form19.findByIdAndDelete(request.params.id);
	request.flash('success_msg', 'se elimino correctamente');
	response.redirect('/consulta19');
});

router.get('/forms/editar-form19/:id', isAuthenticated, async function(request, response){
	const form19s = await Form19.findById(request.params.id);
	response.render('forms/editar-form19',{form19s});
});

router.put('/forms/editar-form19/:id', isAuthenticated, async function(request, response) {
		const {nombre, cct, zona, asunto, representa, saldo, saldon, modificacion, firma1, firma2, firma3, firma4} = request.body;
		await Form19.findByIdAndUpdate(request.params.id,{nombre, cct, zona, asunto, representa, saldo, saldon, modificacion, firma1, firma2, firma3, firma4});
		request.flash('success_msg', 'se actualizo correctamente');
		response.redirect('/consulta19');
});

//select y agregar
router.get('/consulta19', isAuthenticated, async function(request, response){
	const form19 = await Form19.find({user: request.user.id}).sort({fechacreacion:'desc'});
	response.render("forms/consulta19",{form19});
});

router.get('/forms/form19', isAuthenticated, function(request, response){
	response.render('forms/form19');
});


router.post('/forms/form19', isAuthenticated,async function(request, response){
	//request.body contiene los datos enviados desde el servidor.

	//obtenemos los datos en constantes
	const {nombre, cct, zona, asunto, representa, saldo, saldon, modificacion, firma1, firma2, firma3, firma4} = request.body;
	const errores = [];

	if (!nombre){
		errores.push({text: 'Por favor inserta el nombre'});
	}
	if (!cct){
		errores.push({text: 'Por favor inserta el cct'});
	}
	if (!zona){
		errores.push({text: 'Por favor inserta la zona'});
	}
 
 if (!asunto){
		errores.push({text: 'Por favor inserta el asunto'});
	}
	if (!representa){
		errores.push({text: 'Por favor inserta quien representa'});
	}
	if (!saldo){
		errores.push({text: 'Por favor inserta el saldo'});
	}
	if (!saldon){
		errores.push({text: 'Por favor inserta el saldo con nombre'});
	}
 if (!modificacion){
		errores.push({text: 'Por favor inserta la modificacion'});
	} 
 if (!firma1){
		errores.push({text: 'Por favor inserta quien firma'});
	} 
 if (!firma2){
		errores.push({text: 'Por favor inserta quien firma'});
	} 
 if (!firma3){
		errores.push({text: 'Por favor inserta quien firma'});
	} 
 if (!firma4){
		errores.push({text: 'Por favor inserta quien firma'});
	} 
 
 
	if (errores.length > 0){
		response.render('forms/form19', {
			errores,
		nombre, cct, zona, asunto, representa, saldo, saldon, modificacion, firma1, firma2, firma3, firma4

		});
	} else{
		const nuevoForm19 = new Form19({nombre, cct, zona, asunto, representa, saldo, saldon, modificacion, firma1, firma2, firma3, firma4});
		nuevoForm19.user = request.user.id;
		console.log(nuevoForm19);
		await nuevoForm19.saveWithAudit(request.user._id);
		//await nuevoForm19.save();

		response.redirect('/consulta19');
	}
});
module.exports = router;