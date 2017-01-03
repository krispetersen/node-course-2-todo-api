//const MongoClient = require('mongoDB').MongoClient;
// rewriting using destructuring
const {MongoClient, ObjectID} = require('mongodb');

//ES6 Destructuring -> make new variables from an object's properties
//var user = {name: 'Kris', age: 39};
//var {name} = user;

MongoClient.connect('mongoDB://localhost:27017/ToDoApp', (err, db) => {
	if(err) {
		//use return so success message doesn't run too
		return console.log('Unable to connect to MongoDB Server');
	}

	console.log('Connected to MongoDB Server');

	// db.collection('Todos').insertOne({
	// 	text: 'Something to do',
	// 	completed: false
	// }, (err, result) => {
	// 	if(err) {
	// 		return console.log('Unable to insert todo.', err);
	// 	}

	// 	console.log(JSON.stringify(result.ops, undefined, 2));
	// });

	// db.collection('Users').insertOne({
	// 	name: 'Kris',
	// 	age: 39,
	// 	location: 'Chicago'
	// }, (err, result) => {
	// 	if(err) {
	// 		return console.log('Unable to insert user.', err);
	// 	}

	// 	console.log(result.ops[0]._id.getTimestamp());
	// });

	db.close();
});