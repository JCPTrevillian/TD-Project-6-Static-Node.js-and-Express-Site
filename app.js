const express = require('express');

const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));

const mainRoutes = require('./routes');

//main routes 
app.use(mainRoutes);

// 404 handler 
app.use((req, res, next) => {
	const err = new Error();
	err.status = 404;
	err.message = 'Oh no! Page not found.';
	next(err);
});

// Global error 
app.use((err, req, res, next) => {
	if (err.status === 404) {
		console.log(`Error: ${err.status}. ${err.message}`);
		res.render('page-not-found', { err });
	} else {
		err.message =
			err.message || 'It looks like something went wrong on the server.';
		err.status = err.status || 500;
		res.render('error', { err });
	}
});

//listen, string error 
const server = app.listen(process.env.PORT || 3000, () => {
	let port = server.address().port;
	console.log(`The application is running on localhost: ${port}`);
});
