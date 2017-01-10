require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


//using destructuring with this syntax {something}
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

//configure middleware
app.use(bodyParser.json());


// Creata a new todo and use our own 'authenticate' middleware to assign to current user
app.post('/todos', authenticate, (req, res) => {
	//new instance of Todo model
	var todo = new Todo({
		text: req.body.text,
		_creator: req.user._id
	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});

// Get a user's todos
app.get('/todos', authenticate, (req, res) => {
	Todo.find({
		_creator: req.user._id //filter todos by logged in user's id
	}).then((todos) => {
		res.send({todos}) //Use ES6 to send object vs. array to keep things flexible for the future
	}, (e) => {
		res.status(400).send(e);
	})
});


app.get('/todos/:id', authenticate, (req, res) => {
	//***check validity of ID
	var id = req.params.id;
	if (!ObjectID.isValid(id)) {
 		return res.status(404).send();
	}

	//then passes back the success and error handlers
	Todo.findOne({
		_id: id,
		_creator: req.user._id
	}).then((todo) => { //get back results into "todo"
		if (!todo) {
			return res.status(404).send(); //send back a response with error 404 and no data
		}
		res.send({todo}); //respond with object for flexibility
	}).catch((e) => res.status(400).send());
});


app.delete('/todos/:id', authenticate, (req, res) => {
	var id = req.params.id;
	if (!ObjectID.isValid(id)) {
 		return res.status(404).send();
	}

	Todo.findOneAndRemove({
		_id: id,
		_creator: req.user._id
	}).then((todo) => { //get back results into "todo"
		if (!todo) {
			return res.status(404).send(); //send back a response with error 404 and no data
		}
		res.send({todo}); //respond with object for flexibility
	}).catch((e) => res.status(400).send());
});


app.patch('/todos/:id', authenticate, (req, res) => {
	var id = req.params.id;

	//create a variable that contains a subset of the information the user passed to us
	var body = _.pick(req.body, ['text', 'completed']);

	var id = req.params.id;
	if (!ObjectID.isValid(id)) {
 		return res.status(404).send();
	}

	// if it is a boolean and it is true
	// set time task was completed
	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	// new is mongoose syntax similar to returnOriginal field
	Todo.findOneAndUpdate({
		_id: id,
		_creator: req.user._id
	}, {$set: body}, {new: true}).then((todo) => {
		if(!todo) {
			return res.status(404).send();
		}

		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	})
});


// POST Users
app.post('/users', (req, res) => {
	//grab only the data we want from the user to prevent other injections
	var body = _.pick(req.body, ['email', 'password']);

	//new instance of User model
	var user = new User(body);

	user.save().then(() => {
		return user.generateAuthToken();
	}).then((token) => {
		res.header('x-auth', token).send(user);
	}).catch((e) => {
		res.status(400).send(e);
	})
});


app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user);
});


app.post('/users/login', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);

	User.findByCredentials(body.email, body.password).then((user) => {
		user.generateAuthToken().then((token) => {
			res.header('x-auth', token).send(user);
		});
	}).catch((e) => {
		res.status(400).send();
	});
});


//Logout users
app.delete('/users/me/token', authenticate, (req, res) => {
	req.user.removeToken(req.token).then(() => {
		res.status(200).send();
	}, () => {
		res.status(400).send();
	});
});


app.listen(port, () => {
	console.log(`Started on port ${port}`);
});

module.exports = {app};