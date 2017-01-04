const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// set constant test data to use, including a known ID (otherwise mongo creates a random ID at insert and we wouldn't know it)
const todos = [{
	_id: new ObjectID(),
	text: 'First test todo'
}, {
	_id: new ObjectID(),
	text: 'Second test todo',
	completed: true,
	completedAt: 333
}];


//Clear the test database for each test then load in some reliable sample data. Note it will run before every test, so count is 0 at the start. DON'T use prod DB here as it will get wiped.
beforeEach((done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => done());
});

describe('POST /todos', () => {
	it('should create a new todo', (done) => {
		var text = 'Test todo text';

		//Call test via supertest
		request(app)
			.post('/todos')
			.send({text}) //ES6 to replace 'text': 'text'
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(text);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Todo.find({text}).then((todos) => {
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done();
				}).catch((e) => done(e));		
			});
	});

	it('should not create todo with invalid body data', (done) => {

		//Call test via supertest
		request(app)
			.post('/todos')
			.send({}) //ES6 to replace 'text': 'text'
			.expect(400)
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Todo.find().then((todos) => {
					expect(todos.length).toBe(2); //Use 2 because we have two to start in sample data
					done();
				}).catch((e) => done(e));		
			});
	});
});

describe('GET /todos', () => {
	it('should get all todos', (done) => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length).toBe(2);
			})
			.end(done); //no need to add on a function to end() because we're not doing anything asynchronously
	});
});

describe('GET /todos/:id', () => {
	it('should return todo doc', (done) => {
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`) //change object into a string
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done);
	});

	it('should return a 404 if todo not found', (done) => {
		var newObjId = new ObjectID().toHexString();

		request(app)
			.get(`/todos/${newObjId}`)
			.expect(404)
			.end(done);
	});

	it('should return a 404 for non-object IDs', (done) => {
		request(app)
			.get('/todos/123')
			.expect(404)
			.end(done);
	});
});

describe('DELETE /todos/:id', () => {
	it('should remove a todo', (done) => {
		var hexId = todos[1]._id.toHexString();

		request(app)
			.delete(`/todos/${hexId}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo._id).toBe(hexId);
			})
			.end((err, res) => {
				if(err) {
					return done(err);
				}
				Todo.findById(hexId).then((todo) => {
					expect(todo).toNotExist();
					done();
				}).catch((e) => done(e));
			});

	});

	it('should return a 404 if todo not found', (done) => {
		var newObjId = new ObjectID().toHexString();

		request(app)
			.delete(`/todos/${newObjId}`)
			.expect(404)
			.end(done);		

	});

	it('should return a 404 if object id is invalid', (done) => {
		request(app)
			.delete('/todos/123')
			.expect(404)
			.end(done);
	});
});

describe('PATCH /todos/:id', () => {
	it('should update the todo', (done) => {
		var hexId = todos[0]._id.toHexString();
		var text = 'This is the new text';

		request(app)
			.patch(`/todos/${hexId}`)
			.send({
				completed: true,
				text: text // or just use text if you want to use ES6
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(text);
				expect(res.body.todo.completed).toBe(true);
				expect(res.body.todo.completedAt).toBeA('number');
			})
			.end(done)
	});

	it('should clear completedAt when todo is not completed', (done) => {
		var hexId = todos[1]._id.toHexString();
		var text = 'This is the new text';

		request(app)
			.patch(`/todos/${hexId}`)
			.send({
				completed: false,
				text: text // or just use text if you want to use ES6
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(text);
				expect(res.body.todo.completed).toBe(false);
				expect(res.body.todo.completedAt).toNotExist();
			})
			.end(done)
	});
})