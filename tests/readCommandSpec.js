var should = require("should"),
	commands = require("../lib/commands");


describe("Read Command", function () {
	var cmd = null;
	before(function () {
		cmd = new commands.read();
	});
	describe("INBOX", function () {
		it("Should return a list of messages", function(done) {
			cmd.run(["inbox"], function(err, result) {
				result.length.should.be.above(0);
			});
		});
	});

	describe("Message", function () {
		it("Should return a single message", function(done) {
			cmd.run(["1"], function (err, msg) {
			});
		})
	});
});