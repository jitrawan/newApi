package com.rclgroup.dolphin.web.util.mst;

import java.io.PrintStream;
import java.io.PrintWriter;





public class DataAccessException
  extends Exception
{
  private Throwable cause = null;
  private String tabPage = "";
  

  public DataAccessException() {}
  
  public DataAccessException(String message)
  {
    super(message);
  }
  
  public DataAccessException(String message, Throwable cause) {
    super(message);
    this.cause = cause;
  }
  
  public DataAccessException(String message, Throwable cause, String f_strTabPage)
  {
    super(message);
    this.cause = cause;
    this.tabPage = f_strTabPage;
  }
  
  public Throwable getCause() {
    return this.cause;
  }
  





  public void printStackTrace() {}
  




  public void printStackTrace(PrintStream ps) {}
  




  public void printStackTrace(PrintWriter pw) {}
  




  public String getTabPage()
  {
    return this.tabPage;
  }
  
  public void setTabPage(String tabPage) {
    this.tabPage = tabPage;
  }
}
