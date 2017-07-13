var fs=require("fs");
var path=require("path")
var os =require("os")


var config={};
//this will store the filenames and location. ex:config["files"][filename]=file_Location
config["files"]={};
config["watchers"]={};
//This will load the configuration file and have it be watched 
config.loadPropertiesFile=function(file){
	if(path.extname(file).toLowerCase()!==".properties") return "Please supply properties that is key=value and has the file extention .properties. "+path.basename(file)+" does not work"
	var text = fs.readFileSync(file,'utf8');
	var l=text.split(/\n|\r\n/);
	for(var i=0;i<l.length;i++){
		var key=l[i].substring(0,l[i].indexOf("=")).trim()
		var value=l[i].substring(l[i].indexOf("=")+1).trim()
		//This if is for incase of there being an empty line and if there is a comment
		if(value!==undefined && key!==undefined && key.charAt(0)!=='#')
		config[key]=value;
		
	}
	config["files"][path.basename(file)]=file;
	
	//Whenever one of the property files are changed for whatever reason it will call the refresh
	config["watchers"][path.basename(file)]=fs.watch(file, function (event, filename) {
		  if (filename) {
			
		    //logger.info(filename+" has been changed. Please make sure your configuration files that are being loaded do not have the same name" );
		    config.refresh()
		  } else { 
		    //logger.info('filename not provided because fs.watch() is not supported on this platform'+os.platform());
		  } 
		});
	
} 

config.ReadPropertyFile=function(){
	//console.log(process.env.ANSC_LOG_LOC+' pie')
	var file=(process.env.ANSC_LOG_LOC!==undefined) ? process.env.ANSC_LOG_LOC :path.join(__dirname,'log4js.properties');
	//console.log(fs.existsSync(file))
	if(!fs.existsSync(file) || !fs.lstatSync(file).isFile()){
		file=path.join(__dirname,'./log4js.properties');
		
	}
	//console.log(file)
	//config.loadPropertiesFile((process.env.AJSC_SHARED_CONFIG!==undefined) ? process.env.AJSC_SHARED_CONFIG :path.join(__dirname,'../ajsc-shared-config/etc/log4js.properties'))
	config.loadPropertiesFile(file);
	config.loadPropertiesFile(file);
	if(!path.isAbsolute(config.logFilepath)){
		config.logFilepath=path.join(path.dirname(file),config.logFilepath)
	}
}

config.loadToEnvVariables=function(file){
	if(path.extname(file).toLowerCase()!==".properties") return "Please supply properties that is key=value and has the file extention .properties. "+path.basename(file)+" does not work"
	var text = fs.readFileSync(file,'utf8');
	var l=text.split(/\n|\r\n/);
	for(var i=0;i<l.length;i++){
		var key=l[i].substring(0,l[i].indexOf("=")).trim()
		var value=l[i].substring(l[i].indexOf("=")+1).trim()
		//This if is for incase of there being an empty line and if there is a comment
		if(value!==undefined && key!==undefined && key.charAt(0)!=='#')
			process.env[key]=value;
		
	}

	
}

config.ReadSysPropertyFiles=function(){
	var file=(process.env.ANSC_CONF_HOME!==undefined) ? process.env.ANSC_CONF_HOME+path.sep+"bundleconfig-local"+path.sep+"etc"+path.sep+"sysprops" :path.join(__dirname,'sysprops/')
	if(!fs.existsSync(file) || !fs.lstatSync(file).isDirectory())file=path.join(__dirname,'../bundleconfig-local/etc/sysprops');
	config.loadPropertiesFolder(file)
	
}
//To load the folder with properties to the config object
//If you want load the properties folder to the process.env then add a second argument and specify truthy or true. See computeService for an example
config.loadPropertiesFolder=function(file){
	if(fs.existsSync(file) && fs.lstatSync(file).isDirectory()){
		var arr=fs.readdirSync(file);
		for(var i=0;i<arr.length;i++){
			if(!arguments[1])
				config.loadPropertiesFile(file+path.sep+arr[i])
			else
				config.loadToEnvVariables(file+path.sep+arr[i])
		}
	}else{
		throw Error(file+" is not a folder")
	}
}

  
//This will delete all of the old properties assigned to config execept its methods and Files
config.refresh=function(){
	//This will cycle through all the properties in config
	for(k in config){
		if(k!=="files" && k!=="loadPropertiesFile" && k!=="ReadPropertyFile" && k!=="refresh" && k!=="loadPropertiesFolder" && k!=="watchers" && k!=="ReadPropertyFile" && k!=="ReadSysPropertyFiles")			
		delete config[k];
		
	}
	//This will cycle through all of the configuration files to re-add them to config
	for(k in config["files"]){
		//console.log("config."+k+"="+config["files"][k])
		config.loadPropertiesFile(config["files"][k])
	}
}

config.unLoadPropertiesFile=function(file){
	config["watchers"][file].close();
	delete config["watchers"][file];
	delete config["files"][file];
	config.refresh();
}

//config.ReadPropertyFile();//This is going to look for the environment variable Log_Loc
//config.ReadSysPropertyFiles();
//config.loadPropertiesFile("log4js.properties")
//console.log(config.log_Name);
//config.loadPropertiesFolder("C:\\Properties_FolderANSC");
//config.unLoadPropertiesFile("")

module.exports = config;

/*
Doesn't matter where in the code you make a change to the value in the config file it will be reflected where ever you call the config properties. the require() method loads static classes in Java talk
*/