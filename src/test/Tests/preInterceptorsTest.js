var assert = require('chai').assert
var should = require('chai').should()
var expect = require('chai').expect()
var preInterceptor= require('../../filters/preInterceptor.js')

describe("Interceptor Testing",function(){
it('initilize',function(){
var req={}
req.params={}
req.headers={}
var res={}
res.headers={}

res.header=function(key,value){
req.headers[key]=value
}

//console.log()

preInterceptor.filter.initilize(req,res)
//console.log(req.params.USER_NAME)
assert(req.params.USER_NAME!==undefined)
})

})