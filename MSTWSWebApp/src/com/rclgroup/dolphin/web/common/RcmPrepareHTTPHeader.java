package com.rclgroup.dolphin.web.common;

import java.util.stream.Collectors;

import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MultivaluedMap;

public class RcmPrepareHTTPHeader {
	
	private HttpHeaders httpHeaders;
	
	
	public RcmPrepareHTTPHeader(HttpHeaders httpHeaders) {
		this.httpHeaders = httpHeaders;
	}

	public String getHTTPHeader() {
		
		MultivaluedMap<String, String> rh = this.httpHeaders.getRequestHeaders();
		
		return rh.entrySet()
                .stream()
                .map(e -> e.getKey() + " = " + e.getValue())
                .collect(Collectors.joining("|"));
	}

}
