var assert = require('chai').assert
var should = require('chai').should()
var expect = require('chai').expect()
var util = require('../../config/util')
var tl = require('../../csi/trailLogging')
var path = require('path')
var fs = require('fs')

describe("Trail Logging",function(){
	it('initTrailLog',function(){
		var req={}
		req.params={}
		tl.log.addTrailLog(req, 'Initialization', new Date().getTime())
		var str=req.params.TRAILLOG
		console.log('UnitTestConsoleLog initTrailLog req.params.TRAILLOG : ' + str)
		console.log('UnitTestConsoleLog indexof initialization: ' + str.indexOf("Initialization"))
		assert(str.indexOf("Initialization") !== -1)
	})
	it('addTrailLog',function(){
		var req={}
		req.params={}
		tl.log.addTrailLog(req, 'Initialization', new Date().getTime())
		tl.log.addTrailLog(req, 'EndPOINT', new Date().getTime())
		
		var str=req.params.TRAILLOG
		console.log('UnitTestConsoleLog addTrailLogChild req.params.TRAILLOG : ' + str)
		console.log('UnitTestConsoleLog indexof initialization: ' + str.indexOf("Initialization"))
		var posTimeInitialization = str.indexOf("time")
		console.log('UnitTestConsoleLog indexof posTimeInitialization: ' + posTimeInitialization)
		var strTimeFirstNode = str.substring(posTimeInitialization + 5);
		var posTimeFirstNode = strTimeFirstNode.indexOf("time")
		console.log('UnitTestConsoleLog indexof posTimeFirstNode after substring: ' + posTimeFirstNode)
		assert(str.indexOf("Initialization") !== -1)
		assert(posTimeInitialization !== -1)	
		assert(posTimeFirstNode !== -1)
	})
	
	it('addTrailLogChild',function(){
		var req={}
		req.params={}
		tl.log.addTrailLog(req, 'Initialization', new Date().getTime())
		tl.log.addTrailLog(req, 'EndPOINT', new Date().getTime())
		tl.log.addTrailLog(req, 'EndPOINT-1', new Date().getTime())
		var str=req.params.TRAILLOG
		console.log('UnitTestConsoleLog addTrailLogChild req.params.TRAILLOG : ' + str)
		console.log('UnitTestConsoleLog indexof initialization: ' + str.indexOf("Initialization"))
		var posTimeInitialization = str.indexOf("time")
		console.log('UnitTestConsoleLog indexof posTimeInitialization: ' + posTimeInitialization)
		var strTimeFirstNode = str.substring(posTimeInitialization + 5);
		var posTimeFirstNode = strTimeFirstNode.indexOf("time")
		console.log('UnitTestConsoleLog indexof posTimeFirstNode after substring: ' + posTimeFirstNode)
		var strTimeSecondNode = str.substring(posTimeFirstNode+5);
		var posTimeSecondNode = strTimeSecondNode.indexOf("time")
		console.log('UnitTestConsoleLog indexof posTimeSecondNode after substring: ' + posTimeSecondNode)		
		assert(str.indexOf("Initialization") !== -1)
		assert(posTimeInitialization !== -1)	
		assert(posTimeFirstNode !== -1)
		assert(posTimeSecondNode !== -1)

	})
})