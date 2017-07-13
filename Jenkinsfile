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


def branchName
def buildImageName
def buildImg


node("docker") {
	stage 'Checkout'
	checkout scm
	sh 'env | sort'
	
	pom = readMavenPom file: 'pom.xml'
	PROJECT_NAME = pom.groupId + ":" + pom.artifactId;
	SERVICE_NAME=pom.artifactId;
	NAMESPACE=pom.groupId;
	VERSION=pom.version;
	KUBE_NAMESPACE=NAMESPACE.replaceAll(/\./,"-")
	echo "Kube NameSpace:"+KUBE_NAMESPACE
	echo "Artifact: " + PROJECT_NAME
	//env.DOCKER_HOST="tcp://localhost:4243"
	env.DOCKER_CONFIG="${WORKSPACE}/.docker"
	
	branchName = (env.BRANCH_NAME ?: "master").replaceAll(/[^0-9a-zA-Z_]/, "-")
	//buildImageName = "${NAMESPACE}/${SERVICE_NAME}:${branchName}.${env.BUILD_NUMBER}"
	buildImageName = "${NAMESPACE}/${SERVICE_NAME}:latest1"
	def dockerRegistry = "zlp11313.vci.att.com:5100"
	//def dockerRegistry = "dockercentral.it.att.com:5100"
	def dockerRegistryScheme = env.DOCKER_REGISTRY_SCHEME ?: "https"
	def dockerCredentialsId = env.DOCKER_CREDS_ID ?: "docker-m61407"
	IMAGE_NAME = "${dockerRegistry}/$buildImageName"
	
	//Create kubectl.conf file here from Pipeline properties provided.
	
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
				sh 'env | sort'
				sh 'mvn -s $MAVEN_SETTINGS -Ddummy.prop=$SONAR_PROPERTIES -P buildAnsc' 
				
				stage 'Unit Test'
				sh 'mvn -s $MAVEN_SETTINGS test'
				
				sh 'env | sort'
					withCredentials([usernamePassword(credentialsId: 'docker-m61407', passwordVariable: 'password', usernameVariable: 'username')]) {
					sh "docker login -u ${username} -p ${password} -e ${username} ${dockerRegistry}"
				}
				
				stage 'Package'
				sh 'mvn -s $MAVEN_SETTINGS -Ddummy.prop=$SONAR_PROPERTIES com.github.eirslett:frontend-maven-plugin:grunt -Dfrontend.grunt.arguments="docker-image docker-push"' 
							
				
				stage 'Quality Scan'
				def props = readProperties file: "${env.SONAR_PROPERTIES}"
				sh 'mvn -Dsonar.host.url=' + props['sonar.host.url'] + ' -Dsonar.att.motsid=' + props['sonar.att.motsid'] + ' -Dsonar.projectKey=' + props['sonar.att.motsid'] + ':' + PROJECT_NAME + ' -Dsonar.projectName=' + props['sonar.att.motsid'] + ':' + PROJECT_NAME + ' -Dsonar.projectDescription=' + props['sonar.att.motsid'] + ':' + PROJECT_NAME + ' -Dsonar.login=' + props['sonar.login'] + ' -Dsonar.password=' + props['sonar.password'] + ' -Dsonar.att.view.type=' + props['sonar.att.view.type'] + ' -Dsonar.att.dependencycheck.tattletale.java.command=' + props['sonar.att.dependencycheck.tattletale.java.command'] + ' -Dsonar.att.dependencycheck.tattletale.sourceDirectory.path=' + props['sonar.att.dependencycheck.tattletale.sourceDirectory.path'] + ' -Dsonar.att.dependencycheck.tattletale.destinationDirectory.path=' + props['sonar.att.dependencycheck.tattletale.destinationDirectory.path'] + ' -Dsonar.att.tattletale.base.folder=' + props['sonar.att.tattletale.base.folder'] +' -Dsonar.att.tattletale.binaries.folder=' + props['sonar.att.tattletale.binaries.folder'] +' -Dsonar.att.tattletale.enabled=' + props['sonar.att.tattletale.enabled']+ ' -s $MAVEN_SETTINGS sonar:sonar'
	
		}
		if ("${PHASE}" == "BUILD_DEPLOY" || "${PHASE}" == "DEPLOY" ) {
			//deploy to k8s
			if (branchName == 'master') {
			stage ('Deploy to Staging') {
				withEnv([
				"APP_NAME=${SERVICE_NAME}",
				"K8S_CTX=${K8S_CONTEXT}",
				"APP_NS=${KUBE_NAMESPACE}",
				"TARGET_ENV=${TARGET_ENV}",
				"IMAGE_NAME=${IMAGE_NAME}",
				"VERSION=${VERSION}",
				"SERVICE_ACCOUNT=${K8S_SERVICE_ACCOUNT}",
				"KUBECTL=/opt/app/kubernetes/v1.3.4/bin/kubectl",
				"KUBECTL_OPTS=--server=${K8S_CLUSTER_URL} --insecure-skip-tls-verify=true --password=${K8S_PASSWORD} --username=${K8S_USERNAME}"
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
				"IMAGE_NAME=${IMAGE_NAME}",
				"VERSION=${VERSION}",
				"SERVICE_ACCOUNT=${K8S_SERVICE_ACCOUNT}",
				"KUBECTL=/opt/app/kubernetes/v1.3.4/bin/kubectl",
				"KUBECTL_OPTS=--server=${K8S_CLUSTER_URL} --insecure-skip-tls-verify=true --password=${K8S_PASSWORD} --username=${K8S_USERNAME}"
				]) {
				sh "./k8s/deploy.sh"
				}
			}
		  }
		}
	  }
	}
}