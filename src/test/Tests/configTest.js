var assert = require('chai').assert
var config = require('../../config/config')
var cNames= require('../../config/commonNames')
var path= require('path')
var fs= require('fs')
describe('ConfigTest', function(){
    it('should return some text', function() {
        config.ReadPropertyFile()
        assert(config.info_log_name==="ansc-info.log")
        
        
    });
    
    it('Read from log.properties file', function() {
        config.ReadPropertyFile()
        assert(config.info_log_name==="ansc-info.log")
        
        
    });
    
    it('loadProertiesfile',function(){
    	config.loadPropertiesFile(path.join(__dirname,'../Resources/prop.properties'))
    	assert(config.test1==="test")
    })
    it('loadPropertiesFolder',function(){
    	config.loadPropertiesFolder(path.join(__dirname,'../Resources/propertiesFolder'))
    	assert(config.propertiesFolderTest==='true')
    	assert(config.propertiesFolderTest2===undefined)
    })

     it('unLoadPropertiesFile',function(){
    	config.loadPropertiesFile(path.join(__dirname,'../Resources/unload.properties'))
    	assert(config.unloadtest1==='test1')
    	config.unLoadPropertiesFile('unload.properties')
    	assert(config.unloadtest1===undefined)
    })
    
    /*it('refresh',function(done){
    	config.loadPropertiesFile(path.join(__dirname,'../Resources/prop.properties'))
    	var text = fs.readFileSync(path.join(__dirname,'../Resources/prop.properties'), "utf8")				
    	fs.appendFile(path.join(__dirname,'../Resources/prop.properties'), '\nrefreshTest=true', function (err) {
    		assert(config.refreshTest==='true')
    		fs.unlink(path.join(__dirname,'../Resources/prop.properties'))
    		fs.writeFile(path.join(__dirname,'../Resources/prop.properties',text))
    		setTimeout(function(){done()},500)
    		
    	});
    })*/
    
    
})

