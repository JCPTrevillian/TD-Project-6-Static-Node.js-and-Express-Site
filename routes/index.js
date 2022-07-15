const express = require('express');
const router = express.Router();
const { projects } = require('../data.json');

//root route 
router.get('/', (req, res) => {
	res.render('index', { projects });
});

// about route 
router.get('/about', (req, res) => {
	res.render('about');
});

// project route based on id 
router.get('/project/:id', (req, res, next) => {
	const projectId = req.params.id;
	const project = projects.find(({ id }) => id === +projectId);
	/** If the project can be found - render the project template and pass it the project object 
        Else return next which will trigger the 404 error handler
    */
	if (project) {
		res.render('project', { project });
	} else {
		return next();
	}
});

// prevent 404
router.get('/favicon.ico', (req, res) => {
	res.sendStatus(204);
});

module.exports = router;
