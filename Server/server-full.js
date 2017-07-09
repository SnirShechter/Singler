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
app.get('/data/:objType', function (req, res) {
	const objType = req.params.objType;
	dbConnect().then(db => {
		const collection = db.collection(objType);

		collection.find({}).toArray((err, objs) => {
			if (err) {
				cl('Cannot get you a list of ', err)
				res.json(404, { error: 'not found' })
			} else {
				cl("Returning list of " + objs.length + " " + objType); // + "s");
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

// PUT - update like for user
app.put('localhost:3003/data/:objType/:id/like', function (req, res) {
// app.put('/data/:objType/:id/:newUname', function (req, res) {
	// const objType 	= req.params.objType;
	// const targetId 	= req.params.trgId;
	// const isLike 	=  req.params.like;
	const objId 	= req.params.id;
	const trgId = req.body.trgId;
	const isLiked = req.body.isLiked;

	// const newUname 	=  req.params.newUname;
	// if (newObj._id && typeof newObj._id === 'string') newObj._id = new mongodb.ObjectID(newObj._id);

	cl(`${id} Requested to like id: ${trgId} with ${isLiked}`);

	dbConnect().then((db) => {
		const collection = db.collection('users');
		collection.updateOne({ _id: new mongodb.ObjectID(objId) }, {$addToSet: { "likes": {[targetId] : isLike}}},
			(err, result) => {
				if (err) {
					cl('Cannot Update', err)
					res.json(500, { error: 'Update failed' })
				} else {
					// res.json(newObj);
					if (isLike) {
						check4Match(collection, objId, targetId, res);
					}
					cl('updated likes of: ', objId);
				}
				db.close();
			});
	});
});


function check4Match(collection, objId, targetId, res) {
	console.log('entered function check4Matche...');
	var _targetId = new mongodb.ObjectID(targetId);
	
	//  Checking whether the user got like back
	return collection.findOne({ _id: _targetId, "likes": {[objId] : "true"} })
		.then((trgObj) => {
			if(trgObj) {
				cl("Found MATCH for: " + _targetId + '!!!');
				// res.json(trgObj);
				handleMatch(collection, objId, targetId, res);
			} else {
				cl('no match!');
			}
		})
		.catch(err => {
			cl('Cannot get you that ', err)
			res.status(404).json({ error: 'not found' });
		})
}


function handleMatch(collection, objId, targetId, res)
{
	updateMatchDB(objId, targetId, res);
	// Continue from here... Taly.
	// var matchId = "595cf6e2211d5f28b4ee6991";
	// updateMatch2User(collection, matchId, objId, targetId, res);
	// updateMatch2User(collection, matchId, objId, targetId, res);

	// Send MATCH by socket?? or service worker??
}

function updateMatchDB(objId, targetId, res)
{
	cl("entered updateMatchDB");
	// bug?!?: connecting to db, though already connected
	dbConnect().then((db) => {
		const collection = db.collection('matches');
		var matchObj = {date: Date.now(), id1:objId, id2:targetId, msg:[]};
		collection.insert(matchObj, (err, result) => {
			if (err) {
				cl("Couldnt insert match", err)
				res.json(500, { error: 'Failed to add' })
			} else {
				cl("match added");
				res.json(matchObj);
			}
			db.close();
		});
	});
}

function updateMatch2User(collection, matchId, objId, targetId, res)
{
	cl("entered update Match 2User function");
	// const collection = db.collection('users');
	// collection.updateOne({ _id: new mongodb.ObjectID(objId) }, {$addToSet: { "likes": {[targetId] : isLike}}}
	collection.updateOne({ _id: new mongodb.ObjectID(objId) }, {$addToSet: { "matches": {[matchId] : objId}}}, 
		(err, result) => {
		if (err) {
			cl("Couldnt insert match", err)
			res.json(500, { error: 'Failed to add' })
		} else {
			cl("match added");
			// res.json(MatchObj);
		}
	});

}

// DELETE
// app.delete('/data/:objType/:id', function (req, res) {
// 	const objType 	= req.params.objType;
// 	const objId 	= req.params.id;
// 	cl(`Requested to DELETE the ${objType} with id: ${objId}`);
// 	dbConnect().then((db) => {
// 		const collection = db.collection(objType);
// 		collection.deleteOne({ _id: new mongodb.ObjectID(objId) }, (err, result) => {
// 			if (err) {
// 				cl('Cannot Delete', err)
// 				res.json(500, { error: 'Delete failed' })
// 			} else {
// 				cl("Deleted", result);
// 				res.json({});
// 			}
// 			db.close();
// 		});

// 	});
// });

// POST - adds user
app.post('/data/:objType', upload.single('file'), function (req, res) {
	const objType = req.params.objType;
	cl("POST for " + objType);

	const obj = req.body;
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

// PUT - updates
// app.put('/data/:objType/:id', function (req, res) {
// 	const objType 	= req.params.objType;
// 	const objId 	= req.params.id;
// 	const newObj 	= req.body;
// 	if (newObj._id && typeof newObj._id === 'string') newObj._id = new mongodb.ObjectID(newObj._id);

// 	cl(`Requested to UPDATE the ${objType} with id: ${objId}`);
// 	dbConnect().then((db) => {
// 		const collection = db.collection(objType);
// 		collection.updateOne({ _id: new mongodb. (objId) }, newObj,
// 			(err, result) => {
// 				if (err) {
// 					cl('Cannot Update', err)
// 					res.json(500, { error: 'Update failed' })
// 				} else {
// 					res.json(newObj);
// 				}
// 				db.close();
// 			});
// 	});
// });

// Basic Login/Logout/Protected assets
app.post('/login', function (req, res) {
	console.log('entered login');
	dbConnect().then((db) => {
		console.log(req.body.uName);
		console.log(req.body.password);
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

// Some small time utility functions




// function cl(...params) {
// 	console.log.apply(console, params);
// }

// Just for basic testing the socket
// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/test-socket.html');
// });