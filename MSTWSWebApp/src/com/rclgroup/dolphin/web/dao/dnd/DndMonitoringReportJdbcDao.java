package com.rclgroup.dolphin.web.dao.dnd;

import com.rclgroup.dolphin.web.common.RrcStandardDao;

import com.rclgroup.dolphin.web.common.RrcStandardMod;
import com.rclgroup.dolphin.web.model.dnd.DndMonitoringReportLevel1Mod;
import com.rclgroup.dolphin.web.model.dnd.DndMonitoringReportLevel2Mod;
import com.rclgroup.dolphin.web.model.dnd.DndMonitoringPortCountryMod;
import com.rclgroup.dolphin.web.model.dnd.DndMonitoringReportMod;

import com.rclgroup.dolphin.web.util.RutString;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import oracle.jdbc.OracleTypes;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.SqlInOutParameter;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.object.StoredProcedure;

public class DndMonitoringReportJdbcDao extends RrcStandardDao implements DndMonitoringReportDao {

    private GenerateDNDMonitoringStoreProcedure generateDNDMonitoringStoreProcedure;
    private GetDNDMonitoringLevel1Procedure getDNDMonitoringLevel1Procedure;
    private GetDNDMonitoringLevel2Procedure getDNDMonitoringLevel2Procedure;
    private GetDNDMonitoringPortCountryProcedure getDNDMonitoringPortCountryProcedure;
    private GetDNDMonitoringValidateProcedure getDNDMonitoringValidateProcedure;
    
    public DndMonitoringReportJdbcDao() {
    }
    
    protected void initDao() throws Exception {
        super.initDao();
       
        generateDNDMonitoringStoreProcedure = new GenerateDNDMonitoringStoreProcedure(getJdbcTemplate());
        getDNDMonitoringLevel1Procedure = new GetDNDMonitoringLevel1Procedure(getJdbcTemplate(), new DndMonitoringReportLevel1Mapper());        
        getDNDMonitoringLevel2Procedure = new GetDNDMonitoringLevel2Procedure(getJdbcTemplate(), new DndMonitoringReportLevel2Mapper());        
        getDNDMonitoringPortCountryProcedure = new GetDNDMonitoringPortCountryProcedure(getJdbcTemplate(), new DndMonitoringReportPortCountryMapper());
        getDNDMonitoringValidateProcedure = new GetDNDMonitoringValidateProcedure(getJdbcTemplate(), new DndMonitoringReportLevel1Mapper());
    }

    /**
     * @param mod
     * @return
     * @throws DataAccessException
     */
    public boolean generateDNDMonitoringReport(RrcStandardMod mod) throws DataAccessException {
        return generateDNDMonitoringStoreProcedure.generate(mod);
    }

    /**
     * @param userID
     * @param sessionID
     * @return
     * @throws DataAccessException
     */
    public List getDNDMonitoringReportLvl1(String userID, String sessionID) throws DataAccessException {
    
        Map map = new HashMap();
        map.put("p_user_id",userID);
        map.put("p_session_id",sessionID);
        
        List resultList = getDNDMonitoringLevel1Procedure.getDndMonitoringReportLevel1(map);             
        
        return resultList;
    }

    /**
     * @param pod
     * @param pol
     * @param billing_type
     * @param actual_days
     * @param qtn_free_days
     * @param combine
     * @param userID
     * @param sessionID
     * @return
     * @throws DataAccessException
     */
    public List getDNDMonitoringReportLvl2(String pod,
                                        String pol,
                                        String billing_type,
                                        int actual_days,
                                        int qtn_free_days,
                                        String combine,
                                        String userID,
                                        String sessionID) throws DataAccessException {
    
        Map map = new HashMap();
        
        map.put("p_pod", pod);
        map.put("p_pol", pol);
        map.put("p_billing_type", billing_type);
        map.put("p_actual_days", actual_days);
        map.put("p_qtn_free_days", qtn_free_days);
        map.put("p_combine", combine);        
        map.put("p_user_id",userID);
        map.put("p_session_id",sessionID);
        
        List resultList = getDNDMonitoringLevel2Procedure.getDndMonitoringReportLevel2(map);             
        
        return resultList;
    }

    /**
     * @param country
     * @return
     * @throws DataAccessException
     */
    public List getPODandCountry(String country) throws DataAccessException {
    
        Map map = new HashMap();
        map.put("p_country", country);        
        
        List resultList = getDNDMonitoringPortCountryProcedure.getDNDMonitoringPortCountry(map);             
        
        return resultList;
    }

    /**
     * @param pol
     * @param shipper
     * @param consignee
     * @return
     * @throws DataAccessException
     */
    public String getDNDMonitoringReportValidate(String pol, String shipper, String consignee) throws DataAccessException {
        
        Map map = new HashMap();
        String result = "";
        String txtReturn;
        
        map.put("p_type", "POL");
        map.put("p_value", pol);        
        txtReturn = getDNDMonitoringValidateProcedure.getDndMonitoringReportValidateResult(map);
        
        if (!txtReturn.equalsIgnoreCase("")) {
            result += txtReturn + ", ";
        }
        
        map.clear();
        map.put("p_type", "SHIPPER");
        map.put("p_value", shipper);
        txtReturn = getDNDMonitoringValidateProcedure.getDndMonitoringReportValidateResult(map);
        
        if (!txtReturn.equalsIgnoreCase("")) {
            result += txtReturn + ", ";
        }        
        
        map.clear();
        map.put("p_type", "CONSIGNEE");
        map.put("p_value", consignee);
        txtReturn = getDNDMonitoringValidateProcedure.getDndMonitoringReportValidateResult(map);
        
        result += txtReturn;
        
        return result.trim();
    }
    
    protected class GenerateDNDMonitoringStoreProcedure extends StoredProcedure {
        private static final String STORED_PROCEDURE_NAME = "PCR_DND_MONITORING.PRR_GET_DND_MONITORING";
         
        protected GenerateDNDMonitoringStoreProcedure(JdbcTemplate jdbcTemplate){
            
             super(jdbcTemplate, STORED_PROCEDURE_NAME);
             declareParameter(new SqlInOutParameter("p_start_date", Types.VARCHAR));
             declareParameter(new SqlInOutParameter("p_end_date", Types.VARCHAR));
             declareParameter(new SqlInOutParameter("p_country", Types.VARCHAR));
             declareParameter(new SqlInOutParameter("p_pod", Types.VARCHAR));
             declareParameter(new SqlInOutParameter("p_pol", Types.VARCHAR));
             declareParameter(new SqlInOutParameter("p_shipper", Types.VARCHAR));
             declareParameter(new SqlInOutParameter("p_consignee", Types.VARCHAR));
             declareParameter(new SqlInOutParameter("p_user_id", Types.VARCHAR));             
             declareParameter(new SqlInOutParameter("p_session_id", Types.VARCHAR));
             
             compile();
        }
         
        protected boolean generate(RrcStandardMod mod) {
            return generate(mod, mod);
        }
        
        protected boolean generate(final RrcStandardMod inputMod, RrcStandardMod outputMod) {
            boolean isSuccess = false;
            if ((inputMod instanceof DndMonitoringReportMod) && (outputMod instanceof DndMonitoringReportMod)) {
            
                Map inParameters = new HashMap();
                DndMonitoringReportMod aInputMod = (DndMonitoringReportMod) inputMod;                
                inParameters.put("p_start_date", aInputMod.getStartDate());
                inParameters.put("p_end_date", aInputMod.getEndDate());
                inParameters.put("p_country", aInputMod.getCountry());
                inParameters.put("p_pod", aInputMod.getPod());  
                inParameters.put("p_pol", aInputMod.getPol());
                inParameters.put("p_shipper", aInputMod.getShipper());  
                inParameters.put("p_consignee", aInputMod.getConsignee());
                inParameters.put("p_user_id", aInputMod.getUserID());
                inParameters.put("p_session_id", aInputMod.getSessionID());      
                
                Map outParameters = execute(inParameters);
                if (outParameters.size()>0) {
                    isSuccess = true;
                }
            }
            return isSuccess;
        }
    }
    
    
    protected class GetDNDMonitoringLevel1Procedure extends StoredProcedure{
        private static final String SQL_DND_MONITORING_LVL1 = "PCR_DND_MONITORING.PRR_GET_DND_MONITORING_LEVEL1";
        
        protected GetDNDMonitoringLevel1Procedure(JdbcTemplate jdbcTemplate, RowMapper rowMapper){
        
            super(jdbcTemplate, SQL_DND_MONITORING_LVL1);
                            
            declareParameter(new SqlOutParameter("p_dnd_monitoring_lvl1", OracleTypes.CURSOR, rowMapper));
            declareParameter(new SqlInOutParameter("p_user_id",OracleTypes.VARCHAR,rowMapper));
            declareParameter(new SqlInOutParameter("p_session_id",OracleTypes.VARCHAR,rowMapper));        
            
            compile();
        }
    
        protected List getDndMonitoringReportLevel1(Map mapParams){
            Map outMap = new HashMap();     
            
            List<DndMonitoringReportLevel1Mod> returnList = new ArrayList<DndMonitoringReportLevel1Mod>();
            
            try{
                outMap = execute(mapParams);
                returnList = (List<DndMonitoringReportLevel1Mod>) outMap.get("p_dnd_monitoring_lvl1");
                
            }catch(Exception ex){
                ex.printStackTrace();
            }            
            
            return returnList;
         }
    }
        
    private class DndMonitoringReportLevel1Mapper implements RowMapper{
    
        public Object mapRow(ResultSet rs, int row) throws SQLException {
        
            DndMonitoringReportLevel1Mod bean = new DndMonitoringReportLevel1Mod();
            
            bean.setPod(rs.getString("POD"));
            bean.setPol(rs.getString("POL"));   
            bean.setBilling_type_code(rs.getString("BILLING TYPE CODE"));   
            bean.setBilling_type_name(rs.getString("BILLING TYPE NAME"));   
            bean.setActual_days(rs.getInt("ACTUAL DAYS"));   
            bean.setQtn_days(rs.getInt("QTN DAYS"));   
            bean.setUnits(rs.getInt("UNITS"));   
            bean.setCombine(rs.getString("COMBINE"));  

            return bean;
        }
    }
    
    protected class GetDNDMonitoringLevel2Procedure extends StoredProcedure{
        private static final String SQL_DND_MONITORING_LVL2 = "PCR_DND_MONITORING.PRR_GET_DND_MONITORING_LEVEL2";
        
        protected GetDNDMonitoringLevel2Procedure(JdbcTemplate jdbcTemplate, RowMapper rowMapper){
        
            super(jdbcTemplate, SQL_DND_MONITORING_LVL2);
                            
            declareParameter(new SqlOutParameter("p_dnd_monitoring_lvl2", OracleTypes.CURSOR, rowMapper));
            
            declareParameter(new SqlInOutParameter("p_pod",OracleTypes.VARCHAR,rowMapper)); 
            declareParameter(new SqlInOutParameter("p_pol",OracleTypes.VARCHAR,rowMapper)); 
            declareParameter(new SqlInOutParameter("p_billing_type",OracleTypes.VARCHAR,rowMapper)); 
            declareParameter(new SqlInOutParameter("p_actual_days",OracleTypes.NUMBER,rowMapper)); 
            declareParameter(new SqlInOutParameter("p_qtn_free_days",OracleTypes.NUMBER,rowMapper)); 
            declareParameter(new SqlInOutParameter("p_combine",OracleTypes.VARCHAR,rowMapper)); 
            declareParameter(new SqlInOutParameter("p_user_id",OracleTypes.VARCHAR,rowMapper));
            declareParameter(new SqlInOutParameter("p_session_id",OracleTypes.VARCHAR,rowMapper)); 
            
            compile();
        }
    
        protected List getDndMonitoringReportLevel2(Map mapParams){
            Map outMap = new HashMap();           

            
            List<DndMonitoringReportLevel2Mod> returnList = new ArrayList<DndMonitoringReportLevel2Mod>();
            
            try{
                outMap = execute(mapParams);
                returnList = (List<DndMonitoringReportLevel2Mod>) outMap.get("p_dnd_monitoring_lvl2");
                
            }catch(Exception ex){
                ex.printStackTrace();
            }            
            
            return returnList;
         }
    }    
    
    private class DndMonitoringReportLevel2Mapper implements RowMapper{
    
        public Object mapRow(ResultSet rs, int row) throws SQLException {
        
            DndMonitoringReportLevel2Mod bean = new DndMonitoringReportLevel2Mod();
            
            bean.setBl_no(rs.getString("BL_NO"));
            bean.setEta(rs.getString("ETA"));
            bean.setEtd(rs.getString("ETD"));
            bean.setShipper_code(rs.getString("SHIPPER CODE"));
            bean.setShipper_name(rs.getString("SHIPPER NAME"));
            bean.setConsignee_code(rs.getString("CONSIGNEE CODE"));
            bean.setConsignee_name(rs.getString("CONSIGNEE NAME"));
            bean.setQuotation_no(rs.getString("QUOTATION NO"));
            bean.setUnits_in_bl(rs.getInt("UNITS IN BL"));
            bean.setUnits(rs.getInt("UNITS"));
            bean.setService(rs.getString("SERVICE"));
            bean.setVessel(rs.getString("VESSEL"));
            bean.setVoyage(rs.getString("VOYAGE"));

            return bean;
        }
    }

    protected class GetDNDMonitoringPortCountryProcedure extends StoredProcedure{
         private static final String SQL_DND_MONITORING_PORT_COUNTRY = "PCR_DND_MONITORING.PRR_GET_COUNTRY_PORT";
         
         protected GetDNDMonitoringPortCountryProcedure(JdbcTemplate jdbcTemplate, RowMapper rowMapper){
         
             super(jdbcTemplate, SQL_DND_MONITORING_PORT_COUNTRY);
                             
             declareParameter(new SqlOutParameter("p_country_port", OracleTypes.CURSOR, rowMapper));             
             declareParameter(new SqlInOutParameter("p_country",OracleTypes.VARCHAR,rowMapper)); 
             
             compile();
         }
     
         protected List getDNDMonitoringPortCountry(Map mapParams){
             Map outMap = new HashMap();
             
             List<DndMonitoringPortCountryMod> returnList = new ArrayList<DndMonitoringPortCountryMod>();
             
             try{
                 outMap = execute(mapParams);
                 returnList = (List<DndMonitoringPortCountryMod>) outMap.get("p_country_port");
                 
             }catch(Exception ex){
                 ex.printStackTrace();
             }            
             
             return returnList;
          }
     }
     
    private class DndMonitoringReportPortCountryMapper implements RowMapper{
     
         public Object mapRow(ResultSet rs, int row) throws SQLException {
         
             DndMonitoringPortCountryMod bean = new DndMonitoringPortCountryMod();
             
             bean.setPort_code(rs.getString("PORT CODE"));
             bean.setPort_country(rs.getString("PORT COUNTRY"));
             bean.setPort_name(rs.getString("PORT NAME"));             
             bean.setCountry_code(rs.getString("COUNTRY CODE"));
             bean.setCountry_name(rs.getString("COUNTRY NAME"));             
             
             return bean;
         }
     }
     
    protected class GetDNDMonitoringValidateProcedure extends StoredProcedure{
         private static final String SQL_DND_MONITORING_VALIDATE = "PCR_DND_MONITORING.PRR_VALIDATE_INPUT";
         
         protected GetDNDMonitoringValidateProcedure(JdbcTemplate jdbcTemplate, RowMapper rowMapper){
         
             super(jdbcTemplate, SQL_DND_MONITORING_VALIDATE);
                             
             declareParameter(new SqlOutParameter("p_result", OracleTypes.VARCHAR, rowMapper));             
             declareParameter(new SqlInOutParameter("p_type",OracleTypes.VARCHAR,rowMapper)); 
             declareParameter(new SqlInOutParameter("p_value",OracleTypes.VARCHAR,rowMapper));              
             
             compile();
         }
     
         protected String getDndMonitoringReportValidateResult(Map mapParams){
             Map outMap = new HashMap();   
             String result = "";
             
             try{
                 outMap = execute(mapParams);
                 result = (String) outMap.get("p_result");
                 
             }catch(Exception ex){
                 ex.printStackTrace();
             }            
             
             return RutString.nullToStr(result);
          }
     }   
}
