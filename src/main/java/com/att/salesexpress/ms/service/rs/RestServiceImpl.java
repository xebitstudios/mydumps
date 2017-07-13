package com.att.salesexpress.ms.service.rs;


import org.springframework.beans.factory.annotation.Autowired;

import com.att.ajsc.common.Tracable;
import com.att.salesexpress.ms.common.LogMessages;
import com.att.ajsc.common.AjscService;

import com.att.salesexpress.ms.model.HelloWorld;
import com.att.salesexpress.ms.service.SpringService;
import com.att.ajsc.logging.AjscEelfManager;
import com.att.eelf.configuration.EELFLogger;

@AjscService
public class RestServiceImpl implements RestService {	
	private static EELFLogger log = AjscEelfManager.getInstance().getLogger(RestServiceImpl.class);

	@Autowired
	private SpringService service;

	public RestServiceImpl() {
		// needed for autowiring
	}

	@Override
	@Tracable(message = "invoking quick hello")
	public HelloWorld getQuickHello(String name) {	
		log.info(LogMessages.RESTSERVICE_HELLO);
		log.debug(LogMessages.RESTSERVICE_HELLO_NAME, name);
		return service.getQuickHello(name);
	}

}
