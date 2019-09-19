package com.rclgroup.dolphin.web.util.mst;

import java.lang.reflect.Field;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;


public class EsynReturnMessageUtils {

	private boolean Success = false;
	private String Method = "";
	private String Type = "";
	private String Content = "";
	
	public EsynReturnMessageUtils() {
		
	}
	
	private static boolean checkValidContent(String content) {
		
		boolean isValidContent = true;
		
		if(content == null) {
			content = "";
		}
		
		try {
			new JSONObject(content);
		}
		catch (JSONException e) {
			try {
				new JSONArray(content);
			}
			catch (JSONException  e2) {
				isValidContent = false;
			}
		}
		
		return isValidContent;
	}
	
	public static String createNewReturnMessage(boolean success, String content, String method, String type) {
		
		boolean isValidContent = checkValidContent(content);
		
		if(isValidContent) {
			String resultJson = "{"
					+ "\"Success\":" + success + ","
					+ "\"Content\":" + content + ","
					+ "\"Method\":\"" + method + "\","
					+ "\"Type\":\"" + type + "\""
					+ "}";
			return resultJson;
		}
		else {
			String resultJson = "{"
					+ "\"Success\":" + success + ","
					+ "\"Content\":\"" + content + "\","
					+ "\"Method\":\"" + method + "\","
					+ "\"Type\":\"" + type + "\""
					+ "}";
		
			return resultJson;
		}
		
	}
	
	public static String createNewReturnMessage(boolean success, String content, String method, String type,String tabPage) {
		
		boolean isValidContent = checkValidContent(content);
		
		if(tabPage == null || tabPage.equalsIgnoreCase("")) {
			tabPage = "General";
		}
		
		if(content == null) {
			content = "";
		}
		
		if(isValidContent) {
			String resultJson = "{"
					+ "\"Success\":" + success + ","
					+ "\"Content\":" + content + ","
					+ "\"Method\":\"" + method + "\","
					+ "\"Type\":\"" + type + "\","
					+ "\"ShowToTab\":\"" + tabPage + "\""
					+ "}";
			return resultJson;
		}
		else {
			
			String resultJson = "{"
					+ "\"Success\":" + success + ","
					+ "\"Content\":\"" + content.replace("\"", "\\\"") + "\","
					+ "\"Method\":\"" + method + "\","
					+ "\"Type\":\"" + type + "\","
					+ "\"ShowToTab\":\"" + tabPage + "\""
					+ "}";
		
			return resultJson.replace("\n", " ").replaceAll("\t", " ");
		}
	}
	
	public static String createNewReturnMessage(boolean success, Exception content, String method, String type,String tabPage) {
		if(content.getMessage().indexOf("*") > -1) {
			String errMsg = content.getMessage();
			errMsg = errMsg.substring(errMsg.indexOf("*"));
			errMsg = errMsg.substring(0, errMsg.indexOf("ORA-"));
			return createNewReturnMessage(success, errMsg, method, type, tabPage);
		}
		else {
			return createNewReturnMessage(success, content.getMessage(), method, type, tabPage);
		}
	}
	
	public static String createReturnMessage(boolean success, String content, String method, String type) {
		return createReturnMessage(success, content, method, type, null);
	}
	
	public static String createReturnMessage(boolean success, String content, String method, String type,
			String toTabPage) {
		
		boolean isValidContent = checkValidContent(content);
		
		String resultJson = "{"
				+ "\"Success\":" + success
				+ ",\"Content\":" + (isValidContent ? content : "\"" + content + "\"")
				+ ",\"Method\":\"" + method + "\""
				+ ",\"Type\":\"" + type + "\""
				+ "}";
		return resultJson;
	}
	
	public static String createMessageUnauthorized(String method) {
		return createReturnMessage(false, "Unauthorized", method, "Auth");
	}
	
	public static String createMessageJsonError(String method) {
		return createReturnMessage(false, "Malformed JSON", method, "Error");
	}
	
	public static String createMessageNotImplemented(String method) {
		return createReturnMessage(false, "not yet implemented", method, "Error");
	}
	
	public static String createErrorMessage(Exception e) {
		return createErrorMessage(e, null);
	}
	
	public static String createErrorMessage(Exception e, String showToTab) {
		return createReturnMessage(false, e.getMessage(), "", "Error", showToTab);
	}
	
	public static boolean isSuccessMessage(String jsonString) throws DataAccessException {
		try {
			ObjectMapper mapper = new ObjectMapper();
			JsonNode node = mapper.readTree(jsonString);
			if(node.has("Success")) {
				return node.get("Success").getBooleanValue();
			}else {
				throw new DataAccessException("Wrong format JSON. Not return message");
			}
		}catch(Exception e) {
			e.printStackTrace();
			throw new DataAccessException(e.getMessage(), e);
		}
	}
	
	public String retrieveReturnMessage() {
		
		try {
			String jsonResult = "{";
			
			boolean firstRound = true;
			for (Field field : this.getClass().getDeclaredFields()) {

				if(firstRound) {
					firstRound = false;
				}
				else {
					jsonResult += ",";
				}
				
				Object fieldValue = field.get(this);
				
				if(fieldValue != null) {
					
					jsonResult += "\"" + field.getName() + "\":" ;
					if(field.getType().equals(boolean.class) || field.getType().equals(double.class) || field.getType().equals(int.class)) {
						jsonResult += fieldValue;
					}
					else {
						jsonResult += "\"" + fieldValue + "\"";
					}
				}
				else {
						jsonResult += "\"" + field.getName() + "\":null";
				}
			}
			
			jsonResult += "}";
			
			return jsonResult;
		}
		catch (Exception e) {
			e.printStackTrace();
			return " {\"Success\" : false, \"Content\" : \"Exception retrieveReturnMessage\"}";
		}	
	}

	public boolean isSuccess() {
		return Success;
	}

	public void setSuccess(boolean success) {
		Success = success;
	}

	public String getContent() {
		return Content;
	}

	public void setContent(String content) {
		Content = content;
	}

	public String getMethod() {
		return Method;
	}

	public void setMethod(String method) {
		Method = method;
	}

	public String getType() {
		return Type;
	}

	public void setType(String type) {
		Type = type;
	}
	
}
