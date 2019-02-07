const express = require('express');
const router = express.Router();
const passport = require('passport');
//mdoelos
const Usuario = require('../model/Usuarios');

router.get('/users/singin', function(request,response){
	response.render('users/singin');
});

router.post('/users/singup', async function(request,response){
	const { nombre, email, tipo, zona, password, confirmarpassword } = request.body;
	const errores= [];

	if (!nombre){
		errores.push({text:'Por favor inserta el nombre'});
	}
	if (!email){
		errores.push({text: 'Por favor inserta el email'});
	}
	if (!zona) {
		errores.push ({text: 'por favor inserta la zona'});
	}
	if (!password){
		errores.push({text:'Por favor inserta el password'});
	}

	if (password.length <4) {
		errores.push({text :'La contraseña debe tener al menos 4 caracteres'});		
	}
	if (password != confirmarpassword){
		errores.push({text :'El password no coincide'});
	}

	if (errores.length >0){
		response.render('users/singup', 
			 {errores,
			  nombre, 
			  email, 
			  tipo,
			  zona,
			  password, 
			  confirmarpassword
			});
	}
	else{
		const emailUser = await Usuario.findOne({email: email});
		if (emailUser){
			request.flash('success_msg', 'El E-mail ya está en uso');
			response.redirect('/users/singup');
		}
		else {
				const newUser = new Usuario ({
			nombre,
			email,
			tipo,
			zona,
			password
		});
				newUser.password = await newUser.encryptPassword(password);
		await newUser.save();
		request.flash('success_msg', 'Registro del usuario exitoso');
		response.redirect('/users/singin');
		}		
	}		
});

router.get('/users/singup', function(request,response){
	response.render('users/singup');
});


router.post('/users/singin', passport.authenticate('local', {
	//Si todo va bien, lo direccionamos a formulario
	successRedirect: '/formulario',
	//Si hay algún error, lo direccionamos a singin
	failureRedirect: '/users/singin',
	//Para poder enviar mensjes
	failureFlash: true
}));
router.get('/users/logout', function(request,response){
	request.logout();
	request.flash('success_msg', 'saliste con exito');
	response.redirect('/');
});


module.exports = router;