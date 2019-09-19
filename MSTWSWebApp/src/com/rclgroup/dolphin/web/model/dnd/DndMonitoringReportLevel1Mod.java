package com.rclgroup.dolphin.web.model.dnd;

public class DndMonitoringReportLevel1Mod {

    private String pol;
    private String pod;
    private String billing_type_code;
    private String billing_type_name;
    private int actual_days;
    private int qtn_days;
    private int units;
    private String combine;

    public DndMonitoringReportLevel1Mod() {
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
    
    public void setBilling_type_name(String billing_type_name) {
        this.billing_type_name = billing_type_name;        
    }
    
    public String getBilling_type_name() {
        return billing_type_name;
    }
    
    public void setBilling_type_code(String billing_type_code) {
        this.billing_type_code = billing_type_code;        
    }
    
    public String getBilling_type_code() {
        return billing_type_code;
    }
    
    public void setActual_days(int actual_days) {
        this.actual_days = actual_days;        
    }
    
    public int getActual_days() {
        return actual_days;
    }
    
    public void setQtn_days(int qtn_days) {
        this.qtn_days = qtn_days;        
    }
    
    public int getQtn_days() {
        return qtn_days;
    }
    
    public void setUnits(int units) {
        this.units = units;        
    }
    
    public int getUnits() {
        return units;
    }
    
    public void setCombine(String combine) {
        this.combine = combine;        
    }
    
    public String getCombine() {
        return combine;
    }
}
