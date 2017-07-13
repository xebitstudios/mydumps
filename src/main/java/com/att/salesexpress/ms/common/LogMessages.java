package com.att.salesexpress.ms.common;

import com.att.eelf.i18n.EELFResolvableErrorEnum;
import com.att.eelf.i18n.EELFResourceManager;

public enum LogMessages implements EELFResolvableErrorEnum {

	RESTSERVICE_HELLO, RESTSERVICE_HELLO_NAME, SPRINSERVICE_HELLO, SPRINSERVICE_HELLO_NAME, SPRINSERVICE_HELLO_MESSAGE, SPRINSERVICE_HELLO_MESSAGE_NAME;

	static {

		EELFResourceManager.loadMessageBundle("logmessages");

	}

}
