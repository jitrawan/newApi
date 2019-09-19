function getReadyStateHandler(xmlHttpRequest, portion) {

    return function() {
//    alert("portion "+portion);
        if (portion == "getForecast") {

            document.getElementById("display_forecast").innerHTML = "Loading ...";
//            document.getElementById("display_tos_header").innerHTML = "<img src=/TOSWebApp/images/loading.gif height=45 style=position: absolute; left: 100px; top: 50px;>";
//            document.getElementById("display_tos_operation").innerHTML = "";
//            document.getElementById("display_tos_activities").innerHTML = "";
//            alert(xmlHttpRequest.status);
            if (xmlHttpRequest.readyState == 4) {
              if (xmlHttpRequest.status == 200) {

                var doc = eval('(' + xmlHttpRequest.responseText + ')');
//                alert(""+generateHTML_HQ_Summary(doc));
                document.getElementById("display_forecast").innerHTML = generateHTML_Sale_Forecast(doc); //xmlHttpRequest.responseText;

              } else {
                alert("HTTP error " + xmlHttpRequest.status + ": " + xmlHttpRequest.statusText);
              }
            }
        }
    };
}

function getSaleForecast(frm) {
    try {
//    alert("p_region "+p_region);
//    alert("p_year "+p_year);
//    alert("p_period "+p_period);
//    alert("p_week "+p_week);
        var p_location = frm.tbx_location.value;
        var p_sale = frm.tbx_sale.value;
        var p_year = frm.tbx_year.value;
        var p_period = frm.tbx_period.value;
        var p_week = frm.tbx_week.value;
        var coc_soc = frm.cmbCoc.value;
        var cargo_type = frm.cmbCargo.value;
        var size20="Y";
        var size40="Y";
        var size_teu="Y";
        var size_act5wk="Y";
        var size_fcast5wk="Y";
        var size_bkg5wk="Y";
        var por="Y";
        var pot1="Y";
        var pot2="Y";
        var pld="Y";
        var pageAction = "getForecastData";
        var potion = "getForecast";
//        alert("view_by "+view_by);

        size20 = frm.chk_20;
        size40 = frm.chk_40;
        size_teu = frm.chk_teu;
        size_act5wk = frm.chk_act5wk;
        size_fcast5wk = frm.chk_fcast5wk;
        size_bkg5wk = frm.chk_bkg5wk;

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
                    "&p_sale="+p_sale +
                    "&size_20=" + ((size20.checked == true)?size20.value:"N") +
                    "&size_40=" + ((size40.checked == true)?size40.value:"N") +
                    "&size_teu=" + ((size_teu.checked == true)?size_teu.value:"N") +
                    "&size_act5wk=" + ((size_act5wk.checked == true)?size_act5wk.value:"N") +
                    "&size_fcast5wk=" + ((size_fcast5wk.checked == true)?size_fcast5wk.value:"N") +
                    "&size_bkg5wk=" + ((size_bkg5wk.checked == true)?size_bkg5wk.value:"N") +
                    "&por=" + ((por.checked == true)?por.value:"N") +
                    "&pot1=" + ((pot1.checked == true)?pot1.value:"N") +
                    "&pot2=" + ((pot2.checked == true)?pot2.value:"N") +
                    "&pld=" + ((pld.checked == true)?pld.value:"N") ;

//        alert("url"+url);
        var xmlHttpRequest = getXMLHttpRequest();
        xmlHttpRequest.onreadystatechange = getReadyStateHandler(xmlHttpRequest, potion);
        xmlHttpRequest.open("POST", "/SMTWebApp/RrcStandardSrv?service=ui.smt.SmtSalesForecastSvc", true);
        xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlHttpRequest.send(url);
    } catch (err) {
    alert("err "+err.message);
    }
}

function addNewCustomer(frm) {
    try {
//    alert("p_region "+p_region);
//    alert("p_year "+p_year);
//    alert("p_period "+p_period);
//    alert("p_week "+p_week);
        var p_location = frm.tbx_location.value;
        var p_sale = frm.tbx_sale.value;
        var p_year = frm.tbx_year.value;
        var p_period = frm.tbx_period.value;
        var p_week = frm.tbx_week.value;
        var coc_soc = frm.cmbCoc.value;
        var cargo_type = frm.cmbCargo.value;
        var size20="Y";
        var size40="Y";
        var size_teu="Y";
        var size_act5wk="Y";
        var size_fcast5wk="Y";
        var size_bkg5wk="Y";
        var por="Y";
        var pot1="Y";
        var pot2="Y";
        var pld="Y";
        var pageAction = "addNewCustomer";
        var potion = "getForecast";
//        alert("view_by "+view_by);

        size20 = frm.chk_20;
        size40 = frm.chk_40;
        size_teu = frm.chk_teu;
        size_act5wk = frm.chk_act5wk;
        size_fcast5wk = frm.chk_fcast5wk;
        size_bkg5wk = frm.chk_bkg5wk;

        por = frm.chk_por;
        pot1 = frm.chk_pot1;
        pot2 = frm.chk_pot2;
        pld = frm.chk_pld;
        
//        alert("por:"+por.value);
//        alert("pot1:"+pot1.value);
//        alert("pot2:"+pot2.value);
//        alert("pld:"+pld.value);

        var url = "pageAction="+pageAction +
                    "&p_year="+p_year +
                    "&p_period="+p_period +
                    "&p_location="+p_location +
                    "&p_week="+p_week +
                    "&p_coc="+coc_soc +
                    "&p_cargo="+cargo_type +
                    "&size_20=" + ((size20.checked == true)?size20.value:"N") +
                    "&size_40=" + ((size40.checked == true)?size40.value:"N") +
                    "&size_teu=" + ((size_teu.checked == true)?size_teu.value:"N") +
                    "&size_act5wk=" + ((size_act5wk.checked == true)?size_act5wk.value:"N") +
                    "&size_fcast5wk=" + ((size_fcast5wk.checked == true)?size_fcast5wk.value:"N") +
                    "&size_bkg5wk=" + ((size_bkg5wk.checked == true)?size_bkg5wk.value:"N") +
                    "&por=" + ((por.checked == true)?por.value:"N") +
                    "&pot1=" + ((pot1.checked == true)?pot1.value:"N") +
                    "&pot2=" + ((pot2.checked == true)?pot2.value:"N") +
                    "&pld=" + ((pld.checked == true)?pld.value:"N") ;

//        alert("url"+url);
        var xmlHttpRequest = getXMLHttpRequest();
        xmlHttpRequest.onreadystatechange = getReadyStateHandler(xmlHttpRequest, potion);
        xmlHttpRequest.open("POST", "/SMTWebApp/RrcStandardSrv?service=ui.smt.SmtSalesForecastSvc", true);
        xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlHttpRequest.send(url);
    } catch (err) {
    alert("err "+err.message);
    }
}

function saveSalesForecast(frm) {
    try{
        var url = "pageAction=saveForecast";
        var potion = "getForecast";
        var xmlHttpRequest = getXMLHttpRequest();
        xmlHttpRequest.onreadystatechange = getReadyStateHandler(xmlHttpRequest, potion);
        xmlHttpRequest.open("POST", "/SMTWebApp/RrcStandardSrv?service=ui.smt.SmtSalesForecastSvc", true);
        xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlHttpRequest.send(url);
    } catch (err) {
    alert("err "+err.message);
    }
}

function submitSalesForecast(frm) {
    try{
        var url = "pageAction=submitForecast";
        var potion = "getForecast";
        var xmlHttpRequest = getXMLHttpRequest();
        xmlHttpRequest.onreadystatechange = getReadyStateHandler(xmlHttpRequest, potion);
        xmlHttpRequest.open("POST", "/SMTWebApp/RrcStandardSrv?service=ui.smt.SmtSalesForecastSvc", true);
        xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlHttpRequest.send(url);
    } catch (err) {
    alert("err "+err.message);
    }
}

function deleteSalesForecast(frm) {
    try{
        var url = "pageAction=deleteItem";
        var potion = "getForecast";
        var xmlHttpRequest = getXMLHttpRequest();
        xmlHttpRequest.onreadystatechange = getReadyStateHandler(xmlHttpRequest, potion);
        xmlHttpRequest.open("POST", "/SMTWebApp/RrcStandardSrv?service=ui.smt.SmtSalesForecastSvc", true);
        xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlHttpRequest.send(url);
    } catch (err) {
    alert("err "+err.message);
    }
}


function generateHTML_Sale_Forecast(doc){

    var result = "";
    var check_20 = "N";
    var check_40 = "N";
    var check_teu = "N";
    var check_act5wk = "N";
    var check_fcast5wk = "N";
    var check_bkg5wk = "N";
    var check_por = "Y";
    var check_pot1= "Y";
    var check_pot2 = "Y";
    var check_pld = "Y";

    var region_count_detail = 0;
    var f_cast_status = "";
    
    var can_save = "";
    var search_first = "";
    
    var add_before = "";
    
    var yellowColour="#ffff81";
    var greenColour="#a0f692";
    var normalColour="#e8e3fd";
try{
    check_20 = doc.check_20;
    check_40 = doc.check_40;
    check_teu = doc.check_teu;
    
    check_act5wk = doc.check_act5wk;
    check_fcast5wk = doc.check_fcast5wk;
    check_bkg5wk = doc.check_bkg5wk;

    check_por = doc.check_por;
    check_pot1 = doc.check_pot1;
    check_pot2 = doc.check_pot2;
    check_pld = doc.check_pld;
    can_save = doc.canSave;
    search_first = doc.searchFirst;
    
    add_before = doc.addBeforeSave;
    f_cast_status = doc.f_cast_status;
//    alert("f_cast_status "+f_cast_status);
//    document.frm.tbx_fcast.value = f_cast_status;
    document.getElementById('fcast_status').innerHTML = f_cast_status;
    
    document.getElementById('canSave').value = can_save;
    
    document.getElementById('searchFirst').value = search_first;
    document.getElementById('addBeforeSave').value = add_before;
    
    if(doc.from_approval == "N"){
        
        if(doc.f_cast_status == "Waitlisted" || doc.f_cast_status == "Completed"){
            document.getElementById('btnNewCust').disabled = true;
            document.getElementById('btnSubmit').disabled  = true;
        }else{
//            document.getElementById('btnNewCust').disabled = false;
            if(can_save == "Y"){
                document.getElementById('btnNewCust').disabled  = false;
                document.getElementById('btnSubmit').disabled  = false;
            }else{
                document.getElementById('btnNewCust').disabled  = true;
                document.getElementById('btnSubmit').disabled  = true;
            }
        }
        
        
    }
//    alert("check_por "+check_por);
//    alert("check_pot1 "+check_pot1);
//    alert("check_pot2 "+check_pot2);
//    alert("check_pld "+check_pld);

    var param_week = parseInt(doc.p_week);

    var maxWeek = parseInt(doc.p_max_week);
    
    
    var actual_count = 0;
    var fcast_count = 0;
    var week_count = 0;
    var header_count = 10;
    
    var mergeLast = 1;
    
    if(check_20 == "Y"){
        week_count = week_count + 1;
    }
    if(check_40 == "Y"){
        week_count = week_count + 1;
    }
    if(check_teu == "Y"){
        week_count = week_count + 1;
    }
    
    actual_count = 5 * week_count;
    
    if(check_fcast5wk == "Y"){
        fcast_count = fcast_count +( 5 * week_count);
    }
    if(check_bkg5wk == "Y"){
        fcast_count = fcast_count +( 5 * week_count);
    }
    
    if(check_por == "Y"){
        header_count = header_count + 1;
    }
    if(check_pot1 == "Y"){
        header_count = header_count + 1;
    }
    if(check_pot2 == "Y"){
        header_count = header_count + 1;
    }
    if(check_pld == "Y"){
        header_count = header_count + 1;
    }
    
    mergeLast = mergeLast + fcast_count;
    
    if(check_act5wk == "Y"){
        mergeLast = mergeLast + actual_count;
    }
//    alert(doc.msg_error);
    if(doc.msg_error != ""){
        showBarMessage('messagetd', doc.msg_error, 1);
    }else{
    showBarMessage('messagetd', "Ready", 0);
    result = result + "<table border=1 cellpadding=0 cellspacing=0 width=100% id=tableHeader style='border-collapse: collapse; BORDER: gray 2px solid;'>";
//    result = result + "<tr class=FreezedHeader  FreezedHeader2 TableLeftSub>";
    result = result + "<tr class=FreezedHeader >";
    
    if(check_por == "N" && check_pot1 == "N" && check_pot2 == "N"){
        result = result + "<td class=FreezedHeader2 nowrap rowspan='3' colspan=4 style='width:20% !important;'><a>POL</a></td>";//colspan=4 
    }else if(check_por == "N" && check_pot1 == "N" && check_pot2 == "Y"){
        result = result + "<td class=FreezedHeader2 nowrap rowspan='3' colspan=2 style='width:10% !important;'><a>POL</a></td>";//colspan=2 
        result = result + "<td class=FreezedHeader2 nowrap rowspan='3' colspan=2 style='width:10% !important;'><a>POT2</a></td>";//colspan=2 
    }else if(check_por == "N" && check_pot1 == "Y" && check_pot2 == "N"){
        result = result + "<td class=FreezedHeader2 nowrap rowspan='3' colspan=2  style='width:10% !important;'><a>POL</a></td>";//colspan=2 
        result = result + "<td class=FreezedHeader2 nowrap rowspan='3' colspan=2 style='width:10% !important;'><a>POT1</a></td>";//colspan=2 
    }else if(check_por == "Y" && check_pot1 == "N" && check_pot2 == "N"){
        result = result + "<td class=FreezedHeader2 nowrap rowspan='3'><a>POR</a></td>";
        result = result + "<td class=FreezedHeader2 nowrap rowspan='3' colspan=3 style='width:15% !important;' ><a>POL</a></td>";//colspan=3 
    }else if(check_por == "N" && check_pot1 == "Y" && check_pot2 == "Y"){
        result = result + "<td class=FreezedHeader2 nowrap rowspan='3' colspan=2 style='width:10% !important;' ><a>POL</a></td>";//colspan=2 
        result = result + "<td class=FreezedHeader2 nowrap rowspan='3'><a>POT1</a></td>";
        result = result + "<td class=FreezedHeader2 nowrap rowspan='3'><a>POT2</a></td>";
    }else if(check_por == "Y" && check_pot1 == "N" && check_pot2 == "Y"){
        result = result + "<td class=FreezedHeader2 nowrap rowspan='3'><a>POR</a></td>";
        result = result + "<td class=FreezedHeader2 nowrap rowspan='3' colspan=2 style='width:10% !important;' ><a>POL</a></td>";//colspan=2 
        result = result + "<td class=FreezedHeader2 nowrap rowspan='3'><a>POT2</a></td>";
    }else if(check_por == "Y" && check_pot1 == "Y" && check_pot2 == "N"){
        result = result + "<td class=FreezedHeader2 nowrap rowspan='3'><a>POR</a></td>";
        result = result + "<td class=FreezedHeader2 nowrap rowspan='3'><a>POL</a></td>";
        result = result + "<td class=FreezedHeader2 nowrap rowspan='3' colspan=2 style='width:10% !important;' ><a>POT1</a></td>";
        //colspan=2 
    }else{
        result = result + "<td class=FreezedHeader2 nowrap rowspan='3'><a>POR</a></td>";
        result = result + "<td class=FreezedHeader2 nowrap rowspan='3'><a>POL</a></td>";
        result = result + "<td class=FreezedHeader2 nowrap rowspan='3'><a>POT1</a></td>";
        result = result + "<td class=FreezedHeader2 nowrap rowspan='3'><a>POT2</a></td>";
    }

    if(check_pld == "N"){
    //colspan=2 
        result = result + "<td class=FreezedHeader2 nowrap colspan=2 rowspan='3' style='width:10% !important;' ><a>POD</a></td>";
    }else{
        result = result + "<td class=FreezedHeader2 nowrap rowspan='3'><a>POD</a></td>";
        result = result + "<td class=FreezedHeader2 nowrap rowspan='3'><a>PLD</a></td>";
    }
    
    result = result + "<td class=FreezedHeader2 nowrap rowspan='3'><a>Svc leg1</a></td>";
    result = result + "<td class=FreezedHeader2 nowrap rowspan='3'><a>Svc leg2</a></td>";
    result = result + "<td class=FreezedHeader2 nowrap rowspan='3'><a>Svc leg3</a></td>";
    result = result + "<td class=FreezedHeader2 nowrap rowspan='3'><a>C/S</a></td>";
    result = result + "<td class=FreezedHeader2 nowrap rowspan='3'><a>CGO</a></td>";
//    result = result + "<td class=FreezedHeader2 nowrap rowspan='3' style='text-align:center;' ><a>CLIENT NAME<br>("+doc.customer_view+")</a></td>";
    result = result + "<td class=FreezedHeader2 nowrap rowspan='3'><a>CLIENT NAME &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></td>";
    result = result + "<td class=FreezedHeader2 nowrap rowspan='3'><a>CLIENT CODE</a></td>";
    result = result + "<td class=FreezedHeader2 nowrap rowspan='3'  style='BORDER-RIGHT: gray 2px solid'><a>CLIENT  TYPE</a></td>";
    
    if(check_act5wk == "Y"){
        result = result + "<td class=TableCenterSubNoBottom colspan="+actual_count+" style='BORDER-RIGHT: gray 2px solid;BACKGROUND-COLOR:"+normalColour+";'><a>Actual</a></td>";
    }
    if(check_fcast5wk == "Y" || check_bkg5wk == "Y"){
        result = result + "<td class=TableCenterSubNoBottom colspan="+fcast_count+" style='BORDER-RIGHT: gray 2px solid;BACKGROUND-COLOR:"+yellowColour+";'><a>Fcast</a></td>";
    }
    result = result + "<td class=TableCenterSubNoBottom style='BORDER-LEFT: gray 2px solid;'><a>&nbsp;</a></td>";
    
    result = result + "</tr>";

    result = result + "<tr >";
    
    if(check_act5wk == "Y"){
//        if((param_week-4) <= 0) {
//            if((param_week-4) == 0) {
//                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+">Wk "+(maxWeek-1)+"</td>";
//            }else if((param_week-4) == -1){
//                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+">Wk "+(maxWeek-2)+"</td>";
//            }else if((param_week-4) == -2){
//                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+">Wk "+(maxWeek-3)+"</td>";
//            }else{
//                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+">Wk "+(maxWeek-4)+"</td>";
//            }
//        }else{
//            result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+">Wk "+(param_week-5)+"</td>";
//        }
//        
//        if((param_week-3) <= 0) {
//            if((param_week-3) == 0) {
//                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+">Wk "+(maxWeek-1)+"</td>";
//            }else if((param_week-3) == -1){
//                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+">Wk "+(maxWeek-2)+"</td>";
//            }else if((param_week-3) == -2){
//                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+">Wk "+(maxWeek-3)+"</td>";
//            }else{
//                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+">Wk "+(maxWeek-4)+"</td>";
//            }
//        }else{
//            result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+">Wk "+(param_week-4)+"</td>";
//        }
//        
//        if((param_week-2) <= 0) {
//            if((param_week-2) == 0) {
//                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+">Wk "+(maxWeek-1)+"</td>";
//            }else if((param_week-2) == -1){
//                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+">Wk "+(maxWeek-1)+"</td>";
//            }else if((param_week-2) == -2){
//                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+">Wk "+(maxWeek-2)+"</td>";
//            }else{
//                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+">Wk "+(maxWeek-3)+"</td>";
//            }
//        }else{
//            result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+">Wk "+(param_week-3)+"</td>";
//        }
//
//        if((param_week-1) <= 1) {
//            if((param_week-1) == 1) {
//                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+">Wk "+(maxWeek)+"</td>";
//            }else{
//                result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+">Wk "+(maxWeek-1)+"</td>";
//            }
//        }else{
//            result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+">Wk "+(param_week-2)+"</td>";
//        }
//        
//        if((param_week-1) == 0) {
//            result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+" style='BORDER-RIGHT: gray 2px solid;'>Wk "+(maxWeek)+"</td>";
//        }else{
//            result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+" style='BORDER-RIGHT: gray 2px solid;'>Wk "+(param_week-1)+"</td>";
//        }

        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+" style='BACKGROUND-COLOR:"+normalColour+";'>Wk "+minusWeek(param_week,5,maxWeek)+"</td>";
        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+" style='BACKGROUND-COLOR:"+normalColour+";'>Wk "+minusWeek(param_week,4,maxWeek)+"</td>";
        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+" style='BACKGROUND-COLOR:"+normalColour+";'>Wk "+minusWeek(param_week,3,maxWeek)+"</td>";
        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+" style='BACKGROUND-COLOR:"+normalColour+";'>Wk "+minusWeek(param_week,2,maxWeek)+"</td>";
        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+" style='BORDER-RIGHT: gray 2px solid;BACKGROUND-COLOR:"+normalColour+";'>Wk "+minusWeek(param_week,1,maxWeek)+"</td>";
    }
    
    if(check_fcast5wk == "Y"){
        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+" style='BACKGROUND-COLOR: "+yellowColour+";'>Wk "+plusWeek(param_week,0,maxWeek)+"</td>";
    }
    if(check_bkg5wk == "Y"){
        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+" style='BACKGROUND-COLOR: "+greenColour+";'>Wk "+plusWeek(param_week,0,maxWeek)+" BKG</td>";
    }
    
    if(check_fcast5wk == "Y"){
        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+" style='BACKGROUND-COLOR: "+yellowColour+";'>Wk "+plusWeek(param_week,1,maxWeek)+"</td>";
    }
    if(check_bkg5wk == "Y"){
        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+" style='BACKGROUND-COLOR: "+greenColour+";'>Wk "+plusWeek(param_week,1,maxWeek)+" BKG</td>";
    }
    
    if(check_fcast5wk == "Y"){
        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+" style='BACKGROUND-COLOR: "+yellowColour+";'>Wk "+plusWeek(param_week,2,maxWeek)+"</td>";
    }
    if(check_bkg5wk == "Y"){
        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+" style='BACKGROUND-COLOR: "+greenColour+";'>Wk "+plusWeek(param_week,2,maxWeek)+" BKG</td>";
    }
    
    if(check_fcast5wk == "Y"){
        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+" style='BACKGROUND-COLOR: "+yellowColour+";'>Wk"+plusWeek(param_week,3,maxWeek)+"</td>";
    }
    if(check_bkg5wk == "Y"){
        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+" style='BACKGROUND-COLOR: "+greenColour+";'>Wk "+plusWeek(param_week,3,maxWeek)+" BKG</td>";
    }
    
    if(check_fcast5wk == "Y"){
        if(check_bkg5wk == "Y"){
            result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+" style='BACKGROUND-COLOR: "+yellowColour+";'>Wk "+plusWeek(param_week,4,maxWeek)+"</td>";
        }else{
            result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+" style='BORDER-RIGHT: gray 2px solid;BACKGROUND-COLOR:"+yellowColour+";'>Wk "+plusWeek(param_week,4,maxWeek)+"</td>";
        }
    }
    if(check_bkg5wk == "Y"){
        result = result + "<td class=TableCenterSubNoBottom width=10% colspan="+week_count+" style='BORDER-RIGHT: gray 2px solid;BACKGROUND-COLOR: "+greenColour+";'>Wk "+plusWeek(param_week,4,maxWeek)+" BKG</td>";
    }
    result = result + "<td class=TableCenterSubNoBottom style='BORDER-LEFT: gray 2px solid; '><a>DEL</a></td>";
    result = result + "</tr>";
    
    result = result + "<tr >";
    
    if(check_act5wk == "Y"){
        result = result + generateCondiotion(check_20,check_40,check_teu,false,normalColour);
        result = result + generateCondiotion(check_20,check_40,check_teu,false,normalColour);
        result = result + generateCondiotion(check_20,check_40,check_teu,false,normalColour);
        result = result + generateCondiotion(check_20,check_40,check_teu,false,normalColour);
        result = result + generateCondiotion(check_20,check_40,check_teu,true,normalColour);
    }
    
    if(check_fcast5wk == "Y"){
        result = result + generateCondiotion(check_20,check_40,check_teu,false,yellowColour);
    }
    if(check_bkg5wk == "Y"){
        result = result + generateCondiotion(check_20,check_40,check_teu,false,greenColour);
    }
    if(check_fcast5wk == "Y"){
        result = result + generateCondiotion(check_20,check_40,check_teu,false,yellowColour);
    }
    if(check_bkg5wk == "Y"){
        result = result + generateCondiotion(check_20,check_40,check_teu,false,greenColour);
    }
    if(check_fcast5wk == "Y"){
        result = result + generateCondiotion(check_20,check_40,check_teu,false,yellowColour);
    }
    if(check_bkg5wk == "Y"){
        result = result + generateCondiotion(check_20,check_40,check_teu,false,greenColour);
    }
    if(check_fcast5wk == "Y"){
        result = result + generateCondiotion(check_20,check_40,check_teu,false,yellowColour);
    }
    if(check_bkg5wk == "Y"){
        result = result + generateCondiotion(check_20,check_40,check_teu,false,greenColour);
    }
    if(check_fcast5wk == "Y"){
        if(check_bkg5wk == "Y"){
            result = result + generateCondiotion(check_20,check_40,check_teu,false,yellowColour);
        }else{
            result = result + generateCondiotion(check_20,check_40,check_teu,true,yellowColour);
        }
    }
    if(check_bkg5wk == "Y"){
        result = result + generateCondiotion(check_20,check_40,check_teu,true,greenColour);
    }
    result = result + "<td class=TableCenterSubNoBottom style='BORDER-LEFT: gray 2px solid; '><a>&nbsp;</a></td>";
    result = result + "</tr>";
    
    for(hdr = 0 ; hdr < doc.sale_forecast.length ; hdr++){
        var even = "style='background-color: #F2F5F9;'";
          if( (hdr % 2) == 1){
            result = result + "<tr class=TableLeftWhite " + even + ">";
          } else {
            result = result + "<tr class=TableLeftWhite >";
          }
//    alert("doc.sale_forecast[hdr].record_type:"+doc.sale_forecast[hdr].record_type);
    if(doc.sale_forecast[hdr].record_type_wk1 == "I"){
        if(doc.from_approval != "Y"){
            if(doc.f_cast_status == "Waitlisted" || doc.f_cast_status == "Completed"){
                result = result + generateHeaderGroupEditable(doc,check_por,check_pot1,check_pot2,check_pld,hdr,true);
            }else{
                result = result + generateHeaderGroupEditable(doc,check_por,check_pot1,check_pot2,check_pld,hdr,false);
            }
        }else{
            result = result + generateHeaderGroupEditable(doc,check_por,check_pot1,check_pot2,check_pld,hdr,true);
        }
        
    }else{
        result = result + generateHeaderGroup(doc,check_por,check_pot1,check_pot2,check_pld,hdr);
    }
    
    
    if(check_act5wk == "Y"){
        result = result + generateWeek_1(doc.sale_forecast[hdr],check_20,check_40,check_teu);
        result = result + generateWeek_2(doc.sale_forecast[hdr],check_20,check_40,check_teu);
        result = result + generateWeek_3(doc.sale_forecast[hdr],check_20,check_40,check_teu);
        result = result + generateWeek_4(doc.sale_forecast[hdr],check_20,check_40,check_teu);
        result = result + generateWeek_5(doc.sale_forecast[hdr],check_20,check_40,check_teu);
    }
    
    if(check_fcast5wk == "Y" || check_bkg5wk == "Y" ){
    var isFieldReadOnly = false;
        if(doc.from_approval == "Y"){
            isFieldReadOnly = true;
        }else{
             if(doc.f_cast_status == "Waitlisted" || doc.f_cast_status == "Completed"){
                isFieldReadOnly = true;
             }
        }
        if(check_fcast5wk == "Y"){
            result = result + generateForeCastWeek_1(doc.sale_forecast[hdr],check_20,check_40,check_teu,hdr,yellowColour,isFieldReadOnly);
        }
        if(check_bkg5wk == "Y"){
            result = result + generateBKGWeek_1(doc.sale_forecast[hdr],check_20,check_40,check_teu,greenColour,hdr,0);
        }
        if(check_fcast5wk == "Y"){    
            result = result + generateForeCastWeek_2(doc.sale_forecast[hdr],check_20,check_40,check_teu,hdr,yellowColour,isFieldReadOnly);
        }
        if(check_bkg5wk == "Y"){
            result = result + generateBKGWeek_2(doc.sale_forecast[hdr],check_20,check_40,check_teu,greenColour,hdr,1);
        }
        if(check_fcast5wk == "Y"){    
            result = result + generateForeCastWeek_3(doc.sale_forecast[hdr],check_20,check_40,check_teu,hdr,yellowColour,isFieldReadOnly);
        }
        if(check_bkg5wk == "Y"){
            result = result + generateBKGWeek_3(doc.sale_forecast[hdr],check_20,check_40,check_teu,greenColour,hdr,2);
        }
        if(check_fcast5wk == "Y"){    
            result = result + generateForeCastWeek_4(doc.sale_forecast[hdr],check_20,check_40,check_teu,hdr,yellowColour,isFieldReadOnly);
        }
        if(check_bkg5wk == "Y"){
            result = result + generateBKGWeek_4(doc.sale_forecast[hdr],check_20,check_40,check_teu,greenColour,hdr,3);
        }
        if(check_fcast5wk == "Y"){  
            result = result + generateForeCastWeek_5(doc.sale_forecast[hdr],check_20,check_40,check_teu,hdr,yellowColour,isFieldReadOnly);
            
        }
        if(check_bkg5wk == "Y"){
            result = result + generateBKGWeek_5(doc.sale_forecast[hdr],check_20,check_40,check_teu,greenColour,hdr,4);
        }
    }
//    if(doc.sale_forecast[hdr].run_type == "M"){
    if(doc.sale_forecast[hdr].record_type == "I"){   
        
        var selDelete = "";
        if(doc.sale_forecast[hdr].isDelete == "Y"){
            selDelete = "checked";
        }
        result = result + "<td style='BORDER-LEFT: gray 2px solid;' ><input type=checkbox name=chk_del_"+hdr+" value=Y "+selDelete+"></td>";
    }else{
        result = result + "<td style='BORDER-LEFT: gray 2px solid;' >&nbsp;</td>";
    }
//    }else{
//        result = result + "<td >&nbsp;</td>";
//    }
    result = result + "</tr>";
    
    }
    
    result = result + "<tr class=TableLeftWhite style='FONT-WEIGHT:bold;'>";
//"+header_count+"
    result = result + "<td colspan=14 style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);text-align:right; BORDER-RIGHT: gray 2px solid;'  >Total COC&nbsp;&nbsp;&nbsp;&nbsp;</td>";
    
    if(check_act5wk == "Y"){
        result = result + generateSumWeek(doc.sumCocActWk120,doc.sumCocActWk140,doc.sumCocActWk1Teu,check_20,check_40,check_teu);
        result = result + generateSumWeek(doc.sumCocActWk220,doc.sumCocActWk240,doc.sumCocActWk2Teu,check_20,check_40,check_teu);
        result = result + generateSumWeek(doc.sumCocActWk320,doc.sumCocActWk340,doc.sumCocActWk3Teu,check_20,check_40,check_teu);
        result = result + generateSumWeek(doc.sumCocActWk420,doc.sumCocActWk440,doc.sumCocActWk4Teu,check_20,check_40,check_teu);
        result = result + generateSumWeek_Border(doc.sumCocActWk520,doc.sumCocActWk540,doc.sumCocActWk5Teu,check_20,check_40,check_teu);
    }
    
    if(check_fcast5wk == "Y" || check_bkg5wk == "Y" ){
    
        if(check_fcast5wk == "Y"){
            result = result + generateSumWeek(doc.sumCocFCastWk120,doc.sumCocFCastWk140,doc.sumCocFCastWk1Teu,check_20,check_40,check_teu);
        }
        if(check_bkg5wk == "Y"){
            result = result + generateSumWeek(doc.sumCocBkgWk120,doc.sumCocBkgWk140,doc.sumCocBkgWk1Teu,check_20,check_40,check_teu);
        }
        if(check_fcast5wk == "Y"){    
            result = result + generateSumWeek(doc.sumCocFCastWk220,doc.sumCocFCastWk240,doc.sumCocFCastWk2Teu,check_20,check_40,check_teu);
        }
        if(check_bkg5wk == "Y"){
            result = result + generateSumWeek(doc.sumCocBkgWk220,doc.sumCocBkgWk240,doc.sumCocBkgWk2Teu,check_20,check_40,check_teu);
        }
        if(check_fcast5wk == "Y"){    
            result = result + generateSumWeek(doc.sumCocFCastWk320,doc.sumCocFCastWk340,doc.sumCocFCastWk3Teu,check_20,check_40,check_teu);
        }
        if(check_bkg5wk == "Y"){
            result = result + generateSumWeek(doc.sumCocBkgWk320,doc.sumCocBkgWk340,doc.sumCocBkgWk3Teu,check_20,check_40,check_teu);
        }
        if(check_fcast5wk == "Y"){    
            result = result + generateSumWeek(doc.sumCocFCastWk420,doc.sumCocFCastWk440,doc.sumCocFCastWk4Teu,check_20,check_40,check_teu);
        }
        if(check_bkg5wk == "Y"){
            result = result + generateSumWeek(doc.sumCocBkgWk420,doc.sumCocBkgWk440,doc.sumCocBkgWk4Teu,check_20,check_40,check_teu);
        }
        if(check_fcast5wk == "Y"){ 
            if(check_bkg5wk == "Y"){
                result = result + generateSumWeek(doc.sumCocFCastWk520,doc.sumCocFCastWk540,doc.sumCocFCastWk5Teu,check_20,check_40,check_teu);
            }else{
                result = result + generateSumWeek_Border(doc.sumCocFCastWk520,doc.sumCocFCastWk540,doc.sumCocFCastWk5Teu,check_20,check_40,check_teu);
            }
            
        }
        if(check_bkg5wk == "Y"){
            result = result + generateSumWeek_Border(doc.sumCocBkgWk520,doc.sumCocBkgWk540,doc.sumCocBkgWk5Teu,check_20,check_40,check_teu);
        }
    }
    result = result + "<td >&nbsp;</td>";
    result = result + "</tr>";
    
    result = result + "<tr class=TableLeftWhite style='FONT-WEIGHT:bold;'>";
//"+header_count+"
    result = result + "<td colspan=14 style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);text-align:right; BORDER-RIGHT: gray 2px solid;'  >Total SOC&nbsp;&nbsp;&nbsp;&nbsp;</td>";
    
    if(check_act5wk == "Y"){
        result = result + generateSumWeek(doc.sumSocActWk120,doc.sumSocActWk140,doc.sumSocActWk1Teu,check_20,check_40,check_teu);
        result = result + generateSumWeek(doc.sumSocActWk220,doc.sumSocActWk240,doc.sumSocActWk2Teu,check_20,check_40,check_teu);
        result = result + generateSumWeek(doc.sumSocActWk320,doc.sumSocActWk340,doc.sumSocActWk3Teu,check_20,check_40,check_teu);
        result = result + generateSumWeek(doc.sumSocActWk420,doc.sumSocActWk440,doc.sumSocActWk4Teu,check_20,check_40,check_teu);
        result = result + generateSumWeek_Border(doc.sumSocActWk520,doc.sumSocActWk540,doc.sumSocActWk5Teu,check_20,check_40,check_teu);
    }
    
    if(check_fcast5wk == "Y" || check_bkg5wk == "Y" ){
    
        if(check_fcast5wk == "Y"){
            result = result + generateSumWeek(doc.sumSocFCastWk120,doc.sumSocFCastWk140,doc.sumSocFCastWk1Teu,check_20,check_40,check_teu);
        }
        if(check_bkg5wk == "Y"){
            result = result + generateSumWeek(doc.sumSocBkgWk120,doc.sumSocBkgWk140,doc.sumSocBkgWk1Teu,check_20,check_40,check_teu);
        }
        if(check_fcast5wk == "Y"){    
            result = result + generateSumWeek(doc.sumSocFCastWk220,doc.sumSocFCastWk240,doc.sumSocFCastWk2Teu,check_20,check_40,check_teu);
        }
        if(check_bkg5wk == "Y"){
            result = result + generateSumWeek(doc.sumSocBkgWk220,doc.sumSocBkgWk240,doc.sumSocBkgWk2Teu,check_20,check_40,check_teu);
        }
        if(check_fcast5wk == "Y"){    
            result = result + generateSumWeek(doc.sumSocFCastWk320,doc.sumSocFCastWk340,doc.sumSocFCastWk3Teu,check_20,check_40,check_teu);
        }
        if(check_bkg5wk == "Y"){
            result = result + generateSumWeek(doc.sumSocBkgWk320,doc.sumSocBkgWk340,doc.sumSocBkgWk3Teu,check_20,check_40,check_teu);
        }
        if(check_fcast5wk == "Y"){    
            result = result + generateSumWeek(doc.sumSocFCastWk420,doc.sumSocFCastWk440,doc.sumSocFCastWk4Teu,check_20,check_40,check_teu);
        }
        if(check_bkg5wk == "Y"){
            result = result + generateSumWeek(doc.sumSocBkgWk420,doc.sumSocBkgWk440,doc.sumSocBkgWk4Teu,check_20,check_40,check_teu);
        }
        if(check_fcast5wk == "Y"){ 
            if(check_bkg5wk == "Y"){
                result = result + generateSumWeek(doc.sumSocFCastWk520,doc.sumSocFCastWk540,doc.sumSocFCastWk5Teu,check_20,check_40,check_teu);
            }else{
                result = result + generateSumWeek_Border(doc.sumSocFCastWk520,doc.sumSocFCastWk540,doc.sumSocFCastWk5Teu,check_20,check_40,check_teu);
            }
            
        }
        if(check_bkg5wk == "Y"){
            result = result + generateSumWeek_Border(doc.sumSocBkgWk520,doc.sumSocBkgWk540,doc.sumSocBkgWk5Teu,check_20,check_40,check_teu);
        }
    }
    result = result + "<td >&nbsp;</td>";
    result = result + "</tr>";
    
    result = result + "<tr>";
    result = result + "<td colspan=14 class=TableLeftSub style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft);text-align:right;'  >&nbsp;</td>";
    
    if(doc.from_approval == "Y"){
        result = result + "<td colspan="+mergeLast+" class=TableLeftSub style='text-align:right; BORDER-RIGHT: gray 2px solid;'  >&nbsp;</td>";
    }else{
        if(doc.f_cast_status == "Waitlisted" || doc.f_cast_status == "Completed"){
            result = result + "<td colspan="+mergeLast+" class=TableLeftSub style='text-align:right; BORDER-RIGHT: gray 2px solid;'  >&nbsp;</td>";
        }else{
            result = result + "<td colspan="+mergeLast+" class=TableLeftSub style='text-align:right; BORDER-RIGHT: gray 2px solid;'  ><input type=button class=FormBtnClr value=' Delete ' onclick=\"deleteDetail();\"></td>";
        }
        
    }
    
    result = result + "</tr>";
    
    result = result + "</table>";
    
    }
    }catch(err){
        alert(err.message);
    }
    
    if(doc.save_msg != ""){
        showBarMessage('messagetd', doc.save_msg, 0);
    }
    runPage1();
    return result;
}

function generateHeaderGroup(doc,check_por,check_pot1,check_pot2,check_pld){
    var result = "";
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
    
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+doc.svc_leg1+"&nbsp;</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+doc.svc_leg2+"&nbsp;</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+doc.svc_leg3+"&nbsp;</td>";

    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+doc.coc_soc+"&nbsp;</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%; BORDER-RIGHT: gray 2px solid'>"+doc.cargo_type+"&nbsp;</td>";

    return result;
}

//function generateHeaderGroup(doc,check_por,check_pot1,check_pot2,check_pld){
//    var result = "";
//    if(check_por == "N" && check_pot1 == "N" && check_pot2 == "N"){
//        result = result + "<td  colspan=4>"+doc.pol+"&nbsp;</td>";
//    }else if(check_por == "N" && check_pot1 == "N" && check_pot2 == "Y"){
//        result = result + "<td  colspan=2>"+doc.pol+"&nbsp;</td>";
//        result = result + "<td colspan=2>"+doc.pot2+"&nbsp;</td>";
//    }else if(check_por == "N" && check_pot1 == "Y" && check_pot2 == "N"){
//        result = result + "<td  colspan=2>"+doc.pol+"&nbsp;</td>";
//        result = result + "<td  colspan=2>"+doc.pot1+"&nbsp;</td>";
//    }else if(check_por == "Y" && check_pot1 == "N" && check_pot2 == "N"){
//        result = result + "<td >"+doc.por+"&nbsp;</td>";
//        result = result + "<td  colspan=3>"+doc.pol+"&nbsp;</td>";
//    }else if(check_por == "N" && check_pot1 == "Y" && check_pot2 == "Y"){
//        result = result + "<td  colspan=2>"+doc.pol+"&nbsp;</td>";
//        result = result + "<td >"+doc.pot1+"&nbsp;</td>";
//        result = result + "<td >"+doc.pot2+"&nbsp;</td>";
//    }else if(check_por == "Y" && check_pot1 == "N" && check_pot2 == "Y"){
//        result = result + "<td >"+doc.por+"&nbsp;</td>";
//        result = result + "<td  colspan=2>"+doc.pol+"&nbsp;</td>";
//        result = result + "<td >"+doc.pot2+"&nbsp;</td>";
//    }else if(check_por == "Y" && check_pot1 == "Y" && check_pot2 == "N"){
//        result = result + "<td >"+doc.por+"&nbsp;</td>";
//        result = result + "<td >"+doc.pol+"&nbsp;</td>";
//        result = result + "<td  colspan=2>"+doc.pot1+"&nbsp;</td>";
//    }else{
//        result = result + "<td >"+doc.por+"&nbsp;</td>";
//        result = result + "<td >"+doc.pol+"&nbsp;</td>";
//        result = result + "<td >"+doc.pot1+"&nbsp;</td>";
//        result = result + "<td >"+doc.pot2+"&nbsp;</td>";
//    }
//
//    if(check_pld == "N"){
//        result = result + "<td  colspan=2>"+doc.pod+"&nbsp;</td>";
//    }else{
//        result = result + "<td >"+doc.pod+"&nbsp;</td>";
//        result = result + "<td >"+doc.pld+"&nbsp;</td>";
//    }
//    
//    result = result + "<td >"+doc.svc_leg1+"&nbsp;</td>";
//    result = result + "<td >"+doc.svc_leg2+"&nbsp;</td>";
//    result = result + "<td >"+doc.svc_leg3+"&nbsp;</td>";
//
//    result = result + "<td >"+doc.coc_soc+"&nbsp;</td>";
//    result = result + "<td style=' BORDER-RIGHT: gray 2px solid'>"+doc.cargo_type+"&nbsp;</td>";
//
//    return result;
//}

function generateHeaderGroup(doc,check_por,check_pot1,check_pot2,check_pld,seq){
    var result = "";
    //style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:20%;'
    if(check_por == "N" && check_pot1 == "N" && check_pot2 == "N"){
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;' colspan=4 >"+doc.sale_forecast[seq].pol+"&nbsp;</td>";//colspan=4
    }else if(check_por == "N" && check_pot1 == "N" && check_pot2 == "Y"){
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;' colspan=2>"+doc.sale_forecast[seq].pol+"&nbsp;</td>";//colspan=2
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;' colspan=2>"+doc.sale_forecast[seq].pot2+"&nbsp;</td>";//colspan=2
    }else if(check_por == "N" && check_pot1 == "Y" && check_pot2 == "N"){
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;' colspan=2>"+doc.sale_forecast[seq].pol+"&nbsp;</td>";//colspan=2
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;' colspan=2>"+doc.sale_forecast[seq].pot1+"&nbsp;</td>";//colspan=2
    }else if(check_por == "Y" && check_pot1 == "N" && check_pot2 == "N"){
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;' >"+doc.sale_forecast[seq].por+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;' colspan=3 >"+doc.sale_forecast[seq].pol+"&nbsp;</td>";//colspan=3
    }else if(check_por == "N" && check_pot1 == "Y" && check_pot2 == "Y"){
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;' colspan=2>"+doc.sale_forecast[seq].pol+"&nbsp;</td>";//colspan=2
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;'>"+doc.sale_forecast[seq].pot1+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+doc.sale_forecast[seq].pot2+"&nbsp;</td>";
    }else if(check_por == "Y" && check_pot1 == "N" && check_pot2 == "Y"){
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+doc.sale_forecast[seq].por+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;' colspan=2>"+doc.sale_forecast[seq].pol+"&nbsp;</td>";//colspan=2
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+doc.sale_forecast[seq].pot2+"&nbsp;</td>";
    }else if(check_por == "Y" && check_pot1 == "Y" && check_pot2 == "N"){
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+doc.sale_forecast[seq].por+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;'>"+doc.sale_forecast[seq].pol+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;' colspan=2>"+doc.sale_forecast[seq].pot1+"&nbsp;</td>";//colspan=2
    }else{
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+doc.sale_forecast[seq].por+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+doc.sale_forecast[seq].pol+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+doc.sale_forecast[seq].pot1+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+doc.sale_forecast[seq].pot2+"&nbsp;</td>";
    }

    if(check_pld == "N"){
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:20%;' colspan=2>"+doc.sale_forecast[seq].pod+"&nbsp;</td>";//colspan=2
    }else{
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;'>"+doc.sale_forecast[seq].pod+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;'>"+doc.sale_forecast[seq].pld+"&nbsp;</td>";
    }
    
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;'>"+doc.sale_forecast[seq].svc_leg1+"&nbsp;</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;'>"+doc.sale_forecast[seq].svc_leg2+"&nbsp;</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;'>"+doc.sale_forecast[seq].svc_leg3+"&nbsp;</td>";

    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+doc.sale_forecast[seq].coc_soc+"&nbsp;</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+doc.sale_forecast[seq].cargo_type_dis+"&nbsp;</td>";
    
//    result = result + "<td >"+doc.coc_soc+"&nbsp;</td>";
//    result = result + "<td >"+doc.cargo_type+"&nbsp;</td>";
    
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:40%;' title='Cust Name : "+doc.sale_forecast[seq].cnt_name+"' >"+(doc.sale_forecast[seq].cnt_name).substring(0, 16)+"&nbsp;</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;' title='Cust View : "+doc.sale_forecast[seq].cust_view+"' >"+doc.sale_forecast[seq].cnt_code+"&nbsp;</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;BORDER-RIGHT: gray 2px solid'>"+doc.sale_forecast[seq].cnt_type+"&nbsp;</td>";

    return result;
}

function generateHeaderGroupEditable(doc,check_por,check_pot1,check_pot2,check_pld,seq,isReadOnly){
    var result = "";
    //style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:20%;'
    if(check_por == "N" && check_pot1 == "N" && check_pot2 == "N"){
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:20%;' colspan=4>"+createInputText("tbx_pol_"+seq,doc.sale_forecast[seq].pol,10,5,true,isReadOnly)+"&nbsp;</td>";
    }else if(check_por == "N" && check_pot1 == "N" && check_pot2 == "Y"){
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;' colspan=2>"+createInputText("tbx_pol_"+seq,doc.sale_forecast[seq].pol,10,5,true,isReadOnly)+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;' colspan=2>"+createInputText("tbx_pot2_"+seq,doc.sale_forecast[seq].pot2,10,5,false,isReadOnly)+"&nbsp;</td>";
    }else if(check_por == "N" && check_pot1 == "Y" && check_pot2 == "N"){
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;' colspan=2>"+createInputText("tbx_pol_"+seq,doc.sale_forecast[seq].pol,10,5,true,isReadOnly)+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;' colspan=2>"+createInputText("tbx_pot1_"+seq,doc.sale_forecast[seq].pot1,10,5,false,isReadOnly)+"&nbsp;</td>";
    }else if(check_por == "Y" && check_pot1 == "N" && check_pot2 == "N"){
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;' >"+createInputText("tbx_por_"+seq,doc.sale_forecast[seq].por,10,5,false,isReadOnly)+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;'  colspan=3>"+createInputText("tbx_pol_"+seq,doc.sale_forecast[seq].pol,10,5,true,isReadOnly)+"&nbsp;</td>";
    }else if(check_por == "N" && check_pot1 == "Y" && check_pot2 == "Y"){
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;' colspan=2>"+createInputText("tbx_pol_"+seq,doc.sale_forecast[seq].pol,10,5,true,isReadOnly)+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;'>"+createInputText("tbx_pot1_"+seq,doc.sale_forecast[seq].pot1,10,5,false,isReadOnly)+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+createInputText("tbx_pot2_"+seq,doc.sale_forecast[seq].pot2,10,5,false,isReadOnly)+"&nbsp;</td>";
    }else if(check_por == "Y" && check_pot1 == "N" && check_pot2 == "Y"){
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+createInputText("tbx_por_"+seq,doc.sale_forecast[seq].por,10,5,false,isReadOnly)+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;' colspan=2>"+createInputText("tbx_pol_"+seq,doc.sale_forecast[seq].pol,10,5,true,isReadOnly)+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+createInputText("tbx_pot2_"+seq,doc.sale_forecast[seq].pot2,10,5,false,isReadOnly)+"&nbsp;</td>";
    }else if(check_por == "Y" && check_pot1 == "Y" && check_pot2 == "N"){
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+createInputText("tbx_por_"+seq,doc.sale_forecast[seq].por,10,5,false,isReadOnly)+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;'>"+createInputText("tbx_pol_"+seq,doc.sale_forecast[seq].pol,10,5,true,isReadOnly)+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;' colspan=2>"+createInputText("tbx_pot1_"+seq,doc.sale_forecast[seq].pot1,10,5,false,isReadOnly)+"&nbsp;</td>";
    }else{
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+createInputText("tbx_por_"+seq,doc.sale_forecast[seq].por,10,5,false,isReadOnly)+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+createInputText("tbx_pol_"+seq,doc.sale_forecast[seq].pol,10,5,true,isReadOnly)+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+createInputText("tbx_pot1_"+seq,doc.sale_forecast[seq].pot1,10,5,false,isReadOnly)+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+createInputText("tbx_pot2_"+seq,doc.sale_forecast[seq].pot2,10,5,false,isReadOnly)+"&nbsp;</td>";
    }

    if(check_pld == "N"){
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:20%;' colspan=2>"+createInputText("tbx_pod_"+seq,doc.sale_forecast[seq].pod,10,5,true,isReadOnly)+"&nbsp;</td>";
    }else{
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;'>"+createInputText("tbx_pod_"+seq,doc.sale_forecast[seq].pod,10,5,true,isReadOnly)+"&nbsp;</td>";
        result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;'>"+createInputText("tbx_pld_"+seq,doc.sale_forecast[seq].pld,10,5,false,isReadOnly)+"&nbsp;</td>";
    }
    
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;'>"+createInputText("tbx_svc_leg1_"+seq,doc.sale_forecast[seq].svc_leg1,10,5,false,isReadOnly)+"&nbsp;"+createPopupService("tbx_svc_leg1_"+seq,"btn_svc_leg1_"+seq)+"</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;'>"+createInputText("tbx_svc_leg2_"+seq,doc.sale_forecast[seq].svc_leg2,10,5,false,isReadOnly)+"&nbsp;"+createPopupService("tbx_svc_leg2_"+seq,"btn_svc_leg2_"+seq)+"</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;'>"+createInputText("tbx_svc_leg3_"+seq,doc.sale_forecast[seq].svc_leg3,10,5,false,isReadOnly)+"&nbsp;"+createPopupService("tbx_svc_leg3_"+seq,"btn_svc_leg3_"+seq)+"</td>";

    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+createDropDownListCoc("cmb_coc_"+seq,doc.cmb_coc,doc.sale_forecast[seq].coc_soc)+"&nbsp;</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:5%;'>"+createDropDownListCargo("cmb_cargo_type_"+seq,doc.cmb_cargo_type,doc.sale_forecast[seq].cargo_type)+"&nbsp;</td>";
    
//    result = result + "<td >"+doc.coc_soc+"&nbsp;</td>";
//    result = result + "<td >"+doc.cargo_type+"&nbsp;</td>";
//    alert("doc.sale_forecast[seq].cnt_name "+encodeURIComponent(doc.sale_forecast[seq].cnt_name));
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:40%;'>"+createInputText("tbx_cnt_name_"+seq,doc.sale_forecast[seq].cnt_name,20,100,false,isReadOnly)+"&nbsp;</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;'>"+createInputText("tbx_cnt_code_"+seq,doc.sale_forecast[seq].cnt_code,20,10,false,isReadOnly)+"&nbsp;"+createPopupCustomer("tbx_cnt_code_"+seq,"tbx_cnt_name_"+seq,"tbx_cnt_type_"+seq,"btn_cust_"+seq)+"</td>";
    result = result + "<td style='position: relative; left: expression(parentNode.parentNode.parentNode.parentNode.scrollLeft); width:10%;BORDER-RIGHT: gray 2px solid'>"+createInputText("tbx_cnt_type_"+seq,doc.sale_forecast[seq].cnt_type,10,10,false,isReadOnly)+"&nbsp;</td>";

    return result;
}

function createInputTextRight(name,value,size,maxlength,isRequire,isReadOnly){
    var result = "";
    var formRequire = "FormTextBox";
    var formReadOnly = "";
//    var res = str.replace(/blue/g, "red"); 
//    alert("value  "+value);
//    alert("value  "+value.replace(/%20/g, " "));
//    var check = onkeypress="return inputNumberOnly(event) "; 
    
    if(isReadOnly){
        formReadOnly = "readonly";
    }
    if(isRequire){
        formRequire = "FormTextBoxReq";
    }
    
        result = result + "<input type=text class="+formRequire+" name="+name+" size="+size+" maxlength="+maxlength+"  "+formReadOnly+" style='text-align: right;' value=\""+value+"\" onkeypress=\"return inputNumberOnly(event) \"  >";
    
    return result;
}

function createInputText(name,value,size,maxlength,isRequire,isReadOnly){
    var result = "";
    var formRequire = "FormTextBox";
    var formReadOnly = "";
//    var res = str.replace(/blue/g, "red"); 
//    alert("value  "+value);
//    alert("value  "+value.replace(/%20/g, " "));
//    var check = onkeypress="return inputNumberOnly(event) "; 
    
    if(isReadOnly){
        formReadOnly = "readonly";
    }
    if(isRequire){
        formRequire = "FormTextBoxReq";
    }
    
        result = result + "<input type=text class="+formRequire+" name="+name+" size="+size+" maxlength="+maxlength+"  "+formReadOnly+"  value=\""+value+"\"   >";
    
    return result;
}

function createDropDownListCoc(name,value_list,value_check){
    var result = "";
    var selected = "";
    var all = "";
    
    result = result + "<select size=1 name="+name+" id="+name+"  class=FormDropDown >" ;
    if(value_list != null){
        for (i=0;i<=value_list.length-1;i++) {
            if(value_check == value_list[i].code){
                selected = "selected";
            }else{
                selected = "";
            }
            result = result + "<option value="+value_list[i].code+" "+selected+">"+value_list[i].code+"</option>";
        }
    }
    var result = result + "</select>";
    return result;
}

function createDropDownListCargo(name,value_list,value_check){
    var result = "";
    var selected = "";
    var all = "";
    
    result = result + "<select size=1 name="+name+" id="+name+"  class=FormDropDown >" ;
    if(value_list != null){
    result = result + "<option  selected value="+all+" >ALL</option>";
        for (i=0;i<=value_list.length-1;i++) {
            if(value_check == value_list[i].code){
                selected = "selected";
            }else{
                selected = "";
            }
            result = result + "<option value="+value_list[i].code+" "+selected+">"+value_list[i].value+"</option>";
        }
    }
    var result = result + "</select>";
    return result;
}

function createPopupService(nameText,nameButton){
    var result = "";
    
        result = result + "<input type=button  value=\". . .\" class=FormBtnClrHelp OnClick = \" openServiceHelp(\'"+nameText+"\');\" name="+nameButton+"  >"; 
        
    return result;
}

function createPopupCustomer(custCode,custName,custType,nameButton){
    var result = "";
    
        result = result + "<input type=button  value=\". . .\" class=FormBtnClrHelp OnClick = \" openCustomerHelp(\'"+custCode+"\',\'"+custName+"\',\'"+custType+"\');\" name="+nameButton+"  >"; 
        
    return result;
}


function generateCondiotion(check_20,check_40,check_teu,isBorder,backgroudColour){

    var result = "";

    if(check_20 == "Y"){
        if(isBorder && (check_40 != "Y" && check_teu != "Y")){
            result = result + "<td class=TableCenterSub style='BORDER-RIGHT: gray 2px solid;BACKGROUND-COLOR:"+backgroudColour+";' ><a style='width:30'>20</a></td>";
        }else{
            result = result + "<td class=TableCenterSub style='BACKGROUND-COLOR:"+backgroudColour+";'><a style='width:30'>20</a></td>";
        }
    }
    if(check_40 == "Y"){
        if(isBorder && check_teu != "Y"){
            result = result + "<td class=TableCenterSub style='BORDER-RIGHT: gray 2px solid;BACKGROUND-COLOR:"+backgroudColour+";'><a style='width:30'>40</a></td>";
        }else{
            result = result + "<td class=TableCenterSub style='BACKGROUND-COLOR:"+backgroudColour+";'><a style='width:30'>40</a></td>";
        }
    }
    if(check_teu == "Y"){
        if(isBorder){
            result = result + "<td class=TableCenterSub style='BORDER-RIGHT: gray 2px solid;BACKGROUND-COLOR:"+backgroudColour+";'><a style='width:30'>TEU</a></td>";
        }else{
            result = result + "<td class=TableCenterSub style='BACKGROUND-COLOR:"+backgroudColour+";'><a style='width:30'>TEU</a></td>";
        }
    }

    return result;
}

function generateEmptyColumn(check_20,check_40,check_teu){

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

    return result;
}

function generateWeek_1(doc,check_20,check_40,check_teu){
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

    return result;
}
function generateWeek_2(doc,check_20,check_40,check_teu){
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

    return result;
}

function generateWeek_3(doc,check_20,check_40,check_teu){
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

    return result;
}

function generateWeek_4(doc,check_20,check_40,check_teu){
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

    return result;
}

function generateWeek_5(doc,check_20,check_40,check_teu){
    var result = "";
    if(check_20 == "Y"){
        if(check_40 == "Y" || check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk520).toFixed(0))+"</td>";
        }else{
            result = result + "<td style='text-align:right; BORDER-RIGHT: gray 2px solid;'>"+changeZeroToSpace(parseFloat(doc.act_wk520).toFixed(0))+"</td>";
        }
    }
    if(check_40 == "Y"){
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(doc.act_wk540).toFixed(0))+"</td>";
        }else{
            result = result + "<td style='text-align:right; BORDER-RIGHT: gray 2px solid;'>"+changeZeroToSpace(parseFloat(doc.act_wk540).toFixed(0))+"</td>";
        }
    }
    if(check_teu == "Y"){
        result = result + "<td style='text-align:right; BORDER-RIGHT: gray 2px solid;'>"+changeZeroToSpace(parseFloat(doc.act_wk5teu).toFixed(0))+"</td>";
    }

    return result;
}

function generateSumWeek(value_20,value_40,value_teu,check_20,check_40,check_teu){
    var result = "";
    if(check_20 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(value_20).toFixed(0))+"</td>";
    }
    if(check_40 == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(value_40).toFixed(0))+"</td>";
    }
    if(check_teu == "Y"){
        result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(value_teu).toFixed(0))+"</td>";
    }

    return result;
}
function generateSumWeek_Border(value_20,value_40,value_teu,check_20,check_40,check_teu){
    var result = "";
    if(check_20 == "Y"){
        if(check_40 == "Y" || check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(value_20).toFixed(0))+"</td>";
        }else{
            result = result + "<td style='text-align:right; BORDER-RIGHT: gray 2px solid;'>"+changeZeroToSpace(parseFloat(value_20).toFixed(0))+"</td>";
        }
    }
    if(check_40 == "Y"){
        if(check_teu == "Y"){
            result = result + "<td style='text-align:right;'>"+changeZeroToSpace(parseFloat(value_40).toFixed(0))+"</td>";
        }else{
            result = result + "<td style='text-align:right; BORDER-RIGHT: gray 2px solid;'>"+changeZeroToSpace(parseFloat(value_40).toFixed(0))+"</td>";
        }
    }
    if(check_teu == "Y"){
        result = result + "<td style='text-align:right; BORDER-RIGHT: gray 2px solid;'>"+changeZeroToSpace(parseFloat(value_teu).toFixed(0))+"</td>";
    }

    return result;
}

function generateForeCastWeek_1(doc,check_20,check_40,check_teu,seq,backgroudColour,isReadOnly){
    var result = "";
    if(check_20 == "Y"){
        result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+createInputTextRight("tbx_forecast_wk120_"+seq,changeZeroToEmpty(parseFloat(doc.fcast_wk120).toFixed(0)),7,5,false,isReadOnly)+"</td>";
    }
    if(check_40 == "Y"){
        result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+createInputTextRight("tbx_forecast_wk140_"+seq,changeZeroToEmpty(parseFloat(doc.fcast_wk140).toFixed(0)),7,5,false,isReadOnly)+"</td>";
    }
    if(check_teu == "Y"){
        result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+changeZeroToSpace(parseFloat(doc.fcast_wk1teu).toFixed(0))+"</td>";
    }

    return result;
}
function generateForeCastWeek_2(doc,check_20,check_40,check_teu,seq,backgroudColour,isReadOnly){
    var result = "";
    if(check_20 == "Y"){
        result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+createInputTextRight("tbx_forecast_wk220_"+seq,changeZeroToEmpty(parseFloat(doc.fcast_wk220).toFixed(0)),7,5,false,isReadOnly)+"</td>";
    }
    if(check_40 == "Y"){
        result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+createInputTextRight("tbx_forecast_wk240_"+seq,changeZeroToEmpty(parseFloat(doc.fcast_wk240).toFixed(0)),7,5,false,isReadOnly)+"</td>";
    }
    if(check_teu == "Y"){
        result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+changeZeroToSpace(parseFloat(doc.fcast_wk2teu).toFixed(0))+"</td>";
    }

    return result;
}

function generateForeCastWeek_3(doc,check_20,check_40,check_teu,seq,backgroudColour,isReadOnly){
    var result = "";
    if(check_20 == "Y"){
        result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+createInputTextRight("tbx_forecast_wk320_"+seq,changeZeroToEmpty(parseFloat(doc.fcast_wk320).toFixed(0)),7,5,false,isReadOnly)+"</td>";
    }
    if(check_40 == "Y"){
        result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+createInputTextRight("tbx_forecast_wk340_"+seq,changeZeroToEmpty(parseFloat(doc.fcast_wk340).toFixed(0)),7,5,false,isReadOnly)+"</td>";
    }
    if(check_teu == "Y"){
        result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+changeZeroToSpace(parseFloat(doc.fcast_wk3teu).toFixed(0))+"</td>";
    }

    return result;
}

function generateForeCastWeek_4(doc,check_20,check_40,check_teu,seq,backgroudColour,isReadOnly){
    var result = "";
    if(check_20 == "Y"){
        result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+createInputTextRight("tbx_forecast_wk420_"+seq,changeZeroToEmpty(parseFloat(doc.fcast_wk420).toFixed(0)),7,5,false,isReadOnly)+"</td>";
    }
    if(check_40 == "Y"){
        result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+createInputTextRight("tbx_forecast_wk440_"+seq,changeZeroToEmpty(parseFloat(doc.fcast_wk440).toFixed(0)),7,5,false,isReadOnly)+"</td>";
    }
    if(check_teu == "Y"){
        result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+changeZeroToSpace(parseFloat(doc.fcast_wk4teu).toFixed(0))+"</td>";
    }

    return result;
}

function generateForeCastWeek_5(doc,check_20,check_40,check_teu,seq,backgroudColour,isReadOnly){

    var result = "";
    var border_right = "BORDER-RIGHT: gray 2px solid;";
    
    if(check_20 == "Y"){
        result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+createInputTextRight("tbx_forecast_wk520_"+seq,changeZeroToEmpty(parseFloat(doc.fcast_wk520).toFixed(0)),7,5,false,isReadOnly)+"</td>";
    }
    if(check_40 == "Y"){
        result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+createInputTextRight("tbx_forecast_wk540_"+seq,changeZeroToEmpty(parseFloat(doc.fcast_wk540).toFixed(0)),7,5,false,isReadOnly)+"</td>";
    }
    if(check_teu == "Y"){
        result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+changeZeroToSpace(parseFloat(doc.fcast_wk5teu).toFixed(0))+"</td>";
    }

    return result;
}

function generateBKGWeek_1(doc,check_20,check_40,check_teu,backgroudColour,seq,weekDisplay){
    var result = "";
    if(check_20 == "Y"){
        result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+changeZeroToSpace(parseFloat(doc.bkg_wk120).toFixed(0))+"</td>";
    }
    if(check_40 == "Y"){
        result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+changeZeroToSpace(parseFloat(doc.bkg_wk140).toFixed(0))+"</td>";
    }
    if(check_teu == "Y"){
        if(changeZeroToSpace(parseFloat(doc.bkg_wk1teu).toFixed(0)) == "&nbsp;"){
            result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+changeZeroToSpace(parseFloat(doc.bkg_wk1teu).toFixed(0))+"</td>";
        }else{
            result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'><a href='#' onclick=showDetail(\'"+seq+"\',\'"+weekDisplay+"\');>"+changeZeroToSpace(parseFloat(doc.bkg_wk1teu).toFixed(0))+"</a></td>";
        }
    }

    return result;
}
function generateBKGWeek_2(doc,check_20,check_40,check_teu,backgroudColour,seq,weekDisplay){
    var result = "";
    if(check_20 == "Y"){
        result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+changeZeroToSpace(parseFloat(doc.bkg_wk220).toFixed(0))+"</td>";
    }
    if(check_40 == "Y"){
        result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+changeZeroToSpace(parseFloat(doc.bkg_wk240).toFixed(0))+"</td>";
    }
    if(check_teu == "Y"){
        if(changeZeroToSpace(parseFloat(doc.bkg_wk2teu).toFixed(0)) == "&nbsp;"){
            result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+changeZeroToSpace(parseFloat(doc.bkg_wk2teu).toFixed(0))+"</td>";
        }else{
            result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'><a href='#' onclick=showDetail(\'"+seq+"\',\'"+weekDisplay+"\');>"+changeZeroToSpace(parseFloat(doc.bkg_wk2teu).toFixed(0))+"</a></td>";
        }
    }

    return result;
}

function generateBKGWeek_3(doc,check_20,check_40,check_teu,backgroudColour,seq,weekDisplay){
    var result = "";
    if(check_20 == "Y"){
        result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+changeZeroToSpace(parseFloat(doc.bkg_wk320).toFixed(0))+"</td>";
    }
    if(check_40 == "Y"){
        result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+changeZeroToSpace(parseFloat(doc.bkg_wk340).toFixed(0))+"</td>";
    }
    if(check_teu == "Y"){
        if(changeZeroToSpace(parseFloat(doc.bkg_wk3teu).toFixed(0)) == "&nbsp;"){
            result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+changeZeroToSpace(parseFloat(doc.bkg_wk3teu).toFixed(0))+"</td>";
        }else{
            result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'><a href='#' onclick=showDetail(\'"+seq+"\',\'"+weekDisplay+"\');>"+changeZeroToSpace(parseFloat(doc.bkg_wk3teu).toFixed(0))+"</a></td>";
        }
    }

    return result;
}

function generateBKGWeek_4(doc,check_20,check_40,check_teu,backgroudColour,seq,weekDisplay){
    var result = "";
    if(check_20 == "Y"){
        result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+changeZeroToSpace(parseFloat(doc.bkg_wk420).toFixed(0))+"</td>";
    }
    if(check_40 == "Y"){
        result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+changeZeroToSpace(parseFloat(doc.bkg_wk440).toFixed(0))+"</td>";
    }
    if(check_teu == "Y"){
        if(changeZeroToSpace(parseFloat(doc.bkg_wk4teu).toFixed(0)) == "&nbsp;"){
            result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+changeZeroToSpace(parseFloat(doc.bkg_wk4teu).toFixed(0))+"</td>";
        }else{
            result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'><a href='#' onclick=showDetail(\'"+seq+"\',\'"+weekDisplay+"\');>"+changeZeroToSpace(parseFloat(doc.bkg_wk4teu).toFixed(0))+"</a></td>";
        }
    }

    return result;
}

function generateBKGWeek_5(doc,check_20,check_40,check_teu,backgroudColour,seq,weekDisplay){
    var result = "";
    if(check_20 == "Y"){
        result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+changeZeroToSpace(parseFloat(doc.bkg_wk520).toFixed(0))+"</td>";
    }
    if(check_40 == "Y"){
        result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+changeZeroToSpace(parseFloat(doc.bkg_wk540).toFixed(0))+"</td>";
    }
    
    if(check_teu == "Y"){
        if(changeZeroToSpace(parseFloat(doc.bkg_wk5teu).toFixed(0)) == "&nbsp;"){
            result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'>"+changeZeroToSpace(parseFloat(doc.bkg_wk5teu).toFixed(0))+"</td>";
        }else{
            result = result + "<td style='text-align:right;BACKGROUND-COLOR:"+backgroudColour+";'><a href='#' onclick=showDetail(\'"+seq+"\',\'"+weekDisplay+"\');>"+changeZeroToSpace(parseFloat(doc.bkg_wk5teu).toFixed(0))+"</a></td>";
        }
    }

    return result;
}

function newCustomer(){

//    alert("aaa");
    document.getElementById("pageAction").value = "populateDataOnScreen";          
    var postVal = $("#frm").serialize();
//    alert("bbb");
    $.ajax({
            type: "POST",
            url: URL,
            beforeSend: isAllow = false,
            data: postVal,
            success: function(data){
//            alert("1");
                errorArray = data.split('#:#');
                
                if(errorArray[0] == '500'){
                     showBarMessage('messagetd', errorArray[1], 1); 
                     isAllow = false;
                }else if(errorArray[0] == '200' ){
                    addNewCustomer(document.frm);
                }
            }
    });  
}

function save(){

//    alert("aaa");
    var can_save = document.getElementById("canSave").value;
    var first_search = document.getElementById("searchFirst").value;
    var addBefore = document.getElementById("addBeforeSave").value;
    
    if(addBefore == ""){
        if(first_search == "Y"){
            pausePage1(); 
            if(can_save == "Y"){
                document.getElementById("pageAction").value = "checkDuplicate";          
                var postVal = $("#frm").serialize();
            //    alert("bbb");
                $.ajax({
                        type: "POST",
                        url: URL,
                        beforeSend: isAllow = false,
                        data: postVal,
                        success: function(data){
            //            alert("1");
                            errorArray = data.split('#:#');
                            
                            if(errorArray[0] == '500'){
                            runPage1();
                                 showBarMessage('messagetd', errorArray[1], 1); 
                                 isAllow = false;
                            }else if(errorArray[0] == '200' ){
                                showBarMessage('messagetd', "Ready", 0);
                                saveSalesForecast(document.frm);
            //                     runPage1();
                            }
                        }
                });  
            }else{
            runPage1();
                showBarMessage('messagetd', "Please select Cargo Type and COC/SOC as 'All'", 1); 
            }
        }else{
            showBarMessage('messagetd', "Please Find data before save.", 1);
        }
    }else{
        showBarMessage('messagetd', "Please Add Customer at least 1 before save.", 1);
    }
}

function submitForecast(){

//    alert("aaa");
    
    var addBefore = document.getElementById("addBeforeSave").value;
    if(addBefore == ""){
        document.getElementById("pageAction").value = "checkDuplicate";    
        
         pausePage1(); 
        var postVal = $("#frm").serialize();
    //    alert("bbb");
        $.ajax({
                type: "POST",
                url: URL,
                beforeSend: isAllow = false,
                data: postVal,
                success: function(data){
    //            alert("1");
                    errorArray = data.split('#:#');
                    
                    if(errorArray[0] == '500'){
                        runPage1();
                         showBarMessage('messagetd', errorArray[1], 1); 
                         isAllow = false;
                    }else if(errorArray[0] == '200' ){
                        showBarMessage('messagetd', "Ready", 0);
                        submitSalesForecast(document.frm);
    //                    runPage1(); 
                    }
                }
        });  
    }else{
        showBarMessage('messagetd', "Please Add Customer at least 1 before submit.", 1);
    }
}

function deleteDetail(){

//    alert("aaa");
    document.getElementById("pageAction").value = "populateDataOnScreen";          
    var postVal = $("#frm").serialize();
//    alert("bbb");
    $.ajax({
            type: "POST",
            url: URL,
            beforeSend: isAllow = false,
            data: postVal,
            success: function(data){
//            alert("1");
                errorArray = data.split('#:#');
                
                if(errorArray[0] == '500'){
                     showBarMessage('messagetd', errorArray[1], 1); 
                     isAllow = false;
                }else if(errorArray[0] == '200' ){
                    deleteSalesForecast(document.frm);
                }
            }
    });  
}

function submitApprove(){
//alert("sales_code "+sales_code);
//alert("seq "+seq);
    document.getElementById("pageAction").value = "approveStatus"; 
    
//    document.getElementById("sales_code_value").value   = sales_code;
//    document.getElementById("select_item").value   = seq;
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
                    document.getElementById('fcast_status').innerHTML = 'Completed';
//                    document.getElementById('fcast_status_'+seq).style.color = "#00AA00";
                    document.getElementById('btnApprove').disabled  = true;
                }
            }
    });  
    
}

function submitReject(){
//alert("sales_code "+sales_code);
//alert("seq "+seq);
    document.getElementById("pageAction").value = "rejectStatus"; 
    
//    document.getElementById("sales_code_value").value   = sales_code;
//    document.getElementById("select_item").value   = seq;
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
                    document.getElementById('fcast_status').innerHTML = 'Rejected';
//                    document.getElementById('fcast_status_'+seq).style.color = "#974706";
//                    
                    document.getElementById('btnApprove').disabled  = true;
                    document.getElementById('btnReject').disabled  = true;
                }
            }
    });  
}

function changeZeroToSpace(value){
    if((""+value) == "0" || (""+value) == "0.00" || (""+value) == "NaN" || (""+value).toUpperCase() == "INFINITY"){
        return "&nbsp;";
    }else{
        return numberWithCommas(value);
    }
}

function changeZeroToEmpty(value){
    if((""+value) == "0" || (""+value) == "0.00" || (""+value) == "NaN" || (""+value).toUpperCase() == "INFINITY"){
        return "";
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

function openServiceHelp(nameText){  
    var url = SERVICE_HELP_URL+'&pageAction=new&formName=frm&retName='+nameText;
    openHelpList(url);
}

function openCustomerHelp(custCode,custName,custType){
    var url = URL+'?service=ui.misc.help.RcmNewCustomerHelpSvc&pageAction=new&formName=frm&retName='+custCode+'|'+custName+'|'+custType;
//            alert("url > "+url);
    openHelpList(url);
}

function inputNumberOnly(key){
    isPass = true;
    if(key.keyCode <48 || key.keyCode > 57){
        isPass = false;
    }
    return isPass;
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

function back(sales_code,sales_office){
//alert(sales_office);
//    document.getElementById("sales_code_value").value   = sales_code;
//    document.getElementById("sales_office_value").value   = sales_office;
    document.frm.pageAction.value = "backToApproval";
    document.frm.submit();
}

function showDetail(seq,weekDisplay){
    var url = URL+'?service=ui.smt.SmtSalesForecastSvc&pageAction=openBookingDetail&seq='+seq+'&weekDisplay='+weekDisplay;

    openHelpList(url);
}
