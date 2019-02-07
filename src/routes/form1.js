const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');
const Form1 = require('../model/form1');
const Form_1 = require('../model/Usuarios');

// para el index
router.get('/formulario', isAuthenticated, async function(request, response){
	response.render("forms/index");
})
//PFD
router.get('/forms/pdf-form1/:id', isAuthenticated, async function(request, response){
	const form1s1 = await Form1.findById(request.params.id);
	response.render('forms/pdf-form1',{form1s1});
});


//eliminar 
router.get('/forms/delete/:id', isAuthenticated, async function (request, response){
	await Form1.findByIdAndDelete(request.params.id);
	request.flash('success_msg', 'Documento eliminado correctamente');
	response.redirect('/consulta1/');
});

//eliminar 
router.get('/forms/editar-form1/:id', isAuthenticated, async function(request, response){
	const form1s = await Form1.findById(request.params.id);
	response.render('forms/editar-form1',{form1s});
});

router.put('/forms/editar-form1/:id', isAuthenticated, async function(request, response) {
		const {oficio, oficina, asunto, Referencias, Lugar, fecha, dirigido, firmador} = request.body;
		await Form1.findByIdAndUpdate(request.params.id, {oficio, oficina, asunto, Referencias, Lugar, fecha, dirigido, firmador} );
		request.flash('success_msg', 'se actualizo correctamente');
		response.redirect('/consulta1');
})

//select y agregar
router.get('/consulta1', isAuthenticated, async function(request, response){
	const form1 = await Form1.find({user: request.user.id}).sort({fechacreacion:'desc'});
	response.render("forms/consulta1",{form1});
});

//agregar
router.get('/forms/form1', isAuthenticated, function(request, response){
	response.render('forms/form1');
});

router.get('/forms/pdf1', function(request, response){
	response.render('forms/pdf1');
});
router.post('/forms/form1', isAuthenticated, async function(request, response){
	//request.body contiene los datos enviados desde el servidor.
	//obtenemos los datos en constantes
	const {oficio, oficina, asunto, Referencias, Lugar, fecha, dirigido, firmador} = request.body;
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
  if (!Referencias){
		errores.push({text: 'Por favor inserta la referencia'});
	}
	if (!Lugar){
		errores.push({text: 'Por favor inserta el lugar'});
	}
	if (!fecha){
		errores.push({text: 'Por favor inserta la fecha'});
	}
	if (!dirigido){
		errores.push({text: 'Por favor inserta a quien va dirigido'});
	}
 if (!firmador){
		errores.push({text: 'Por favor inserta quien firma'});
	} 
 
 
	if (errores.length > 0){
		response.render('forms/form1', {
			errores,
			oficio,
			oficina,
			asunto,
			Referencias,
			Lugar,
			fecha,
			dirigido,
			firmador

		});
	} else{
		const nuevoForm1 = new Form1({oficio, oficina, asunto, Referencias, Lugar, fecha, dirigido, firmador});
		nuevoForm1.user = request.user.id;
		console.log(nuevoForm1);
		//const newNegocio = new Form1({oficio, oficina, asunto, Referencias, Lugar, fecha, dirigido, firmador});
		await nuevoForm1.saveWithAudit(request.user._id);
		//await nuevoForm1.save();
		request.flash('success_msg', 'Documento agregado correctamente');
		response.redirect('/consulta1');
	}
});
module.exports = router;