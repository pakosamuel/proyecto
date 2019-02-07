//Librerias
const express = require('express');
//const colors = require('colors');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

//Inicializacione
const app = express();
require('./database.js');
require('./config/passport');

//Configuraciones
	//Configuramos el puerto del servidor
	app.set('puerto', process.env.PORT || 3000);
	
	//Configuramos la carpeta para las vistas
	app.set('views', path.join(__dirname, 'views'));

	const hbs = exphbs.create({
		defaultLayout: 'main',
		layoutsDir : 'src/views/layouts',
		partialsDir: 'src/views/partials',
		extname:'hbs'
	});

	app.engine('hbs', hbs.engine);

	app.set('view engine', '.hbs');

//Middleware
	app.use(express.urlencoded({
		extended:false
	}));
	app.use(methodOverride('_method'));
	app.use(session({
		secret: 'mysecretapp',
		resave: true,
		saveUninitialized:true
	}));
//app.use(formidable.parse({ keepExtensions: true})); //imgens
app.use(passport.initialize());
app.use(passport.session());
	app.use(flash());

//Variables Globables
app.use(function(require, response, next){
	response.locals.success_msg = require.flash('success_msg');
	response.locals.error_msg = require.flash('error_msg');
	response.locals.error = require.flash('error');
	response.locals.usuario = require.user || null;
	response.locals.nombre = require.user || null;
	next();
});

//Rutas
	app.use(require('./routes/index'));
	//app.use(require('./routes/notes'));
	app.use(require('./routes/users'));
app.use(require('./routes/forms'));
app.use(require('./routes/form1'));
app.use(require('./routes/form2'));
app.use(require('./routes/form3'));
app.use(require('./routes/form4'));
app.use(require('./routes/form5'));
app.use(require('./routes/form6'));
app.use(require('./routes/form7'));
app.use(require('./routes/form8'));
app.use(require('./routes/form9'));
app.use(require('./routes/form10'));
app.use(require('./routes/form11'));
app.use(require('./routes/form12'));


//Archivos estáticos
	app.use(express.static(path.join(__dirname,'public')));
	
//Servidor
	app.listen(app.get('puerto'), function(){
		const puerto = app.get('puerto');

		console.log("Servidor corriendo en el puerto " + 
			puerto);
	});