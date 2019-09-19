/*-----------------------------------------------------------------------------------------------------------
LocSummaryReport.js
-------------------------------------------------------------------------------------------------------------
Copyright RCL Public Co., Ltd. 2007
-------------------------------------------------------------------------------------------------------------
Author  25/01/2016
- Change Log ------------------------------------------------------------------------------------------------
##  DD/MM/YY       -User-     -TaskRef-      -Short Description
01  25/01/16    PONAPR1                     display BSA
02  27/01/16    PONAPR1                     change width for header
03  27/01/16    PONAPR1                     Hide POR.POT1.POT2.PLD Header & detail
04  21/03/16    Watchakorn                  remove cellspacing and add background-color
-----------------------------------------------------------------------------------------------------------*/
function getPeriod(record) {
    try {
//    alert("record.value "+record.value);
        var xmlHttpRequest = getXMLHttpRequest();
        xmlHttpRequest.onreadystatechange = getReadyStateHandlerPeriod(xmlHttpRequest, record);
        xmlHttpRequest.open("POST", "/SMTWebApp/RrcStandardSrv?service=ui.smt.SmtLocSummaryReportSvc", true);
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
        xmlHttpRequest.open("POST", "/SMTWebApp/RrcStandardSrv?service=ui.smt.SmtLocSummaryReportSvc", true);
        xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlHttpRequest.send("pageAction=getWeek&period="+record.value);
    } catch (err) {
    }
}

function getLocGeneral(frm) {
    try {
//    alert("p_region "+p_region);
//    alert("p_year "+p_year);
//    alert("p_period "+p_period);
//    alert("p_week "+p_week);
        var p_location = frm.tbx_location.value;
        var p_year = frm.cmbYear.value;
        var p_period = frm.cmbPeriod.value;
        var p_week = frm.cmbWeek.value;
        var view_by = frm.cmbViewBy.value;
        var coc_soc = frm.cmbCoc.value;
        var cargo_type = frm.cmbCargo.value;
        var size20="Y";
        var size40="Y";
        var size_teu="Y";
        var size_weight="Y";
        var size_act5wk="Y";
        var size_fcast5wk="Y";
        var por="Y";
        var pot1="Y";
        var pot2="Y";
        var pld="Y";
        var pageAction = "getLocGeneralPolPod";
        var potion = "getLocGeneral";
//        alert("view_by "+view_by);

        if(view_by == "SERVICE"){
            potion = "getLocService";
            pageAction = "getLocGeneralService";
        }

        size20 = frm.chk_20;
        size40 = frm.chk_40;
        size_teu = frm.chk_teu;
        size_weight = frm.chk_weight;
        size_act5wk = frm.chk_act5wk;
        size_fcast5wk = frm.chk_fcast5wk;

        por = frm.chk_por;
        pot1 = frm.chk_pot1;
        pot2 = frm.chk_pot2;
        pld = frm.chk_pld;

        var url = "pageAction="+pageAction +
                    "&p_year="+p_year +
                    "&p_period="+p_period +
                    "&p_location="+p_location +
                    "&p_week="+p_week +
                    "&p_coc="+coc_soc +
                    "&p_cargo="+cargo_type +
                    "&p_viewby="+view_by +
                    "&size_20=" + ((size20.checked == true)?size20.value:"N") +
                    "&size_40=" + ((size40.checked == true)?size40.value:"N") +
                    "&size_teu=" + ((size_teu.checked == true)?size_teu.value:"N") +
                    "&size_weight=" + ((size_weight.checked == true)?size_weight.value:"N") +
                    "&size_act5wk=" + ((size_act5wk.checked == true)?size_act5wk.value:"N") +
                    "&size_fcast5wk=" + ((size_fcast5wk.checked == true)?size_fcast5wk.value:"N") +
                    "&por=" + ((por.checked == true)?por.value:"N") +
                    "&pot1=" + ((pot1.checked == true)?pot1.value:"N") +
                    "&pot2=" + ((pot2.checked == true)?pot2.value:"N") +
                    "&pld=" + ((pld.checked == true)?pld.value:"N") ;

//        alert("url"+url);
        var xmlHttpRequest = getXMLHttpRequest();
        xmlHttpRequest.onreadystatechange = getReadyStateHandler(xmlHttpRequest, potion);
        xmlHttpRequest.open("POST", "/SMTWebApp/RrcStandardSrv?service=ui.smt.SmtLocSummaryReportSvc", true);
        xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlHttpRequest.send(url);
    } catch (err) {
    alert("err "+err.message);
    }
}


function getLocSummary(frm) {
    try {
        var pageAction = "getLocSummary";
        var url = "pageAction="+pageAction ;

        var xmlHttpRequest = getXMLHttpRequest();
        xmlHttpRequest.onreadystatechange = getReadyStateHandler(xmlHttpRequest, "getLocSummary");
        xmlHttpRequest.open("POST", "/SMTWebApp/RrcStandardSrv?service=ui.smt.SmtLocSummaryReportSvc", true);
        xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlHttpRequest.send(url);
    } catch (err) {
    alert("err "+err);
    }
}

function getReadyStateHandler(xmlHttpRequest, portion) {

    return function() {
//    alert("portion "+portion);
        if (portion == "getLocGeneral") {

            document.getElementById("display_loc_general").innerHTML = "Loading ...";
//            document.getElementById("display_tos_header").innerHTML = "<img src=/TOSWebApp/images/loading.gif height=45 style=position: absolute; left: 100px; top: 50px;>";
//            document.getElementById("display_tos_operation").innerHTML = "";
//            document.getElementById("display_tos_activities").innerHTML = "";
//            alert(xmlHttpRequest.status);
            if (xmlHttpRequest.readyState == 4) {
              if (xmlHttpRequest.status == 200) {

                var doc = eval('(' + xmlHttpRequest.responseText + ')');
//                alert(""+generateHTML_Loc_General(doc));
                document.getElementById("display_loc_general").innerHTML = generateHTML_Loc_General(doc); //xmlHttpRequest.responseText;

              } else {
                alert("HTTP error " + xmlHttpRequest.status + ": " + xmlHttpRequest.statusText);
              }
            }
        }else if (portion == "getLocService") {

            document.getElementById("display_loc_general").innerHTML = "Processing ...";
//            document.getElementById("display_tos_header").innerHTML = "<img src=/TOSWebApp/images/loading.gif height=45 style=position: absolute; left: 100px; top: 50px;>";
//            document.getElementById("display_tos_operation").innerHTML = "";
//            document.getElementById("display_tos_activities").innerHTML = "";
//            alert(xmlHttpRequest.status);
            if (xmlHttpRequest.readyState == 4) {
              if (xmlHttpRequest.status == 200) {

                var doc = eval('(' + xmlHttpRequest.responseText + ')');
//                alert(""+generateHTML_Loc_General(doc));
                document.getElementById("display_loc_general").innerHTML = generateHTML_Loc_General_Service(doc); //xmlHttpRequest.responseText;

              } else {
                alert("HTTP error " + xmlHttpRequest.status + ": " + xmlHttpRequest.statusText);
              }
            }
        }else if (portion == "getLocSummary") {

            document.getElementById("display_loc_summary").innerHTML = "Processing ...";
//            document.getElementById("display_tos_header").innerHTML = "<img src=/TOSWebApp/images/loading.gif height=45 style=position: absolute; left: 100px; top: 50px;>";
//            document.getElementById("display_tos_operation").innerHTML = "";
//            document.getElementById("display_tos_activities").innerHTML = "";
//            alert(xmlHttpRequest.status);
            if (xmlHttpRequest.readyState == 4) {
              if (xmlHttpRequest.status == 200) {

                var doc = eval('(' + xmlHttpRequest.responseText + ')');
//                alert(""+generateHTML_Loc_General(doc));
                document.getElementById("display_loc_summary").innerHTML = generateHTML_Loc_Summary(doc); //xmlHttpRequest.responseText;

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

function generateHTML_Loc_General(doc){

    try{
    var result = "";
    var check_20 = "N";
    var check_40 = "N";
    var check_teu = "N";
    var check_weight = "N";
    var check_act5wk = "N";
    var check_fcast5wk = "N";
    var check_por = "Y";
    var check_pot1= "Y";
    var check_pot2 = "Y";
    var check_pld = "Y";

    var region_count_detail = 0;

    check_20 = doc.check_20;
    check_40 = doc.check_40;
    check_teu = doc.check_teu;
    check_weight = doc.check_weight;

    check_act5wk = doc.check_act5wk;
    check_fcast5wk = doc.check_fcast5wk;

    check_por = doc.check_por;
    check_pot1 = doc.check_pot1;
    check_pot2 = doc.check_pot2;
    check_pld = doc.check_pld;

    var param_week = parseInt(doc.p_week);

    var maxWeek = 52;

//    alert("check_20:"+check_20);
//    alert("check_40:"+check_40);
//    alert("check_teu:"+check_teu);
//    alert("check_weight:"+check_weight);
//    alert("check_act5wk:"+check_act5wk);
//    alert("check_fcast5wk:"+check_fcast5wk);

    var count_merge = 0;

    if(check_20 == "Y"){
        count_merge = count_merge + 1;
    }
    if(check_40 == "Y"){
        count_merge = count_merge + 1;
    }
    if(check_teu == "Y"){
        count_merge = count_merge + 1;
    }
    if(check_weight == "Y"){
        count_merge = count_merge + 1;
    }

//    alert("count_merge:"+count_merge);
//    result = result + "<form method=post name=frm_loc_summary STYLE=margin: 0px; padding: 0px;>";

//    result = result + "<table border=0 cellpadding=0 cellspacing=1 width=100%>";
//    result = result + "<tr><td width=100% class=TableLeftText>Location Summary Report</td></tr>";
//    result = result + "</table>";
    //rowspan=2
//    result = result + "<div style='overflow: auto; height: 294px; width: 99.9%;'>";
    result = result + "<table border=1 cellpadding=0 cellspacing=0 width=100% id=tableHeader style='border-collapse: collapse; BORDER: gray 2px solid;'>"; //#04
    result = result + "<tr class=FreezedHeader >";
    result = result + "<td class=FreezedHeader2 nowrap rowspan='2' style='width: auto;'><a style='width:20'></a></td>";     //#02
//    result = result + "<td class=FreezedHeader2 nowrap rowspan='2'><a>POR</a></td>";
//    result = result + "<td class=FreezedHeader2 nowrap rowspan='2'><a>POL</a></td>";
//    result = result + "<td class=FreezedHeader2 nowrap rowspan='2'><a>POT1</a></td>";
//    result = result + "<td class=FreezedHeader2 nowrap rowspan='2'><a>POT2</a></td>";
//    result = result + "<td class=FreezedHeader2 nowrap rowspan='2'><a>POD</a></td>";
//    result = result + "<td class=FreezedHeader2 nowrap rowspan='2'><a>PLD</a></td>";
//    result = result + "<td class=FreezedHeader2 nowrap rowspan='2'><a>C/S</a></td>";
//    result = result + "<td class=FreezedHeader2 nowrap rowspan='2'><a>CGO</a></td>";

    //#Start 03
    if(check_por == "N" && check_pot1 == "N" && check_pot2 == "N"){
        result = result + "<td class=FreezedHeader2 nowrap rowspan='2' colspan=4 style='width:20% !important;'><a>POL</a></td>";
    }else if(check_por == "N" && check_pot1 == "N" && check_pot2 == "Y"){
        result = result + "<td class=FreezedHeader2 nowrap rowspan='2' colspan=2 style='width:10% !important;'><a>POL</a></td>";
        result = result + "<td class=FreezedHeader2 nowrap rowspan='2' colspan=2 style='width:10% !important;'><a>POT2</a></td>";
    }else if(check_por == "N" && check_pot1 == "Y" && check_pot2 == "N"){
        result = result + "<td class=FreezedHeader2 nowrap rowspan='2' colspan=2 style='width:10% !important;'><a>POL</a></td>";
        result = result + "<td class=FreezedHeader2 nowrap rowspan='2' colspan=2 style='width:10% !important;'><a>POT1</a></td>";
    }else if(check_por == "Y" && check_pot1 == "N" && check_pot2 == "N"){
        result = result + "<td class=FreezedHeader2 nowrap rowspan='2'><a>POR</a></td>";
        result = result + "<td class=FreezedHeader2 nowrap rowspan='2' colspan=3 style='width:15% !important;' ><a>POL</a></td>";
    }else if(check_por == "N" && check_pot1 == "Y" && check_pot2 == "Y"){
        result = result + "<td class=FreezedHeader2 nowrap rowspan='2' colspan=2 style='width:10% !important;' ><a>POL</a></td>";
        result = result + "<td class=FreezedHeader2 nowrap rowspan='2'><a>POT1</a></td>";
        result = result + "<td class=FreezedHeader2 nowrap rowspan='2'><a>POT2</a></td>";
    }else if(check_por == "Y" && check_pot1 == "N" && check_pot2 == "Y"){
        result = result + "<td class=FreezedHeader2 nowrap rowspan='2'><a>POR</a></td>";
        result = result + "<td class=FreezedHeader2 nowrap rowspan='2' colspan=2 style='width:10% !important;' ><a>POL</a></td>";
        result = result + "<td class=FreezedHeader2 nowrap rowspan='2'><a>POT2</a></td>";
    }else if(check_por == "Y" && check_pot1 == "Y" && check_pot2 == "N"){
        result = result + "<td class=FreezedHeader2 nowrap rowspan='2'><a>POR</a></td>";
        result = result + "<td class=FreezedHeader2 nowrap rowspan='2'><a>POL</a></td>";
        result = result + "<td class=FreezedHeader2 nowrap rowspan='2' colspan=2 style='width:10% !important;' ><a>POT1</a></td>";
    }else{
        result = result + "<td class=FreezedHeader2 nowrap rowspan='2'><a>POR</a></td>";
        result = result + "<td class=FreezedHeader2 nowrap rowspan='2'><a>POL</a></td>";
        result = result + "<td class=FreezedHeader2 nowrap rowspan='2'><a>POT1</a></td>";
        result = result + "<td class=FreezedHeader2 nowrap rowspan='2'><a>POT2</a></td>";
    }

    if(check_pld == "N"){
        result = result + "<td class=FreezedHeader2 nowrap rowspan='2' colspan=2 style='width:10% !important;' ><a>POD</a></td>";
    }else{
        result = result + "<td class=FreezedHeader2 nowrap rowspan='2'><a>POD</a></td>";
        result = result + "<td class=FreezedHeader2 nowrap rowspan='2'><a>PLD</a></td>";
    }

    result = result + "<td class=FreezedHeader2 nowrap rowspan='2'><a>C/S</a></td>";
    result = result + "<td class=FreezedHeader2 nowrap rowspan='2' style='BORDER-RIGHT: gray 2px solid'><a>CGO</a></td>";

    //#End 03
//    if(check_act5wk == "Y"){
//        if(count_merge == 1){
//            result = result + "<td class=TableCenterSub >Act Wk1</td>";
//            result = result + "<td class=TableCenterSub >Act Wk2</td>";
//            result = result + "<td class=TableCenterSub >Act Wk3</td>";
//            result = result + "<td class=TableCenterSub >Act Wk4</td>";
//        }else{
//            result = result + "<td class=TableCenterSubNoBottom colspan="+count_merge+">Act Wk"+(param_week-4)+"</td>";
//            result = result + "<td class=TableCenterSubNoBottom colspan="+count_merge+">Act Wk"+(param_week-3)+"</td>";
//            result = result + "<td class=TableCenterSubNoBottom colspan="+count_merge+">Act Wk"+(param_week-2)+"</td>";
//            result = result + "<td class=TableCenterSubNoBottom colspan="+count_merge+">Act Wk"+(param_week-1)+"</td>";
//        }
//    }

    if(check_act5wk == "Y"){
//        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(param_week-4)+"</td>";
//        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(param_week-3)+"</td>";
//        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(param_week-2)+"</td>";
//        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(param_week-1)+"</td>";

        if((param_week-4) <= 0) {
            if((param_week-4) == 0) {
                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(maxWeek)+"</td>";
            }else if((param_week-4) == -1){
                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(maxWeek-1)+"</td>";
            }else if((param_week-4) == -2){
                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(maxWeek-2)+"</td>";
            }else{
                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(maxWeek-3)+"</td>";
            }
        }else{
            result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(param_week-4)+"</td>";
        }

        if((param_week-3) <= 0) {
            if((param_week-3) == 0) {
                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(maxWeek)+"</td>";
            }else if((param_week-3) == -1){
                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(maxWeek-1)+"</td>";
            }else if((param_week-3) == -2){
                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(maxWeek-2)+"</td>";
            }else{
                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(maxWeek-3)+"</td>";
            }
        }else{
            result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(param_week-3)+"</td>";
        }

        if((param_week-2) <= 0) {
            if((param_week-2) == 0) {
                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(maxWeek)+"</td>";
            }else if((param_week-2) == -1){
                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(maxWeek-1)+"</td>";
            }else if((param_week-2) == -2){
                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(maxWeek-2)+"</td>";
            }else{
                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(maxWeek-3)+"</td>";
            }
        }else{
            result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(param_week-2)+"</td>";
        }

        if((param_week-1) <= 0) {
            result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(maxWeek)+"</td>";
        }else{
            result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(param_week-1)+"</td>";
        }
    }

//#01    result = result + "<td class=TableCenterSubNoBottom  ><a style='width:80'>BSA [TEU]</a></td>";
//#01    result = result + "<td class=TableCenterSubNoBottom ><a style='width:80'>BSA [mT]</a></td>";
    result = result + "<td class=TableCenterSubNoBottom colspan=2 style='BORDER-LEFT: gray 2px solid;'>BSA</td>";

//    if(count_merge == 1){
//        result = result + "<td class=TableCenterSub >Act Wk5</td>";
//    }else{
//        result = result + "<td class=TableCenterSub colspan="+count_merge+">Act Wk"+param_week+"</td>";
//    }

    result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+" style='BORDER-LEFT: gray 2px solid;'>Act Wk"+param_week+"</td>";

    if(check_fcast5wk == "Y"){
//        if(count_merge == 1){
//            result = result + "<td class=TableCenterSub >F Cast Wk"+param_week +"</td>";
//            result = result + "<td class=TableCenterSub >F Cast Wk"+(param_week+1)+"</td>";
//            result = result + "<td class=TableCenterSub >F Cast Wk"+(param_week+2)+"</td>";
//            result = result + "<td class=TableCenterSub >F Cast Wk"+(param_week+3)+"</td>";
//            result = result + "<td class=TableCenterSub >F Cast Wk"+(param_week+4)+"</td>";
//        }else{
//            result = result + "<td class=TableCenterSubNoBottom colspan="+count_merge+">F Cast Wk"+(param_week)+"</td>";
//            result = result + "<td class=TableCenterSubNoBottom colspan="+count_merge+">F Cast Wk"+(param_week+1)+"</td>";
//            result = result + "<td class=TableCenterSubNoBottom colspan="+count_merge+">F Cast Wk"+(param_week+2)+"</td>";
//            result = result + "<td class=TableCenterSubNoBottom colspan="+count_merge+">F Cast Wk"+(param_week+3)+"</td>";
//            result = result + "<td class=TableCenterSubNoBottom colspan="+count_merge+">F Cast Wk"+(param_week+4)+"</td>";
//        }
        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">F Cast Wk"+(param_week+1)+"</td>";
        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">F Cast Wk"+(param_week+2)+"</td>";
        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">F Cast Wk"+(param_week+3)+"</td>";
        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">F Cast Wk"+(param_week+4)+"</td>";
        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">F Cast Wk"+(param_week+5)+"</td>";
    }
    result = result + "<td class=TableCenterSubNoBottom width=10% style=' BORDER-LEFT: gray 2px solid;'><a>Act Wk"+param_week+"</a></td>";
    result = result + "<td class=TableCenterSubNoBottom width=10%  ><a>Avg 5wk</a></td>";

    result = result + "</tr>";

    result = result + "<tr >";

    if(check_act5wk == "Y"){
        result = result + generateCondiotion(check_20,check_40,check_teu,check_weight);
        result = result + generateCondiotion(check_20,check_40,check_teu,check_weight);
        result = result + generateCondiotion(check_20,check_40,check_teu,check_weight);
        result = result + generateCondiotion(check_20,check_40,check_teu,check_weight);
    }

    result = result + "<td class=TableCenterSub  width=5% style='BORDER-LEFT: gray 2px solid;'><a>[TEU]</a></td>"; //#01
    result = result + "<td class=TableCenterSub  width=5% style='BORDER-RIGHT: gray 2px solid;'><a>[mT]</a></td>";  //#01
    result = result + generateCondiotion(check_20,check_40,check_teu,check_weight);
    if(check_fcast5wk == "Y"){
        result = result + generateCondiotion(check_20,check_40,check_teu,check_weight);
        result = result + generateCondiotion(check_20,check_40,check_teu,check_weight);
        result = result + generateCondiotion(check_20,check_40,check_teu,check_weight);
        result = result + generateCondiotion(check_20,check_40,check_teu,check_weight);
        result = result + generateCondiotion(check_20,check_40,check_teu,check_weight);
    }
    result = result + "<td class=TableCenterSub style='BORDER-LEFT: gray 2px solid;'><a style='width:50;'># Cust</a></td>";
    result = result + "<td class=TableCenterSub  ><a style='width:50'># Actv Cust</a></td>";
    result = result + "</tr>";
    for(hdr = 0 ; hdr < doc.loc_header.length ; hdr++){
      /*#04 Begin*/
      var even = "style='background-color: #F2F5F9;'";
      if( (hdr % 2) == 1){
        result = result + "<tr class=TableLeftWhite " + even + ">";
      } else {
        result = result + "<tr class=TableLeftWhite >";
      }
      /*#04 end*/

    if(doc.loc_header[hdr].cust_detail != null && doc.loc_header[hdr].cust_detail.length > 0){
        region_count_detail = doc.loc_header[hdr].cust_detail.length+3;
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);width:20;background-color:#ffffff' >";
//        result = result + "<img src=\"/SMTWebApp/images/btnArrowDown.gif\" id=img"+hdr+" onclick=\"showHideRow(\'row_"+hdr+"_\',\'"+region_count_detail+"\',\'"+hdr+"\');\"/>";
        result = result + "<input type=button value=' + ' id=img"+hdr+" onclick=\"showHideRow(\'row_"+hdr+"_\',\'"+region_count_detail+"\',\'"+hdr+"\');\" style=\"height:20px;width:20px\"/>";
        result = result + "&nbsp;</td>";
    }else{
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'  >&nbsp;</td>";
    }
    result = result + generateDetail_pod_pol(doc.loc_header[hdr],check_por,check_pot1,check_pot2,check_pld);
    if(check_act5wk == "Y"){
        result = result + generateWeek_1(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
        result = result + generateWeek_2(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
        result = result + generateWeek_3(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
        result = result + generateWeek_4(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
    }

    result = result + generateBsa(doc.loc_header[hdr]);
    result = result + generateWeek_5(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
    if(check_fcast5wk == "Y"){
        result = result + generateForeCast_1(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
        result = result + generateForeCast_2(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
        result = result + generateForeCast_3(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
        result = result + generateForeCast_4(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
        result = result + generateForeCast_5(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
    }
    result = result + generateAvgAndCust(doc.loc_header[hdr]);
    result = result + "</tr >";
//    alert("doc.loc_header[hdr].cust_detail "+doc.loc_header[hdr].cust_detail);
    if(doc.loc_header[hdr].cust_detail != null){
        result = result + "<tr class=TableLeftWhite id=row_"+hdr+"_0 style=display:none>";
        result = result + generateSubHeaderColumn();
        if(check_act5wk == "Y"){
            result = result + generateSubCondiotion(check_20,check_40,check_teu,check_weight);
            result = result + generateSubCondiotion(check_20,check_40,check_teu,check_weight);
            result = result + generateSubCondiotion(check_20,check_40,check_teu,check_weight);
            result = result + generateSubCondiotion(check_20,check_40,check_teu,check_weight);
        }
        result = result + "<td class=TableCenterSub style='FONT-SIZE:100%;BORDER-LEFT: gray 2px solid;' ><a >BSA [TEU]</a></td>";
        result = result + "<td class=TableCenterSub style='FONT-SIZE:100%;BORDER-RIGHT: gray 2px solid;' ><a >BSA [mT]</a></td>";
        result = result + generateSubCondiotion(check_20,check_40,check_teu,check_weight);
        if(check_fcast5wk == "Y"){
            result = result + generateSubCondiotion(check_20,check_40,check_teu,check_weight);
            result = result + generateSubCondiotion(check_20,check_40,check_teu,check_weight);
            result = result + generateSubCondiotion(check_20,check_40,check_teu,check_weight);
            result = result + generateSubCondiotion(check_20,check_40,check_teu,check_weight);
            result = result + generateSubCondiotion(check_20,check_40,check_teu,check_weight);
        }
        result = result + "<td class=TableCenterSub style='FONT-SIZE:100%; BORDER-LEFT: gray 2px solid;' ><a style='width:50'>Act Wk"+param_week+"</a></td>";
        result = result + "<td class=TableCenterSub style='FONT-SIZE:100%;' ><a style='width:50'>Avg 5wk</a></td>";
        result = result + "</tr >";

        for(dtl = 0 ; dtl < doc.loc_header[hdr].cust_detail.length ; dtl++){
          /*#04 Begin*/
            if((dtl % 2) == 1){
              result = result + "<tr class=TableLeftWhite id=row_"+hdr+"_"+(dtl+1)+" style='display:none; background-color:#F2F5F9;'>";
            } else {
              result = result + "<tr class=TableLeftWhite id=row_"+hdr+"_"+(dtl+1)+" style='display:none'>";
            }
            /*#04 End*/

//            result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'  >&nbsp;</td>";
            result = result + generateSubDetail(doc.loc_header[hdr].cust_detail[dtl]);
            if(check_act5wk == "Y"){
                result = result + generateWeek_1(doc.loc_header[hdr].cust_detail[dtl],check_20,check_40,check_teu,check_weight);
                result = result + generateWeek_2(doc.loc_header[hdr].cust_detail[dtl],check_20,check_40,check_teu,check_weight);
                result = result + generateWeek_3(doc.loc_header[hdr].cust_detail[dtl],check_20,check_40,check_teu,check_weight);
                result = result + generateWeek_4(doc.loc_header[hdr].cust_detail[dtl],check_20,check_40,check_teu,check_weight);
            }

            result = result + generateBsa(doc.loc_header[hdr].cust_detail[dtl]);
            result = result + generateWeek_5(doc.loc_header[hdr].cust_detail[dtl],check_20,check_40,check_teu,check_weight);
            if(check_fcast5wk == "Y"){
                result = result + generateForeCast_1(doc.loc_header[hdr].cust_detail[dtl],check_20,check_40,check_teu,check_weight);
                result = result + generateForeCast_2(doc.loc_header[hdr].cust_detail[dtl],check_20,check_40,check_teu,check_weight);
                result = result + generateForeCast_3(doc.loc_header[hdr].cust_detail[dtl],check_20,check_40,check_teu,check_weight);
                result = result + generateForeCast_4(doc.loc_header[hdr].cust_detail[dtl],check_20,check_40,check_teu,check_weight);
                result = result + generateForeCast_5(doc.loc_header[hdr].cust_detail[dtl],check_20,check_40,check_teu,check_weight);
            }
            result = result + generateAvgAndCust(doc.loc_header[hdr].cust_detail[dtl]);
            result = result + "</tr >";

            if(dtl == (doc.loc_header[hdr].cust_detail.length - 1)){
                result = result + "<tr class=TableLeftWhite id=row_"+hdr+"_"+(dtl+2)+" style='display:none; FONT-WEIGHT: bold;'>";
                result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);text-align:right;'  >&nbsp;</td>";
                result = result + "<td colspan=8 style='BACKGROUND:#E9E7D7;position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);text-align:right; BORDER-RIGHT: gray 2px solid;'>Total &nbsp;&nbsp;&nbsp;&nbsp;</td>";
                if(check_act5wk == "Y"){
                    result = result + generateWeek_1(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
                    result = result + generateWeek_2(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
                    result = result + generateWeek_3(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
                    result = result + generateWeek_4(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
                }

                result = result + generateBsa(doc.loc_header[hdr]);
                result = result + generateWeek_5(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
                if(check_fcast5wk == "Y"){
                    result = result + generateForeCast_1(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
                    result = result + generateForeCast_2(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
                    result = result + generateForeCast_3(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
                    result = result + generateForeCast_4(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
                    result = result + generateForeCast_5(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
                }
                result = result + generateAvgAndCust(doc.loc_header[hdr]);
                result = result + "</tr >";

                result = result + "<tr class=TableLeftWhite id=row_"+hdr+"_"+(dtl+3)+" style=display:none>";
                result = result + "<td colspan=9 style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);text-align:right; BORDER-RIGHT: gray 2px solid;'  >&nbsp;</td>";
                if(check_act5wk == "Y"){
                    result = result + generateEmptyColumn(check_20,check_40,check_teu,check_weight);
                    result = result + generateEmptyColumn(check_20,check_40,check_teu,check_weight);
                    result = result + generateEmptyColumn(check_20,check_40,check_teu,check_weight);
                    result = result + generateEmptyColumn(check_20,check_40,check_teu,check_weight);
                }

                result = result + "<td style='BORDER-LEFT: gray 2px solid;'>&nbsp;</td>";
                result = result + "<td style='BORDER-RIGHT: gray 2px solid;'>&nbsp;</td>";
                result = result + generateEmptyColumn(check_20,check_40,check_teu,check_weight);
                if(check_fcast5wk == "Y"){
                    result = result + generateEmptyColumn(check_20,check_40,check_teu,check_weight);
                    result = result + generateEmptyColumn(check_20,check_40,check_teu,check_weight);
                    result = result + generateEmptyColumn(check_20,check_40,check_teu,check_weight);
                    result = result + generateEmptyColumn(check_20,check_40,check_teu,check_weight);
                    result = result + generateEmptyColumn(check_20,check_40,check_teu,check_weight);
                }
                result = result + "<td style='BORDER-LEFT: gray 2px solid'>&nbsp;</td>";
                result = result + "<td >&nbsp;</td>";
                result = result + "</tr >";
            }
        }

    }

    }

    result = result + "<tr class=TableLeftWhite style='FONT-WEIGHT:bold;'>";

    result = result + "<td colspan=9 style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);text-align:right; BORDER-RIGHT: gray 2px solid;'  >Total COC&nbsp;&nbsp;&nbsp;&nbsp;</td>";
    if(check_act5wk == "Y"){
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk120).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk140).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk1Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk1Weigth).toFixed(0))+"</td>";
        }
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk220).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk240).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk2Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk2Weigth).toFixed(0))+"</td>";
        }
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk320).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk340).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk3Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk3Weigth).toFixed(0))+"</td>";
        }
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk420).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk440).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk4Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk4Weigth).toFixed(0))+"</td>";
        }

    }
    result = result + "<td style='text-align:right; BORDER-LEFT: gray 2px solid;'>"+changeZeroToSpace(parseFloat(doc.sumCocBsaTeu).toFixed(0))+"</td>";
    result = result + "<td style='text-align:right; BORDER-RIGHT: gray 2px solid;'>"+changeZeroToSpace(parseFloat(doc.sumCocBsaWeight).toFixed(0))+"</td>";
    if(check_20 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk520).toFixed(0))+"</td>";
    }
    if(check_40 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk540).toFixed(0))+"</td>";
    }
    if(check_teu == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk5Teu).toFixed(0))+"</td>";
    }
    if(check_weight == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk5Weigth).toFixed(0))+"</td>";
    }
    if(check_fcast5wk == "Y"){
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk120).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk140).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk1Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk1Weigth).toFixed(0))+"</td>";
        }
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk220).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk240).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk2Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk2Weigth).toFixed(0))+"</td>";
        }
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk320).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk340).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk3Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk3Weigth).toFixed(0))+"</td>";
        }
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk420).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk440).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk4Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk4Weigth).toFixed(0))+"</td>";
        }
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk520).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk540).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk5Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk5Weigth).toFixed(0))+"</td>";
        }
    }
//    result = result + "<td style='BACKGROUND:#8db4e2;text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocAct5WkCust).toFixed(0))+"</td>";
//    result = result + "<td style='BACKGROUND:#ffc000;text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocAvgWk5).toFixed(0))+"</td>";
    result = result + "<td style='BACKGROUND:#8db4e2;text-align:right; BORDER-LEFT: gray 2px solid;'>"+changeZeroToSpace(parseFloat(doc.sum_coc_cust_curr_wk).toFixed(0))+"</td>";
    result = result + "<td style='BACKGROUND:#ffc000;text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sum_coc_cust_5wk_avg).toFixed(0))+"</td>";
    result = result + "</tr>";

    result = result + "<tr class=TableLeftWhite style='FONT-WEIGHT:bold;'>";

    result = result + "<td colspan=9 style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);text-align:right; BORDER-RIGHT: gray 2px solid;'>Total SOC&nbsp;&nbsp;&nbsp;&nbsp;</td>";
    if(check_act5wk == "Y"){
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk120).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk140).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk1Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk1Weigth).toFixed(0))+"</td>";
        }
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk220).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk240).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk2Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk2Weigth).toFixed(0))+"</td>";
        }
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk320).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk340).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk3Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk3Weigth).toFixed(0))+"</td>";
        }
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk420).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk440).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk4Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk4Weigth).toFixed(0))+"</td>";
        }

    }
    result = result + "<td style='text-align:right; BORDER-LEFT: gray 2px solid;'>"+changeZeroToSpace(parseFloat(doc.sumSocBsaTeu).toFixed(0))+"</td>";
    result = result + "<td style='text-align:right; BORDER-RIGHT: gray 2px solid;'>"+changeZeroToSpace(parseFloat(doc.sumSocBsaWeight).toFixed(0))+"</td>";
    if(check_20 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk520).toFixed(0))+"</td>";
    }
    if(check_40 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk540).toFixed(0))+"</td>";
    }
    if(check_teu == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk5Teu).toFixed(0))+"</td>";
    }
    if(check_weight == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk5Weigth).toFixed(0))+"</td>";
    }
    if(check_fcast5wk == "Y"){
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk120).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk140).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk1Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk1Weigth).toFixed(0))+"</td>";
        }
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk220).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk240).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk2Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk2Weigth).toFixed(0))+"</td>";
        }
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk320).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk340).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk3Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk3Weigth).toFixed(0))+"</td>";
        }
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk420).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk440).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk4Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk4Weigth).toFixed(0))+"</td>";
        }
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk520).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk540).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk5Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk5Weigth).toFixed(0))+"</td>";
        }
    }
//    result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocAct5WkCust).toFixed(0))+"</td>";
//    result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocAvgWk5).toFixed(0))+"</td>";

    result = result + "<td style='text-align:right; BORDER-LEFT: gray 2px solid;'>"+changeZeroToSpace(parseFloat(doc.sum_soc_cust_curr_wk).toFixed(0))+"</td>";
    result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sum_soc_cust_5wk_avg).toFixed(0))+"</td>";

    result = result + "</tr>";

    result = result + "</table>";
//    result = result + "</div>";

//    result = result + "</form>";
    }catch(err){
        alert(err.message);
    }
    return result;
}

function generateHTML_Loc_General_Service(doc){

    try{
    var result = "";
    var check_20 = "N";
    var check_40 = "N";
    var check_teu = "N";
    var check_weight = "N";
    var check_act5wk = "N";
    var check_fcast5wk = "N";

    check_20 = doc.check_20;
    check_40 = doc.check_40;
    check_teu = doc.check_teu;
    check_weight = doc.check_weight;

    check_act5wk = doc.check_act5wk;
    check_fcast5wk = doc.check_fcast5wk;

    var param_week = parseInt(doc.p_week);
    var maxWeek = 52;

//    alert("check_20:"+check_20);
//    alert("check_40:"+check_40);
//    alert("check_teu:"+check_teu);
//    alert("check_weight:"+check_weight);
//    alert("check_act5wk:"+check_act5wk);
//    alert("check_fcast5wk:"+check_fcast5wk);

    var count_merge = 0;

    if(check_20 == "Y"){
        count_merge = count_merge + 1;
    }
    if(check_40 == "Y"){
        count_merge = count_merge + 1;
    }
    if(check_teu == "Y"){
        count_merge = count_merge + 1;
    }
    if(check_weight == "Y"){
        count_merge = count_merge + 1;
    }

//    alert("count_merge:"+count_merge);
//    result = result + "<form method=post name=frm_loc_summary STYLE=margin: 0px; padding: 0px;>";

//    result = result + "<table border=0 cellpadding=0 cellspacing=1 width=100%>";
//    result = result + "<tr><td width=100% class=TableLeftText>Location Summary Report</td></tr>";
//    result = result + "</table>";
    //rowspan=2
//    result = result + "<div style='overflow: auto; height: 294px; width: 99.9%;'>";
    result = result + "<table border=1 cellpadding=0 cellspacing=0 width=100% id=tableHeader style=' border-collapse: collapse; BORDER: gray 2px solid;'>"; //#04
    result = result + "<tr class=FreezedHeader >";
    result = result + "<td class=FreezedHeader2 nowrap rowspan='2' style='width:2%'><a style='width:20'></a></td>";  //#02
    result = result + "<td class=FreezedHeader2 nowrap rowspan='2' style='width:3% !important;'><a>Bound</a></td>";    //#02
    result = result + "<td class=FreezedHeader2 nowrap rowspan='2' style='width:10% !important;'><a>Svc Leg1</a></td>";  //#02
    result = result + "<td class=FreezedHeader2 nowrap rowspan='2' ><a>Svc Leg2</a></td>";
    result = result + "<td class=FreezedHeader2 nowrap rowspan='2' ><a>Svc Leg3</a></td>";
    result = result + "<td class=FreezedHeader2 nowrap rowspan='2' ><a>C/S</a></td>";
    result = result + "<td class=FreezedHeader2 nowrap rowspan='2' style='BORDER-RIGHT: gray 2px solid;'><a>CGO</a></td>";

//Start #02
//    if(check_act5wk == "Y"){
//        if(count_merge == 1){
//            result = result + "<td class=TableCenterSubNoBottom >Act Wk1</td>";
//            result = result + "<td class=TableCenterSubNoBottom >Act Wk2</td>";
//            result = result + "<td class=TableCenterSubNoBottom >Act Wk3</td>";
//            result = result + "<td class=TableCenterSubNoBottom >Act Wk4</td>";
//        }else{
//            result = result + "<td class=TableCenterSubNoBottom colspan="+count_merge+">Act Wk"+(param_week-4)+"</td>";
//            result = result + "<td class=TableCenterSubNoBottom colspan="+count_merge+">Act Wk"+(param_week-3)+"</td>";
//            result = result + "<td class=TableCenterSubNoBottom colspan="+count_merge+">Act Wk"+(param_week-2)+"</td>";
//            result = result + "<td class=TableCenterSubNoBottom colspan="+count_merge+">Act Wk"+(param_week-1)+"</td>";
//        }
//    }

    if(check_act5wk == "Y"){

        if((param_week-4) <= 0) {
            if((param_week-4) == 0) {
                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(maxWeek)+"</td>";
            }else if((param_week-4) == -1){
                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(maxWeek-1)+"</td>";
            }else if((param_week-4) == -2){
                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(maxWeek-2)+"</td>";
            }else{
                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(maxWeek-3)+"</td>";
            }
        }else{
            result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(param_week-4)+"</td>";
        }

        if((param_week-3) <= 0) {
            if((param_week-3) == 0) {
                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(maxWeek)+"</td>";
            }else if((param_week-3) == -1){
                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(maxWeek-1)+"</td>";
            }else if((param_week-3) == -2){
                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(maxWeek-2)+"</td>";
            }else{
                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(maxWeek-3)+"</td>";
            }
        }else{
            result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(param_week-3)+"</td>";
        }

        if((param_week-2) <= 0) {
            if((param_week-2) == 0) {
                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(maxWeek)+"</td>";
            }else if((param_week-2) == -1){
                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(maxWeek-1)+"</td>";
            }else if((param_week-2) == -2){
                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(maxWeek-2)+"</td>";
            }else{
                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(maxWeek-3)+"</td>";
            }
        }else{
            result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(param_week-2)+"</td>";
        }

        if((param_week-1) <= 0) {
            result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(maxWeek)+"</td>";
        }else{
            result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(param_week-1)+"</td>";
        }
//        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(param_week-4)+"</td>";
//        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(param_week-3)+"</td>";
//        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(param_week-2)+"</td>";
//        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+(param_week-1)+"</td>";
    }

//    result = result + "<td class=TableCenterSubNoBottom ><a style='width:80'>BSA [TEU]</a></td>";
//    result = result + "<td class=TableCenterSubNoBottom ><a style='width:80'>BSA [mT]</a></td>";

    result = result + "<td class=TableCenterSubNoBottom colspan=2 style='BORDER-LEFT: gray 2px solid; BORDER-RIGHT: gray 2px solid;'>BSA</a></td>";

//    if(count_merge == 1){
//        result = result + "<td class=TableCenterSub >Act Wk5</td>";
//    }else{
//        result = result + "<td class=TableCenterSub colspan="+count_merge+">Act Wk"+param_week+"</td>";
//    }

    result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">Act Wk"+param_week+"</td>";

//    if(check_fcast5wk == "Y"){
//        if(count_merge == 1){
//            result = result + "<td class=TableCenterSub >F Cast Wk"+(param_week-4)+"</td>";
//            result = result + "<td class=TableCenterSub >F Cast Wk"+(param_week-3)+"</td>";
//            result = result + "<td class=TableCenterSub >F Cast Wk"+(param_week-2)+"</td>";
//            result = result + "<td class=TableCenterSub >F Cast Wk"+(param_week-1)+"</td>";
//            result = result + "<td class=TableCenterSub >F Cast Wk"+param_week+"</td>";
//        }else{
//            result = result + "<td class=TableCenterSub colspan="+count_merge+">F Cast Wk"+(param_week-4)+"</td>";
//            result = result + "<td class=TableCenterSub colspan="+count_merge+">F Cast Wk"+(param_week-3)+"</td>";
//            result = result + "<td class=TableCenterSub colspan="+count_merge+">F Cast Wk"+(param_week-2)+"</td>";
//            result = result + "<td class=TableCenterSub colspan="+count_merge+">F Cast Wk"+(param_week-1)+"</td>";
//            result = result + "<td class=TableCenterSub colspan="+count_merge+">F Cast Wk"+param_week+"</td>";
//        }
//    }

    if(check_fcast5wk == "Y"){
        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">F Cast Wk"+(param_week+1)+"</td>";
        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">F Cast Wk"+(param_week+2)+"</td>";
        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">F Cast Wk"+(param_week+3)+"</td>";
        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">F Cast Wk"+(param_week+4)+"</td>";
        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+count_merge+">F Cast Wk"+(param_week+5)+"</td>";
    }


    result = result + "<td class=TableCenterSubNoBottom width=5% style='BORDER-LEFT: gray 2px solid;'><a >Act Wk"+param_week+"</a></td>";
    result = result + "<td class=TableCenterSubNoBottom width=5% ><a >Avg 5wk</a></td>";

 //End #02
    result = result + "</tr>";

    result = result + "<tr >";

    if(check_act5wk == "Y"){
        result = result + generateCondiotion(check_20,check_40,check_teu,check_weight);
        result = result + generateCondiotion(check_20,check_40,check_teu,check_weight);
        result = result + generateCondiotion(check_20,check_40,check_teu,check_weight);
        result = result + generateCondiotion(check_20,check_40,check_teu,check_weight);
    }
    result = result + "<td class=TableCenterSubNoTop width=4% style='BORDER-LEFT: gray 2px solid;'><a>[TEU]</a></td>";
    result = result + "<td class=TableCenterSubNoTop width=4% style='BORDER-RIGHT: gray 2px solid;'><a>[mT]</a></td>";
    result = result + generateCondiotion(check_20,check_40,check_teu,check_weight);
    if(check_fcast5wk == "Y"){
        result = result + generateCondiotion(check_20,check_40,check_teu,check_weight);
        result = result + generateCondiotion(check_20,check_40,check_teu,check_weight);
        result = result + generateCondiotion(check_20,check_40,check_teu,check_weight);
        result = result + generateCondiotion(check_20,check_40,check_teu,check_weight);
        result = result + generateCondiotion(check_20,check_40,check_teu,check_weight);
    }
//    result = result + "<td  >F Cast Wk6</td>";
//    result = result + "<td  >F Cast Wk6</td>";

    result = result + "<td class=TableCenterSubNoTop style='BORDER-LEFT: gray 2px solid;'><a style='width:80'># Cust</a></td>";
    result = result + "<td class=TableCenterSubNoTop ><a style='width:80'># Actv Cust</a></td>";
    result = result + "</tr>";

    for(hdr = 0 ; hdr < doc.loc_header.length ; hdr++){
      /*#04 Begin*/
      var even = "style='background-color: #F2F5F9;'";
      if( (hdr % 2) == 1){
        result = result + "<tr class=TableLeftWhite " + even + ">";
      } else {
        result = result + "<tr class=TableLeftWhite >";
      }
      /*#04 End*/

    if(doc.loc_header[hdr].cust_detail != null && doc.loc_header[hdr].cust_detail.length > 0){
        region_count_detail = doc.loc_header[hdr].cust_detail.length+3;
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);' >";
//        result = result + "<img src=\"/SMTWebApp/images/btnArrowDown.gif\" id=img"+hdr+" onclick=\"showHideRow(\'row_"+hdr+"_\',\'"+region_count_detail+"\',\'"+hdr+"\');\"/>";
        result = result + "<input type=button value=' + ' id=img"+hdr+" onclick=\"showHideRow(\'row_"+hdr+"_\',\'"+region_count_detail+"\',\'"+hdr+"\');\" style=\"height:20px;width:20px\"/>";
        result = result + "</td>";
    }else{
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'  >&nbsp;</td>";
    }

//    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'  >Detail</td>";
    result = result + generateDetail_service(doc.loc_header[hdr]);
    if(check_act5wk == "Y"){
        result = result + generateWeek_1(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
        result = result + generateWeek_2(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
        result = result + generateWeek_3(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
        result = result + generateWeek_4(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
    }

    result = result + generateBsa(doc.loc_header[hdr]);
    result = result + generateWeek_5(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
    if(check_fcast5wk == "Y"){
        result = result + generateForeCast_1(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
        result = result + generateForeCast_2(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
        result = result + generateForeCast_3(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
        result = result + generateForeCast_4(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
        result = result + generateForeCast_5(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
    }
    result = result + generateAvgAndCust(doc.loc_header[hdr]);
    result = result + "</tr >";

    if(doc.loc_header[hdr].cust_detail != null){
        result = result + "<tr class=TableLeftWhite id=row_"+hdr+"_0 style=display:none>";
        result = result + generateSubHeaderServiceColumn();
        if(check_act5wk == "Y"){
            result = result + generateSubCondiotion(check_20,check_40,check_teu,check_weight);
            result = result + generateSubCondiotion(check_20,check_40,check_teu,check_weight);
            result = result + generateSubCondiotion(check_20,check_40,check_teu,check_weight);
            result = result + generateSubCondiotion(check_20,check_40,check_teu,check_weight);
        }
        result = result + "<td class=TableCenterSub style='FONT-SIZE:100%; BORDER-LEFT: gray 2px solid;'><a >BSA [TEU]</a></td>";
        result = result + "<td class=TableCenterSub style='FONT-SIZE:100%; BORDER-RIGHT: gray 2px solid;'><a >BSA [mT]</a></td>";
        result = result + generateSubCondiotion(check_20,check_40,check_teu,check_weight);
        if(check_fcast5wk == "Y"){
            result = result + generateSubCondiotion(check_20,check_40,check_teu,check_weight);
            result = result + generateSubCondiotion(check_20,check_40,check_teu,check_weight);
            result = result + generateSubCondiotion(check_20,check_40,check_teu,check_weight);
            result = result + generateSubCondiotion(check_20,check_40,check_teu,check_weight);
            result = result + generateSubCondiotion(check_20,check_40,check_teu,check_weight);
        }
        result = result + "<td class=TableCenterSub style='FONT-SIZE:100%; BORDER-LEFT: gray 2px solid;' ><a style='width:50'>Act Wk"+param_week+"</a></td>";
        result = result + "<td class=TableCenterSub style='FONT-SIZE:100%;' ><a style='width:50'>Avg 5wk</a></td>";
        result = result + "</tr >";

        for(dtl = 0 ; dtl < doc.loc_header[hdr].cust_detail.length ; dtl++){
          /*#04 Begin*/
            if((dtl % 2) == 1){
              result = result + "<tr class=TableLeftWhite id=row_"+hdr+"_"+(dtl+1)+" style='display:none; background-color: #F2F5F9;'>";
            } else {
              result = result + "<tr class=TableLeftWhite id=row_"+hdr+"_"+(dtl+1)+" style=display:none>";
            }
            /*#04 End*/

//            result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'  >&nbsp;</td>";
            result = result + generateSubDetailService(doc.loc_header[hdr].cust_detail[dtl]);
            if(check_act5wk == "Y"){
                result = result + generateWeek_1(doc.loc_header[hdr].cust_detail[dtl],check_20,check_40,check_teu,check_weight);
                result = result + generateWeek_2(doc.loc_header[hdr].cust_detail[dtl],check_20,check_40,check_teu,check_weight);
                result = result + generateWeek_3(doc.loc_header[hdr].cust_detail[dtl],check_20,check_40,check_teu,check_weight);
                result = result + generateWeek_4(doc.loc_header[hdr].cust_detail[dtl],check_20,check_40,check_teu,check_weight);
            }

            result = result + generateBsa(doc.loc_header[hdr].cust_detail[dtl]);
            result = result + generateWeek_5(doc.loc_header[hdr].cust_detail[dtl],check_20,check_40,check_teu,check_weight);
            if(check_fcast5wk == "Y"){
                result = result + generateForeCast_1(doc.loc_header[hdr].cust_detail[dtl],check_20,check_40,check_teu,check_weight);
                result = result + generateForeCast_2(doc.loc_header[hdr].cust_detail[dtl],check_20,check_40,check_teu,check_weight);
                result = result + generateForeCast_3(doc.loc_header[hdr].cust_detail[dtl],check_20,check_40,check_teu,check_weight);
                result = result + generateForeCast_4(doc.loc_header[hdr].cust_detail[dtl],check_20,check_40,check_teu,check_weight);
                result = result + generateForeCast_5(doc.loc_header[hdr].cust_detail[dtl],check_20,check_40,check_teu,check_weight);
            }
            result = result + generateAvgAndCust(doc.loc_header[hdr].cust_detail[dtl]);
            result = result + "</tr >";

            if(dtl == (doc.loc_header[hdr].cust_detail.length - 1)){
                result = result + "<tr class=TableLeftWhite id=row_"+hdr+"_"+(dtl+2)+" style='display:none; FONT-WEIGHT: bold;'>";
                result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);text-align:right;'  >&nbsp;</td>";
                result = result + "<td colspan=6 style='BACKGROUND:#E9E7D7;position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);text-align:right; BORDER-RIGHT: gray 2px solid;'  >Total &nbsp;&nbsp;&nbsp;&nbsp;</td>";
                if(check_act5wk == "Y"){
                    result = result + generateWeek_1(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
                    result = result + generateWeek_2(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
                    result = result + generateWeek_3(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
                    result = result + generateWeek_4(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
                }

                result = result + generateBsa(doc.loc_header[hdr]);
                result = result + generateWeek_5(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
                if(check_fcast5wk == "Y"){
                    result = result + generateForeCast_1(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
                    result = result + generateForeCast_2(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
                    result = result + generateForeCast_3(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
                    result = result + generateForeCast_4(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
                    result = result + generateForeCast_5(doc.loc_header[hdr],check_20,check_40,check_teu,check_weight);
                }
                result = result + generateAvgAndCust(doc.loc_header[hdr]);
                result = result + "</tr >";

                result = result + "<tr class=TableLeftWhite id=row_"+hdr+"_"+(dtl+3)+" style='display:none; BORDER-RIGHT: gray 2px solid;'>";
                result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>&nbsp;</td>";
                result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>&nbsp;</td>";
                result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>&nbsp;</td>";
                result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>&nbsp;</td>";
                result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>&nbsp;</td>";
                result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>&nbsp;</td>";
                result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); BORDER-RIGHT: gray 2px solid;'>&nbsp;</td>";
                if(check_act5wk == "Y"){
                    result = result + generateEmptyColumn(check_20,check_40,check_teu,check_weight);
                    result = result + generateEmptyColumn(check_20,check_40,check_teu,check_weight);
                    result = result + generateEmptyColumn(check_20,check_40,check_teu,check_weight);
                    result = result + generateEmptyColumn(check_20,check_40,check_teu,check_weight);
                }

                result = result + "<td style='BORDER-LEFT: gray 2px solid;'>&nbsp;</td>";
                result = result + "<td style='BORDER-RIGHT: gray 2px solid;'>&nbsp;</td>";
                result = result + generateEmptyColumn(check_20,check_40,check_teu,check_weight);
                if(check_fcast5wk == "Y"){
                    result = result + generateEmptyColumn(check_20,check_40,check_teu,check_weight);
                    result = result + generateEmptyColumn(check_20,check_40,check_teu,check_weight);
                    result = result + generateEmptyColumn(check_20,check_40,check_teu,check_weight);
                    result = result + generateEmptyColumn(check_20,check_40,check_teu,check_weight);
                    result = result + generateEmptyColumn(check_20,check_40,check_teu,check_weight);
                }
                result = result + "<td style='BORDER-LEFT: gray 2px solid;'>&nbsp;</td>";
                result = result + "<td >&nbsp;</td>";
                result = result + "</tr >";
            }
        }
    }

    }


//    result = result + "</tr >";

    result = result + "<tr class=TableLeftWhite style='FONT-WEIGHT:bold;'>";

    result = result + "<td colspan=7 style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);text-align:right; BORDER-RIGHT: gray 2px solid;'  >Total COC&nbsp;&nbsp;&nbsp;&nbsp;</td>";
    if(check_act5wk == "Y"){
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk120).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk140).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk1Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk1Weigth).toFixed(0))+"</td>";
        }
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk220).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk240).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk2Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk2Weigth).toFixed(0))+"</td>";
        }
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk320).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk340).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk3Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk3Weigth).toFixed(0))+"</td>";
        }
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk420).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk440).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk4Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk4Weigth).toFixed(0))+"</td>";
        }

    }
    result = result + "<td style='text-align:right; BORDER-LEFT: gray 2px solid;'>"+changeZeroToSpace(parseFloat(doc.sumCocBsaTeu).toFixed(0))+"</td>";
    result = result + "<td style='text-align:right; BORDER-RIGHT: gray 2px solid;'>"+changeZeroToSpace(parseFloat(doc.sumCocBsaWeight).toFixed(0))+"</td>";
    if(check_20 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk520).toFixed(0))+"</td>";
    }
    if(check_40 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk540).toFixed(0))+"</td>";
    }
    if(check_teu == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk5Teu).toFixed(0))+"</td>";
    }
    if(check_weight == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocActWk5Weigth).toFixed(0))+"</td>";
    }
    if(check_fcast5wk == "Y"){
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk120).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk140).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk1Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk1Weigth).toFixed(0))+"</td>";
        }
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk220).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk240).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk2Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk2Weigth).toFixed(0))+"</td>";
        }
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk320).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk340).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk3Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk3Weigth).toFixed(0))+"</td>";
        }
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk420).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk440).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk4Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk4Weigth).toFixed(0))+"</td>";
        }
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk520).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk540).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk5Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocFCastWk5Weigth).toFixed(0))+"</td>";
        }
    }
//    result = result + "<td style='BACKGROUND:#8db4e2;text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocAct5WkCust).toFixed(0))+"</td>";
//    result = result + "<td style='BACKGROUND:#ffc000;text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumCocAvgWk5).toFixed(0))+"</td>";
    result = result + "<td style='BACKGROUND:#8db4e2;text-align:right; BORDER-LEFT: gray 2px solid;'>"+changeZeroToSpace(parseFloat(doc.sum_coc_cust_curr_wk).toFixed(0))+"</td>";
    result = result + "<td style='BACKGROUND:#ffc000;text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sum_coc_cust_5wk_avg).toFixed(0))+"</td>";
    result = result + "</tr>";

    result = result + "<tr class=TableLeftWhite style='FONT-WEIGHT:bold;'>";

    result = result + "<td colspan=7 style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);text-align:right; BORDER-RIGHT: gray 2px solid;'  >Total SOC&nbsp;&nbsp;&nbsp;&nbsp;</td>";
    if(check_act5wk == "Y"){
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk120).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk140).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk1Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk1Weigth).toFixed(0))+"</td>";
        }
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk220).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk240).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk2Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk2Weigth).toFixed(0))+"</td>";
        }
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk320).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk340).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk3Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk3Weigth).toFixed(0))+"</td>";
        }
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk420).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk440).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk4Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk4Weigth).toFixed(0))+"</td>";
        }

    }
    result = result + "<td style='text-align:right; BORDER-LEFT: gray 2px solid;'>"+changeZeroToSpace(parseFloat(doc.sumSocBsaTeu).toFixed(0))+"</td>";
    result = result + "<td style='text-align:right; BORDER-RIGHT: gray 2px solid;'>"+changeZeroToSpace(parseFloat(doc.sumSocBsaWeight).toFixed(0))+"</td>";
    if(check_20 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk520).toFixed(0))+"</td>";
    }
    if(check_40 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk540).toFixed(0))+"</td>";
    }
    if(check_teu == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk5Teu).toFixed(0))+"</td>";
    }
    if(check_weight == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocActWk5Weigth).toFixed(0))+"</td>";
    }
    if(check_fcast5wk == "Y"){
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk120).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk140).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk1Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk1Weigth).toFixed(0))+"</td>";
        }
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk220).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk240).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk2Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk2Weigth).toFixed(0))+"</td>";
        }
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk320).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk340).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk3Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk3Weigth).toFixed(0))+"</td>";
        }
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk420).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk440).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk4Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk4Weigth).toFixed(0))+"</td>";
        }
        if(check_20 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk520).toFixed(0))+"</td>";
        }
        if(check_40 == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk540).toFixed(0))+"</td>";
        }
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk5Teu).toFixed(0))+"</td>";
        }
        if(check_weight == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocFCastWk5Weigth).toFixed(0))+"</td>";
        }
    }
//    result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocAct5WkCust).toFixed(0))+"</td>";
//    result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sumSocAvgWk5).toFixed(0))+"</td>";
    result = result + "<td style='text-align:right; BORDER-LEFT: gray 2px solid;'>"+changeZeroToSpace(parseFloat(doc.sum_soc_cust_curr_wk).toFixed(0))+"</td>";
    result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sum_soc_cust_5wk_avg).toFixed(0))+"</td>";
    result = result + "</tr>";

    result = result + "</table>";
//    result = result + "</div>";

//    result = result + "</form>";
    }catch(err){
        alert(err.message);
    }
    return result;
}

function generateHTML_Loc_Summary(doc){

    var result = "";
    try{
        result = result + "<br><br>";
        result = result + "<table border=0 cellpadding=0 cellspacing=1 width=100% >";
//        result = result + "<tr><td width=100% class=TableLeftText>COC</td></tr>";
        result = result + "<tr >";
        result = result + "<td align=center>";
        result = result + "<table border=0 cellpadding=0 cellspacing=1 width=80% >";
        result = result + "<tr><td width=100% class=TableLeftText colspan=10>COC</td></tr>";
        result = result + "<tr >";
        result = result + "<td class=TableLeftMaint width=10%>&nbsp;</td >";
        result = result + "<td class=TableLeftMaint width=10%>&nbsp;</td >";
        result = result + "<td class=TableLeftMaint width=10%>TEU</td >";
        result = result + "<td class=TableLeftMaint width=10%>mT</td >";
        result = result + "<td class=TableLeftMaint width=10%>&nbsp;</td >";
        result = result + "<td class=TableLeftMaint width=10%>&nbsp;</td >";
        result = result + "<td class=TableLeftMaint width=10%>Current wk</td >";
        result = result + "<td class=TableLeftMaint width=10%>&nbsp;</td >";
        result = result + "<td class=TableLeftMaint width=10%>5wk avg</td >";
        result = result + "<td class=TableLeftMaint width=10%>&nbsp;</td >";
        result = result + "</tr >";
        result = result + "<tr >";
        result = result + "<td class=TableLeftMaint>&nbsp;</td >";
        result = result + "<td class=TableLeftMaint style='text-align:right;'>Current wk Vol</td >";
        result = result + "<td class=TableLeftMaint style='BACKGROUND:#ffffff;text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sum_coc_curr_wk_vol_teu).toFixed(0))+"</td >";
        result = result + "<td class=TableLeftMaint style='BACKGROUND:#ffffff;text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sum_coc_curr_wk_vol_mt).toFixed(0))+"</td >";
        result = result + "<td class=TableLeftMaint>&nbsp;</td >";
        result = result + "<td class=TableLeftMaint style='text-align:right;'># Cust</td >";
//        result = result + "<td class=TableLeftMaint style='BACKGROUND:#ffffff;text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sum_coc_cust_curr_wk).toFixed(0))+"</td >";
        result = result + "<td class=TableLeftMaint style='BACKGROUND:#8db4e2;text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sum_coc_cust_curr_wk).toFixed(0))+"</td >";
        result = result + "<td class=TableLeftMaint style='text-align:right;'># Cust</td >";
        result = result + "<td class=TableLeftMaint style='BACKGROUND:#ffc000;text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sum_coc_cust_5wk_avg).toFixed(0))+"</td >";
//        result = result + "<td class=TableLeftMaint style='BACKGROUND:#ffffff;text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sum_coc_cust_5wk_avg).toFixed(0))+"</td >";
        result = result + "<td class=TableLeftMaint>&nbsp;</td >";
        result = result + "</tr >";
        result = result + "<tr >";
        result = result + "<td class=TableLeftMaint>&nbsp;</td >";
        result = result + "<td class=TableLeftMaint style='text-align:right;'>BSA</td >";
        result = result + "<td class=TableLeftMaint style='BACKGROUND:#ffffff;text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sum_coc_bsa_teu).toFixed(0))+"</td >";
        result = result + "<td class=TableLeftMaint style='BACKGROUND:#ffffff;text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sum_coc_bsa_mt).toFixed(0))+"</td >";
        result = result + "<td class=TableLeftMaint >&nbsp;</td >";
        result = result + "<td class=TableLeftMaint style='text-align:right;'>Vol / Cust</td >";
        result = result + "<td class=TableLeftMaint style='BACKGROUND:#ffffff;text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sum_coc_vol_cust_curr_wk).toFixed(0))+"</td >";
        result = result + "<td class=TableLeftMaint style='text-align:right;'>Vol / Cust</td >";
        result = result + "<td class=TableLeftMaint style='BACKGROUND:#ffffff;text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sum_coc_vol_cust_5wk_avg).toFixed(0))+"</td >";
        result = result + "<td class=TableLeftMaint>&nbsp;</td >";
        result = result + "</tr >";
        result = result + "<tr >";
        result = result + "<td class=TableLeftMaint>&nbsp;</td >";
        result = result + "<td class=TableLeftMaint style='text-align:right;'>vs BSA</td >";
        result = result + "<td class=TableLeftMaint style='BACKGROUND:#ffffff;text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sum_coc_percent_teu).toFixed(0))+"</td >";
        result = result + "<td class=TableLeftMaint style='BACKGROUND:#ffffff;text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sum_coc_percent_mt).toFixed(0))+"</td >";
        result = result + "<td class=TableLeftMaint >%</td >";
        result = result + "<td class=TableLeftMaint>&nbsp;</td >";
        result = result + "<td class=TableLeftMaint>&nbsp;</td >";
        result = result + "<td class=TableLeftMaint>&nbsp;</td >";
        result = result + "<td class=TableLeftMaint>&nbsp;</td >";
        result = result + "<td class=TableLeftMaint>&nbsp;</td >";
        result = result + "</tr >";
        result = result + "</table>";
        result = result + "</td >";
        result = result + "</tr >";
        result = result + "<tr >";
        result = result + "<td align=center>&nbsp;</td >";
        result = result + "</tr >";
        result = result + "<tr >";
        result = result + "<td align=center>";
        result = result + "<table border=0 cellpadding=0 cellspacing=1 width=80% >";
        result = result + "<tr><td width=100% class=TableLeftText colspan=10>SOC</td></tr>";
        result = result + "<tr >";
        result = result + "<td class=TableLeftMaint width=10%>&nbsp;</td >";
        result = result + "<td class=TableLeftMaint width=10%>&nbsp;</td >";
        result = result + "<td class=TableLeftMaint width=10%>TEU</td >";
        result = result + "<td class=TableLeftMaint width=10%>mT</td >";
        result = result + "<td class=TableLeftMaint width=10%>&nbsp;</td >";
        result = result + "<td class=TableLeftMaint width=10%>&nbsp;</td >";
        result = result + "<td class=TableLeftMaint width=10%>Current wk</td >";
        result = result + "<td class=TableLeftMaint width=10%>&nbsp;</td >";
        result = result + "<td class=TableLeftMaint width=10%>5wk avg</td >";
        result = result + "<td class=TableLeftMaint width=10%>&nbsp;</td >";
        result = result + "</tr >";
        result = result + "<tr >";
        result = result + "<td class=TableLeftMaint>&nbsp;</td >";
        result = result + "<td class=TableLeftMaint style='text-align:right;'>Current wk Vol</td >";
        result = result + "<td class=TableLeftMaint style='BACKGROUND:#ffffff;text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sum_soc_curr_wk_vol_teu).toFixed(0))+"</td >";
        result = result + "<td class=TableLeftMaint style='BACKGROUND:#ffffff;text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sum_soc_curr_wk_vol_mt).toFixed(0))+"</td >";
        result = result + "<td class=TableLeftMaint>&nbsp;</td >";
        result = result + "<td class=TableLeftMaint style='text-align:right;'># Cust</td >";
        result = result + "<td class=TableLeftMaint style='BACKGROUND:#ffffff;text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sum_soc_cust_curr_wk).toFixed(0))+"</td >";
        result = result + "<td class=TableLeftMaint style='text-align:right;'># Cust</td >";
        result = result + "<td class=TableLeftMaint style='BACKGROUND:#ffffff;text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sum_soc_cust_5wk_avg).toFixed(0))+"</td >";
        result = result + "<td class=TableLeftMaint>&nbsp;</td >";
        result = result + "</tr >";
        result = result + "<tr >";
        result = result + "<td class=TableLeftMaint>&nbsp;</td >";
        result = result + "<td class=TableLeftMaint style='text-align:right;'>BSA</td >";
        result = result + "<td class=TableLeftMaint style='BACKGROUND:#ffffff;text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sum_soc_bsa_teu).toFixed(0))+"</td >";
        result = result + "<td class=TableLeftMaint style='BACKGROUND:#ffffff;text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sum_soc_bsa_mt).toFixed(0))+"</td >";
        result = result + "<td class=TableLeftMaint >%</td >";
        result = result + "<td class=TableLeftMaint style='text-align:right;'>Vol / Cust</td >";
        result = result + "<td class=TableLeftMaint style='BACKGROUND:#ffffff;text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sum_soc_vol_cust_curr_wk).toFixed(0))+"</td >";
        result = result + "<td class=TableLeftMaint style='text-align:right;'>Vol / Cust</td >";
        result = result + "<td class=TableLeftMaint style='BACKGROUND:#ffffff;text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sum_soc_vol_cust_5wk_avg).toFixed(0))+"</td >";
        result = result + "<td class=TableLeftMaint>&nbsp;</td >";
        result = result + "</tr >";
        result = result + "<tr >";
        result = result + "<td class=TableLeftMaint>&nbsp;</td >";
        result = result + "<td class=TableLeftMaint style='text-align:right;'>vs BSA</td >";
        result = result + "<td class=TableLeftMaint style='BACKGROUND:#ffffff;text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sum_soc_percent_teu).toFixed(0))+"</td >";
        result = result + "<td class=TableLeftMaint style='BACKGROUND:#ffffff;text-align:right;'>"+changeZeroToSpace(parseFloat(doc.sum_soc_percent_mt).toFixed(0))+"</td >";
        result = result + "<td class=TableLeftMaint >%</td >";
        result = result + "<td class=TableLeftMaint>&nbsp;</td >";
        result = result + "<td class=TableLeftMaint>&nbsp;</td >";
        result = result + "<td class=TableLeftMaint>&nbsp;</td >";
        result = result + "<td class=TableLeftMaint>&nbsp;</td >";
        result = result + "<td class=TableLeftMaint>&nbsp;</td >";
        result = result + "</tr >";
        result = result + "</table>";
        result = result + "</td >";
        result = result + "</tr >";
        result = result + "</table>";
    }catch(err){
        alert(err.message);
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

function generateDetail_pod_pol(doc,check_por,check_pot1,check_pot2,check_pld){
    var result = "";
//    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>"+doc.por+"</td>";
//    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>"+doc.pol+"</td>";
//    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>"+doc.pot1+"</td>";
//    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>"+doc.pot2+"</td>";
//    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>"+doc.pod+"</td>";
//    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>"+doc.pld+"</td>";
//    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>"+doc.coc_soc+"</td>";
//    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>"+doc.cargo_type+"</td>";

    if(check_por == "N" && check_pot1 == "N" && check_pot2 == "N"){
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:20%;' colspan=4>"+doc.pol+"&nbsp;</td>";
    }else if(check_por == "N" && check_pot1 == "N" && check_pot2 == "Y"){
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;' colspan=2>"+doc.pol+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;' colspan=2>"+doc.pot2+"&nbsp;</td>";
    }else if(check_por == "N" && check_pot1 == "Y" && check_pot2 == "N"){
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;' colspan=2>"+doc.pol+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;' colspan=2>"+doc.pot1+"&nbsp;</td>";
    }else if(check_por == "Y" && check_pot1 == "N" && check_pot2 == "N"){
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;'>"+doc.por+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;' colspan=3>"+doc.pol+"&nbsp;</td>";
    }else if(check_por == "N" && check_pot1 == "Y" && check_pot2 == "Y"){
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;' colspan=2>"+doc.pol+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+doc.pot1+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+doc.pot2+"&nbsp;</td>";
    }else if(check_por == "Y" && check_pot1 == "N" && check_pot2 == "Y"){
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+doc.por+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;' colspan=2>"+doc.pol+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+doc.pot2+"&nbsp;</td>";
    }else if(check_por == "Y" && check_pot1 == "Y" && check_pot2 == "N"){
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+doc.por+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+doc.pol+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;' colspan=2>"+doc.pot1+"&nbsp;</td>";
    }else{
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+doc.por+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+doc.pol+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+doc.pot1+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+doc.pot2+"&nbsp;</td>";
    }

    if(check_pld == "N"){
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;' colspan=2>"+doc.pod+"&nbsp;</td>";
    }else{
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+doc.pod+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+doc.pld+"&nbsp;</td>";
    }

    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+doc.coc_soc+"&nbsp;</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%; BORDER-RIGHT: gray 2px solid'>"+doc.cargo_type+"&nbsp;</td>";

    return result;
}

function generateDetail_service(doc){
    var result = "";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>"+doc.bound+"&nbsp;</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>"+doc.svc_leg1+"&nbsp;</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>"+doc.svc_leg2+"&nbsp;</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>"+doc.svc_leg3+"&nbsp;</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>"+doc.coc_soc+"&nbsp;</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); BORDER-RIGHT: gray 2px solid;'>"+doc.cargo_type+"&nbsp;</td>";

    return result;
}

function generateWeek_1(doc,check_20,check_40,check_teu,check_weight){
    var result = "";
    if(check_20 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk120).toFixed(0))+"</td>";
    }
    if(check_40 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk140).toFixed(0))+"</td>";
    }
    if(check_teu == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk1teu).toFixed(0))+"</td>";
    }
    if(check_weight == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk1weight).toFixed(0))+"</td>";
    }

    return result;
}
function generateWeek_2(doc,check_20,check_40,check_teu,check_weight){
    var result = "";
    if(check_20 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk220).toFixed(0))+"</td>";
    }
    if(check_40 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk240).toFixed(0))+"</td>";
    }
    if(check_teu == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk2teu).toFixed(0))+"</td>";
    }
    if(check_weight == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk2weight).toFixed(0))+"</td>";
    }

    return result;
}

function generateWeek_3(doc,check_20,check_40,check_teu,check_weight){
    var result = "";
    if(check_20 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk320).toFixed(0))+"</td>";
    }
    if(check_40 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk340).toFixed(0))+"</td>";
    }
    if(check_teu == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk3teu).toFixed(0))+"</td>";
    }
    if(check_weight == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk3weight).toFixed(0))+"</td>";
    }

    return result;
}

function generateWeek_4(doc,check_20,check_40,check_teu,check_weight){
    var result = "";
    if(check_20 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk420).toFixed(0))+"</td>";
    }
    if(check_40 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk440).toFixed(0))+"</td>";
    }
    if(check_teu == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk4teu).toFixed(0))+"</td>";
    }
    if(check_weight == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk4weight).toFixed(0))+"</td>";
    }

    return result;
}

function generateWeek_5(doc,check_20,check_40,check_teu,check_weight){
    var result = "";
    if(check_20 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk520).toFixed(0))+"</td>";
    }
    if(check_40 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk540).toFixed(0))+"</td>";
    }
    if(check_teu == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk5teu).toFixed(0))+"</td>";
    }
    if(check_weight == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk5weight).toFixed(0))+"</td>";
    }

    return result;
}

function generateBsa(doc){
    var result = "";
    result = result + "<td style='text-align:right;BORDER-LEFT: gray 2px solid;'>"+changeZeroToSpace(parseFloat(doc.bsa_teu).toFixed(0))+"</td>";
    result = result + "<td style='text-align:right;BORDER-RIGHT: gray 2px solid;'>"+changeZeroToSpace(parseFloat(doc.bsa_weight).toFixed(0))+"</td>";

    return result;
}

function generateForeCast_1(doc,check_20,check_40,check_teu,check_weight){
    var result = "";
    if(check_20 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk120).toFixed(0))+"</td>";
    }
    if(check_40 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk140).toFixed(0))+"</td>";
    }
    if(check_teu == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk1teu).toFixed(0))+"</td>";
    }
    if(check_weight == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk1weight).toFixed(0))+"</td>";
    }

    return result;
}
function generateForeCast_2(doc,check_20,check_40,check_teu,check_weight){
    var result = "";
    if(check_20 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk220).toFixed(0))+"</td>";
    }
    if(check_40 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk240).toFixed(0))+"</td>";
    }
    if(check_teu == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk2teu).toFixed(0))+"</td>";
    }
    if(check_weight == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk2weight).toFixed(0))+"</td>";
    }

    return result;
}

function generateForeCast_3(doc,check_20,check_40,check_teu,check_weight){
    var result = "";
    if(check_20 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk320).toFixed(0))+"</td>";
    }
    if(check_40 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk340).toFixed(0))+"</td>";
    }
    if(check_teu == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk3teu).toFixed(0))+"</td>";
    }
    if(check_weight == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk3weight).toFixed(0))+"</td>";
    }

    return result;
}

function generateForeCast_4(doc,check_20,check_40,check_teu,check_weight){
    var result = "";
    if(check_20 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk420).toFixed(0))+"</td>";
    }
    if(check_40 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk440).toFixed(0))+"</td>";
    }
    if(check_teu == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk4teu).toFixed(0))+"</td>";
    }
    if(check_weight == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk4weight).toFixed(0))+"</td>";
    }

    return result;
}

function generateForeCast_5(doc,check_20,check_40,check_teu,check_weight){

    var result = "";
    if(check_20 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk520).toFixed(0))+"</td>";
    }
    if(check_40 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk540).toFixed(0))+"</td>";
    }
    if(check_teu == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk5teu).toFixed(0))+"</td>";
    }
    if(check_weight == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.fcast_wk5weight).toFixed(0))+"</td>";
    }

    return result;
}

function generateAvgAndCust(doc){

    var result = "";

    result = result + "<td style='text-align:right; BORDER-LEFT: gray 2px solid;'>"+changeZeroToSpace(parseFloat(doc.act_5wkcust).toFixed(0))+"</td>";
    result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.avg_5wk).toFixed(0))+"</td>";

    return result;
}

function generateEmptyColumn(check_20,check_40,check_teu,check_weight){

    var result = "";
    if(check_20 == "Y"){
        result = result + "<td >&nbsp;</td>";
    }
    if(check_40 == "Y"){
        result = result + "<td >&nbsp;</td>";
    }
    if(check_teu == "Y"){
        result = result + "<td >&nbsp;</td>";
    }
    if(check_weight == "Y"){
        result = result + "<td >&nbsp;</td>";
    }

    return result;
}

function generateCondiotion(check_20,check_40,check_teu,check_weight){

    var result = "";

    if(check_20 == "Y"){
        result = result + "<td class=TableCenterSub ><a style='width:30'>20</a></td>";
    }
    if(check_40 == "Y"){
        result = result + "<td class=TableCenterSub ><a style='width:30'>40</a></td>";
    }
    if(check_teu == "Y"){
        result = result + "<td class=TableCenterSub ><a style='width:30'>TEU</a></td>";
    }
    if(check_weight == "Y"){
        result = result + "<td class=TableCenterSub ><a style='width:30'>mT</a></td>";
    }

    return result;
}

function generateSubCondiotion(check_20,check_40,check_teu,check_weight){

    var result = "";

    if(check_20 == "Y"){
        result = result + "<td class=TableCenterSub style='FONT-SIZE:100%;'><a style='width:30'>20</a></td>";
    }
    if(check_40 == "Y"){
        result = result + "<td class=TableCenterSub style='FONT-SIZE:100%;'><a style='width:30'>40</a></td>";
    }
    if(check_teu == "Y"){
        result = result + "<td class=TableCenterSub style='FONT-SIZE:100%;'><a style='width:30'>TEU</a></td>";
    }
    if(check_weight == "Y"){
        result = result + "<td class=TableCenterSub style='FONT-SIZE:100%;'><a style='width:30'>mT</a></td>";
    }

    return result;
}

function generateSubHeaderColumn(){
    var result = "";

    result = result + "<td class=TableLeftWhite nowrap style='FONT-SIZE:100%;position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:3'>&nbsp;</td>";
    result = result + "<td class=TableCenterSub nowrap style='FONT-SIZE:100%;position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%'>Cust Code</td>";
    result = result + "<td class=TableCenterSub nowrap colspan=3 style='FONT-SIZE:100%;position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'> Customer name</td>";
    result = result + "<td class=TableCenterSub nowrap style='FONT-SIZE:100%;position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%'>Type</td>";
    result = result + "<td class=TableCenterSub nowrap style='FONT-SIZE:100%;position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%'>Sales</td>";
    result = result + "<td class=TableCenterSub nowrap style='FONT-SIZE:100%;position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%'>C/S</td>";
    result = result + "<td class=TableCenterSub nowrap style='FONT-SIZE:100%;position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%; BORDER-RIGHT: gray 2px solid;'>CGO</td>";



    return result;
}

function generateSubDetail(doc){
    var result = "";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);background-color:#ffffff'>&nbsp;</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);' >"+doc.cust_code+"&nbsp;</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);' colspan=3>"+doc.cust_name+"&nbsp;</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>"+doc.type+"&nbsp;</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>"+doc.sales+"&nbsp;</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>"+doc.coc_soc+"&nbsp;</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); BORDER-RIGHT: gray 2px solid;'>"+doc.cargo_type+"&nbsp;</td>";

    return result;
}

function generateSubHeaderServiceColumn(){
    var result = "";

    result = result + "<td class=TableLeftWhite nowrap style='FONT-SIZE:100%;position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>&nbsp;</td>";
    result = result + "<td class=TableCenterSub nowrap style='FONT-SIZE:100%;position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>Cust Code</td>";
    result = result + "<td class=TableCenterSub nowrap style='FONT-SIZE:100%;position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'> Customer name</td>";
    result = result + "<td class=TableCenterSub nowrap style='FONT-SIZE:100%;position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>Type</td>";
    result = result + "<td class=TableCenterSub nowrap style='FONT-SIZE:100%;position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>Sales</td>";
    result = result + "<td class=TableCenterSub nowrap style='FONT-SIZE:100%;position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>C/S</td>";
    result = result + "<td class=TableCenterSub nowrap style='FONT-SIZE:100%;position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); BORDER-RIGHT: gray 2px solid;'>CGO</td>";

    return result;
}

function generateSubDetailService(doc){
    var result = "";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);background-color:#ffffff'>&nbsp;</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);' >"+doc.cust_code+"&nbsp;</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);' >"+doc.cust_name+"&nbsp;</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>"+doc.type+"&nbsp;</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>"+doc.sales+"&nbsp;</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);'>"+doc.coc_soc+"&nbsp;</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); BORDER-RIGHT: gray 2px solid;'>"+doc.cargo_type+"&nbsp;</td>";

    return result;
}


function generateTotalCoc(doc){
    var result = "";

    return result;
}

function generateTotalSoc(doc){
    var result = "";

    return result;
}


function showHideRow(name,value,count){
//alert(name);
//alert(value);
//alert(count);
var p_img = eval("document.getElementById(\'img"+count+"\')");

for(i = 0 ; i < parseInt(value) ; i++){
//    alert(name+i);

    var s = eval("document.getElementById(\'"+name+i+"\')");

//    alert(":"+s.style.display);

    if(s.style.display == "inline"){
        s.style.display = 'none';
        p_img.value = " + ";
//        p_img.src = "/SMTWebApp/images/btnArrowDown.gif";
    }else{
        s.style.display = 'inline';
        p_img.value = " - ";
//        p_img.src = "/SMTWebApp/images/btnArrowNext.gif";
    }
}
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
