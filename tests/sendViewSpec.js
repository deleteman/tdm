var should = require("should"),
	commands = require("../lib/commands/"),
	vh = require("../lib/viewHandler");

describe("Send View", function() {

	var send = null;
	before(function() {
		send = new commands.send([]);
	});

	it("Should try to render the text passed on a correct message", function(done) {
		var tmp = console.log;
		console.log = function(txt) {
			txt.should.eql("Test");
			console.log = tmp;
			done();
		};
		vh.show(null, send, "Test");
	});

	it("Should try to render error messages if the send fails", function(done) {
		var tmp = console.log;
		console.log = function(txt) {
			txt.should.eql("Error");
			console.log = tmp;
			done();
		};
		vh.show([{error: true, message: "Error"}], send, null);
	});
});