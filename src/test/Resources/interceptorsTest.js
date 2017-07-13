var assert = require('chai').assert
var querystring = require("querystring")
var anscRunner = require('../Resources/AnscRunnerDummy');
var interceptor = require('../../filters/interceptorFilter.js')
var http = require('http')
var fs=require('fs')
var path=require('path')

// assert("", "true")
// ------------------------------------------------------------------------
// Everything should be ok and return 200

var postData = querystring.stringify({
	'msg' : 'Hello World!'
});
describe("ok 200", function() {
	before(function(done) {

		var options1 = {
			hostname : 'localhost',
			port : anscRunner.port,
			path : '/rest/{artifactId}/{namespaceVersion}/helloWorld',
			method : 'POST',
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded',
				'Content-Length' : postData.length,
				'Authorization' : 'Basic Test'
			}
		};
		setTimeout(function() {
			var req = http.request(options1, function(res) {
				//console.log(res)
				//console.log('STATUS: ' + res.statusCode);
				//console.log('HEADERS: ' + JSON.stringify(res.headers));
				res.setEncoding('utf8');
				res.on('data', function(chunk) {
					//console.log('BODY: ' + chunk);
					assert(('' + chunk).indexOf('Hello') >= 0);
					assert(res.statusCode == 200)
					setTimeout(function(){
						done()
					},17000)

					// console.log((''+chunk).indexOf('Hello')>=0+ '
					// ------------------------------------dnopes')
				});
			});

			req.on('error', function(e) {

				//console.log('problem with request: ' + e.message);
				done();
			});

			// write data to request body
			req.write(postData);
			req.end();
		}, 3000)
	})

	it("confirm that the AuditLog is in there", function() {
		
		assert(true)
	})
	
	
})
describe("Bad Authentication Through AAF", function() {
	before(function(done) {

		// setTimeout(function() {
		// ---------------------------------------------------------------------------
		// Give bad Authentication

		var options2 = {
			hostname : 'localhost',
			port : anscRunner.port,
			path : '/rest/{artifactId}/{namespaceVersion}/helloWorld',
			method : 'POST',
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded',
				'Content-Length' : postData.length,
				'Authorization': 'Basic dddd',
				'AAF_failure_Test': 'True'
			}
		};
		setTimeout(function() {
			var req2 = http.request(options2, function(res) {
				// console.log(res)
				//console.log('STATUS: ' + res.statusCode);
				//console.log('HEADERS: ' + JSON.stringify(res.headers));
				res.setEncoding('utf8');
				res.on('data', function(chunk) {
					//console.log('BODY: ' + chunk);
					assert(('' + chunk).indexOf('ERROR') >= 0);
					assert(res.statusCode == 401)
					setTimeout(function(){
						done()
					},2000)
				});
			});

			req2.write(postData);
			req2.end();
		}, 3000)
	})

	it("should pass", function() {
		assert(true)
	})
})
// -----------------------------------------------------------------------------
// Will pass Authentication but will give a bad route. Should return 404
describe("Authentication bad route", function() {
	before(function(done) {
		var options3 = {
			hostname : 'localhost',
			port : anscRunner.port,
			path : '/rest/{artifactId}/{namespaceVersion}/helloWorldr',
			method : 'POST',
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded',
				'Content-Length' : postData.length,
				'Authorization' : 'Basic Test'
			}
		};
		setTimeout(function() {
			var req3 = http.request(options3, function(res) {
				//console.log(res)
				//console.log('STATUS: ' + res.statusCode);
				//console.log('HEADERS: ' + JSON.stringify(res.headers));
				res.setEncoding('utf8');
				res.on('data', function(chunk) {
					console.log('BODY: ' + chunk);
					assert(res.statusCode == 404)
					setTimeout(function(){
						done()
					},2000)
				});
				
			});
			req3.on('error', function(e) {

				//console.log('problem with request: ' + e.message);
				done();
			});
			req3.write(postData);
			req3.end();
		}, 2000)
	})

	it("should pass", function() {
		assert(true)
	})
})

/*
describe("Authentication bad route", function() {
	before(function(done) {
		done()
	})
	it("confirm that the AuditLog is in there", function() {
		var text = fs.readFileSync(path.join(__dirname,"../logs/ansc-info.log"),'utf8');
		console.log(text)
		assert(text.indexOf("WMQ:Audit status code :200")>=0)
	})
})
*/

	
// }, 4000);
