/* 
 * creates a new XMLHttpRequest object which is the backbone of AJAX, 
 * or returns false if the browser doesn't support it 
 */
function getXMLHttpRequest() { 
      var xmlHttpReq = false; 
      // to create XMLHttpRequest object in non-Microsoft browsers 
      if (window.XMLHttpRequest) { 
        xmlHttpReq = new XMLHttpRequest(); 
      } else if (window.ActiveXObject) { 
        try { 
          // to create XMLHttpRequest object in later versions 
          // of Internet Explorer 
          xmlHttpReq = new ActiveXObject("Msxml2.XMLHTTP"); 
        } catch (exp1) { 
          try { 
            // to create XMLHttpRequest object in older versions 
            // of Internet Explorer 
            xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP"); 
          } catch (exp2) { 
            xmlHttpReq = false; 
          } 
        } 
      } 
      return xmlHttpReq; 
} 
