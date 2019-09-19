package com.rclgroup.dolphin.web.model.dnd;

import com.rclgroup.dolphin.web.common.RrcStandardMod;

public class DndMonitoringReportMod extends RrcStandardMod{
    
    private String startDate;
    private String endDate;
    private String country;
    private String pod;
    private String pol;
    private String shipper;
    private String consignee;
    private String userID;
    private String sessionID;
    
    public DndMonitoringReportMod() {

        super();
        startDate="";
        endDate = "";
        country = "";
        pod = "";
        pol = "";        
        userID = "";
        sessionID = "";        
    }
    
    public void setStartDate(String startDate) {
        this.startDate = startDate;        
    }
    
    public String getStartDate() {
        return startDate;        
    }
    
    public void setEndDate(String endDate) {
        this.endDate = endDate;        
    }
    
    public String getEndDate() {
        return endDate;        
    }
    
    public void setCountry(String country) {
        this.country = country;        
    }
    
    public String getCountry() {
        return country;        
    }
    
    public void setPol(String pol) {
        this.pol = pol;        
    }
    
    public String getPol() {
        return pol;        
    }
    
    public void setPod(String pod) {
        this.pod = pod;        
    }
    
    public String getPod() {
        return pod;        
    }
    
    public void setShipper(String shipper) {
        this.shipper = shipper;        
    }
    
    public String getShipper() {
        return shipper;        
    }
    
    public void setConsignee(String consignee) {
        this.consignee = consignee;        
    }
    
    public String getConsignee() {
        return consignee;        
    }
    
    public void setUserID(String userID) {
        this.userID = userID;        
    }
    
    public String getUserID() {
        return userID;        
    }
    
    public void setSessionID(String sessionID) {
        this.sessionID = sessionID;        
    }
    
    public String getSessionID() {
        return sessionID;        
    }
}
