var express = require('express');
var app = express();
var config = require('./config.js');
//This will load the log.properties file
config.ReadPropertyFile();
//This will load every property file inside of the appprops/sysprops folder

config.loadPropertiesFolder(require('path').join(__dirname,'../bundleconfig/appprops'));
config.loadPropertiesFolder((require('path').join(__dirname,'../bundleconfig/sysprops')),true) // Second argument means that these properties files will be loaded into env variables

var expressApp = function(){
	
	};

	expressApp.prototype.getApp = function(){
		return app;
	};
exports.expressApp = expressApp;

var objConfig = function(){
};
objConfig.prototype.getConfig = function(){
	return config;
};
exports.objConfig = objConfig;


var objDME2 = require('./DME2Helper.js');

exports.DME2 = objDME2.DME2;


//var objAuditLogXML = require('./AuditLogXMLBuilder.js');

//exports.AuditLogXML = objAuditLogXML.AuditLogXML;

