package com.rclgroup.dolphin.web.dao.pilot;

import org.springframework.dao.DataAccessException;
import java.util.List;

public interface PilotDao {
     
     public List getData(String strHTTPHeader
    		 		, String strWSPath
    		 		, String strExportImport
    		 		, String strVessel
    		 		, String strVoyage
    		 		, String strPort
    		 		, String strCOCSOC
    		 		, String strInvoiceDateFrom
    		 		, String strInvoiceDateTo
    		 		, String strInvoiceType
    		 		, String strInvoice
    		 		, String strBL_No
    		 		, String strTransactionType) throws DataAccessException;         
     
     
     public List maintainData(String strHTTPHeader
		 		, String strWSPath
		 		, String strMaintain_type
				, String strSeq
				, String strApp_reference
				, String strInvoice_no
				, String strInvoice_type
				, String strInvoice_printing_date
				, String strSail_date
				, String strUser
    		 	) throws DataAccessException;           
    
}
