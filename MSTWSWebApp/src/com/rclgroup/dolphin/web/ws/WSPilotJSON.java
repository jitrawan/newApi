/*------------------------------------------------------
WSInvoiceJSON.java
--------------------------------------------------------
Copyright RCL Public Co., Ltd. 2007
--------------------------------------------------------
Author Nuttpol Thanasrisati
- Change Log ----------------------------------------------------------------------------------------------------------
## 	DD/MM/YY 		–User- 			-TaskRef- 		-ShortDescription-
01	25/05/2018		Nuttapol T.						Capture HTTP Request

-----------------------------------------------------------------------------------------------------------------------
*/

package com.rclgroup.dolphin.web.ws;

import java.util.List;
import java.util.stream.Collectors;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;

import com.rclgroup.dolphin.web.model.pilot.PilotMod;
import com.rclgroup.dolphin.web.model.portlist.PortListMod;
import com.rclgroup.dolphin.web.dao.pilot.PilotDao;

import com.rclgroup.dolphin.web.common.RcmPrepareHTTPHeader;
import com.rclgroup.dolphin.web.common.RrcApplicationContextWS;

@Path("/wspilot")
public class WSPilotJSON {
	
	@POST
	@Path("/getDataPilot")
	@Produces(MediaType.APPLICATION_JSON)
	public String getData(@FormParam ("exp_imp") String exp_imp
							,@FormParam ("vessel") String vessel
							,@FormParam ("voyage") String voyage
							,@FormParam ("port") String port
							,@FormParam ("coc_soc") String coc_soc
							,@FormParam ("invoice_date_from") String invoice_date_from
							,@FormParam ("invoice_date_to") String invoice_date_to
							,@FormParam ("invoice_type") String invoice_type
							,@FormParam ("invoice") String invoice
							,@FormParam ("bl_no") String bl_no
							,@FormParam ("transaction_type") String transaction_type
							//#01 BEGIN
							,@Context HttpHeaders headers
							//#01 END
			) throws Exception {

		//#01 BEGIN
		RcmPrepareHTTPHeader prepareHTTP = new RcmPrepareHTTPHeader(headers);
		//#01 END
				
		List dataList = null;
		PilotMod bean = null;		
	
		PilotDao pilotdao = (PilotDao)RrcApplicationContextWS.getBean("pilotDao");
		
		try {
			
			dataList = pilotdao.getData(prepareHTTP.getHTTPHeader()
					                            , "getDataPilot"
												, exp_imp
												, vessel
			    		 						, voyage
							    		 		, port
							    		 		, coc_soc
							    		 		, invoice_date_from
							    		 		, invoice_date_to
							    		 		, invoice_type
							    		 		, invoice
							    		 		, bl_no
							    		 		, transaction_type);

			for (int i=0; i<dataList.size(); i++) {				
				bean = (PilotMod) dataList.get(i);				
			}
				
			System.out.println("Data Received: " + bean.getDATA_LIST().toString());
			return bean.getDATA_LIST().toString();
			
			
		} catch (Exception e) {

			e.printStackTrace();
			return e.toString();
		}
	}	
	
	
	@POST
	@Path("/maintainDataPilot")
	@Produces(MediaType.APPLICATION_JSON)
	public String maintainData(@FormParam ("maintain_type") String maintain_type
							,@FormParam ("seq") String seq
							,@FormParam ("app_reference") String app_reference
							,@FormParam ("invoice_no") String invoice_no
							,@FormParam ("invoice_type") String invoice_type
							,@FormParam ("invoice_printing_date") String invoice_printing_date
							,@FormParam ("sail_date") String sail_date
							,@FormParam ("user") String user
							//#01 BEGIN
							,@Context HttpHeaders headers
							//#01 END
			) throws Exception {

		//#01 BEGIN
		RcmPrepareHTTPHeader prepareHTTP = new RcmPrepareHTTPHeader(headers);
		//#01 END
				
		List dataList = null;
		PilotMod bean = null;		
	
		PilotDao pilotdao = (PilotDao)RrcApplicationContextWS.getBean("pilotDao");
		
		try {
			
			dataList = pilotdao.maintainData(prepareHTTP.getHTTPHeader()
					                            , "maintainDataPilot"
												, maintain_type
												, seq
												, app_reference
												, invoice_no
												, invoice_type
												, invoice_printing_date
												, sail_date
												, user
												);

			for (int i=0; i<dataList.size(); i++) {				
				bean = (PilotMod) dataList.get(i);				
			}
				
			System.out.println("Data Received: " + bean.getDATA_LIST().toString());
			return bean.getDATA_LIST().toString();
			
			
		} catch (Exception e) {

			e.printStackTrace();
			return e.toString();
		}
	}
}
