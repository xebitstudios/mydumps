var assert = require('chai').assert
var should = require('chai').should()
var expect = require('chai').expect()
var util = require('../../config/util')
var pt = require('../../csi/performaceTracking')
var path = require('path')
var fs = require('fs')

describe("Performance Tracking",function(){
	it('initTrack',function(){
		var req={}
		req.params={}
		var res={}
		res.statusCode=403
		pt.log.initTrack(req,res)
		assert(req.params.PERFORMANCE!==undefined)
	})
	it('addPerfTrack',function(){
		var req={}
		req.params={}
		var res={}
		res.statusCode=403
		pt.log.initTrack(req,res)
		pt.log.addPerfTrack(req,"initial","09:52:32","start")
		
		var str=req.params.PERFORMANCE
		//console.log('pie')
		//console.log('\n\n')
		//console.log(str)
		assert(str.indexOf("|initial#09:52:32#start")>=0)
	})
	
	it('finalizePerLog',function(){
		var req={}
		req.params={}
		var res={}
		res.statusCode=403
		pt.log.initTrack(req,res)
		pt.log.addPerfTrack(req,"initial","09:52:32","start")
		pt.log.finalizePerLog(req,res)
		var str=req.params.PERFORMANCE
		//console.log(str)
		assert(str.indexOf("HostIPAddress")>=0 && str.indexOf('ClientApp')>=0)
	})
})