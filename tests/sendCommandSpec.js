var should = require("should"),
	commands = require("../lib/commands");


describe("Send Command", function() {


	var cmd = null,
		destination = "deleteman123",
		msg = "test";

	beforeEach(function() {
		cmd = new commands.send([destination, msg]);
	});

	it("Should try to  send the message ", function (done) {
		cmd.sendToTwitter = function(dest, message , cb) {
			dest.should.eql(destination);
			message.should.eql(msg);
			done();
		};

		cmd.run(function() {});
	});

});