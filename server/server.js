const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const path = require('path');
// const cookieParser = require('cookie-parser');

var app = express();
// var server = http.createServer(app);

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 8000;

var mainRoutes = require('./routes/main_pages');

app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));

if (env === 'production') {
	app.use('/intern/js', express.static(path.join(__dirname, '..', 'public','dist', 'js')));
	app.use('/intern/css', express.static(path.join(__dirname, '..', 'public','dist', 'css')));

} else {
	app.use('/intern/js', express.static(path.join(__dirname, '..', 'public', 'js')));
	app.use('/intern/css', express.static(path.join(__dirname, '..', 'public', 'css')));
}
	app.use('/intern/images', express.static(path.join(__dirname, '..', 'public', 'images')));

	// seems to be necessary for service worker
app.use(express.static("public"));

// app.use(cookieParser());
// app.use(bodyParser.urlencoded({extended: false}));



app.use('/', mainRoutes);



app.listen(port, () => {
    console.log(`Server up at ${port}`);
});