

module.exports = function(data) {
	return {
		render: function() {
			console.log("--- [ Message from: " + data.from + " on " + data.date + " ] ---");
			console.log(data.txt);
		}
	};
};