package com.att.salesexpress.ms;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.resource.GzipResourceResolver;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
public class WebConfig extends WebMvcConfigurerAdapter {

  /**
   * Locations of static resources defaults to classpath: /META-INF/resources/, /resources/, /static/, /public/
   * plus context:/ (the root of the servlet context).
   */

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		super.addResourceHandlers(registry);
		if (!registry.hasMappingForPattern("/webjars/**")) {
      registry
          .addResourceHandler("/webjars/**")
          .addResourceLocations("classpath:/META-INF/resources/webjars/")
          .setCachePeriod(3600)
          .resourceChain(true)
          .addResolver(new GzipResourceResolver())
          .addResolver(new PathResourceResolver());
    }
	}

	@Override
  public void configurePathMatch(PathMatchConfigurer configurer) {
    super.configurePathMatch(configurer);
    configurer.setUseSuffixPatternMatch(false);
  }

  @Override
  public void addViewControllers(ViewControllerRegistry registry) {
    registry.addViewController("/").setViewName("forward:/mvc/public/index.html");
    registry.addViewController("/swagger").setViewName("redirect:/mvc/swagger/index.html");
  }

}
