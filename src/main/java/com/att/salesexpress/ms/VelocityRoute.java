package com.att.salesexpress.ms;


import com.att.ajsc.common.camel.AjscRouteBuilder;
import org.apache.camel.builder.RouteBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class VelocityRoute extends RouteBuilder {
	@Autowired
	private AjscRouteBuilder ajscRoute;

	@Value("${camel.velocity.template.folder}")
	private String vtplPrefix;


	@Override
	public void configure() throws Exception {
		ajscRoute.initialize(this);
		ajscRoute.setRoute(from("servlet:/index").to("velocity:"+vtplPrefix+"/index.vm?contentCache=true"));
	}


}
