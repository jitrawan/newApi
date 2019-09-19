package com.rclgroup.dolphin.web.dao.portlist;

import org.springframework.dao.DataAccessException;
import java.util.List;

public interface PortListDao {
     
     public List getPortList(String strHTTPHeader
							, String strWSPath
							, String strPortcode) throws DataAccessException;                                            
    
}
