var assert = require('chai').assert
var should = require('chai').should()
var expect = require('chai').expect()

var chai = require('chai')

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


// assert("", "true")
// ------------------------------------------------------------------------
// Everything should be ok and return 200

describe("ok 200", function() {
	it("confirm that basic auth works correctly", function() {
		
		app
		.all(
				'/rest/demo1021/v1/**',
				function(req, response) {

					req.params.START_TIME = new Date().getTime();
					util.methods.basicAuth(req, callback);
					function callback(value) {
						
						assert(value)
					}
				});

	})
	
	
})


describe("register dme2", function() {
	it("register dme2 for ansc runner works correctly", function() {
		
		var HTTP_listen_port = (process.env.PORT && process.env.PORT >= 0) ? process.env.PORT
				: util.methods.getPort();

		logger.info("*********** Begining DME2 Registration  ***********");
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
										var webservicename = "demo1021";
										var ownerManagementGroup = "com.att.ajsc";
										var namespace = "com.att.ajsc";
										var environment = process.env['GRM_ENVIRONMENT']!==undefined ?process.env['GRM_ENVIRONMENT']: 'DEV'
										var version = "v1";
										var routeName = route.routeConfig.serviceName;
										var routeoffer = process.env['default_route_offer']!==undefined ?process.env['default_route_offer']: 'DEFAULT'
										routeMap.set(route.routeConfig.fromUrl, route);

										if (files.length === fileCount) {
											status = "done";
										}

										var ret = objDME2
												.registerDME2(
														status,
														namespace,
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
																					
																				logger.info("\n@@@@@@@@@@@     @@@.         @@        @@@@@+          @@@@@@@@@@\n"+
																							  "@@       @@     @@@@.        @@`     @@@@@@@@@        @@@@@@@@@@\n"+
																							  "@@       @@     @@@@@        @@`    +@@@`  @@@.      @@@@\n"+
																							  "@@       @@     @@'@@:       @@`    @@@      :      @@@\n"+
																							  "@@     ` @@.    @@'.@@+      @@`   .@@.            @@\n"+
																							  "@@+      @@     @@'  @@@     @@`    @@@           @@#\n"+
																							  "@@    `  @@,    @@'   @@     @@`    .@@@@         @@\n"+
																							  "@@@@@@@#@@@     @@'   +@@.   @@`       @@@@@      @@\n"+
																							  "#@@@@@@@@@@'    @@'    @@@   @@`         @@@@@    @@\n"+
																							  "@@       @@'    @@@     @@` @@@`         +@@@@     @@  \n"+
																							  "@@       @@'    @@'      @@`.@@:  .       @@@@      @@ \n"+
																							  "@@'      @@     @@'      @@@ @@`    @@@@@@@@:@       @@@@@@@@@@\n"+
																							  "@@       @@.    @@'       @@+@@`   :@@:@@:@@:@@       @@@@@@@@@@\n"+
																							  "                                                                  Version:0.0.1-SNAPSHOT");

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
	
})

		assert(true);
})