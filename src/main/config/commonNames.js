var commonNames=
	({
	// Definitions for extension CSI HTTP header values
	  CSI_VERSION : "X-CSI-Version",
	  CSI_ORIGINAL_VERSION : "X-CSI-OriginalVersion",
	  CSI_CONVERSATION_ID : "X-CSI-ConversationId",
	  CSI_UNIQUE_TXN_ID : "X-CSI-UniqueTransactionId",
	  CSI_MESSAGE_ID : "X-CSI-MessageId",
	  CSI_TIME_TO_LIVE : "X-CSI-TimeToLive",
	  CSI_SEQUENCE_NUMBER : "X-CSI-SequenceNumber",
	  CSI_TOTAL_IN_SEQUENCE : "X-CSI-TotalInSequence",
	  CSI_ORIGINATOR_ID : "X-CSI-OriginatorId",
	  CSI_DATE_TIME_STAMP : "X-CSI-DateTimeStamp",
	  CSI_CLIENT_APP : "X-CSI-ClientApp",
	  CSI_CLIENT_DME2_LOOKUP : "X-CSI-ClientDME2Lookup",
	  CSI_UserName : "X-CSI-UserName",
	// Headers for CAET
	  CAET_FAULT_CODE : "X-CAET-FaultCode",
	  CAET_FAULT_DESC : "X-CAET-FaultDesc",
	  CAET_FAULT_ENTITY : "X-CAET-FaultEntity",
	
	// Other request headers to access
	  HTTP_LOCATION : "Location",
	  HTTP_AUTHORIZATION : "Authorization",
	  HTTP_ACCEPT : "accept",
	  JSONP : "jsonp",
	  NONSP : "nonsp",
	
	// Definitions for content type handling and request attributes
	  ERROR_BODY_TYPE : "ERROR_BODY",
	  REQUEST_BODY_TYPE : "REQUEST_BODY",
	  RESPONSE_BODY_TYPE : "RESPONSE_BODY",
	  BODY_TYPE_XML : "XML",
	  BODY_TYPE_JSON : "JSON",
	  REQUEST_CONTENT_WILDCARD : "*/*",
	  REQUEST_CONTENT_XML : "application/xml",
	  REQUEST_CONTENT_JSON : "application/json",
	  RESPONSE_CONTENT_XML : "application/xml,charset:utf-8",
	  RESPONSE_CONTENT_JSON : "application/json,charset:utf-8",
	  CACHE_CONTROL : "Cache-Control",
	  NO_CACHE : "no-cache,no-store",
	  ATTR_TIME_TO_LIVE : "TIME_TO_LIVE",
	  ATTR_START_TIME : "START_TIME",
	  ROUTE_ENDPOINT_BEGIN_TIME : "BEGIN_TIME",
	  ENDPOINT_NAME : "ENDPOINT_NAME",
	  ATTR_TTL_DEFAULT : "60000",
	  RESPONSE_BODY_TEXT : "RESPONSE_BODY_TEXT",
	  CSI_USER_NAME : "USER_NAME",
	  CSI_MOCK_USER_NAME : "anscUser",

	  CSI_PASSWORD : "PASSWORD",
	
	// Other general stuff for schema, logging, etc.
	  DOT_XSD : ".xsd",
	  REQUEST_TAG : "Request",
	  RESPONSE_TAG : "Response",

	  INFO_TAG : "Info",

	  CONTIVO_TRANSFORM_PACKAGE : "com.cingular.csi.transforms",
	  DME2_TAG : "DME2",
	  HYDRA_TAG : "HYDRA",
	  CSI_M2E_LOGGER : "CSI_M2E_LOGGER",
	  AUDIT_RECORD : "AUDIT_RECORD",
	  TRUE : "true",
	  FALSE : "false",
	  M2E_CSI_RESTFUL : "M2ECSIRestful",
	  PERF_RECORD : "PERF_RECORD",
	
	  DOT : ".",
	  EMPTY_ : "",
	
	//  fault codes
	  CSI_AUTH_ERROR : "100",
	  CSI_SERVICE_UNAVAIL_ERROR : "200",
	  CSI_DATA_ERROR : "300",
	  CSI_REQUEST_XML_ERROR : "400",
	  CSI_BUS_PROC_ERROR : "500",
	  CSI_UNKNOWN_ERROR : "900",
	  CSI_SUCCESS_RESPONSE_CODE : "0",
	  CSI_SUCCESS : "Success",
	
	
	// Error numbers
	  CSI_GENERIC_AUTH_ERROR : "10000000001",
	  CSI_GENERIC_SERVICE_UNAVAIL_ERROR : "20000000001",
	  CSI_GENERIC_REQUEST_ERROR : "40000000001",
	  CSI_GENERIC_UNKNOWN_ERROR : "90000000001",
	
	// Interceptor constants
	  REQUEST_START_TIME : "REQUEST_START_TIME",
	// con
	  COMPONENT_TYPE_RESTLET:"rest",
	  COMPONENT_TYPE_SERVLET:"servlet",
	  SOACLOUD_NAMESPACE :"SOACLOUD_NAMESPACE",
	  AUDIT_LOGGER_NAME : "AuditRecord",
	  AJSC_CSI_RESTFUL : "AjscCsiRestful",
	  SOURCE_CLASS : "com.att.ajsc.csi.logging.CsiLoggingUtils",
	// Trail Logging name
	  Trail_Log: "trail"
});
module.exports.property = commonNames;
