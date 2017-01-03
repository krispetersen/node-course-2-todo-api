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

	//db.collection('Todos').find({completed: false}).toArray().then((docs) => {

	//FIND BY VALUE
	// db.collection('Todos').find({
	// 	_id: new ObjectID('586bf0e426a6b0270d4a3c6c')
	// }).toArray().then((docs) => {
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (err) => {
	// 	console.log('Unable to fetch todos', err);
	// });

	//toArray gets the JSON documents from the returned object
	db.collection('Users').find({name: 'Kris'}).toArray().then((docs) => {
		console.log('Todos');
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err) => {
		console.log('Unable to fetch todos', err);
	});	

	//FIND COUNT
	// db.collection('Todos').find({}).count().then((count) => {
	// 	console.log(`Todos count: ${count}`);
	// }, (err) => {
	// 	console.log('Unable to fetch todos', err);
	// });

	//db.close();
});

