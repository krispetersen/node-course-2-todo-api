const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//Remove All - do not get the docs back of what was removed
Todo.remove({}).then((result) => {
	console.log(result);
})

//Removes one and you get the doc back after removed to do something with if you want, maybe put in audit log table
//Use if you need to query by more than just the ID
Todo.findOneAndRemove({_id: '1234'}).then((todo) => {
	console.log(todo);
});

//Removes one and you get the doc back after removed to do something with if you want, maybe put in audit log table
Todo.findByIdAndRemove('asdf').then((todo) => {
	console.log(todo);
});