const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../helpers/auth');
const Form2 = require('../model/form2');

//formulario dos
//select y agregar

router.get('/forms/pdf-form2/:id', isAuthenticated, async function(request, response){
	const form2s2 = await Form2.findById(request.params.id);
	response.render('forms/pdf-form2',{form2s2});
});

router.get('/forms/consulta-form2/', isAuthenticated, async function(request, response){
	const form2s2 = await Form2.findById(request.params.id);
	response.render('forms/consulta-form2');
});

//eliminar
router.get('/forms/delete2/:id', isAuthenticated, async function (request, response){
	await Form2.findByIdAndDelete(request.params.id);
	request.flash('success_msg', 'se elimino correctamente');
	response.redirect('/consulta2');
});

router.get('/forms/editar-form2/:id', isAuthenticated, async function(request, response){
	const form2s = await Form2.findById(request.params.id);
	response.render('forms/editar-form2',{form2s});
});

router.put('/forms/editar-form2/:id', isAuthenticated, async function(request, response) {
		const {nombre, zona, nosala, asunto, fecha, hora, cantidad} = request.body;
		await Form2.findByIdAndUpdate(request.params.id, {nombre, zona, nosala, asunto, fecha, hora, cantidad} );
		request.flash('success_msg', 'se actualizo correctamente');
		response.redirect('/consulta2');
});

//select y agregar
router.get('/consulta2', isAuthenticated, async function(request, response){
	const form2 = await Form2.find({user: request.user.id}).sort({fechacreacion:'desc'});
	response.render("forms/consulta2",{form2});
});

router.get('/forms/form2', isAuthenticated, function(request, response){
	response.render('forms/form2');
});

router.get('/forms/consulta-form2', function(request, response) {
response.render('forms/consulta-form2');
});


router.post('/forms/form2', isAuthenticated, async function(request, response){
	//request.body contiene los datos enviados desde el servidor.
	//obtenemos los datos en constantes
	const {nombre, zona, nosala, asunto, fecha, hora, cantidad} = request.body;
	const errores = [];
	if (!nombre){
		errores.push({text: 'Por favor inserta el nombre'});
	}
	if (!zona){
		errores.push({text: 'Por favor inserta la zona'});
	}
	if (!nosala){
		errores.push({text: 'Por favor inserta el numero de sala'});
	}
 
 if (!asunto){
		errores.push({text: 'Por favor inserta el asunto'});
	}
	if (!fecha){
		errores.push({text: 'Por favor inserta la fecha'});
	}
	if (!hora){
		errores.push({text: 'Por favor inserta la hora'});
	}
	if (!cantidad){
		errores.push({text: 'Por favor inserta la cantidad'});
	}
 
	if (errores.length > 0){
		response.render('forms/form2', {
			errores,
			nombre, zona, nosala, asunto, fecha, hora, cantidad

		});
	} else{
		const nuevoForm2 = new Form2({nombre, zona, nosala, asunto, fecha, hora, cantidad});
		nuevoForm2.user = request.user.id;
		console.log(nuevoForm2);
		await nuevoForm2.saveWithAudit(request.user._id);
		//await nuevoForm2.save();
		request.flash('success_msg', 'se agrego correctamente');
		response.redirect('/consulta2');
	
	}
});
module.exports = router;