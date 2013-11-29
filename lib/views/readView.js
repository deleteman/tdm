
function truncateMsg(msg) {

	if(msg.length > 30) {
		return msg.substring(0, 30) + "...";
	} else {
		return msg;
	}
}

module.exports = function(data) {
	return {
		render: function() {
			console.log("--- [ Inbox ](last 20 messages) ---");
			data.forEach(function(msg) {
				console.log("[" + msg.id + "] FROM: " + msg.from + " - " + msg.date +  " - " + truncateMsg(msg.txt));
			});
			console.log("\n To read the full content of a message, do: `tdm read ID` (where ID is the first number shown above)");
		}
	};
};