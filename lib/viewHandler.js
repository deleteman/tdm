

module.exports.show = function(err, command, data) {

	if(err) {
		return handleError(err);
	} else {
		return handleSuccess(command, data);
	}

};

function handleError(err) {
	console.log("ERROR: " + err.messsage);
}

function handleSuccess(cmd, data) {
	return cmd.view(data).render();
}