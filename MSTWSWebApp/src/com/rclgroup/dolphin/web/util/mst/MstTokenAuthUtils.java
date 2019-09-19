package com.rclgroup.dolphin.web.util.mst;

import java.sql.SQLException;

import javax.servlet.http.HttpSession;

import com.rclgroup.dolphin.web.auth.BrowserData;
import com.rclgroup.dolphin.web.auth.IAuth;
import com.rclgroup.dolphin.web.auth.LoginUser;
import com.rclgroup.dolphin.web.auth.Result;
import com.rclgroup.dolphin.web.auth.TempAuth;
import com.rclgroup.dolphin.web.auth.dao.IAuthDao;
import com.rclgroup.dolphin.web.common.RrcApplicationContextWS;
import com.rclgroup.dolphin.web.dao.rcm.RcmUserDao;
import com.rclgroup.dolphin.web.model.mst.CustomerBean;
import com.rclgroup.dolphin.web.model.rcm.RcmUserMod;

public class MstTokenAuthUtils {
	private static IAuth authClient;
	
	public static class AuthResult {
		private LoginUser loginUser;
		private CustomerBean customerBean;
		private String errorMessage;
		
		public AuthResult(LoginUser user, CustomerBean bean, String msg) {
			this.loginUser = user;
			this.customerBean = bean;
			this.errorMessage = msg;
		}
		
		public LoginUser getLoginUser() {
			return loginUser;
		}
		
		public CustomerBean getCustomerBean() {
			return customerBean;
		}
		
		public String getErrorMessage() {
			return errorMessage;
		}
	}
	
	private static void tryInitAuth(HttpSession session) {
		if(authClient == null) {
			int timeout = 30;
			if(session != null && session.getMaxInactiveInterval() > 0) {
				timeout = session.getMaxInactiveInterval()/60;
			}
			authClient = new TempAuth(
					(IAuthDao) RrcApplicationContextWS.getBean("authDao"), 
					(RcmUserDao) RrcApplicationContextWS.getBean("rcmUserDao"),
					timeout, 30*60);
		}
	}
	
	public static String testAuth(String userId, String password) {
		tryInitAuth(null);
		LoginUser user = authClient.auth(userId, password);
		if(user == null) {
			return EsynReturnMessageUtils.createNewReturnMessage(false, "Fail auth", "auth", "auth");
		}else {
			return EsynReturnMessageUtils.createNewReturnMessage(true, user.getUserToken(), "auth", "auth");
		}
	}
	
	public static Result testCheck(String userId, String token) {
		tryInitAuth(null);
		BrowserData data = new BrowserData();
		data.setLine("R");
		data.setTrade("*");
		data.setAgent("***");
		data.setUserId(userId);
		data.setUserToken(token);
		data.setFscCode("R");
		return authClient.verifyToken(data, null);
	}
	
	/**
	 * Check token validity, must be checked before accessing session
	 * @throws SQLException 
	 */
	public static AuthResult checkToken(BrowserData browserData, HttpSession session)  {
		
		try {
			tryInitAuth(session);
			Result authResult = authClient.verifyToken(browserData, session);
			if(authResult.isSuccess()) {
				LoginUser user = authResult.getUserData();
				RcmUserMod userMod = user.getUserMod();
				CustomerBean custBean = new CustomerBean();
				custBean.setUserId(userMod.getPrsnLogId());
				custBean.setLine(userMod.getFscLvl1());
				custBean.setTrade(userMod.getFscLvl2());
				custBean.setAgent(userMod.getFscLvl3());
				custBean.setFSC_CODE(userMod.getFscCode());
				custBean.setMainCurr(userMod.getSmcurr());
				custBean.setCountry(userMod.getCountry());
				custBean.setFSC_NAME(userMod.getFscName());
				custBean.setDESCR(userMod.getDescr());
				custBean.setFSC_DATE_FORMAT(userMod.getFscDateFormat());
//				BookingDao bookingDao = (BookingDao) RrcApplicationContextWS.getBean("bkgDao");
				
//				custBean.setDataSource(bookingDao.getNormalDataSource());
				
				return new AuthResult(user, custBean, null);
			}else {
				return new AuthResult(null, null, "{ \"Success\":false, \"Content\":\"Session expired\", \"Auth\":true }");
			}
		}
		catch (Exception e) {
			e.printStackTrace();
			return new AuthResult(null, null, "{ \"Success\":false, \"Content\":\"" + e.getMessage() + "\", \"Auth\":true }");
		}
	}
}
