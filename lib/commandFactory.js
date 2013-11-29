var commands = require("./commands");

var MAPPINGS = {
	dummy: commands.dummy,
	read: commands.read,
	default: commands.send
}

module.exports.getCommand = function(args) {

	var cmd = args[0];
	if(!MAPPINGS[cmd]) {
		return new MAPPINGS.default(args);
	} else {
		return new MAPPINGS[cmd](args.slice(1));
	}
};