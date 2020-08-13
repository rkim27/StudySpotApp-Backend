function catchError(err, res) {
	if (err) {
		console.log('Failed: ' + err); //if query error
		res.sendStatus(500);
		return true;
	}
	return false;
}

exports.catchError = catchError;
