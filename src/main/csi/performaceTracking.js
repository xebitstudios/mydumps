var system = require('../config/systemParams.js');
var util = require('../config/util.js');
var commonNames = require('../config/commonNames.js');
var logger = require('../config/loggingConfigurationService.js');
var WMQlogger = require('./JMSQueueAppender.js');

var objWMQLogger = new WMQlogger.WMQHelper();

var performanceTracking = ({

	initTrack : function(req, res) {

		var serviceName = req.params.SERVICENAME;
		if (req.params.PERFORMANCE == undefined || req.params.PERFORMANCE == "") {
			var stime = req.params.START_TIME;
			var message = "";
			try {
				var date = new Date(stime);
				var initTime = date.toISOString();
			} catch (e) {
				initTime = null;
			}

			message = message + serviceName;
			message = message + "#";
			message = message + "AJSC-CSI";
			message = message + "#";
			message = message + system.params.INSTANCE_NAME();
			message = message + "#";
			message = message
					+ req.params[commonNames.property.CSI_CONVERSATION_ID];
			message = message + "#";

			if (initTime == null)
				message = message + "";
			else
				message = message + initTime;

			message = message + "#";
			message = message + req.params.USER_NAME;
			message = message + "#";
			message = message
					+ req.params[commonNames.property.CSI_UNIQUE_TXN_ID];
			message = message + "|";
			message = message + "Main";
			message = message + "#";
			message = message + "I";
			message = message + "#";
			message = message + stime;
			message = message + "#";
			message = message + serviceName;

			req.params.PERFORMANCE = message;
		}

	},
	addPerfTrack : function(req, type, time, status) {
		var performance = null;
		performance = req.params.PERFORMANCE;

		performance = performance + "|" + type + "#" + time + "#" + status;

		req.params.PERFORMANCE = performance;

	},
	finalizePerLog : function(req, res,discoveryConfig) {

		var performance = null;
		performance = req.params.PERFORMANCE;
		performance = performance+"|Main#C#"+new Date().getTime()+"#"+req.params.SERVICENAME+ "|RecordSizes#ReqMsgSize="
				+"#RespMsgSize="
				+"#ClientDME2Lookup="
				+req.params[commonNames.property.CSI_CLIENT_DME2_LOOKUP]
				+"#ClientSentTime=null"
				+"#Cluster=" + system.params.CLUSTER() 
				+"#Vtier="+ system.params.VTIER() 
				+"#ClientApp="+ req.params[commonNames.property.CSI_CLIENT_APP] 
		        +"#Mode="
				+"#InstanceName=" + system.params.INSTANCE_NAME()
				+"#HostIPAddress=" + system.params.HOST_IP() 
				+"#HostName="+ system.params.HOST_NAME();

		if (req.params.TransactionStatus ==="E") {

			performance = performance + "#FaultEntity="
					+ req.params.FaultEntity + "#ExternalFaultCode="
					+ req.params.FaultCode + "#ExternalFaultDescription="
					+ req.params.FaultDescription;
		}
		performance = performance + "#ResponseCode=" + req.params.responseCode
				+ "#ResponseDescription=" + req.params.responseDescription;

		req.params.PERFORMANCE = performance;
		
		logger.info("***********PERFORMANCE LOG***********\n\n"+req.params.PERFORMANCE+"\n\n");
		
		logger.info("****************PERFORMANCE LOG sending to CSI****************\n\n");
		
		objWMQLogger.sendToWMQ(req.params.PERFORMANCE,'perf',discoveryConfig);
		
	}
});
module.exports.log = performanceTracking;
