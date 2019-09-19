/*-----------------------------------------------------------------------------------------------------------  
RrcGenericSrv.java
------------------------------------------------------------------------------------------------------------- 
Copyright RCL Public Co., Ltd. 2007 
-------------------------------------------------------------------------------------------------------------
 Author Piyapong Ieumwananonthachai 10/10/07 
- Change Log ------------------------------------------------------------------------------------------------  
## DD/MM/YY -User-     -TaskRef-      -Short Description  
-----------------------------------------------------------------------------------------------------------*/

package com.rclgroup.dolphin.web.common;

import java.io.UnsupportedEncodingException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *    A main generic servlet for link menu
 */
public class RrcGenericLinkMenuSrv extends HttpServlet {
    protected static ServletContext sc;
     
    public void init(ServletConfig servletConfig) throws ServletException {
        super.init(servletConfig);
        sc = servletConfig.getServletContext();
    }

    public void service(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
        System.out.println("[RrcGenericLinkMenuSrv][service]: Started");
        request.setCharacterEncoding("utf-8");
        HttpSession session=request.getSession(true);
        try {
            String serviceName = "common.RcmLoginLinkMenuSvc";
            System.out.println("[RrcGenericLinkMenuSrv][service]: service: " + serviceName);
            Class cls = Class.forName("com.rclgroup.dolphin.web." + serviceName);
            RrcStandardSvc rrcStandardSvc = (RrcStandardSvc)cls.newInstance();
            rrcStandardSvc.setServletContext(sc);
            RriStandardSvc service = rrcStandardSvc;
            service.execute(request, response, sc);
            String target = (String)request.getAttribute("target");
            System.out.println("[RrcGenericLinkMenuSrv][service]: Finished");
            if(target != null){
                redirect(response, target);
            }
        } catch (Exception ex) {
            session.setAttribute("exception", ex);
            System.err.println("[RrcGenericLinkMenuSrv][service]: Exception thrown");
            ex.printStackTrace();
            redirect(response, RcmConstant.ERR_PAGE_URL + "/RcmErrorPage.jsp");
        }
    } 
    
    protected void redirect(HttpServletResponse response, String target) {
        try {
            System.out.println("[RrcGenericLinkMenuSrv][redirect]: target: "+target);
            response.sendRedirect(target);
        } catch (Exception ioe) {
            System.out.println("[RrcGenericLinkMenuSrv][redirect]: IO exception thrown");
            ioe.printStackTrace();
        }
    }
    
    protected void forward(HttpServletRequest request, HttpServletResponse response, String target) {
        try {
            System.out.println("[RrcGenericLinkMenuSrv][forward]: target: "+target);
            RequestDispatcher rd = sc.getRequestDispatcher(target);
            rd.forward(request, response);
        } catch (Exception ioe) {
            System.out.println("[RrcGenericLinkMenuSrv][forward]: IO exception thrown");
            ioe.printStackTrace();
        }
    }

}


