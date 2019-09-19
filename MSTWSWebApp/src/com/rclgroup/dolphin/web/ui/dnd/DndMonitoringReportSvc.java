/*--------------------------------------------------------
DndMonitoringReportSvc.java
--------------------------------------------------------
Copyright RCL Public Co., Ltd. 2009
--------------------------------------------------------
Author Nuttapol Thanasrisatit 28/05/2013
- Change Log--------------------------------------------
## DD/MM/YY -User- -TaskRef- -ShortDescription
01 28/05/13 NUTTHA1          Create DND Monitoring Report
--------------------------------------------------------
*/

package com.rclgroup.dolphin.web.ui.dnd;

import com.rclgroup.dolphin.web.common.RcmConstant;
import com.rclgroup.dolphin.web.common.RcmUserBean;
import com.rclgroup.dolphin.web.common.RrcStandardSvc;

import com.rclgroup.dolphin.web.dao.cam.CamFscDao;
import com.rclgroup.dolphin.web.dao.dnd.DndMonitoringReportDao;
import com.rclgroup.dolphin.web.model.dnd.DndMonitoringReportLevel1Mod;
import com.rclgroup.dolphin.web.model.dnd.DndMonitoringReportLevel2Mod;
import com.rclgroup.dolphin.web.dao.rcm.RcmConstantDao;
import com.rclgroup.dolphin.web.model.dnd.DndMonitoringPortCountryMod;
import com.rclgroup.dolphin.web.util.RutString;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;

import org.json.simple.*;

public class DndMonitoringReportSvc  extends RrcStandardSvc{

    public DndMonitoringReportSvc() {
        super();
    }
    
    public void execute(HttpServletRequest request, HttpServletResponse response, ServletContext context) throws Exception {
    
        try {
            String strTarget = null;
            
            boolean isGenRawData = false;
            
            List dndLvl1 = null;
            List dndLvl2 = null;
            List podCountry = null;
            
            HttpSession session = request.getSession(false); 
            
            DndMonitoringReportUim uim = (DndMonitoringReportUim) session.getAttribute("dndMonitoringReportUim");
            
            String strPageAction = RutString.nullToStr(request.getParameter("pageAction"));
            
            String strPart = RutString.nullToStr(request.getParameter("part"));
            
            if (uim == null || strPageAction.equalsIgnoreCase("new")) {
                
                session.removeAttribute("DNDMonitoringReportSvc");
                
                uim = new DndMonitoringReportUim();
                uim.setRcmConstantDao((RcmConstantDao)getBean("rcmConstantDao"));
                uim.setCamFscDao((CamFscDao)getBean("camFscDao"));
                uim.setDndMonitoringReportDao((DndMonitoringReportDao) getBean("dndMonitoringReportDao"));
                
                // Manage the attributes of User: line, region, agent, fsc
                RcmUserBean userBean = (RcmUserBean) session.getAttribute("userBean");
                this.manageUserBean(uim, userBean);
                 
                String strPermissionUser = this.getPermissionUserCode(uim);             
                uim.setStrPermissionUser(strPermissionUser);
    
            } else if (strPart.equalsIgnoreCase("findLevel1")) {
            
                String strStartDate = RutString.getParameterToStringUpper(request, "txtStartDate");
                String strEndDate = RutString.getParameterToStringUpper(request, "txtEndDate");
                String strCountry = RutString.getParameterToStringUpper(request, "cmbCountry");
                String strPod = RutString.getParameterToStringUpper(request, "cmbPod");
                String strPol = RutString.getParameterToStringUpper(request, "txtPol");
                String strShipper = RutString.getParameterToStringUpper(request, "txtShipper");
                String strConsignee = RutString.getParameterToStringUpper(request, "txtConsignee");
                
                uim.setStrStartDate(strStartDate);
                uim.setStrEndDate(strEndDate);
                uim.setStrCountry(strCountry);
                uim.setStrPod(strPod);
                uim.setStrPol(strPol);
                uim.setStrShipper(strShipper);
                uim.setStrConsignee(strConsignee);
                
            }  else if (strPart.equalsIgnoreCase("findLevel2")) {
            
                String strPod = RutString.getParameterToStringUpper(request, "pod");
                String strPol = RutString.getParameterToStringUpper(request, "pol");
                String strBilling_type = RutString.getParameterToStringUpper(request, "billing_type");
                int intAcutal_days = RutString.toInteger(RutString.getParameterToStringUpper(request, "actual_days"));
                int intQtn_free_days =  RutString.toInteger(RutString.getParameterToStringUpper(request, "qtn_free_days"));
                String strCombine = RutString.getParameterToStringUpper(request, "combine");
                
                uim.setStrPodLvl2(strPod);
                uim.setStrPolLvl2(strPol);
                uim.setStrBilling_type(strBilling_type);
                uim.setIntActual_days(intAcutal_days);
                uim.setIntQtn_free_days(intQtn_free_days);
                uim.setStrCombine(strCombine);
                
            } else if (strPart.equalsIgnoreCase("getPODFromCountry")) {
                       
                String strCountry = RutString.getParameterToStringUpper(request, "country");
                uim.setStrCountry(strCountry);
                
            } else if (strPart.equalsIgnoreCase("validate")) {
            
                String strPol = RutString.getParameterToStringUpper(request, "txtPol");
                String strShipper = RutString.getParameterToStringUpper(request, "txtShipper");
                String strConsignee = RutString.getParameterToStringUpper(request, "txtConsignee");
    
                uim.setStrPol(strPol);
                uim.setStrShipper(strShipper);
                uim.setStrConsignee(strConsignee);
            } 
            
            // Clear URL's report
            uim.setStrReportUrl("");
            
            if (strPageAction.equalsIgnoreCase("new")) {
                session.setAttribute("dndCollectionDetailReportUim", uim);
                strTarget = RcmConstant.DND_PAGE_URL + "/DndMonitoringReportScn.jsp";
                
                session.setAttribute("dndMonitoringReportUim", uim);        
                request.setAttribute("target", strTarget);
                
            } else if (strPart.equalsIgnoreCase("findLevel1")) {
                
                String strsessionId = session.getId();
                String strUserID = uim.getPrsnLogIdOfUser();
                
                // generate raw data
                isGenRawData = uim.generateDndMonitoringReport(strUserID, strsessionId);
                
                if (isGenRawData){
                    dndLvl1 = uim.getDNDMonitoringReportLvl1(strUserID, strsessionId);
                    
                    DndMonitoringReportLevel1Mod bean = null;
                    uim.setResultLevel1(dndLvl1); 
                    
                    JSONObject jLevel1; 
                    JSONArray  arr_jLevel1 = new JSONArray();
                    JSONObject all_jLevel1 = new JSONObject();             
                    
                    for (int i=0; i<dndLvl1.size(); i++) {
                    
                        bean = (DndMonitoringReportLevel1Mod) dndLvl1.get(i);
                        jLevel1 = new JSONObject();                 
                        
                        jLevel1.put("Pol", RutString.nullToStr(bean.getPol()));
                        jLevel1.put("Pod", RutString.nullToStr(bean.getPod()));
                        jLevel1.put("Billing_type_code", RutString.nullToStr(bean.getBilling_type_code()));
                        jLevel1.put("Billing_type_name", RutString.nullToStr(bean.getBilling_type_name()));
                        jLevel1.put("Actual_days", bean.getActual_days());
                        jLevel1.put("Qtn_days", bean.getQtn_days());
                        jLevel1.put("Units", bean.getUnits());
                        jLevel1.put("Combine", RutString.nullToStr(bean.getCombine()));
                        
                        arr_jLevel1.add(jLevel1);              
                    }
                    
                    all_jLevel1.put("dndMonitoringLevel1", arr_jLevel1);             
                    
                    response.setContentType("application/json");             
                    response.getWriter().println(all_jLevel1.toString());
                }
            } else if (strPart.equalsIgnoreCase("findLevel2")) {
                
                String strSessionId = session.getId();
                String strUserID = uim.getPrsnLogIdOfUser();
     
                dndLvl2 = uim.getDNDMonitoringReportLvl2(strUserID, strSessionId);
                
                DndMonitoringReportLevel2Mod bean = null;
                uim.setResultLevel2(dndLvl2); 
                
                JSONObject jLevel2; 
                JSONArray  arr_jLevel2 = new JSONArray();
                JSONObject all_jLevel2 = new JSONObject();             
                
                for (int i=0; i<dndLvl2.size(); i++) {
                
                    bean = (DndMonitoringReportLevel2Mod) dndLvl2.get(i);
                    jLevel2 = new JSONObject();                 
                    
                    jLevel2.put("bl_no", RutString.nullToStr(bean.getBl_no()));
                    jLevel2.put("eta", RutString.nullToStr(bean.getEta()));
                    jLevel2.put("etd", RutString.nullToStr(bean.getEtd()));
                    jLevel2.put("shipper_code", RutString.nullToStr(bean.getShipper_code()));
                    jLevel2.put("shipper_name", RutString.nullToStr(bean.getShipper_name()));
                    jLevel2.put("consignee_code", RutString.nullToStr(bean.getConsignee_code()));
                    jLevel2.put("consignee_name", RutString.nullToStr(bean.getConsignee_name()));
                    jLevel2.put("quotation_no", RutString.nullToStr(bean.getQuotation_no()));
                    jLevel2.put("units_in_bl", bean.getUnits_in_bl());
                    jLevel2.put("units", bean.getUnits());
                    jLevel2.put("service", RutString.nullToStr(bean.getService()));
                    jLevel2.put("vessel", RutString.nullToStr(bean.getVessel()));
                    jLevel2.put("voyage", RutString.nullToStr(bean.getVoyage()));
                    
                    arr_jLevel2.add(jLevel2);              
                }
                
                all_jLevel2.put("dndMonitoringLevel2", arr_jLevel2);             
                
                response.setContentType("application/json");             
                response.getWriter().println(all_jLevel2.toString());
    
            }  else if (strPart.equalsIgnoreCase("getPODFromCountry") || strPart.equalsIgnoreCase("getCountry")) {
            
                podCountry = uim.getPODandCountry(strPart);
                
                DndMonitoringPortCountryMod bean = null;
                uim.setResultPortCountry(podCountry); 
                
                JSONObject jPODCountry; 
                JSONArray  arr_jPODCountry = new JSONArray();
                JSONObject all_jPODCountry = new JSONObject();             
                
                for (int i=0; i<podCountry.size(); i++) {
                
                    bean = (DndMonitoringPortCountryMod) podCountry.get(i);
                    jPODCountry = new JSONObject();                 
    
                    jPODCountry.put("port_code", RutString.nullToStr(bean.getPort_code()));
                    jPODCountry.put("port_country", RutString.nullToStr(bean.getPort_country()));
                    jPODCountry.put("port_name", RutString.nullToStr(bean.getPort_name()));
                    jPODCountry.put("country_code", RutString.nullToStr(bean.getCountry_code()));
                    jPODCountry.put("country_name", RutString.nullToStr(bean.getCountry_name()));
                   
                    arr_jPODCountry.add(jPODCountry);              
                }
                
                all_jPODCountry.put("dndMonitoringPortCountry", arr_jPODCountry);             
                
                response.setContentType("application/json");             
                response.getWriter().println(all_jPODCountry.toString());
                
            } else if (strPart.equalsIgnoreCase("validate")) {
                
                response.setContentType("application/json");             
                response.getWriter().println(uim.getDNDMonitoringReportValidate());
                
            } else if (strPart.equalsIgnoreCase("printExcel")) {
            
                String strReportName = RutString.getParameterToStringUpper(request, "reportName");
                String strReportFormat = RutString.getParameterToStringUpper(request, "reportFormat");  
                String strSessionId = session.getId();
                String strUserID = uim.getPrsnLogIdOfUser();
                
                String strReportUrl = uim.getReportUrlConstant();
                strReportUrl += strReportName+".rdf&desformat="+strReportFormat; 
                
                if (strReportName.equalsIgnoreCase("DND109_EXCEL_LVL1")) {
                
                    strReportUrl +=  "&P_USER_ID="+ strUserID
                                    + "&P_SESSION_ID=" + strSessionId;
                                         
                } else if (strReportName.equalsIgnoreCase("DND109_EXCEL_LVL2")) {
                    
                    strReportUrl +=  "&P_POD=" + uim.getStrPodLvl2()
                                    + "&P_POL=" + uim.getStrPolLvl2()
                                    + "&P_BILLING_TYPE=" + uim.getStrBilling_type()
                                    + "&P_ACTUAL_DAYS=" + uim.getIntActual_days()
                                    + "&P_QTN_FREE_DAYS=" + uim.getIntQtn_free_days()
                                    + "&P_COMBINE=" + uim.getStrCombine()
                                    + "&P_USER_ID=" + strUserID
                                    + "&P_SESSION_ID=" + strSessionId;
                }
                                         
                response.getWriter().println(strReportUrl);           
            }            
            
            request.setAttribute("target",strTarget);
        }  catch (Exception exc) {
            exc.printStackTrace();
        }  
    }
}
