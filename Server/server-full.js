// Minimal Simple REST API Handler (With MongoDB and Socket.io)
// Plus support for simple login and session
// Plus support for file upload
// Author: Yaron Biton misterBIT.co.il (TalyS updates)

"use strict";

var cl = console.log;

const express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	mongodb = require('mongodb')

const clientSessions = require("client-sessions");
const upload = require('./uploads');
const app = express();

var corsOptions = {
	origin: /http:\/\/localhost:\d+/,
	credentials: true
};

const serverRoot = 'http://localhost:3003/';
const baseUrl = serverRoot + 'data';
const matchUrl = baseUrl + '/stam/matches';
// const matchUrl = serverRoot + 'matches';


app.use(express.static('uploads'));


app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(clientSessions({
	cookieName: 'session',
	secret: 'C0d1ng 1s fun 1f y0u kn0w h0w', // set this to a long random string!
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
}));

const http = require('http').Server(app);
const io = require('socket.io')(http);


function dbConnect() {

	return new Promise((resolve, reject) => {
		// Connection URL
		// var url = 'mongodb://localhost:27017/singlerdb';
		var url = 'mongodb://singler1:singler1@ds119568.mlab.com:19568/singlerdb';
		// Use connect method to connect to the Server
		mongodb.MongoClient.connect(url, function (err, db) {
			if (err) {
				cl('Cannot connect to DB', err)
				reject(err);
			}
			else {
				cl("Connected to DB");
				resolve(db);
			}
		});
	});
}

// GETs a list
app.get('/data/users/all/:id', function (req, res) {
	const objType = 'users';
	const userId = req.params.id;

	dbConnect().then(db => {
		const collection = db.collection(objType);
		collection.find({}).toArray((err, objs) => {
			if (err) {
				cl('Cannot get you a list of ', err)
				res.json(404, { error: 'not found' })
			} else {
				cl("Returning list of " + objs.length + " " + objType);
				objs = filterUserProfiles(objs, userId);
				res.json(objs);
			}
			db.close();
		});
	});
});

// GETs a single
app.get('/data/:objType/:id', function (req, res) {
	const objType = req.params.objType;
	const objId = req.params.id;
	cl(`Getting you an ${objType} with id: ${objId}`);
	dbConnect()
		.then((db) => {
			const collection = db.collection(objType);
			let _id;
			try {
				_id = new mongodb.ObjectID(objId);
			}
			catch (e) {
				return Promise.reject(e);
			}
			return collection.findOne({ _id: _id })
				.then((obj) => {
					cl("Returning a single item from " + objType);
					res.json(obj);
					db.close();
				})
				.catch(err => {
					cl('Cannot get you that ', err)
					res.json(404, { error: 'not found' })
					db.close();
				})

		});
});


// GETs a match by "match Id"
// app.get('/data/matches/:mid', function (req, res) {
// 	const objType = req.params.objType;
// 	const objId = req.params.id;
// 	cl(`Getting you an ${objType} with id: ${objId}`);
// 	dbConnect()
// 		.then((db) => {
// 			const collection = db.collection(objType);
// 			let _id;
// 			try {
// 				_id = new mongodb.ObjectID(objId);
// 			}
// 			catch (e) {
// 				return Promise.reject(e);
// 			}
// 			return collection.findOne({ _id: _id })
// 				.then((obj) => {
// 					cl("Returning a single item from " + objType);
// 					res.json(obj);
// 					db.close();	
// 				})
// 				.catch(err => {
// 					cl('Cannot get you that ', err)
// 					res.json(404, { error: 'not found' })
// 					db.close();	
// 				})

// 		});
// });

// GET matches per user
// app.get('/data/:objType/:id', function (req, res) {
app.get('/data/stam/matches/:id', function (req, res) {
	// const objType = req.params.objType;
	const objId = req.params.id;
	cl(`Getting you the matches for user id: ${objId}`);
	// cl('aaajbiuasbsiuafiuafuifaffff... Taly....');
	dbConnect()
		.then((db) => {
			const collection = db.collection('users');
			let _id;
			try {
				_id = new mongodb.ObjectID(objId);
			}
			catch (e) {
				return Promise.reject(e);
			}
			return collection.findOne({ _id: _id })
				.then((obj) => {
					cl("Returning the matches for " + objId);
					res.json(obj.matches);
					db.close();
				})
				.catch(err => {
					cl('Cannot get you that ', err)
					// res.json(404, { error: 'not found' })
					res.status(404).json({ error: 'not found' });
					db.close();
				})

		});
});

app.put('/data/:objType/:id/:trgId/:like', function (req, res) {
	const userId = req.params.id;
	const likedUserId = req.params.trgId;
	const isLike = (req.params.like === 'like');
	cl(userId, likedUserId, isLike);
	cl(`Requested to update the likes of id: ${userId}`);

	dbConnect().then((db) => {
		const collection = db.collection('users');
		//add like to current user
		collection.updateOne({ _id: new mongodb.ObjectID(userId) }, { $addToSet: { "likes": { [likedUserId]: isLike } } })
			.then((result) => { //check for match with other user
				cl('got like checking match')
				// return check4Match(collection, objId, targetId, res);
				return collection.findOne({ _id: new mongodb.ObjectID(likedUserId), "likes": { [userId]: true } });
			}).then((matchResult) => { //update match
				cl('got like checking match');
				if (matchResult) { //found match
					collection.updateOne({ _id: new mongodb.ObjectID(userId) }, { $addToSet: { "matches": { [likedUserId]: true } } })
						.then(() => {
							return collection.updateOne({ _id: new mongodb.ObjectID(likedUserId) }, { $addToSet: { "matches": { [userId]: true } } });
						})
						.then(() => {
							db.close();
						});
				}
				res.json({ messege: 'updated' });
			})
			.catch(err => {
				cl('Cannot get you that ', err)
				res.status(404).json({ error: 'not found' });
				db.close();
			});
	});
});

// POST - adds user
app.post('/data/:objType', upload.single('file'), function (req, res) {
	const objType = req.params.objType;
	cl("POST for " + objType);

	const obj = req.body;
	obj.likes = []
	obj.matches = [];

	// delete obj._id;

	// If there is a file upload, add the url to the obj
	if (req.file) {
		obj.imgUrl = serverRoot + req.file.filename;
	}


	dbConnect().then((db) => {
		const collection = db.collection(objType);

		collection.insert(obj, (err, result) => {
			if (err) {
				cl(`Couldnt insert a new ${objType}`, err)
				res.json(500, { error: 'Failed to add' })
			} else {
				cl(objType + " added");
				res.json(obj);
			}
			db.close();
		});
	});
});



// Add message
app.post('/data/chat/:objType', upload.single('file'), function (req, res) {
	const objType = req.params.objType;
	cl("POST for " + objType);
	const obj = req.body;
	obj.date = Date.now();
	// If there is a file upload, add the url to the obj
	if (req.file) {
		obj.imgUrl = serverRoot + req.file.filename;
	}

	dbConnect().then((db) => {
		const collection = db.collection(objType);

		collection.insert(obj, (err, result) => {
			if (err) {
				cl(`Couldnt insert message ${objType}`, err)
				res.json(500, { error: 'Failed to add message' })
			} else {
				cl(objType + " added");
				res.json(obj);
			}
			db.close();
		})
	}).catch(err => {
		cl('Cannot connect to db... ', err)
		res.status(500).json({ error: 'Cannot connect to db...' });
	});
});


// GETs a list of messages of 2 users
app.get('/data/chat/:objType/:fromId/:toId', function (req, res) {
	const objType = req.params.objType;
	const fromId = req.params.fromId;
	const toId = req.params.toId;
	dbConnect().then(db => {
		const collection = db.collection(objType);

		collection.find({ toId: { $in: [fromId, toId] }, fromId: { $in: [toId, fromId] } }).toArray((err, objs) => {
			if (err) {
				cl('Cannot get you a list of ', err)
				res.json(404, { error: 'not found' })
			} else {
				cl("Returning list of " + objs.length + " " + objType);
				res.json(objs);
			}
			db.close();
		});
	});
});

// Basic Login/Logout/Protected assets
app.post('/login', function (req, res) {
	console.log(`login attempt with uName:${req.body.uName}, password:${req.body.password}`);
	dbConnect().then((db) => {
		db.collection('users').findOne({ uName: req.body.uName, password: req.body.password }, function (err, user) {
			if (user) {
				cl('Login Succesful');
				delete user.password;
				req.session.user = user;  //refresh the session value
				// res.json({ token: 'Beareloginr: puk115th@b@5t', user });
				res.json(user);
			} else {
				cl('Login NOT Succesful');
				req.session.user = null;
				// res.json(403, { error: 'Login failed' })
				res.status(403).json({ error: 'Login failed' })
			}
			db.close();
		});
	});
});

app.get('/logout', function (req, res) {
	req.session.reset();
	res.end('Loggedout');
});

function requireLogin(req, res, next) {
	if (!req.session.user) {
		cl('Login Required');
		res.json(403, { error: 'Please Login' })
	} else {
		next();
	}
};
app.get('/protected', requireLogin, function (req, res) {
	res.end('User is loggedin, return some data');
});




// Kickup our server 
// Note: app.listen will not work with cors and the socket
// app.listen(3003, function () {
http.listen(3003, function () {
	console.log(`misterREST server is ready at ${baseUrl}`);
	console.log(`GET (list): \t\t ${baseUrl}/{entity}`);
	console.log(`GET (single): \t\t ${baseUrl}/{entity}/{id}`);
	// app.get('/data/matches/:id', function (req, res)
	console.log(`GET (user matches): \t\t ${matchUrl}/{id}`);

	console.log(`DELETE: \t\t ${baseUrl}/{entity}/{id}`);
	console.log(`PUT (update): \t\t ${baseUrl}/{entity}/{id}`);
	console.log(`POST (add): \t\t ${baseUrl}/{entity}`);
	console.log(`POST (login): \t\t ${serverRoot}{entity}`);

});


io.on('connection', function (socket) {
	console.log('a user connected');
	socket.on('disconnect', function () {
		console.log('user disconnected');
	});
	socket.on('chat message', function (msg) {
		// console.log('message: ' + msg);
		io.emit('chat message', msg);
	});
});

cl('WebSocket is Ready');

function filterUserProfiles(users, id) {
	idx = users.findIndex(user => this._id === id);
	// destructuring the filtermap + splicing its own user object
	var { filtermap: { minAge, maxAge, male: malePref, female: femalePref }, likes, matches } = users.splice(idx, 1)
	var filterFunction = like => {
		let LikedUserIdx = findIndex(user => {
			return user._id === Object.keys(like)[0]
		})
		users.splice(LikedUserIdx, 1);
	}

	// filtering out the likes and matches of the user
	likes.map(filterFunction)
	matches.map(filterFunction)

	// filtering out the users not matching the filtermap criterias
	userProfiles = userProfiles.filter(profile => {
		let age = birthdateToAge(profile.birthdate);

		// basicly a boolean representing the user NOT matching the criteria, so a ! is inserted before
		return !(age > maxAge || age < minAge ||
			profile.isMale && !malePref ||
			!profile.isMale && !femalePref)
	})

	// adjusting user data so that only a profile with an Id will return
	var userProfiles = users.map(user => {
		user.profile._id = user._id;
		return user.profile;
	})

	return userProfiles;
}

function birthdateToAge(birthdate) {
	return (Date.now() - profile.birthdate) / (1000 * 60 * 60 * 24 * 365)
}