const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//var id = '586c2439056271d426a8283f'; //todo id
var id = '586c0a4d3b7d3a042e5ee26c'; //user id

//*** use built in mongo utility to check validity if ID
//*** ID ObjectID set elsewhere
// if (!ObjectID.isValid(id)) {
// 	console.log('ID not valid');
// }

// Todo.find({
// 	_id: id //mongoose converts string into object for us
// }).then((todos) => { //get back results into "todos"
// 	console.log('Todos', todos); //print results and a label
// })

// *** Use this when only looking for one result (see below if finding one result by ID only. Get document back, instead of an array. Also gives back null versus an empty array which can be eaier to work with.
// Todo.findOne({
// 	_id: id //mongoose converts string into object for us
// }).then((todo) => { //get back results into "todos"
// 	console.log('Todo', todo); //print results and a label
// })

//*** Use when finding one result using the ID as the criteria
// Todo.findById(id).then((todo) => { //get back results into "todos"
// 	if (!todo) {
// 		return console.log('ID not found');
// 	}

// 	console.log('Todo by id', todo); //print results and a label
// }).catch((e) => console.log(e));

User.findById(id).then((user) => { //get back results into "user"
	if (!user) {
		return console.log('User not found');
	}

	console.log('User by id', user); //print results and a label
}).catch((e) => console.log(e));