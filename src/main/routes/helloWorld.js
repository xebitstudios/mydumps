var routeConfig = ({serviceName : "helloWorld",fromUrl : "/rest/{artifactId}/{namespaceVersion}/helloWorld"});
routeConfig.handleRoute = function(request, response, sequence, interceptor) {
	try {
		
		console.log("INSIDE ROUTE");
		
		console.log("Initializing Trailing Log");		
		interceptor.addTrailLog(request, 'Initialization', new Date().getTime());

/*		SERVICE CALL
 * sequence.then(
				function(next) {
					console.log("I");
					interceptor.addPerfTrack(request, "EndPOINT", new Date()
							.getTime(), "I");

					interceptor.addTrailLog(request, 'EndPOINT', new Date().getTime());
										
					next();

				})
				.then(
				function(next) {
					setTimeout(function() {
						console.log("C");
						interceptor.addPerfTrack(request, "EndPOINT-1",
								new Date().getTime(), "C");
						next();
					}, 5000);
					
					interceptor.addTrailLog(request, 'EndPOINT-1', new Date().getTime());					
				})
				.then(function(next) {					
					
			setTimeout(function() {
				console.log("Hello");
				next();
			}, 10000);

		}); */
		response.send('************* Hello World************* ' + Date());

	} catch (e) {

		console.log(e);
		interceptor.error(req, res, e);
		//response.send('************* Error ************* ' + Date());

	}
}

module.exports.routeConfig = routeConfig;