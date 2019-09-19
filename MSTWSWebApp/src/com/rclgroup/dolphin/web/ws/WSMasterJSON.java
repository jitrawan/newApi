package com.rclgroup.dolphin.web.ws;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestParam;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rclgroup.dolphin.web.model.mst.MasterMod;

// Plain old Java Object it does not extend as class or implements
// an interface

// The class registers its methods for the HTTP GET request using the @GET annotation.
// Using the @Produces annotation, it defines that it can deliver several MIME types,
// text, JSON, XML and HTML.

// The browser requests per default the HTML MIME type.

//Sets the path to base URL + /Master
@Path("/Master")
public class WSMasterJSON {
	
	  // This method is called if TEXT_PLAIN is request
	  @POST
	  @Path("/WS_MASTER_JSON")
	  @Produces(MediaType.APPLICATION_JSON)
	  public Response WS_MASTER(@Context HttpServletRequest request, @RequestParam String params, @Context HttpHeaders headers) {
		
		JSONObject json = new JSONObject();
		try {
			MasterMod masterMod = new ObjectMapper().readValue(params, MasterMod.class);
			// Creating Object of ObjectMapper define in Jakson Api 
	        ObjectMapper Obj = new ObjectMapper();
	        // get Oraganisation object as a json string 
            String jsonStr = Obj.writeValueAsString(masterMod); 
			json.put("responseCode", "200");
			json.put("userData", jsonStr);
		} catch (Exception e) {
			// TODO: handle exception
			json.put("responseCode", "401");
			json.put("Exception", e.getMessage());
		}
		
		return Response.status(200).entity(json.toString()).build();
	  }	

	  // This method is called if TEXT_PLAIN is request
	  @GET
	  @Path("/WS_MASTER_TEXT")
	  @Produces(MediaType.TEXT_PLAIN)
	  public String sayPlainTextHello() {
	    return "Hello Jersey";
	  }

	  // This method is called if XML is request
	  @GET
	  @Path("/WS_MASTER_XML")
	  @Produces(MediaType.TEXT_XML)
	  public String sayXMLHello() {
	    return "<?xml version=\"1.0\"?>" + "<hello> Hello Jersey" + "</hello>";
	  }
	
	  // This method is called if HTML is request
	  @GET
	  @Path("/WS_MASTER_HTML")
	  @Produces(MediaType.TEXT_HTML)
	  public String sayHtmlHello() {
	    return "<html> " + "<title>" + "Hello Jersey" + "</title>"
	        + "<body><h1>" + "Hello Jersey" + "</body></h1>" + "</html> ";
	  }

}