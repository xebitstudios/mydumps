var request = require('request');
var uuid = require('node-uuid');
var url = require('url');
var system = require('./systemParams.js');
var commonNames = require('./commonNames.js');
var logger = require('./loggingConfigurationService')

var methods = ({
	getPort : function() {
		var http;
		var net = require('net');
		var server = net.createServer();
		server.unref();
		server.listen(0);
		http = server.address().port;
		server.close();
		// console.log(http);

		return http;
	},
	basicAuth : function(req, authCheck) {

		var options = {
			url : process.env['AAF_BASIC_AUTH_URL'],
			headers : {
				"Authorization" : req.headers['authorization']
			}
		};

		function callback(error, response, body) {

			if (!error && response.statusCode == 200) {
				retrieveUserName(true);
			} else {
				retrieveUserName(false);
			}
		}

		request(options, callback);

		function retrieveUserName(value) {
			if (value) {
				var header = req.headers['authorization'] || '', token = header
						.split(/\s+/).pop()
						|| '', auth = new Buffer(token, 'base64').toString();
				var p = auth.indexOf(":");
				var parts = auth.split(/:/), username = parts[0], password = parts[1];
				req.params.USER_NAME = username;
				authCheck(true);
			} else {
				authCheck(false);
			}
		}

	},
	getDiscovery : function(req, callback) {
		var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
		var xhr = new XMLHttpRequest();
		var url = "";
		var DOMParser = new (require('xmldom')).DOMParser;
		var onRampServerList=[];
//		var urlList = [ 'http://aftdsu01.test.att.com',
//				'http://aftdsu02.test.att.com', 'http://aftdsu03.test.att.com',
//				'http://aftdsu04.test.att.com', 'http://aftdsu05.test.att.com' ];
		var urlList = [ 'http://aftdsp01.it.att.com',
			'http:// aftdsp02.it.att.com', 'http://aftdsp03.it.att.com',
			'http://aftdsp04.it.att.com', 'http://aftdsp05.it.att.com',
			'http://aftdsp06.it.att.com', 'http://aftdsp07.it.att.com',
			'http://aftdsp08.it.att.com', 'http://aftdsp09.it.att.com' ];	
		var randomHost = Math.floor(Math.random() * urlList.length);

		logger.info("Discovery host server:" + urlList[randomHost]);

		xhr.open('POST',
				urlList[randomHost] + ':7101/aft/discovery/service/v1', true);
	//var sr = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:reg="http://aftdiscovery.att.com/registry/v1" xmlns:tns="http://aftdiscovery.att.com/queryservice/v1"> <soap:Body> <tns:findAllMatchesRequest> <tns:name>CSILOGHTTPOnramp</tns:name> <reg:version> <reg:major>1</reg:major> <reg:minor>0</reg:minor> </reg:version> <tns:envContext>Q</tns:envContext> <tns:bindingType>http</tns:bindingType> <tns:dataContext>DirectDiscoveryOneWay</tns:dataContext><tns:filter><reg:name>NEXT</reg:name><reg:value>YES</reg:value></tns:filter></tns:findAllMatchesRequest> </soap:Body> </soap:Envelope>';
	var sr = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:reg="http://aftdiscovery.att.com/registry/v1" xmlns:tns="http://aftdiscovery.att.com/queryservice/v1"> <soap:Body> <tns:findAllMatchesRequest> <tns:name>CSILOGHTTPOnramp</tns:name> <reg:version> <reg:major>1</reg:major> <reg:minor>0</reg:minor> </reg:version> <tns:envContext>P</tns:envContext> <tns:bindingType>http</tns:bindingType> <tns:dataContext>DirectDiscoveryOneWay</tns:dataContext> <tns:filter> <reg:name>PEXT</reg:name> <reg:value>YES</reg:value> </tns:filter> </tns:findAllMatchesRequest> </soap:Body> </soap:Envelope>';
		try{
		xhr.onreadystatechange = function() {
			console.log("RESPONSE---------->"+xhr.responseText)
			if (xhr.readyState === 4 && xhr.status === 200) {
					var xml = xhr.responseText;

					var document = DOMParser.parseFromString(xml);
					var fullNodeList = document
							.getElementsByTagName("ns2:Address");
					for (i = 0; i < fullNodeList.length; i++) { 
						onRampServerList.push(fullNodeList[i].childNodes[0].nodeValue);
					}
					req.params.onRampServerList=onRampServerList;
					
					console.log("SERVERS-------------------->"+req.params.onRampServerList)
					
					callback(true)
				
			}

		};
		xhr.send(sr);
		}
		catch(e){
			console.log("Error---------------------------------------->"+ e);
			onRampServerList=null;
			methods.getDiscovery(req,callback);
		}
	},
	setRequestParams : function(req, name, defaultValue) {
		var value = req.headers[name.toLowerCase()];
		if (value == undefined || value == "") {

			req.params[name] = defaultValue;
		} else {
			req.params[name] = value;
		}
		// return req.params[name];
	},
	callRoute : function(request, response, sequence, interceptor, routeName,
			endpointLogName) {
		if (request[commonNames.property.Trail_Log] === undefined) {
			request[commonNames.property.Trail_Log] = []
			request[commonNames.property.Trail_Log]
					.push(/* trailLogging Object */)
		} else {
			request[commonNames.property.Trail_Log]
					.push(/* trailLogging Object */)
		}
		interceptor
				.addPerfTrack(request, "EndPOINT", new Date().getTime(), "I");
		return require("../routes/" + routeName).routeConfig.handleRoute(
				request, response, sequence, interceptor)
	},
	createCSIConversationId : function(partnerName) {
		return partnerName + '~CNG-CSI~' + uuid.v4();
	},
	createUniqueTransactionId : function() {
		return 'AnscCsiRestful' + process.pid + "@" + uuid.v4();
	},
	createGUID : function() {
		return uuid.v4();
	},
	getClientApp : function() {
		return "ansc-csi-restful~" + system.params.APP_NAME();
	},
	getAuditElements : function(req, httpCode) {
		try {

			// SC_UNAUTHORIZED
			if (httpCode === 401) {
				req.params.responseCode = "100";
				req.params.responseDescription = "Authorization/Authentication Failure";
				req.params.FaultTimestamp = new Date().getTime();
				req.params.FaultLevel = "ERROR";
				req.params.FaultCode = "10000000005";
				req.params.FaultDescription = "Authorization/Authentication Failure";
				req.params.ExternalFaultCode = httpCode.toString();
				req.params.ExternalFaultDescription = '<RequestError xmlns=\"http://csi.cingular.com/CSI/Namespaces/Rest/RequestError.xsd\"><ServiceException><MessageId>SVC9999</MessageId><Text>An internal error has occurred</Text></ServiceException></RequestError>';
				req.params.FaultEntity = "CSI";
				req.params.TransactionStatus = "E";

			}
			// SC_FORBIDDEN
			else if (httpCode === 403) {
				req.params.responseCode = "100";
				req.params.responseDescription = "Incomplete Credentials Provided";
				req.params.FaultTimestamp = new Date().getTime();
				req.params.FaultLevel = "ERROR";
				req.params.FaultCode = "10000000003";
				req.params.FaultEntity = "CSI";
				req.params.FaultDescription = "Incomplete Credentials Provided";
				req.params.ExternalFaultCode = httpCode.toString();
				req.params.ExternalFaultDescription = '<RequestError xmlns=\"http://csi.cingular.com/CSI/Namespaces/Rest/RequestError.xsd\"><ServiceException><MessageId>SVC9999</MessageId><Text>An internal error has occurred</Text></ServiceException></RequestError>';
				req.params.TransactionStatus = "E";

			}
			// SC_NOT_IMPLEMENTED
			else if (httpCode === 501) {

				req.params.responseCode = "200";
				req.params.responseDescription = "System Configuration Error";
				req.params.FaultTimestamp = new Date().getTime();
				req.params.FaultLevel = "ERROR";
				req.params.FaultCode = "20000000005";
				req.params.FaultEntity = "CSI";
				req.params.FaultDescription = "System Configuration Error";
				req.params.ExternalFaultCode = httpCode.toString();
				req.params.ExternalFaultDescription = '<RequestError xmlns=\"http://csi.cingular.com/CSI/Namespaces/Rest/RequestError.xsd\"><ServiceException><MessageId>SVC9999</MessageId><Text>An internal error has occurred</Text></ServiceException></RequestError>';
				req.params.TransactionStatus = "E";
			}

			// SC_SERVICE_UNAVAILABLE
			else if (httpCode === 503) {
				req.params.responseCode = "200";
				req.params.responseDescription = "A Resource Required By Service Is Not Available";
				req.params.FaultTimestamp = new Date().getTime();
				req.params.FaultLevel = "ERROR";
				req.params.FaultCode = "20000000003";
				req.params.FaultEntity = "CSI";
				req.params.FaultDescription = "A Resource Required By Service Is Not Available";
				req.params.ExternalFaultCode = httpCode.toString();
				req.params.ExternalFaultDescription = '<RequestError xmlns=\"http://csi.cingular.com/CSI/Namespaces/Rest/RequestError.xsd\"><ServiceException><MessageId>SVC9999</MessageId><Text>An internal error has occurred</Text></ServiceException></RequestError>';
				req.params.TransactionStatus = "E";
			}

			else if (400 <= httpCode && httpCode <= 499) {
				req.params.responseCode = "200";
				req.params.responseDescription = "Incorrect request";
				req.params.FaultTimestamp = new Date().getTime();
				req.params.FaultLevel = "ERROR";
				req.params.FaultCode = "40000000001";
				req.params.FaultEntity = "CSI";
				req.params.FaultDescription = "Incorrect request";
				req.params.ExternalFaultCode = httpCode.toString();
				req.params.ExternalFaultDescription = '<RequestError xmlns=\"http://csi.cingular.com/CSI/Namespaces/Rest/RequestError.xsd\"><ServiceException><MessageId>SVC9999</MessageId><Text>An internal error has occurred</Text></ServiceException></RequestError>';
				req.params.TransactionStatus = "E";
			} else if (httpCode === 500) {

				req.params.responseCode = "200";
				req.params.responseDescription = "Unknown Error Returned";
				req.params.FaultTimestamp = new Date().getTime();
				req.params.FaultLevel = "ERROR";
				req.params.FaultCode = "20000000013";
				req.params.FaultEntity = "CSI";
				req.params.FaultDescription = "Unknown Error Returned";
				req.params.ExternalFaultCode = httpCode.toString();
				req.params.ExternalFaultDescription = '<RequestError xmlns=\"http://csi.cingular.com/CSI/Namespaces/Rest/RequestError.xsd\"><ServiceException><MessageId>SVC9999</MessageId><Text>An internal error has occurred</Text></ServiceException></RequestError>';
				req.params.TransactionStatus = "E";
			} else {
				var url_parts = url.parse(req.url);
				req.params.requestURL = (url_parts.pathname).split('/rest')
						.pop()
				req.params.responseCode = "0";
				req.params.responseDescription = "Success";
				req.params.TransactionStatus = "C";

			}

		} catch (e) {
			console.log("ERROR" + e);

		}
	}

});

module.exports.methods = methods;