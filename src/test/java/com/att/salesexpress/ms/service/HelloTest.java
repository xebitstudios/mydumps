package com.att.salesexpress.ms.service;

import static org.junit.Assert.assertEquals;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import com.att.salesexpress.ms.model.HelloWorld;
import com.att.salesexpress.ms.service.rs.RestService;
import com.att.salesexpress.ms.Application;
import com.att.ajsc.common.utility.SystemPropertiesLoader;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
@ContextConfiguration(classes = { Application.class, TestConfiguration.class })
public class HelloTest {
	
	static{
		SystemPropertiesLoader.addSystemProperties(); 
	}
	
	@Autowired
	RestService service;
	

	@Before
	public void setUp() throws Exception {
	}

	@After
	public void tearDown() throws Exception {
	}

	@Test
	public void testQuickHello() throws Exception {
		HelloWorld helloWorld = service.getQuickHello("test");
		assertEquals("Hello test!", helloWorld.getMessage());
	}
	
	}