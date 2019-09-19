package com.rclgroup.dolphin.web.filter;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.nio.charset.Charset;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;

import com.rclgroup.dolphin.web.auth.BrowserData;
import com.rclgroup.dolphin.web.util.mst.*;
import com.rclgroup.dolphin.web.util.mst.MstTokenAuthUtils.AuthResult;
import com.sun.jersey.core.util.ReaderWriter;
import com.sun.jersey.spi.container.ContainerRequest;
import com.sun.jersey.spi.container.ContainerRequestFilter;

public class ServiceInboundFilter implements ContainerRequestFilter {

	@Context
	private HttpServletRequest httpRequest;
	
	@Override
	public ContainerRequest filter(ContainerRequest request) {
		ByteArrayOutputStream out = new ByteArrayOutputStream();
        InputStream in = request.getEntityInputStream();
        try {
            if (in.toString().length() > 0) {
                ReaderWriter.writeTo(in, out);

                byte[] requestEntity = out.toByteArray();
                String jsonString = new String(requestEntity, Charset.forName("UTF-8"));
                
                BrowserData data = MstUtils.mapToBrowserData(jsonString);
                if(data == null) {
                	throw new WebApplicationException(ResponseUtil.createJsonResponse(
                			EsynReturnMessageUtils.createMessageJsonError("Auth")
                			));
                }
                HttpSession session = httpRequest.getSession(true);
                session.setMaxInactiveInterval(12*60*60);
                AuthResult result = MstTokenAuthUtils.checkToken(data, session);
                if(result.getErrorMessage() != null) {
                	System.err.println(result.getErrorMessage());
                	throw new WebApplicationException(ResponseUtil.createJsonResponse(
                			EsynReturnMessageUtils.createReturnMessage(false, "", "", "expire")
                			));
                }
                
                synchronized(session) {
                	Object counterObj = session.getAttribute(MstConstant.SESSION_RCL_USAGECOUNTER);
                    if(counterObj == null) {
                    	session.setAttribute(MstConstant.SESSION_RCL_USAGECOUNTER, 1);
                    }else {
                    	session.setAttribute(MstConstant.SESSION_RCL_USAGECOUNTER, (int)counterObj + 1);
                    }
                    session.setAttribute(MstConstant.SESSION_RCL_AUTHRESULT, result);
                }
                request.setEntityInputStream(new ByteArrayInputStream(requestEntity));
            }else {
            	throw new Exception("Empty request");
            }
            return request;
        } catch (WebApplicationException webEx) {
        	throw webEx;
        } catch (Exception ex) {
        	throw new WebApplicationException(ResponseUtil.createJsonResponse(
        			EsynReturnMessageUtils.createErrorMessage(ex)
        			));
        }
	}
}
