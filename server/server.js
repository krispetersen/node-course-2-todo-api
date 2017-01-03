var express = require('express');
var bodyParser = require('body-parser');

//using destructuring with this syntax {something}
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

//configure middleware
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	//new instance of Todo model
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos}) //Use ES6 to send object vs. array to keep things flexible for the future
	}, (e) => {
		res.status(400).send(e);
	})
});



app.listen(3000, () => {
	console.log('Started on port 3000');
});

module.exports = {app};