var assert = require('chai').assert
var should = require('chai').should()
var expect = require('chai').expect()
var util = require('../../config/util')
var csi = require('../../csi/csiLoggingUtils')
var path = require('path')
var fs = require('fs')

//Do not get sent to WMQ because system variables are not loaded. This is expected behavior.
//I lied JMSQueueAppender does. Might wanna change that
describe('csiLoggingUtilsTest', function() {
	it('finalizeLog httpcode=401', function(done) {
		var req={}
		req.params={}
		var res={}
		res.statusCode=401
		csi.log.finalizeLog(req,res)
		setTimeout(function(){
			var text = fs.readFileSync(path.join(__dirname,"../logs/ansc-info.log"),'utf8');
			assert(text.indexOf("<FaultCode>10000000005</FaultCode>")>=0 )
			done()
		}
		,50)
	});
	it('finalizeLog httpCode=403', function(done) {
		var req={}
		req.params={}
		var res={}
		res.statusCode=403
		csi.log.finalizeLog(req,res)
		setTimeout(function(){
			var text = fs.readFileSync(path.join(__dirname,"../logs/ansc-info.log"),'utf8');
			assert(text.indexOf("<FaultCode>10000000003</FaultCode>")>=0)
			done()
		},50)
	});
	it('finalizeLog httpCode=501', function(done) {
		var req={}
		req.params={}
		var res={}
		res.statusCode=501
		csi.log.finalizeLog(req,res)
		setTimeout(function(){
			var text = fs.readFileSync(path.join(__dirname,"../logs/ansc-info.log"),'utf8');
			assert(text.indexOf("<FaultCode>20000000005</FaultCode>")>=0)
			done()
		},50)
	});
	it('finalizeLog httpCode=503', function(done) {
		var req={}
		req.params={}
		var res={}
		res.statusCode=503
		csi.log.finalizeLog(req,res)
		setTimeout(function(){
			var text = fs.readFileSync(path.join(__dirname,"../logs/ansc-info.log"),'utf8');
			assert(text.indexOf("<FaultCode>20000000003</FaultCode>")>=0)
			done()
		},50)
	});
	it('finalizeLog httpCode=503', function(done) {
		var req={}
		req.params={}
		var res={}
		res.statusCode=503
		csi.log.finalizeLog(req,res)
		setTimeout(function(){
			var text = fs.readFileSync(path.join(__dirname,"../logs/ansc-info.log"),'utf8');
			assert(text.indexOf("<FaultCode>20000000003</FaultCode>")>=0)
			done()
		},50)
		
	});
	
	it('finalizeLog httpCode=4##', function(done) {
		var req={}
		req.params={}
		var res={}
		res.statusCode=453
		csi.log.finalizeLog(req,res)
		setTimeout(function(){
			var text = fs.readFileSync(path.join(__dirname,"../logs/ansc-info.log"),'utf8');
			assert(text.indexOf("<FaultCode>40000000001</FaultCode>")>=0)
			done()
		},50)
	});
	
	it('finalizeLog httpCode=500', function(done) {
		var req={}
		req.params={}
		var res={}
		res.statusCode=500
		csi.log.finalizeLog(req,res)
		setTimeout(function(){
			var text = fs.readFileSync(path.join(__dirname,"../logs/ansc-info.log"),'utf8');
			assert(text.indexOf("<FaultCode>20000000013</FaultCode>")>=0)
			done()
		},50)
	});
	
	it('finalizeLog httpCode=5090', function(done) {
		var req={}
		req.params={}
		var res={}
		res.statusCode=5090
		csi.log.finalizeLog(req,res)
		setTimeout(function(){
			var text = fs.readFileSync(path.join(__dirname,"../logs/ansc-info.log"),'utf8');
			assert(text.indexOf("<responseCode>0</responseCode>")>=0)
			done()
		},50)
	});
})