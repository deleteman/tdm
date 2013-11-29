var should = require("should"),
	cmdFact = require("../lib/commandFactory"),
	commands = require("../lib/commands");


describe("Command Factory", function() {
	it("Should return a valid command if it exists", function() {
		var cmd = cmdFact.getCommand(["dummy"]);
		cmd.should.be.instanceOf(commands.dummy);
	});

	it("Should return a default command if it can't find one", function() {
		var cmd = cmdFact.getCommand(["deleteman123", "test msg"]);
		cmd.should.be.instanceOf(commands.send);
	});

	it("Should pass all the required parameters to the command constructor", function() {
		var cmd = cmdFact.getCommand(["deleteman123", "test msg"]);
		cmd.destination.should.eql("deleteman123");
		cmd.message.should.eql("test msg");	
	});
});