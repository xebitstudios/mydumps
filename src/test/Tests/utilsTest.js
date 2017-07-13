var assert = require('chai').assert
var should = require('chai').should()
var expect = require('chai').expect()
var config = require('../../config/config')
var util = require('../../config/util')
var path = require('path')
var fs = require('fs')
var system = require('../../config/systemParams.js');
describe('utilsTest', function() {
	it('getport', function() {
		assert(!isNaN(util.methods.getPort()))
	});
	
	it(	'basicAuth',function(done) {
		var req = {}
		req.headers = {}
		req.headers['authorization'] = 'Basic bTY0MTI5QGNzcC5hdHQuY29tOmY3dzdzMnE5aTI'
		util.methods.basicAuth(req, callback)
		function callback(value) {
			assert(!value)
			done()
		}
	})
	it('setRequestParams', function() {
		var req={}
		req.params={}
		req.headers={}
		util.methods.setRequestParams(req,"tester","value")
		assert(req.params.tester==="value")
		//expect(req.params).to.have.property('tester')
	});
	it('createCSIConversationId',function(){
		var t=util.methods.createCSIConversationId()
		assert(typeof t==='string')
	})
	it('createCSIConversationId',function(){
		var t=util.methods.createCSIConversationId("name")
		assert(typeof t==='string')
	})
	it('createUniqueTransactionId',function(){
		var t=util.methods.createUniqueTransactionId("name")
		assert(typeof t==='string')
	})
	it('createGUID',function(){
		var t=util.methods.createGUID("name")
		assert(typeof t==='string')
	})
	it('getClientApp',function(){
		var t=util.methods.getClientApp()
		assert(t=== "ansc-csi-restful~" + system.params.APP_NAME())
	})
})

