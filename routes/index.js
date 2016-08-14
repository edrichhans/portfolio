var express = require('express');
var router = express.Router();
var sort = {"sort" : {"_id" : 1}};

function requireLogin (req, res, next) {
	if (!req.user) {
		res.redirect('/login');
	} else {
		next();
	}
};

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res){
	res.render('home', {title: 'Home page'});
});

//GET albumlist page
router.get('/albumlist', function(req, res){
	var db = req.db;
	var collection = db.get('albumcollection');
	collection.find({},{},function(e, docs){
		res.render('albumlist', {
			"albumList" : docs
		});
	});
});

router.all('/addimage', function(req, res, next) {
	var db = req.db;
	var users = db.get('users');
	if (req.session && req.session.user) {
		users.findOne({ email: req.session.user.email }, function(err, user) {
			if (user) {
				req.user = user;
				delete req.user.password; // delete the password from the session
				req.session.user = user;	//refresh the session value
				res.locals.user = user;
			}
			// finishing processing the middleware and run the route
			next();
		});
	} else {
		next();
	}
});

function requireLogin (req, res, next) {
	if (!req.user) {
		res.redirect('/login');
	} else {
		next();
	}
};

// GET addimage page
router.get('/addimage', requireLogin, function(req, res){			// localhost:3000/addimage 
	var db = req.db;
	var collection = db.get('albumcollection');
	collection.find({},{},function(e,docs){
		res.render('addimage',{		//render addimage.jade
			"albumList" : docs		//albumList variable
		});
	});
});

router.get('/siypporo2016', function(req, res){
	var db = req.db;
	var album = db.get("#SIYpporo");
	album.find({},sort,function(e,docs){
		res.render('SIYpporo',{		//render addimage.jade
			"imageList" : docs		//albumList variable
		});
	});
	// res.render('album');
});

router.get('/Anne', function(req, res){
	var db = req.db;
	var album = db.get("Anne Debut Photoshoot");
	album.find({},sort,function(e,docs){
		res.render('Anne',{		//render addimage.jade
			"imageList" : docs		//albumList variable
		});
	});
	// res.render('album');
});

router.get('/UPFair', function(req, res){
	var db = req.db;
	var album = db.get("UP Fair");
	album.find({},sort,function(e,docs){
		res.render('UP Fair',{		//render addimage.jade
			"imageList" : docs		//albumList variable
		});
	});
	// res.render('album');
});

router.get('/creative', function(req, res){
	var db = req.db;
	var album = db.get("Creative");
	album.find({},sort,function(e,docs){
		res.render('Creative',{		//render addimage.jade
			"imageList" : docs		//albumList variable
		});
	});
	// res.render('album');
});

router.get('/busan-jeju', function(req, res){
	var db = req.db;
	var album = db.get("Busan-Jeju");
	album.find({},sort,function(e,docs){
		res.render('Busan-Jeju',{		//render addimage.jade
			"imageList" : docs		//albumList variable
		});
	});
	// res.render('album');
});

router.get('/trinket-bar', function(req, res){
	var db = req.db;
	var album = db.get("Trinket Bar");
	album.find({},sort,function(e,docs){
		res.render('Trinket Bar',{		//render addimage.jade
			"imageList" : docs		//albumList variable
		});
	});
	// res.render('album');
});

router.get('/demo', function(req, res){
	res.render('demo', {title : "Album"});
});

router.get('/login', function(req, res){
	res.render('login');
});

router.get('/logout', function(req, res) {
	req.session.reset();
	res.redirect('/home');
});
//===================== POST STARTS HERE=====================================================
router.post('/addimage', function(req, res){
	var db = req.db;

	var imageLink = req.body.imageLink;
	var caption = req.body.caption;
	var albumName = req.body.albumName;
	var other = req.body.otherAlbumName;
	console.log("hello");
	console.log(other);
	var albumcollection = db.get("albumcollection");

	if(albumName == ""){
		albumName = other;
		albumcollection.insert({
			"name" : albumName
		});
	}

	var collection = db.get(albumName);
	
	if(imageLink.constructor === Array){
		for (var i = 0; i < imageLink.length; i++) {
			if(imageLink[i] != ""){
				collection.insert({
				"caption" : caption[i],
				"imageLink" : imageLink[i]
				});
			}
		}
	}
	else{
		if(imageLink != ""){
			collection.insert({
				"caption" : caption,
				"imageLink" : imageLink
			});
		}
	}
	res.redirect("albumlist");
});

// var authorize = function(req, res, next){
// 	if(req.session && req.session.user){
// 		next();
// 	} else {
// 		return res.send(401);
// 	}

// };

router.post('/login', function(req, res) {
	console.log("HO");
	var db = req.db;
	var users = db.get("users");
	users.findOne({"username": req.body.email }, function(err, user) {
		if (!user) {
			res.render('login', { error: 'Invalid email or password.' });
		} else {
			if (req.body.password === user.password) {
				// sets a cookie with the user's info
				req.session.user = user;
				res.redirect('/addimage');
			} else {
				res.render('login', { error: 'Invalid email or password.' });
			}
		}
	});
});

module.exports = router;
