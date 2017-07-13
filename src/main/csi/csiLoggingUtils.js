var system = require('../config/systemParams.js');
var util = require('../config/util.js');
var commonNames = require('../config/commonNames.js');
var performanceTracking = require('./performaceTracking.js');
var logger = require('../config/loggingConfigurationService.js');
var WMQlogger = require('./JMSQueueAppender.js');
var interceptor = require('../filters/interceptorFilter')
var objWMQLogger = new WMQlogger.WMQHelper();
var builder = require('xmlbuilder');
var csiLog = ({

	finalizeLog : function(req, res) {

		util.methods.getAuditElements(req, res.statusCode);

		var date = new Date(req.params.START_TIME);
		var initTime = date.toISOString()
		var elapsedTime = (new Date().getTime()) - req.params.START_TIME;
		var serviceName = req.params.SERVICENAME;
		var doc = builder.create('AuditRecord').att('xmlns',
				'http://att.com/m2e/csi/logging/AuditRecord.xsd')

		doc.ele('InstanceName', system.params.INSTANCE_NAME()).up().ele(
				'ApplicationId', req.params.USER_NAME).up().ele(
				'OriginalMessageId',
				req.params[commonNames.property.CSI_MESSAGE_ID]).up().ele(
				'UniqueTransactionId',
				req.params[commonNames.property.CSI_UNIQUE_TXN_ID]).up().ele(
				'OriginatorId',
				req.params[commonNames.property.CSI_ORIGINATOR_ID]).up().ele(
				'Subject', "CW.pub.spm2." + serviceName + ".response").up()
				.ele('ConversationId',
						req.params[commonNames.property.CSI_CONVERSATION_ID])
				.up().ele('OriginationSystemId', "N/A").up()
				.ele('OriginationSystemVersion', system.params.APP_VERSION())
				.up().ele('OriginationSystemName', req.params.USER_NAME).up()
				.ele('SourceClass', "csiLoggingUtils").up().ele('SourceMethod',
						"AuditRecord").up().ele('TransactionName', serviceName)
				.up().ele('TransactionStatus', req.params.TransactionStatus)
				.up().ele('HostIPAddress', system.params.HOST_IP()).up().ele(
						'HostName', system.params.HOST_NAME()).up().ele(
						'ResponseCode', req.params.responseCode).up().ele(
						'ResponseDescription', req.params.responseDescription)
				.up().ele('InitiatedTimestamp', initTime).up().ele(
						'ElapsedTime', elapsedTime).up().ele('Mode', "N/A")
				.up().ele('ServiceKeyData1', "N/A").up().ele('ServiceKeyData2',
						"N/A").up().ele('Cluster', "N/A").up().ele('ClientApp',
						"ansc-csi-restful~N/A").up().ele('Vtier',
						system.params.VTIER()).up().ele('ClientIP',
						"0:0:0:0:0:0:0:1").up().ele('HttpMethod', req.method).up()
				.ele('RequestURL', req.params.requestURL)

		doc.end({
			pretty : true
		});

		
		
		var onRampServerList=  req.params.onRampServerList;
		var href = onRampServerList[ Math.floor(Math.random() * onRampServerList.length)];
		var match = href
				.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
		var queueName = '';
		var hostName = match[3];
		var port = match[4];
		logger.info("OnRamp URL is :" + hostName
				+ ":" + port);
		var discoveryConfigs = {
			host : hostName,
			port : port,
			onRampServerList:onRampServerList,
			href:href
		}
		performanceTracking.log.finalizePerLog(req, res, discoveryConfigs);
		var xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';

		var auditlog = (xml.toString() + doc).trim();
		logger.info("****************AuditLog****************\n\n"
				+ auditlog.toString() + "\n\n");
		logger
				.info("****************AuditLog sending to CSI****************\n\n");

		objWMQLogger.sendToWMQ(auditlog.toString(), 'Audit', discoveryConfigs);

		logger.info('Trail Log: ' + interceptor.filter.getTrailLog(req));
	}

});

module.exports.log = csiLog;