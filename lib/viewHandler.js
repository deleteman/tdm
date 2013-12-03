

module.exports.show = function(err, command, data) {
    if(err) {
	return handleError(err);
    } else {
	return handleSuccess(command, data);
    }
};

function handleError(err) {
    console.log("Error querying Twitter...");
    var errObj = JSON.parse(err.data);
    errObj.errors.forEach(function(e) {
	console.log(e.message);
    });
}

function handleSuccess(cmd, data) {
	return cmd.view(data).render();
}