const { port } = require('./params');
const express = require('express');
const startDB = require('./db');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
module.exports = async () => {
    await startDB();
    app.set('port', port);
	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
		res.header("Access-Control-Allow-Headers", "Content-Type");
		next();
	});
    app.use(bodyParser.json({
		type: 'application/json'
	}));
	routes(app);
	app.use((err, req, res, next) => {
        console.log(err);
        return res.status(500).send('Internal error');
    });
    return app;
};