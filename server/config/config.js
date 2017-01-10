//none of this matters on Heroku as they set value of 'production' by default
var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
	var config = require('./config.json'); //when including a JSON file, it's automatically converted into a javascript object
	var envConfig = config[env]; //bracket notation

	Object.keys(envConfig).forEach((key) => {
		process.env[key] = envConfig[key];
	});
}