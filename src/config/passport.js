const passport = require('passport');
const LocalStragegy = require('passport-local').Strategy;

const Usuario = require('../model/Usuarios')

passport.use(new LocalStragegy(
   {
	usernameField :'email'
   },
	//done es la variable donde regresaremos la información
	//de la autenticación
	async function(email, password, done){
		const usuario = await Usuario.findOne({email: email});
		if (!usuario){
			//null indica que no hay ningún error
			//false indica que no se encontró el usuario en la bd
			return done(null,false, {message: 'No se encontro el usuario'});
		} else {
			const coincide = await usuario.matchPassword(password);
			if(coincide){
				//null indica que no hay ningún error
				//user indica que encontró un usuario con el email
				//indicado en la bd y que coincide con el password enviado
				return done(null, usuario);
			}else{
				//Contraseña es incorecta
				return done(null, false, {message:'Password incorrecto'});
			}
		}
	}
));

passport.serializeUser(function(usuario,done){
	done(null, usuario.id);

});

passport.deserializeUser(function(id,done){
	Usuario.findById(id, function(error, usuario){
		done(error,usuario);
	})
});
