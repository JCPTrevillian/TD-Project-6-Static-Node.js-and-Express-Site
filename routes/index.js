const express = require('express');
const router = express.Router();
const { projects } = require('../data.json');

 
router.get('/', (req, res) => {
	res.render('index', { projects });
});

 
router.get('/about', (req, res) => {
	res.render('about');
});


router.get('/project/:id', (req, res, next) => {
	const projectId = req.params.id;
	const project = projects.find(({ id }) => id === +projectId);
	
	if (project) {
		res.render('project', { project });
	} else {
		return next();
	}
});


router.get('/favicon.ico', (req, res) => {
	res.sendStatus(204);
});

module.exports = router;
