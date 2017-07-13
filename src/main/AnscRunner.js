var node_framework = require('./config/computeService.js');
var logger = require('./config/loggingConfigurationService.js');
var interceptor = require('./filters/interceptorFilter.js');
var dir = require("path").join(__dirname, "routes") + '/';
var path = require('path')
var util = require('./config/util');
var fs = require('fs');
var HashMap = require('hashmap');
var objExpress = new node_framework.expressApp();
var app = objExpress.getApp();
var objDME2 = new node_framework.DME2();
var routeMap = new HashMap();
var events = require('events');
var eventEmitter = new events.EventEmitter();
eventEmitter.on('register', register)
var aaf = process.env['AAFEnabled'] !== undefined ? process.env['AAFEnabled'] : false
app.all('/rest/{artifactId}/{namespaceVersion}/**', function(req, response) {
    req.params.START_TIME = new Date().getTime();
    if (aaf == "true") {
        util.methods.basicAuth(req, authCallback);
    } else {
        req.params.USER_NAME = "ANSC";
        authCallback(true);
    }
    function authCallback(value){
    	  if (value) {
    
    		  util.methods.getDiscovery(req,callback);
    	  }
    	  else {
    		  response.status(401)
    		  response.send("**************ERROR: YOU ARE UNAUTHORIZED**************")
    	  	   }
    }
    function callback(value) {
        if (value) {
        	
            interceptor.filter.handleRequest(req, response, routeMap);
        } 
    }
});
var HTTP_listen_port = (process.env.PORT && process.env.PORT >= 0) ? process.env.PORT : util.methods.getPort();
logger.info("*********** Begining DME2 Registration  ***********");

var fileCount = 0
var status = "";
fs.readdir(dir, function(err, files) {
    if (err) throw err;
    var c = 0;

    var justFiles = []
    files.forEach(function(file) {
        
        fs.stat(path.join(dir, file), function(err, stats) {
            if (err) {
                console.log(err)
            }
            if (!stats.isDirectory()) {
                justFiles.push(path.join(dir, file))
                
                
            }
            ++c;
            if (files.length === c) {
                eventEmitter.emit('register', justFiles)
            }

        })
    })
})

 function register(files) {
	console.log(files.length +" tell me")
	console.log(files[0])
    for (var i = 0; i < files.length; i++)
    	
        (function loop(file) {
        	fileCount++;
            console.log(fileCount);
            var route = require(file);
            var webservicename = "{artifactId}";
            var ownerManagementGroup = "com.att.ajsc";
            var namespace = "{dme2_ServiceNamespace}";
            var environment = process.env['GRM_ENVIRONMENT'] !== undefined ? process.env['GRM_ENVIRONMENT'] : 'DEV'
            var version = "{namespaceVersion}";
            var routeName = route.routeConfig.serviceName;
            var routeoffer = process.env['default_route_offer'] !== undefined ? process.env['default_route_offer'] : 'DEFAULT'
            routeMap.set(route.routeConfig.fromUrl, route);
            if (files.length === fileCount) {
                status = "done";
            }
            var ret = objDME2.registerDME2(status, namespace, webservicename, environment, HTTP_listen_port, version, routeName, routeoffer, 'F', function(status, response) {
                if (status == "Success") {
                    var server = app.listen(HTTP_listen_port, function() {
                        logger.info("\n@@@@@@@@@@@     @@@.         @@        @@@@@+          @@@@@@@@@@\n" +
                            "@@       @@     @@@@.        @@`     @@@@@@@@@        @@@@@@@@@@\n" +
                            "@@       @@     @@@@@        @@`    +@@@`  @@@.      @@@@\n" +
                            "@@       @@     @@'@@:       @@`    @@@      :      @@@\n" +
                            "@@     ` @@.    @@'.@@+      @@`   .@@.            @@\n" +
                            "@@+      @@     @@'  @@@     @@`    @@@           @@#\n" +
                            "@@    `  @@,    @@'   @@     @@`    .@@@@         @@\n" +
                            "@@@@@@@#@@@     @@'   +@@.   @@`       @@@@@      @@\n" +
                            "#@@@@@@@@@@'    @@'    @@@   @@`         @@@@@    @@\n" +
                            "@@       @@'    @@@     @@` @@@`         +@@@@     @@  \n" +
                            "@@       @@'    @@'      @@`.@@:  .       @@@@      @@ \n" +
                            "@@'      @@     @@'      @@@ @@`    @@@@@@@@:@       @@@@@@@@@@\n" +
                            "@@       @@.    @@'       @@+@@`   :@@:@@:@@:@@       @@@@@@@@@@\n" +
                            "                                                                  Version:{version}");
                        logger.info('******************** ANSC - ATT NODE SERVICE CONTAINER up and running ******************** ' + Date());
                        logger.info('Server listening on:' + this.address().port);
                    });
                } else {
                    logger.info("############### ERROR: GRM END-POINT REGISTRATION FAILED ###############");
                    logger.info("RESPONSE: " + response);
                    process.exit(0);
                }
            });
        }).call(this, files[i])
}
process.on('SIGINT', function() {
    objDME2.unRegisterAllRoutes();
});