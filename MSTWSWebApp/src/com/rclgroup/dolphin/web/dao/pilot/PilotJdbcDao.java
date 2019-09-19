package com.rclgroup.dolphin.web.dao.pilot;

import java.io.Reader;
import java.sql.Clob;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.SqlInOutParameter;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.object.StoredProcedure;

import com.rclgroup.dolphin.web.common.RrcStandardDao;
import com.rclgroup.dolphin.web.dao.pilot.PilotDao;
import com.rclgroup.dolphin.web.dao.pilot.PilotJdbcDao.GetDataProcedure;
import com.rclgroup.dolphin.web.model.pilot.PilotMod;
import com.rclgroup.dolphin.web.model.portlist.PortListMod;

import oracle.jdbc.OracleTypes;

public class PilotJdbcDao extends RrcStandardDao implements PilotDao { 
	
	private GetDataProcedure getDataProcedure;
	private MaintainDataProcedure maintainDataProcedure;
	
	public PilotJdbcDao() {
    }
    
    protected void initDao() throws Exception {
    	
        super.initDao();

        getDataProcedure = new GetDataProcedure(getJdbcTemplate(), new DataMapper());      
        maintainDataProcedure = new MaintainDataProcedure(getJdbcTemplate(), new DataMapper());    
        
    }
    
    public List getData(String strHTTPHeader
    						, String strWSPath
	 						, String strExportImport
	 						, String strVessel
					 		, String strVoyage
					 		, String strPort
					 		, String strCOCSOC
					 		, String strInvoiceDateFrom
		    		 		, String strInvoiceDateTo
		    		 		, String strInvoiceType
					 		, String strInvoice
					 		, String strBL_No
		    		 		, String strTransactionType) throws DataAccessException {
        
    	System.out.println("HTTP Header: " + strHTTPHeader);
    	System.out.println("WS Path: " + strWSPath);
    	System.out.println("Export Import: " + strExportImport);
    	System.out.println("Vessel: " + strVessel);
    	System.out.println("Voyage: " + strVoyage);
    	System.out.println("Port: " + strPort);
    	System.out.println("COC SOC: " + strCOCSOC);
    	System.out.println("Invoice Date From: " + strInvoiceDateFrom);
    	System.out.println("Invoice Date To: " + strInvoiceDateTo);
    	System.out.println("Invoice Type: " + strInvoiceType);
    	System.out.println("Invoice No: " + strInvoice);
    	System.out.println("BL No: " + strBL_No);
    	System.out.println("Transaction Type: " + strTransactionType);
    	
        Map map = new HashMap();
        
        map.put("P_HTTP_HEADER",strHTTPHeader);    
        map.put("P_WS_PATH",strWSPath);    
        
        map.put("P_EXPORT_IMPORT",strExportImport);    
        map.put("P_EXPORT_IMPORT",strExportImport);    
        map.put("P_VESSEL",strVessel);                 
        map.put("P_VOYAGE",strVoyage);                
        map.put("P_PORT",strPort);                  
        map.put("P_COC_SOC",strCOCSOC);     
        map.put("P_INVOICE_DATE_FROM",strInvoiceDateFrom); 
        map.put("P_INVOICE_DATE_TO",strInvoiceDateTo); 
        map.put("P_INVOICE_TYPE",strInvoiceType); 
        map.put("P_INVOICE",strInvoice);   
        
        map.put("P_BL_NO",strBL_No);        
        map.put("P_TRANSACTION_TYPE",strTransactionType);        
        
        List resultList = getDataProcedure.getData(map);             
        
        return resultList;
    }

    
    protected class GetDataProcedure extends StoredProcedure{
        private static final String SQL_GET_DATA = "VASAPPS.PCR_WS_PILOT.PRR_GET_DATA";
        
        protected GetDataProcedure(JdbcTemplate jdbcTemplate, RowMapper rowMapper){
        
            super(jdbcTemplate, SQL_GET_DATA);
            
            declareParameter(new SqlOutParameter("P_DATA_LIST", OracleTypes.CURSOR, rowMapper));  
            
            declareParameter(new SqlInOutParameter("P_HTTP_HEADER",OracleTypes.VARCHAR,rowMapper));  
            declareParameter(new SqlInOutParameter("P_WS_PATH",OracleTypes.VARCHAR,rowMapper));
            
            declareParameter(new SqlInOutParameter("P_EXPORT_IMPORT",OracleTypes.VARCHAR,rowMapper));  
            declareParameter(new SqlInOutParameter("P_VESSEL",OracleTypes.VARCHAR,rowMapper));  
            declareParameter(new SqlInOutParameter("P_VOYAGE",OracleTypes.VARCHAR,rowMapper));  
            declareParameter(new SqlInOutParameter("P_PORT",OracleTypes.VARCHAR,rowMapper));  
            declareParameter(new SqlInOutParameter("P_COC_SOC",OracleTypes.VARCHAR,rowMapper));  
            declareParameter(new SqlInOutParameter("P_INVOICE_DATE_FROM",OracleTypes.VARCHAR,rowMapper));  
            declareParameter(new SqlInOutParameter("P_INVOICE_DATE_TO",OracleTypes.VARCHAR,rowMapper));  
            declareParameter(new SqlInOutParameter("P_INVOICE_TYPE",OracleTypes.VARCHAR,rowMapper)); 
            declareParameter(new SqlInOutParameter("P_INVOICE",OracleTypes.VARCHAR,rowMapper));  
            
            declareParameter(new SqlInOutParameter("P_BL_NO",OracleTypes.VARCHAR,rowMapper)); 
            declareParameter(new SqlInOutParameter("P_TRANSACTION_TYPE",OracleTypes.VARCHAR,rowMapper)); 
            
            compile();
        }
    
        protected List getData(Map mapParams){
        	
            Map outMap = new HashMap();   
            List<PilotMod> returnList = new ArrayList<PilotMod>();
            
            try{
                outMap = execute(mapParams);                  
                returnList = (List<PilotMod>) outMap.get("P_DATA_LIST");
                
            }catch(Exception ex){
            	
            	System.out.println("Error in getData");
            	
                ex.printStackTrace();
            }            
            
            return returnList;
         }
    }
        
    
    private class DataMapper implements RowMapper{
    
        public Object mapRow(ResultSet rs, int row) throws SQLException {
        
            PilotMod bean = new PilotMod();
            StringBuffer sb = new StringBuffer();
            
            Clob clob = rs.getClob("DATA_DETAIL");
            
            try {
            
	            Reader reader = clob.getCharacterStream();
	    		char[] buffer = new char[(int)clob.length()];
	    		while(reader.read(buffer) != -1){
	    			sb.append(buffer);				
	    		}
	    		
	    		System.out.println("Result " + sb.toString());
	    		
	    		bean.setDATA_LIST(sb.toString());
	    		
            } catch (Exception exc) {
            	
            	
            }
            
            return bean;
        }
        
    }
    
    public List maintainData(String strHTTPHeader
			    		, String strWSPath
				 		, String strMaintain_type
						, String strSeq
						, String strApp_reference
						, String strInvoice_no
						, String strInvoice_type
						, String strInvoice_printing_date
						, String strSail_date
						, String strUser
						) throws DataAccessException {

			System.out.println("HTTP Header: " + strHTTPHeader);
			System.out.println("WS Path: " + strWSPath);
			System.out.println("Maintain Type: " + strMaintain_type);
			System.out.println("Seq: " + strSeq);
			System.out.println("App Reference: " + strApp_reference);
			System.out.println("Invoice No: " + strInvoice_no);
			System.out.println("Invoice Type: " + strInvoice_type);
			System.out.println("Invoice Printing Date: " + strInvoice_printing_date);
			System.out.println("Sail Date: " + strSail_date);
			System.out.println("User: " + strUser);
			
			Map map = new HashMap();
			
			map.put("P_HTTP_HEADER",strHTTPHeader);    
			map.put("P_WS_PATH",strWSPath);    
			
			map.put("P_MAINTAIN_TYPE",strMaintain_type);    
			map.put("P_SEQ",strSeq);    
			map.put("P_APP_REFERENCE",strApp_reference);                 
			map.put("P_INVOICE_NO",strInvoice_no);                
			map.put("P_INVOICE_TYPE",strInvoice_type);                  
			map.put("P_INVOICE_PRINTING_DATE",strInvoice_printing_date);     
			map.put("P_SAIL_DATE",strSail_date); 
			map.put("P_USER",strUser); 
			
			List resultList = maintainDataProcedure.getData(map);             
			
			return resultList;

    }
    
    protected class MaintainDataProcedure extends StoredProcedure{
        private static final String SQL_MAINTAIN_DATA = "VASAPPS.PCR_WS_PILOT.PRR_MAINTAIN_DATA";
        
        protected MaintainDataProcedure(JdbcTemplate jdbcTemplate, RowMapper rowMapper){
        
            super(jdbcTemplate, SQL_MAINTAIN_DATA);
            
            declareParameter(new SqlOutParameter("P_DATA_LIST", OracleTypes.CURSOR, rowMapper));  
            
            declareParameter(new SqlInOutParameter("P_HTTP_HEADER",OracleTypes.VARCHAR,rowMapper));  
            declareParameter(new SqlInOutParameter("P_WS_PATH",OracleTypes.VARCHAR,rowMapper));
            
            declareParameter(new SqlInOutParameter("P_MAINTAIN_TYPE",OracleTypes.VARCHAR,rowMapper));  
            declareParameter(new SqlInOutParameter("P_SEQ",OracleTypes.VARCHAR,rowMapper));  
            declareParameter(new SqlInOutParameter("P_APP_REFERENCE",OracleTypes.VARCHAR,rowMapper));  
            declareParameter(new SqlInOutParameter("P_INVOICE_NO",OracleTypes.VARCHAR,rowMapper));  
            declareParameter(new SqlInOutParameter("P_INVOICE_TYPE",OracleTypes.VARCHAR,rowMapper));  
            declareParameter(new SqlInOutParameter("P_INVOICE_PRINTING_DATE",OracleTypes.VARCHAR,rowMapper));  
            declareParameter(new SqlInOutParameter("P_SAIL_DATE",OracleTypes.VARCHAR,rowMapper));  
            declareParameter(new SqlInOutParameter("P_USER",OracleTypes.VARCHAR,rowMapper)); 
            
            compile();
        }
    
        protected List getData(Map mapParams){
        	
            Map outMap = new HashMap();   
            List<PilotMod> returnList = new ArrayList<PilotMod>();
            
            try{
                outMap = execute(mapParams);                  
                returnList = (List<PilotMod>) outMap.get("P_DATA_LIST");
                
            }catch(Exception ex){
            	
            	System.out.println("Error in getData");
            	
                ex.printStackTrace();
            }            
            
            return returnList;
         }
    }
        
    /*
    private class DataMapper implements RowMapper{
    
        public Object mapRow(ResultSet rs, int row) throws SQLException {
        
            PilotMod bean = new PilotMod();
            StringBuffer sb = new StringBuffer();
            
            Clob clob = rs.getClob("DATA_DETAIL");
            
            try {
            
	            Reader reader = clob.getCharacterStream();
	    		char[] buffer = new char[(int)clob.length()];
	    		while(reader.read(buffer) != -1){
	    			sb.append(buffer);				
	    		}
	    		
	    		System.out.println("Result " + sb.toString());
	    		
	    		bean.setDATA_LIST(sb.toString());
	    		
            } catch (Exception exc) {
            	
            	
            }
            
            return bean;
        }
        
    }
    */

}
