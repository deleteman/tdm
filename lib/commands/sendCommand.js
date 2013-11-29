var twitterApi = require("../twitter");


function SendCommand(args) {
	this.destination = args[0];
	this.message = args[1];
	this.view = require("../views/sendView");
}

SendCommand.prototype.sendToTwitter = function(dest, msg, cb) {
	twitterApi.sendDM(dest, msg, cb);
};

SendCommand.prototype.run = function(cb) {
	if(this.destination != undefined && this.message != undefined) {
		this.sendToTwitter(this.destination, this.message, function(err) {
			if(err) {
				if(!Array.isArray(err)) err = [err];
				var error = { error: true, message: "There was an error while sending the message, details: \n" + err.join("\n")};
				cb(error);
			} else {
				cb(null, "Message sent!");
			}
		});
	} else {
		cb({error: true, message: "Wrong parameters, make sure you're using the app correctly:\n \
				$ tdm [destination_screen_name] \"[Message to send quoted]\"\n"});
	}
};


module.exports = SendCommand;

