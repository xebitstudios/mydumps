var routeConfig = ({serviceName : "helloWorld",fromUrl : "/rest/{artifactId}/v1/helloWorld"});
routeConfig.handleRoute = function(request, response, sequence, interceptor) {
	try {
		
		console.log("INSIDE ROUTE");
		sequence.then(
				function(next) {
					console.log("I");
					interceptor.addPerfTrack(request, "EndPOINT", new Date()
							.getTime(), "I");
					next();

				})
				.then(
				function(next) {
					setTimeout(function() {
						console.log("C");
						interceptor.addPerfTrack(request, "EndPOINT",
								new Date().getTime(), "C");
						next();
					}, 5000);
				})
				.then(function(next) {
			setTimeout(function() {
				console.log("Hello");
				next();
			}, 10000);

		});
		response.send('************* Hello Ram! ************* ' + Date());

	} catch (e) {

		console.log(e);
		interceptor.error(req, res, e);
		//response.send('************* Error ************* ' + Date());

	}
}

module.exports.routeConfig = routeConfig;