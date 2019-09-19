package com.rclgroup.dolphin.web.filter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.core.Context;

import com.rclgroup.dolphin.web.util.mst.MstConstant;
import com.sun.jersey.spi.container.ContainerRequest;
import com.sun.jersey.spi.container.ContainerResponse;
import com.sun.jersey.spi.container.ContainerResponseFilter;

public class ServiceOutboundFilter implements ContainerResponseFilter {

	@Context
	private HttpServletRequest httpRequest;
	
	@Override
    public ContainerResponse filter(ContainerRequest creq, ContainerResponse cresp) {
		try {
			HttpSession session = httpRequest.getSession();
			synchronized(session) {
				Object counterObj = session.getAttribute(MstConstant.SESSION_RCL_USAGECOUNTER);
				if(counterObj != null) {
					int counter = (int)counterObj;
					if(counter > 1) {
						session.setAttribute(MstConstant.SESSION_RCL_USAGECOUNTER, counter-1);
					}else {
						session.removeAttribute(MstConstant.SESSION_RCL_AUTHRESULT);
						session.removeAttribute(MstConstant.SESSION_RCL_USAGECOUNTER);
					}
				}
			}
		}catch(Exception ex) {
			//Don't abort response, just catch some potential error here
			ex.printStackTrace();
		}
        return cresp;
    }
}
