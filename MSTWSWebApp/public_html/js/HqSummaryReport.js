/*-----------------------------------------------------------------------------------------------------------
HqSummaryReport.js
-------------------------------------------------------------------------------------------------------------
Copyright RCL Public Co., Ltd. 2007
-------------------------------------------------------------------------------------------------------------
Author  25/01/2016
- Change Log ------------------------------------------------------------------------------------------------
##  DD/MM/YY       -User-     -TaskRef-      -Short Description
01  25/01/16    PONAPR1                     add space on sub location
02  29/01/16    PONAPR1                     Add hyperlink in location column
03  28/04/16    PONAPR1                     use p2 to get no matter is zero
-----------------------------------------------------------------------------------------------------------*/
function getPeriod(record) {
    try {
//    alert("record.value "+record.value);
        var xmlHttpRequest = getXMLHttpRequest();
        xmlHttpRequest.onreadystatechange = getReadyStateHandlerPeriod(xmlHttpRequest, record);
        xmlHttpRequest.open("POST", "/SMTWebApp/RrcStandardSrv?service=ui.smt.SmtHQSummaryReportSvc", true);
        xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlHttpRequest.send("pageAction=getPeriod&year="+record.value);
    } catch (err) {
    }
}


function getHqSummaryReport(p_region,p_year,p_period,p_week,p_chkAct5Wk,p_chkFcast5Wk) {
    try {
//    alert("p_region "+p_region);
//    alert("p_year "+p_year);
//    alert("p_period "+p_period);
//    alert("p_week "+p_week);
        var xmlHttpRequest = getXMLHttpRequest();
        xmlHttpRequest.onreadystatechange = getReadyStateHandler(xmlHttpRequest, "getHqSummary");
        xmlHttpRequest.open("POST", "/SMTWebApp/RrcStandardSrv?service=ui.smt.SmtHQSummaryReportSvc", true);
        xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlHttpRequest.send("pageAction=getHqSummaryReport&p_region="+encodeURIComponent(p_region)+"&p_year="+p_year+"&p_period="+p_period+"&p_week="+p_week+"&p_chkAct5Wk="+p_chkAct5Wk+"&p_chkFcast5Wk="+p_chkFcast5Wk);
    } catch (err) {
    alert("err "+err);
    }
}


//function genExcelHqSummaryReport(p_region,p_year,p_period,p_week) {
//    try {
////    alert("p_region "+p_region);
////    alert("p_year "+p_year);
////    alert("p_period "+p_period);
////    alert("p_week "+p_week);
//        var xmlHttpRequest = getXMLHttpRequest();
//        xmlHttpRequest.onreadystatechange = getReadyStateHandler(xmlHttpRequest, "getHqSummary");
//        xmlHttpRequest.open("POST", "/SMTWebApp/RrcStandardSrv?service=ui.smt.SmtHQSummaryReportSvc", true);
//        xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//        xmlHttpRequest.send("pageAction=genExcelHqSummaryReport&p_region="+p_region+"&p_year="+p_year+"&p_period="+p_period+"&p_week="+p_week);
//    } catch (err) {
//    alert("err "+err);
//    }
//}


function getWeek(record) {
    try {
//    alert("record.value "+record.value);
        var xmlHttpRequest = getXMLHttpRequest();
        xmlHttpRequest.onreadystatechange = getReadyStateHandlerWeek(xmlHttpRequest, record);
        xmlHttpRequest.open("POST", "/SMTWebApp/RrcStandardSrv?service=ui.smt.SmtHQSummaryReportSvc", true);
        xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlHttpRequest.send("pageAction=getWeek&period="+record.value);
    } catch (err) {
    }
}

function getReadyStateHandler(xmlHttpRequest, portion) {

    return function() {
//    alert("portion "+portion);
        if (portion == "getHqSummary") {

            document.getElementById("display_hq_summary").innerHTML = "Loading ...";
//            document.getElementById("display_tos_header").innerHTML = "<img src=/TOSWebApp/images/loading.gif height=45 style=position: absolute; left: 100px; top: 50px;>";
//            document.getElementById("display_tos_operation").innerHTML = "";
//            document.getElementById("display_tos_activities").innerHTML = "";
//            alert(xmlHttpRequest.status);
            if (xmlHttpRequest.readyState == 4) {
              if (xmlHttpRequest.status == 200) {

                var doc = eval('(' + xmlHttpRequest.responseText + ')');
//                alert(""+generateHTML_HQ_Summary(doc));
                document.getElementById("display_hq_summary").innerHTML = generateHTML_HQ_Summary(doc); //xmlHttpRequest.responseText;

              } else {
                alert("HTTP error " + xmlHttpRequest.status + ": " + xmlHttpRequest.statusText);
              }
            }
        }
    };
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

function generateHTML_HQ_Summary(doc){


    var result = "";
    var i;

    var group_region = "";
    var loc_office = "";
    var pol_pod = "";
    var sum_p1_coc = 0;
    var sum_p1_soc = 0;
    var sum_p2_coc = 0;
    var sum_p2_soc = 0;
    var sum_wk1_coc = 0;
    var sum_wk1_soc = 0;
    var sum_wk2_coc = 0;
    var sum_wk2_soc = 0;
    var sum_wk3_coc = 0;
    var sum_wk3_soc = 0;
    var sum_wk4_coc = 0;
    var sum_wk4_soc = 0;
    var sum_wk5_coc = 0;
    var sum_wk5_soc = 0;

    var sum_pwk5_coc = 0;
    var sum_pwk5_soc = 0;
    var sum_pwk5_overall = 0;
    
    var sum_fcast_wk1_coc = 0;
    var sum_fcast_wk1_soc = 0;
    var sum_fcast_wk2_coc = 0;
    var sum_fcast_wk2_soc = 0;
    var sum_fcast_wk3_coc = 0;
    var sum_fcast_wk3_soc = 0;
    var sum_fcast_wk4_coc = 0;
    var sum_fcast_wk4_soc = 0;
    var sum_fcast_wk5_coc = 0;
    var sum_fcast_wk5_soc = 0;

    var grand_sum_p1_coc = 0;
    var grand_sum_p1_soc = 0;
    var grand_sum_p2_coc = 0;
    var grand_sum_p2_soc = 0;
    var grand_sum_wk1_coc = 0;
    var grand_sum_wk1_soc = 0;
    var grand_sum_wk2_coc = 0;
    var grand_sum_wk2_soc = 0;
    var grand_sum_wk3_coc = 0;
    var grand_sum_wk3_soc = 0;
    var grand_sum_wk4_coc = 0;
    var grand_sum_wk4_soc = 0;
    var grand_sum_wk5_coc = 0;
    var grand_sum_wk5_soc = 0;

    var grand_sum_pwk5_coc = 0;
    var grand_sum_pwk5_soc = 0;
    var grand_sum_pwk5_overall = 0;
    
    var grand_sum_fcast_wk1_coc = 0;
    var grand_sum_fcast_wk1_soc = 0;
    var grand_sum_fcast_wk2_coc = 0;
    var grand_sum_fcast_wk2_soc = 0;
    var grand_sum_fcast_wk3_coc = 0;
    var grand_sum_fcast_wk3_soc = 0;
    var grand_sum_fcast_wk4_coc = 0;
    var grand_sum_fcast_wk4_soc = 0;
    var grand_sum_fcast_wk5_coc = 0;
    var grand_sum_fcast_wk5_soc = 0;

    var display_flag;
    var header_detail;

    var index_detail = 0;

    var p2_coc = 0;
    var p2_soc = 0;
    var wk5_coc = 0;
    var wk5_soc = 0;


    var sum_region_p1_coc = 0;
    var sum_region_p1_soc = 0;
    var sum_region_p2_coc = 0;
    var sum_region_p2_soc = 0;
    var sum_region_wk1_coc = 0;
    var sum_region_wk1_soc = 0;
    var sum_region_wk2_coc = 0;
    var sum_region_wk2_soc = 0;
    var sum_region_wk3_coc = 0;
    var sum_region_wk3_soc = 0;
    var sum_region_wk4_coc = 0;
    var sum_region_wk4_soc = 0;
    var sum_region_wk5_coc = 0;
    var sum_region_wk5_soc = 0;
    var region_count_detail = 0;
    
    var sum_region_fcast_wk1_coc = 0;
    var sum_region_fcast_wk1_soc = 0;
    var sum_region_fcast_wk2_coc = 0;
    var sum_region_fcast_wk2_soc = 0;
    var sum_region_fcast_wk3_coc = 0;
    var sum_region_fcast_wk3_soc = 0;
    var sum_region_fcast_wk4_coc = 0;
    var sum_region_fcast_wk4_soc = 0;
    var sum_region_fcast_wk5_coc = 0;
    var sum_region_fcast_wk5_soc = 0;

    var param_year = parseInt(doc.p_year);
    var param_period = parseInt(doc.p_period);
    var param_week = parseInt(doc.p_week);
    
    var check_act5wk = "N";
    var check_fcast5wk = "N";
    
    var textColor = "#000000";

    var maxWeek = parseInt(doc.p_max_week);
    
    var verify_status = "";

    try{
    
    check_act5wk = doc.check_act5wk;
    check_fcast5wk = doc.check_fcast5wk;
    
    

    result = result + "<form method=post name=frm_hq_summary STYLE=margin: 0px; padding: 0px;>";

    result = result + "<table border=0 width=100% valign=top cellpadding=0 cellspacing=1>";
    result = result + "<tr><td width=100% class=TableLeftText>HQ Summary Report</td></tr>";
    result = result + "</table>";

    result = result + "<table border=0 width=100% cellpadding=0 cellspacing=1>";
    result = result + "<tr >";
    result = result + "<td >";
    result = result + "<table border=0 width=100% cellpadding=0 cellspacing=1>";
    result = result + "<tr >";
    result = result + "<td >";
    result = result + "<div style=overflow:auto;height:385px;width: 99.9%;>"; //width:325px;
//    result = result + "<table border=0 width=100% valign=top cellpadding=0 cellspacing=1>";
    result = result + "<table border=0 width=100% cellpadding=0 cellspacing=1 id=tableHeader style='BORDER: gray 2px solid;'>";
    result = result + "<tr class=FreezedHeader>";
    result = result + "<td class=TableLeftSub colspan=2>&nbsp;</td>";
    result = result + "<td class=TableLeftSub colspan=4 style='TEXT-ALIGN: center; BORDER-LEFT: gray 2px solid; BACKGROUND-COLOR: #1f487c; COLOR: white;'>Target\'" + param_year + "</td>"; //add param year for get year from ddl not hardcode #PONAPR1
    
    if(check_act5wk == "Y"){
        result = result + "<td class=TableLeftSub colspan=10 style='TEXT-ALIGN: center; BORDER-LEFT: gray 2px solid'>Actual</td>";
    }
    
    result = result + "<td class=TableLeftSub colspan=3 style='TEXT-ALIGN: center; BORDER-LEFT: gray 2px solid'>Performance (%)</td>";
    
    if(check_fcast5wk == "Y"){
        result = result + "<td class=TableLeftSub colspan=10 style='TEXT-ALIGN: center; BORDER-LEFT: gray 2px solid;BACKGROUND-COLOR:#ffff81;'>Fcast</td>";
    }
    
    result = result + "</tr>";
    result = result + "<tr class=FreezedHeader>";
    result = result + "<td class=TableLeftSub colspan=2>&nbsp;</td>";
    
    //#03
    if((param_period-1) <= 0) {
        result = result + "<td class=TableLeftSub colspan=2 style='TEXT-ALIGN: center; BORDER-LEFT: gray 2px solid; BACKGROUND-COLOR: #1f487c; COLOR: white;'>P12</td>";
    }else{
        result = result + "<td class=TableLeftSub colspan=2 style='TEXT-ALIGN: center; BORDER-LEFT: gray 2px solid; BACKGROUND-COLOR: #1f487c; COLOR: white;'>P"+(param_period-1)+"</td>";
    }

    result = result + "<td class=TableLeftSub colspan=2 style='text-align:center; BACKGROUND-COLOR: #1f487c; COLOR: white;'>P"+(param_period)+"</td>";

//    if((param_week-4) <= 0) {
//        if((param_week-4) == 0) {
//            result = result + "<td class=TableLeftSub colspan=2 style='TEXT-ALIGN: center; BORDER-LEFT: gray 2px solid'>Wk"+(maxWeek)+"</td>";
//        }else if((param_week-4) == -1){
//            result = result + "<td class=TableLeftSub colspan=2 style='TEXT-ALIGN: center; BORDER-LEFT: gray 2px solid'>Wk"+(maxWeek-1)+"</td>";
//        }else if((param_week-4) == -2){
//            result = result + "<td class=TableLeftSub colspan=2 style='TEXT-ALIGN: center; BORDER-LEFT: gray 2px solid'>Wk"+(maxWeek-2)+"</td>";
//        }else{
//            result = result + "<td class=TableLeftSub colspan=2 style='TEXT-ALIGN: center; BORDER-LEFT: gray 2px solid'>Wk"+(maxWeek-3)+"</td>";
//        }
//    }else{
//        result = result + "<td class=TableLeftSub colspan=2 style='TEXT-ALIGN: center; BORDER-LEFT: gray 2px solid'>Wk"+(param_week-4)+"</td>";
//    }
//
//    if((param_week-3) <= 0) {
//        if((param_week-3) == 0) {
//            result = result + "<td class=TableLeftSub colspan=2 style=text-align:center>Wk"+(maxWeek)+"</td>";
//        }else if((param_week-3) == -1){
//            result = result + "<td class=TableLeftSub colspan=2 style=text-align:center>Wk"+(maxWeek-1)+"</td>";
//        }else if((param_week-3) == -2){
//            result = result + "<td class=TableLeftSub colspan=2 style=text-align:center>Wk"+(maxWeek-2)+"</td>";
//        }else{
//            result = result + "<td class=TableLeftSub colspan=2 style=text-align:center>Wk"+(maxWeek-3)+"</td>";
//        }
//    }else{
//        result = result + "<td class=TableLeftSub colspan=2 style=text-align:center>Wk"+(param_week-3)+"</td>";
//    }
//
//    if((param_week-2) <= 0) {
//        if((param_week-2) == 0) {
//            result = result + "<td class=TableLeftSub colspan=2 style=text-align:center>Wk"+(maxWeek)+"</td>";
//        }else if((param_week-2) == -1){
//            result = result + "<td class=TableLeftSub colspan=2 style=text-align:center>Wk"+(maxWeek-1)+"</td>";
//        }else if((param_week-2) == -2){
//            result = result + "<td class=TableLeftSub colspan=2 style=text-align:center>Wk"+(maxWeek-2)+"</td>";
//        }else{
//            result = result + "<td class=TableLeftSub colspan=2 style=text-align:center>Wk"+(maxWeek-3)+"</td>";
//        }
//    }else{
//        result = result + "<td class=TableLeftSub colspan=2 style=text-align:center>Wk"+(param_week-2)+"</td>";
//    }
//
//    if((param_week-1) <= 0) {
//        result = result + "<td class=TableLeftSub colspan=2 style=text-align:center>Wk"+(maxWeek)+"</td>";
//    }else{
//        result = result + "<td class=TableLeftSub colspan=2 style=text-align:center>Wk"+(param_week-1)+"</td>";
//    }

    if(check_act5wk == "Y"){
        result = result + "<td class=TableLeftSub width=8% colspan=2 style='BORDER-LEFT: gray 2px solid;text-align:center;'>Wk "+minusWeek(param_week,4,maxWeek)+"</td>";
        result = result + "<td class=TableLeftSub width=8% colspan=2 style='text-align:center'>Wk "+minusWeek(param_week,3,maxWeek)+"</td>";
        result = result + "<td class=TableLeftSub width=8% colspan=2 style='text-align:center'>Wk "+minusWeek(param_week,2,maxWeek)+"</td>";
        result = result + "<td class=TableLeftSub width=8% colspan=2 style='text-align:center'>Wk "+minusWeek(param_week,1,maxWeek)+"</td>";
        result = result + "<td class=TableLeftSub width=8% colspan=2 style='text-align:center'>Wk "+minusWeek(param_week,0,maxWeek)+"</td>";
    }




//    result = result + "<td class=TableLeftSub colspan=2 style=text-align:center>Wk"+(param_week-3)+"</td>";
//    result = result + "<td class=TableLeftSub colspan=2 style=text-align:center>Wk"+(param_week-2)+"</td>";
//    result = result + "<td class=TableLeftSub colspan=2 style=text-align:center>Wk"+(param_week-1)+"</td>";

//    result = result + "<td class=TableLeftSub colspan=2 style=text-align:center>Wk"+(param_week)+"</td>";
    result = result + "<td class=TableLeftSub colspan=3 style='TEXT-ALIGN: center; BORDER-LEFT: gray 2px solid'>Wk"+(param_week)+"</td>";
    
    if(check_fcast5wk == "Y"){
        result = result + "<td class=TableLeftSub width=8% colspan=2 style='BORDER-LEFT: gray 2px solid;text-align:center; BACKGROUND-COLOR:#ffff81;'>Wk "+plusWeek(param_week,1,maxWeek)+"</td>";
        result = result + "<td class=TableLeftSub width=8% colspan=2 style='text-align:center;BACKGROUND-COLOR:#ffff81;'>Wk "+plusWeek(param_week,2,maxWeek)+"</td>";
        result = result + "<td class=TableLeftSub width=8% colspan=2 style='text-align:center;BACKGROUND-COLOR:#ffff81;'>Wk "+plusWeek(param_week,3,maxWeek)+"</td>";
        result = result + "<td class=TableLeftSub width=8% colspan=2 style='text-align:center;BACKGROUND-COLOR:#ffff81;'>Wk "+plusWeek(param_week,4,maxWeek)+"</td>";
        result = result + "<td class=TableLeftSub width=8% colspan=2 style='text-align:center;BACKGROUND-COLOR:#ffff81;'>Wk "+plusWeek(param_week,5,maxWeek)+"</td>";
    }
    
    result = result + "</tr>";
    result = result + "<tr class=FreezedHeader>";
    result = result + "<td width=7% class=TableLeftSub style=text-align:center;>Loc office</td>";
    result = result + "<td width=7% class=TableLeftSub style=text-align:center>POR / POL</td>";
    result = result + "<td width=5% class=TableLeftSub style='TEXT-ALIGN: center; BORDER-LEFT: gray 2px solid; BACKGROUND-COLOR: #1f487c; COLOR: white;'>COC</td>";
    result = result + "<td width=5% class=TableLeftSub style='text-align:center; BACKGROUND-COLOR: #1f487c; COLOR: white;'>SOC</td>";
    result = result + "<td width=5% class=TableLeftSub style='text-align:center; BACKGROUND-COLOR: #1f487c; COLOR: white;'>COC</td>";
    result = result + "<td width=5% class=TableLeftSub style='text-align:center; BACKGROUND-COLOR: #1f487c; COLOR: white;'>SOC</td>";
    
    if(check_act5wk == "Y"){
        result = result + "<td width=5% class=TableLeftSub style='TEXT-ALIGN: center; BORDER-LEFT: gray 2px solid'>COC</td>";
        result = result + "<td width=5% class=TableLeftSub style=text-align:center>SOC</td>";
        result = result + "<td width=5% class=TableLeftSub style=text-align:center>COC</td>";
        result = result + "<td width=5% class=TableLeftSub style=text-align:center>SOC</td>";
        result = result + "<td width=5% class=TableLeftSub style=text-align:center>COC</td>";
        result = result + "<td width=5% class=TableLeftSub style=text-align:center>SOC</td>";
        result = result + "<td width=5% class=TableLeftSub style=text-align:center>COC</td>";
        result = result + "<td width=5% class=TableLeftSub style=text-align:center>SOC</td>";
        result = result + "<td width=5% class=TableLeftSub style=text-align:center>COC</td>";
        result = result + "<td width=5% class=TableLeftSub style=text-align:center>SOC</td>";
    }
    
    result = result + "<td width=5% class=TableLeftSub style='TEXT-ALIGN: center; BORDER-LEFT: gray 2px solid'>COC</td>";
    result = result + "<td width=5% class=TableLeftSub style=text-align:center>SOC</td>";
    result = result + "<td width=6% class=TableLeftSub style=text-align:center>Overall</td>";
    
    if(check_fcast5wk == "Y"){
        result = result + "<td width=5% class=TableLeftSub style='TEXT-ALIGN: center; BORDER-LEFT: gray 2px solid;BACKGROUND-COLOR:#ffff81;'>&nbsp;COC&nbsp;</td>";
        result = result + "<td width=5% class=TableLeftSub style='text-align:center;BACKGROUND-COLOR:#ffff81;'>&nbsp;SOC&nbsp;</td>";
        result = result + "<td width=5% class=TableLeftSub style='text-align:center;BACKGROUND-COLOR:#ffff81;'>&nbsp;COC&nbsp;</td>";
        result = result + "<td width=5% class=TableLeftSub style='text-align:center;BACKGROUND-COLOR:#ffff81;'>&nbsp;SOC&nbsp;</td>";
        result = result + "<td width=5% class=TableLeftSub style='text-align:center;BACKGROUND-COLOR:#ffff81;'>&nbsp;COC&nbsp;</td>";
        result = result + "<td width=5% class=TableLeftSub style='text-align:center;BACKGROUND-COLOR:#ffff81;'>&nbsp;SOC&nbsp;</td>";
        result = result + "<td width=5% class=TableLeftSub style='text-align:center;BACKGROUND-COLOR:#ffff81;'>&nbsp;COC&nbsp;</td>";
        result = result + "<td width=5% class=TableLeftSub style='text-align:center;BACKGROUND-COLOR:#ffff81;'>&nbsp;SOC&nbsp;</td>";
        result = result + "<td width=5% class=TableLeftSub style='text-align:center;BACKGROUND-COLOR:#ffff81;'>&nbsp;COC&nbsp;</td>";
        result = result + "<td width=5% class=TableLeftSub style='text-align:center;BACKGROUND-COLOR:#ffff81;'>&nbsp;SOC&nbsp;</td>";
    }
    result = result + "</tr>";
//    result = result + "</table>";

    if(doc.hq_summary.length > 1){
         group_region = doc.hq_summary[0].group_region;
         loc_office = doc.hq_summary[0].loc_office;
         pol_pod = doc.hq_summary[0].pol_pod;

         sum_p1_coc = 0;
         sum_p1_soc = 0;
         sum_p2_coc = 0;
         sum_p2_soc = 0;
         sum_wk1_coc = 0;
         sum_wk1_soc = 0;
         sum_wk2_coc = 0;
         sum_wk2_soc = 0;
         sum_wk3_coc = 0;
         sum_wk3_soc = 0;
         sum_wk4_coc = 0;
         sum_wk4_soc = 0;
         sum_wk5_coc = 0;
         sum_wk5_soc = 0;
         
         sum_fcast_wk1_coc = 0;
         sum_fcast_wk1_soc = 0;
         sum_fcast_wk2_coc = 0;
         sum_fcast_wk2_soc = 0;
         sum_fcast_wk3_coc = 0;
         sum_fcast_wk3_soc = 0;
         sum_fcast_wk4_coc = 0;
         sum_fcast_wk4_soc = 0;
         sum_fcast_wk5_coc = 0;
         sum_fcast_wk5_soc = 0;

         grand_sum_p1_coc = 0;
         grand_sum_p1_soc = 0;
         grand_sum_p2_coc = 0;
         grand_sum_p2_soc = 0;
         grand_sum_wk1_coc = 0;
         grand_sum_wk1_soc = 0;
         grand_sum_wk2_coc = 0;
         grand_sum_wk2_soc = 0;
         grand_sum_wk3_coc = 0;
         grand_sum_wk3_soc = 0;
         grand_sum_wk4_coc = 0;
         grand_sum_wk4_soc = 0;
         grand_sum_wk5_coc = 0;
         grand_sum_wk5_soc = 0;
         
         grand_sum_fcast_wk1_coc = 0;
         grand_sum_fcast_wk1_soc = 0;
         grand_sum_fcast_wk2_coc = 0;
         grand_sum_fcast_wk2_soc = 0;
         grand_sum_fcast_wk3_coc = 0;
         grand_sum_fcast_wk3_soc = 0;
         grand_sum_fcast_wk4_coc = 0;
         grand_sum_fcast_wk4_soc = 0;
         grand_sum_fcast_wk5_coc = 0;
         grand_sum_fcast_wk5_soc = 0;


//         display_flag = doc.hq_summary[0].display_flag;
         header_detail = doc.hq_summary[0].header_detail;
    }

//    result = result + "<div style=height:350px;overflow:auto;width: 99.9%;>"; //width:325px;
//    result = result + "<table border=0 width=100% valign=top cellpadding=0 cellspacing=1>";
//    result = result + "<table border=0 width=100% cellpadding=0 cellspacing=1 id=tableDetail>";

    result = result + "<tr class=TableLeftWhite >";
    result = result + "<td  colspan=2 align=center BGCOLOR=#fce4d6 >"+group_region+"</td>";
    result = result + "<td style='BORDER-LEFT: gray 2px solid'>&nbsp;</td>";
    result = result + "<td >&nbsp;</td>";
    result = result + "<td >&nbsp;</td>";
    result = result + "<td >&nbsp;</td>";
    
    if(check_act5wk == "Y"){
        result = result + "<td style='BORDER-LEFT: gray 2px solid'>&nbsp;</td>";
        result = result + "<td >&nbsp;</td>";
        result = result + "<td >&nbsp;</td>";
        result = result + "<td >&nbsp;</td>";
        result = result + "<td >&nbsp;</td>";
        result = result + "<td >&nbsp;</td>";
        result = result + "<td >&nbsp;</td>";
        result = result + "<td >&nbsp;</td>";
        result = result + "<td >&nbsp;</td>";
        result = result + "<td >&nbsp;</td>";
    }
    
    result = result + "<td style='BORDER-LEFT: gray 2px solid'>&nbsp;</td>";
    result = result + "<td >&nbsp;</td>";
    result = result + "<td >&nbsp;</td>";
    
    if(check_fcast5wk == "Y"){
        result = result + "<td style='BORDER-LEFT: gray 2px solid'>&nbsp;</td>";
        result = result + "<td >&nbsp;</td>";
        result = result + "<td >&nbsp;</td>";
        result = result + "<td >&nbsp;</td>";
        result = result + "<td >&nbsp;</td>";
        result = result + "<td >&nbsp;</td>";
        result = result + "<td >&nbsp;</td>";
        result = result + "<td >&nbsp;</td>";
        result = result + "<td >&nbsp;</td>";
        result = result + "<td >&nbsp;</td>";
    }
    
    result = result + "</tr>";
    //<input type=hidden name="+doc.hq_summary[0].loc_office+" value=0>
    
    var loc_color = "#000000";
    
    varify_status = doc.hq_summary[0].fcast_status;
    
    if(varify_status == "F"){
        loc_color = "#0033cc";
    }else{
        loc_color = "#e46c0a";
    }
    
    result = result + "<tr class=TableRightWhite >";

    if(doc.hq_summary[0].count_detail != "0"){
        for(i = 0 ; i < parseInt(doc.hq_summary[0].count_detail)+1 ; i++){
            sum_region_p1_coc = sum_region_p1_coc + parseFloat(doc.hq_summary[i].p1_coc);
            sum_region_p1_soc = sum_region_p1_soc + parseFloat(doc.hq_summary[i].p1_soc);
            sum_region_p2_coc = sum_region_p2_coc + parseFloat(doc.hq_summary[i].p2_coc);
            sum_region_p2_soc = sum_region_p2_soc + parseFloat(doc.hq_summary[i].p2_soc);
            sum_region_wk1_coc = sum_region_wk1_coc + parseFloat(doc.hq_summary[i].wk1_coc);
            sum_region_wk1_soc = sum_region_wk1_soc + parseFloat(doc.hq_summary[i].wk1_soc);
            sum_region_wk2_coc = sum_region_wk2_coc + parseFloat(doc.hq_summary[i].wk2_coc);
            sum_region_wk2_soc = sum_region_wk2_soc + parseFloat(doc.hq_summary[i].wk2_soc);
            sum_region_wk3_coc = sum_region_wk3_coc + parseFloat(doc.hq_summary[i].wk3_coc);
            sum_region_wk3_soc = sum_region_wk3_soc + parseFloat(doc.hq_summary[i].wk3_soc);
            sum_region_wk4_coc = sum_region_wk4_coc + parseFloat(doc.hq_summary[i].wk4_coc);
            sum_region_wk4_soc = sum_region_wk4_soc + parseFloat(doc.hq_summary[i].wk4_soc);
            sum_region_wk5_coc = sum_region_wk5_coc + parseFloat(doc.hq_summary[i].wk5_coc);
            sum_region_wk5_soc = sum_region_wk5_soc + parseFloat(doc.hq_summary[i].wk5_soc);
            
            sum_region_fcast_wk1_coc = sum_region_fcast_wk1_coc + parseFloat(doc.hq_summary[i].fcast_wk1_coc);
            sum_region_fcast_wk1_soc = sum_region_fcast_wk1_soc + parseFloat(doc.hq_summary[i].fcast_wk1_soc);
            sum_region_fcast_wk2_coc = sum_region_fcast_wk2_coc + parseFloat(doc.hq_summary[i].fcast_wk2_coc);
            sum_region_fcast_wk2_soc = sum_region_fcast_wk2_soc + parseFloat(doc.hq_summary[i].fcast_wk2_soc);
            sum_region_fcast_wk3_coc = sum_region_fcast_wk3_coc + parseFloat(doc.hq_summary[i].fcast_wk3_coc);
            sum_region_fcast_wk3_soc = sum_region_fcast_wk3_soc + parseFloat(doc.hq_summary[i].fcast_wk3_soc);
            sum_region_fcast_wk4_coc = sum_region_fcast_wk4_coc + parseFloat(doc.hq_summary[i].fcast_wk4_coc);
            sum_region_fcast_wk4_soc = sum_region_fcast_wk4_soc + parseFloat(doc.hq_summary[i].fcast_wk4_soc);
            sum_region_fcast_wk5_coc = sum_region_fcast_wk5_coc + parseFloat(doc.hq_summary[i].fcast_wk5_coc);
            sum_region_fcast_wk5_soc = sum_region_fcast_wk5_soc + parseFloat(doc.hq_summary[i].fcast_wk5_soc);
        }
    }

    if(doc.hq_summary[0].count_detail != "0"){
        region_count_detail = parseInt(doc.hq_summary[0].count_detail)+1;
        result = result + "<td width=7% style=text-align:left>";
//        result = result + "<img src=\"/SMTWebApp/images/btnArrowDown.gif\" id=img0 onclick=\"showHideRow(\'"+doc.hq_summary[0].loc_office+"\',\'"+region_count_detail+"\',\'0\');\"/>";
        result = result + "<input type=button value=' + ' id=img0 onclick=\"showHideRow(\'"+doc.hq_summary[0].loc_office+"\',\'"+region_count_detail+"\',\'0\');\"/>";
        //Start #02
//        result = result + "&nbsp;&nbsp;&nbsp;" + doc.hq_summary[0].loc_office+"</td>";
        result = result + "&nbsp;<a href='/SMTWebApp/RrcStandardSrv?service=ui.smt.SmtLocSummaryReportSvc&pageAction=fromS5&p_location="+doc.hq_summary[0].loc_office+"&p_year=20" + doc.p_year + "&p_period=" + doc.p_period + "&p_week=" + doc.p_week + "&p_viewby=POL' style='color:"+loc_color+";'>"+doc.hq_summary[0].loc_office+"</a></td>";
        //End #02

        result = result + "<td width=6% >&nbsp;</td>";
        result = result + "<td width=5% style='BORDER-LEFT: gray 2px solid'>"+changeZeroToSpace(sum_region_p1_coc.toFixed(0))+"</td>";
        result = result + "<td width=5%>"+changeZeroToSpace(sum_region_p1_soc.toFixed(0))+"</td>";
        result = result + "<td width=5%>"+changeZeroToSpace(sum_region_p2_coc.toFixed(0))+"</td>";
        result = result + "<td width=5%>"+changeZeroToSpace(sum_region_p2_soc.toFixed(0))+"</td>";
        
        if(check_act5wk == "Y"){
            result = result + "<td width=5% style='BORDER-LEFT: gray 2px solid'>"+changeZeroToSpace(sum_region_wk1_coc.toFixed(0))+"</td>";
            result = result + "<td width=5%>"+changeZeroToSpace(sum_region_wk1_soc.toFixed(0))+"</td>";
            result = result + "<td width=5%>"+changeZeroToSpace(sum_region_wk2_coc.toFixed(0))+"</td>";
            result = result + "<td width=5%>"+changeZeroToSpace(sum_region_wk2_soc.toFixed(0))+"</td>";
            result = result + "<td width=5%>"+changeZeroToSpace(sum_region_wk3_coc.toFixed(0))+"</td>";
            result = result + "<td width=5%>"+changeZeroToSpace(sum_region_wk3_soc.toFixed(0))+"</td>";
            result = result + "<td width=5%>"+changeZeroToSpace(sum_region_wk4_coc.toFixed(0))+"</td>";
            result = result + "<td width=5%>"+changeZeroToSpace(sum_region_wk4_soc.toFixed(0))+"</td>";
            result = result + "<td width=5%>"+changeZeroToSpace(sum_region_wk5_coc.toFixed(0))+"</td>";
            result = result + "<td width=5%>"+changeZeroToSpace(sum_region_wk5_soc.toFixed(0))+"</td>";
        }

//comment for #03
//        if(sum_region_p2_coc == "0" && sum_region_p2_soc == "0"){
//            p2_coc = parseFloat(sum_region_p1_coc);
//            p2_soc = parseFloat(sum_region_p1_soc);
//        }else{
//            p2_coc = parseFloat(sum_region_p2_coc);
//            p2_soc = parseFloat(sum_region_p2_soc);
//        }
        //#03
        p2_coc = parseFloat(sum_region_p2_coc);
        p2_soc = parseFloat(sum_region_p2_soc);
            
        wk5_coc = parseFloat(sum_region_wk5_coc);
        wk5_soc = parseFloat(sum_region_wk5_soc);

        if(wk5_coc != 0 && p2_coc != 0){
            result = result + "<td width=5% style='BORDER-LEFT: gray 2px solid'>"+((wk5_coc/p2_coc)*100).toFixed(0)+"%"+"</td>";
        }else{
            result = result + "<td width=5% style='BORDER-LEFT: gray 2px solid'>&nbsp;</td>";
        }
        if(wk5_soc != 0 && p2_soc != 0){
            result = result + "<td width=5%>"+((wk5_soc/p2_soc)*100).toFixed(0)+"%"+"</td>";
        }else{
            result = result + "<td width=5%>&nbsp;</td>";
        }
        result = result + "<td width=6%>"+addPercentTovalue((((wk5_coc+wk5_soc)/(p2_coc+p2_soc))*100).toFixed(0))+"</td>";
        
        if(check_fcast5wk == "Y"){
            result = result + "<td width=5% style='BORDER-LEFT: gray 2px solid;color:"+loc_color+";'>"+changeZeroToSpace(sum_region_fcast_wk1_coc.toFixed(0))+"</td>";
            result = result + "<td width=5% style='color:"+loc_color+";'>"+changeZeroToSpace(sum_region_fcast_wk1_soc.toFixed(0))+"</td>";
            result = result + "<td width=5% style='color:"+loc_color+";'>"+changeZeroToSpace(sum_region_fcast_wk2_coc.toFixed(0))+"</td>";
            result = result + "<td width=5% style='color:"+loc_color+";'>"+changeZeroToSpace(sum_region_fcast_wk2_soc.toFixed(0))+"</td>";
            result = result + "<td width=5% style='color:"+loc_color+";'>"+changeZeroToSpace(sum_region_fcast_wk3_coc.toFixed(0))+"</td>";
            result = result + "<td width=5% style='color:"+loc_color+";'>"+changeZeroToSpace(sum_region_fcast_wk3_soc.toFixed(0))+"</td>";
            result = result + "<td width=5% style='color:"+loc_color+";'>"+changeZeroToSpace(sum_region_fcast_wk4_coc.toFixed(0))+"</td>";
            result = result + "<td width=5% style='color:"+loc_color+";'>"+changeZeroToSpace(sum_region_fcast_wk4_soc.toFixed(0))+"</td>";
            result = result + "<td width=5% style='color:"+loc_color+";'>"+changeZeroToSpace(sum_region_fcast_wk5_coc.toFixed(0))+"</td>";
            result = result + "<td width=5% style='color:"+loc_color+";'>"+changeZeroToSpace(sum_region_fcast_wk5_soc.toFixed(0))+"</td>";
        }
        
        result = result + "</tr>";

        sum_p1_coc = sum_p1_coc + parseFloat(sum_region_p1_coc);
        sum_p1_soc = sum_p1_soc + parseFloat(sum_region_p1_soc);
        sum_p2_coc = sum_p2_coc + parseFloat(sum_region_p2_coc);
        sum_p2_soc = sum_p2_soc + parseFloat(sum_region_p2_soc);
        sum_wk1_coc = sum_wk1_coc + parseFloat(sum_region_wk1_coc);
        sum_wk1_soc = sum_wk1_soc + parseFloat(sum_region_wk1_soc);
        sum_wk2_coc = sum_wk2_coc + parseFloat(sum_region_wk2_coc);
        sum_wk2_soc = sum_wk2_soc + parseFloat(sum_region_wk2_soc);
        sum_wk3_coc = sum_wk3_coc + parseFloat(sum_region_wk3_coc);
        sum_wk3_soc = sum_wk3_soc + parseFloat(sum_region_wk3_soc);
        sum_wk4_coc = sum_wk4_coc + parseFloat(sum_region_wk4_coc);
        sum_wk4_soc = sum_wk4_soc + parseFloat(sum_region_wk4_soc);
        sum_wk5_coc = sum_wk5_coc + parseFloat(sum_region_wk5_coc);
        sum_wk5_soc = sum_wk5_soc + parseFloat(sum_region_wk5_soc);
        
        sum_fcast_wk1_coc = sum_fcast_wk1_coc + parseFloat(sum_region_fcast_wk1_coc);
        sum_fcast_wk1_soc = sum_fcast_wk1_soc + parseFloat(sum_region_fcast_wk1_soc);
        sum_fcast_wk2_coc = sum_fcast_wk2_coc + parseFloat(sum_region_fcast_wk2_coc);
        sum_fcast_wk2_soc = sum_fcast_wk2_soc + parseFloat(sum_region_fcast_wk2_soc);
        sum_fcast_wk3_coc = sum_fcast_wk3_coc + parseFloat(sum_region_fcast_wk3_coc);
        sum_fcast_wk3_soc = sum_fcast_wk3_soc + parseFloat(sum_region_fcast_wk3_soc);
        sum_fcast_wk4_coc = sum_fcast_wk4_coc + parseFloat(sum_region_fcast_wk4_coc);
        sum_fcast_wk4_soc = sum_fcast_wk4_soc + parseFloat(sum_region_fcast_wk4_soc);
        sum_fcast_wk5_coc = sum_fcast_wk5_coc + parseFloat(sum_region_fcast_wk5_coc);
        sum_fcast_wk5_soc = sum_fcast_wk5_soc + parseFloat(sum_region_fcast_wk5_soc);

        grand_sum_p1_coc = grand_sum_p1_coc + parseFloat(sum_region_p1_coc);
        grand_sum_p1_soc = grand_sum_p1_soc + parseFloat(sum_region_p1_soc);
        grand_sum_p2_coc = grand_sum_p2_coc + parseFloat(sum_region_p2_coc);
        grand_sum_p2_soc = grand_sum_p2_soc + parseFloat(sum_region_p2_soc);
        grand_sum_wk1_coc = grand_sum_wk1_coc + parseFloat(sum_region_wk1_coc);
        grand_sum_wk1_soc = grand_sum_wk1_soc + parseFloat(sum_region_wk1_soc);
        grand_sum_wk2_coc = grand_sum_wk2_coc + parseFloat(sum_region_wk2_coc);
        grand_sum_wk2_soc = grand_sum_wk2_soc + parseFloat(sum_region_wk2_soc);
        grand_sum_wk3_coc = grand_sum_wk3_coc + parseFloat(sum_region_wk3_coc);
        grand_sum_wk3_soc = grand_sum_wk3_soc + parseFloat(sum_region_wk3_soc);
        grand_sum_wk4_coc = grand_sum_wk4_coc + parseFloat(sum_region_wk4_coc);
        grand_sum_wk4_soc = grand_sum_wk4_soc + parseFloat(sum_region_wk4_soc);
        grand_sum_wk5_coc = grand_sum_wk5_coc + parseFloat(sum_region_wk5_coc);
        grand_sum_wk5_soc = grand_sum_wk5_soc + parseFloat(sum_region_wk5_soc);
        
        grand_sum_fcast_wk1_coc = grand_sum_fcast_wk1_coc + parseFloat(sum_region_fcast_wk1_coc);
        grand_sum_fcast_wk1_soc = grand_sum_fcast_wk1_soc + parseFloat(sum_region_fcast_wk1_soc);
        grand_sum_fcast_wk2_coc = grand_sum_fcast_wk2_coc + parseFloat(sum_region_fcast_wk2_coc);
        grand_sum_fcast_wk2_soc = grand_sum_fcast_wk2_soc + parseFloat(sum_region_fcast_wk2_soc);
        grand_sum_fcast_wk3_coc = grand_sum_fcast_wk3_coc + parseFloat(sum_region_fcast_wk3_coc);
        grand_sum_fcast_wk3_soc = grand_sum_fcast_wk3_soc + parseFloat(sum_region_fcast_wk3_soc);
        grand_sum_fcast_wk4_coc = grand_sum_fcast_wk4_coc + parseFloat(sum_region_fcast_wk4_coc);
        grand_sum_fcast_wk4_soc = grand_sum_fcast_wk4_soc + parseFloat(sum_region_fcast_wk4_soc);
        grand_sum_fcast_wk5_coc = grand_sum_fcast_wk5_coc + parseFloat(sum_region_fcast_wk5_coc);
        grand_sum_fcast_wk5_soc = grand_sum_fcast_wk5_soc + parseFloat(sum_region_fcast_wk5_soc);

         sum_region_p1_coc = 0;
         sum_region_p1_soc = 0;
         sum_region_p2_coc = 0;
         sum_region_p2_soc = 0;
         sum_region_wk1_coc = 0;
         sum_region_wk1_soc = 0;
         sum_region_wk2_coc = 0;
         sum_region_wk2_soc = 0;
         sum_region_wk3_coc = 0;
         sum_region_wk3_soc = 0;
         sum_region_wk4_coc = 0;
         sum_region_wk4_soc = 0;
         sum_region_wk5_coc = 0;
         sum_region_wk5_soc = 0;
         region_count_detail = 0;
         
         sum_region_fcast_wk1_coc = 0;
         sum_region_fcast_wk1_soc = 0;
         sum_region_fcast_wk2_coc = 0;
         sum_region_fcast_wk2_soc = 0;
         sum_region_fcast_wk3_coc = 0;
         sum_region_fcast_wk3_soc = 0;
         sum_region_fcast_wk4_coc = 0;
         sum_region_fcast_wk4_soc = 0;
         sum_region_fcast_wk5_coc = 0;
         sum_region_fcast_wk5_soc = 0;

         index_detail = 0;

             result = result + "<tr class=TableRightWhite style='display:none;'  id="+doc.hq_summary[0].loc_office+index_detail+">";
                result = result + "<td >&nbsp;</td>";
                result = result + "<td style='text-align:left;color:"+loc_color+";'>"+changeZeroToSpace(doc.hq_summary[0].pol_pod)+"</td>";
                result = result + "<td style='BORDER-LEFT: gray 2px solid'>"+changeZeroToSpace(parseFloat(doc.hq_summary[0].p1_coc).toFixed(0))+"</td>";
                result = result + "<td >"+changeZeroToSpace(parseFloat(doc.hq_summary[0].p1_soc).toFixed(0))+"</td>";
                result = result + "<td >"+changeZeroToSpace(parseFloat(doc.hq_summary[0].p2_coc).toFixed(0))+"</td>";
                result = result + "<td >"+changeZeroToSpace(parseFloat(doc.hq_summary[0].p2_soc).toFixed(0))+"</td>";
                
                if(check_act5wk == "Y"){
                    result = result + generateActual(doc.hq_summary[0]);
                }
                
                if(doc.hq_summary[i].p2_coc == "0" && doc.hq_summary[0].p2_soc == "0"){
                    p2_coc = parseFloat(doc.hq_summary[0].p1_coc);
                    p2_soc = parseFloat(doc.hq_summary[0].p1_soc);
                }else{
                    p2_coc = parseFloat(doc.hq_summary[0].p2_coc);
                    p2_soc = parseFloat(doc.hq_summary[0].p2_soc);
                }
                wk5_coc = parseFloat(doc.hq_summary[0].wk5_coc);
                wk5_soc = parseFloat(doc.hq_summary[0].wk5_soc);

                if(wk5_coc != 0 && p2_coc != 0){
                    result = result + "<td style='BORDER-LEFT: gray 2px solid'>"+addPercentTovalue(((wk5_coc/p2_coc)*100).toFixed(0))+"</td>";
                }else{
                    result = result + "<td style='BORDER-LEFT: gray 2px solid'>&nbsp;</td>";
                }
                if(wk5_soc != 0 && p2_soc != 0){
                    result = result + "<td >"+addPercentTovalue(((wk5_soc/p2_soc)*100).toFixed(0))+"</td>";
                }else{
                    result = result + "<td >&nbsp;</td>";
                }

                result = result + "<td >"+addPercentTovalue((((wk5_coc+wk5_soc)/(p2_coc+p2_soc))*100).toFixed(0))+"</td>";
                
                if(check_fcast5wk == "Y"){
                    result = result + generateForecast(doc.hq_summary[0],loc_color);
                }
                
                result = result + "</tr>";

                index_detail = index_detail +1;
    }else{
        //Start #02
//        result = result + "<td style=text-align:left>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+doc.hq_summary[0].loc_office+"</td>";
        result = result + "<td width=7% style=text-align:left>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='/SMTWebApp/RrcStandardSrv?service=ui.smt.SmtLocSummaryReportSvc&pageAction=fromS5&p_location="+doc.hq_summary[0].loc_office+"&p_year=20" + doc.p_year + "&p_period=" + doc.p_period + "&p_week=" + doc.p_week + "&p_viewby=POL' style='color:"+loc_color+";'>"+doc.hq_summary[0].loc_office+"</a></td>";
        //End #02

//        result = result + "<td width=7% style=text-align:left>";
////        result = result + "<img src=\"/SMTWebApp/images/btnArrowDown.gif\" id=img0 onclick=\"showHideRow(\'"+doc.hq_summary[0].loc_office+"\',\'"+region_count_detail+"\',\'0\');\"/>";
//        result = result + "<input type=button value=' + '/>";
//        //Start #02
////        result = result + "&nbsp;&nbsp;&nbsp;" + doc.hq_summary[0].loc_office+"</td>";
//        result = result + "&nbsp;<a href='/SMTWebApp/RrcStandardSrv?service=ui.smt.SmtLocSummaryReportSvc&pageAction=fromS5&p_location="+doc.hq_summary[0].loc_office+"&p_year=20" + doc.p_year + "&p_period=" + doc.p_period + "&p_week=" + doc.p_week + "&p_viewby=POL'>"+doc.hq_summary[0].loc_office+"</a></td>";
//        //End #02

        result = result + "<td >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>";
        result = result + "<td style='BORDER-LEFT: gray 2px solid'>"+changeZeroToSpace(parseFloat(doc.hq_summary[0].p1_coc).toFixed(0))+"</td>";
        result = result + "<td >"+changeZeroToSpace(parseFloat(doc.hq_summary[0].p1_soc).toFixed(0))+"</td>";
        result = result + "<td >"+changeZeroToSpace(parseFloat(doc.hq_summary[0].p2_coc).toFixed(0))+"</td>";
        result = result + "<td >"+changeZeroToSpace(parseFloat(doc.hq_summary[0].p2_soc).toFixed(0))+"</td>";
        
        if(check_act5wk == "Y"){
            result = result + generateActual(doc.hq_summary[0]);
        }

        if(doc.hq_summary[0].p2_coc == "0" && doc.hq_summary[0].p2_soc == "0"){
            p2_coc = parseFloat(doc.hq_summary[0].p1_coc);
            p2_soc = parseFloat(doc.hq_summary[0].p1_soc);
        }else{
            p2_coc = parseFloat(doc.hq_summary[0].p2_coc);
            p2_soc = parseFloat(doc.hq_summary[0].p2_soc);
        }
        wk5_coc = parseFloat(doc.hq_summary[0].wk5_coc);
        wk5_soc = parseFloat(doc.hq_summary[0].wk5_soc);

        if(wk5_coc != 0 && p2_coc != 0){
            result = result + "<td style='BORDER-LEFT: gray 2px solid'>"+addPercentTovalue(((wk5_coc/p2_coc)*100).toFixed(0))+"</td>";
        }else{
            result = result + "<td style='BORDER-LEFT: gray 2px solid'>&nbsp;</td>";
        }
        if(wk5_soc != 0 && p2_soc != 0){
            result = result + "<td >"+addPercentTovalue(((wk5_soc/p2_soc)*100).toFixed(0))+"</td>";
        }else{
            result = result + "<td >&nbsp;</td>";
        }
        result = result + "<td >"+addPercentTovalue((((wk5_coc+wk5_soc)/(p2_coc+p2_soc))*100).toFixed(0))+"</td>";
        
        if(check_fcast5wk == "Y"){
            result = result + generateForecast(doc.hq_summary[0],loc_color);
        }
        
        result = result + "</tr>";

        sum_p1_coc = parseFloat(doc.hq_summary[0].p1_coc);
         sum_p1_soc = parseFloat(doc.hq_summary[0].p1_soc);
         sum_p2_coc = parseFloat(doc.hq_summary[0].p2_coc);
         sum_p2_soc = parseFloat(doc.hq_summary[0].p2_soc);
         sum_wk1_coc = parseFloat(doc.hq_summary[0].wk1_coc);
         sum_wk1_soc = parseFloat(doc.hq_summary[0].wk1_soc);
         sum_wk2_coc = parseFloat(doc.hq_summary[0].wk2_coc);
         sum_wk2_soc = parseFloat(doc.hq_summary[0].wk2_soc);
         sum_wk3_coc = parseFloat(doc.hq_summary[0].wk3_coc);
         sum_wk3_soc = parseFloat(doc.hq_summary[0].wk3_soc);
         sum_wk4_coc = parseFloat(doc.hq_summary[0].wk4_coc);
         sum_wk4_soc = parseFloat(doc.hq_summary[0].wk4_soc);
         sum_wk5_coc = parseFloat(doc.hq_summary[0].wk5_coc);
         sum_wk5_soc = parseFloat(doc.hq_summary[0].wk5_soc);
         
         sum_fcast_wk1_coc = parseFloat(doc.hq_summary[0].fcast_wk1_coc);
         sum_fcast_wk1_soc = parseFloat(doc.hq_summary[0].fcast_wk1_soc);
         sum_fcast_wk2_coc = parseFloat(doc.hq_summary[0].fcast_wk2_coc);
         sum_fcast_wk2_soc = parseFloat(doc.hq_summary[0].fcast_wk2_soc);
         sum_fcast_wk3_coc = parseFloat(doc.hq_summary[0].fcast_wk3_coc);
         sum_fcast_wk3_soc = parseFloat(doc.hq_summary[0].fcast_wk3_soc);
         sum_fcast_wk4_coc = parseFloat(doc.hq_summary[0].fcast_wk4_coc);
         sum_fcast_wk4_soc = parseFloat(doc.hq_summary[0].fcast_wk4_soc);
         sum_fcast_wk5_coc = parseFloat(doc.hq_summary[0].fcast_wk5_coc);
         sum_fcast_wk5_soc = parseFloat(doc.hq_summary[0].fcast_wk5_soc);

         grand_sum_p1_coc = parseFloat(doc.hq_summary[0].p1_coc);
         grand_sum_p1_soc = parseFloat(doc.hq_summary[0].p1_soc);
         grand_sum_p2_coc = parseFloat(doc.hq_summary[0].p2_coc);
         grand_sum_p2_soc = parseFloat(doc.hq_summary[0].p2_soc);
         grand_sum_wk1_coc = parseFloat(doc.hq_summary[0].wk1_coc);
         grand_sum_wk1_soc = parseFloat(doc.hq_summary[0].wk1_soc);
         grand_sum_wk2_coc = parseFloat(doc.hq_summary[0].wk2_coc);
         grand_sum_wk2_soc = parseFloat(doc.hq_summary[0].wk2_soc);
         grand_sum_wk3_coc = parseFloat(doc.hq_summary[0].wk3_coc);
         grand_sum_wk3_soc = parseFloat(doc.hq_summary[0].wk3_soc);
         grand_sum_wk4_coc = parseFloat(doc.hq_summary[0].wk4_coc);
         grand_sum_wk4_soc = parseFloat(doc.hq_summary[0].wk4_soc);
         grand_sum_wk5_coc = parseFloat(doc.hq_summary[0].wk5_coc);
         grand_sum_wk5_soc = parseFloat(doc.hq_summary[0].wk5_soc);
         
         grand_sum_fcast_wk1_coc = parseFloat(doc.hq_summary[0].fcast_wk1_coc);
         grand_sum_fcast_wk1_soc = parseFloat(doc.hq_summary[0].fcast_wk1_soc);
         grand_sum_fcast_wk2_coc = parseFloat(doc.hq_summary[0].fcast_wk2_coc);
         grand_sum_fcast_wk2_soc = parseFloat(doc.hq_summary[0].fcast_wk2_soc);
         grand_sum_fcast_wk3_coc = parseFloat(doc.hq_summary[0].fcast_wk3_coc);
         grand_sum_fcast_wk3_soc = parseFloat(doc.hq_summary[0].fcast_wk3_soc);
         grand_sum_fcast_wk4_coc = parseFloat(doc.hq_summary[0].fcast_wk4_coc);
         grand_sum_fcast_wk4_soc = parseFloat(doc.hq_summary[0].fcast_wk4_soc);
         grand_sum_fcast_wk5_coc = parseFloat(doc.hq_summary[0].fcast_wk5_coc);
         grand_sum_fcast_wk5_soc = parseFloat(doc.hq_summary[0].fcast_wk5_soc);
    }


    for (i=1;i<=doc.hq_summary.length-1;i++) {
        
        if(doc.hq_summary[i].fcast_status == "F"){
            loc_color = "#0033cc";
        }else{
            loc_color = "#e46c0a";
        }
        
        if(group_region != doc.hq_summary[i].group_region){
//            alert("group_region "+group_region);
            result = result + "<tr >";
            result = result + "<td  colspan=2 style=text-align:center;color:#000000 class=TableLeftSub>Total</td>";
            result = result + "<td class=TableRightSub style='color:#000000; BORDER-LEFT: gray 2px solid'>"+changeZeroToSpace(sum_p1_coc.toFixed(0))+"</td>";
            result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_p1_soc.toFixed(0))+"</td>";
            result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_p2_coc.toFixed(0))+"</td>";
            result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_p2_soc.toFixed(0))+"</td>";
            
            if(check_act5wk == "Y"){
                result = result + "<td class=TableRightSub style='color:#000000; BORDER-LEFT: gray 2px solid'>"+changeZeroToSpace(sum_wk1_coc.toFixed(0))+"</td>";
                result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_wk1_soc.toFixed(0))+"</td>";
                result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_wk2_coc.toFixed(0))+"</td>";
                result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_wk2_soc.toFixed(0))+"</td>";
                result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_wk3_coc.toFixed(0))+"</td>";
                result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_wk3_soc.toFixed(0))+"</td>";
                result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_wk4_coc.toFixed(0))+"</td>";
                result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_wk4_soc.toFixed(0))+"</td>";
                result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_wk5_coc.toFixed(0))+"</td>";
                result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_wk5_soc.toFixed(0))+"</td>";
            }
            
            if(sum_p2_coc == 0 && sum_p2_soc == 0){
                if(sum_wk5_coc != 0 && sum_p1_coc != 0){
                    result = result + "<td class=TableRightSub style='color:#000000; BORDER-LEFT: gray 2px solid'>"+addPercentTovalue(((sum_wk5_coc/sum_p1_coc)*100).toFixed(0))+"</td>";
                }else{
                    result = result + "<td class=TableRightSub style='color:#000000; BORDER-LEFT: gray 2px solid'>&nbsp;</td>";
                }
                if(sum_wk5_soc != 0 && sum_p1_soc != 0){
                    result = result + "<td class=TableRightSub style=color:#000000>"+addPercentTovalue(((sum_wk5_soc/sum_p1_soc)*100).toFixed(0))+"</td>";
                }else{
                    result = result + "<td class=TableRightSub style=color:#000000>&nbsp;</td>";
                }
                result = result + "<td class=TableRightSub style=color:#000000>"+addPercentTovalue((((sum_wk5_coc+sum_wk5_soc)/(sum_p1_coc+sum_p1_soc))*100).toFixed(0))+"</td>";
            }else{
                if(sum_wk5_coc != 0 && sum_p2_coc != 0){
                    result = result + "<td class=TableRightSub style='color:#000000; BORDER-LEFT: gray 2px solid'>"+addPercentTovalue(((sum_wk5_coc/sum_p2_coc)*100).toFixed(0))+"</td>";
                }else{
                    result = result + "<td class=TableRightSub style='color:#000000; BORDER-LEFT: gray 2px solid'>&nbsp;</td>";
                }
                if(sum_wk5_soc != 0 && sum_p2_soc != 0){
                    result = result + "<td class=TableRightSub style=color:#000000>"+addPercentTovalue(((sum_wk5_soc/sum_p2_soc)*100).toFixed(0))+"</td>";
                }else{
                    result = result + "<td class=TableRightSub style=color:#000000>&nbsp;</td>";
                }
                result = result + "<td class=TableRightSub style=color:#000000>"+addPercentTovalue((((sum_wk5_coc+sum_wk5_soc)/(sum_p2_coc+sum_p2_soc))*100).toFixed(0))+"</td>";
            }
            
            if(check_fcast5wk == "Y"){
                result = result + "<td class=TableRightSub style='color:#000000; BORDER-LEFT: gray 2px solid'>"+changeZeroToSpace(sum_fcast_wk1_coc.toFixed(0))+"</td>";
                result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_fcast_wk1_soc.toFixed(0))+"</td>";
                result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_fcast_wk2_coc.toFixed(0))+"</td>";
                result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_fcast_wk2_soc.toFixed(0))+"</td>";
                result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_fcast_wk3_coc.toFixed(0))+"</td>";
                result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_fcast_wk3_soc.toFixed(0))+"</td>";
                result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_fcast_wk4_coc.toFixed(0))+"</td>";
                result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_fcast_wk4_soc.toFixed(0))+"</td>";
                result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_fcast_wk5_coc.toFixed(0))+"</td>";
                result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_fcast_wk5_soc.toFixed(0))+"</td>";
            }
            
            result = result + "</tr>";

            result = result + "<tr class=TableLeftWhite>";
            result = result + "<td  colspan=2 align=center BGCOLOR=#fce4d6>"+doc.hq_summary[i].group_region+"</td>";
            result = result + "<td style='BORDER-LEFT: gray 2px solid'>&nbsp;</td>";
            result = result + "<td >&nbsp;</td>";
            result = result + "<td >&nbsp;</td>";
            result = result + "<td >&nbsp;</td>";
            
            if(check_act5wk == "Y"){
                result = result + "<td style='BORDER-LEFT: gray 2px solid'>&nbsp;</td>";
                result = result + "<td >&nbsp;</td>";
                result = result + "<td >&nbsp;</td>";
                result = result + "<td >&nbsp;</td>";
                result = result + "<td >&nbsp;</td>";
                result = result + "<td >&nbsp;</td>";
                result = result + "<td >&nbsp;</td>";
                result = result + "<td >&nbsp;</td>";
                result = result + "<td >&nbsp;</td>";
                result = result + "<td >&nbsp;</td>";
            }
            
            result = result + "<td style='BORDER-LEFT: gray 2px solid'>&nbsp;</td>";
            result = result + "<td >&nbsp;</td>";
            result = result + "<td >&nbsp;</td>";
            
            if(check_fcast5wk == "Y"){
                result = result + "<td style='BORDER-LEFT: gray 2px solid'>&nbsp;</td>";
                result = result + "<td >&nbsp;</td>";
                result = result + "<td >&nbsp;</td>";
                result = result + "<td >&nbsp;</td>";
                result = result + "<td >&nbsp;</td>";
                result = result + "<td >&nbsp;</td>";
                result = result + "<td >&nbsp;</td>";
                result = result + "<td >&nbsp;</td>";
                result = result + "<td >&nbsp;</td>";
                result = result + "<td >&nbsp;</td>";
            }
            
            result = result + "</tr>";

            group_region = doc.hq_summary[i].group_region;
            loc_office = doc.hq_summary[i].loc_office;

            sum_p1_coc = 0;
            sum_p1_soc = 0;
            sum_p2_coc = 0;
            sum_p2_soc = 0;
            sum_wk1_coc = 0;
            sum_wk1_soc = 0;
            sum_wk2_coc = 0;
            sum_wk2_soc = 0;
            sum_wk3_coc = 0;
            sum_wk3_soc = 0;
            sum_wk4_coc = 0;
            sum_wk4_soc = 0;
            sum_wk5_coc = 0;
            sum_wk5_soc = 0;

            sum_pwk5_coc = 0;
            sum_pwk5_soc = 0;
            sum_pwk5_overall = 0;
            
            sum_fcast_wk1_coc = 0;
            sum_fcast_wk1_soc = 0;
            sum_fcast_wk2_coc = 0;
            sum_fcast_wk2_soc = 0;
            sum_fcast_wk3_coc = 0;
            sum_fcast_wk3_soc = 0;
            sum_fcast_wk4_coc = 0;
            sum_fcast_wk4_soc = 0;
            sum_fcast_wk5_coc = 0;
            sum_fcast_wk5_soc = 0;
        }


        if(doc.hq_summary[i].count_detail != "0"){
            for(j = i ; j <= (i+parseInt(doc.hq_summary[i].count_detail)) ; j++){
                sum_region_p1_coc = sum_region_p1_coc + parseFloat(doc.hq_summary[j].p1_coc);
                sum_region_p1_soc = sum_region_p1_soc + parseFloat(doc.hq_summary[j].p1_soc);
                sum_region_p2_coc = sum_region_p2_coc + parseFloat(doc.hq_summary[j].p2_coc);
                sum_region_p2_soc = sum_region_p2_soc + parseFloat(doc.hq_summary[j].p2_soc);
                sum_region_wk1_coc = sum_region_wk1_coc + parseFloat(doc.hq_summary[j].wk1_coc);
                sum_region_wk1_soc = sum_region_wk1_soc + parseFloat(doc.hq_summary[j].wk1_soc);
                sum_region_wk2_coc = sum_region_wk2_coc + parseFloat(doc.hq_summary[j].wk2_coc);
                sum_region_wk2_soc = sum_region_wk2_soc + parseFloat(doc.hq_summary[j].wk2_soc);
                sum_region_wk3_coc = sum_region_wk3_coc + parseFloat(doc.hq_summary[j].wk3_coc);
                sum_region_wk3_soc = sum_region_wk3_soc + parseFloat(doc.hq_summary[j].wk3_soc);
                sum_region_wk4_coc = sum_region_wk4_coc + parseFloat(doc.hq_summary[j].wk4_coc);
                sum_region_wk4_soc = sum_region_wk4_soc + parseFloat(doc.hq_summary[j].wk4_soc);
                sum_region_wk5_coc = sum_region_wk5_coc + parseFloat(doc.hq_summary[j].wk5_coc);
                sum_region_wk5_soc = sum_region_wk5_soc + parseFloat(doc.hq_summary[j].wk5_soc);
                
                sum_region_fcast_wk1_coc = sum_region_fcast_wk1_coc + parseFloat(doc.hq_summary[j].fcast_wk1_coc);
                sum_region_fcast_wk1_soc = sum_region_fcast_wk1_soc + parseFloat(doc.hq_summary[j].fcast_wk1_soc);
                sum_region_fcast_wk2_coc = sum_region_fcast_wk2_coc + parseFloat(doc.hq_summary[j].fcast_wk2_coc);
                sum_region_fcast_wk2_soc = sum_region_fcast_wk2_soc + parseFloat(doc.hq_summary[j].fcast_wk2_soc);
                sum_region_fcast_wk3_coc = sum_region_fcast_wk3_coc + parseFloat(doc.hq_summary[j].fcast_wk3_coc);
                sum_region_fcast_wk3_soc = sum_region_fcast_wk3_soc + parseFloat(doc.hq_summary[j].fcast_wk3_soc);
                sum_region_fcast_wk4_coc = sum_region_fcast_wk4_coc + parseFloat(doc.hq_summary[j].fcast_wk4_coc);
                sum_region_fcast_wk4_soc = sum_region_fcast_wk4_soc + parseFloat(doc.hq_summary[j].fcast_wk4_soc);
                sum_region_fcast_wk5_coc = sum_region_fcast_wk5_coc + parseFloat(doc.hq_summary[j].fcast_wk5_coc);
                sum_region_fcast_wk5_soc = sum_region_fcast_wk5_soc + parseFloat(doc.hq_summary[j].fcast_wk5_soc);
            }
        }

        if(doc.hq_summary[i].header_detail == "H" && doc.hq_summary[i].count_detail != "0"){
            region_count_detail = parseInt(doc.hq_summary[i].count_detail)+1;
            result = result + "<tr class=TableRightWhite >";
            result = result + "<td style=text-align:left>";
//            result = result + "<img src=\"/SMTWebApp/images/btnArrowDown.gif\" id=img"+i+" onclick=\"showHideRow(\'"+doc.hq_summary[i].loc_office+"\',\'"+region_count_detail+"\',\'"+i+"\');\"/>";
            result = result + "<input type=button value=' + ' id=img"+i+" onclick=\"showHideRow(\'"+doc.hq_summary[i].loc_office+"\',\'"+region_count_detail+"\',\'"+i+"\');\"/>";

            //Start #02
//            result = result + "&nbsp;&nbsp;&nbsp;" +doc.hq_summary[i].loc_office+"</td>";
            result = result + "&nbsp;<a href='/SMTWebApp/RrcStandardSrv?service=ui.smt.SmtLocSummaryReportSvc&pageAction=fromS5&p_location="+doc.hq_summary[i].loc_office+"&p_year=20" + doc.p_year + "&p_period=" + doc.p_period + "&p_week=" + doc.p_week + "&p_viewby=POL'  style='color:"+loc_color+";'>"+doc.hq_summary[i].loc_office+"</a></td>";
            //End #02

            result = result + "<td >&nbsp;</td>";
            result = result + "<td style='BORDER-LEFT: gray 2px solid'>"+changeZeroToSpace(sum_region_p1_coc.toFixed(0))+"</td>";
            result = result + "<td >"+changeZeroToSpace(sum_region_p1_soc.toFixed(0))+"</td>";
            result = result + "<td >"+changeZeroToSpace(sum_region_p2_coc.toFixed(0))+"</td>";
            result = result + "<td >"+changeZeroToSpace(sum_region_p2_soc.toFixed(0))+"</td>";
            
            if(check_act5wk == "Y"){
                result = result + "<td style='BORDER-LEFT: gray 2px solid'>"+changeZeroToSpace(sum_region_wk1_coc.toFixed(0))+"</td>";
                result = result + "<td >"+changeZeroToSpace(sum_region_wk1_soc.toFixed(0))+"</td>";
                result = result + "<td >"+changeZeroToSpace(sum_region_wk2_coc.toFixed(0))+"</td>";
                result = result + "<td >"+changeZeroToSpace(sum_region_wk2_soc.toFixed(0))+"</td>";
                result = result + "<td >"+changeZeroToSpace(sum_region_wk3_coc.toFixed(0))+"</td>";
                result = result + "<td >"+changeZeroToSpace(sum_region_wk3_soc.toFixed(0))+"</td>";
                result = result + "<td >"+changeZeroToSpace(sum_region_wk4_coc.toFixed(0))+"</td>";
                result = result + "<td >"+changeZeroToSpace(sum_region_wk4_soc.toFixed(0))+"</td>";
                result = result + "<td >"+changeZeroToSpace(sum_region_wk5_coc.toFixed(0))+"</td>";
                result = result + "<td >"+changeZeroToSpace(sum_region_wk5_soc.toFixed(0))+"</td>";
            }

            if(sum_region_p2_coc == "0" && sum_region_p2_soc == "0"){
                p2_coc = parseFloat(sum_region_p1_coc);
                p2_soc = parseFloat(sum_region_p1_soc);
            }else{
                p2_coc = parseFloat(sum_region_p2_coc);
                p2_soc = parseFloat(sum_region_p2_soc);
            }
            wk5_coc = parseFloat(sum_region_wk5_coc);
            wk5_soc = parseFloat(sum_region_wk5_soc);

            if(wk5_coc != 0 && p2_coc != 0){
                result = result + "<td style='BORDER-LEFT: gray 2px solid'>"+addPercentTovalue(((wk5_coc/p2_coc)*100).toFixed(0))+"</td>";
            }else{
                result = result + "<td style='BORDER-LEFT: gray 2px solid'>&nbsp;</td>";
            }
            if(wk5_soc != 0 && p2_soc != 0){
                result = result + "<td >"+addPercentTovalue(((wk5_soc/p2_soc)*100).toFixed(0))+"</td>";
            }else{
                result = result + "<td >&nbsp;</td>";
            }
            result = result + "<td >"+addPercentTovalue((((wk5_coc+wk5_soc)/(p2_coc+p2_soc))*100).toFixed(0))+"</td>";
            
            if(check_fcast5wk == "Y"){
                result = result + "<td style='BORDER-LEFT: gray 2px solid;color:"+loc_color+";'>"+changeZeroToSpace(sum_region_fcast_wk1_coc.toFixed(0))+"</td>";
                result = result + "<td style='color:"+loc_color+";'>"+changeZeroToSpace(sum_region_fcast_wk1_soc.toFixed(0))+"</td>";
                result = result + "<td style='color:"+loc_color+";'>"+changeZeroToSpace(sum_region_fcast_wk2_coc.toFixed(0))+"</td>";
                result = result + "<td style='color:"+loc_color+";'>"+changeZeroToSpace(sum_region_fcast_wk2_soc.toFixed(0))+"</td>";
                result = result + "<td style='color:"+loc_color+";'>"+changeZeroToSpace(sum_region_fcast_wk3_coc.toFixed(0))+"</td>";
                result = result + "<td style='color:"+loc_color+";'>"+changeZeroToSpace(sum_region_fcast_wk3_soc.toFixed(0))+"</td>";
                result = result + "<td style='color:"+loc_color+";'>"+changeZeroToSpace(sum_region_fcast_wk4_coc.toFixed(0))+"</td>";
                result = result + "<td style='color:"+loc_color+";'>"+changeZeroToSpace(sum_region_fcast_wk4_soc.toFixed(0))+"</td>";
                result = result + "<td style='color:"+loc_color+";'>"+changeZeroToSpace(sum_region_fcast_wk5_coc.toFixed(0))+"</td>";
                result = result + "<td style='color:"+loc_color+";'>"+changeZeroToSpace(sum_region_fcast_wk5_soc.toFixed(0))+"</td>";
            }
            
            result = result + "</tr>";

            sum_p1_coc = sum_p1_coc + parseFloat(sum_region_p1_coc);
            sum_p1_soc = sum_p1_soc + parseFloat(sum_region_p1_soc);
            sum_p2_coc = sum_p2_coc + parseFloat(sum_region_p2_coc);
            sum_p2_soc = sum_p2_soc + parseFloat(sum_region_p2_soc);
            sum_wk1_coc = sum_wk1_coc + parseFloat(sum_region_wk1_coc);
            sum_wk1_soc = sum_wk1_soc + parseFloat(sum_region_wk1_soc);
            sum_wk2_coc = sum_wk2_coc + parseFloat(sum_region_wk2_coc);
            sum_wk2_soc = sum_wk2_soc + parseFloat(sum_region_wk2_soc);
            sum_wk3_coc = sum_wk3_coc + parseFloat(sum_region_wk3_coc);
            sum_wk3_soc = sum_wk3_soc + parseFloat(sum_region_wk3_soc);
            sum_wk4_coc = sum_wk4_coc + parseFloat(sum_region_wk4_coc);
            sum_wk4_soc = sum_wk4_soc + parseFloat(sum_region_wk4_soc);
            sum_wk5_coc = sum_wk5_coc + parseFloat(sum_region_wk5_coc);
            sum_wk5_soc = sum_wk5_soc + parseFloat(sum_region_wk5_soc);
            
            sum_fcast_wk1_coc = sum_fcast_wk1_coc + parseFloat(sum_region_fcast_wk1_coc);
            sum_fcast_wk1_soc = sum_fcast_wk1_soc + parseFloat(sum_region_fcast_wk1_soc);
            sum_fcast_wk2_coc = sum_fcast_wk2_coc + parseFloat(sum_region_fcast_wk2_coc);
            sum_fcast_wk2_soc = sum_fcast_wk2_soc + parseFloat(sum_region_fcast_wk2_soc);
            sum_fcast_wk3_coc = sum_fcast_wk3_coc + parseFloat(sum_region_fcast_wk3_coc);
            sum_fcast_wk3_soc = sum_fcast_wk3_soc + parseFloat(sum_region_fcast_wk3_soc);
            sum_fcast_wk4_coc = sum_fcast_wk4_coc + parseFloat(sum_region_fcast_wk4_coc);
            sum_fcast_wk4_soc = sum_fcast_wk4_soc + parseFloat(sum_region_fcast_wk4_soc);
            sum_fcast_wk5_coc = sum_fcast_wk5_coc + parseFloat(sum_region_fcast_wk5_coc);
            sum_fcast_wk5_soc = sum_fcast_wk5_soc + parseFloat(sum_region_fcast_wk5_soc);

            grand_sum_p1_coc = grand_sum_p1_coc + parseFloat(sum_region_p1_coc);
            grand_sum_p1_soc = grand_sum_p1_soc + parseFloat(sum_region_p1_soc);
            grand_sum_p2_coc = grand_sum_p2_coc + parseFloat(sum_region_p2_coc);
            grand_sum_p2_soc = grand_sum_p2_soc + parseFloat(sum_region_p2_soc);
            grand_sum_wk1_coc = grand_sum_wk1_coc + parseFloat(sum_region_wk1_coc);
            grand_sum_wk1_soc = grand_sum_wk1_soc + parseFloat(sum_region_wk1_soc);
            grand_sum_wk2_coc = grand_sum_wk2_coc + parseFloat(sum_region_wk2_coc);
            grand_sum_wk2_soc = grand_sum_wk2_soc + parseFloat(sum_region_wk2_soc);
            grand_sum_wk3_coc = grand_sum_wk3_coc + parseFloat(sum_region_wk3_coc);
            grand_sum_wk3_soc = grand_sum_wk3_soc + parseFloat(sum_region_wk3_soc);
            grand_sum_wk4_coc = grand_sum_wk4_coc + parseFloat(sum_region_wk4_coc);
            grand_sum_wk4_soc = grand_sum_wk4_soc + parseFloat(sum_region_wk4_soc);
            grand_sum_wk5_coc = grand_sum_wk5_coc + parseFloat(sum_region_wk5_coc);
            grand_sum_wk5_soc = grand_sum_wk5_soc + parseFloat(sum_region_wk5_soc);
            
            grand_sum_fcast_wk1_coc = grand_sum_fcast_wk1_coc + parseFloat(sum_region_fcast_wk1_coc);
            grand_sum_fcast_wk1_soc = grand_sum_fcast_wk1_soc + parseFloat(sum_region_fcast_wk1_soc);
            grand_sum_fcast_wk2_coc = grand_sum_fcast_wk2_coc + parseFloat(sum_region_fcast_wk2_coc);
            grand_sum_fcast_wk2_soc = grand_sum_fcast_wk2_soc + parseFloat(sum_region_fcast_wk2_soc);
            grand_sum_fcast_wk3_coc = grand_sum_fcast_wk3_coc + parseFloat(sum_region_fcast_wk3_coc);
            grand_sum_fcast_wk3_soc = grand_sum_fcast_wk3_soc + parseFloat(sum_region_fcast_wk3_soc);
            grand_sum_fcast_wk4_coc = grand_sum_fcast_wk4_coc + parseFloat(sum_region_fcast_wk4_coc);
            grand_sum_fcast_wk4_soc = grand_sum_fcast_wk4_soc + parseFloat(sum_region_fcast_wk4_soc);
            grand_sum_fcast_wk5_coc = grand_sum_fcast_wk5_coc + parseFloat(sum_region_fcast_wk5_coc);
            grand_sum_fcast_wk5_soc = grand_sum_fcast_wk5_soc + parseFloat(sum_region_fcast_wk5_soc);

             sum_region_p1_coc = 0;
             sum_region_p1_soc = 0;
             sum_region_p2_coc = 0;
             sum_region_p2_soc = 0;
             sum_region_wk1_coc = 0;
             sum_region_wk1_soc = 0;
             sum_region_wk2_coc = 0;
             sum_region_wk2_soc = 0;
             sum_region_wk3_coc = 0;
             sum_region_wk3_soc = 0;
             sum_region_wk4_coc = 0;
             sum_region_wk4_soc = 0;
             sum_region_wk5_coc = 0;
             sum_region_wk5_soc = 0;
             region_count_detail = 0;
             
             sum_region_fcast_wk1_coc = 0;
             sum_region_fcast_wk1_soc = 0;
             sum_region_fcast_wk2_coc = 0;
             sum_region_fcast_wk2_soc = 0;
             sum_region_fcast_wk3_coc = 0;
             sum_region_fcast_wk3_soc = 0;
             sum_region_fcast_wk4_coc = 0;
             sum_region_fcast_wk4_soc = 0;
             sum_region_fcast_wk5_coc = 0;
             sum_region_fcast_wk5_soc = 0;

             index_detail = 0;

             result = result + "<tr class=TableRightWhite style='display:none;'  id="+doc.hq_summary[i].loc_office+index_detail+">";
                result = result + "<td >&nbsp;</td>";
                result = result + "<td style='text-align:left;color:"+loc_color+";'>"+changeZeroToSpace(doc.hq_summary[i].pol_pod)+"</td>";
                result = result + "<td style='BORDER-LEFT: gray 2px solid'>"+changeZeroToSpace(parseFloat(doc.hq_summary[i].p1_coc).toFixed(0))+"</td>";
                result = result + "<td >"+changeZeroToSpace(parseFloat(doc.hq_summary[i].p1_soc).toFixed(0))+"</td>";
                result = result + "<td >"+changeZeroToSpace(parseFloat(doc.hq_summary[i].p2_coc).toFixed(0))+"</td>";
                result = result + "<td >"+changeZeroToSpace(parseFloat(doc.hq_summary[i].p2_soc).toFixed(0))+"</td>";
                
                if(check_act5wk == "Y"){
                    result = result + generateActual(doc.hq_summary[i]);
                }
                
                if(doc.hq_summary[i].p2_coc == "0" && doc.hq_summary[i].p2_soc == "0"){
                    p2_coc = parseFloat(doc.hq_summary[i].p1_coc);
                    p2_soc = parseFloat(doc.hq_summary[i].p1_soc);
                }else{
                    p2_coc = parseFloat(doc.hq_summary[i].p2_coc);
                    p2_soc = parseFloat(doc.hq_summary[i].p2_soc);
                }
                wk5_coc = parseFloat(doc.hq_summary[i].wk5_coc);
                wk5_soc = parseFloat(doc.hq_summary[i].wk5_soc);

                if(wk5_coc != 0 && p2_coc != 0){
                    result = result + "<td style='BORDER-LEFT: gray 2px solid'>"+addPercentTovalue(((wk5_coc/p2_coc)*100).toFixed(0))+"</td>";
                }else{
                    result = result + "<td style='BORDER-LEFT: gray 2px solid'>&nbsp;</td>";
                }
                if(wk5_soc != 0 && p2_soc != 0){
                    result = result + "<td >"+addPercentTovalue(((wk5_soc/p2_soc)*100).toFixed(0))+"</td>";
                }else{
                    result = result + "<td >&nbsp;</td>";
                }

                result = result + "<td >"+addPercentTovalue((((wk5_coc+wk5_soc)/(p2_coc+p2_soc))*100).toFixed(0))+"</td>";

                if(check_fcast5wk == "Y"){
                    result = result + generateForecast(doc.hq_summary[i],loc_color);
                }
                
                result = result + "</tr>";

                index_detail = index_detail +1;


        }

        if(doc.hq_summary[i].header_detail == "H" && doc.hq_summary[i].count_detail == "0"){

            result = result + "<tr class=TableRightWhite >";

//            if(doc.hq_summary[i].count_detail != "0"){

//                result = result + "<td ><input type=button name=btn value=... onclick=\"showHideRow(\'"+doc.hq_summary[i].loc_office+"\',\'"+doc.hq_summary[i].count_detail+"\');\">"+doc.hq_summary[i].loc_office+"</td>";
//            }else{

                //Start #02
//                result = result + "<td style=text-align:left>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+doc.hq_summary[i].loc_office+"</td>";   //#01
                result = result + "<td style=text-align:left>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='/SMTWebApp/RrcStandardSrv?service=ui.smt.SmtLocSummaryReportSvc&pageAction=fromS5&p_location="+doc.hq_summary[i].loc_office+"&p_year=20" + doc.p_year + "&p_period=" + doc.p_period + "&p_week=" + doc.p_week + "&p_viewby=POL' style='color:"+loc_color+";'>"+doc.hq_summary[i].loc_office+"</a></td>";
                //End #02

//            }  <input type=hidden name="+doc.hq_summary[i].loc_office+" value="+doc.hq_summary[i].count_detail+">
            result = result + "<td >&nbsp;</td>";

            result = result + "<td style='BORDER-LEFT: gray 2px solid'>"+changeZeroToSpace(parseFloat(doc.hq_summary[i].p1_coc).toFixed(0))+"</td>";
            result = result + "<td >"+changeZeroToSpace(parseFloat(doc.hq_summary[i].p1_soc).toFixed(0))+"</td>";
            result = result + "<td >"+changeZeroToSpace(parseFloat(doc.hq_summary[i].p2_coc).toFixed(0))+"</td>";
            result = result + "<td >"+changeZeroToSpace(parseFloat(doc.hq_summary[i].p2_soc).toFixed(0))+"</td>";
            
            if(check_act5wk == "Y"){
                result = result + generateActual(doc.hq_summary[i]);
            }
            

            if(doc.hq_summary[i].p2_coc == "0" && doc.hq_summary[i].p2_soc == "0"){
                p2_coc = parseFloat(doc.hq_summary[i].p1_coc);
                p2_soc = parseFloat(doc.hq_summary[i].p1_soc);
            }else{
                p2_coc = parseFloat(doc.hq_summary[i].p2_coc);
                p2_soc = parseFloat(doc.hq_summary[i].p2_soc);
            }
            wk5_coc = parseFloat(doc.hq_summary[i].wk5_coc);
            wk5_soc = parseFloat(doc.hq_summary[i].wk5_soc);

            if(wk5_coc != 0 && p2_coc != 0){
                result = result + "<td style='BORDER-LEFT: gray 2px solid'>"+addPercentTovalue(((wk5_coc/p2_coc)*100).toFixed(0))+"</td>";
            }else{
                result = result + "<td style='BORDER-LEFT: gray 2px solid'>&nbsp;</td>";
            }
            if(wk5_soc != 0 && p2_soc != 0){
                result = result + "<td >"+addPercentTovalue(((wk5_soc/p2_soc)*100).toFixed(0))+"</td>";
            }else{
                result = result + "<td >&nbsp;</td>";
            }
            result = result + "<td >"+addPercentTovalue((((wk5_coc+wk5_soc)/(p2_coc+p2_soc))*100).toFixed(0))+"</td>";

            if(check_fcast5wk == "Y"){
                result = result + generateForecast(doc.hq_summary[i],loc_color);
            }
            
            result = result + "</tr>";

            index_detail = 0;


            sum_p1_coc = sum_p1_coc + parseFloat(doc.hq_summary[i].p1_coc);
            sum_p1_soc = sum_p1_soc + parseFloat(doc.hq_summary[i].p1_soc);
            sum_p2_coc = sum_p2_coc + parseFloat(doc.hq_summary[i].p2_coc);
            sum_p2_soc = sum_p2_soc + parseFloat(doc.hq_summary[i].p2_soc);
            sum_wk1_coc = sum_wk1_coc + parseFloat(doc.hq_summary[i].wk1_coc);
            sum_wk1_soc = sum_wk1_soc + parseFloat(doc.hq_summary[i].wk1_soc);
            sum_wk2_coc = sum_wk2_coc + parseFloat(doc.hq_summary[i].wk2_coc);
            sum_wk2_soc = sum_wk2_soc + parseFloat(doc.hq_summary[i].wk2_soc);
            sum_wk3_coc = sum_wk3_coc + parseFloat(doc.hq_summary[i].wk3_coc);
            sum_wk3_soc = sum_wk3_soc + parseFloat(doc.hq_summary[i].wk3_soc);
            sum_wk4_coc = sum_wk4_coc + parseFloat(doc.hq_summary[i].wk4_coc);
            sum_wk4_soc = sum_wk4_soc + parseFloat(doc.hq_summary[i].wk4_soc);
            sum_wk5_coc = sum_wk5_coc + parseFloat(doc.hq_summary[i].wk5_coc);
            sum_wk5_soc = sum_wk5_soc + parseFloat(doc.hq_summary[i].wk5_soc);
            
            sum_fcast_wk1_coc = sum_fcast_wk1_coc + parseFloat(doc.hq_summary[i].fcast_wk1_coc);
            sum_fcast_wk1_soc = sum_fcast_wk1_soc + parseFloat(doc.hq_summary[i].fcast_wk1_soc);
            sum_fcast_wk2_coc = sum_fcast_wk2_coc + parseFloat(doc.hq_summary[i].fcast_wk2_coc);
            sum_fcast_wk2_soc = sum_fcast_wk2_soc + parseFloat(doc.hq_summary[i].fcast_wk2_soc);
            sum_fcast_wk3_coc = sum_fcast_wk3_coc + parseFloat(doc.hq_summary[i].fcast_wk3_coc);
            sum_fcast_wk3_soc = sum_fcast_wk3_soc + parseFloat(doc.hq_summary[i].fcast_wk3_soc);
            sum_fcast_wk4_coc = sum_fcast_wk4_coc + parseFloat(doc.hq_summary[i].fcast_wk4_coc);
            sum_fcast_wk4_soc = sum_fcast_wk4_soc + parseFloat(doc.hq_summary[i].fcast_wk4_soc);
            sum_fcast_wk5_coc = sum_fcast_wk5_coc + parseFloat(doc.hq_summary[i].fcast_wk5_coc);
            sum_fcast_wk5_soc = sum_fcast_wk5_soc + parseFloat(doc.hq_summary[i].fcast_wk5_soc);



            grand_sum_p1_coc = grand_sum_p1_coc + parseFloat(doc.hq_summary[i].p1_coc);
            grand_sum_p1_soc = grand_sum_p1_soc + parseFloat(doc.hq_summary[i].p1_soc);
            grand_sum_p2_coc = grand_sum_p2_coc + parseFloat(doc.hq_summary[i].p2_coc);
            grand_sum_p2_soc = grand_sum_p2_soc + parseFloat(doc.hq_summary[i].p2_soc);
            grand_sum_wk1_coc = grand_sum_wk1_coc + parseFloat(doc.hq_summary[i].wk1_coc);
            grand_sum_wk1_soc = grand_sum_wk1_soc + parseFloat(doc.hq_summary[i].wk1_soc);
            grand_sum_wk2_coc = grand_sum_wk2_coc + parseFloat(doc.hq_summary[i].wk2_coc);
            grand_sum_wk2_soc = grand_sum_wk2_soc + parseFloat(doc.hq_summary[i].wk2_soc);
            grand_sum_wk3_coc = grand_sum_wk3_coc + parseFloat(doc.hq_summary[i].wk3_coc);
            grand_sum_wk3_soc = grand_sum_wk3_soc + parseFloat(doc.hq_summary[i].wk3_soc);
            grand_sum_wk4_coc = grand_sum_wk4_coc + parseFloat(doc.hq_summary[i].wk4_coc);
            grand_sum_wk4_soc = grand_sum_wk4_soc + parseFloat(doc.hq_summary[i].wk4_soc);
            grand_sum_wk5_coc = grand_sum_wk5_coc + parseFloat(doc.hq_summary[i].wk5_coc);
            grand_sum_wk5_soc = grand_sum_wk5_soc + parseFloat(doc.hq_summary[i].wk5_soc);
            
            grand_sum_fcast_wk1_coc = grand_sum_fcast_wk1_coc + parseFloat(doc.hq_summary[i].fcast_wk1_coc);
            grand_sum_fcast_wk1_soc = grand_sum_fcast_wk1_soc + parseFloat(doc.hq_summary[i].fcast_wk1_soc);
            grand_sum_fcast_wk2_coc = grand_sum_fcast_wk2_coc + parseFloat(doc.hq_summary[i].fcast_wk2_coc);
            grand_sum_fcast_wk2_soc = grand_sum_fcast_wk2_soc + parseFloat(doc.hq_summary[i].fcast_wk2_soc);
            grand_sum_fcast_wk3_coc = grand_sum_fcast_wk3_coc + parseFloat(doc.hq_summary[i].fcast_wk3_coc);
            grand_sum_fcast_wk3_soc = grand_sum_fcast_wk3_soc + parseFloat(doc.hq_summary[i].fcast_wk3_soc);
            grand_sum_fcast_wk4_coc = grand_sum_fcast_wk4_coc + parseFloat(doc.hq_summary[i].fcast_wk4_coc);
            grand_sum_fcast_wk4_soc = grand_sum_fcast_wk4_soc + parseFloat(doc.hq_summary[i].fcast_wk4_soc);
            grand_sum_fcast_wk5_coc = grand_sum_fcast_wk5_coc + parseFloat(doc.hq_summary[i].fcast_wk5_coc);
            grand_sum_fcast_wk5_soc = grand_sum_fcast_wk5_soc + parseFloat(doc.hq_summary[i].fcast_wk5_soc);



        }else if(doc.hq_summary[i].header_detail == "D"){

            result = result + "<tr class=TableRightWhite style='display:none;'  id="+doc.hq_summary[i].loc_office+index_detail+">";
            result = result + "<td >&nbsp;</td>";
            result = result + "<td style='text-align:left;color:"+loc_color+";'>"+changeZeroToSpace(doc.hq_summary[i].pol_pod)+"</td>";
            result = result + "<td style='BORDER-LEFT: gray 2px solid'>"+changeZeroToSpace(parseFloat(doc.hq_summary[i].p1_coc).toFixed(0))+"</td>";
            result = result + "<td >"+changeZeroToSpace(parseFloat(doc.hq_summary[i].p1_soc).toFixed(0))+"</td>";
            result = result + "<td >"+changeZeroToSpace(parseFloat(doc.hq_summary[i].p2_coc).toFixed(0))+"</td>";
            result = result + "<td >"+changeZeroToSpace(parseFloat(doc.hq_summary[i].p2_soc).toFixed(0))+"</td>";
            
            if(check_act5wk == "Y"){
                result = result + generateActual(doc.hq_summary[i]);
            }

            if(doc.hq_summary[i].p2_coc == "0" && doc.hq_summary[i].p2_soc == "0"){
                p2_coc = parseFloat(doc.hq_summary[i].p1_coc);
                p2_soc = parseFloat(doc.hq_summary[i].p1_soc);
            }else{
                p2_coc = parseFloat(doc.hq_summary[i].p2_coc);
                p2_soc = parseFloat(doc.hq_summary[i].p2_soc);
            }
            wk5_coc = parseFloat(doc.hq_summary[i].wk5_coc);
            wk5_soc = parseFloat(doc.hq_summary[i].wk5_soc);

            if(wk5_coc != 0 && p2_coc != 0){
                result = result + "<td style='BORDER-LEFT: gray 2px solid'>"+addPercentTovalue(((wk5_coc/p2_coc)*100).toFixed(0))+"</td>";
            }else{
                result = result + "<td style='BORDER-LEFT: gray 2px solid'>&nbsp;</td>";
            }
            if(wk5_soc != 0 && p2_soc != 0){
                result = result + "<td >"+addPercentTovalue(((wk5_soc/p2_soc)*100).toFixed(0))+"</td>";
            }else{
                result = result + "<td >&nbsp;</td>";
            }

            result = result + "<td >"+addPercentTovalue((((wk5_coc+wk5_soc)/(p2_coc+p2_soc))*100).toFixed(0))+"</td>";

            if(check_fcast5wk == "Y"){
                result = result + generateForecast(doc.hq_summary[i],loc_color);
            }
            
            result = result + "</tr>";

            index_detail = index_detail +1;


        }else if(doc.hq_summary[i].header_detail != "H" && doc.hq_summary[i].header_detail != "D"){
        }

            if(i == doc.hq_summary.length-1){
                result = result + "<tr >";
                result = result + "<td  colspan=2 style=text-align:center;color:#000000 class=TableLeftSub>Total</td>";
                result = result + "<td class=TableRightSub style='color:#000000; BORDER-LEFT: gray 2px solid'>"+changeZeroToSpace(sum_p1_coc.toFixed(0))+"</td>";
                result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_p1_soc.toFixed(0))+"</td>";
                result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_p2_coc.toFixed(0))+"</td>";
                result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_p2_soc.toFixed(0))+"</td>";
                
                if(check_act5wk == "Y"){
                    result = result + "<td class=TableRightSub style='color:#000000; BORDER-LEFT: gray 2px solid'>"+changeZeroToSpace(sum_wk1_coc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_wk1_soc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_wk2_coc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_wk2_soc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_wk3_coc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_wk3_soc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_wk4_coc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_wk4_soc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_wk5_coc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_wk5_soc.toFixed(0))+"</td>";
                }
                
                if(sum_p2_coc == 0 && sum_p2_soc == 0){
                    if(sum_wk5_coc != 0 && sum_p1_coc != 0){
                        result = result + "<td class=TableRightSub style='color:#000000; BORDER-LEFT: gray 2px solid'>"+addPercentTovalue(((sum_wk5_coc/sum_p1_coc)*100).toFixed(0))+"</td>";
                    }else{
                        result = result + "<td class=TableRightSub style='color:#000000; BORDER-LEFT: gray 2px solid'>&nbsp;</td>";
                    }
                    if(sum_wk5_soc != 0 && sum_p1_soc != 0){
                        result = result + "<td class=TableRightSub style=color:#000000>"+addPercentTovalue(((sum_wk5_soc/sum_p1_soc)*100).toFixed(0))+"</td>";
                    }else{
                        result = result + "<td class=TableRightSub style=color:#000000>&nbsp;</td>";
                    }
//                    result = result + "<td >"+((sum_wk5_coc/sum_p1_coc)*100).toFixed(2)+"%"+"</td>";
//                    result = result + "<td >"+((sum_wk5_soc/sum_p1_soc)*100).toFixed(2)+"%"+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+addPercentTovalue((((sum_wk5_coc+sum_wk5_soc)/(sum_p1_coc+sum_p1_soc))*100).toFixed(0))+"</td>";
                }else{
                    if(sum_wk5_coc != 0 && sum_p2_coc != 0){
                        result = result + "<td class=TableRightSub style='color:#000000; BORDER-LEFT: gray 2px solid'>"+addPercentTovalue(((sum_wk5_coc/sum_p2_coc)*100).toFixed(0))+"</td>";
                    }else{
                        result = result + "<td class=TableRightSub style='color:#000000; BORDER-LEFT: gray 2px solid'>&nbsp;</td>";
                    }
                    if(sum_wk5_soc != 0 && sum_p2_soc != 0){
                        result = result + "<td class=TableRightSub style=color:#000000>"+addPercentTovalue(((sum_wk5_soc/sum_p2_soc)*100).toFixed(0))+"</td>";
                    }else{
                        result = result + "<td class=TableRightSub style=color:#000000>&nbsp;</td>";
                    }
//                    result = result + "<td >"+((sum_wk5_coc/sum_p2_coc)*100).toFixed(2)+"%"+"</td>";
//                    result = result + "<td >"+((sum_wk5_soc/sum_p2_soc)*100).toFixed(2)+"%"+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+addPercentTovalue((((sum_wk5_coc+sum_wk5_soc)/(sum_p2_coc+sum_p2_soc))*100).toFixed(0))+"</td>";
                }
                
                if(check_fcast5wk == "Y"){
                    result = result + "<td class=TableRightSub style='color:#000000; BORDER-LEFT: gray 2px solid'>"+changeZeroToSpace(sum_fcast_wk1_coc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_fcast_wk1_soc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_fcast_wk2_coc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_fcast_wk2_soc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_fcast_wk3_coc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_fcast_wk3_soc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_fcast_wk4_coc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_fcast_wk4_soc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_fcast_wk5_coc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(sum_fcast_wk5_soc.toFixed(0))+"</td>";
                }
                
                //class=TableLeftWhite style=background:#d8d8d8
                result = result + "</tr>";
                result = result + "<tr style=color:#FFFFFF>";
                result = result + "<td  colspan=2 style=text-align:center;color:#000000 class=TableLeftSub>Grand Total</td>";
                result = result + "<td class=TableRightSub style='color:#000000; BORDER-LEFT: gray 2px solid'>"+changeZeroToSpace(grand_sum_p1_coc.toFixed(0))+"</td>";
                result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(grand_sum_p1_soc.toFixed(0))+"</td>";
                result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(grand_sum_p2_coc.toFixed(0))+"</td>";
                result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(grand_sum_p2_soc.toFixed(0))+"</td>";
                
                if(check_act5wk == "Y"){
                    result = result + "<td class=TableRightSub style='color:#000000; BORDER-LEFT: gray 2px solid'>"+changeZeroToSpace(grand_sum_wk1_coc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(grand_sum_wk1_soc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(grand_sum_wk2_coc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(grand_sum_wk2_soc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(grand_sum_wk3_coc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(grand_sum_wk3_soc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(grand_sum_wk4_coc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(grand_sum_wk4_soc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(grand_sum_wk5_coc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(grand_sum_wk5_soc.toFixed(0))+"</td>";
                }
                
                var p_grand = 0;
                if(grand_sum_p2_coc == 0 && grand_sum_p2_soc == 0){
                    if(grand_sum_wk5_coc != 0 && grand_sum_p1_coc != 0){
                        result = result + "<td class=TableRightSub style='color:#000000; BORDER-LEFT: gray 2px solid'>"+addPercentTovalue(((grand_sum_wk5_coc/grand_sum_p1_coc)*100).toFixed(0))+"</td>";
                    }else{
                        result = result + "<td class=TableRightSub style='color:#000000; BORDER-LEFT: gray 2px solid'>&nbsp;</td>";
                    }
                    if(grand_sum_wk5_soc != 0 && grand_sum_p1_soc != 0){
                        result = result + "<td class=TableRightSub style=color:#000000>"+addPercentTovalue(((grand_sum_wk5_soc/grand_sum_p1_soc)*100).toFixed(0))+"</td>";
                    }else{
                        result = result + "<td class=TableRightSub style=color:#000000>&nbsp;</td>";
                    }
                    p_grand = ((grand_sum_wk5_coc+grand_sum_wk5_soc)/(grand_sum_p1_coc+grand_sum_p1_soc))*100 ;
                }else{
                    if(grand_sum_wk5_coc != 0 && grand_sum_p2_coc != 0){
                        result = result + "<td class=TableRightSub style='color:#000000; BORDER-LEFT: gray 2px solid'>"+addPercentTovalue(((grand_sum_wk5_coc/grand_sum_p2_coc)*100).toFixed(0))+"</td>";
                    }else{
                        result = result + "<td class=TableRightSub style='color:#000000; BORDER-LEFT: gray 2px solid'>&nbsp;</td>";
                    }
                    if(grand_sum_wk5_soc != 0 && grand_sum_p2_soc != 0){
                        result = result + "<td class=TableRightSub style=color:#000000>"+addPercentTovalue(((grand_sum_wk5_soc/grand_sum_p2_soc)*100).toFixed(0))+"</td>";
                    }else{
                        result = result + "<td class=TableRightSub style=color:#000000>&nbsp;</td>";
                    }
                    p_grand = ((grand_sum_wk5_coc+grand_sum_wk5_soc)/(grand_sum_p2_coc+grand_sum_p2_soc))*100 ;
                }

                result = result + "<td class=TableRightSub style=color:#000000>"+addPercentTovalue(p_grand.toFixed(0))+"</td>";
                
                if(check_fcast5wk == "Y"){
                    result = result + "<td class=TableRightSub style='color:#000000; BORDER-LEFT: gray 2px solid'>"+changeZeroToSpace(grand_sum_fcast_wk1_coc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(grand_sum_fcast_wk1_soc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(grand_sum_fcast_wk2_coc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(grand_sum_fcast_wk2_soc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(grand_sum_fcast_wk3_coc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(grand_sum_fcast_wk3_soc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(grand_sum_fcast_wk4_coc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(grand_sum_fcast_wk4_soc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(grand_sum_fcast_wk5_coc.toFixed(0))+"</td>";
                    result = result + "<td class=TableRightSub style=color:#000000>"+changeZeroToSpace(grand_sum_fcast_wk5_soc.toFixed(0))+"</td>";
                }
                
                result = result + "</tr>";
            }

    }

    result = result + "</table>";
    result = result + "</div>"; //width:325px;

    result = result + "</td>";
    result = result + "</tr>";
    result = result + "</table>";
    result = result + "</td>";
    result = result + "</tr>";
    result = result + "</table>";
    result = result + "</form>";


//    alert(result.substring(0, 500));
//    alert(result.substring(500));

    }catch(err){
//        alert(err);
    }
    return result;

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

function showHideRow(name,value,count){
//alert(name);
//alert(value);
var p_img = eval("document.getElementById(\'img"+count+"\')");

    for(i = 0 ; i < parseInt(value) ; i++){
    //    alert(i);

        var s = eval("document.getElementById(\'"+name+i+"\')");

    //    alert(":"+s.style.display);

        if(s.style.display == "inline"){
            s.style.display = 'none';
            s.style.width = '20px';
            s.style.height = '20px';
            p_img.value = " + ";
    //        p_img.src = "/SMTWebApp/images/btnArrowDown.gif";
        }else{
            s.style.display = 'inline';
            s.style.width = '20px';
            s.style.height = '20px';
            p_img.value = " - ";
    //        p_img.src = "/SMTWebApp/images/btnArrowNext.gif";
        }
    }
}

function inputValue(frm,name,value){
    var length_detail = eval(frm+"."+name);
//    alert(length_detail);
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

function generateActual(doc){
    var result = "";
        
        result = result + "<td style='text-align:right; BORDER-LEFT: gray 2px solid;'>"+changeZeroToSpace(parseFloat(doc.wk1_coc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.wk1_soc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.wk2_coc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.wk2_soc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.wk3_coc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.wk3_soc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.wk4_coc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.wk4_soc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.wk5_coc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.wk5_soc).toFixed(0))+"</td>";
      
    return result;
}


function generateForecast(doc,fontColor){
    var result = "";
        result = result + "<td style='text-align:right; BORDER-LEFT: gray 2px solid;color:"+fontColor+";'>"+changeZeroToSpace(parseFloat(doc.fcast_wk1_coc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;color:"+fontColor+";'>"+changeZeroToSpace(parseFloat(doc.fcast_wk1_soc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;color:"+fontColor+";'>"+changeZeroToSpace(parseFloat(doc.fcast_wk2_coc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;color:"+fontColor+";'>"+changeZeroToSpace(parseFloat(doc.fcast_wk2_soc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;color:"+fontColor+";'>"+changeZeroToSpace(parseFloat(doc.fcast_wk3_coc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;color:"+fontColor+";'>"+changeZeroToSpace(parseFloat(doc.fcast_wk3_soc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;color:"+fontColor+";'>"+changeZeroToSpace(parseFloat(doc.fcast_wk4_coc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;color:"+fontColor+";'>"+changeZeroToSpace(parseFloat(doc.fcast_wk4_soc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;color:"+fontColor+";'>"+changeZeroToSpace(parseFloat(doc.fcast_wk5_coc).toFixed(0))+"</td>";
        result = result + "<td style='text-align:right;color:"+fontColor+";'>"+changeZeroToSpace(parseFloat(doc.fcast_wk5_soc).toFixed(0))+"</td>";
        
    return result;
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
