var assert = require('chai').assert
var should = require('chai').should()
var expect = require('chai').expect()
var config = require('../../config/config')
var util = require('../../config/util')
var path = require('path')
var fs = require('fs')
var system = require('../../config/systemParams.js');
describe('SystemParamsTest', function() {
	it('APP_NAME', function() {
		var t=system.params.APP_NAME()
		assert(typeof t==='string')
	});
	it('APP_VERSION', function() {
		var t=system.params.APP_VERSION()
		assert(typeof t==='string')
	});
	it('HOST_NAME', function() {
		var t=system.params.HOST_NAME()
		assert(typeof t==='string')
	});
	it('ROUTE_OFFER', function() {
		var t=system.params.ROUTE_OFFER()
		assert(typeof t==='string')
	});
	/*it('PID', function() {
		var t=system.params.PID()
		t=parseInt(t)
		assert(!isNaN(t))
	});*/
	it('INSTANCE_NAME', function() {
		var t=system.params.INSTANCE_NAME()
		assert(typeof t==='string')
	});
	it('HOST_IP', function() {
		var t=system.params.HOST_IP()
		assert(ValidateIPaddress(t))
	});
	
	it('CLUSTER', function() {
		var t=system.params.CLUSTER()
		assert(typeof t==='string')
	});
	
	it('VTIER', function() {
		var t=system.params.VTIER()
		assert(typeof t==='string')
	});
})




function ValidateIPaddress(ipaddress)   
{  
	RegE = /^\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}$/
		  if(ipaddress.match(RegE))
		   return true;
		  else
		    return false;
}  