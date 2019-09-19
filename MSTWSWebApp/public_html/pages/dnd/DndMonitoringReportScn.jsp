<!--
--------------------------------------------------------
DndMonitoringReportScn.jsp
--------------------------------------------------------
Copyright RCL Public Co., Ltd. 2009
--------------------------------------------------------
Author Nuttapol Thanasrisatit 07/05/2013
- Change Log--------------------------------------------
## DD/MM/YY -User- -TaskRef-       -ShortDescription
01 07/05/13 Nuttapol               Add DND Monitoring Report
--------------------------------------------------------
-->
    
<%@ include file="/pages/misc/RcmInclude.jsp"%>
<%@ page import="com.rclgroup.dolphin.web.common.RcmConstant"%>
<%@ page import="com.rclgroup.dolphin.web.ui.dnd.DndMonitoringReportUim"%>
<%@ page import="com.rclgroup.dolphin.web.model.dnd.DndMonitoringReportLevel1Mod"%>
<%@ page import="java.util.List"%>
<html>
<head>
<jsp:useBean id="dndMonitoringReportUim" class="com.rclgroup.dolphin.web.ui.dnd.DndMonitoringReportUim" scope="session"/>
<title>DND Monitoring Report</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="<%=cssURL%>/sealiner.css">
<script language="Javascript1.2" src="<%=jsURL%>/RutString.js"></script>
<script language="JavaScript1.2" src="<%=jsURL%>/RutDate.js"></script>
<script language="Javascript1.2" src="<%=jsURL%>/RutMessage.js"></script>
<script language="Javascript1.2" src="<%=jsURL%>/RutHelp.js"></script>

<script language="JavaScript1.2" src="<%=jsURL%>/dndMonitoringAjax.js"></script>
 
<script language="javascript">
//<!--

function getPol(){
    openHelpList('<%=servURL%>/RrcStandardSrv?service=ui.misc.help.RcmPortHelpSvc&type=<%=RrcStandardUim.GET_GENERAL%>&pageAction=new&formName=frm&retName=txtPOL');   
}

function getShipper_Consignee(type, txt){
    openHelpList('<%=servURL%>/RrcStandardSrv?service=ui.misc.help.RcmCustomerHelpSvc&type=' + type + '&pageAction=new&formName=frm&retName=' + txt);
}

function resetScreen(){
    document.frm.pageAction.value = "new";
    document.frm.submit();
}
function go() {

    var strErrMsg = "";
    var dateDiff;
    var intErrCode = 1;
    
    var strFrom = document.frm.txtStartDate.value;  
    var strTo = document.frm.txtEndDate.value;  
    var strPODCountry = document.frm.cmbCountry.value; 
    var strShipper = document.frm.txtShipper.value.toUpperCase();
    var strConsignee = document.frm.txtConsignee.value.toUpperCase()
    
    strErrMsg = "";
    showBarMessage('messagetd',strErrMsg,intErrCode);
    
    if ((strFrom == null || strFrom == '')){       
        strErrMsg = "DND Start Date can not be blank.";
    }else if ((strTo == null || strTo == '')){       
        strErrMsg = "DND End Date can not be blank.";
    }else if ((strPODCountry == null || strPODCountry == '') &&
            (strShipper == null || strShipper == '') &&
            (strConsignee == null || strConsignee == '')) {
       strErrMsg = "POD Country, Shipper or Consignee cannot be blank. At least one value must be filled.";
    } 
    
     if(strErrMsg != ""){
        showBarMessage('messagetd',strErrMsg,intErrCode)
        return false;
    }
    
     // when all input filled, vaildate date diff
    var arrFrom = strFrom.split('/');
    var arrTo = strTo.split('/'); 
    var strFrom = new Date(arrFrom[1] + '/' + arrFrom[0] + '/' + arrFrom[2]); 
    var strTo = new Date(arrTo[1] + '/' + arrTo[0] + '/' + arrTo[2]); 

    dateDiff = (parseInt(strTo - strFrom) / (24*3600*1000)) + 1;
    
    if (dateDiff > 7) {
        strErrMsg = "Duration is limited for 7 days.";
    }
    
     if (dateDiff <= 0) {
        strErrMsg = "DND End Date  must be greater than or equal to DND Start Date.";
    } 
    
    // After all validation done and no error, get DND Monitoring Level 1
     if(strErrMsg == ""){
     
        document.frm.txtPOL.value = document.frm.txtPOL.value.toUpperCase();
        document.frm.txtShipper.value = document.frm.txtShipper.value.toUpperCase();
        document.frm.txtConsignee.value = document.frm.txtConsignee.value.toUpperCase();
        
        validate_input();
        
        // Validate input, if everything is correct, then proceed
        if (document.getElementById("dndMonitoringValidateInput").innerHTML == "") 
            getDndMonitoringLevel1();

    }else{
        showBarMessage('messagetd',strErrMsg,intErrCode);
        return false;
    }
}



//-->
</script>

</head>
<body class="BODY" onUnload="javascript:parent.closeChildWindow();" onload="getCountry();">
<%//Begin: Header Section%>
<jsp:include page="<%=headerURL%>" flush="true">
    <jsp:param name="title" value="DND Monitoring Report"/>
</jsp:include>
<%//End: Header Section%>

<form name="frm" method="post" action= "<%=servURL%>/RrcStandardSrv">
<input type="hidden" name="service" value="ui.dnd.DndMonitoringReportSvc"></input>
<input type="hidden" name="pageAction" value=""></input>
<input type="hidden" name="errCode" value=""></input>
<input type="hidden" name="errMsg" value=""></input>
<input type="hidden" name="reportFormat" value=""></input>
<input type="hidden" name="reportName" value=""></input>

<table border="0" width="100%" cellspacing="0" cellpadding="0">
    <tr><td width="100%" valign="middle" align="left" class="TableLeftText">DND Monitoring Report</td></tr>
</table>
<table border="0" width="100%">
    <tr>
        <td width="10%" class="TableLeftMaint" height="21" nowrap>DND Start Date : </td>
        <td width="10%" class="TableLeftWhite" height="21" nowrap>
             <!--<input  class="FormTextBoxReq" maxlength="10" size="12"  name="txtStartDate" value="<jsp:getProperty name="dndMonitoringReportUim" property="strStartDate"/>" -->
           <input  class="FormTextBoxReq" maxlength="10" size="12"  name="txtStartDate" value=""  
           onKeyPress="dateFormat(this,this.value,event,false,1,document.all('messagetd'));" 
           onClick="this.select();" 
           onBlur="dateFormat(this,this.value,event,true,1,document.all('messagetd'));">
           <a href="#" onClick="showCalendar('frm.txtStartDate', '', '', '1')"><img border="0" src="<%=imgURL%>/btnCalendar.gif" width="29" height="18"></a>
           
        </td>
       
        <td width="10%" class="TableLeftMaint" height="21" nowrap>DND End Date : </td>
        <td width="10%" class="TableLeftWhite" height="21" nowrap>
             <!--<input  class="FormTextBoxReq" maxlength="10" size="12"  name="txtEndDate" value="<jsp:getProperty name="dndMonitoringReportUim" property="strEndDate"/>" -->
           <input  class="FormTextBoxReq" maxlength="10" size="12"  name="txtEndDate" value="" 
           onKeyPress="dateFormat(this,this.value,event,false,1,document.all('messagetd'));" 
           onClick="this.select();" 
           onBlur="dateFormat(this,this.value,event,true,1,document.all('messagetd'));">
           <a href="#" onClick="showCalendar('frm.txtEndDate', '', '', '1')"><img border="0" src="<%=imgURL%>/btnCalendar.gif" width="29" height="18"></a>
        </td>
        
        <td width="10%" class="TableLeftMaint" height="21" nowrap>POD Country : </td>
        <td width="10%" class="TableLeftWhite" height="21" nowrap> 
            <div id="ajaxCmbCountry">
                <select size="1" style="width:120px" name="cmbCountry" class="FormDropDown" onchange="getPODFromCountry(this);">
                    <option value=""></option> 
                </select>
            </div>
        </td>
        
        <td width="10%" class="TableLeftMaint" height="21" nowrap>POD : </td>
        <td width="10%" class="TableLeftWhite" height="21" nowrap>
            <div id="ajaxCmbPod">
                <select size="1" name="cmbPOD" class="FormDropDown" style="width:80px">
                    <option value=""></option>               
                </select>
            </div>
        </td>
        
        <td width="10%" class="TableLeftMaint" height="21" nowrap>POL : </td>
        <td width="10%" class="TableLeftWhite" height="21" nowrap>
            <!--<input type="text" name="txtPOL" maxlength="5" size="10" value='<jsp:getProperty name="dndMonitoringReportUim" property="strPol"/>' class="FormTextBox"/>-->
            <input type="text" name="txtPOL" maxlength="5" size="10" value='' class="FormTextBox"/>
            <input type="button" value=". . ." name="btnSer" class="FormBtnClrHelp" onclick="getPol();"/>
        </td>
    </tr>
    
    <tr>
        <td width="10%" class="TableLeftMaint" height="21" nowrap>Shipper : </td>
        <td width="10%" class="TableLeftWhite" height="21" nowrap>
            <input type="text" name="txtShipper" maxlength="10" size="12" value='' class="FormTextBox"/>
            <input type="button" value=". . ." name="btnShipper" class="FormBtnClrHelp" 
                onClick = "getShipper_Consignee('GET_SHIPPER','txtShipper');" />
        </td>
        
        <td width="10%" class="TableLeftMaint" height="21" nowrap>Consignee : </td>
        <td width="10%" class="TableLeftWhite" height="21" nowrap>
            <input type="text" name="txtConsignee" maxlength="10" size="12" value='' class="FormTextBox"/>
            <input type="button" value=". . ." name="btnShipper" class="FormBtnClrHelp" 
                onClick = "getShipper_Consignee('GET_CONSIGNEE','txtConsignee');" />
        </td>
    </tr>
    
</table>

<table border="0" width="100%" cellspacing="0" cellpadding="0">
    <tr align="right">
        <td width="100%" class="TableLeftSubBtn">
            <input type="button" value="   Find   " name="btnFind" class="FormBtnClr" onclick="go();"></input>
        </td>
        
        <td width="100%" class="TableLeftSubBtn">
            <input type="button" value="   Reset   " name="btnFind" class="FormBtnClr" onclick="resetScreen();"></input>
        </td>
    </tr>
</table>

<!-- Start dndExportExcel -->
<table width=100% border=0 cellspacing=0 cellpadding=0>
    <tr>
        <td width="100%"><div id="dndExportExcel"></div></td>
    </tr>
</table>
<!-- End dndExportExcel -->

<!-- Start Display Level 1 -->
<table width=100% border=0 cellspacing=0 cellpadding=0>
    <tr>
        <td width="100%"><div id="dndMonitoringLevel1"></div></td>
    </tr>
</table>
<!-- End Display Level 1 -->

<!-- Start Display Level 2 -->
<table width=100% border=0 cellspacing=0 cellpadding=0>
    <tr>
        <td width="100%"><div id="dndMonitoringLevel2"></div></td>
    </tr>
</table>
<!-- End Display Level 2 -->

</form>

<%//Begin:Footer Section%>
<jsp:include page="<%=longFooterURL%>" flush="true">
    <jsp:param name="errCode" value="<%=errCode%>"/>
    <jsp:param name="errMsg" value="<%=errMsg%>"/>
    <jsp:param name="msg" value="<%=msg%>"/>
</jsp:include>
<%//End: Footer Section%>

</body>
</html>
