#!/usr/bin/env groovy

properties([[$class: 'ParametersDefinitionProperty', parameterDefinitions: [ 
	[$class: 'hudson.model.StringParameterDefinition', name: 'PHASE', defaultValue: "BUILD"],
	[$class: 'hudson.model.StringParameterDefinition', name: 'TARGET_ENV', defaultValue: "DEV"],
	[$class: 'hudson.model.StringParameterDefinition', name: 'K8S_CLUSTER_URL',defaultValue: "https://zlp22238.vci.att.com"],
	[$class: 'hudson.model.StringParameterDefinition', name: 'K8S_CONTEXT',defaultValue: "default"],
	[$class: 'hudson.model.StringParameterDefinition', name: 'K8S_USERNAME',defaultValue: "root"],
	[$class: 'hudson.model.PasswordParameterDefinition', name: 'K8S_PASSWORD',defaultValue: "ch4ng3m3"],
	[$class: 'hudson.model.StringParameterDefinition', name: 'K8S_NAME',defaultValue: "m93659@ajsc.att.com"],
	[$class: 'hudson.model.StringParameterDefinition', name: 'K8S_PODS_REPLICAS',defaultValue: "2"],
	[$class: 'hudson.model.StringParameterDefinition', name: 'K8S_SERVICE_ACCOUNT',defaultValue: "default"]   
]]]) 

/**
jdk1.8 = fixed name for java
M3 = fixed name for maven
general_maven_settings = fixed name for maven settings Jenkins managed file
*/

echo "Build branch: ${env.BRANCH_NAME}"

node("docker") {
	stage 'Checkout'
	checkout scm
	
	pom = readMavenPom file: 'pom.xml'
	PROJECT_NAME = pom.properties['namespace'] + ":" + pom.artifactId;
	SERVICE_NAME=pom.artifactId;
	VERSION=pom.version;
	LABEL_VERSION=pom.version.replaceAll(".", "-");
	echo "LabelVersion: " + LABEL_VERSION
	NAMESPACE=pom.properties['namespace']
	KUBE_NAMESPACE=pom.properties['kube.namespace']
	IMAGE_NAME=pom.properties['docker.registry']+"/"+NAMESPACE+"/"+pom.artifactId+":latest"
	echo "Artifact: " + PROJECT_NAME
	env.DOCKER_HOST="tcp://localhost:4243"
	env.DOCKER_CONFIG="${WORKSPACE}/.docker"
	def branchName
	
	// Create kubectl.conf  file here from Pipeline properties provided.
	
	withEnv(["PATH=${env.PATH}:${tool 'M3'}/bin:${tool 'jdk1.8'}/bin", "JAVA_HOME=${tool 'jdk1.8'}", "MAVEN_HOME=${tool 'M3'}"]) { 
			
		echo "JAVA_HOME=${env.JAVA_HOME}"
		echo "MAVEN_HOME=${env.MAVEN_HOME}"
		echo "PATH=${env.PATH}"

		wrap([$class: 'ConfigFileBuildWrapper', managedFiles: [
			[fileId: 'maven-settings.xml', variable: 'MAVEN_SETTINGS'],
			[fileId: 'sonar-secret.txt', variable: 'SONAR_SECRET'],
			[fileId: 'sonar.properties', variable: 'SONAR_PROPERTIES']
		]]) {
			
			branchName = (env.BRANCH_NAME ?: "master").replaceAll(/[^0-9a-zA-Z_]/, "-")

			if ("${PHASE}" == "BUILD" || "${PHASE}" == "BUILD_DEPLOY" ) { 
				stage 'Compile' 
		    	sh 'mvn -DskipTests -Dmaven.test.skip=true -s $MAVEN_SETTINGS -Ddummy.prop=$SONAR_PROPERTIES clean compile' 
 
				stage 'Unit Test' 
	    		sh 'mvn -s $MAVEN_SETTINGS test' 
 
				stage 'Package' 
		    	sh 'mvn -DskipTests -Dmaven.test.skip=true -s $MAVEN_SETTINGS package' 
 
				stage 'Verify' 
		    	sh 'mvn -DskipTests -Dmaven.test.skip=true -s $MAVEN_SETTINGS verify' 
				
				stage 'Quality Scan'
					def props = readProperties file: "${env.SONAR_PROPERTIES}"
					sh 'mvn -s $MAVEN_SETTINGS sonar:sonar'

				stage 'Publish Artifact'
	    		sh 'mvn'
					  + ' -DskipTests'
						+ ' -Dmaven.test.skip=true'
						+ ' -Dhttps.protocols="TLSv1"'
						+ ' -Djavax.net.ssl.trustStore="/opt/app/aft/aftswmnode/etc/cacerts.jks"'
						+ ' -Djavax.net.ssl.trustStorePassword="f22723cffdbd2fff1cb3c558677a7684"'
						+ ' -Djavax.net.ssl.keyStore="/opt/app/aft/aftswmnode/etc/cacerts.jks"'
						+ ' -Djavax.net.ssl.keyStorePassword="f22723cffdbd2fff1cb3c558677a7684"'
						+ ' -s $MAVEN_SETTINGS'
						+ ' -U docker:build docker:push'
			}

			if ("${PHASE}" == "BUILD_DEPLOY" || "${PHASE}" == "DEPLOY" ) { 
				 // deploy to k8s
				if (branchName == 'master') {
					stage ('Deploy to Staging') {
						withEnv([
							"APP_NAME=${SERVICE_NAME}",
							"K8S_CTX=${K8S_CONTEXT}",
							"APP_NS=${KUBE_NAMESPACE}",
							"TARGET_ENV=${TARGET_ENV}",
							"IMAGE_NAME=${IMAGE_NAME}",
							"VERSION=${VERSION}",
							"LABEL_VERSION=${LABEL_VERSION}",
							"REPLICA_COUNT=${K8S_PODS_REPLICAS}",
							"SERVICE_ACCOUNT=${K8S_SERVICE_ACCOUNT}",
							"KUBECTL=/opt/app/kubernetes/v1.3.4/bin/kubectl",
							"KUBECTL_OPTS=--server=${K8S_CLUSTER_URL} --insecure-skip-tls-verify=true  --password=${K8S_PASSWORD}  --username=${K8S_USERNAME}"
						]) {
						sh "./k8s/deploy.sh"
					}
				}

			} else if (branchName=="develop") {
					stage ('Deploy to Development') {
						withEnv([
							"APP_NAME=${SERVICE_NAME}",
							"K8S_CTX=${K8S_CONTEXT}",
							"APP_NS=${KUBE_NAMESPACE}",
							"TARGET_ENV=${TARGET_ENV}",
							"VERSION=${VERSION}",
							"LABEL_VERSION=${LABEL_VERSION}",
							"REPLICA_COUNT=${K8S_PODS_REPLICAS}",
							"IMAGE_NAME=${IMAGE_NAME}",
							"SERVICE_ACCOUNT=${K8S_SERVICE_ACCOUNT}",
							"KUBECTL=/opt/app/kubernetes/v1.3.4/bin/kubectl",
							"KUBECTL_OPTS=--server=${K8S_CLUSTER_URL} --insecure-skip-tls-verify=true --password=${K8S_PASSWORD}  --username=${K8S_USERNAME}"
						]) {
  						sh "./k8s/deploy.sh"
					  }
				  }
			  }
  		}
  	}
  }
}