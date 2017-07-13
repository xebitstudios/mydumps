var system = require('../config/systemParams.js');
var util = require('../config/util.js');
var commonNames = require('../config/commonNames.js');
var logger = require('../config/loggingConfigurationService.js');
var JSON = require('JSON');

var trailLogging = ({

	addTrailLog : function(req, nodeId, time) {
		var trailLog = null;
		trailLog = req.params.TRAILLOG;
		
		console.log('inside addTrailLog: ' + trailLog);
		/*
		var sJSON = '[' +
			'{' +
			'"nodeId":"nodeid12345",' +
			'"time":"030000"' +
			'},' +
			'{' +
			'"nodeId":"nodeid67890",' +
			'"time":"050000"' +
			'}' +
			']';
*/
		var arrTrailNodes = null;
		if ((trailLog === undefined) || (trailLog === '')) {
			arrTrailNodes = [];
		}
		else {
			arrTrailNodes = JSON.parse(trailLog);
		}

		function trailNode(nodeid, time) {
			this.nodeId = nodeid;
			this.time = time;
		}

		var node = new trailNode(nodeId, time);
		arrTrailNodes.push(node);

		var jsonTrailLog = JSON.stringify(arrTrailNodes);

		req.params.TRAILLOG = jsonTrailLog;

	},

	getTrailLog : function(req) {				
		var trailLog = null;
		jsonTrailLog = req.params.TRAILLOG;

		var arrTrailNodes = null;
		if ((jsonTrailLog === undefined) || (jsonTrailLog === '')) {
			arrTrailNodes = [];
		}
		else {
			arrTrailNodes = JSON.parse(jsonTrailLog);
		}

	    var trailLog = '';
		var dashCount = 0;
		for (var i =0; i < arrTrailNodes.length; i++){
			if (i === 0){
				trailLog = "Details (in milliseconds): \r\n";
			}

			if (i > 0){
				if (arrTrailNodes[i-2] !== undefined) {
					if (arrTrailNodes[i].nodeId === arrTrailNodes[i - 2].nodeId) {
						dashCount = dashCount - 1;
					}
					else {
						dashCount = dashCount + 1;
					}
				}
				else {
					dashCount = dashCount + 1;
				}

				var dashes = '';
				for (var j = 0; j < dashCount; j++){
					dashes = dashes + '-';
				}
				trailLog = trailLog + " " + dashes + (arrTrailNodes[i].time - arrTrailNodes[i-1].time) + " millis for " + arrTrailNodes[i].nodeId + "\r\n";
			}
		}
		//console.log('TrailLog: ' + trailLog);
		return trailLog;
	}
});
module.exports.log = trailLogging;
