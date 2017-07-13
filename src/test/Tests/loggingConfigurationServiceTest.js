/*var assert = require('chai').assert
var should = require('chai').should()
var expect = require('chai').expect()
var config = require('../../config/config')
var path = require('path')
var fs = require('fs')
var eol = require('os').EOL
var file=path.join(__dirname,"../Resources/log4js.properties")
describe("",function(){
	before("",function(done){
		text="logFilepath="+path.join(__dirname,"../logs")+eol+"info_log_name=LoggingTest.log"+eol+"error_log_name=LoggingTest_error.log"
		fs.writeFile(file,text,function(){
			config.loadPropertiesFile(file)
			process.env.unitTest="true"
			setTimeout(function(){
				done()
			},50)
		})
		
	})
	
	it("Confirm that the file has been created",function(done){
		//require.uncache('../../config/loggingConfigurationService')
		var logging = require('../../config/loggingConfigurationService')
		logging.info("Tests are tests but only when testing")
		setTimeout(function(){
			fs.readFile(path.join(__dirname,"../logs/LonggingTest.log"),"utf8",function(err,data){
				//console.log(data)
			assert(fs.lstatSync(path.join(__dirname,"../logs/LoggingTest.log")).isFile() && fs.lstatSync(path.join(__dirname,"../logs/LoggingTest_error.log")).isFile())
			done()
		})
		},50)
		
	})
	after("clean up file",function(){
		var config = require('../../config/config')
		//config.unLoadPropertiesFile("log4js.properties") //Creates an error
		//fs.unlink(path.join(__dirname,"../logs/LoggingTest.log"))
		//fs.unlink(path.join(__dirname,"../logs/LoggingTest_error.log"))
		fs.unlink(file)
		process.env.unitTest="true"
	})
})


*/