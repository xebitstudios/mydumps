//var process = require('process');
var os = require("os");

var systemParams = {};

systemParams.APP_NAME = function() {
	var appName = process.env.lrmRName;

	if (appName == undefined || appName == "") {
		appName = "N/A";
	}
	return appName;
};

systemParams.APP_VERSION = function() {
	var appversion = process.env.lrmRVer;

	if (appversion == undefined || appversion == "") {
		appversion = "N/A";
	}
	return appversion;
};

systemParams.HOST_NAME = function() {
	return os.hostname();
}

systemParams.ROUTE_OFFER = function() {
	var routeOffer = process.env.routeOffer;

	if (routeOffer == undefined || routeOffer == "") {
		routeOffer = "N/A";
	}
	return routeOffer;
};

systemParams.PID = function() {
	var pid = process.env.Pid;

	if (pid == undefined || pid == "") {
		pid = "N/A";
	}
	return pid;
};

systemParams.INSTANCE_NAME = function() {

	console.log("ansc:" + systemParams.APP_NAME() + "-"
			+ systemParams.APP_VERSION() + "-" + systemParams.ROUTE_OFFER()
			+ "-" + systemParams.HOST_NAME() + "-" + systemParams.PID());

	return "ansc:" + systemParams.APP_NAME() + "-" + systemParams.APP_VERSION()
			+ "-" + systemParams.ROUTE_OFFER() + "-" + systemParams.HOST_NAME()
			+ "-" + systemParams.PID();

}

systemParams.HOST_IP = function() {
	var interfaces = os.networkInterfaces();
	for ( var devName in interfaces) {
		var iface = interfaces[devName];

		for (var i = 0; i < iface.length; i++) {
			var alias = iface[i];
			if (alias.family === 'IPv4' && alias.address !== '127.0.0.1'
					&& !alias.internal) {
				return alias.address;
			}
		}
	}

	return '0.0.0.0';
}

systemParams.CLUSTER = function() {
	var cluster = process.env.lrmRO;

	if (cluster == undefined || cluster == "") {
		cluster = "N/A";
	}
	return cluster;
};
systemParams.VTIER = function() {
	var vtier;
	var hostName = os.hostname();
	var i = hostName.indexOf('.');
	if (i > 0)
		vtier = hostName.substring(0, i);
	else
		vtier = hostName;
	return vtier;
}

module.exports.params = systemParams;