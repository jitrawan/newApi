package com.rclgroup.dolphin.web.ws;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.core.Application;

public class RCLApplicationWebService extends Application {

	@Override
	public Set<Class<?>> getClasses() {
		Set<Class<?>> classes = new HashSet<Class<?>>();
		
		//IF THERE IS NEW WEB SERVICE, PLEASE ALSO ADD SUCH NEW WEB SERVICE HERE
//		classes.add(WSPortListJSON.class);
		
//		classes.add(WSPilotJSON.class);
		
//		classes.add(FileUploadService.class);
		
		classes.add(WSMasterJSON.class);
		
		return classes;
	}
}
