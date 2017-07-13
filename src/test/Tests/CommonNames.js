var assert = require('chai').assert
var config = require('../../config/config')
var cNames= require('../../config/commonNames')
describe('ConfigTest', function(){

// Comparing CSI HTTP header values
it('',function(){
//console.log(cNames.property.CSI_VERSION)
assert(cNames.property["CSI_VERSION"]==="X-CSI-Version")
})

it('',function(){
//console.log(cNames.property.CSI_ORIGINAL_VERSION)
assert(cNames.property["CSI_ORIGINAL_VERSION"]==="X-CSI-OriginalVersion")
})

it('',function(){
//console.log(cNames.property.CSI_CONVERSATION_ID)
assert(cNames.property["CSI_CONVERSATION_ID"]==="X-CSI-ConversationId")
})

it('',function(){
//console.log(cNames.property.CSI_UNIQUE_TXN_ID)
assert(cNames.property["CSI_UNIQUE_TXN_ID"]==="X-CSI-UniqueTransactionId")
})

it('',function(){
//console.log(cNames.property.CSI_MESSAGE_ID)
assert(cNames.property["CSI_MESSAGE_ID"]==="X-CSI-MessageId")
})

it('',function(){
//console.log(cNames.property.CSI_TIME_TO_LIVE)
assert(cNames.property["CSI_TIME_TO_LIVE"]==="X-CSI-TimeToLive")
})

it('',function(){
//console.log(cNames.property.CSI_SEQUENCE_NUMBER)
assert(cNames.property["CSI_SEQUENCE_NUMBER"]==="X-CSI-SequenceNumber")
})

it('',function(){
//console.log(cNames.property.CSI_TOTAL_IN_SEQUENCE)
assert(cNames.property["CSI_TOTAL_IN_SEQUENCE"]==="X-CSI-TotalInSequence")
})

it('',function(){
//console.log(cNames.property.CSI_ORIGINATOR_ID)
assert(cNames.property["CSI_ORIGINATOR_ID"]==="X-CSI-OriginatorId")
})

it('',function(){
//console.log(cNames.property.CSI_DATE_TIME_STAMP)
assert(cNames.property["CSI_DATE_TIME_STAMP"]==="X-CSI-DateTimeStamp")
})

it('',function(){
//console.log(cNames.property.CSI_CLIENT_APP)
assert(cNames.property["CSI_CLIENT_APP"]==="X-CSI-ClientApp")
})

it('',function(){
//console.log(cNames.property.CSI_CLIENT_DME2_LOOKUP)
assert(cNames.property["CSI_CLIENT_DME2_LOOKUP"]==="X-CSI-ClientDME2Lookup")
})

it('',function(){
//console.log(cNames.property.CSI_UserName)
assert(cNames.property["CSI_UserName"]==="X-CSI-UserName")
})

it('',function(){
//console.log(cNames.property.CSI_UserName)
assert(cNames.property["CSI_UserName"]==="X-CSI-UserName")
})

// Comparing headers for CAET
it('',function(){
//console.log(cNames.property.CAET_FAULT_CODE)
assert(cNames.property["CAET_FAULT_CODE"]==="X-CAET-FaultCode")
})

it('',function(){
//console.log(cNames.property.CSI_UserName)
assert(cNames.property["CAET_FAULT_DESC"]==="X-CAET-FaultDesc")
})

it('',function(){
//console.log(cNames.property.CAET_FAULT_ENTITY)
assert(cNames.property["CAET_FAULT_ENTITY"]==="X-CAET-FaultEntity")
})

// Comparing other request headers
it('',function(){
//console.log(cNames.property.HTTP_LOCATION)
assert(cNames.property["HTTP_LOCATION"]==="Location")
})

it('',function(){
//console.log(cNames.property.HTTP_AUTHORIZATION)
assert(cNames.property["HTTP_AUTHORIZATION"]==="Authorization")
})

it('',function(){
//console.log(cNames.property.HTTP_ACCEPT)
assert(cNames.property["HTTP_ACCEPT"]==="accept")
})


it('',function(){
//console.log(cNames.property.JSONP)
assert(cNames.property["JSONP"]==="jsonp")
})

it('',function(){
//console.log(cNames.property.NONSP)
assert(cNames.property["NONSP"]==="nonsp")
})

// Comparing content type handling and request attributes
it('',function(){
//console.log(cNames.property.ERROR_BODY_TYPE)
assert(cNames.property["ERROR_BODY_TYPE"]==="ERROR_BODY")
})

it('',function(){
//console.log(cNames.property.REQUEST_BODY_TYPE)
assert(cNames.property["REQUEST_BODY_TYPE"]==="REQUEST_BODY")
})

it('',function(){
//console.log(cNames.property.RESPONSE_BODY_TYPE)
assert(cNames.property["RESPONSE_BODY_TYPE"]==="RESPONSE_BODY")
})

it('',function(){
//console.log(cNames.property.BODY_TYPE_XML)
assert(cNames.property["BODY_TYPE_XML"]==="XML")
})

it('',function(){
//console.log(cNames.property.BODY_TYPE_JSON)
assert(cNames.property["BODY_TYPE_JSON"]==="JSON")
})

it('',function(){
//console.log(cNames.property.REQUEST_CONTENT_WILDCARD)
assert(cNames.property["REQUEST_CONTENT_WILDCARD"]==="*/*")
})

it('',function(){
//console.log(cNames.property.REQUEST_CONTENT_XML)
assert(cNames.property["REQUEST_CONTENT_XML"]==="application/xml")
})

it('',function(){
//console.log(cNames.property.REQUEST_CONTENT_JSON)
assert(cNames.property["REQUEST_CONTENT_JSON"]==="application/json")
})

it('',function(){
//console.log(cNames.property.REQUEST_CONTENT_JSON)
assert(cNames.property["RESPONSE_CONTENT_XML"]==="application/xml,charset:utf-8")
})

it('',function(){
//console.log(cNames.property.REQUEST_CONTENT_JSON)
assert(cNames.property["RESPONSE_CONTENT_JSON"]==="application/json,charset:utf-8")
})

it('',function(){
//console.log(cNames.property.CACHE_CONTROL)
assert(cNames.property["CACHE_CONTROL"]==="Cache-Control")
})

it('',function(){
//console.log(cNames.property.NO_CACHE)
assert(cNames.property["NO_CACHE"]==="no-cache,no-store")
})

it('',function(){
//console.log(cNames.property.ATTR_TIME_TO_LIVE)
assert(cNames.property["ATTR_TIME_TO_LIVE"]==="TIME_TO_LIVE")
})

it('',function(){
//console.log(cNames.property.ATTR_START_TIME)
assert(cNames.property["ATTR_START_TIME"]==="START_TIME")
})

it('',function(){
//console.log(cNames.property.ROUTE_ENDPOINT_BEGIN_TIME)
assert(cNames.property["ROUTE_ENDPOINT_BEGIN_TIME"]==="BEGIN_TIME")
})

it('',function(){
//console.log(cNames.property.ENDPOINT_NAME)
assert(cNames.property["ENDPOINT_NAME"]==="ENDPOINT_NAME")
})

it('',function(){
//console.log(cNames.property.ATTR_TTL_DEFAULT)
assert(cNames.property["ATTR_TTL_DEFAULT"]==="60000")
})

it('',function(){
//console.log(cNames.property.RESPONSE_BODY_TEXT)
assert(cNames.property["RESPONSE_BODY_TEXT"]==="RESPONSE_BODY_TEXT")
})

it('',function(){
//console.log(cNames.property.CSI_USER_NAME)
assert(cNames.property["CSI_USER_NAME"]==="USER_NAME")
})

it('',function(){
//console.log(cNames.property.CSI_MOCK_USER_NAME)
assert(cNames.property["CSI_MOCK_USER_NAME"]==="anscUser")
})

it('',function(){
//console.log(cNames.property.CSI_PASSWORD)
assert(cNames.property["CSI_PASSWORD"]==="PASSWORD")
})

// Comparing for schema, logging etc.
it('',function(){
//console.log(cNames.property.DOT_XSD)
assert(cNames.property["DOT_XSD"]===".xsd")
})

it('',function(){
//console.log(cNames.property.DOT_XSD)
assert(cNames.property["REQUEST_TAG"]==="Request")
})

it('',function(){
//console.log(cNames.property.RESPONSE_TAG)
assert(cNames.property["RESPONSE_TAG"]==="Response")
})

it('',function(){
//console.log(cNames.property.INFO_TAG)
assert(cNames.property["INFO_TAG"]==="Info")
})

it('',function(){
//console.log(cNames.property.CONTIVO_TRANSFORM_PACKAGE)
assert(cNames.property["CONTIVO_TRANSFORM_PACKAGE"]==="com.cingular.csi.transforms")
})

it('',function(){
//console.log(cNames.property.DME2_TAG)
assert(cNames.property["DME2_TAG"]==="DME2")
})

it('',function(){
//console.log(cNames.property.HYDRA_TAG)
assert(cNames.property["HYDRA_TAG"]==="HYDRA")
})

it('',function(){
//console.log(cNames.property.CSI_M2E_LOGGER)
assert(cNames.property["CSI_M2E_LOGGER"]==="CSI_M2E_LOGGER")
})

it('',function(){
//console.log(cNames.property.AUDIT_RECORD)
assert(cNames.property["AUDIT_RECORD"]==="AUDIT_RECORD")
})

it('',function(){
//console.log(cNames.property.TRUE)
assert(cNames.property["TRUE"]==="true")
})

it('',function(){
//console.log(cNames.property.FALSE)
assert(cNames.property["FALSE"]==="false")
})

it('',function(){
//console.log(cNames.property.M2E_CSI_RESTFUL)
assert(cNames.property["M2E_CSI_RESTFUL"]==="M2ECSIRestful")
})

it('',function(){
//console.log(cNames.property.PERF_RECORD)
assert(cNames.property["PERF_RECORD"]==="PERF_RECORD")
})

it('',function(){
//console.log(cNames.property.DOT)
assert(cNames.property["DOT"]===".")
})

it('',function(){
//console.log(cNames.property.EMPTY_)
assert(cNames.property["EMPTY_"]==="")
})

//Comparing fault codes
it('',function(){
//console.log(cNames.property.CSI_AUTH_ERROR)
assert(cNames.property["CSI_AUTH_ERROR"]==="100")
})

it('',function(){
//console.log(cNames.property.CSI_SERVICE_UNAVAIL_ERROR)
assert(cNames.property["CSI_SERVICE_UNAVAIL_ERROR"]==="200")
})

it('',function(){
//console.log(cNames.property.CSI_DATA_ERROR)
assert(cNames.property["CSI_DATA_ERROR"]==="300")
})

it('',function(){
//console.log(cNames.property.CSI_REQUEST_XML_ERROR)
assert(cNames.property["CSI_REQUEST_XML_ERROR"]==="400")
})

it('',function(){
//console.log(cNames.property.CSI_BUS_PROC_ERROR)
assert(cNames.property["CSI_BUS_PROC_ERROR"]==="500")
})

it('',function(){
//console.log(cNames.property.CSI_UNKNOWN_ERROR)
assert(cNames.property["CSI_UNKNOWN_ERROR"]==="900")
})

it('',function(){
//console.log(cNames.property.CSI_SUCCESS_RESPONSE_CODE)
assert(cNames.property["CSI_SUCCESS_RESPONSE_CODE"]==="0")
})

it('',function(){
//console.log(cNames.property.CSI_SUCCESS)
assert(cNames.property["CSI_SUCCESS"]==="Success")
})

//Comparing for error numbers
it('',function(){
//console.log(cNames.property.CSI_GENERIC_AUTH_ERROR)
assert(cNames.property["CSI_GENERIC_AUTH_ERROR"]==="10000000001")
})

it('',function(){
//console.log(cNames.property.CSI_GENERIC_SERVICE_UNAVAIL_ERROR)
assert(cNames.property["CSI_GENERIC_SERVICE_UNAVAIL_ERROR"]==="20000000001")
})

it('',function(){
//console.log(cNames.property.CSI_GENERIC_REQUEST_ERROR)
assert(cNames.property["CSI_GENERIC_REQUEST_ERROR"]==="40000000001")
})

it('',function(){
//console.log(cNames.property.CSI_GENERIC_UNKNOWN_ERROR)
assert(cNames.property["CSI_GENERIC_UNKNOWN_ERROR"]==="90000000001")
})

//Comparing interceptor constants
it('',function(){
//console.log(cNames.property.REQUEST_START_TIME)
assert(cNames.property["REQUEST_START_TIME"]==="REQUEST_START_TIME")
})

it('',function(){
//console.log(cNames.property.COMPONENT_TYPE_RESTLET)
assert(cNames.property["COMPONENT_TYPE_RESTLET"]==="rest")
})

it('',function(){
//console.log(cNames.property.COMPONENT_TYPE_SERVLET)
assert(cNames.property["COMPONENT_TYPE_SERVLET"]==="servlet")
})

it('',function(){
//console.log(cNames.property.SOACLOUD_NAMESPACE)
assert(cNames.property["SOACLOUD_NAMESPACE"]==="SOACLOUD_NAMESPACE")
})

it('',function(){
//console.log(cNames.property.AUDIT_LOGGER_NAME)
assert(cNames.property["AUDIT_LOGGER_NAME"]==="AuditRecord")
})

it('',function(){
//console.log(cNames.property.AJSC_CSI_RESTFUL)
assert(cNames.property["AJSC_CSI_RESTFUL"]==="AjscCsiRestful")
})

it('',function(){
//console.log(cNames.property.SOURCE_CLASS)
assert(cNames.property["SOURCE_CLASS"]==="com.att.ajsc.csi.logging.CsiLoggingUtils")
})

it('',function(){
//console.log(cNames.property.Trail_Log)
assert(cNames.property["Trail_Log"]==="trail")
})


})