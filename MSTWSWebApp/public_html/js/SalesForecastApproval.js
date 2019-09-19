/*-----------------------------------------------------------------------------------------------------------
SalesForecastApproval.js
-------------------------------------------------------------------------------------------------------------
Copyright RCL Public Co., Ltd. 2007
-------------------------------------------------------------------------------------------------------------
Author  15/06/2016
- Change Log ------------------------------------------------------------------------------------------------
##  DD/MM/YY       -User-     -TaskRef-      -Short Description
-----------------------------------------------------------------------------------------------------------*/
function getReadyStateHandler(xmlHttpRequest, portion) {

    return function() {
//    alert("portion "+portion);
        if (portion == "getSalesSummary") {

            document.getElementById("display_sales_sum").innerHTML = "Loading ...";
//            document.getElementById("display_tos_header").innerHTML = "<img src=/TOSWebApp/images/loading.gif height=45 style=position: absolute; left: 100px; top: 50px;>";
//            document.getElementById("display_tos_operation").innerHTML = "";
//            document.getElementById("display_tos_activities").innerHTML = "";
//            alert(xmlHttpRequest.status);
            if (xmlHttpRequest.readyState == 4) {
              if (xmlHttpRequest.status == 200) {

                var doc = eval('(' + xmlHttpRequest.responseText + ')');
//                alert(""+generateHTML_HQ_Summary(doc));
                document.getElementById("display_sales_sum").innerHTML = generateHTML_Sale_Summary(doc); //xmlHttpRequest.responseText;

              } else {
                alert("HTTP error " + xmlHttpRequest.status + ": " + xmlHttpRequest.statusText);
              }
            }
        }else if (portion == "getServiceSummary"){
            document.getElementById("display_service_sum").innerHTML = "Loading ...";
//            document.getElementById("display_tos_header").innerHTML = "<img src=/TOSWebApp/images/loading.gif height=45 style=position: absolute; left: 100px; top: 50px;>";
//            document.getElementById("display_tos_operation").innerHTML = "";
//            document.getElementById("display_tos_activities").innerHTML = "";
//            alert(xmlHttpRequest.status);
            if (xmlHttpRequest.readyState == 4) {
              if (xmlHttpRequest.status == 200) {

                var doc = eval('(' + xmlHttpRequest.responseText + ')');
//                alert(""+generateHTML_HQ_Summary(doc));
                document.getElementById("display_service_sum").innerHTML = generateHTML_Service_Summary(doc); //xmlHttpRequest.responseText;

              } else {
                alert("HTTP error " + xmlHttpRequest.status + ": " + xmlHttpRequest.statusText);
              }
            }
        }
    };
}

function findData(frm) {
    
    try{
        var p_location = frm.tbx_location.value;
        var p_year = frm.cmbYear.value;
        var p_period = frm.cmbPeriod.value;
        var p_week = frm.cmbWeek.value;
        var p_fcastStatus = frm.cmbFcastStatus.value;
        
        var size_act5wk="Y";
        
        var pageAction = "findData";
        var potion = "getSalesSummary";
        
        size_act5wk = frm.chk_act5wk;
        
        var url = "pageAction="+pageAction +
                        "&p_year="+p_year +
                        "&p_period="+p_period +
                        "&p_week="+p_week +
                        "&p_location="+p_location +
                        "&p_fcastStatus="+p_fcastStatus +
                        "&size_act5wk=" + ((size_act5wk.checked == true)?size_act5wk.value:"N");
                        
        var xmlHttpRequest = getXMLHttpRequest();
            xmlHttpRequest.onreadystatechange = getReadyStateHandler(xmlHttpRequest, potion);
            xmlHttpRequest.open("POST", "/SMTWebApp/RrcStandardSrv?service=ui.smt.SmtSalesForecastApprovalSvc", true);
            xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlHttpRequest.send(url);
    } catch (err) {
        alert("err "+err.message);
    }                
    
}

function getSaleSummary(frm) {
    
    try{
//        var p_location = frm.tbx_location.value;
//        var p_year = frm.cmbYear.value;
//        var p_period = frm.cmbPeriod.value;
//        var p_week = frm.cmbWeek.value;
//        var p_fcastStatus = frm.cmbFcastStatus.value;
        
        var size_act5wk="Y";
        
        var pageAction = "getSalesSumData";
        var potion = "getSalesSummary";
        
        size_act5wk = frm.chk_act5wk;
        
        var url = "pageAction="+pageAction;
                        
        var xmlHttpRequest = getXMLHttpRequest();
            xmlHttpRequest.onreadystatechange = getReadyStateHandler(xmlHttpRequest, potion);
            xmlHttpRequest.open("POST", "/SMTWebApp/RrcStandardSrv?service=ui.smt.SmtSalesForecastApprovalSvc", true);
            xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlHttpRequest.send(url);
    } catch (err) {
        alert("err "+err.message);
    }                
    
}

function getServiceSummary(frm) {
    
    try{
//        var p_location = frm.tbx_location.value;
//        var p_year = frm.cmbYear.value;
//        var p_period = frm.cmbPeriod.value;
//        var p_week = frm.cmbWeek.value;
//        var p_fcastStatus = frm.cmbFcastStatus.value;
//        
//        var size_act5wk="Y";
        
        var pageAction = "getSeviceSumData";
        var potion = "getServiceSummary";
        
//        size_act5wk = frm.chk_act5wk;
        
        var url = "pageAction="+pageAction ;
                        
        var xmlHttpRequest = getXMLHttpRequest();
            xmlHttpRequest.onreadystatechange = getReadyStateHandler(xmlHttpRequest, potion);
            xmlHttpRequest.open("POST", "/SMTWebApp/RrcStandardSrv?service=ui.smt.SmtSalesForecastApprovalSvc", true);
            xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlHttpRequest.send(url);
    } catch (err) {
        alert("err "+err.message);
    }                
    
}

function submitToVerified(frm) {
    
    try{
    
        var pageAction = "managerVerified";
        var potion = "getSalesSummary";
        
//        size_act5wk = frm.chk_act5wk;
        
        var url = "pageAction="+pageAction ;
                        
        var xmlHttpRequest = getXMLHttpRequest();
            xmlHttpRequest.onreadystatechange = getReadyStateHandler(xmlHttpRequest, potion);
            xmlHttpRequest.open("POST", "/SMTWebApp/RrcStandardSrv?service=ui.smt.SmtSalesForecastApprovalSvc", true);
            xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlHttpRequest.send(url);
    } catch (err) {
        alert("err "+err.message);
    }                
    
}



function generateHTML_Sale_Summary(doc){
    
    var result = "";
    var check_act5wk = "N";
    
    try{
    
        check_act5wk = doc.check_act5wk;
        
        var param_week = parseInt(doc.p_week);

        var maxWeek = parseInt(doc.p_max_week);
        
        document.getElementById('manager_ver').innerHTML = "<font colour=blue>"+doc.manager_ver_desc+"</font>";
        
        var actual_count = 0;
        var fcast_count = 0;
        var week_count = 0;
        var header_count = 2;
        
        showBarMessage('messagetd', "Ready", 0);
        if(doc.msg_error != ""){
            showBarMessage('messagetd', doc.msg_error, 1);
        }else{
        
//        result = result + "<table border=0 width=100% cellpadding=0 cellspacing=1>";
//        result = result + "<tr >";
//        result = result + "<td >";
//        result = result + "<table border=0 width=100% cellpadding=0 cellspacing=1>";
//        result = result + "<tr >";
//        result = result + "<td >";
//        result = result + "<div style=overflow:auto;height:385px;width: 99.9%;>"; //width:325px;
        
        result = result + "<table border=1 cellpadding=0 cellspacing=0 width=100% id=tableHeader style='BORDER: gray 2px solid;border-collapse: collapse;'>";
//    result = result + "<tr class=FreezedHeader  FreezedHeader2>";
        result = result + "<tr >";
        result = result + "<td class=TableLeftSub nowrap rowspan='3' style='width:5% !important; BORDER-RIGHT: gray 2px solid;text-align:center;'><a>SALES</a></td>";
//        result = result + "<td class=TableLeftSub nowrap style='width:5% !important; BORDER-RIGHT: gray 2px solid;'><a>&nbsp;</a></td>";
        
        if(check_act5wk == "Y"){
            result = result + "<td class=TableLeftSub colspan=10 style='width:40%;text-align:center; BORDER-RIGHT: gray 2px solid; '><a>Actual</a></td>";
        }
        result = result + "<td class=TableLeftSub colspan=11 style='width:50%; BORDER-RIGHT: gray 2px solid;text-align:center; background-color:#ffff81 ;'><a>Fcast</a></td>";
        result = result + "<td class=TableLeftSub rowspan=3 nowrap style='width:127px !important; BORDER-RIGHT: gray 2px solid;'><a>&nbsp;</a></td>";
        
        result = result + "</tr>";
        
        result = result + "<tr >";
//        result = result + "<td class=TableLeftSub nowrap style='width:5% !important; text-align:center; BORDER-RIGHT: gray 2px solid;'><a>SALES</a></td>";
            if(check_act5wk == "Y"){
//                if((param_week-4) <= 0) {
//                    if((param_week-4) == 0) {
//                        result = result + "<td class=TableCenterSubNoBottom width=8% colspan=2>Wk "+(maxWeek-1)+"</td>";
//                    }else if((param_week-4) == -1){
//                        result = result + "<td class=TableCenterSubNoBottom width=8% colspan=2>Wk "+(maxWeek-2)+"</td>";
//                    }else if((param_week-4) == -2){
//                        result = result + "<td class=TableCenterSubNoBottom width=8% colspan=2>Wk "+(maxWeek-3)+"</td>";
//                    }else{
//                        result = result + "<td class=TableCenterSubNoBottom width=8% colspan=2>Wk "+(maxWeek-4)+"</td>";
//                    }
//                }else{
//                    result = result + "<td class=TableCenterSubNoBottom width=8% colspan=2>Wk "+(param_week-5)+"</td>";
//                }
//                
//                if((param_week-3) <= 0) {
//                    if((param_week-3) == 0) {
//                        result = result + "<td class=TableCenterSubNoBottom width=8% colspan=2>Wk "+(maxWeek-1)+"</td>";
//                    }else if((param_week-3) == -1){
//                        result = result + "<td class=TableCenterSubNoBottom width=8% colspan=2>Wk "+(maxWeek-2)+"</td>";
//                    }else if((param_week-3) == -2){
//                        result = result + "<td class=TableCenterSubNoBottom width=8% colspan=2>Wk "+(maxWeek-3)+"</td>";
//                    }else{
//                        result = result + "<td class=TableCenterSubNoBottom width=8% colspan=2>Wk "+(maxWeek-4)+"</td>";
//                    }
//                }else{
//                    result = result + "<td class=TableCenterSubNoBottom width=8% colspan=2>Wk "+(param_week-4)+"</td>";
//                }
//                
//                if((param_week-2) <= 0) {
//                    if((param_week-2) == 0) {
//                        result = result + "<td class=TableCenterSubNoBottom width=8% colspan=2>Wk "+(maxWeek-1)+"</td>";
//                    }else if((param_week-2) == -1){
//                        result = result + "<td class=TableCenterSubNoBottom width=8% colspan=2>Wk "+(maxWeek-2)+"</td>";
//                    }else if((param_week-2) == -2){
//                        result = result + "<td class=TableCenterSubNoBottom width=8% colspan=2>Wk "+(maxWeek-3)+"</td>";
//                    }else{
//                        result = result + "<td class=TableCenterSubNoBottom width=8% colspan=2>Wk "+(maxWeek-4)+"</td>";
//                    }
//                }else{
//                    result = result + "<td class=TableCenterSubNoBottom width=8% colspan=2>Wk "+(param_week-3)+"</td>";
//                }
//        
//                if((param_week-1) <= 0) {
//                    result = result + "<td class=TableCenterSubNoBottom width=8% colspan=2>Wk "+(maxWeek-1)+"</td>";
//                }else{
//                    result = result + "<td class=TableCenterSubNoBottom width=8% colspan=2>Wk "+(param_week-2)+"</td>";
//                }
                
                result = result + "<td class=TableCenterSubNoBottom width=8% colspan=2>Wk "+minusWeek(param_week,5,maxWeek)+"</td>";
                result = result + "<td class=TableCenterSubNoBottom width=8% colspan=2>Wk "+minusWeek(param_week,4,maxWeek)+"</td>";
                result = result + "<td class=TableCenterSubNoBottom width=8% colspan=2>Wk "+minusWeek(param_week,3,maxWeek)+"</td>";
                result = result + "<td class=TableCenterSubNoBottom width=8% colspan=2>Wk "+minusWeek(param_week,2,maxWeek)+"</td>";
                result = result + "<td class=TableCenterSubNoBottom width=8% colspan=2 style='BORDER-RIGHT: gray 2px solid;'>Wk "+minusWeek(param_week,1,maxWeek)+"</td>";
            }
            
            result = result + "<td class=TableCenterSubNoBottom colspan=2 width=8% style='background-color:#ffff81;'>Wk "+plusWeek(param_week,0,maxWeek)+"</td>";
            result = result + "<td class=TableCenterSubNoBottom colspan=2 width=8% style='background-color:#ffff81;'>Wk "+plusWeek(param_week,1,maxWeek)+"</td>";
            result = result + "<td class=TableCenterSubNoBottom colspan=2 width=8% style='background-color:#ffff81;'>Wk "+plusWeek(param_week,2,maxWeek)+"</td>";
            result = result + "<td class=TableCenterSubNoBottom colspan=2 width=8% style='background-color:#ffff81;'>Wk "+plusWeek(param_week,3,maxWeek)+"</td>";
            result = result + "<td class=TableCenterSubNoBottom colspan=2 width=8% style='background-color:#ffff81;'>Wk "+plusWeek(param_week,4,maxWeek)+"</td>";
            
//            result = result + "<td class=TableLeftSub nowrap style='width:10%;text-align:center; !important; BORDER-RIGHT: gray 2px solid;background-color:#ffff81;'><a>STATUS</a></td>";
//            result = result + "<td class=TableLeftSub nowrap style='width:127px !important; BORDER-RIGHT: gray 2px solid;BORDER-LEFT: gray 2px solid;'><a>&nbsp;</a></td>";
            
            result = result + "<td class=TableLeftSub nowrap rowspan=2 style='width:10%;text-align:center; !important; BORDER-RIGHT: gray 2px solid;background-color:#ffff81;'><a>STATUS</a></td>";
//            result = result + "<td class=TableLeftSub nowrap rowspan=3 style='width:127px !important; BORDER-RIGHT: gray 2px solid;BORDER-LEFT: gray 2px solid;'><a>&nbsp;</a></td>";
        result = result + "</tr>";
        
        result = result + "<tr >";
//        result = result + "<td class=TableLeftSub nowrap style='width:5% !important; BORDER-RIGHT: gray 2px solid;'><a>&nbsp;</a></td>";
        if(check_act5wk == "Y"){
            result = result +  generateActualCocSoc();
        }
        result = result + generateFcastCocSoc(false);
        
//        result = result + "<td class=TableLeftSub style='width:5% !important; BORDER-RIGHT: gray 2px solid;background-color:#ffff81;' >&nbsp;</td>";
//        result = result + "<td class=TableLeftSub nowrap style='width:127px !important; BORDER-RIGHT: gray 2px solid;BORDER-LEFT: gray 2px solid;'><a>&nbsp;</a></td>";
        result = result + "</tr>";
        
        if(doc.sales_summary != null && doc.sales_summary.length != 0){
        
        for(hdr = 0 ; hdr < doc.sales_summary.length ; hdr++){
        
            var colorStatus = "#3333cc";
            if(doc.sales_summary[hdr].fcast_status == "L"){
                colorStatus = "#00AA00";
            }else if(doc.sales_summary[hdr].fcast_status == "J"){
                colorStatus = "#974706";
            }else if(doc.sales_summary[hdr].fcast_status == "W"){
                colorStatus = "#e26b0a";
            }
            
           result = result + "<tr class=TableLeftWhite>"; 
            if(doc.sales_summary[hdr].sales_code == "blank"){
                result = result + "<td style='width:10%;text-align:right; !important; BORDER-RIGHT: gray 2px solid;' ><a href='#' style='color:red' onclick=showDetail(\'"+doc.sales_summary[hdr].sales_code+"\',\'"+doc.sales_summary[hdr].sales_office+"\');>"+doc.sales_summary[hdr].sales_code+"</a>&nbsp;</td>";
            }else{
//                if(doc.sales_summary[hdr].fcast_status != "O"){
                    result = result + "<td style='width:10%;text-align:right; !important; BORDER-RIGHT: gray 2px solid;' title='SL Ofc : "+doc.sales_summary[hdr].sales_office+"' ><a href='#' onclick=showDetail(\'"+doc.sales_summary[hdr].sales_code+"\',\'"+doc.sales_summary[hdr].sales_office+"\');>"+doc.sales_summary[hdr].sales_code+"</a>&nbsp;</td>";
//                }else{
//                    result = result + "<td style='width:10%;text-align:right; !important; BORDER-RIGHT: gray 2px solid;' >"+doc.sales_summary[hdr].sales_code+"&nbsp;</td>";
//                }
            }
            
            if(check_act5wk == "Y"){
                result = result +  generateActual(doc.sales_summary[hdr]);
            }
            result = result + generateForecast(doc.sales_summary[hdr],false);
            result = result + "<td style='width:10%;!important; BORDER-RIGHT: gray 2px solid;text-align:right; color:"+colorStatus+"' id=fcast_status_"+hdr+" >"+doc.sales_summary[hdr].fcast_status_desc+"&nbsp;</td>";
            
            var approveButton = "";
            var rejectButton = "";
            if(doc.sales_summary[hdr].fcast_status == "L"){
                approveButton = "disabled";
            }else if(doc.sales_summary[hdr].fcast_status == "J"){
                rejectButton = "disabled";
                approveButton = "disabled";
            }
            
            if(doc.sales_summary[hdr].sales_code == "blank"){
                rejectButton = "disabled";
            }
            
//   doc.sales_summary[hdr].fcast_status == "O" ||          
            if(doc.sales_summary[hdr].fcast_status == "" || doc.sales_summary[hdr].fcast_status == null || doc.auth_manager != true || doc.manager_ver == "F"){
                result = result + "<td  >&nbsp;</td>";
            }else{
                result = result + "<td  ><input  type=button class=FormBtnClr id=btn_reject_"+hdr+" value=Reject "+rejectButton+" onclick=submitReject(\'"+doc.sales_summary[hdr].sales_code+"\',\'"+hdr+"\');>&nbsp;<input type=button class=FormBtnClr id=btn_approve_"+hdr+" value=Approve "+approveButton+" onclick=submitApprove(\'"+doc.sales_summary[hdr].sales_code+"\',\'"+hdr+"\');></td>";
            }
            
            result = result + "</tr>";
        }
        
        result = result + "<tr style='FONT-WEIGHT:bold;'>";

        result = result + "<td style='color:#000000; BORDER-RIGHT: gray 2px solid;' class=TableRightSub>Total&nbsp;&nbsp;&nbsp;&nbsp;</td>";
        
        result = result + generateTotal(doc,check_act5wk,false);
        
        result = result + "<td class=TableLeftSub style='width:5%;!important; BORDER-RIGHT: gray 2px solid;text-align:right; color:"+colorStatus+"' >&nbsp;</td>";
        result = result + "<td class=TableLeftSub style='width:10%;' >&nbsp;</td>";
        
        result = result + "</tr>";
        
        }
        
        if(doc.sales_summary_other != null && doc.sales_summary_other.length != 0){
        
        result = result + "<tr class=TableLeftWhite>";

        result = result + "<td BGCOLOR=#fce4d6 style='width:5%;!important; BORDER-RIGHT: gray 2px solid;text-align:center;'>OTHER&nbsp;&nbsp;&nbsp;&nbsp;</td>";
        
        result = result + generateEmpty(check_act5wk,false,"#fce4d6");
        
        result = result + "<td BGCOLOR=#fce4d6 style='width:5%;!important; BORDER-RIGHT: gray 2px solid;text-align:right;' >&nbsp;</td>";
        result = result + "<td BGCOLOR=#fce4d6 style='width:10%;' >&nbsp;</td>";
        
        result = result + "</tr>";
        
        
        
        
        for(hdr = 0 ; hdr < doc.sales_summary_other.length ; hdr++){
        
            var colorStatus = "#3333cc";
            if(doc.sales_summary_other[hdr].fcast_status == "L"){
                colorStatus = "#00AA00";
            }else if(doc.sales_summary_other[hdr].fcast_status == "J"){
                colorStatus = "#974706";
            }else if(doc.sales_summary_other[hdr].fcast_status == "W"){
                colorStatus = "#e26b0a";
            }
            
           result = result + "<tr class=TableLeftWhite>"; 
//            if(doc.sales_summary_other[hdr].sales_code == "blank"){
//                result = result + "<td style='width:10%;text-align:right; !important; BORDER-RIGHT: gray 2px solid;' ><a href='#' style='color:red' onclick=showDetail(\'"+doc.sales_summary_other[hdr].sales_code+"\',\'"+doc.sales_summary_other[hdr].sales_office+"\');>"+doc.sales_summary_other[hdr].sales_code+"</a>&nbsp;</td>";
//            }else{
//                if(doc.sales_summary_other[hdr].fcast_status != "O"){
                    result = result + "<td style='width:10%;text-align:right; !important; BORDER-RIGHT: gray 2px solid;' title='SL Ofc : "+doc.sales_summary_other[hdr].sales_office+"' ><a href='#' onclick=showDetail(\'"+doc.sales_summary_other[hdr].sales_code+"\',\'\');>"+doc.sales_summary_other[hdr].sales_code+"</a>&nbsp;</td>";
//                }else{
//                    result = result + "<td style='width:10%;text-align:right; !important; BORDER-RIGHT: gray 2px solid;' >"+doc.sales_summary_other[hdr].sales_code+"&nbsp;</td>";
//                }
                    
//            }
            
            if(check_act5wk == "Y"){
                result = result +  generateActual(doc.sales_summary_other[hdr]);
            }
            result = result + generateForecast(doc.sales_summary_other[hdr],false);
            result = result + "<td style='width:10%;!important; BORDER-RIGHT: gray 2px solid;text-align:right; color:"+colorStatus+"' id=fcast_other_status_"+hdr+" >"+doc.sales_summary_other[hdr].fcast_status_desc+"&nbsp;</td>";
            
//            result = result + "<td style='width:10%;!important; BORDER-RIGHT: gray 2px solid;text-align:right; ' id=fcast_other_status_"+hdr+" >&nbsp;</td>";
            
            var approveButton = "";
            var rejectButton = "";
            if(doc.sales_summary_other[hdr].fcast_status == "L"){
                approveButton = "disabled";
            }else if(doc.sales_summary_other[hdr].fcast_status == "J"){
                rejectButton = "disabled";
                approveButton = "disabled";
            }
            
//            if(doc.sales_summary_other[hdr].fcast_status == "O" || doc.sales_summary_other[hdr].fcast_status == "" || doc.sales_summary_other[hdr].fcast_status == null){
                result = result + "<td  >&nbsp;</td>";
//            }else{
//                result = result + "<td  ><input  type=button class=FormBtnClr id=btn_other_reject_"+hdr+" value=Reject "+rejectButton+" onclick=submitReject_other(\'"+doc.sales_summary_other[hdr].sales_code+"\',\'"+hdr+"\');>&nbsp;<input type=button class=FormBtnClr id=btn_other_approve_"+hdr+" value=Approve "+approveButton+" onclick=submitApprove_other(\'"+doc.sales_summary_other[hdr].sales_code+"\',\'"+hdr+"\');></td>";
//            }
            
            result = result + "</tr>";
        }
        
        result = result + "<tr style='FONT-WEIGHT:bold;color:#000000;'>";

        result = result + "<td style='text-align:right; BORDER-RIGHT: gray 2px solid;color:#000000' class=TableRightSub>Total&nbsp;&nbsp;&nbsp;&nbsp;</td>";
        
        result = result + generateOtherTotal(doc,check_act5wk,false);
        
        result = result + "<td class=TableLeftSub style='width:5%;!important; BORDER-RIGHT: gray 2px solid;text-align:right; color:"+colorStatus+"' >&nbsp;</td>";
        result = result + "<td class=TableLeftSub style='width:10%;' >&nbsp;</td>";
        
        result = result + "</tr>";
        }
        
        result = result + "<tr style='FONT-WEIGHT:bold;color:#FFFFFF;'>";

        result = result + "<td style='text-align:right; BORDER-RIGHT: gray 2px solid;color:#000000' class=TableRightSub>Grand Total&nbsp;&nbsp;&nbsp;&nbsp;</td>";
        
        result = result + generateGrandTotal(doc,check_act5wk,false);
        
        result = result + "<td class=TableLeftSub style='width:5%;!important; BORDER-RIGHT: gray 2px solid;text-align:right; color:"+colorStatus+"' >&nbsp;</td>";
        result = result + "<td class=TableLeftSub style='width:10%;' >&nbsp;</td>";
        
        result = result + "</tr>";
        
        result = result + "</table>";
        
//        result = result + "</div>"; //width:325px;
//    
//        result = result + "</td>";
//        result = result + "</tr>";
//        result = result + "</table>";
//        result = result + "</td>";
//        result = result + "</tr>";
//        result = result + "</table>";
        
//        alert(result);
    }
        
    } catch (err) {
        alert("err "+err.message);
    }  
    
    if(doc.ver_error != ""){
        showBarMessage('messagetd', doc.ver_error, 1);
    }
    runPage1();
    return result;
}
function generateActualCocSoc(){
    var result = "";
    
    result = result + "<td class=TableLeftSub style='text-align:center;'>COC</td>";
    result = result + "<td class=TableLeftSub style='text-align:center;'>SOC</td>";
    result = result + "<td class=TableLeftSub style='text-align:center;'>COC</td>";
    result = result + "<td class=TableLeftSub style='text-align:center;'>SOC</td>";
    result = result + "<td class=TableLeftSub style='text-align:center;'>COC</td>";
    result = result + "<td class=TableLeftSub style='text-align:center;'>SOC</td>";
    result = result + "<td class=TableLeftSub style='text-align:center;'>COC</td>";
    result = result + "<td class=TableLeftSub style='text-align:center;'>SOC</td>";
    result = result + "<td class=TableLeftSub style='text-align:center;'>COC</td>";
    result = result + "<td class=TableLeftSub style='text-align:center;BORDER-RIGHT: gray 2px solid;'>SOC</td>";
    
    return result;
}

function generateFcastCocSoc(isBorder){
    var result = "";

    result = result + "<td class=TableLeftSub style='text-align:center; background-color:#ffff81;'>COC</td>";
    result = result + "<td class=TableLeftSub style='text-align:center; background-color:#ffff81;'>SOC</td>";
    result = result + "<td class=TableLeftSub style='text-align:center; background-color:#ffff81;'>COC</td>";
    result = result + "<td class=TableLeftSub style='text-align:center; background-color:#ffff81;'>SOC</td>";
    result = result + "<td class=TableLeftSub style='text-align:center; background-color:#ffff81;'>COC</td>";
    result = result + "<td class=TableLeftSub style='text-align:center; background-color:#ffff81;'>SOC</td>";
    result = result + "<td class=TableLeftSub style='text-align:center; background-color:#ffff81;'>COC</td>";
    result = result + "<td class=TableLeftSub style='text-align:center; background-color:#ffff81;'>SOC</td>";
    result = result + "<td class=TableLeftSub style='text-align:center; background-color:#ffff81;'>COC</td>";
    if(isBorder){
        result = result + "<td class=TableLeftSub style='text-align:center; background-color:#ffff81;BORDER-RIGHT: gray 2px solid;'>SOC</td>";
    }else{
        result = result + "<td class=TableLeftSub style='text-align:center; background-color:#ffff81;'>SOC</td>";
    }
    
    return result;
}

function generateHTML_Service_Summary(doc){
    
    var result = "";
    var check_act5wk = "N";
    
    try{
    
        check_act5wk = doc.check_act5wk;
        
        var param_week = parseInt(doc.p_week);

        var maxWeek = parseInt(doc.p_max_week);
        
        
        var actual_count = 0;
        var fcast_count = 0;
        var week_count = 0;
        var header_count = 2;
        
        result = result + "<table border=1 cellpadding=0 cellspacing=0 width=100% id=tableHeaderService style='BORDER: gray 2px solid;border-collapse: collapse;'>";
//    result = result + "<tr class=FreezedHeader  FreezedHeader2>";
        result = result + "<tr >";
        result = result + "<td class=TableLeftSub nowrap rowspan='3' style='width:5%;'><a>SERVICE</a></td>";
        result = result + "<td class=TableLeftSub nowrap rowspan='3' style='width:5%;text-align:center; !important; BORDER-RIGHT: gray 2px solid;'><a>Bound</a></td>";
//        result = result + "<td class=TableLeftSub style='width:5%;'><a>&nbsp;</a></td>";
//        result = result + "<td class=TableLeftSub style='width:5%;text-align:center; !important; BORDER-RIGHT: gray 2px solid;'><a>&nbsp;</a></td>";
        
        result = result + "<td class=TableLeftSub colspan='4' style='width:20%; !important; BORDER-RIGHT: gray 2px solid;BORDER-LEFT: gray 2px solid; TEXT-ALIGN: center; '><a>BSA</a></td>";
        
        if(check_act5wk == "Y"){
            result = result + "<td class=TableLeftSub colspan=10 style='TEXT-ALIGN: center; BORDER-LEFT: gray 2px solid;' ><a>Actual</a></td>";
        }
        result = result + "<td class=TableLeftSub colspan=10 style='width:35%; BORDER-RIGHT: gray 2px solid;BORDER-LEFT: gray 2px solid; background-color:#ffff81;TEXT-ALIGN: center; '><a>Fcast</a></td>";
        
        
        result = result + "</tr>";
        
        result = result + "<tr >";
        
//        result = result + "<td class=TableLeftSub nowrap style='width:5%;'><a>SERVICE</a></td>";
//        result = result + "<td class=TableLeftSub nowrap style='width:5%;text-align:center; !important; BORDER-RIGHT: gray 2px solid;'><a>Bound</a></td>";
        
        result = result + "<td class=TableLeftSub nowrap colspan='2' style='width:10%;text-align:center; !important; BORDER-LEFT: gray 2px solid;'><a>BSA [TEU]</a></td>";
        result = result + "<td class=TableLeftSub nowrap colspan='2' style='width:10%;text-align:center; !important; BORDER-RIGHT: gray 2px solid;'><a>BSA [mT]</a></td>";
        
            if(check_act5wk == "Y"){
                if((param_week-4) <= 0) {
                    if((param_week-4) == 0) {
                        result = result + "<td class=TableLeftSub colspan=2 style='text-align:center;'>Wk "+(maxWeek-1)+"</td>";
                    }else if((param_week-4) == -1){
                        result = result + "<td class=TableLeftSub colspan=2 style='text-align:center;'>Wk "+(maxWeek-2)+"</td>";
                    }else if((param_week-4) == -2){
                        result = result + "<td class=TableLeftSub colspan=2 style='text-align:center;'>Wk "+(maxWeek-3)+"</td>";
                    }else{
                        result = result + "<td class=TableLeftSub colspan=2 style='text-align:center;'>Wk "+(maxWeek-4)+"</td>";
                    }
                }else{
                    result = result + "<td class=TableLeftSub colspan=2 style='text-align:center;'>Wk "+(param_week-5)+"</td>";
                }
                
                if((param_week-3) <= 0) {
                    if((param_week-3) == 0) {
                        result = result + "<td class=TableLeftSub colspan=2 style='text-align:center;'>Wk "+(maxWeek-1)+"</td>";
                    }else if((param_week-3) == -1){
                        result = result + "<td class=TableLeftSub colspan=2 style='text-align:center;'>Wk "+(maxWeek-2)+"</td>";
                    }else if((param_week-3) == -2){
                        result = result + "<td class=TableLeftSub colspan=2 style='text-align:center;'>Wk "+(maxWeek-3)+"</td>";
                    }else{
                        result = result + "<td class=TableLeftSub colspan=2 style='text-align:center;'>Wk "+(maxWeek-4)+"</td>";
                    }
                }else{
                    result = result + "<td class=TableLeftSub colspan=2 style='text-align:center;'>Wk "+(param_week-4)+"</td>";
                }
                
                if((param_week-2) <= 0) {
                    if((param_week-2) == 0) {
                        result = result + "<td class=TableLeftSub colspan=2 style='text-align:center;'>Wk "+(maxWeek-1)+"</td>";
                    }else if((param_week-2) == -1){
                        result = result + "<td class=TableLeftSub colspan=2 style='text-align:center;'>Wk "+(maxWeek-2)+"</td>";
                    }else if((param_week-2) == -2){
                        result = result + "<td class=TableLeftSub colspan=2 style='text-align:center;'>Wk "+(maxWeek-3)+"</td>";
                    }else{
                        result = result + "<td class=TableLeftSub colspan=2 style='text-align:center;'>Wk "+(maxWeek-4)+"</td>";
                    }
                }else{
                    result = result + "<td class=TableLeftSub colspan=2 style='text-align:center;'>Wk "+(param_week-3)+"</td>";
                }
        
                if((param_week-1) <= 0) {
                    result = result + "<td class=TableLeftSub colspan=2 style='text-align:center;'>Wk "+(maxWeek-1)+"</td>";
                }else{
                    result = result + "<td class=TableLeftSub colspan=2 style='text-align:center;'>Wk "+(param_week-2)+"</td>";
                }
                
                result = result + "<td class=TableLeftSub colspan=2 style='BORDER-RIGHT: gray 2px solid;text-align:center;'>Wk "+(param_week-1)+"</td>";
            }
            
            result = result + "<td class=TableLeftSub colspan=2 style='width:8%; background-color:#ffff81; BORDER-LEFT: gray 2px solid;text-align:center;'>Wk "+(param_week)+"</td>";
            result = result + "<td class=TableLeftSub colspan=2 style='width:8%; background-color:#ffff81;text-align:center; '>Wk "+(param_week+1)+"</td>";
            result = result + "<td class=TableLeftSub colspan=2 style='width:8%; background-color:#ffff81;text-align:center; '>Wk "+(param_week+2)+"</td>";
            result = result + "<td class=TableLeftSub colspan=2 style='width:8%; background-color:#ffff81;text-align:center; '>Wk "+(param_week+3)+"</td>";
            result = result + "<td class=TableLeftSub colspan=2 style='width:8%; background-color:#ffff81;text-align:center; '>Wk "+(param_week+4)+"</td>";
            
            
        result = result + "</tr>";
        
        result = result + "<tr >";
        
//        result = result + "<td class=TableLeftSub style='width:5%;'><a>&nbsp;</a></td>";
//        result = result + "<td class=TableLeftSub style='width:5%;text-align:center; !important; BORDER-RIGHT: gray 2px solid;'><a>&nbsp;</a></td>";
        
        result = result + "<td class=TableLeftSub style='text-align:center;!important; BORDER-LEFT: gray 2px solid;'>COC</td>";
        result = result + "<td class=TableLeftSub style='text-align:center;'>SOC</td>";
        result = result + "<td class=TableLeftSub style='text-align:center;'>COC</td>";
        result = result + "<td class=TableLeftSub style='text-align:center;BORDER-RIGHT: gray 2px solid; '>SOC</td>";
        
        if(check_act5wk == "Y"){
            result = result +  generateActualCocSoc();
        }
        result = result + generateFcastCocSoc(true);
        result = result + "</tr>";
        
        for(hdr = 0 ; hdr < doc.service_summary.length ; hdr++){
           result = result + "<tr class=TableLeftWhite>"; 
            
            result = result + "<td style='text-align:right;' >"+doc.service_summary[hdr].service+"&nbsp;</td>";
            result = result + "<td style='BORDER-RIGHT: gray 2px solid; text-align:center;' >"+doc.service_summary[hdr].direction+"&nbsp;</td>";
            result = result +  generateBSA(doc.service_summary[hdr]);
            
            if(check_act5wk == "Y"){
                result = result +  generateActual(doc.service_summary[hdr]);
            }
            result = result + generateForecast(doc.service_summary[hdr],false);
            
            result = result + "</tr>";
        }
        
        
//        result = result + "<tr class=TableLeftWhite style='FONT-WEIGHT:bold;'>";
        result = result + "<tr style='FONT-WEIGHT:bold;color:#000000;'>";

        result = result + "<td colspan=2 style='text-align:right; BORDER-RIGHT: gray 2px solid;color:#000000;' class=TableRightSub >Total&nbsp;&nbsp;&nbsp;&nbsp;</td>";
        
        result = result + "<td style='text-align:right;color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumBsaCoc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumBsaSoc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumMtCoc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;BORDER-RIGHT: gray 2px solid;color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumMtSoc).toFixed(0))+"</td>";
        
        result = result + generateTotal(doc,check_act5wk,false);
        
        result = result + "</tr>";
        
        result = result + "</table>";
        
        runPage1();
//        alert(result);
        return result;
    } catch (err) {
        runPage1();
        alert("err "+err.message);
    }  
}

function generateBSA(doc){
    var result = "";
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.bsa_coc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.bsa_soc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.mt_coc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;BORDER-RIGHT: gray 2px solid;'>"+changeZeroToSpace(parseFloat(doc.mt_soc).toFixed(0))+"</td>";
    return result;
}



function generateEmpty(check_act5wk,isBorder,colour){
    var result = "";
    
    
    if(check_act5wk == "Y"){
        result = result + "<td BGCOLOR="+colour+" style='color:#000000;' >&nbsp;</td>";
        result = result + "<td BGCOLOR="+colour+" style='color:#000000;' >&nbsp;</td>";
        result = result + "<td BGCOLOR="+colour+" style='color:#000000;' >&nbsp;</td>";
        result = result + "<td BGCOLOR="+colour+" style='color:#000000;' >&nbsp;</td>";
        result = result + "<td BGCOLOR="+colour+" style='color:#000000;' >&nbsp;</td>";
        result = result + "<td BGCOLOR="+colour+" style='color:#000000;' >&nbsp;</td>";
        result = result + "<td BGCOLOR="+colour+" style='color:#000000;' >&nbsp;</td>";
        result = result + "<td BGCOLOR="+colour+" style='color:#000000;' >&nbsp;</td>";
        result = result + "<td BGCOLOR="+colour+" style='color:#000000;' >&nbsp;</td>";
        result = result + "<td BGCOLOR="+colour+" style='color:#000000;BORDER-RIGHT: gray 2px solid;' >&nbsp;</td>";
    }
    
    result = result + "<td BGCOLOR="+colour+" style='color:#000000;' >&nbsp;</td>";
    result = result + "<td BGCOLOR="+colour+" style='color:#000000;' >&nbsp;</td>";
    result = result + "<td BGCOLOR="+colour+" style='color:#000000;' >&nbsp;</td>";
    result = result + "<td BGCOLOR="+colour+" style='color:#000000;' >&nbsp;</td>";
    result = result + "<td BGCOLOR="+colour+" style='color:#000000;' >&nbsp;</td>";
    result = result + "<td BGCOLOR="+colour+" style='color:#000000;' >&nbsp;</td>";
    result = result + "<td BGCOLOR="+colour+" style='color:#000000;' >&nbsp;</td>";
    result = result + "<td BGCOLOR="+colour+" style='color:#000000;' >&nbsp;</td>";
    result = result + "<td BGCOLOR="+colour+" style='color:#000000;' >&nbsp;</td>";
    if(isBorder){
        result = result + "<td BGCOLOR="+colour+" style='color:#000000; !important; BORDER-RIGHT: gray 2px solid;' >&nbsp;</td>";
    }else{
        result = result + "<td BGCOLOR="+colour+" style='color:#000000;' >&nbsp;</td>";
    }
    
    return result;
}

function generateTotal(doc,check_act5wk,isBorder){
    var result = "";
    
    
    if(check_act5wk == "Y"){
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumActWk1Coc).toFixed(0))+"</td>";
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumActWk1Soc).toFixed(0))+"</td>";
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumActWk2Coc).toFixed(0))+"</td>";
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumActWk2Soc).toFixed(0))+"</td>";
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumActWk3Coc).toFixed(0))+"</td>";
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumActWk3Soc).toFixed(0))+"</td>";
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumActWk4Coc).toFixed(0))+"</td>";
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumActWk4Soc).toFixed(0))+"</td>";
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumActWk5Coc).toFixed(0))+"</td>";
        result = result + "<td style='color:#000000;BORDER-RIGHT: gray 2px solid;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumActWk5Soc).toFixed(0))+"</td>";
    }
    
    result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumFCastWk1Coc).toFixed(0))+"</td>";
    result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumFCastWk1Soc).toFixed(0))+"</td>";
    result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumFCastWk2Coc).toFixed(0))+"</td>";
    result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumFCastWk2Soc).toFixed(0))+"</td>";
    result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumFCastWk3Coc).toFixed(0))+"</td>";
    result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumFCastWk3Soc).toFixed(0))+"</td>";
    result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumFCastWk4Coc).toFixed(0))+"</td>";
    result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumFCastWk4Soc).toFixed(0))+"</td>";
    result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumFCastWk5Coc).toFixed(0))+"</td>";
    if(isBorder){
        result = result + "<td style='color:#000000; !important; BORDER-RIGHT: gray 2px solid;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumFCastWk5Soc).toFixed(0))+"</td>";
    }else{
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumFCastWk5Soc).toFixed(0))+"</td>";
    }
    
    return result;
}

function generateOtherTotal(doc,check_act5wk,isBorder){
    var result = "";
    
    
    if(check_act5wk == "Y"){
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumOtherActWk1Coc).toFixed(0))+"</td>";
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumOtherActWk1Soc).toFixed(0))+"</td>";
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumOtherActWk2Coc).toFixed(0))+"</td>";
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumOtherActWk2Soc).toFixed(0))+"</td>";
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumOtherActWk3Coc).toFixed(0))+"</td>";
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumOtherActWk3Soc).toFixed(0))+"</td>";
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumOtherActWk4Coc).toFixed(0))+"</td>";
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumOtherActWk4Soc).toFixed(0))+"</td>";
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumOtherActWk5Coc).toFixed(0))+"</td>";
        result = result + "<td style='BORDER-RIGHT: gray 2px solid;color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumOtherActWk5Soc).toFixed(0))+"</td>";
    }
    
    result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumOtherFCastWk1Coc).toFixed(0))+"</td>";
    result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumOtherFCastWk1Soc).toFixed(0))+"</td>";
    result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumOtherFCastWk2Coc).toFixed(0))+"</td>";
    result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumOtherFCastWk2Soc).toFixed(0))+"</td>";
    result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumOtherFCastWk3Coc).toFixed(0))+"</td>";
    result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumOtherFCastWk3Soc).toFixed(0))+"</td>";
    result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumOtherFCastWk4Coc).toFixed(0))+"</td>";
    result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumOtherFCastWk4Soc).toFixed(0))+"</td>";
    result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumOtherFCastWk5Coc).toFixed(0))+"</td>";
    if(isBorder){
        result = result + "<td style=' !important; BORDER-RIGHT: gray 2px solid;color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumOtherFCastWk5Soc).toFixed(0))+"</td>";
    }else{
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.sumOtherFCastWk5Soc).toFixed(0))+"</td>";
    }
    
    return result;
}

function generateGrandTotal(doc,check_act5wk,isBorder){
    var result = "";
    
    
    if(check_act5wk == "Y"){
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.grandSumActWk1Coc).toFixed(0))+"</td>";
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.grandSumActWk1Soc).toFixed(0))+"</td>";
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.grandSumActWk2Coc).toFixed(0))+"</td>";
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.grandSumActWk2Soc).toFixed(0))+"</td>";
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.grandSumActWk3Coc).toFixed(0))+"</td>";
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.grandSumActWk3Soc).toFixed(0))+"</td>";
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.grandSumActWk4Coc).toFixed(0))+"</td>";
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.grandSumActWk4Soc).toFixed(0))+"</td>";
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.grandSumActWk5Coc).toFixed(0))+"</td>";
        result = result + "<td style='color:#000000;BORDER-RIGHT: gray 2px solid;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.grandSumActWk5Soc).toFixed(0))+"</td>";
    }
    
    result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.grandSumFCastWk1Coc).toFixed(0))+"</td>";
    result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.grandSumFCastWk1Soc).toFixed(0))+"</td>";
    result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.grandSumFCastWk2Coc).toFixed(0))+"</td>";
    result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.grandSumFCastWk2Soc).toFixed(0))+"</td>";
    result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.grandSumFCastWk3Coc).toFixed(0))+"</td>";
    result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.grandSumFCastWk3Soc).toFixed(0))+"</td>";
    result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.grandSumFCastWk4Coc).toFixed(0))+"</td>";
    result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.grandSumFCastWk4Soc).toFixed(0))+"</td>";
    result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.grandSumFCastWk5Coc).toFixed(0))+"</td>";
    if(isBorder){
        result = result + "<td style='color:#000000; !important; BORDER-RIGHT: gray 2px solid;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.grandSumFCastWk5Soc).toFixed(0))+"</td>";
    }else{
        result = result + "<td style='color:#000000;' class=TableRightSub>"+changeZeroToSpace(parseFloat(doc.grandSumFCastWk5Soc).toFixed(0))+"</td>";
    }
    
    return result;
}

function generateActual(doc){
    var result = "";
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk1coc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk1soc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk2coc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk2soc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk3coc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk3soc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk4coc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk4soc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk5coc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;BORDER-RIGHT: gray 2px solid;'>"+changeZeroToSpace(parseFloat(doc.act_wk5soc).toFixed(0))+"</td>";
    return result;
}

function generateForecast(doc,isBorder){
    var result = "";
        result = result + "<td style='text-align:right; '>"+changeZeroToSpace(parseFloat(doc.fcast_wk1coc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk1soc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk2coc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk2soc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk3coc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk3soc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk4coc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk4soc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk5coc).toFixed(0))+"</td>";
        if(isBorder){
            result = result + "<td style='text-align:right; !important; BORDER-RIGHT: gray 2px solid;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk5soc).toFixed(0))+"</td>";
        }else{
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk5soc).toFixed(0))+"</td>";
        }
    return result;
}

function getPeriod(record) {
    try {
//    alert("record.value "+record.value);
        var xmlHttpRequest = getXMLHttpRequest();
        xmlHttpRequest.onreadystatechange = getReadyStateHandlerPeriod(xmlHttpRequest, record);
        xmlHttpRequest.open("POST", "/SMTWebApp/RrcStandardSrv?service=ui.smt.SmtSalesForecastApprovalSvc", true);
        xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlHttpRequest.send("pageAction=getPeriod&year="+record.value);
    } catch (err) {
    }
}

function getWeek(record) {
    try {
//    alert("record.value "+record.value);
        var xmlHttpRequest = getXMLHttpRequest();
        xmlHttpRequest.onreadystatechange = getReadyStateHandlerWeek(xmlHttpRequest, record);
        xmlHttpRequest.open("POST", "/SMTWebApp/RrcStandardSrv?service=ui.smt.SmtSalesForecastApprovalSvc", true);
        xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlHttpRequest.send("pageAction=getWeek&period="+record.value);
    } catch (err) {
    }
}

function getReadyStateHandlerPeriod(xmlHttpRequest, record)
{
      return function()
      {
        if (xmlHttpRequest.readyState == 4)
        {
          if (xmlHttpRequest.status == 200)
          {

            if(''!=xmlHttpRequest.responseText)
            {
                var doc = eval('(' + xmlHttpRequest.responseText + ')');
                genPeriodList(doc);
            }
            else
            {

            }
          }
          else
          {
            alert("HTTP error " + xmlHttpRequest.status + ": " + xmlHttpRequest.statusText);
          }
        }
      };
}

function getReadyStateHandlerWeek(xmlHttpRequest, record)
{
      return function()
      {
        if (xmlHttpRequest.readyState == 4)
        {
          if (xmlHttpRequest.status == 200)
          {

            if(''!=xmlHttpRequest.responseText)
            {
                var doc = eval('(' + xmlHttpRequest.responseText + ')');
                genWeekList(doc);
            }
            else
            {

            }
          }
          else
          {
            alert("HTTP error " + xmlHttpRequest.status + ": " + xmlHttpRequest.statusText);
          }
        }
      };
}

function genPeriodList(doc){

    var sel = document.getElementById('cmbPeriod');

    var sel_week = document.getElementById('cmbWeek');
    removeAllOptions(sel_week);
    addOptionToSelect(sel_week, "Select One", "");

    removeAllOptions(sel);
    addOptionToSelect(sel, "Select One", "");
    if(doc.cmb_period != null){
//    alert("doc.cmb_period.length:"+doc.cmb_period.length );
        for (i=0;i<=doc.cmb_period.length-1;i++) {
            addOptionToSelect(sel, doc.cmb_period[i].value, doc.cmb_period[i].code);
        }
    }

}

function genWeekList(doc){

//    alert("cmdWeek ");

    var sel = document.getElementById('cmbWeek');

    removeAllOptions(sel);

//    alert("cmdWeek "+doc.cmd_week.length);
    addOptionToSelect(sel, "Select One", "");
    if(doc.cmd_week != null){
        for (i=0;i<=doc.cmd_week.length-1;i++) {
            addOptionToSelect(sel, doc.cmd_week[i].value, doc.cmd_week[i].code);
        }
    }

}

// removes all option elements in select box
// removeGrp (optional) boolean to remove optgroups
function removeAllOptions(sel) {
    var len, groups, par;

    len = sel.options.length;
    for (var i=len; i; i--) {
        par = sel.options[i-1].parentNode;
        par.removeChild( sel.options[i-1] );
    }
}

function addOptionToSelect(sel, txt, val) {
    var opt = document.createElement('option');
    opt.appendChild( document.createTextNode(txt) );

    if ( typeof val === 'string' ) {
        opt.value = val;

    }
    sel.appendChild(opt);
    return;
}

function changeZeroToSpace(value){
    if((""+value) == "0" || (""+value) == "0.00" || (""+value) == "NaN" || (""+value).toUpperCase() == "INFINITY"){
        return "&nbsp;";
    }else{
        return numberWithCommas(value);
    }
}

function addPercentTovalue(value){
    if((""+value) == "0" || (""+value) == "0.00" || (""+value) == "NaN" || (""+value).toUpperCase() == "INFINITY"){
        return "&nbsp;";
    }else{
        return numberWithCommas(value)+"%";
    }
}

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function showDetail(sales_code,sales_office){
//alert(sales_office);
    document.getElementById("sales_code_value").value   = sales_code;
    document.getElementById("sales_office_value").value   = sales_office;
    document.frm.pageAction.value = "findDetail";
    document.frm.submit();
}

function submitApprove(sales_code,seq){
//alert("sales_code "+sales_code);
//alert("seq "+seq);
    document.getElementById("pageAction").value = "approveStatus"; 
    
    document.getElementById("sales_code_value").value   = sales_code;
    document.getElementById("select_item").value   = seq;
    pausePage1();        
    var postVal = $("#frm").serialize();
    $.ajax({
            type: "POST",
            url: URL,
            beforeSend: isAllow = false,
            data: postVal,
            success: function(data){
                errorArray = data.split('#:#');
                
                if(errorArray[0] == '500'){
                    runPage1();
                     showBarMessage('messagetd', errorArray[1], 1); 
                     isAllow = false;
                }else if(errorArray[0] == '200' ){
                    runPage1();
                    document.getElementById('fcast_status_'+seq).innerHTML = 'Completed&nbsp;';
                    document.getElementById('fcast_status_'+seq).style.color = "#00AA00";
                    document.getElementById('btn_approve_'+seq).disabled  = true;
                }
            }
    });  
    
}

function submitApprove_other(sales_code,seq){
//alert("sales_code "+sales_code);
//alert("seq "+seq);
    document.getElementById("pageAction").value = "approveStatusOther"; 
    
    document.getElementById("sales_code_value").value   = sales_code;
    document.getElementById("select_item").value   = seq;
    pausePage1();         
    var postVal = $("#frm").serialize();
    $.ajax({
            type: "POST",
            url: URL,
            beforeSend: isAllow = false,
            data: postVal,
            success: function(data){
                errorArray = data.split('#:#');
                
                if(errorArray[0] == '500'){
                    runPage1();
                     showBarMessage('messagetd', errorArray[1], 1); 
                     isAllow = false;
                }else if(errorArray[0] == '200' ){
                    runPage1();
                    document.getElementById('fcast_other_status_'+seq).innerHTML = 'Completed&nbsp;';
                    document.getElementById('fcast_other_status_'+seq).style.color = "#00AA00";
                    document.getElementById('btn_other_approve_'+seq).disabled  = true;
                }
            }
    });  
    
}

function submitReject(sales_code,seq){
//alert("sales_code "+sales_code);
//alert("seq "+seq);
    document.getElementById("pageAction").value = "rejectStatus"; 
    
    document.getElementById("sales_code_value").value   = sales_code;
    document.getElementById("select_item").value   = seq;
    pausePage1();        
    var postVal = $("#frm").serialize();
    $.ajax({
            type: "POST",
            url: URL,
            beforeSend: isAllow = false,
            data: postVal,
            success: function(data){
                errorArray = data.split('#:#');
                
                if(errorArray[0] == '500'){
                    runPage1();
                     showBarMessage('messagetd', errorArray[1], 1); 
                     isAllow = false;
                }else if(errorArray[0] == '200' ){
                    runPage1();
                    document.getElementById('fcast_status_'+seq).innerHTML = 'Rejected&nbsp;';
                    document.getElementById('fcast_status_'+seq).style.color = "#974706";
                    
                    document.getElementById('btn_reject_'+seq).disabled  = true;
                    document.getElementById('btn_approve_'+seq).disabled  = true;
                }
            }
    });  
    
}

function submitReject_other(sales_code,seq){
//alert("sales_code "+sales_code);
//alert("seq "+seq);
    document.getElementById("pageAction").value = "rejectStatusOther"; 
    
    document.getElementById("sales_code_value").value   = sales_code;
    document.getElementById("select_item").value   = seq;
    
//    document.getElementById('btn_other_reject_'+seq).disabled  = true;
//    document.getElementById('btn_other_approve_'+seq).disabled  = true;
    pausePage1();         
    var postVal = $("#frm").serialize();
    $.ajax({
            type: "POST",
            url: URL,
            beforeSend: isAllow = false,
            data: postVal,
            success: function(data){
                errorArray = data.split('#:#');
                
                if(errorArray[0] == '500'){
                    runPage1();
                     showBarMessage('messagetd', errorArray[1], 1); 
                     isAllow = false;
//                     document.getElementById('btn_other_reject_'+seq).disabled  = true;
//                     document.getElementById('btn_other_approve_'+seq).disabled  = true;
                }else if(errorArray[0] == '200' ){
                    runPage1();
                    document.getElementById('fcast_other_status_'+seq).innerHTML = 'Rejected&nbsp;';
                    document.getElementById('fcast_other_status_'+seq).style.color = "#974706";
                    
                    document.getElementById('btn_other_reject_'+seq).disabled  = true;
                    document.getElementById('btn_other_approve_'+seq).disabled  = true;
                }
            }
    });  
    
}

function submitToHq(){
//alert("sales_code "+sales_code);
//alert("seq "+seq);
//    document.getElementById("pageAction").value = "checkBeforeSubmit"; 
//    
//    var postVal = $("#frm").serialize();
//    $.ajax({
//            type: "POST",
//            url: URL,
//            beforeSend: isAllow = false,
//            data: postVal,
//            success: function(data){
//                errorArray = data.split('#:#');
//                
//                if(errorArray[0] == '500'){
//                     showBarMessage('messagetd', errorArray[1], 1); 
//                     isAllow = false;
//                }else if(errorArray[0] == '200' ){
                    pausePage1(); 
                    submitToVerified(document.frm);
//                }
//            }
//    });  
    
}

function minusWeek(week,minusValue,maxWeek){
    if(week - minusValue < 1){
        return (maxWeek + (week - minusValue));
    }else{
        return week - minusValue;
    }
}

function plusWeek(week,plusValue,maxWeek){
    if(week + plusValue > maxWeek){
        return ((week + plusValue) - maxWeek);
    }else{
        return week + plusValue;
    }
}
