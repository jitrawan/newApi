package com.rclgroup.dolphin.web.model.mst;

public class UserData {

	private String userToken;
	private String userId;
	private String line;
	private String trade;
	private String agent;
	private String fscCode;
	private String country;
	
	public String getUserToken() {
		return userToken;
	}
	public void setUserToken(String userToken) {
		this.userToken = userToken;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getLine() {
		return line;
	}
	public void setLine(String line) {
		this.line = line;
	}
	public String getTrade() {
		return trade;
	}
	public void setTrade(String trade) {
		this.trade = trade;
	}
	public String getAgent() {
		return agent;
	}
	public void setAgent(String agent) {
		this.agent = agent;
	}
	public String getFscCode() {
		return fscCode;
	}
	public void setFscCode(String fscCode) {
		this.fscCode = fscCode;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	
	@Override
	public String toString() {
		return "UserData [" + (userToken != null ? "userToken=" + userToken + ", " : "")
				+ (userId != null ? "userId=" + userId + ", " : "") + (line != null ? "line=" + line + ", " : "")
				+ (trade != null ? "trade=" + trade + ", " : "") + (agent != null ? "agent=" + agent + ", " : "")
				+ (fscCode != null ? "fscCode=" + fscCode + ", " : "") + (country != null ? "country=" + country : "")
				+ "]";
	}
}
