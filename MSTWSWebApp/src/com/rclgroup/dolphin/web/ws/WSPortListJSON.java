package com.rclgroup.dolphin.web.ws;

import java.util.List;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.rclgroup.dolphin.web.common.RcmPrepareHTTPHeader;
import com.rclgroup.dolphin.web.common.RrcApplicationContextWS;
import com.rclgroup.dolphin.web.dao.portlist.PortListDao;
import com.rclgroup.dolphin.web.model.portlist.PortListMod;

@Path("/portlist")
public class WSPortListJSON {
	
	List portlistList = null;
	
	@POST
	@Path("/getPortList")
	@Produces(MediaType.APPLICATION_JSON)
	public String getPortCode(@FormParam ("port_code") String strPortcode	
							, @Context HttpHeaders headers
			) throws Exception {

		
		JSONObject json;
		JSONArray  jarray = new JSONArray();
		JSONObject portListJSON = new JSONObject();   
		
		RcmPrepareHTTPHeader prepareHTTP = new RcmPrepareHTTPHeader(headers);
		
		List portList = null;		
	
		PortListDao portListdao = (PortListDao)RrcApplicationContextWS.getBean("portListDao");
		
		try {
	
			PortListMod bean = null;
			portList = portListdao.getPortList(prepareHTTP.getHTTPHeader()
										, "getPortList"
										, strPortcode);
			
			for (int i=0; i<portList.size(); i++) {
				
				bean = (PortListMod) portList.get(i);
				
				json = new JSONObject();
			
				json.put("PORT_CODE",bean.getPortCode());
				json.put("PORT_NAME",bean.getPortName());
				json.put("PORT_COUNTRY",bean.getPortCountry());
				
				jarray.add(json);

			}
			
			portListJSON.put("portList", jarray);
			System.out.println("Data Received: " + portListJSON.toString());
			return portListJSON.toString();
			
			
		} catch (Exception e) {

			e.printStackTrace();
			return e.toString();
		}
		
		
 
		
	}

}
