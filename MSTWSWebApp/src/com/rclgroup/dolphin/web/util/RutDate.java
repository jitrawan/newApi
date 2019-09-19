 /*-----------------------------------------------------------------------------------------------------------  
 RutDate.java
 ------------------------------------------------------------------------------------------------------------- 
 Copyright RCL Public Co., Ltd. 2007 
 -------------------------------------------------------------------------------------------------------------
 Author Piyapong Ieumwananonthachai 10/10/07
 - Change Log ------------------------------------------------------------------------------------------------  
 ## DD/MM/YY -User-     -TaskRef-      -Short Description  
 01 25/06/09 WUT                       Added function for converting string date (format: YYYYMMDD) to java.sql.Date
 02 09/11/09 KIT                       Added check validate method getDefaultDateStringFromJdbcDateString
 03 14/01/14 TAN                       Added fnction for convert String date (format: YYYY-MM-DD) to DD/MM/YYYY
 -----------------------------------------------------------------------------------------------------------*/

 package com.rclgroup.dolphin.web.util;


 import java.sql.Timestamp;

 import java.text.DateFormat;
 import java.text.SimpleDateFormat;

 import java.util.ArrayList;
 import java.util.Calendar;
 import java.util.Date;
 import java.util.GregorianCalendar;
 import java.util.List;
 import java.util.Locale;
 import java.util.StringTokenizer;
 import java.util.concurrent.TimeUnit;


 /**
  *    Date utility
  *
  */
 public class RutDate {
     public RutDate() {
         super();
     }

     /**
      * Returns a new calendar instance with sysdate
      * @return
      */
     public static Calendar getSysCalendar() {
         return Calendar.getInstance();
     }
     
     /**
      * Returns a new timestamp instance with sysdate
      * @return
      */
     public static Timestamp getSysTimestamp() {
         return new Timestamp(getSysCalendar().getTime().getTime());
     }
     
     /**
      * Returns a new calendar instance with the given date
      * @param year
      * @param month
      * @param day
      * @return
      */
     public static Calendar getDateInstance(int year, int month, int day) {
         Calendar cal = Calendar.getInstance();
         cal.set(year, month - 1, day);
         return cal;
     }

     /**
      * Returns a new calendar with date 01.01.0001
      * @return
      */
     public static Calendar getNullDate() {
         return getDateInstance(1, 1, 1);
     }

     /**
      * Returns true, if the given date is 01.01.0001
      * @param cal
      * @return
     */
     public static boolean isNullDate(Calendar cal) {
         if (cal == null)
             return true;
         if (cal.get(Calendar.YEAR) != 1)
             return false;
         if (cal.get(Calendar.MONTH) != 0)
             return false;
         if (cal.get(Calendar.DATE) != 1)
             return false;
         return true;
     }

     /**
      * Returns true, if the given date is 01.01.0001
      * @param cal1
      * @param cal2
      * @return
      */
     public static boolean dateEquals(Calendar cal1, Calendar cal2) {
         if (cal1.get(Calendar.YEAR) != cal2.get(Calendar.YEAR))
             return false;
         if (cal1.get(Calendar.MONTH) != cal2.get(Calendar.MONTH))
             return false;
         if (cal1.get(Calendar.DATE) != cal2.get(Calendar.DATE))
             return false;
         return true;
     }

     /** 
      * Returns the JDBC date string for a given calendar
      * @param cal A calendar date to be converted to a string
      * @return The date in the format YYYY-MM-DD
      */
     public static String getJdbcDateString(Calendar cal) {
         Integer iY = new Integer(10000 + cal.get(Calendar.YEAR));
         Integer iM = new Integer(100 + 1 + cal.get(Calendar.MONTH));
         Integer iD = new Integer(100 + cal.get(Calendar.DATE));
         String sY = iY.toString().substring(1, 5);
         String sM = iM.toString().substring(1, 3);
         String sD = iD.toString().substring(1, 3);
         return sY + "-" + sM + "-" + sD;
     }
     
     /** 
      * Returns the JDBC date string for a given calendar
      * @param cal A calendar date to be converted to a string
      * @return The date in the format YYYYMMDD
      */
     public static String getJdbcDateStringYYYYMMDD(Calendar cal) {
         Integer iY = new Integer(10000 + cal.get(Calendar.YEAR));
         Integer iM = new Integer(100 + 1 + cal.get(Calendar.MONTH));
         Integer iD = new Integer(100 + cal.get(Calendar.DATE));
         String sY = iY.toString().substring(1, 5);
         String sM = iM.toString().substring(1, 3);
         String sD = iD.toString().substring(1, 3);
         return sY + sM + sD;
     }
      
     /** 
      * Returns the JDBC date string from DD/MM/YYYY
      * @param date string in the format DD/MM/YYYY
      * @return The date in the format YYYY-MM-DD
      */
     public static String getJdbcDateStringFromDefaultDateString(String date) {
         String dd = date.substring(0, 2);
         String mm = date.substring(3, 5);
         String yyyy = date.substring(6);
         return yyyy + "-" + mm + "-" + dd;
     }
      
     /** 
      * Returns the date string from YYYY-MM-DD
      * @param jdbcDate Date
      * @return The date in the format DD/MM/YYYY
      */
     public static String getDefaultDateStringFromJdbcDate(Date jdbcDate) {
         if (jdbcDate != null) {
             try {           
                 DateFormat df = new SimpleDateFormat("dd/MM/yyyy"); 
                 return df.format(jdbcDate);
             } catch (Exception e) {
                 e.printStackTrace(); 
                 return "- / - / -";
             }
         } else {
             return "- / - / -";
         }
     }
     
     /** 
      * Returns the date string from YYYY-MM-DD
      * @param jdbcDate Date
      * @return The date in the format DD/MM/YYYY
      */
     public static String getDefaultDateStringFromJdbcDateLocalUS(Date jdbcDate) {
         if (jdbcDate != null) {
             try {           
                 DateFormat df = new SimpleDateFormat("dd/MM/yyyy",Locale.US); 
                 return df.format(jdbcDate);
             } catch (Exception e) {
                 e.printStackTrace(); 
                 return "";
             }
         } else {
             return "";
         }
     }
     
     
     
     public static String getDefaultDateStringFromJdbcDateYYYYMMDD(Date jdbcDate) {
         if (jdbcDate != null) {
             try {           
                 DateFormat df = new SimpleDateFormat("yyyyMMdd"); 
                 return df.format(jdbcDate);
             } catch (Exception e) {
                 e.printStackTrace(); 
                 return "";
             }
         } else {
             return "";
         }
     }
     
     /** 
      * Returns the date string from YYYY-MM-DD
      * @param jdbcDate string in the format YYYY-MM-DD
      * @return The date in the format DD/MM/YYYY
      */
     public static String getDefaultDateStringFromJdbcDateString(String jdbcDate) {
         if (jdbcDate != null && jdbcDate.length() == 8){
             StringTokenizer st = new StringTokenizer(jdbcDate, "-");
             List token = new ArrayList();
             while (st.hasMoreTokens()) { 
                 token.add(st.nextToken());
             }
             String dd = ((String)token.get(2)).substring(0,2);
             String mm = (String)token.get(1);
             String yyyy = RutFormatting.getDecimalFormat(new Long(((String)token.get(0))),"0000");
             return dd + "/" + mm + "/" + yyyy;
         }else{
             return "- / - / -";
         }
         
     }
      
     public static Timestamp getTimestampFromDefaultDateString(String defaultDate) {
         if(defaultDate == null) return null;
         if(defaultDate.equals("")) return null;
         System.out.println("defaultDate  "+defaultDate);
         SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
         Date date = new Date();
         try{
             date = sdf.parse(defaultDate);
             System.out.println("date "+date.toString());
         }catch(Exception e){
             return null;
         }
         return new Timestamp(date.getTime());
     }
     
     public static Timestamp getTimestampFromDefaultDateStringUS(String defaultDate) {
         if(defaultDate == null) return null;
         if(defaultDate.equals("")) return null;
         System.out.println("defaultDate  "+defaultDate);
         SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy",Locale.US);
         Date date = new Date();
         try{
             date = sdf.parse(defaultDate);
             System.out.println("date "+date.toString());
         }catch(Exception e){
             return null;
         }
         return new Timestamp(date.getTime());
     }
     
     public static long getNumberOfDifferentDate(String dateFrom,String dateTo){
         long day = 0;
         if(dateFrom == null || dateFrom.equals(""))return -3;
         if(dateTo == null || dateTo.equals(""))return -3;        
         int fYear = new Integer(dateFrom.substring(0,4)).intValue();
         int fMonth = new Integer(dateFrom.substring(4,6)).intValue();
         int fDay = new Integer(dateFrom.substring(6,8)).intValue();
         int tYear = new Integer(dateTo.substring(0,4)).intValue();
         int tMonth = new Integer(dateTo.substring(4,6)).intValue();
         int tDay = new Integer(dateTo.substring(6,8)).intValue();        
         Date dFrom = new GregorianCalendar(fYear,fMonth,fDay).getTime();       
         Date dTo = new GregorianCalendar(tYear,tMonth,tDay).getTime();
         System.out.println("fYear="+fYear+"  ,fMonth="+fMonth+"  ,fDay="+fDay);
         System.out.println("tYear="+tYear+"  ,tMonth="+tMonth+"  ,tDay="+tDay);
         System.out.println("dTo.getTime() = "+dTo.getTime()/(1000 * 60 * 60 * 24)+"    and dFrom.getTime() = "+dFrom.getTime()/(1000 * 60 * 60 * 24));
         day = (dTo.getTime() - dFrom.getTime())/(1000 * 60 * 60 * 24);
         return day;
     }
      
     public static String getDefaultDateStringFromTimestamp(Timestamp timestamp) {
         if(timestamp == null) return null;
         SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
         return sdf.format(timestamp);
     }

     /**
      * @param cal
      * @return
      */
     public static java.sql.Date getSqlDate(Calendar cal) {
         return java.sql.Date.valueOf(getJdbcDateString(cal));
     }
     
     // ##01 BEGIN
     /** 
      * Returns the java.sql.Date from string format YYYYMMDD
      * @param date string in the format YYYYMMDD
      * @return The java.sql.Date
      */
     public static java.sql.Date getSqlDateFormatFromYYYYMMDD(String date) {
         java.sql.Date aDate = null;
         // 20011201 --> 01/12/2001
         if ((date != null) && (date != "") && (date.length() == 8)) {
             Calendar cal = getDateInstance(RutString.toInteger(String.valueOf(Integer.parseInt(date.substring(0, 4))))
                 ,RutString.toInteger(date.substring(4, 6)) 
                 ,RutString.toInteger(date.substring(6, 8)));
                 
             return new java.sql.Date(cal.getTime().getTime());
         } else
             return null;
     }
     // ##01 END
     
      // ##01 BEGIN
      /** 
       * Returns the java.sql.Date from string format DDMMYYYY
       * @param date string in the format DDMMYYYY
       * @return The java.sql.Date
       */
      public static java.sql.Date getSqlDateFormatFromDDMMYYYY(String date) {
          java.sql.Date aDate = null;
          // 01/12/2001 -->  20011201 
          if ((date != null) && (date != "") && (date.length() == 10)) {
              Calendar cal = Calendar.getInstance(Locale.US);
              
              cal.set(RutString.toInteger(String.valueOf(Integer.parseInt(date.substring(6)))), RutString.toInteger(date.substring(3, 5)) - 1, RutString.toInteger(date.substring(0, 2)));
            
               //  System.out.println("cal.getTime().getTime() "+cal.getTime());
              return new java.sql.Date(cal.getTime().getTime());
          } else
              return null;
      }
      // ##01 END
     
     /** 
      * Returns the calendar from string format YYYYMMDD
      * @param date string in the format YYYYMMDD
      * @return The calendar
      */
     public static Calendar getCalendarFormatFromYYYYMMDD(String date) {
         Calendar cal = null;
         // 20011201 --> 01/12/2001
         if ((date != null) && (date != "") && (date.length() == 8)) {
             cal = getDateInstance(RutString.toInteger(String.valueOf(Integer.parseInt(date.substring(0, 4))))
                 ,RutString.toInteger(date.substring(4, 6)) 
                 ,RutString.toInteger(date.substring(6, 8)));
         }
         return cal;
     }
     
     /**
      * @param dateStr
      * @return
      */
     public static String dateToStr(String dateStr){
         try {
             String date = "";
             String month = "";
             String year = "";
              
             if (dateStr.equals("")) {
                 return "";
             } else {
                 date  = dateStr.substring(0,2);
                 month = dateStr.substring(3,5);
                 year  = dateStr.substring(6,10);
              
                 dateStr = year + month + date;
                 return (dateStr);
             }
         } catch(Exception e) {
             e.printStackTrace();
             return "";            
         }
     }
     
     /**
      * @param dateStr
      * @return
      */
     public static String dateToStrFormatYYYYMM(String dateStr) {
         try {
             String month = "";
             String year = "";
              
             if (dateStr.equals("")) {
                 return "";
             } else {
                 month = dateStr.substring(5,7);
                 year  = dateStr.substring(0,4);
              
                 dateStr = year + month;
                 return (dateStr);
             }
         } catch(Exception e) {
             e.printStackTrace();
             return "";            
         }
     }

     public static String toDateFormat(String date) {
         String aDate = new String();
         // 012001 --> 2001
         if ((date != null) && (date != "") && (date.length() == 6)) {
             aDate = String.valueOf(Integer.parseInt(date.substring(2)));
             return aDate;
         }
         // 01122001 --> 01/12/2001
         if ((date != null) && (date != "") && (date.length() == 8)) {
             aDate = date.substring(0, 2);
             aDate = aDate + "/" + date.substring(2, 4);
             aDate = aDate + "/" + String.valueOf(Integer.parseInt(date.substring(4)));
             return aDate;
         } else
             return null;
     }

     public static String toDateFormatFromYYYYMMDD(String date) {
         String aDate = new String();
         // 200112 --> 2001/12
         if ((date != null) && (date != "") && (date.length() == 6)) {
             aDate = String.valueOf(Integer.parseInt(date.substring(0, 4))) + "/" + date.substring(4, 6);
             return aDate;
         }
         // 20011201 --> 01/12/2001
         if ((date != null) && (date != "") && (date.length() == 8)) {
             aDate = date.substring(6, 8) + "/" + date.substring(4, 6) + 
                     "/" + String.valueOf(Integer.parseInt(date.substring(0, 4)));
             return aDate;
         } else{
             return "";
         }
     }
     
     public static String toFormatTime(String time) {
 //    System.out.println("time >>>>>>>>>>>> "+time);
         String aTime = new String();
         // 0220 --> 02:20
         if((time != null) && (!time.equals(""))){
 //        System.out.println("in<>>>>>>>>>>>>>>>>>>>>>>"+time+":");
             time = addFormatTime(time);
 //            System.out.println("time   >>>>> "+time);
             if ((time != null) && (time != "") && (time.length() == 4)) {
 //            System.out.println("1");
                 aTime = String.valueOf(time.substring(0, 2)) + ":" + time.substring(2, 4);
                 return aTime;
             }else if ((time != null) && (time != "") && (time.length() == 3)) {
 //                System.out.println("2");
                 time = "0"+time;
                 aTime = String.valueOf(time.substring(0, 2)) + ":" + time.substring(2, 4);
                 return aTime;
             }else{
 //                System.out.println("3");
                 return "";
                 
             }
         }else{
             return "";
         }
     }
     
     private static String addFormatTime(String time){
         String timeTemp = time;
         for(int i = time.length() ; i < 4 ; i++){
             timeTemp = "0"+timeTemp;
         }
         return timeTemp;
     }
     
     public static String getFirstDateOfMonth(int month,int year,String del,int format){
         String dd, mm, yy, generatedDate; //generated date and time
         // FORMAT = 0 ==> YYYY-MM-DD IN ENG
         // FORMAT = 1 ==> DD-MM-YYYY IN ENG

         //generated date
         generatedDate = new String("");
         dd = Integer.toString(1);
         mm = Integer.toString(month);
         yy = Integer.toString(year);
         if (dd.length() == 1) {
             dd = "0" + dd;
         }
         if (mm.length() == 1) {
             mm = "0" + mm;
         }

         switch (format) {
             case 0:
                 generatedDate = yy + del + mm + del + dd;
                 break;
             case 1:
                 generatedDate = dd + del + mm + del + yy;
                 break;
         }

         return generatedDate;        
     }
      
     public static String getEndDateOfMonth(int month,int year,String del,int format){
         String dd, mm, yy, generatedDate; //generated date and time
         // FORMAT = 0 ==> YYYY-MM-DD IN ENG
         // FORMAT = 1 ==> DD-MM-YYYY IN ENG
          
         Calendar cal = new GregorianCalendar(year, month-1, 1);
         int days = cal.getActualMaximum(Calendar.DAY_OF_MONTH);

         //generated date
         generatedDate = new String("");
         dd = Integer.toString(days);
         mm = Integer.toString(month);
         yy = Integer.toString(year);
         if (dd.length() == 1) {
             dd = "0" + dd;
         }
         if (mm.length() == 1) {
             mm = "0" + mm;
         }

         switch (format) {
             case 0:
                 generatedDate = yy + del + mm + del + dd;
                 break;
             case 1:
                 generatedDate = dd + del + mm + del + yy;
                 break;
         }

         return generatedDate;        
     }
     
     public static double monthsBetween(Calendar date1, Calendar date2){
         double monthsBetween = 0;
         //difference in month for years
         monthsBetween = (date1.get(Calendar.YEAR)-date2.get(Calendar.YEAR))*12;
         //difference in month for months
         System.out.println("monthsBetween 1 "+monthsBetween);
         monthsBetween += date1.get(Calendar.MONTH)-date2.get(Calendar.MONTH);
         //difference in month for days
          System.out.println("monthsBetween 2 "+monthsBetween);
         if(date1.get(Calendar.DAY_OF_MONTH)!=date1.getActualMaximum(Calendar.DAY_OF_MONTH)
                 && date1.get(Calendar.DAY_OF_MONTH)!=date1.getActualMaximum(Calendar.DAY_OF_MONTH) ){
             monthsBetween += ((date1.get(Calendar.DAY_OF_MONTH)-date2.get(Calendar.DAY_OF_MONTH))/31d);
         }
         System.out.println("monthsBetween 3 "+monthsBetween);
         return monthsBetween;
     }
     
     public static String dateToString(Date date, String format) {
                 SimpleDateFormat  dateFormat = getSimpleDate(format);
         return dateFormat.format(date);
     }
         
     public static String dateToString(Date date, String format, Locale locale) {
             SimpleDateFormat  dateFormat = getSimpleDate(format, locale);
         return dateFormat.format(date);
     }
     
     private static SimpleDateFormat getSimpleDate(String format){
         return new SimpleDateFormat(format);
     }
    
     private static SimpleDateFormat getSimpleDate(String format, Locale locale){
         return new SimpleDateFormat(format, locale);
     }
     
     //@03 BEGIN
     /** 
      * Returns string format DD/MM/YYYY
      * @param date string in the format YYYY-MM-DD
      * @return String
      */
     public static String convertFormatTimestampDate(String fullDate) {
         String cal = "";
         // 20011201 --> 01/12/2001
     //        System.out.println("rutdate fullDate >>>>>>>>>>> "+fullDate);
         
         String year = "";
         String month = "";
         String day = "";
         
         year = fullDate.substring(0,4);
         month = fullDate.substring(fullDate.indexOf("-")+1,fullDate.lastIndexOf("-"));
         day = fullDate.substring(fullDate.lastIndexOf("-")+1);
         
         if(month.length() < 2){
             month = "0"+month;
         }
         if(day.length() < 2){
             day = "0"+day;
         }
         
     //        System.out.println("year >>>>>>>>>>>>>>>>> "+year);
     //        System.out.println("month >>>>>>>>>>>>>>>>> "+month);
     //        System.out.println("day >>>>>>>>>>>>>>>>> "+day);
     //
         return day+"/"+month+"/"+year;
     }
     
     //@03 END
     
     public static Date getDateFromDDMMYYYYHHmm(String strDate,String strTime){
         
         String dateTime = strDate+" "+strTime;
         System.out.println("dateTime "+dateTime);
         SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy HH:mm");
         try{
             return format.parse(dateTime);
         }catch(Exception e){
         e.printStackTrace();
             return null;
         }
     }
     
     public static String calculateDiffTime(String dateStart,String timeStart,String dateEnd,String timeEnd) {
         Date startDate = null;
         Date endDate = null;
         
         startDate = getDateFromDDMMYYYYHHmm(dateStart,timeStart);
         endDate = getDateFromDDMMYYYYHHmm(dateEnd,timeEnd);
         
         long diff = endDate.getTime() - startDate.getTime();
         
         
         
         if(diff < 0){
             return "00:00";
        }
         
        double hours = Math.floor(diff/ 1000 / 60 / 60);
         diff -= hours * 1000 * 60 * 60;
        double minutes = Math.floor(diff / 1000 / 60);
        
         
         if (hours < 0){
             hours = 0;
         }
         
         
 //        System.out.println("hours"+String.valueOf(hours).substring(0,String.valueOf(hours).indexOf(".")));
 //        System.out.println("minutes"+String.valueOf(minutes).substring(0,String.valueOf(minutes).indexOf(".")));
         
         return (hours <= 9 ? "0" : "") + String.valueOf(hours).substring(0,String.valueOf(hours).indexOf(".")) + ":" + (minutes <= 9 ? "0" : "") + String.valueOf(minutes).substring(0,String.valueOf(minutes).indexOf("."));
     }
     
     
     
     public static boolean checkToDateTimeGreaterThanFromDate(String dateStart,String timeStart,String dateEnd,String timeEnd) {
         Date startDate = null;
         Date endDate = null;
         
         startDate = getDateFromDDMMYYYYHHmm(dateStart,timeStart);
         endDate = getDateFromDDMMYYYYHHmm(dateEnd,timeEnd);
         
 //        System.out.println("check Date endDate.getTime() > startDate.getTime() >>>>> "+(startDate.getTime()>endDate.getTime()));
         
         return (endDate.getTime()>startDate.getTime());
     }
     
     public static boolean checkToDateTimeEqual(String dateStart,String timeStart,String dateEnd,String timeEnd) {
         Date startDate = null;
         Date endDate = null;
         
         startDate = getDateFromDDMMYYYYHHmm(dateStart,timeStart);
         endDate = getDateFromDDMMYYYYHHmm(dateEnd,timeEnd);
         
     //        System.out.println("check Date endDate.getTime() > startDate.getTime() >>>>> "+(startDate.getTime()>endDate.getTime()));
         
         return (endDate.getTime() == startDate.getTime());
     }
     
     
 }
