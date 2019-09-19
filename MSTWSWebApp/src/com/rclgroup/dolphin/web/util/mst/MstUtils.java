package com.rclgroup.dolphin.web.util.mst;

import java.io.IOException;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;

import com.rclgroup.dolphin.web.auth.BrowserData;

public class MstUtils {
	/**
	 * Map json string to BrowserData. Return null if mapping fail
	 */
	public static BrowserData mapToBrowserData(String jsonString) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			JsonNode rootNode = mapper.readTree(jsonString);
			if(rootNode.has("userData")) {
				BrowserData browserData = mapper.readValue(rootNode.get("userData"), BrowserData.class);
				return browserData;
			}else {
				return null;
			}
		}catch(IOException ioex) {
			return null;
		}
		
	}

}
