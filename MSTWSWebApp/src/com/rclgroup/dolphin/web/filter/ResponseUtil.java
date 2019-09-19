package com.rclgroup.dolphin.web.filter;

import javax.ws.rs.core.CacheControl;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

public class ResponseUtil {

	public static Response createResponse(Status status, String msg, MediaType type) {
		CacheControl cc = new CacheControl();
		cc.setNoStore(true);
		Response response = Response.status(status)
				.cacheControl(cc)
				.entity(msg)
				.type(type)
				.build();
		return response;
	}
	
	public static Response createJsonResponse(String jsonString) {
		return createResponse(Status.OK, jsonString, MediaType.APPLICATION_JSON_TYPE);
	}
}
