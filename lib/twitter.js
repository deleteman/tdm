var twitter = require("simple-twitter"),
	request = require("request"),
	async = require("async"),
	_ = require("lodash"),
	qs = require("querystring"),
	fs = require("fs")
	TWITTER_KEYS = require("./twitter-keys.json");


var CONSUMER_KEY = 	TWITTER_KEYS.consumer_key;
var SECRET = TWITTER_KEYS.consumer_secret;
var REQUEST_TOKEN = "https://api.twitter.com/oauth/request_token";
var AUTHORIZE = "https://api.twitter.com/oauth/authorize";
var ACCESS_TOKEN = "https://api.twitter.com/oauth/access_token";

var HOMEDIR = process.env[(process.platform == 'WIN32') ? 'USERPROFILE' : 'HOME']; 
var TDM_FOLDER = ".tdm";

module.exports.getAuthURL = function (cb) {
	var oauth = {
		consumer_key: CONSUMER_KEY,
		consumer_secret: SECRET,
		callback: "oob"
	};
	request.post({
		oauth: oauth,
		url: REQUEST_TOKEN
	}, function (error, rsp, body) {
		var auth_tokens = qs.parse(body);
		var url = AUTHORIZE + "?oauth_token=" + auth_tokens.oauth_token;
		cb(url, auth_tokens.oauth_token);
	} )
}

module.exports.getAccessToken = function(token, pin, cb) {
	var oauth = {
		consumer_secret: SECRET,
		consumer_key: CONSUMER_KEY,
		token: token,
		verifier: pin
	};

	request.post({
		oauth: oauth,
		url: ACCESS_TOKEN
	}, function  (error, rsp, body) {
		var params = qs.parse(body);
		saveConfig(params);
		cb(params);
	});
};

module.exports.readInbox = function(cb) {
	loadConfigData(function(err, data) {
		var oauth = JSON.parse(data);
		twitter = new twitter(CONSUMER_KEY, SECRET, oauth.oauth_token, oauth.oauth_token_secret);
		twitter.get('direct_messages', cb);
	});
};

module.exports.readMessage = function(id, cb) {
	loadConfigData(function(err, data) {
		var oauth = JSON.parse(data);
		twitter = new twitter(CONSUMER_KEY, SECRET, oauth.oauth_token, oauth.oauth_token_secret);
		twitter.get('direct_messages/show', "?id=" + id, cb);
	});
};

function saveConfig(params) {

    if(!fs.existsSync(HOMEDIR + "/" + TDM_FOLDER)) {
	fs.mkdir(HOMEDIR + "/" + TDM_FOLDER);
    }
    fs.writeFileSync(HOMEDIR + "/" + TDM_FOLDER + "/user-config.json", JSON.stringify(params));
}

module.exports.sendDM = function (destination_username, msg, cb) {

	var msgParts = msg.match(/.{1,140}/g);

	if(msgParts.length > 1) {
		console.log("Message too long, sending it in " + msgParts.length + " individual messages...");
	}

	loadConfigData(function(err, data) {
		var oauth = JSON.parse(data);
		twitter = new twitter(CONSUMER_KEY, SECRET, oauth.oauth_token, oauth.oauth_token_secret);
		var callQueue = [];
		var errors = [];
		msgParts.forEach(function(msgPart) {
			callQueue.push(getSendMsgFunction(msgPart, destination_username));
		});
		sendThemAll(callQueue, cb);
	});
	
};

function loadConfigData(cb) {
    var folder = HOMEDIR + "/" + TDM_FOLDER;
    fs.readFile(folder + '/user-config.json', cb);
}
/**
Sends all the parts sequentially to assure the order is maintained
*/
var sendThemAll = function (callQueue, cb) {
	async.series(callQueue, function(err, results) {
		results = _.compact(results);
		if(results.length > 0) {
			parseErrors(results, cb);
		} else {
			cb();
		}
	});
};


function getSendMsgFunction(msg, to) {
	return function(callback) {
				twitter.post('direct_messages/new', {'text': msg, 'screen_name': to}, function(err, data) {
					callback(null, err);
				});
			};
}

function parseErrors(errors, cb) {
	var errorMsgs = [];
	errors.forEach(function(err) {
		if(err) {
			JSON.parse(err.data).errors.forEach(function(msg) {
				errorMsgs.push(msg);
			});
		}
	});
	cb(errorMsgs);
}

