var assert = require('chai').assert
var should = require('chai').should()
var expect = require('chai').expect()
var compute = require('../../config/computeService')
var express= new require("express")
var path = require('path')
var fs = require('fs')

describe("ComputeServiceTest",function(){
	it("Confirm config is set",function(){
		var config=(new compute.objConfig()).getConfig()
		assert(config!==undefined)
	})
	it("Confirm app is created",function(){
		var app=(new compute.expressApp()).getApp();
		// The real test is that an error isn't thrown when the get method is called
		app.get("/",function(req,res){
			
		})
		assert(app!==undefined) 
	})
	it("confirm DME2Helper is returned",function(){
		var dme2=new compute.DME2()
		//console.log(dme2.registeredCount)
		assert(dme2.registeredCount===0)
	})
})
