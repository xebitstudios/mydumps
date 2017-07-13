var https = require('https');
var path = require('path')
var fs = require('fs');
var node_framework = require('../config/computeService.js');
var logger = require('../config/loggingConfigurationService.js');
var objConfig = new node_framework.objConfig();
var config = objConfig.getConfig();

var queueCSIAuditLog = config['CSI_Audit_Log_Queue'];
var queuePerformanceLog = config['Performance_Log_Queue'];
var CSI_Audit_Log_Queue_Host = config['CSI_Audit_Log_Queue_Host'];
var Performance_Log_Queue_Host = config['Performance_Log_Queue_Host'];
var CSI_Audit_Log_Queue_PassPhrase = config['CSI_Audit_Log_Queue_PassPhrase'];
var Performance_Log_Queue_PassPhrase = config['Performance_Log_Queue_PassPhrase'];
var CSI_Audit_Log_Queue_KeyFilePath = config['CSI_Audit_Log_Queue_KeyFilePath'];
var Performance_Log_Queue_KeyFilePath = config['Performance_Log_Queue_KeyFilePath'];
var CSI_Audit_Log_Queue_CertFilePath = config['CSI_Audit_Log_Queue_CertFilePath'];
var Performance_Log_Queue_CertFilePath = config['Performance_Log_Queue_CertFilePath'];

function replaceSubstring(inSource, inToReplace, inReplaceWith) {

	var outString = inSource;
	while (true) {
		var idx = outString.indexOf(inToReplace);
		if (idx == -1) {
			break;
		}
		outString = outString.substring(0, idx) + inReplaceWith
				+ outString.substring(idx + inToReplace.length);
	}
	return outString;

}
function isAbsolute(p) {
	return path.normalize(p + '/') === path.normalize(path.resolve(p) + '/');
}

queueCSIAuditLog = replaceSubstring(queueCSIAuditLog, '^', '=');
queueCSIAuditLog = replaceSubstring(queueCSIAuditLog, '"', '');
queuePerformanceLog = replaceSubstring(queuePerformanceLog, '^', '=');
queuePerformanceLog = replaceSubstring(queuePerformanceLog, '"', '');

CSI_Audit_Log_Queue_PassPhrase = replaceSubstring(
		CSI_Audit_Log_Queue_PassPhrase, '"', '');
Performance_Log_Queue_PassPhrase = replaceSubstring(
		Performance_Log_Queue_PassPhrase, '"', '');

CSI_Audit_Log_Queue_KeyFilePath = replaceSubstring(
		CSI_Audit_Log_Queue_KeyFilePath, '"', '');
Performance_Log_Queue_KeyFilePath = replaceSubstring(
		Performance_Log_Queue_KeyFilePath, '"', '');
CSI_Audit_Log_Queue_CertFilePath = replaceSubstring(
		CSI_Audit_Log_Queue_CertFilePath, '"', '');
Performance_Log_Queue_CertFilePath = replaceSubstring(
		Performance_Log_Queue_CertFilePath, '"', '');
if (!isAbsolute(CSI_Audit_Log_Queue_KeyFilePath))
	CSI_Audit_Log_Queue_KeyFilePath = path.join(__dirname,
			CSI_Audit_Log_Queue_KeyFilePath);
if (!isAbsolute(Performance_Log_Queue_CertFilePath))
	Performance_Log_Queue_CertFilePath = path.join(__dirname,
			Performance_Log_Queue_CertFilePath);
var serverListDis=null;
var WMQHelper = function() {
};

WMQHelper.prototype.sendToWMQ = function(data, queue, discoveryConfig) {
try{
	if (config['csiEnable'] === 'false') {
		return;
	}
	var queueName = '';
	var hostName = discoveryConfig.host
	var port = discoveryConfig.port;
	serverListDis=discoveryConfig.onRampServerList;
	if (queue === 'Audit') {

		queueName = queueCSIAuditLog;

		passPhrase = CSI_Audit_Log_Queue_PassPhrase;
		keyfilepath = CSI_Audit_Log_Queue_KeyFilePath;
		certfilepath = Performance_Log_Queue_CertFilePath;

	} else {
		queueName = queuePerformanceLog;
		passPhrase = Performance_Log_Queue_PassPhrase;
		keyfilepath = CSI_Audit_Log_Queue_KeyFilePath;
		certfilepath = Performance_Log_Queue_CertFilePath;
	}

	logger.info('Sending the following data to queue: ' + queueName + ', WMQ: '
			+ data);

	var options = {
		hostname : hostName,
		port : port,
		rejectUnauthorized: false,
		path : queueName,
		method : 'POST',
		passphrase : passPhrase,
		key : fs.readFileSync(keyfilepath),
		cert : fs.readFileSync(certfilepath),

		checkServerIdentity : function(host, cert) {
			return false;
		}

	};
	// WMQ
sendData(options,data,queue,discoveryConfig)
}
catch(e){
	console.log("ERROR---------------------->"+e)
}
};

function sendData(options,data,queue,discoveryConfig){
	try{
		var req = https.request(options, function(res) {
			
		console.log ('WMQ:' + queue + ' status code :' + res.statusCode)
		logger.info('WMQ:' + queue + ' status code :' + res.statusCode);
		logger.info('WMQ:' + queue + ' headers: ' + res.headers.toString());
		
		res.setEncoding('utf8');
		res.on('data', function(chunk) {
			logger.info("body: " + chunk);
		});
		
		if (res.statusCode == "500"){
			var onRampServerList=  discoveryConfig.onRampServerList;
			var href = onRampServerList[ Math.floor(Math.random() * onRampServerList.length)];
			var match = href
					.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
			var hostName = match[3];
			var port = match[4];
			options.hostname=hostName;
			options.port=port;
			sendData(options,data,queue,discoveryConfig)
		}
		

	});
	
req.on('error', function(e) {   
		  console.log('problem with request: ' + e);
	console.log("queue+"+queue)
		  var onRampServerList= null;
	var onRampServerList1 = null;
	   onRampServerList=  discoveryConfig.onRampServerList;	
	   console.log(onRampServerList);
		onRampServerList1=  onRampServerList.filter(function(i) {
			return i != discoveryConfig.href
		});
	  console.log("onRampServerList1"+onRampServerList1);
	    var href = onRampServerList1[ Math.floor(Math.random() * onRampServerList1.length)];
		var match = href
				.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
		var hostName = match[3];
		var port = match[4];
		options.hostname=hostName;
		options.port=port;
	  
		  setTimeout(function(){
				console.log ( "Connecting to :----->"+options.hostname+":"+options.port);
			sendData(options,data,queue,discoveryConfig)
		  }, 5000); 

	  });
	 
	req.on('onerrorfunction', function(err) {
		console.log(err);
	});

	process.on('uncaughtException', function(err) {
		// console.log(err);
	});

	if (process.env.unitTest === "true") {
		req.removeListener('error', function() {
			// console.log("hope this works")
		})
	}
	req.write(data);
	req.end();
	}
	catch(e){
		console.log("ERROR SENDING DATA TO QUEUE-------->"+e)
	}
}

exports.WMQHelper = WMQHelper;