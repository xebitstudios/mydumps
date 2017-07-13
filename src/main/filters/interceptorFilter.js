var util = require('../config/util.js');
var preInterceptor = require('./preInterceptor.js');
var postInterceptor = require('./postInterceptor.js');
var commonNames = require('../config/commonNames.js');
var csi = require('../csi/csiLoggingUtils.js');
var node_framework = require('../config/computeService.js');
var performanceTracking = require('../csi/performaceTracking.js');
var logger = require('../config/loggingConfigurationService.js');
var trail = require('../csi/trailLogging.js');
var objConfig = new node_framework.objConfig();
var config = objConfig.getConfig();


var filters = ({
	handleRequest : function(req, res, routeMap) {
		var Sequence = exports.Sequence || require('sequence').Sequence, sequence = Sequence
				.create(), err;

		try {
			
			var RateLimiter = require('limiter').RateLimiter;
			//Allow 150 requests per hour (the Twitter search limit). Also understands
			//'second', 'minute', 'day', or a number of milliseconds
			console.log('config[throttleLimit] : ' + config['throttleLimit'])
			var limiter = new RateLimiter(config['throttleLimit'], 'hour');

			//Throttle requests
			
			//console.log('leo before remove tokens')
			
			limiter.removeTokens(1, function(err, remainingRequests) {
				//console.log('leo in remove tokens')
			  // err will only be set if we request more than the maximum number of
			  // requests we set in the constructor
			  
			  // remainingRequests tells us how many additional requests could be sent
			  // right this moment
			  

				var route = routeMap.get(req.url);
				req.params.SERVICENAME = route.routeConfig.serviceName;
				preInterceptor.filter.initilize(req, res);
				route.routeConfig.handleRoute(req, res, sequence, filters);
				logger.info('Trail Log: ' + filters.getTrailLog(req));
				//console.log('leo before seq')
				sequence.then(function(next) {
					logger.info("final");
					//console.log('leo inside seq')
					filters.finalizeRequest(req, res);												
				});

			});									
			
		} catch (e) {
			logger.error(e);
			
			if (String(e).indexOf('TypeError: Cannot read property')>=0) {
				res.status(404)
			}
			
			logger.info('Trail Log: ' + filters.getTrailLog(req));
			res.send("Invalid request. Please verify your request & try once again.");
			sequence.then(function(next) {
				logger.info("final");
				filters.finalizeRequest(req, res);
			});
		}
	},
	finalizeRequest : function(req, res) {

		csi.log.finalizeLog(req, res);
		// postInterceptor.filter.finalize(req, res);
	},
	addPerfTrack : function(req, type, time, status) {
		performanceTracking.log.addPerfTrack(req, type, time, status);
	},
	addTrailLog : function(req, nodeId, time) {
		trail.log.addTrailLog(req, nodeId, time);
	},
	getTrailLog : function(req) {
		return trail.log.getTrailLog(req);
	},		
	error : function(req, res, exception) {
		res.send('************* Error ************* ' + Date());
	}

});

module.exports.filter = filters;