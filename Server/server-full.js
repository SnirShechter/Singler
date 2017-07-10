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
				objs = filterUserProfiles(objs, userId);
				if (typeof objs !== 'string') cl("Returning list of " + objs.length + " " + objType);
				else cl('something went wrong. error: ' + objs)
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

// GET matches per user
// app.get('/data/stam/matches/:id', function (req, res) {
// 	const objId = req.params.id;
// 	cl(`Getting you the matches for user id: ${objId}`);
// 	dbConnect()
// 		.then((db) => {
// 			const collection = db.collection('users');
// 			let _id;
// 			try {
// 				_id = new mongodb.ObjectID(objId);
// 			}
// 			catch (e) {
// 				return Promise.reject(e);
// 			}
// 			return collection.findOne({ _id: _id })
// 				.then((obj) => {
// 					cl("Returning the matches for " + objId);
// 					res.json(obj.matches);
// 					db.close();
// 				})
// 				.catch(err => {
// 					cl('Cannot get you that ', err)
// 					res.status(404).json({ error: 'not found' });
// 					db.close();
// 				})

// 		});
// });

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
				if (matchResult) { //found match
					cl('Found a match!');
					collection.updateOne({ _id: new mongodb.ObjectID(userId) }, { $addToSet: { "matches": likedUserId } })
						.then(() => {
							return collection.updateOne({ _id: new mongodb.ObjectID(likedUserId) }, { $addToSet: { "matches": userId } });
						})
						.then(() => {
							db.close();
							res.json({ message: 'Updated like and found a match!', isMatch: true })
						});
				} else res.json({ message: 'Updated like', isMatch: false });
			})
			.catch(err => {
				cl('Cannot get you that ', err)
				res.status(404).json({ error: 'not found' });
				db.close();
			});
	});
});

// POST - adds a user
app.post('/data/:objType', upload.single('file'), function (req, res) {
	const objType = req.params.objType;
	cl("POST for " + objType);

	const user = req.body;
	user.likes = []
	user.matches = [];

	// If there is a file upload, add the url to the obj
	if (req.file) {
		user.imgUrl = serverRoot + req.file.filename;
	}
	dbConnect().then((db) => {
		const collection = db.collection(objType);

		collection.insert(user, (err, result) => {
			if (err) {
				cl(`Couldnt insert a new ${objType}`, err)
				res.json(500, { error: 'Failed to add' })
			} else {
				cl(objType + " added");
				res.json(user);
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
				buildClientMatches(user.matches)
					.then((userProfiles) => {
						user.matches = userProfiles;
						res.json(user)
					});
			} else {
				cl('Login NOT Succesful');
				req.session.user = null;
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

var connections = [];
io.on('connection', socket => {
	console.log('a user connected');
	socket.on('identify', userId => {
		connections.push({ socketId: socket.id, userId })
		console.log(`identified socket connection as: ${userId}`);
		console.log(connections)
	})
	socket.on('disconnect', function () {
		console.log('user disconnected')
		let idx = connections.findIndex(connection => socket.id === connection.socketId)
		if (idx !== -1) {
			console.log(`id: ${connections[idx].socketId}`);
			connections.splice(idx, 1)
		}
	});
	socket.on('message', msg => {
		let connectionTarget = connections.find(connection => {
			return msg.to === connection.userId
		})
		console.log('connection target:')
		console.log(connectionTarget)
		io.to(connectionTarget.socketId).send(msg);
	})
});

// socket.on('chat message', function (msg) {
// 	console.log('message: ' + msg);
// 	io.emit('chat message', msg);
// });

function filterUserProfiles(users, id) {
	var idx = users.findIndex(user => {
		console.log(user._id)
		return user._id == id
	});
	if (idx === -1) {
		console.log(idx)
		console.log(id)
		return 'Recieved an invalid ID'
	}
	// destructuring the filtermap + splicing its own user object
	var { matches, filtermap: { minAge, maxAge, male: malePref, female: femalePref }, likes } = users[idx];
	users.splice(idx, 1);

	var filterFunction = like => {
		let LikedUserIdx = users.findIndex(user => {
			return user._id === Object.keys(like)[0]
		})
		users.splice(LikedUserIdx, 1);
	}

	// filtering out the likes and matches of the user
	likes.map(filterFunction)
	matches.map(filterFunction)

	// adjusting user data so that only a profile with an Id will return
	var userProfiles = users.map(user => {
		user.profile._id = user._id;
		return user.profile;
	})

	// filtering out the users not matching the filtermap criterias
	userProfiles = userProfiles.filter(profile => {
		let age = birthdateToAge(profile.birthdate);

		// basicly a boolean representing the user NOT matching the criteria, so a ! is inserted before
		return !(age > maxAge || age < minAge ||
			profile.isMale && !malePref ||
			!profile.isMale && !femalePref)
	})


	return userProfiles;
}

function birthdateToAge(birthdate) {
	return (Date.now() - birthdate) / (1000 * 60 * 60 * 24 * 365)
}

function buildClientMatches(ServerMatches) {
	console.log(`building client matches with matches:`);
	console.log(ServerMatches);

	if (ServerMatches.length == 0) return [];
	return new Promise((resolve, reject) => {
		getSomeUsers(ServerMatches)
			.then((users) => {
				console.log(`before map IDs : ` + users);
				let userProfiles = users.map(user => {
					user.profile._id = user._id;
					return user.profile;
				})
				console.log('RESOLVING PROMISE')
				console.log(userProfiles);
				resolve(userProfiles);
			})
			.catch((err) => console.log(err));
	})
}

function getSomeUsers(userIds) {
	console.log('userIds on getSomeUsers ' + userIds)
	console.log('type of ' + typeof userIds)
	let mongodbUserIds = userIds.map(userId => new mongodb.ObjectID(userId))
	console.log(mongodbUserIds)
	return new Promise((resolve, reject) => {
		dbConnect().then(db => {
			const collection = db.collection('users');
			console.log('getsomeusers inside dbconnect' + userIds)
			collection.find({ _id: { $in: mongodbUserIds } }).toArray((err, users) => {
				console.log('getsomeusers inside coll find' + users)
				if (err) {
					cl('Cannot get you the users you requested. error: ', err)
					reject(err);
				} else {
					console.log('getsomeusers before return users :')
					console.log(users);
					db.close();
					resolve(users);
				}
			});
		})
	});
}
