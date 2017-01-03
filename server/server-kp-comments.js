var {mongoose} = require('./db/mongoose');

// var Todo = mongoose.model('Todo', {
// 	text: {
// 		type: String,
// 		required: true,
// 		minLength: 1,
// 		trim: true
// 	},
// 	completed: {
// 		type: Boolean,
// 		default: false
// 	},
// 	completedAt: {
// 		type: Number,
// 		default: null
// 	}
// });

// var newTodoX = new Todo({
// 	text: 'Cook dinner'
// });

// var newTodoX = new Todo({
// 	text: 'Go to the gym',
// 	completed: true,
// 	completedAt: 1483474672
// });

// newTodoX.save().then((doc) => {
// 	console.log('Saved todo', doc);
// }, (e) => {
// 	console.log('Unable to save todo')
// });

var User = mongoose.model('User', {
	name: {
		type: String,
		required: true,
		minLength: 1,
		trim: true
	},
	email: {
		type: String,
		required: true,
		minLength: 1,
		trim: true
	}
});

//new instance of user model
var newUserY = new User({
	name: 'Kris ',
	email: 'kris@example.com'
});

newUserY.save().then((doc) => {
	console.log('Saved user', doc);
}, (e) => {
	console.log('Unable to save user')
});
