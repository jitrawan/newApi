/*-----------------------------------------------------------------------------------------------------------  
RcmServiceHelpSvc.java
------------------------------------------------------------------------------------------------------------- 
Copyright RCL Public Co., Ltd. 2007 
-------------------------------------------------------------------------------------------------------------
Author Wuttitorn Wuttijiaranai 03/12/09
- Change Log ------------------------------------------------------------------------------------------------  
## DD/MM/YY -User-     -TaskRef-      -Short Description  
-----------------------------------------------------------------------------------------------------------*/

package com.rclgroup.dolphin.web.ui.misc.help;

import com.rclgroup.dolphin.web.common.RrcStandardHelpOptimizeSvc;
import com.rclgroup.dolphin.web.ui.misc.RcmStandardHelpOptimizeUim;
import com.rclgroup.dolphin.web.util.RutRequest;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


public class RcmServiceHelpSvc extends RrcStandardHelpOptimizeSvc {
    public RcmServiceHelpSvc() {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, ServletContext context) throws Exception {
        System.out.println("[RcmServiceHelpSvc][execute]: Started");
        HttpSession session = request.getSession(false);
        String tsService = request.getParameter("tsService");        
        
        if(tsService == null){
             tsService = (String) session.getAttribute("tsService");
        } else{
            session.setAttribute("tsService", tsService);
        }
        
        RcmStandardHelpOptimizeUim uim = (RcmServiceHelpUim) RutRequest.getSessionObject(session, RrcStandardHelpOptimizeSvc.INSTANCE_NAME_UIM_DEFAULT, RcmServiceHelpUim.class);
        
        if (uim == null ) {
            System.out.println("[RcmServiceHelpSvc][execute]: tsService="+tsService); 
            uim = new RcmServiceHelpUim(tsService);
        }
        
        this.doExecute(request, uim);
        System.out.println("[RcmServiceHelpSvc][execute]: Finished");
    }
}

