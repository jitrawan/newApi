package com.rclgroup.dolphin.web.ws;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestParam;

import javax.ws.rs.core.Response.ResponseBuilder;

import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.FormDataParam;

/**
 * This example shows how to build Java REST web-service to upload files 
 * accepting POST requests with encryption type "multipart/form-data".
 * For more details please read the full tutorial
 * on https://javatutorial.net/java-file-upload-rest-service
 * @author javatutorial.net
 */
@Path("/file")
public class FileUploadService {
	
	/** The path to the folder where we want to store the uploaded files */
//	private static final String UPLOAD_FOLDER = "D:/uploadedFiles/";
	private static final String UPLOAD_FOLDER = "/ApplTop/FileDEV/UploadedFiles/QTN/";
	
	public FileUploadService() {}
	
	@Context
    private UriInfo context;

    /**
     * Returns text response to caller containing current time-stamp
     * @return error response in case of missing parameters an internal exception or
     * success response if file has been stored successfully 
     */
	@POST
	@Path("/upload")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response uploadFile(
        @FormDataParam("file") InputStream uploadedInputStream,
        @FormDataParam("file") FormDataContentDisposition fileDetail) {
		
		JSONObject resp = new JSONObject();
		
		// check if all form parameters are provided
		if (uploadedInputStream == null || fileDetail == null) {
			resp.put("responseCode", "400");
			resp.put("responseMessage", "Invalid form data");
			return Response.status(400).entity(resp.toString()).build();
		}
		
		// create our destination folder, if it not exists
		try {
			createFolderIfNotExists(UPLOAD_FOLDER);
		} catch (SecurityException se) {
			resp.put("responseCode", "500");
			resp.put("responseMessage", "Can not create destination folder on server");
			return Response.status(500).entity(resp.toString()).build();
		}

		String fileName = fileDetail.getFileName();;
        String uploadedFileLocation = UPLOAD_FOLDER + fileName;
        
        try {
			saveToFile(uploadedInputStream, uploadedFileLocation);
			resp.put("responseCode", "200");
			resp.put("responseMessage", "File Saved Success");
			resp.put("fileName", fileName);
			return Response.status(200).entity(resp.toString()).build();
		} catch (IOException e) {
			resp.put("responseCode", "500");
			resp.put("responseMessage", "Can not save file : "+e.getMessage());
			return Response.status(500).entity(resp.toString()).build();
		} 
    }
	
    @GET
    @Path("/download/{fileName}")
//    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response downloadFileWithGet(@PathParam(value="fileName") String fileName) {
    	
    	ResponseBuilder response = null;
    	try {
	    	File fileDownload = new File(UPLOAD_FOLDER + File.separator + fileName);
	    	response = Response.ok((Object) fileDownload);
	    	response.header("Content-Disposition", "attachment;filename=" + fileName);
	    	return response.build();
		} catch (Exception e) {
			JSONObject resp = new JSONObject();
			resp.put("responseCode", "500");
			resp.put("responseMessage", "Can not download file : "+e.getMessage());
			return Response.status(200).entity(resp.toString()).build();
		}
    }
    
    @GET
    @Path("/delete/{fileName}")
    public Response deleteFileWithGet(@PathParam(value="fileName") String fileName) {
    	
    	JSONObject resp = new JSONObject();
    	try {
	    	File file = new File(UPLOAD_FOLDER+ fileName);
	    	 if(file.delete()){
	             resp.put("responseCode", "200");
	 			 resp.put("responseMessage", "Deletion successful.");
	 			 return Response.status(200).entity(resp.toString()).build();
	         }else {
	        	 resp.put("responseCode", "400");
	 			 resp.put("responseMessage", "file "+UPLOAD_FOLDER+fileName+" doesn't exist.");
	 			 return Response.status(400).entity(resp.toString()).build();
	         }
		} catch(Exception e) { 
            resp.put("responseCode", "400");
			resp.put("responseMessage", e.getMessage());
			return Response.status(400).entity(resp.toString()).build();
        }  
    }
    
    @POST
    @Path("/delete")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteFileWithPost(@RequestParam String params) {
    	
    	try {
    		final JSONObject jsonObject = new JSONObject(params);
    		final JSONArray data = jsonObject.getJSONArray("listFile");
    		
    		ArrayList<String> arr = new ArrayList<>();
    		for(Object o: data){
    		    if ( o instanceof JSONObject ) {
    		    	JSONObject json = (JSONObject)o;
//    		    	System.out.println(json.get("name"));
    		    	String filename = json.get("name").toString();
    		    	File file = new File(UPLOAD_FOLDER + filename );
//    		    	System.out.println(UPLOAD_FOLDER + filename );
    		    	if(file.delete()){
    		    		arr.add(filename+" : deletion successful");
    			    }else {
    			    	arr.add(filename+" : doesn't exist");
    		 		}
    		    }
    		}
    		
    		JSONObject resp = new JSONObject();
            resp.put("responseCode", "200");
			resp.put("responseMessage", arr.toString());
        	return Response.status(200).entity(resp.toString()).build();
        	
		} catch (Exception e) {
			// TODO: handle exception
			return Response.status(500).entity(e.getMessage()).build();
		}
    	
    	
    	
//    	JSONObject resp = new JSONObject();
//    	try {
//    		
//    		
//	    	File file = new File(UPLOAD_FOLDER+ fileName);
//	    	 if(file.delete()){
//	             resp.put("responseCode", "200");
//	 			 resp.put("responseMessage", "Deletion successful.");
//	 			 return Response.status(200).entity(resp.toString()).build();
//	         }else {
//	        	 resp.put("responseCode", "400");
//	 			 resp.put("responseMessage", "file "+UPLOAD_FOLDER+fileName+" doesn't exist.");
//	 			 return Response.status(400).entity(resp.toString()).build();
//	         }
//		} catch(Exception e) { 
//            resp.put("responseCode", "400");
//			resp.put("responseMessage", e.getMessage());
//			return Response.status(400).entity(resp.toString()).build();
//        }  
    }

    /**
     * Utility method to save InputStream data to target location/file
     * @param inStream - InputStream to be saved
     * @param target - full path to destination file
     */
	private void saveToFile(InputStream inStream, String target) throws IOException {
		OutputStream out = null;
		int read = 0;
		byte[] bytes = new byte[1024];

		out = new FileOutputStream(new File(target));
		while ((read = inStream.read(bytes)) != -1) {
			out.write(bytes, 0, read);
		}
		out.flush();
		out.close();
	}
    
    /**
     * Creates a folder to desired location if it not already exists
     * @param dirName - full path to the folder
     * @throws SecurityException - in case you don't have permission to create the folder
     */
	private void createFolderIfNotExists(String dirName) throws SecurityException {
    	File theDir = new File(dirName);
    	if (!theDir.exists()) {
    		theDir.mkdir();
    	}
    	
    	// check if file exists 
        boolean exists = theDir.exists(); 
        if(exists == true) 
        { 
            // changing the file permissions 
        	theDir.setExecutable(true); 
        	theDir.setReadable(true); 
        	theDir.setWritable(true); 
            System.out.println("File permissions changed."); 
  
            // printing the permissions associated with the file currently 
            System.out.println("Executable: " + theDir.canExecute()); 
            System.out.println("Readable: " + theDir.canRead()); 
            System.out.println("Writable: "+ theDir.canWrite()); 
              
        } 
        else
        { 
            System.out.println("File not found."); 
        } 
    }
}