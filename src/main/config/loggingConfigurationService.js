'use strict';
var os=require('os')
var fs = require('fs');
var path = require('path');
var log4js = require('log4js');
// var dynamicConfig = require('./dynamicConfig.js');
var configpath = path.join(__dirname, 'config.js');
// This module will create folders if they haven't been created. If they already
// exist then nothing happens :D Very handy
var mkdirp = require('mkdirp');
var config = require("./config")

//the env variable unitTest is only set if we are running a unit test. Look inside interceptorsTest at the top to see it being set
if(process.env.unitTest==='true'){
	var logger={}
	
	if(config.unitTestLogFilePath===undefined || !isValidPossiblePath(config.unitTestLogFilePath)){
		config.unitTestLogFilePath=path.join(__dirname,'../test/logs')
	}
	
	var file =path.join(path.resolve(config.unitTestLogFilePath), "ansc-info.log")
	//if(var arr=fs.readdirSync(file);)
	if(fs.existsSync(file)){
		fs.unlinkSync(file)
	}
	append(file,'info')
	append(file,'warn')
	append(file,'error')
	append(file,'debug')
	append(file,'fatal')
	module.exports = logger;
	
}

var logger = {}
// *For invocationName please choose info, warn, error, fatal, or debug
function append(logFile,invocationName) {
	var file = "";
	// console.log(file);
	var dir = "";
	var logType="";

	if (!isAbsolute(path.dirname(logFile))){
		var file = path.join(__dirname, logFile)
		
	}
	else
		var file = logFile;
	if (os.type()==='Windows_NT')
		file=file.replace("/", "\\");
	else
		file=file.replace("\\", "/")
	
	var dir = path.dirname(file);
	mkdirp(dir, function(err) {
		if (err)
			console.error(err)
			// else
			// console.log('pow!')

		fs.exists(file, function(exists) {
			if (!exists) {
				fs.writeFile(file, '', function(err) {
					if (err)
						throw err;
					//console.log('Created log file: ' + file);
				});
			}
		});

	});

	// Update the logger
	log4js.loadAppender('file');
	
	//console.log(file + ' what')
	log4js.addAppender(log4js.appenders.file(file), invocationName);
	logger[invocationName+'in'] = log4js.getLogger(invocationName);
	logger[invocationName+'in'].Append=false
	logger[invocationName+'in'].setLevel('DEBUG');
	// When you call logger.info this is the acutally method thats being called.
	// This is so when you call logger.info it will put the message in the
	// ansc-info.log and
	// when you call logger.warn it will put the message in the ansc-warn.log if
	// the ansc-warn.log has been defined.
	logger[invocationName] = function(message) {
		logger[invocationName+'in'][invocationName](message)

	}
}

function isAbsolute(p) {
	return path.normalize(p + '/') === path.normalize(path.resolve(p) + '/');
}

function isValidPossiblePath(str) {
	  var code, i, len;

	  for (i = 0, len = str.length; i < len; i++) {
	    code = str.charCodeAt(i);
	    if (!(code > 47 && code < 59)  && // numeric (0-9) and :
		        !(code > 64 && code < 91)  && // upper alpha (A-Z)
		        !(code > 96 && code < 123) && // lower alpha (a-z)
		        !(code > 46 && code < 48)  && // /
		        !(code > 91 && code < 93)  && // \
		        !(code > 44 && code < 46)  && // -
		        !(code> 45 && code < 47)   && // .
		        !(code> 94 && code < 96))     // _
	        { 
	      return false;
	    }
	  }
	  return true;
	};
var infoExists=true;
var debugExists=true;
var warnExists=true;
var fatalExists=true;
var errorExists=true;

if(config.logFilepath===undefined || !isValidPossiblePath(config.logFilepath)){
	config.logFilepath=path.join(__dirname,'../logs')
}

if(config.info_log_name!==undefined){
	append(path.join(config.logFilepath,config.info_log_name), 'info')
	
}else{
	append('..'+path.sep+'logs'+path.sep+'ansc-info.log','info')
}

if(config.debug_log_name!==undefined){
	append(path.join(config.logFilepath,config.debug_log_name), 'debug')
}else{
	logger['debug'] = function(message) {
		logger['infoin']['debug'](message)
	}
}

if(config.warn_log_name!==undefined){
	append(path.join(config.logFilepath,config.warn_log_name), 'warn')
}else{
		logger['warn'] = function(message) {
			logger['infoin']['warn'](message)
		}
	}

if(config.fatal_log_name!==undefined){
	append(path.join(config.logFilepath,config.fatal_log_name), 'fatal')
}else{
	logger['fatal'] = function(message) {
		logger['infoin']['fatal'](message)
	}
}
if(config.error_log_name!==undefined){
	append(path.join(config.logFilepath,config.error_log_name), 'error')
}else{
	logger['error'] = function(message) {
		logger['infoin']['error'](message)
	}
}




module.exports = logger;