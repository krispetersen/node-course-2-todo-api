var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

//using destructuring with this syntax {something}
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

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


app.get('/todos/:id', (req, res) => {
	//***check validity of ID
	var id = req.params.id;
	if (!ObjectID.isValid(id)) {
 		return res.status(404).send();
	}

	//then passes back the success and error handlers
	Todo.findById(id).then((todo) => { //get back results into "todo"
		if (!todo) {
			return res.status(404).send(); //send back a response with error 404 and no data
		}
		res.send({todo}); //respond with object for flexibility
	}).catch((e) => res.status(400).send());
});


app.listen(port, () => {
	console.log(`Started on port ${port}`);
});

module.exports = {app};