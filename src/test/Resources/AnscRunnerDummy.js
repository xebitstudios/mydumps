var node_framework = require('../../config/computeService.js');
var logger = require('../../config/loggingConfigurationService.js');
var interceptor = require('../../filters/interceptorFilter.js');
var dir = require("path").join(__dirname, "routes") + '/';
var util = require('../../config/util');
var fs = require('fs');
var HashMap = require('hashmap');

var objExpress = new node_framework.expressApp();
var app = objExpress.getApp();
var objDME2 = new node_framework.DME2();
var routeMap = new HashMap();

app
		.all(
				'/rest/{artifactId}/{namespaceVersion}/**',
				function(req, response) {

					req.params.START_TIME = new Date().getTime();
					if(req.headers["AAF_failure_Test"]==="True"){
						util.methods.basicAuth(req, callback);
						function callback(value) {
							if (value) {
								interceptor.filter.handleRequest(req, response,
										routeMap);

							} else {
								response.status(401)
								response
										.send("**************ERROR: YOU ARE UNAUTHORIZED**************")

							}
						}
					}else{
						if(req.headers['authorization']==="Basic Test") {
							interceptor.filter.handleRequest(req, response,
									routeMap);

						} else {
							response.status(401)
							response
									.send("**************ERROR: YOU ARE UNAUTHORIZED**************")

						}
					}
				});
var HTTP_listen_port = (process.env.PORT && process.env.PORT >= 0) ? process.env.PORT
		: util.methods.getPort();

console.log("*********** Begining DME2 Registration  ***********");
fs
		.readdir(
				dir,
				function(err, files) {
					if (err)
						throw err;
					var c = 0;
					var status = "";
					files
							.forEach(function(file) {
								var fileCount = ++c;
								console.log(fileCount);
								var route = require(dir + file);
								var webservicename = "{service}";
								var ownerManagementGroup = "com.att.ajsc";
								var namespace = "{dme2_ServiceNamespace}";
								var environment = "{environment}";
								var version = "{namespaceVersion}";
								var routeName = route.routeConfig.serviceName;
								var routeoffer = "{routeOffer}";
								routeMap.set(route.routeConfig.fromUrl, route);

								if (files.length === fileCount) {
									status = "done";
								}

								var ret = objDME2
										.registerDME2(
												status,
												ownerManagementGroup,
												webservicename,
												environment,
												HTTP_listen_port,
												version,
												routeName,
												routeoffer,
												'F',
												function(status, response) {

													if (status == "Success") {
														var server = app
																.listen(
																		HTTP_listen_port,
																		function() {

																			logger
																					.info('******************** ANSC - ATT NODE SERVICE CONTAINER up and running ******************** '
																							+ Date());

																			logger
																					.info('Server listening on:'
																							+ this
																									.address().port);

																		});
													} else {
														logger
																.info("############### ERROR: GRM END-POINT REGISTRATION FAILED ###############");
														logger
																.info("RESPONSE: "
																		+ response);
														process.exit(0);
													}
												});
							});
				});
process.on('SIGINT', function() {
	objDME2.unRegisterAllRoutes();
});

exports.port = HTTP_listen_port
setTimeout(function() {
	objDME2.unRegisterAllRoutes();

}, 25000);