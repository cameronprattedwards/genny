const monkey = async function() {
	var msg = await promisy();
	console.log(msg);
}

function promisy() {
	return new Promise((resolve, reject) => {
		resolve('hey hey!');
	});
}

monkey();
