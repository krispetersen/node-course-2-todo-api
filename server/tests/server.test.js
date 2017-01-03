const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
	text: 'First test todo'
}, {
	text: 'Second test todo'
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