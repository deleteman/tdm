var twitterApi = require("../twitter"),
    moment = require("moment");

function ReadCommand (args) {
    this.readWhat = args[0];
    if(!this.readWhat) this.readWhat = "inbox"; //by default, we read the inbox content
    this.mapping = {
        "inbox": this.readInbox
    };
    this.view = require("../views/readView.js");
}

ReadCommand.prototype.run = function(cb) {
    if(this.mapping[this.readWhat]) {
        this.mapping[this.readWhat](cb);
    } else {
        this.readMessage(this.readWhat, cb);
    }
};

ReadCommand.prototype.readInbox = function(cb) {
    var msgs = [];
    twitterApi.readInbox(function(err, result) {
        JSON.parse(result).forEach(function(msg) {
            
            msgs.push({
                id: msg.id_str,
                from: msg.sender_screen_name,
                txt: msg.text,
                date: moment(msg.created_at).format("MM/D/YYYY - h:mm:ss a")
            });
        });
        cb(err, msgs);
    });
};

ReadCommand.prototype.readMessage = function(id, cb) {
    this.view = require("../views/readMsgView.js");
    twitterApi.readMessage(id, function(err, result) {
        var msg = JSON.parse(result);
        var message = {
            id: msg.id_str,
            from: msg.sender_screen_name,
            txt: msg.text,
            date: moment(msg.created_at).format("MM/D/YYYY - h:mm:ss a")
        };

        cb(err, message);
    });
};


module.exports = ReadCommand;
