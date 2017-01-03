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

	// db.collection('Todos').findOneAndUpdate({
	// 	_id: new ObjectID('586bf0e426a6b0270d4a3c6c')
	// }, {
	// 	$set: {
	// 		completed: true
	// 	}
	// }, {
	// 	returnOriginal: false //returns the new document in the response
	// }).then((result) => {
	// 	console.log(result);
	// })

	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID('586c021f26a6b0270d4a4182')
	}, {
		$inc: {
			age: 1
		},
		$set: {
			name: 'Kris'
		}
	}, {
		returnOriginal: false //returns the new document in the response
	}).then((result) => {
		console.log(result);
	})


	//db.close();
});

