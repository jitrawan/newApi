/*--------------------------------------------------------
DndMonitoringReportUim.java
--------------------------------------------------------
Copyright RCL Public Co., Ltd. 2009
--------------------------------------------------------
Author Nuttapol Thanasrisatit 28/05/2013
- Change Log--------------------------------------------
## DD/MM/YY -User- -TaskRef- -ShortDescription
01 28/05/13 NUTTHA1          Create DND Monitoring Uim
--------------------------------------------------------
*/

package com.rclgroup.dolphin.web.ui.dnd;

import com.rclgroup.dolphin.web.common.RrcStandardUim;
import com.rclgroup.dolphin.web.dao.dnd.DndMonitoringReportDao;
import com.rclgroup.dolphin.web.model.dnd.DndMonitoringReportMod;

import com.rclgroup.dolphin.web.util.RutDate;
import com.rclgroup.dolphin.web.util.RutString;
import java.util.List;

/**
 */
public class DndMonitoringReportUim  extends RrcStandardUim {

    private String strStartDate;
    private String strEndDate;
    private String strCountry;
    private String strPod;
    private String strPol;
    private String strShipper;
    private String strConsignee;
    
    private String strPodLvl2;
    private String strPolLvl2;
    private String strBilling_type;
    private int intActual_days;
    private int intQtn_free_days;
    private String strCombine;
    
    private String strPermissionUser;
    private String strReportUrl;
    
    private List resultLevel1;
    private List resultLevel2;
    private List resultPortCountry;
 
    private DndMonitoringReportDao dndMonitoringReportDao;
    
    public DndMonitoringReportUim() {    
        strStartDate = "";
        strEndDate = "";
        strCountry = "";
        strPod = "";
        strPol = "";   
        strReportUrl = "";
    }

    /**
     * Set DND Monitoring Start Date
     * @param strStartDate
     */
    public void setStrStartDate(String strStartDate) {
        this.strStartDate = strStartDate;        
    }

    /**
     * Get DND Monitoring Start Date
     * @return
     */
    public String getStrStartDate() {
        return strStartDate;        
    }

    /**
     * Set DND Monitoring End Date
     * @param strEndDate
     */
    public void setStrEndDate(String strEndDate) {
        this.strEndDate = strEndDate;        
    }

    /** 
     * Get DND Monitoring End Date
     * @return
     */
    public String getStrEndDate() {
        return strEndDate;        
    }

    /**
     * Set DND Monitoring Country
     * @param strCountry
     */
    public void setStrCountry(String strCountry) {
        this.strCountry = strCountry;        
    }

    /**
     * Get DND Monitoring Country
     * @return
     */
    public String getStrCountry() {
        return strCountry;        
    }

    /**
     * Set DND Monitoring POL
     * @param strPol
     */
    public void setStrPol(String strPol) {
        this.strPol = strPol;        
    }

    /**
     * Get DND Monitoring POL
     * @return
     */
    public String getStrPol() {
        return strPol;        
    }

    /**
     * Set DND Monitoring POD
     * @param strPod
     */
    public void setStrPod(String strPod) {
        this.strPod = strPod;        
    }

    /**
     * Get DND Monitoring POD
     * @return
     */
    public String getStrPod() {
        return strPod;        
    }

    /**
     * Set DND Monitoring Shipper
     * @param strShipper
     */
    public void setStrShipper(String strShipper) {
        this.strShipper = strShipper;        
    }

    /**
     * Get DND Monitoring Shipper
     * @return
     */
    public String getStrShipper() {
        return strShipper;        
    }

    /**
     * Set DND Monitoring Consignee
     * @param strConsignee
     */
    public void setStrConsignee(String strConsignee) {
        this.strConsignee = strConsignee;        
    }

    /**
     * Get DND Monitoring Consignee
     * @return
     */
    public String getStrConsignee() {
        return strConsignee;        
    }

    /**
     * Set DND Monitoring POL Level2
     * @param strPolLvl2
     */
    public void setStrPolLvl2(String strPolLvl2) {
        this.strPolLvl2 = strPolLvl2;        
    }

    /**
     * Get DND Monitoring POL Level2
     * @return
     */
    public String getStrPolLvl2() {
        return strPolLvl2;        
    }

    /**
     * Set DND Monitoring POD Level2
     * @param strPodLvl2
     */
    public void setStrPodLvl2(String strPodLvl2) {
        this.strPodLvl2 = strPodLvl2;        
    }

    /**
     * Get DND Monitoring POD Level2
     * @return
     */
    public String getStrPodLvl2() {
        return strPodLvl2;        
    }

    /**
     * Set DND Monitoring Billing Type
     * @param strBilling_type
     */
    public void setStrBilling_type(String strBilling_type) {
        this.strBilling_type = strBilling_type;        
    }

    /**
     * Get DND Monitoring Billing Type
     * @return
     */
    public String getStrBilling_type() {
        return strBilling_type;        
    }

    /**
     * Set DND Monitoring Actual Days
     * @param intActual_days
     */
    public void setIntActual_days(int intActual_days) {
        this.intActual_days = intActual_days;        
    }

    /**
     * Get DND Monitoring Actual Days
     * @return
     */
    public int getIntActual_days() {
        return intActual_days;        
    }

    /**
     * Set DND Monitoring QTN Free Days
     * @param intQtn_free_days
     */
    public void setIntQtn_free_days(int intQtn_free_days) {
        this.intQtn_free_days = intQtn_free_days;        
    }

    /**
     * Get DND Monitoring QTN Free Days
     * @return
     */
    public int getIntQtn_free_days() {
        return intQtn_free_days;        
    }

    /**
     * Set DND Monitoring Combine
     * @param strCombine
     */
    public void setStrCombine(String strCombine) {
        this.strCombine = strCombine;        
    }

    /**
     * Get DND Monitoring Combine
     * @return
     */
    public String getStrCombine() {
        return strCombine;        
    }

    /**
     * Get DND Monitoring Permission User
     * @return
     */
    public String getStrPermissionUser() {
        return strPermissionUser;
    }

    /**
     * Set DND Monitoring Permission User
     * @param strPermissionUser
     */
    public void setStrPermissionUser(String strPermissionUser) {
        this.strPermissionUser = strPermissionUser;
    }

    /**
     * Get DND Monitoring Report URL
     * @return
     */
    public String getStrReportUrl() {
        return strReportUrl;
    }

    /**
     * Set DND Monitoring Report URL
     * @param strReportUrl
     */
    public void setStrReportUrl(String strReportUrl) {
        this.strReportUrl = strReportUrl;
    }

    /**
     * Set DND Monitoring DAO Object
     * @param dndMonitoringReportDao
     */
    public void setDndMonitoringReportDao(DndMonitoringReportDao dndMonitoringReportDao) {
        this.dndMonitoringReportDao = dndMonitoringReportDao;
    }

    /**
     * Get Result for generating DND Monitoring
     * @param strUserId
     * @param strSessionId
     * @return
     */
    public boolean generateDndMonitoringReport(String strUserId, String strSessionId) {
        boolean isSuccess = false;
        
        if (!RutString.isEmptyString(strSessionId)) {
            DndMonitoringReportMod bean = new DndMonitoringReportMod();
            
            bean.setStartDate(RutDate.dateToStr(strStartDate));
            bean.setEndDate(RutDate.dateToStr(strEndDate));
            bean.setCountry(strCountry);
            bean.setPod(strPod);
            bean.setPol(strPol);
            bean.setShipper(strShipper);
            bean.setConsignee(strConsignee);
            bean.setUserID(strUserId);
            bean.setSessionID(strSessionId);
            
            isSuccess = dndMonitoringReportDao.generateDNDMonitoringReport(bean);
        }
        
        return isSuccess;
    }

    /**
     * Get List for generating DND Monitoring Level 1
     * @param strUserId
     * @param strSessionId
     * @return
     */
    public List getDNDMonitoringReportLvl1(String strUserId, String strSessionId) {
    
        List list = null;
        
        list = dndMonitoringReportDao.getDNDMonitoringReportLvl1(strUserId,
                                strSessionId);            
        
        return list;
    }

    /**
     * Get List for generating DND Monitoring Level 2
     * @param strUserId
     * @param strSessionId
     * @return
     */
    public List getDNDMonitoringReportLvl2(String strUserId, String strSessionId) {
    
        List list = null;
        
        list = dndMonitoringReportDao.getDNDMonitoringReportLvl2(strPodLvl2,
                                strPolLvl2,
                                strBilling_type,
                                intActual_days,
                                intQtn_free_days,
                                strCombine,
                                strUserId,
                                strSessionId);            
        
        return list;
    }

    /**
     * Get List for DND Monitoring POD and Country
     * @param strPart
     * @return
     */
    public List getPODandCountry(String strPart) {
    
        List list = null;
        
        if (strPart.equalsIgnoreCase("getPODFromCountry"))
            list = dndMonitoringReportDao.getPODandCountry(strCountry);  
        else if (strPart.equalsIgnoreCase("getCountry"))
            list = dndMonitoringReportDao.getPODandCountry(null);
        
        return list;
    }

    /**
     * Get result for validating input for DND Monitoring
     * @return
     */
    public String getDNDMonitoringReportValidate() {
        
        String result;
        result = dndMonitoringReportDao.getDNDMonitoringReportValidate(strPol, strShipper, strConsignee);            
        
        return result;
    }

    /**
     * Set Result DND Monitoring Level 1
     * @param resultLevel1
     */
    public void setResultLevel1(List resultLevel1) {
        this.resultLevel1 = resultLevel1;
    }

    /**
     * Get Result DND Monitoring Level 1
     * @return
     */
    public List getResultLevel1() {
        return resultLevel1;
    }

    /**
     * Set Result DND Monitoring Level 2
     * @param resultLevel2
     */
    public void setResultLevel2(List resultLevel2) {
        this.resultLevel2 = resultLevel2;
    }

    /**
     * Get Result DND Monitoring Level 2
     * @return
     */
    public List getResultLevel2() {
        return resultLevel2;
    }

    /**
     * Set Result DND Monitoring Port Country
     * @param resultPortCountry
     */
    public void setResultPortCountry(List resultPortCountry) {
        this.resultPortCountry = resultPortCountry;
    }

    /**
     * Get Result DND Monitoring Port Country
     * @return
     */
    public List getResultPortCountry() {
        return resultPortCountry;
    }
}
