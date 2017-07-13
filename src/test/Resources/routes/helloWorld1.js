var routeConfig = ({serviceName : "helloWorld1",fromUrl : "/rest/{artifactId}/v1/helloWorld1"});

routeConfig.handleRoute = function(request, response, sequence, interceptor) {
	try {
		response.send('************* Hello World! ************* ' + Date());

		sequence.then(
				function(next) {
					interceptor.addPerfTrack(request, "EndPOINT", new Date()
							.getTime(), "I");
					next();

				})
				.then(
				function(next) {
					setTimeout(function() {
						interceptor.addPerfTrack(request, "EndPOINT",
								new Date().getTime(), "C");
						next();
					}, 5000);
				})
				.then(function(next) {
			setTimeout(function() {
				next();
			}, 10000);

		});

	} catch (e) {

		console.log(e);
		interceptor.error(req, res, e);
		//response.send('************* Error ************* ' + Date());

	}
}

module.exports.routeConfig = routeConfig;