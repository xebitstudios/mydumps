var util = require('../config/util');
var commonNames= require('../config/commonNames.js');
var performanceTracking = require('../csi/performaceTracking.js');
var logger = require('../config/loggingConfigurationService.js');
var trailLogging = require('../csi/trailLogging.js');

var preInterceptor = ({

	initilize : function(req, res) {
				logger.info("INSIDE PRE");
				
				var auditLog = {};
				
				var csiUsername= req.headers[commonNames.property.CSI_UserName];
				
				if ((csiUsername == undefined || csiUsername == "") && (req.params.USER_NAME == undefined || req.params.USER_NAME == "")) {
					auditLog.userName = commonNames.property.CSI_MOCK_USER_NAME;	
				}
				else{
					auditLog.userName = req.params.USER_NAME;	
				}
				var convId = util.methods.createCSIConversationId(auditLog.userName);
				
				req.params.USER_NAME =auditLog.userName;
				
				util.methods.setRequestParams(req, commonNames.property.CSI_CONVERSATION_ID, convId);
				res.header(commonNames.property.CSI_CONVERSATION_ID, req.params[commonNames.property.CSI_CONVERSATION_ID]);

				var uniqueTransactionId = util.methods.createUniqueTransactionId();
				
				util.methods.setRequestParams(req, commonNames.property.CSI_UNIQUE_TXN_ID, uniqueTransactionId);
				
				res.header(commonNames.property.CSI_UNIQUE_TXN_ID, req.params[commonNames.property.CSI_UNIQUE_TXN_ID]);
				
				util.methods.setRequestParams(req, commonNames.property.CSI_CLIENT_DME2_LOOKUP,"");
				
				util.methods.setRequestParams(req, commonNames.property.CSI_MESSAGE_ID,util.methods.createGUID());
				
				res.header(commonNames.property.CSI_MESSAGE_ID, req.params[commonNames.property.CSI_MESSAGE_ID]);
				
				util.methods.setRequestParams(req, commonNames.property.CSI_TIME_TO_LIVE,commonNames.property.ATTR_TTL_DEFAULT);
				
				util.methods.setRequestParams(req, commonNames.property.CSI_SEQUENCE_NUMBER, "1");

				util.methods.setRequestParams(req, commonNames.property.CSI_TOTAL_IN_SEQUENCE, "1");

				var originatorId = auditLog.userName;
				
				util.methods.setRequestParams(req, commonNames.property.CSI_ORIGINATOR_ID,originatorId);
				
				util.methods.setRequestParams(req, commonNames.property.CSI_CLIENT_APP,util.methods.getClientApp()); 
				
				performanceTracking.log.initTrack(req,res);
				
				trailLogging.log.addTrailLog(req, 'Initialization', new Date().getTime());
				
	}

});

module.exports.filter = preInterceptor;