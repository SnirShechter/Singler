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
const matchUrl = baseUrl + '/stam/matches'; // DELETE???

app.use(express.static('uploads'));

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(clientSessions({
	cookieName: 'session',
	secret: 'C0d1ng 1s fun 1f y0u kn0w h0w',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
}));

const http = require('http').Server(app);
const io = require('socket.io')(http);

function dbConnect() {
	return new Promise((resolve, reject) => {
		// Connection URL
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

// GETs a list of users
app.get('/data/users/all/:id', function (req, res) {
	const userId = req.params.id;
	dbConnect().then(db => {
		const collection = db.collection('users');
		collection.find({}).toArray((err, users) => {
			if (err) {
				cl('Cannot get you a list of users ', err)
				res.json(404, { error: 'not found' })
			} else {
				users = filterUserProfiles(users, userId);
				if (typeof users !== 'string') cl("Returning list of " + users.length + " users");
				else cl('something went wrong. error: ' + users)
				res.json(users);
			}
			db.close();
		});
	});
});

// GETs a single
app.get('/data/users/:id', function (req, res) {
	const userId = req.params.id;
	cl(`Getting a user with id: ${userId}`);
	dbConnect()
		.then((db) => {
			const collection = db.collection('users');
			let _id;
			try {
				_id = new mongodb.ObjectID(userId);
			}
			catch (e) {
				return Promise.reject(e);
			}
			return collection.findOne({ _id: _id })
				.then((user) => {
					cl('Returning a single user');
					res.json(user);
					db.close();
				})
				.catch(err => {
					cl('Could not return a user', err)
					res.json(404, { error: 'Not found' })
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
		// add like to current user
		collection.updateOne({ _id: new mongodb.ObjectID(userId) }, { $addToSet: { "likes": { [likedUserId]: isLike } } })
			.then((result) => {
				cl('Like received,checking for a match')
				return collection.findOne({ _id: new mongodb.ObjectID(likedUserId), "likes": { [userId]: true } });
			}).then((matchResult) => {
				if (matchResult) {
					cl('Found a match!');
					collection.updateOne({ _id: new mongodb.ObjectID(userId) }, { $addToSet: { "matches": likedUserId } })
						.then(() => {
							return collection.updateOne({ _id: new mongodb.ObjectID(likedUserId) }, { $addToSet: { "matches": userId } });
						})
						.then(() => {
							buildClientMatches([likedUserId, userId])
								.then((matches) => {
									// in case matches are mixed
									if (matches[0]._id !== userId)[matches[0], matches[1]] = [matches[1], matches[0]]
									res.json({ message: 'Updated like and found a match!', isMatch: true, match: matches[0] })
									let connectionTarget = connections.find(connection => {
										return likedUserId === connection.userId
									})
									if (connectionTarget) {
										cl('Matched user is connected, sending him a message too!')
										io.to(connectionTarget.socketId).emit('match', matches[1])
									}
								});
							db.close();
						});
				} else res.json({ message: 'Updated like', isMatch: false });
			})
			.catch(err => {
				cl(`///// ERROR \\\\\ `);
				cl('Like/match error,Cannot connect to DB ', err)
				res.status(404).json({ error: 'Could not connect to DB' });
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

// POST - updates/edits a user
app.put('/data/users', upload.single('file'), function (req, res) {
	cl("PUT for users");

	const profile = req.body.profile;
	const _id = mongodb.ObjectID(req.body._id);
	dbConnect().then((db) => {
		const collection = db.collection('users');
		collection.updateOne({ _id }, { $set: { profile } }, (err, result) => {
			if (err) {
				cl(`Couldnt update/edit a user`, err)
				res.json(500, { error: 'Failed to update/edit the user' })
			} else {
				cl('user updated/edited');
				res.json(profile);
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
	dbConnect().then((db) => {
		const collection = db.collection(messages);
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
app.get('/data/chat/messages/:fromId/:toId', function (req, res) {
	const fromId = req.params.fromId;
	const toId = req.params.toId;
	dbConnect().then(db => {
		const collection = db.collection('messages');
		collection.find({ toId: { $in: [fromId, toId] }, fromId: { $in: [toId, fromId] } }).toArray((err, objs) => {
			if (err) {
				cl('Cannot get you a list of ', err)
				res.json(404, { error: 'not found' })
			} else {
				cl("Returning list of " + objs.length + " " + 'messages');
				res.json(objs);
			}
			db.close();
		});
	});
});

// Basic Login/Logout/Protected assets
app.post('/login', function (req, res) {
	cl(`Login attempt with uName:${req.body.uName}, password:${req.body.password}`);
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
				cl(`///// ERROR \\\\\ `);
				cl('Login NOT Succesful');
				req.session.user = null;
				res.status(403).json({ error: 'Login failed' })
			}
			db.close();
		});
	});
});

// deletes all unlikes of a single user
// NEED TO CHECK AND FIX
app.get('/delete/unlikes/:id', function (req, res) {
	var query = { _id: req.params.id };
	cl(`Deleting unlikes of ${query}`);
	dbConnect().then((db) => {
		db.collection('users').update(query, { likes: { $unset: false } }, function (err, user) {
			if (err) {
				cl(`///// ERROR \\\\\ `);
				cl(`Did not successfuly delete all unlikes of ${query._id}`);
				res.json(`Did not successfuly delete all unlikes of ${query._id}`)
			} else {
				cl(`Successfuly deleted all unlikes of ${query._id}`);
				res.json(`Successfuly deleted all unlikes of ${query._id}`);
			}
			db.close();
		});
	});
});

// DELETE???
app.get('/logout', function (req, res) {
	cl(`++++++++++++++++++ AM I IN USE? +++++++++++++++++++`)
	req.session.reset();
	res.end('Loggedout');
});
// DELETE???
function requireLogin(req, res, next) {
	cl(`++++++++++++++++++ AM I IN USE? +++++++++++++++++++`)
	if (!req.session.user) {
		cl('Login Required');
		res.json(403, { error: 'Please Login' })
	} else {
		next();
	}
};
// DELETE???
app.get('/protected', requireLogin, function (req, res) {
	cl(`++++++++++++++++++ AM I IN USE? +++++++++++++++++++`)
	res.end('User is loggedin, return some data');
});


// CHANGE???
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
	console.log('SOCKET: user connected');
	socket.on('identify', userId => {
		connections.push({ socketId: socket.id, userId })
		console.log(`SOCKET: identified socket connection as: ${userId}`);
	})
	socket.on('disconnect', function () {
		let idx = connections.findIndex(connection => socket.id === connection.socketId)
		if (idx !== -1) {
			console.log(`SOCKET: ${connections[idx].userId} user disconnected`)
			connections.splice(idx, 1)
		}
	});
	socket.on('message', msg => {
		console.log('SOCKET: Message received!')
		dbConnect().then((db) => {
			const collection = db.collection('messages');
			collection.insert(msg, (err, result) => {
				if (err) {
					cl(`///// ERROR \\\\\ `);
					cl(`SOCKET: couldn't insert message to DB `, err)
				} else {
					cl('SOCKET: Message added to DB');
				}
				db.close();
			})
		}).catch(err => {
			cl(`///// ERROR \\\\\ `);
			cl('SOCKET: cannot connect to db to add message ', err)
		});

		let connectionTarget = connections.find(connection => {
			return msg.toId === connection.userId
		})
		if (connectionTarget) io.to(connectionTarget.socketId).send(msg);
	})
});

function filterUserProfiles(users, id) {
	var idx = users.findIndex(user => {
		return user._id == id
	});
	if (idx === -1) {
		cl(`///// ERROR \\\\\ `);
		cl(`filterUserProfiles: recieved an invalid ID`);
		return 'Recieved an invalid ID'
	}
	// destructuring the filtermap + splicing its own user object
	var { matches, filtermap: { minAge, maxAge, male: malePref, female: femalePref, imgUrl: imgUrl }, likes } = users[idx];
	users.splice(idx, 1);

	// filtering out the likes and matches of the user
	likes.map(like => {
		let LikedUserIdx = users.findIndex(user => {
			return user._id == Object.keys(like)[0]
		})
		users.splice(LikedUserIdx, 1);
	})

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
	if (ServerMatches.length == 0) return new Promise((res, rej) => res([]));
	return new Promise((resolve, reject) => {
		getSomeUsers(ServerMatches)
			.then((users) => {
				let userProfiles = users.map(user => {
					user.profile._id = user._id;
					user.profile.msgs = [];
					return user.profile;
				})
				resolve(userProfiles);
			})
			.catch((err) => {
				cl(`///// ERROR \\\\\ `);
				console.log('buildClientMatches: getSomeUsers return a rejected promise')
			});
	})
}

function getSomeUsers(userIds) {
	let mongodbUserIds = userIds.map(userId => new mongodb.ObjectID(userId))
	console.log(mongodbUserIds)
	return new Promise((resolve, reject) => {
		dbConnect().then(db => {
			const collection = db.collection('users');
			collection.find({ _id: { $in: mongodbUserIds } }).toArray((err, users) => {
				if (err) {
					cl(`///// ERROR \\\\\ `);
					cl('getSomeUsers: Cannot get users from DB', err)
					reject(err);
				} else {
					db.close();
					resolve(users);
				}
			});
		})
	});
}
