var path = require('path')
var fs = require("fs")
var parse = require('xml-parser');
var pom = {};
var xml = fs.readFileSync('../../../../../../../../../../../pom.xml', 'utf8');
var xml2js = require('xml2js');
var mkdirp = require('mkdirp')
var parser = new xml2js.Parser();

parser.parseString(xml, function(err, result) {
	pom.groupId = result.project.groupId;
	pom.artifactId = result.project.artifactId;
	pom.version = result.project.version;
	pom.groupId = result.project.groupId;
});

var ver = JSON.stringify(pom.version).substring(
		JSON.stringify(pom.version).indexOf("\"") + 1,
		JSON.stringify(pom.version).length - 2)
pom.major = ver.split(".")[0]
pom.minor = ver.split(".")[1]
pom.patch = ver.split(".")[2]

var replace = {
	'{artifactId}' : pom.artifactId,
	'{major}' : pom.major,
	'{minor}' : pom.minor,
	'{patch}' : pom.patch,
	'{version}' : pom.version,
	'{namespaceVersion}' : 'v1',
	'{environment}' : 'TEST',
	'{routeOffer}' : 'DEFAULT',
	'{dme2_ServiceNamespace}' : 'ajsc.att.com',
	'{service}' : 'ansc',
	'{groupId}' : pom.groupId,
	'{anscHome}' : 'target/swm/package/nix/dist_files/opt/app/' + pom.groupId
			+ '/' + pom.artifactId + '/' + pom.version }

var rmdirAsync = function(path, callback) {
	fs.readdir(path, function(err, files) {
		if (err) {
			// Pass the error on to callback
			callback(err, []);
			return;
		}
		var wait = files.length, count = 0, folderDone = function(err) {
			count++;
			// If we cleaned out all the files, continue
			if (count >= wait || err) {
				fs.rmdir(path, callback);
			}
		};
		// Empty directory to bail early
		if (!wait) {
			folderDone();
			return;
		}

		// Remove one or more trailing slash to keep from doubling up
		path = path.replace(/\/+$/, "");
		files.forEach(function(file) {
			var curPath = path + "/" + file;
			fs.lstat(curPath, function(err, stats) {
				if (err) {
					callback(err, []);
					return;
				}
				if (stats.isDirectory()) {
					rmdirAsync(curPath, folderDone);
				} else {
					fs.unlink(curPath, folderDone);
				}
			});
		});
	});
};
// This will remove the current routes folder and replace it with the one found
// in RegressionTest
var data = ""
rmdirAsync("../routes", function() {
	fs.mkdir(path.join(__dirname, "../routes"))
	fs.readdir(path.join(__dirname, "../RegressionTest/routes/"), function(err,
			files) {
		for (var i = 0; i < files.length; i++) {
			(function(i) {
				var text = fs.readFileSync(path.join(__dirname,
						"../RegressionTest/routes/" + this[i]), "utf8")
				text = replacer(text)
				fs
						.writeFile(
								path.join(__dirname, "../routes/" + this[i]),
								text)
				// setTimeout(function(){
				console.log(text)
				// },2000)

			}).call(files, i)
		}
	})
})

// This will remove the test folder and replace it with the one found in
// RegressionTest
rmdirAsync("../test", function() {
	mkdirp(path.join(__dirname, "../test/Tests"), function() {
		fs.readdir(path.join(__dirname, "../RegressionTest/Tests/"), function(
				err, files) {
			for (var i = 0; i < files.length; i++) {
				(function(i) {
					var text = fs.readFileSync(path.join(__dirname,
							"../RegressionTest/Tests/" + this[i]), "utf8")
					text = replacer(text)
					fs.writeFile(path.join(__dirname, "../test/Tests/"
							+ this[i]), text)
					// setTimeout(function(){
					console.log(text)
					// },2000)

				}).call(files, i)
			}
		})
	})
})

fs.unlink(path.join(__dirname, "../AnscRunner"), function() {
	var text = fs.readFileSync(path.join(__dirname,
			"../RegressionTest/Resources/AnscRunner.js"), "utf8")
	text = replacer(text)
	fs.writeFile(path.join(__dirname, "../AnscRunner.js"), text)
})

function replacer(text) {

	for (attr in replace) {
		text = text.replace(attr, replace[attr])

	}
	return text

}