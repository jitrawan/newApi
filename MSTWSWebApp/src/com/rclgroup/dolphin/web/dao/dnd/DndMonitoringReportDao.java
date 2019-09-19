package com.rclgroup.dolphin.web.dao.dnd;

import com.rclgroup.dolphin.web.common.RrcStandardMod;

import java.util.List;
import org.springframework.dao.DataAccessException;

public interface DndMonitoringReportDao {

     public boolean generateDNDMonitoringReport(RrcStandardMod mod) throws DataAccessException;
                                            
    /**
     *     
     * @param userID
     * @param sessionID
     * @return
     * @throws DataAccessException
     */
     public List getDNDMonitoringReportLvl1(String userID,
                                            String sessionID) throws DataAccessException;
                                            
    /**
     *     
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
                                        String sessionID) throws DataAccessException;
                                        
                                        
    /**
     *     
     * @param country
     * @return
     * @throws DataAccessException
     */
     public List getPODandCountry(String country) throws DataAccessException;
     
     
    /**
     *     
     * @param pol
     * @param shipper
     * @param consignee
     * @return
     * @throws DataAccessException
     */
     public String getDNDMonitoringReportValidate(String pol, String shipper, String consignee) throws DataAccessException;
    
}
