package com.att.salesexpress.ms.model;

public class HelloWorld {

	private String message;

	public HelloWorld() {
		// needed for deserializer
	}

	public HelloWorld(String message) {
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "message = " + getMessage();
	}
}
