//'use strict';
var fs = require('fs');
var path=require('path')
var parse = require('xml-parser');
var pom = {};
var xml = fs.readFileSync('pom.xml', 'utf8');
var xml2js = require('xml2js');
var path=require('path')
var parser = new xml2js.Parser();
var os =require('os');
// Parsing the pom file to return all of the tags in a json formate
parser.parseString(xml, function(err, result) {
	pom=result.project
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
//-----------------------------------------------------------------------
 
//  We are getting all the dependencies and moving them into the swm/dist_files. These files will be pushed into swm

var packageJson=require('./package.json')
var dependencies=[]
for(k in packageJson.dependencies)
	dependencies.push(k+"/**")
//---------------------------------------------------------------	
var csiEnv=false
if(pom.properties[0]['ansc_run_environment']!==undefined && (new String(pom.properties[0]['ansc_run_environment'])).toLowerCase()==='csi'){
	csiEnv=true
}
	
// location for the target folder 
var snapshotFolder = path.join('target', 'app', pom.artifactId[0], pom.version[0])
var dockerRegistryURL=pom.properties[0]['docker.registry'][0];
//var swmFolder = path.resolve('target/swm/package/nix/')
// Variables that will be replaced throughout the project
var replacement={
		'{artifactId}' : pom.artifactId[0],
		'{major}' : pom.major,
		'{minor}' : pom.minor,
		'{patch}' : pom.patch,
		'{version}' : pom.version[0],
		'{namespaceVersion}' : pom.properties[0]['module.ansc.namespace.version'][0],
		'{routeOffer}' : 'DEFAULT',
		'{dme2_ServiceNamespace}' : 'com.att.ajsc',
		'{groupId}' : pom.groupId[0],
		'{distFilesRootLocation}':pom.properties[0]['absoluteDistFilesRoot'][0]+'/'+pom.version,
		'{anscHome}' :snapshotFolder,
	    '{k8s.namespace}' : pom.groupId[0].replace(/[.]/g, '-').toLowerCase(),
        '{k8s.app}' : pom.artifactId[0].toLowerCase()
	}

// compiling a list of all routes in the routes folder and puting them in the variable replacement script ("replacer") down below
routes_folder=path.join(__dirname,'src/main/routes/');
	var arr=fs.readdirSync(routes_folder);
	var all_routes_json=[]
	for(var i=0;i<arr.length;i++){
		(function(file){
			fs.stat(file,function(err,stats){
				if(err){
					console.log(err)
				}
				if(!stats.isDirectory())
				all_routes_json.push({
					src:[file],
					dest: snapshotFolder+path.sep+"routes"+path.sep+path.basename(file)
				})
			})
		})(path.join(routes_folder,arr[i]))
	}
	setTimeout(function(){
		console.log(all_routes_json)
	}, 1000)
	
//------------------------------------------------------------------------

var isWin = (os.platform() === 'win32')
var wait_for="ping 127.0.0.1 -n 2 > nul"
if (!isWin){
	wait_for="sleep 2"
}
	
//------------------------------------------------------------------------files for replacer
var replacerFiles=[]
/*var bun=path.join(snapshotFolder,"bundleconfig")
var conf=path.join(snapshotFolder,"config")
var csi=path.join(snapshotFolder,"csi")
var dme2=path.join(snapshotFolder,"dme2")
var fil=path.join(snapshotFolder,"filters")
var rou=path.join(snapshotFolder,"routes")
var anscR=path.join(snapshotFolder,"AnscRunner.js")
var swmF=path.join(swmFolder,"common")
var listFiles=[swmF];//[bun,conf,csi,dme2,fil,rou,anscR,swmF];
(function loop(dir, exclude) {
	for (var i = 0; i < dir.length; i++) {
		console.log(dir[i])
		fs.existsSync(dir[i]) ? console.log("file exist") :console.log("file not exist")
		!notIn(dir[i], exclude) ?console.log("file excluded") :
			if(fs.existsSync(dir[i]) && fs.statSync(dir[i]).isDirectory()){
			(function oneFile(firstFile) {
				//console.log(firstFile)
				fs.readdir(firstFile, function(err, files) {
					if (err)
						console.log(err)
					files.forEach(function(file) {
						// fs.stat(file, callback)

						file = path.join(firstFile, file)
						fs.stat(file, function(err, stats) {
							if (stats.isDirectory()){
								
								loop([ file ],exclude)
							}
							if(file==="C:/Users/bp306u/DeleteThis/ex/target/swm/package/nix/common"){
								console.log("fudge")
							}
							replacerFiles.push({src:file,dest:file});
						})
					})
				})
			})(dir[i])
		}
			else{
				if(file==="C:/Users/bp306u/DeleteThis/ex/target/swm/package/nix/common"){
					console.log("fudge")
				}
				replacerFiles.push({src:dir[i],dest:dir[i]})
			}
		}
		
	}
	function notIn(file,exclude){
		for(var j=0;j<exclude.length;j++)
			if(exclude[i]==file){
				return false;
			}
		return true
	}
})(listFiles,[path.join(swmFolder,"dist_files")])	
*/
//-------------------------------------------------------------------------------

var nodeList = 'zltv5025.vci.att.com';
module.exports = function(grunt) {
	// show elapsed time at the end
	require('time-grunt')(grunt);
	grunt.loadNpmTasks('grunt-replacer');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-maven-tasks');
	grunt.loadNpmTasks('grunt-mocha-test');
	require('load-grunt-tasks')(grunt);
	// load all grunt tasks
	
	
	// grunt.load('osdetect')
	console.log(replacerFiles)
	console.log("dogs")
	grunt
			.initConfig({
				maven : {
					options : {
						groupId : pom.groupId
					},

				},
				mochaTest : {
					test : {
						options : {
							reporter : 'JSON',
							captureFile : 'results.txt',
							quiet : false,
							clearRequirecache : false,
							timeout : 30000,
							require:[
							         function(){process.env.unitTest="true"} // In a
																				// couple
																				// of
																				// files
																				// such
																				// as
																				// loggingConfigurationService,
																				// .
																				// Its
																				// going
																				// to
																				// see
																				// if
																				// this
																				// value
																				// has
																				// been
																				// set
							         
							         ]
						},
						src : [  snapshotFolder+"/test/Tests/*"]
					}
				},
				// replace the values
				replacer : {
					index : {
						options : {
							replace :replacement
						},
						files : [
									
									{
										src : [ 'src/main/config/config.js' ],
										dest : snapshotFolder+'/config/config.js'
									},
									
									{
										src : [ 'src/main/config/DME2Helper.js' ],
										dest : snapshotFolder + '/config/DME2Helper.js'
									},
									{
										src : [ 'src/main/AnscRunner.js' ],
										dest : snapshotFolder + '/AnscRunner.js'
									},
              {
                src : [ 'src/deployment/k8s-svc.yml' ],
                dest : snapshotFolder + '/deployment/k8s-svc.yml'
              },
              {
                src : [ 'src/deployment/k8s-rc.yml' ],
                dest : snapshotFolder + '/deployment/k8s-rc.yml'
              },
              {
                src : [ 'src/deployment/Dockerfile' ],
                dest : snapshotFolder + '/deployment/Dockerfile'
              },
									{
										src : [ 'src/test/Tests/interceptorsTest.js' ],
										dest : snapshotFolder + '/test/Tests/interceptorsTest.js'
									},
									{
										src : [ 'src/test/Resources/AnscRunnerDummy.js' ],
										dest : snapshotFolder+ '/test/Resources/AnscRunnerDummy.js'
									},
									
									all_routes_json
									]
					}
				},
				'string-replace' : {
					dist : {
						files : [ {
							expand : true,
							cwd : 'src/main/routes',
							src : '**/*',
							dest : snapshotFolder+'/routes/'
						} ],
						options : {
							replacements : [ {
								pattern : '{artifactId}',
								replacement : pom.artifactId
							} ]
						}
					}
				},
				// execute scripts
				execute : {
					start : {
						src : [ snapshotFolder+ '/AnscRunner.js' ]
					},
					callDME2 : {
						src : [ snapshotFolder + '/dme2/CallDME2Client.js' ]
					}

				},
				exec : {
				
					wait_for_read_files:{
						cmd: wait_for
					},
					docker_image : {
						cmd : 'docker build' +
							' -f ' + path.join(snapshotFolder, 'deployment', 'Dockerfile') +
							' -t'+dockerRegistryURL+ '/' + pom.groupId[0] + '/' + pom.artifactId[0].toLowerCase() + ':latest1' +
							' ' + snapshotFolder
          },
          docker_push : {
            cmd : 'docker push ' +
            dockerRegistryURL+'/' + pom.groupId[0] + '/' + pom.artifactId[0].toLowerCase()  + ':latest1'
					}

				},

				// Watch Config

				watch : {
					scripts : {
						files : [ 'src/main/config/*.js',
								'src/main/AnscRunner.js', ],
					}
				},

				// Clean Config
				clean : {
					dist : {
						files : [ {
							dot : true,
							src : [ 'target/swm', 'target/*', '!target/.git*' ]
						} ]
					},
					bundleconfig:{
						files:[{
							dot: true,
							src:[snapshotFolder+"/bundleconfig-csi", snapshotFolder+"/bundleconfig-local"]
						}]
					}
				// server : [ '.tmp' ],
				},

				// Hint Config
				jshint : {
					options : {
					// jshintrc : '.jshintrc'
					},
					all : [ 'src/main/AnscRunner.js' ]
				},

				// Copy Config
				copy : {
					dist : {
						files : [
								
								{
									expand : true,
									dot : false,
									cwd : 'src/main',
									dest : snapshotFolder,
									src :['**/*','!node_modules/**','!swm/**'] /*['config/**', 'dme2/**', 'dme2/**',
											'*.js', 'common/**',
											'asc-shared-config/**',
											'bundleconfig-local/**',
											'bundleconfig-csi/**',
											'routes/**', 'filters/**', 'csi/**','RegressionTest/**','scripts/**'  ]*/
								},
								{
									expand : true,
									dot : false,
									cwd : 'commonLibs',
									dest : snapshotFolder+ '/commonLibs',
									src : '**/*'
								},
								{
									expand : true,
									dot : false,
									cwd : 'node_modules',
									dest : snapshotFolder+ '/node_modules',
									src : dependencies /*[ 'chai/**','connect-timeout/**','express/**','grunt/**', 'grunt-mocha-test/**','hashmap/**', 'load-grunt-tasks/**','log4js/**','meld/**','mkdirp/**','ms/**','node-uuid/**', 'sequece/**','xml-parser/**','xml2js/**','xmlbuilder/**','xmlhttprequest/**','request/**']*/
								},
								
								{
									expand : true,
									dot : false,
									cwd : '.',
									dest : snapshotFolder,
									src : 'package.json'
								},
								{
									expand : true,
									dot : false,
									cwd : 'src/test',
									dest : snapshotFolder+ '/test',
									src : '**/*'
								} ]
					},
					bundleconfigLocal:{
						files:[{
							expand : true,
							dot : false,
							cwd : snapshotFolder+"/bundleconfig-local",
							dest : snapshotFolder+'/bundleconfig',
							src : '**/*'
						}
						       
						       ]
					},
					bundleconfigCsi:{
						files:[{
							expand : true,
							dot : false,
							cwd : snapshotFolder+"/bundleconfig-csi",
							dest : snapshotFolder+'/bundleconfig',
							src : '**/*'
						}
						       ]
					}
				}
			});

	// Build
	
	grunt
			.registerTask(
					'build',
					'Build the ANSC SWM template to publish into inventory and Upload it in to the swm repository',
					[ 'exec:wait_for_read_files','clean:dist', 'copy:dist', 'replacer','bundleconfig','clean:bundleconfig']);

	grunt.registerTask('docker-image',
		'Builds the Docker image using the generated Dockerfile',
		['exec:docker_image']);

  grunt.registerTask('docker-push',
    'Builds the Docker image using the generated Dockerfile',
    ['exec:docker_push']);

  grunt.registerTask('k8s-deploy',
    'Builds the Docker image using the generated Dockerfile',
    ['exec:docker_image']);

  grunt.registerTask('bundleconfig','if the ansc_run_environment property is set in the pom file it will decide which bundleconfig to use',function(){
		if(csiEnv){
			grunt.task.run('copy:bundleconfigCsi')
		}
		else{
			grunt.task.run('copy:bundleconfigLocal')
		}
	});

	grunt
			.registerTask('watchFiles', 'Watch files for any changes',
					[ 'watch' ]);

	grunt.registerTask('replace',
			'Replace the artifactId in different files. ', [ 'replacer' ]);

	grunt.registerTask('callDME2',
			'Using Javascript DME2 component it will call the service.',
			[ 'execute:callDME2' ]);

	grunt.registerTask('jshint', 'Cleaner, more consistent ANSC', [ 'jshint' ]);

	grunt.registerTask('runAnsc',
			'Start the ANSC container and register into DME2.',
			[ 'execute:start' ]);

	
	grunt.registerTask('test', 'mochaTest');
	
	grunt.registerTask('replace_values', 'My "default" task description.', function() {
			replace(replacement, [ swmFolder+'/install'
			                        ])
		});
	
	
	
	
	// This is an alternative to using replacer
	function replace(json,file){
		if(Array.isArray(file)){
			for(i in file){
				replace(json,file[i])
			}
		}
		else if(!fs.existsSync(file)){
			// Doesn't continue
			grunt.log.write('fudge: '+file)
		}
		else if(fs.lstatSync(file).isFile()){
			grunt.file.defaultEncoding = 'utf8';
			var text=grunt.file.read(file, {" encoding": "utf8"})
			text = replacer(text,json)
			
			grunt.file.write(file, text ,{" encoding": "utf8"})
			console.log(text)
		}
		
		else if(fs.lstatSync(file).isDirectory()){
			var arr=fs.readdirSync(file);
			for(f in arr){
				
				var newFile=path.join(file,arr[f])
				//grunt.log.writeln(newFile)
				replace(json,newFile)
			}
		}
			
	}
	function replacer(text,json) {
		
		// grunt.log.writeln(text)
		for (var attr in json) {
			text = (text+"").replace(attr, json[attr])
			//grunt.log.writeln(text)
		}
		
		return text

	}

};
