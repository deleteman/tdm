var twitter = require("simple-twitter"),
	request = require("request"),
	qs = require("querystring"),
	fs = require("fs");


var CONSUMER_KEY = "";
var SECRET = "";
var REQUEST_TOKEN = "https://api.twitter.com/oauth/request_token";
var AUTHORIZE = "https://api.twitter.com/oauth/authorize";
var ACCESS_TOKEN = "https://api.twitter.com/oauth/access_token";

var NEW_DM = "https://api.twitter.com/1.1/direct_messages/new.json";

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
	})
};

function saveConfig(params) {
	fs.writeFileSync("user-config.json", JSON.stringify(params));
}

module.exports.sendDM = function (oauth, msg) {
	fs.readFile('user-config.json', function(data) {
		var oauth = JSON.parse(data);
		twitter = new twitter(CONSUMER_KEY, SECRET, oauth.oauth_token, oauth.oauth_token_secret);
		twitter.post('direct_messages/new', {'text': "Test!", 'screen_name': 'deleteman123'});
	})
};
