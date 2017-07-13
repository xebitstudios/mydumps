var assert = require('chai').assert
var should = require('chai').should()
var expect = require('chai').expect()

var chai = require('chai')
var WMQlogger = require('../../csi/JMSQueueAppender')

describe("JMSQueueAppender",function(){	 
	it('sendToWMQ',function(){

		var objWMQLogger = new WMQlogger.WMQHelper();
		var sendToWMQ = objWMQLogger.sendToWMQ 
		
		chai.expect(sendToWMQ('<root><AuditRecord><InstanceName>ansc:N/A-N/A-N/A-CACDTL02LC8341-N/A</InstanceName><InitiatedTimestamp>1440642161149</InitiatedTimestamp><HostName>CACDTL02LC8341</HostName><Subject>CW.pub.spm2.helloWorld.response</Subject><Mode/><ServiceKeyData1/><ServiceKeyData2/><SourceClass>csiLoggingUtils</SourceClass><SourceMethod>AuditRecord</SourceMethod><TransactionName>helloWorld</TransactionName><ApplicationId>lc8341@csp.att.com</ApplicationId><ConversationId>lc8341@csp.att.com~CNG-CSI~204c1632-173c-413a-a0c0-e87545093c15</ConversationId><UniqueTransactionId>AjscCsiRestful2292@d2099cd0-5d2c-4755-af87-d162cd2fe67f</UniqueTransactionId><OriginalMessageId>9f37b35b-2e5b-4c87-be65-8dd3dd993369</OriginalMessageId><OriginatorId>lc8341@csp.att.com</OriginatorId><ClientApp>ansc-csi-restful~N/A</ClientApp><OriginationSystemId>N/A</OriginationSystemId><OriginationSystemName>lc8341@csp.att.com</OriginationSystemName><OriginationSystemVersion>N/A</OriginationSystemVersion><Cluster>N/A</Cluster><HostIPAddress>135.70.248.32</HostIPAddress><Vtier>CACDTL02LC8341</Vtier></AuditRecord><responseCode>0</responseCode><ResponseDescription>Success</ResponseDescription><TransactionStatus>C</TransactionStatus><ElapsedTime>16216</ElapsedTime></root>')).to.not.throw;
	})
})


