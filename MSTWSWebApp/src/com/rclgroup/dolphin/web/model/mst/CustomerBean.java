package com.rclgroup.dolphin.web.model.mst;

import java.sql.Connection;

import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;

public class CustomerBean {

	private String FSC_LVL1;
	private String FSC_LVL2;
	private String FSC_LVL3;;
	private String language;;
	private String userId;
	private String mainCurr;
	private String FSC_CODE;
	private String FSC_DATE_FORMAT;
	private String country;
	private String STTCUR;
	private String DESCR;
	
	//SpLoginUserBean
	private String controlStatus = "";
	private String FSC_CM = "";
	private String CONTROL_FSC_CM = "";
	private String LOCATION_CM = "";
	
	private String FSC_NAME;
	private String lStrCoregno="";
	//private Connection conn;
	private DataSource dataSource;
	private JdbcTemplate jdbc;
	
	public String getFSC_LVL1() {
		return FSC_LVL1;
	}
	public void setFSC_LVL1(String fSC_LVL1) {
		FSC_LVL1 = fSC_LVL1;
	}
	public String getFSC_LVL2() {
		return FSC_LVL2;
	}
	public void setFSC_LVL2(String fSC_LVL2) {
		FSC_LVL2 = fSC_LVL2;
	}
	public String getFSC_LVL3() {
		return FSC_LVL3;
	}
	public void setFSC_LVL3(String fSC_LVL3) {
		FSC_LVL3 = fSC_LVL3;
	}

	public String getfname() {
		int pos = getDESCR().indexOf(" ");
		String fname = "";

		if (pos > 0) {
			fname = getDESCR().substring(0, pos);
		} else {
			fname = getDESCR();
		}

		return fname;
	}

	public String getmname() {
		return "";
	}

	public String getlastname() {
		int pos = getDESCR().indexOf(" ");
		String lname = "";

		if (pos > 0) {
			lname = getDESCR().substring(pos + 1);
		} else {
			lname = "";
		}

		return lname;
	}

	public String getlname() {
		return getlastname();
	}
	
	public String getDESCR() {
		return DESCR;
	}
	public void setDESCR(String dESCR) {
		DESCR = dESCR;
	}
	public String getFSC_CODE() {
		return FSC_CODE;
	}
	public void setFSC_CODE(String fSC_CODE) {
		FSC_CODE = fSC_CODE;
	}
	public String getMainCurr() {
		return mainCurr;
	}
	public void setMainCurr(String mainCurr) {
		this.mainCurr = mainCurr;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		this.language = language;
	}
	public String getLine() {
		return FSC_LVL1;
	}
	public void setLine(String fSC_LVL1) {
		FSC_LVL1 = fSC_LVL1;
	}
	public String getTrade() {
		return FSC_LVL2;
	}
	public void setTrade(String fSC_LVL2) {
		FSC_LVL2 = fSC_LVL2;
	}
	public String getAgent() {
		return FSC_LVL3;
	}
	public void setAgent(String fSC_LVL3) {
		FSC_LVL3 = fSC_LVL3;
	}
	public String getFSC_DATE_FORMAT() {
		if ((this.FSC_DATE_FORMAT == null) || (this.FSC_DATE_FORMAT.equals(""))) {
			return "2";
		}
		return this.FSC_DATE_FORMAT;
	}
	public void setFSC_DATE_FORMAT(String fSC_DATE_FORMAT) {
		FSC_DATE_FORMAT = fSC_DATE_FORMAT;
	}
	public String getSysDateFormat()
	{
		return getFSC_DATE_FORMAT();
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getSTTCUR() {
		return STTCUR;
	}
	public void setSTTCUR(String sTTCUR) {
		STTCUR = sTTCUR;
	}
	
	public String getControlStatus() {
		return controlStatus;
	}
	public void setControlStatus(String controlStatus) {
		this.controlStatus = controlStatus;
	}
	public String getFSC_CM() {
		return FSC_CM;
	}
	public void setFSC_CM(String fSC_CM) {
		FSC_CM = fSC_CM;
	}
	public String getCONTROL_FSC_CM() {
		return CONTROL_FSC_CM;
	}
	public void setCONTROL_FSC_CM(String cONTROL_FSC_CM) {
		CONTROL_FSC_CM = cONTROL_FSC_CM;
	}
	public String getLOCATION_CM() {
		return LOCATION_CM;
	}
	public void setLOCATION_CM(String lOCATION_CM) {
		LOCATION_CM = lOCATION_CM;
	}
	/*
	public Connection getConn() {
		return conn;
	}
	public void setConn(Connection conn) {
		this.conn = conn;
	}
	*/
	public DataSource getDataSource() {
		return dataSource;
	}
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	public JdbcTemplate getJdbc() {
		return jdbc;
	}
	public void setJdbc(JdbcTemplate jdbc) {
		this.jdbc = jdbc;
	}
	public String getFSC_NAME() {
		return FSC_NAME;
	}
	public void setFSC_NAME(String fSC_NAME) {
		FSC_NAME = fSC_NAME;
	}
	public String getCoregno() {
		return this.lStrCoregno;
	}
}
