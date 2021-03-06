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

	//deleteMany
	// db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
	// 	console.log(result);
	// });

	//deleteOne - deletes the first one it encounters
	// db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
	// 	console.log(result);
	// });

	//findOneAndDelete
	// db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
	// 	console.log(result);
	// });

	//Don't necessarily need callback
	db.collection('Users').deleteMany({name: 'Kris'});

	//db.close();
});

