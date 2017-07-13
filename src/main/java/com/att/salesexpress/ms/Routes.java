package com.att.salesexpress.ms;

import com.att.ajsc.common.camel.AjscRouteBuilder;
import org.apache.camel.Exchange;
import org.apache.camel.ShutdownRunningTask;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.dataformat.JsonLibrary;
import org.apache.camel.model.rest.RestBindingMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Routes extends RouteBuilder {

  @Autowired
  private AjscRouteBuilder ajscRoute;

//  @Value("${server.port}")
//  private int port;

  @Override
  public void configure() throws Exception {
    ajscRoute.initialize(this);
    ajscRoute.setRoute(from("servlet:/?matchOnUriPrefix=true")
        .to("cxfbean:jaxrsServices?providers=jaxrsProviders"));
    from("direct:start").marshal().json(JsonLibrary.Jackson)
        .setHeader(Exchange.HTTP_METHOD, constant("PUT"))
        .setHeader(Exchange.CONTENT_TYPE, constant("application/json"))
        .to("http://192.168.99.100:8500/v1/agent/service/register");
    from("direct:stop").shutdownRunningTask(ShutdownRunningTask.CompleteAllTasks)
        .toD("http://192.168.99.100:8500/v1/agent/service/deregister/${header.id}");
    restConfiguration()
        .component("netty4-http")
        .bindingMode(RestBindingMode.json)
        .port(8090);
    rest("/hello")
        .get("/{name}")
        .to("bean:springServiceImpl?method=getQuickHello(${header.name})");
  }

}
