/*-----------------------------------------------------------------------------------------------------------  
RcmServiceHelpUim.java
------------------------------------------------------------------------------------------------------------- 
Copyright RCL Public Co., Ltd. 2007 
-------------------------------------------------------------------------------------------------------------
Author Wuttitorn Wuttijiaranai 03/12/09
- Change Log ------------------------------------------------------------------------------------------------  
## DD/MM/YY -User-     -TaskRef-      -Short Description  
-----------------------------------------------------------------------------------------------------------*/

package com.rclgroup.dolphin.web.ui.misc.help;

import com.rclgroup.dolphin.web.common.RcmConstant;
import com.rclgroup.dolphin.web.model.rcm.RcmColumnNameShowMod;
import com.rclgroup.dolphin.web.ui.misc.RcmStandardHelpOptimizeUim;

import com.rclgroup.dolphin.web.util.RutString;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;


public class RcmServiceHelpUim extends RcmStandardHelpOptimizeUim {
    private String tsService;
    
    public RcmServiceHelpUim() {
        super();
        
        // default sort
        this.setSortBy("SERVICE_CODE");
        this.setSortIn(RcmConstant.SORT_ASCENDING);        
    }
    
    public RcmServiceHelpUim(String tsService) {
        super();
        
        // default sort
        this.setSortBy("SERVICE_CODE");
        this.setSortIn(RcmConstant.SORT_ASCENDING);
        this.tsService = tsService;
    }
    
    //begin: implement function
    public void manageRequestParameter(HttpServletRequest request) {
        tsService = RutString.nullToStr(request.getParameter("tsService"));
        //get request parameter
    }
    
    public String findTitleNameShowByType(String type) {
        return "Service";
    }
    
    public HashMap findColumnNameShowByType(String type) {
        HashMap columnNameShow = new HashMap();
        // columenNameShow = Column Text | Size | Align | Data Type [| Data Format Type | Data Format]
        if (RcmConstant.GET_GENERAL.equals(type)) {
            columnNameShow.put("SERVICE_CODE", new RcmColumnNameShowMod("Service Code|25|left|STRING"));
            columnNameShow.put("SERVICE_NAME", new RcmColumnNameShowMod("Service Name|50|left|STRING"));
            columnNameShow.put("RECORD_STATUS", new RcmColumnNameShowMod("Status|10|left|FUNCTION|com.rclgroup.dolphin.web.util.RutCodeDescription|getStatusDesc"));
        } else if (RcmConstant.GET_SERVICE_VARIANT_WITH_SERVICE.equals(type)) {
            columnNameShow.put("SERVICE_CODE", new RcmColumnNameShowMod("Service Code|25|left|STRING"));
            columnNameShow.put("SERVICE_DESCRIPTION", new RcmColumnNameShowMod("Service Name|50|left|STRING"));
            columnNameShow.put("RECORD_STATUS", new RcmColumnNameShowMod("Status|10|left|FUNCTION|com.rclgroup.dolphin.web.util.RutCodeDescription|getStatusDesc"));
        } else if (RcmConstant.GET_FILTERED_RESULT.equals(type)) {
            columnNameShow.put("SERVICE_CODE", new RcmColumnNameShowMod("Service Code|25|left|STRING"));
            columnNameShow.put("SERVICE_NAME", new RcmColumnNameShowMod("Service Name|50|left|STRING"));
            columnNameShow.put("RECORD_STATUS", new RcmColumnNameShowMod("Status|10|left|FUNCTION|com.rclgroup.dolphin.web.util.RutCodeDescription|getStatusDesc"));
        } else if ("GET_TOS_SERVICE".equals(type)) {
            columnNameShow.put("SERVICE_CODE", new RcmColumnNameShowMod("Service Code|25|left|STRING"));
            columnNameShow.put("SERVICE_NAME", new RcmColumnNameShowMod("Service Name|50|left|STRING"));
            columnNameShow.put("RECORD_STATUS", new RcmColumnNameShowMod("Status|10|left|FUNCTION|com.rclgroup.dolphin.web.util.RutCodeDescription|getStatusDesc"));
        }
        return columnNameShow;
    }
    
    public String[] findReturnValueByType(String type) {
        String[] arrReturnValue = null;
        if (RcmConstant.GET_GENERAL.equals(type) || 
           RcmConstant.GET_SERVICE_VARIANT_WITH_SERVICE.equals(type) || 
           RcmConstant.GET_FILTERED_RESULT.equals(type)) {
            arrReturnValue = new String[] {"SERVICE_CODE"};
        } else if("GET_TOS_SERVICE".equals(type)){
            arrReturnValue = new String[] {"SERVICE_CODE","SERVICE_NAME"};
        }
        return arrReturnValue;
    }
    
    public String findSqlStatementByType(String type) {
        StringBuffer sb = new StringBuffer("");
        if (RcmConstant.GET_GENERAL.equals(type)) {
            sb.append("select distinct SERVICE_CODE ");
            sb.append("    ,SERVICE_NAME  ");
            sb.append("    ,RECORD_STATUS ");
            sb.append("from VR_CAM_SERVICE_MASTER ");
            sb.append("where RECORD_STATUS = 'A' ");
            sb.append(" [and :columnName :conditionWild :columnFind] ");
            sb.append("[order by :sortBy :sortIn] ");
        } else if (RcmConstant.GET_SERVICE_VARIANT_WITH_SERVICE.equals(type)) {
            sb.append("select distinct vm.SERVICE_CODE ");
            sb.append("    ,vm.SERVICE_DESCRIPTION ");
            sb.append("    ,vm.RECORD_STATUS ");
            sb.append("from VR_VSS_PROFORMA_MASTER vm ");
            sb.append("where vm.RECORD_STATUS = 'A' ");
            sb.append(" [and :columnName :conditionWild :columnFind] ");
            sb.append("[order by :sortBy :sortIn] ");
        } else if (RcmConstant.GET_FILTERED_RESULT.equals(type)) {
            sb.append("select distinct SERVICE_CODE ");
            sb.append("    ,SERVICE_NAME  ");
            sb.append("    ,RECORD_STATUS ");
            sb.append("from VR_SERVICE_MASTER ");
            sb.append("where RECORD_STATUS = 'A' ");
            sb.append(" AND SERVICE_CODE not in ('AFS','DFS') ");
            sb.append(" and SERVICE_CODE <> '"+tsService+"' ");
            sb.append(" [and :columnName :conditionWild :columnFind] ");
            sb.append(" [order by :sortBy :sortIn] ");
        } else if("GET_TOS_SERVICE".equals(type)){
            sb.append("select distinct SERVICE_CODE ");
            sb.append("    ,SERVICE_NAME  ");
            sb.append("    ,RECORD_STATUS ");
            sb.append("from VR_SERVICE_MASTER ");
            sb.append("where RECORD_STATUS = 'A' ");
            sb.append(" [and :columnName :conditionWild :columnFind] ");
            sb.append("[order by :sortBy :sortIn] ");
        }
        
        return sb.toString();
    }
    //end: implement function
    
}
