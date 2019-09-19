package com.rclgroup.dolphin.web.dao.portlist;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlInOutParameter;
import org.springframework.jdbc.object.StoredProcedure;

import com.rclgroup.dolphin.web.common.RrcStandardDao;
import com.rclgroup.dolphin.web.model.portlist.PortListMod;

import oracle.jdbc.OracleTypes;

public class PortListJdbcDao extends RrcStandardDao implements PortListDao { 
	
	private GetPortListProcedure getPortListProcedure;
	
	public PortListJdbcDao() {
    }
    
    protected void initDao() throws Exception {
    	
        super.initDao();

        getPortListProcedure = new GetPortListProcedure(getJdbcTemplate(), new PortListMapper());        
        
    }
    
    public List getPortList(String strHTTPHeader
						, String strWSPath
    					, String strPortcode) throws DataAccessException {
        
    	System.out.println("Port Code: " + strPortcode);
    	
        Map map = new HashMap();
        
        map.put("P_HTTP_HEADER",strHTTPHeader);
        map.put("P_WS_PATH",strWSPath);
        map.put("P_PORT_CODE",strPortcode);
        
        List resultList = getPortListProcedure.getPortList(map);             
        
        return resultList;
    }

    
    protected class GetPortListProcedure extends StoredProcedure{
        private static final String SQL_PORT_LIST = "PCR_WS_FUNCTIONALITIES.PRR_GET_PORT_LIST";
        
        protected GetPortListProcedure(JdbcTemplate jdbcTemplate, RowMapper rowMapper){
        
            super(jdbcTemplate, SQL_PORT_LIST);
            
            declareParameter(new SqlOutParameter("P_PORT_LIST", OracleTypes.CURSOR, rowMapper)); 
            
            declareParameter(new SqlInOutParameter("P_HTTP_HEADER",OracleTypes.VARCHAR,rowMapper)); 
            declareParameter(new SqlInOutParameter("P_WS_PATH",OracleTypes.VARCHAR,rowMapper)); 
            
            declareParameter(new SqlInOutParameter("P_PORT_CODE",OracleTypes.VARCHAR,rowMapper));  
                     
            
            compile();
        }
    
        protected List getPortList(Map mapParams){        	
       	
            Map outMap = new HashMap();     
            
            List<PortListMod> returnList = new ArrayList<PortListMod>();
            
            try{
                outMap = execute(mapParams);
                returnList = (List<PortListMod>) outMap.get("P_PORT_LIST");
                
            }catch(Exception ex){
            	
            	System.out.println("Error in getPortList");
            	
                ex.printStackTrace();
            }            
            
            return returnList;
         }
    }
        
    private class PortListMapper implements RowMapper{
    
        public Object mapRow(ResultSet rs, int row) throws SQLException {
        
        	PortListMod bean = new PortListMod();
        	
        	System.out.println("getPortList");
            
            bean.setPortCode(rs.getString("PORT_CODE"));
            bean.setPortName(rs.getString("PORT_NAME"));
            bean.setPortCountry(rs.getString("PORT_COUNTRY"));
            
            System.out.println(bean.getPortCode());
            System.out.println(bean.getPortName());
            System.out.println(bean.getPortCountry());

            return bean;
        }
    }
}
