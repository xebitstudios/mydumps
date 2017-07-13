var logger=require('./loggingConfigurationService')

var DME2 = function(){
	this.registered={};
	this.registeredCount=0;
};
//soapRequest is the actually soap request we would send to Grm to unregister the endpoint
//registered is a boolean value to determine if the endpoint is still registered
var Registered= function(soapRequest,isRegistered){
	this.SoapRequestUnRegister=soapRequest;
	this.isRegistered=isRegistered;
}
Registered.prototype.stuff=function(){
	//console.log(this.SoapRequestUnRegister);
}


DME2.prototype.registerDME2 = function(status,namespace, webservicename, environment, port, webserviceversion, webservicerestaction, routeoffer, bRest,callback){
	
	logger.info('Registering DME2 Service: ' + webservicerestaction);
	
	var hostname = getHostName();			   	
	if (webservicename !== null){

		//register with grm here
		var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
		var xhr = new XMLHttpRequest();

		//var xmlhttp = new XMLHttpRequest();
		xhr.open('POST', 'http://scldgrmt01.test.att.com:8001/GRMService/v1/', true);
		
		//Content-Type: text/xml; charset=utf-8 
		
		// build SOAP request
		var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v1="http://scld.att.com/grm/v1" xmlns:v11="http://scld.att.com/grm/types/v1"><soapenv:Header><wsse:Security xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"><wsse:UsernameToken><wsse:Username>m71364</wsse:Username><wsse:Password>m71364</wsse:Password></wsse:UsernameToken></wsse:Security></soapenv:Header><soapenv:Body><v1:addServiceEndPointRequest><v11:env>' + environment + '</v11:env><v1:serviceVersionDefinition><v11:name>' + namespace + '.' + webservicename +'-'+webserviceversion+ '/rest/'+webservicename +'/'+webserviceversion+'/'+ webservicerestaction + '</v11:name><v11:version major="1" minor="0" patch="0"/></v1:serviceVersionDefinition><v1:serviceEndPoint><v11:name>' + namespace + '.' + webservicename +'-'+webserviceversion+ '/rest/'+webservicename +'/'+webserviceversion+'/'+ webservicerestaction +'</v11:name><v11:version major="1" minor="0" patch="0"/><v11:hostAddress>' + hostname + '</v11:hostAddress><v11:listenPort>' + port + '</v11:listenPort><v11:latitude>37.536413</v11:latitude><v11:longitude>-122.245536</v11:longitude><v11:contextPath>/' + webservicerestaction + '</v11:contextPath><v11:routeOffer>' + routeoffer + '</v11:routeOffer></v1:serviceEndPoint><v1:lrmRef><v11:hostAddress>' + hostname + '</v11:hostAddress><v11:listenPort>7200</v11:listenPort></v1:lrmRef><v1:checkNcreateParents>true</v1:checkNcreateParents></v1:addServiceEndPointRequest></soapenv:Body></soapenv:Envelope>';
		var unregisterSr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 	xmlns:v1="http://scld.att.com/grm/v1" xmlns:v11="http://scld.att.com/grm/types/v1"><soapenv:Header><wsse:Security	xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"	xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"><wsse:UsernameToken><wsse:Username>m71364</wsse:Username><wsse:Password>m71364</wsse:Password></wsse:UsernameToken></wsse:Security></soapenv:Header><soapenv:Body><v1:deleteServiceEndPointRequest><v11:env>' + environment + '</v11:env><v1:serviceEndPoint><v11:name>'+ namespace + '.' + webservicename +'-'+webserviceversion+ '/rest/'+webservicename +'/'+webserviceversion+'/'+ webservicerestaction +'</v11:name><v11:version major="1" minor="0" patch="0" /><v11:hostAddress>' + hostname + '</v11:hostAddress><v11:listenPort>' + port + '</v11:listenPort><v11:latitude>37.536413</v11:latitude><v11:longitude>-122.245536</v11:longitude><v11:contextPath>/' + webservicerestaction + '</v11:contextPath><v11:routeOffer>' + routeoffer + '</v11:routeOffer></v1:serviceEndPoint></v1:deleteServiceEndPointRequest></soapenv:Body></soapenv:Envelope>';
		
		var currentCount=this.registeredCount;
		this.registeredCount=this.registeredCount+1;
		var reg=new Registered(unregisterSr, false);
		this.registered[currentCount]=reg;
		
		
		
		
		  xhr.onreadystatechange = function () {
//			  console.log('sr: ' + sr)
//			  console.log('xhr response text: ' + xhr.responseText);
		    if (xhr.readyState === 4) {
		        if (xhr.status === 200) {	
		        	reg.isRegistered=true;
		          		if(status=="done"){
		    			callback("Success");
		    		}
		    		logger.info('Successfully registered DME2 Service: ' + webservicerestaction);
		        }
		        else{
		        	logger.error("############### ERROR: GRM END-POINT REGISTRATION FAILED for route :"+webservicerestaction+" ###############");
		        	logger.error("############### ANSC stopped ###############");
		        	process.exit(0);
		        }
		    }
		    
		};
		// Send the POST request
		xhr.setRequestHeader('Content-Type', 'text/xml');
		var sresp = xhr.send(sr);
		
		// send request
		// ...


		
		
		//var opts = {stdio: 'inherit'} ;
		//var exec = require('child_process').execSync;
		//var stdout = exec('java -Dnode-service-name=' + webservicename + ' -DnameSpace=' + namespace + ' -Daction=' + webservicerestaction + ' -Dnodeenv=' + environment + ' -Dhostname=' + hostname + ' -Dport=' + port + ' -Dversion=' + webserviceversion + ' -DrouteOffer=' + routeoffer + ' -Drest=' + bRest + ' -cp "AOPcontainer/java-libs/*" RegisterNodeWebService ', opts);
		
		//console.log('Successfully registered DME2 Service: ' + this.ServiceName);						
	}						
};

DME2.prototype.unRegisterAllRoutes=function(){
	setTimeout(function(){
		loop()
	}, 2000)
	var allUnregistered=false;
	var count=this.registeredCount-1;
	var dme2=this;
	function loop(){
			if(count>=0){
				dme2.registered[count].unRegisterDME2();
				count=count-1;
				loop();
			}
			else{
				setTimeout(function(){
					if(!dme2.anyRegistered()){
						//Incase we are running a unit test we don't want to exit
						if(process.env.unitTest!=='true'){
							process.exit();
						}
					}
					else{loop()}
				},2000);
			}
		
		}
		
	
	//dme2.registered[0].unRegisterDME2();
	//dme2.registered[1].unRegisterDME2();
	//loop();
	//  C:\Users\bp306u\workspace_outOfMemory\TestO\target\swm\package\nix\dist_files\opt\app\com.att.ansc\TestO\0.0.1-SNAPSHOT
	
}
 
DME2.prototype.anyRegistered=function(){
	
	var dme2=this;
	var count =dme2.registeredCount-1;
	function loop(someNum){
		if(someNum<0){
			return false;
		}
		if(dme2.registered[someNum].isRegistered){
			return true;
		}
		
		loop(someNum-1);
	}
	
	loop(count);
	
}

Registered.prototype.unRegisterDME2 = function(){
	
	
	var hostname = getHostName();			   	
	

		//register with grm here
		var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
		var xhr = new XMLHttpRequest();

		//var xmlhttp = new XMLHttpRequest();
		xhr.open('POST', 'http://scldgrmt01.test.att.com:8001/GRMService/v1/', true);

		//Content-Type: text/xml; charset=utf-8

		// build SOAP request
		var sr = this.SoapRequestUnRegister; //'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 	xmlns:v1="http://scld.att.com/grm/v1" xmlns:v11="http://scld.att.com/grm/types/v1"><soapenv:Header><wsse:Security	xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"	xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"><wsse:UsernameToken><wsse:Username>m71364</wsse:Username><wsse:Password>m71364</wsse:Password></wsse:UsernameToken></wsse:Security></soapenv:Header><soapenv:Body><v1:deleteServiceEndPointRequest><v11:env>' + environment + '</v11:env><v1:serviceEndPoint><v11:name>' + namespace + '.' + webservicename + '/'	+webservicerestaction + '</v11:name><v11:version major="1" minor="0" patch="0" /><v11:hostAddress>' + hostname + '</v11:hostAddress><v11:listenPort>' + port + '</v11:listenPort><v11:latitude>37.536413</v11:latitude><v11:longitude>-122.245536</v11:longitude><v11:contextPath>/' + webservicerestaction + '</v11:contextPath><v11:routeOffer>' + routeoffer + '</v11:routeOffer></v1:serviceEndPoint></v1:deleteServiceEndPointRequest></soapenv:Body></soapenv:Envelope>';
		  xhr.onreadystatechange = function () {
			  //console.log('sr: ' + sr)
			//  console.log('xhr response text: ' + xhr.responseText);
		    if (xhr.readyState === 4) {
		        if (xhr.status === 200) {

		            logger.info('Unregister GRM Endpoint');
		        }
		    }
		};
		// Send the POST request
		xhr.setRequestHeader('Content-Type', 'text/xml');
		var sresp = xhr.send(sr);
		//console.log('Response is: ' + sresp);
		// send request
		// ...
		
	
		//This will check the ready state of the xml request. If it does not come back as 4( 4= request finished and response is ready) then it'll 
		//go to the goToCheck which will wait 1 second then go to check again. Once we confirm the ready state is 4 the process will end
		//function check(WebServies){
		function check(){

			if(xhr.readyState!==4){
				goToCheck();	
				
		}
			else{
				logger.info('Successfully unregistered DME2 a Service' );
				//process.exit();
				this.isRegistered=false;
				
			}
		}
		function goToCheck(){
			setTimeout(function(){
				check();
			},1000)
		}
		
		check();
			
		//var opts = {stdio: 'inherit'} ;
		//var exec = require('child_process').execSync;
		//var stdout = exec('java -Dnode-service-name=' + webservicename + ' -DnameSpace=' + namespace + ' -Daction=' + webservicerestaction + ' -Dnodeenv=' + environment + ' -Dhostname=' + hostname + ' -Dport=' + port + ' -Dversion=' + webserviceversion + ' -DrouteOffer=' + routeoffer + ' -Drest=' + bRest + ' -cp "AOPcontainer/java-libs/*" RegisterNodeWebService ', opts);
								
};


DME2.prototype.callDME2NodeWebService = function(namespace, webservicename, environment, webserviceversion, webservicerestaction, routeoffer, bRest){
	logger.info('Running DME2 Web Service: ' + webservicename);
			
	
	if (webservicename !== null){
		var opts = {stdio: 'inherit'} ;
		var exec = require('child_process').execSync;
		var stdout = exec('java -Dnode-service-name=' + webservicename + ' -DnameSpace=' + namespace + ' -Daction=' + webservicerestaction + ' -Dnodeenv=' + environment + ' -Dversion=' + webserviceversion + ' -DrouteOffer=' + routeoffer + ' -Drest=' + bRest + ' -cp "commonLibs/*" RunDME2NodeWebService ', opts);												
				
		logger.info('Successfully ran DME2 Web Service: ' + webservicename);
	}				
};

exports.DME2 = DME2;


function getHostName() {
	var os =require('os')
	return os.hostname();/*
	  var interfaces = require('os').networkInterfaces();
	  for (var devName in interfaces) {
	    var iface = interfaces[devName];

	    for (var i = 0; i < iface.length; i++) {
	      var alias = iface[i];
	      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
	        return alias.address;
	      }
	    }
	  }

	  return '0.0.0.0';*/
	}