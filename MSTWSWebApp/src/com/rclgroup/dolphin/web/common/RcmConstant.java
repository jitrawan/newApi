/*-----------------------------------------------------------------------------------------------------------  
RcmConstant.java
------------------------------------------------------------------------------------------------------------- 
Copyright RCL Public Co., Ltd. 2007 
-------------------------------------------------------------------------------------------------------------
Author Piyapong Ieumwananonthachai 10/10/07
- Change Log ------------------------------------------------------------------------------------------------  
## DD/MM/YY -User-      -TaskRef-       -Short Description  
01 15/10/07 MNW                         Added constant for misc/help and footer
02 16/01/09 KIT         BUG.174         B/L Lookup problems
03 14/05/09 WUT                         Added constant for size, report format, direction, billing type, billing status and source.
04 19/06/09 POR                         Addes constant for house b/l type and b/l type
05 22/06/09 WAC                         Added constant for Template;
06 25/06/09 WUT                         Added constant for FAR_BILL_STATEMENT_HDR, FAR_BILL_STATEMENT_DTL package exception code.
07 25/06/09 POR                         Added constant for FAR_SPECIAL_BILLING package exception code.
08 21/07/09 WUT                         Added constant for BSA_SERVICE_VARIANT
09 23/07/09 WUT                         Added constant for shipment type (SOC/COC)
10 26/08/09 WUT                         Added constant for title help screen (Not use already)
11 27/08/09 WUT                         Added constant for booking status.
12 09/09/09 KIT         MODI            Added constant for Imbalce List (Number of Days).
13 05/10/09 WAC                         Added constant for Container Status (Laden or Empty).
14 15/10/09 WUT                         Added constant for Loading Type (Local or Transhipment).
15 20/10/09 KIT                         Added constant for BSA_IMBALANCE.
16 27/10/09 KIT                         Added constant for PHILIPS EXCEL.
17 09/11/09 KIT                         Added constant GET_HELP_V02__WITH_ACTIVE_STATUS
18 19/11/09 POR                         Added constant GET_SRV_VSS_VOY_INVOY
19 30/11/09 POR                         Added constant for DIM_CARGO_MANIFEST package exception code.
20 24/02/10 POR                         Added constant for DND_DEMURRAGE_AND_DETENTION_FREE_DAYS package exception code.
21 02/12/10 SUK                         Added constant for MULTI DEPOT.
22 01/02/11 WUT                         Added constant for Report & Script Facility
23 28/0611  DHR                         Added constant for Quotation Backdating Script Code
24 25/05/11 NIP        PD_CR_240211-02  Added constant for SCREEN_CODE
25 25/05/11 NIP        PD_CR_240211-02  Added constant for REPORT_FILE_CONTENT_TYPE and REPORT_FILE_SIZE_MIX
26 06/06/11 NIP        PD_CR_240211-02  Added constant for RCM_CONSTANT_KEY_RESOURCE_ROOT_FOLDER_REPORT
27 09/03/12 NIP        CR_53,087        Added constant for SCREEN_CODE
28 28/06/12 SON      PD_CR_20110909-01  Added constant for Operation Type Status
29 19/07/12 PAN                         Added constant GET_VESSEL_FROM_VSA
-----------------------------------------------------------------------------------------------------------*/

package com.rclgroup.dolphin.web.common;

/**
 *    Common constants used in RCL's web application
 */
public class RcmConstant {
    public RcmConstant() {
        super();
    }
    
    public static final int SELECT_DEFAULT = 0;
    public static final int SELECT_NOT_CHOOSED = -1;
    public static final String KEY_SELECT_DEFAULT = "-1";
    
    public static final String FIND_DEFAULT = "";
    public static final String SEARCH_DEFAULT = "";
    public static final String WILD_DEFAULT = "ON";
    
    public static final String PARAMETER_NAME_FORM_MULTIPART = "PARAMETER_NAME_FORM_MULTIPART";
    public static final String SESSION_ACTION_SUCCESSFULLY = "ACTION_SUCCESSFULLY";
    public static final String FLAG_YES = "Y";
    public static final String FLAG_NO = "N";
    
    public static final String RCM_CONSTANT_KEY_RESOURCE_ROOT_FOLDER = "RESOURCE_ROOT_FOLDER";
    public static final String RCM_CONSTANT_KEY_RESOURCE_ROOT_FOLDER_IMAGES = "RESOURCE_ROOT_FOLDER_IMAGES";
    public static final String RCM_CONSTANT_KEY_RESOURCE_ROOT_FOLDER_REPORT = "REPORT_FILE_FOLDER";// ##25
    
    public static final String RESOURCE_FOLDER_IMAGE = "/images";
    
    public static final long RESOURCE_FILE_SIZE_MIX = 5000 * 1024; // 5MB
    public static final String[] RESOURCE_FILE_CONTENT_TYPE = {
        "image/bmp"
        ,"image/gif"
        ,"image/jpeg"
        ,"image/pjpeg"
        ,"image/png"
        ,"image/x-png"
        ,"image/tiff"
    };
    
    // ##25 BEGIN
    public static final long REPORT_FILE_SIZE_MIX = 5000 * 1024; // 5MB
    public static final String[] REPORT_FILE_CONTENT_TYPE = {
        "application/octet-stream"
    };
    // ##25 END
    
    public static final String PL_ACTION_INSERT = "INS";
    public static final String PL_ACTION_UPDATE = "UPD";
    public static final String PL_ACTION_DELETE = "DEL";

    //begin: All URLs in RCL's web application
    private static final String RCL_WEB_ROOT = "/MSTWSWebApp";
    private static final String SEALINER_WEB_ROOT = "/SealinerRCL";
    
    public static final String SEALINER_PAGE_URL = SEALINER_WEB_ROOT;
    public static final String SERV_URL = RCL_WEB_ROOT;  
    public static final String CSS_URL = RCL_WEB_ROOT+"/css";
    public static final String HELP_URL = RCL_WEB_ROOT+"/help";
    public static final String IMG_URL = RCL_WEB_ROOT+"/images";
    public static final String JS_URL = RCL_WEB_ROOT+"/js";
    
    //begin: pages      
    public static final String BKG_PAGE_URL = RCL_WEB_ROOT+"/pages/bkg";
    public static final String BSA_PAGE_URL = RCL_WEB_ROOT+"/pages/bsa"; 
    public static final String CAM_PAGE_URL = RCL_WEB_ROOT+"/pages/cam";
    public static final String CRM_PAGE_URL = RCL_WEB_ROOT+"/pages/crm";
    public static final String CTF_PAGE_URL = RCL_WEB_ROOT+"/pages/ctf";
    public static final String DEX_PAGE_URL = RCL_WEB_ROOT+"/pages/dex";
    public static final String DIM_PAGE_URL = RCL_WEB_ROOT+"/pages/dim";
    public static final String DND_PAGE_URL = RCL_WEB_ROOT+"/pages/dnd";
    public static final String EMS_PAGE_URL = RCL_WEB_ROOT+"/pages/ems";
    public static final String ERR_PAGE_URL = RCL_WEB_ROOT+"/pages/error";  
    public static final String FAR_PAGE_URL = RCL_WEB_ROOT+"/pages/far";
    public static final String FNA_PAGE_URL = RCL_WEB_ROOT+"/pages/fna"; 
    public static final String HELP_PAGE_URL = RCL_WEB_ROOT+"/pages/misc/help"; 
    public static final String IJS_PAGE_URL = RCL_WEB_ROOT+"/pages/ijs"; 
    public static final String MISC_PAGE_URL = RCL_WEB_ROOT+"/pages/misc";
    public static final String QTN_PAGE_URL = RCL_WEB_ROOT+"/pages/qtn";
    public static final String SHS_PAGE_URL = RCL_WEB_ROOT+"/pages/shs";
    public static final String SPS_PAGE_URL = RCL_WEB_ROOT+"/pages/sps";
    public static final String SYS_PAGE_URL = RCL_WEB_ROOT+"/pages/sys";
    public static final String VAS_PAGE_URL = RCL_WEB_ROOT+"/pages/vas";
    public static final String VMS_PAGE_URL = RCL_WEB_ROOT+"/pages/vms";
    public static final String VSS_PAGE_URL = RCL_WEB_ROOT+"/pages/vss";
    public static final String TOS_PAGE_URL = RCL_WEB_ROOT+"/pages/tos";
    public static final String FAP_PAGE_URL = RCL_WEB_ROOT+"/pages/fap";
    public static final String SMT_PAGE_URL = RCL_WEB_ROOT+"/pages/smt";
    //end: pages
    
    public static final String HEADER_FILE_URL = "/pages/misc/RcmHeader.jsp";
    public static final String LONG_FOOTER_FILE_URL = "/pages/misc/RcmLongDescFooter.jsp";
    public static final String SHORT_FOOTER_FILE_URL = "/pages/misc/RcmShortDescFooter.jsp";  
    public static final String PAGE_SELECTION_FILE_URL = "/pages/misc/RcmPageSelection.jsp";
    public static final String SEARCH_BY_FILE_URL = "/pages/misc/RcmSearchByScn.jsp";
    public static final String INVOYAGE_SEARCH_FILE_URL = "/pages/misc/RcmInvoyageSearchScn.jsp";
    //end: All URLs in RCL's web application
    
    //begin: General constants 
    public static final String RECORD_STATUS_DEFAULT = "";
    public static final String RECORD_STATUS_ACTIVE = "A";
    public static final String RECORD_STATUS_SUSPENDED = "S"; 
    //end: General constants

    //begin: Data access error constant 
    //CONTENT_TYPE package exception code
    public static final String EXCEPTION_CONTENT_TYPE_CODE_DUP = "CONTENT_TYPE_CODE_DUP";
    
    public static final String EXCEPTION_RCM_RECORD_STATUS_REQUIRED = "RCM_RECORD_STATUS_REQ";
    public static final String EXCEPTION_RCM_RECORD_STATUS_NOT_IN_RANGE = "RCM_STATUS_NOT_IN_RANGE";
    public static final String EXCEPTION_RCM_RECORD_ADD_USER_REQUIRED = "RCM_RECORD_ADD_USER_REQ";
    public static final String EXCEPTION_RCM_RECORD_ADD_DATE_REQUIRED = "RCM_RECORD_ADD_DATE_REQ";
    public static final String EXCEPTION_RCM_RECORD_CHANGE_USER_REQUIRED = "RCM_RECORD_CHANGE_USER_REQ";
    public static final String EXCEPTION_RCM_RECORD_CHANGE_DATE_REQUIRED = "RCM_RECORD_CHANGE_DATE_REQ";
    public static final String EXCEPTION_RCM_VALUE_DUPULICATE_RECORD = "RCM_VALUE_DUP";
    public static final String EXCEPTION_RCM_UPDATE_CONCURRENCY = "RCM_UPDATE_CON";
    public static final String EXCEPTION_RCM_DELETE_CONCURRENCY = "RCM_DELETE_CON";
    public static final String EXCEPTION_RCM_OBJECT_NOT_FOUND = "RCM_OBJECT_NOT_FOUND";
    public static final String EXCEPTION_RCM_CHILD_RECORD_NOT_EXIST = "RCM_ICV_CHILD_EXC";
    public static final String EXCEPTION_PARAM_STATUS_IN_SUSPENDED = "PARAM_STATUS_IN_SUSPENDED";
    
    //CAM_UTILITY_HDR exception code
    public static final String EXCEPTION_CAM_UTILITY_HDR_PK_HDR_ID_REQUIRED = "CAM_UHZ01_CAM_UTILITY_HDR_ID_REQ";
    public static final String EXCEPTION_CAM_UTILITY_HDR_MODULE_CODE_REQUIRED = "CAM_UHZ01_MODULE_CODE_REQ";
    public static final String EXCEPTION_CAM_UTILITY_HDR_SCREEN_CODE_REQUIRED = "CAM_UHZ01_SCREEN_CODE_REQ";
    public static final String EXCEPTION_CAM_UTILITY_HDR_COUNTRY_REQUIRED = "CAM_UHZ01_COUNTRY_REQ";
    public static final String EXCEPTION_CAM_UTILITY_HDR_FSC_REQUIRED = "CAM_UHZ01_FSC_REQ";
    public static final String EXCEPTION_CAM_UTILITY_HDR_UTILITY_NAME_REQUIRED = "CAM_UHZ01_UTILITY_NAME_REQ";
    public static final String EXCEPTION_CAM_UTILITY_HDR_CHILD_RECORD_NOT_EXIST = "CAM_UHZ01_UTILITY_HDR_ICV_CHILD_EXC";
    
    //CAM_UTILITY_DTL exception code
    public static final String EXCEPTION_CAM_UTILITY_DTL_PK_DTL_ID_REQUIRED = "CAM_UDZ01_CAM_UTILITY_DTL_ID_REQ";
    public static final String EXCEPTION_CAM_UTILITY_DTL_FK_HDR_ID_REQUIRED = "CAM_UDZ01_CAM_UTILITY_HDR_ID_REQ";
    public static final String EXCEPTION_CAM_UTILITY_DTL_DETAIL_NAME_REQUIRED = "CAM_UDZ01_DETAIL_NAME_REQ";
    public static final String EXCEPTION_CAM_UTILITY_DTL_UTILITY_TYPE_REQUIRED = "CAM_UDZ01_UTILITY_TYPE_REQ";
    public static final String EXCEPTION_CAM_UTILITY_DTL_CHILD_RECORD_NOT_EXIST = "CAM_UDZ01_UTILITY_DTL_ICV_CHILD_EXC";
    
    //BSA_MODEL package exception code
    public static final String EXCEPTION_BSA_MODEL_NAME_DUP = "BSA_BAM01_MODEL_NAME_DUP"; 
    public static final String EXCEPTION_BSA_MODEL_RCD_CON = "EXCEPTION_BSA_MODEL_RCD_CON";     
    
    public static final String EXCEPTION_BSA_MODEL_NAME_EXIST = "BSA_BAM01_MODEL_NAME_EXIST"; 
    public static final String EXCEPTION_BSA_MODEL_OVERLAP_VALIDITY = "BSA_BAM01_OVERLAP_VALIDITY"; 
    public static final String EXCEPTION_BSA_MODEL_UPDATE_CONCURRENCY = "BSA_BAM01_UPDATE_CON"; 
 
    public static final String EXCEPTION_BSA_MODEL_SUPPORTED_PORT_GROUP_SOC_COC_ONLY_SOC = "BSA_SPG01_PORT_GRP_SOC_COC_ONLY_SOC";
    public static final String EXCEPTION_BSA_MODEL_SUPPORTED_PORT_GROUP_UPDATE_CONCURRENCY = "BSA_SPG01_UPDATE_CON";
    public static final String EXCEPTION_BSA_MODEL_SUPPORTED_PORT_GROUP_DELETE_CONCURRENCY = "BSA_SPG01_DELETE_CON";
    public static final String EXCEPTION_BSA_MODEL_SUPPORTED_PORT_GROUP_NOT_FOUND = "BSA_SPG01_BSA_PORT_GROUP_NOT_FOUND";
    public static final String EXCEPTION_BSA_MODEL_SUPPORTED_PORT_GROUP_CODE_NOT_FOUND = "BSA_SPG01_PORT_GROUP_CODE_NOT_FOUND";
    public static final String EXCEPTION_BSA_MODEL_SUPPORTED_PORT_GROUP_CONSTRAINT01 = "BSA_SPG01_PORT_GROUP_CONSTRAINT01";
    public static final String EXCEPTION_BSA_MODEL_SUPPORTED_PORT_GROUP_CONSTRAINT02 = "BSA_SPG01_PORT_GROUP_CONSTRAINT02";
    
    //##22 BEGIN
    public static final String EXCEPTION_CAM_SCHEDULE_PK_CAM_SCHEDULE_ID_REQUIRED = "CAM_SZZ02_CAM_SCHEDULE_ID_REQ";
    public static final String EXCEPTION_CAM_SCHEDULE_SCHEDULE_CODE_REQUIRED = "CAM_SZZ02_SCHEDULE_CODE_REQ";
    public static final String EXCEPTION_CAM_SCHEDULE_FK_CAM_SERVICE_ID_REQUIRED = "CAM_SZZ02_CAM_SERVICE_ID_REQ";
    public static final String EXCEPTION_CAM_SCHEDULE_SCHEDULE_TYPE_REQUIRED = "CAM_SZZ02_SCHEDULE_TYPE_REQ";
    public static final String EXCEPTION_CAM_SCHEDULE_DIR_PROCESS_REQUIRED = "CAM_SZZ02_DIR_PROCESS_REQ";
    public static final String EXCEPTION_CAM_SCHEDULE_DIR_HISTORY_REQUIRED = "CAM_SZZ02_DIR_HISTORY_REQ";
    public static final String EXCEPTION_CAM_SCHEDULE_START_DATE_REQUIRED = "CAM_SZZ02_START_DATE_REQ";
    public static final String EXCEPTION_CAM_SCHEDULE_END_DATE_CHOICE_REQUIRED = "CAM_SZZ02_END_DATE_CHOICE_REQ";
    public static final String EXCEPTION_CAM_SCHEDULE_STATUS_IN_SUSPENDED = "CAM_SZZ02_STATUS_IN_SUSPENDED";
    
    public static final String EXCEPTION_CAM_SCHEDULE_PARAM_PK_CAM_SCHEDULE_PARAM_ID_REQUIRED = "CAM_SPZ02_CAM_SCH_PARAM_ID_REQ";
    public static final String EXCEPTION_CAM_SCHEDULE_PARAM_FK_CAM_SCHEDULE_ID_REQUIRED = "CAM_SPZ02_CAM_SCHEDULE_ID_REQ";
    public static final String EXCEPTION_CAM_SCHEDULE_PARAM_FK_CAM_PARAMETER_ID_REQUIRED = "CAM_SPZ02_CAM_PARAMETER_ID_REQ";
    public static final String EXCEPTION_CAM_SCHEDULE_PARAM_FK_CAM_PARAMETER_NAME_REQUIRED = "CAM_SPZ02_PARAMETER_NAME_REQ";
    
    public static final String EXCEPTION_CAM_SCHEDULE_ALARM_PK_CAM_SCHEDULE_ALARM_ID_REQUIRED = "CAM_SAZ01_CAM_SCH_ALARM_ID_REQ";
    public static final String EXCEPTION_CAM_SCHEDULE_ALARM_FK_CAM_SCHEDULE_ID_REQUIRED = "CAM_SAZ01_CAM_SCHEDULE_ID_REQ";
    public static final String EXCEPTION_CAM_SCHEDULE_ALARM_EVENT_CODE_REQUIRED = "CAM_SAZ01_EVENT_CODE_REQ";
    public static final String EXCEPTION_CAM_SCHEDULE_ALARM_EMAIL_ADDRESS_REQUIRED = "CAM_SAZ01_EMAIL_ADDRESS_REQ";
    //##22 END
    
    //FAR_SPECIAL_BILLING##02 BEGIN
    public static final String EXCEPTION_FAR_SPECIAL_BILLING_PO_NUMBER_UPDATE_BL_NO_NOT_FOUND = "BL_NO_NOT_FOUND";
    public static final String EXCEPTION_FAR_SPECIAL_BILLING_PO_NUMBER_UPDATE_INVOICE_NO_NOT_FOUND = "INVOICE_NO_NOT_FOUND";
    public static final String EXCEPTION_FAR_SPECIAL_BILLING_PO_NUMBER_UPDATE_BL_NO_REQ = "BL_NO_REQ";
    public static final String EXCEPTION_FAR_SPECIAL_BILLING_PO_NUMBER_UPDATE_INVOICE_NO_REQ = "INVOICE_NO_REQ";
    public static final String EXCEPTION_FAR_SPECIAL_BILLING_PO_NUMBER_UPDATE_BL_OR_INVOICE_NO_NOT_FOUND = "BL_OR_INVOICE_NO_NOT_FOUND";
    //##02 END
    
    //EMS_MULTI_DEPOT##21 BEGIN         
    //Multi Depot Header
    public static final String EXCEPTION_EMS_MULTI_DEPOT_HDR_MULTI_DEPOT_HDR_ID_REQ = "EMS_MDD01_EMS_MULTI_DEPOT_DTL_ID_REQ";
    public static final String EXCEPTION_EMS_MULTI_DEPOT_HDR_FSC_REQ = "EMS_MDH01_FSC_REQ";
    public static final String EXCEPTION_EMS_MULTI_DEPOT_HDR_DEPOT_CODE_REQ = "EMS_MDH01_DEPOT_CODE_REQ";
    public static final String EXCEPTION_EMS_MULTI_DEPOT_HDR_POINT_CODE_REQ = "EMS_MDH01_POINT_CODE_REQ";
    public static final String EXCEPTION_EMS_MULTI_DEPOT_HDR_MODE_OF_MAPPING_REQ = "EMS_MDH01_MPORR_REQ";
    public static final String EXCEPTION_EMS_MULTI_DEPOT_HDR_PICK_UP_OR_RETURN_FLAG_REQ = "EMS_MDH01_PORR_FLAG_REQ";    
    public static final String EXCEPTION_EMS_MULTI_DEPOT_HDR_RECORD_STATUS_REQ = "EMS_MDH01_RECORD_STATUS_REQ";
    public static final String EXCEPTION_EMS_MULTI_DEPOT_HDR_RECORD_STATUS_NOT_IN_RANGE = "EMS_MDH01_RECORD_STATUS_NOT_IN_RANGE";
    public static final String EXCEPTION_EMS_MULTI_DEPOT_HDR_RECORD_ADD_USER_REQ = "EMS_MDH01_RECORD_ADD_USER_REQ";
    public static final String EXCEPTION_EMS_MULTI_DEPOT_HDR_RECORD_ADD_DATE_REQ = "EMS_MDH01_RECORD_ADD_DATE_REQ";
    public static final String EXCEPTION_EMS_MULTI_DEPOT_HDR_RECORD_CHANGE_USER_REQ = "EMS_MDH01_RECORD_CHANGE_USER_REQ";
    public static final String EXCEPTION_EMS_MULTI_DEPOT_HDR_RECORD_CHANGE_DATE_REQ = "EMS_MDH01_RECORD_CHANGE_DATE_REQ";
    public static final String EXCEPTION_EMS_MULTI_DEPOT_HDR_CONCURRENCY_UPDATE = "EMS_MDH01_UPDATE_CON"; 
    public static final String EXCEPTION_EMS_MULTI_DEPOT_HDR_MULTI_DEPOT_DTL_ID_NOT_FOUND = "EMS_MDH01_MULTI_DEPOT_DTL_NOT_FOUND"; 
    public static final String EXCEPTION_EMS_MULTI_DEPOT_HDR_CONCURRENCY_DELETE = "EMS_MDH01_DELETE_CON"; 
    public static final String EXCEPTION_EMS_MULTI_DEPOT_HDR_VALUE_DUPULICATE_RECORD = "EMS_MDH01_VALUE_DUP";    
     
    //Multi Depot Detail
    public static final String EXCEPTION_EMS_MULTI_DEPOT_DTL_MULTI_DEPOT_DTL_ID_REQ = "EMS_MDD01_EMS_MULTI_DEPOT_DTL_ID_REQ";
    public static final String EXCEPTION_EMS_MULTI_DEPOT_DTL_FK_MULTI_DEPOT_HDR_ID_REQ = "EMS_MDD01_EMS_MULTI_DEPOT_HDR_ID_REQ";
    public static final String EXCEPTION_EMS_MULTI_DEPOT_DTL_EQ_SIZE_REQ = "EMS_MDD01_EQ_SIZE_REQ";
    public static final String EXCEPTION_EMS_MULTI_DEPOT_DTL_EQ_TYPE_REQ = "EMS_MDD01_EQ_TYPE_REQ";
    public static final String EXCEPTION_EMS_MULTI_DEPOT_DTL_RECORD_STATUS_REQ = "EMS_MDD01_RECORD_STATUS_REQ";
    public static final String EXCEPTION_EMS_MULTI_DEPOT_DTL_RECORD_STATUS_NOT_IN_RANGE = "EMS_MDD01_RECORD_STATUS_NOT_IN_RANGE";
    public static final String EXCEPTION_EMS_MULTI_DEPOT_DTL_RECORD_ADD_USER_REQ = "EMS_MDD01_RECORD_ADD_USER_REQ";
    public static final String EXCEPTION_EMS_MULTI_DEPOT_DTL_RECORD_ADD_DATE_REQ = "EMS_MDD01_RECORD_ADD_DATE_REQ";
    public static final String EXCEPTION_EMS_MULTI_DEPOT_DTL_RECORD_CHANGE_USER_REQ = "EMS_MDD01_RECORD_CHANGE_USER_REQ";
    public static final String EXCEPTION_EMS_MULTI_DEPOT_DTL_RECORD_CHANGE_DATE_REQ = "EMS_MDD01_RECORD_CHANGE_DATE_REQ";
    public static final String EXCEPTION_EMS_MULTI_DEPOT_DTL_SIZE_TYPE_DUPLICATE = "EMS_MDD01_SIZE_TYPE_DUPLICATE";
    public static final String EXCEPTION_EMS_MULTI_DEPOT_DTL_VALUE_DUPULICATE_RECORD = "EMS_MDD01_VALUE_DUP"; 
    public static final String EXCEPTION_EMS_MULTI_DEPOT_DTL_CONCURRENCY_UPDATE = "EMS_MDD01_UPDATE_CON"; 
    public static final String EXCEPTION_EMS_MULTI_DEPOT_DTL_MULTI_DEPOT_DTL_ID_NOT_FOUND = "EMS_MDD01_MULTI_DEPOT_DTL_NOT_FOUND"; 
    public static final String EXCEPTION_EMS_MULTI_DEPOT_DTL_CONCURRENCY_DELETE = "EMS_MDD01_DELETE_CON"; 
    //##21 END
    
    // ##06 BEGIN
    //FAR_BILL_STATEMENT_HDR package exception code
    public static final String EXCEPTION_FAR_BILL_STATEMENT_HDR_BILL_NO_REQUIRED = "FAR_BSH01_BILL_NO_REQ";
    public static final String EXCEPTION_FAR_BILL_STATEMENT_HDR_BILL_VERSION_REQUIRED = "FAR_BSH01_BILL_VERSION_REQ";
    public static final String EXCEPTION_FAR_BILL_STATEMENT_HDR_TEMPLATE_REQUIRED = "FAR_BSH01_TEMPLATE_REQ";
    public static final String EXCEPTION_FAR_BILL_STATEMENT_HDR_IB_OB_XT_REQUIRED = "FAR_BSH01_IB_OB_XT_REQ";
    public static final String EXCEPTION_FAR_BILL_STATEMENT_HDR_COLL_FSC_REQUIRED = "FAR_BSH01_COLL_FSC_REQ";
    public static final String EXCEPTION_FAR_BILL_STATEMENT_HDR_BILL_TO_PARTY_REQUIRED = "FAR_BSH01_BILL_TO_PARTY_REQ";
    public static final String EXCEPTION_FAR_BILL_STATEMENT_HDR_BILL_STATUS_REQUIRED = "FAR_BSH01_BILL_STATUS_REQ";
    public static final String EXCEPTION_FAR_BILL_STATEMENT_HDR_RECORD_ADD_USER_REQUIRED = "FAR_BSH01_RECORD_ADD_USER_REQ";
    public static final String EXCEPTION_FAR_BILL_STATEMENT_HDR_BILL_VERSION_INVALID = "FAR_BSH01_BILL_VERSION_INVALID";
    public static final String EXCEPTION_FAR_BILL_STATEMENT_HDR_IB_OB_XT_INVALID = "FAR_BSH01_IB_OB_XT_INVALID";
    
    //FAR_BILL_STATEMENT_DTL package exception code
    public static final String EXCEPTION_FAR_BILL_STATEMENT_DTL_SEQ_REQUIRED = "FAR_BSD01_BILL_DTL_SEQ_REQ";
    public static final String EXCEPTION_FAR_BILL_STATEMENT_DTL_BILL_NO_REQUIRED = "FAR_BSD01_BILL_NO_REQ";
    public static final String EXCEPTION_FAR_BILL_STATEMENT_DTL_BILL_VERSION_REQUIRED = "FAR_BSD01_BILL_VERSION_REQ";
    public static final String EXCEPTION_FAR_BILL_STATEMENT_DTL_INVOICE_NO_REQUIRED = "FAR_BSD01_INVOICE_NO_REQ";
    
    //FAR_SPECIAL_BILLING
    public static final String EXCEPTION_FAR_SPECIAL_BILLING_TEMPLATE_NOT_FOUND = "FAR_FAR01_TEMPLATE_NOT_FOUND";
    public static final String EXCEPTION_FAR_SPECIAL_BILLING_TEMPLATE_NOT_SUPPORTED = "FAR_BSB01_TEMPLATE_NOT_SUPPORTED";
    public static final String EXCEPTION_FAR_SPECIAL_BILLING_GENERATE_BILL_NUMBER_INVALID = "FAR_BSB01_GEN_BILL_NUMBER_INVALID";
    public static final String EXCEPTION_FAR_SPECIAL_BILLING_GENERATE_BILL_NUMBER_EXIST = "FAR_BSB01_GEN_BILL_NUMBER_EXIST";
    public static final String EXCEPTION_FAR_SPECIAL_BILLING_GENERATE_BILL_NUMBER_NOT_FOUND = "FAR_BSB01_GEN_BILL_NUMBER_NOT_FOUND";
    // ##06 END
    
    // ##07 BEGIN
    //FAR_SPECIAL_BILLING package exception code
    public static final String EXCEPTION_FAR_SPECIAL_BILLING_BILL_NO_REQUIRED = "FAR_FAR101_BILL_NUM_REQ";
    public static final String EXCEPTION_FAR_SPECIAL_BILLING_BILL_VERSION_REQUIRED = "FAR_FAR101_BILL_VERSION_REQ";
    public static final String EXCEPTION_FAR_SPECIAL_BILLING_BILL_NO_NOT_FOUND = "FAR_FAR101_BILL_NUM_NOT_FOUND";
    public static final String EXCEPTION_FAR_SPECIAL_BILLING_BILL_VERERSION_NOT_FOUND="FAR_FAR101_BILL_VERSION_NOT_FOUND";
    public static final String EXCEPTION_FAR_SPECIAL_BILLING_BILL_NO_OR_BILL_VERSION_NOT_FOUND="FAR_FAR101_BILL_NUM_OR_BILL_VERSION_NOT_FOUND";
    // ##07 END
    
    public static final String EXCEPTION_FAR_SHIPPER_MAPPING_PK_SHIPPER_MAP_ID_REQUIRED = "FAR_SMZ01_SHIPPER_MAP_ID_REQ";
    public static final String EXCEPTION_FAR_SHIPPER_MAPPING_BILL_TO_PARTY_REQUIRED = "FAR_SMZ01_BILL_TO_PARTY_REQ";
    public static final String EXCEPTION_FAR_SHIPPER_MAPPING_SHIPPER_CODE_REQUIRED = "FAR_SMZ01_SHIPPER_CODE_REQ";
    public static final String EXCEPTION_FAR_SHIPPER_MAPPING_RECORD_STATUS_REQUIRED = "FAR_SMZ01_RECORD_STATUS_REQ";
    public static final String EXCEPTION_FAR_SHIPPER_MAPPING_STATUS_NOT_IN_RANGE = "FAR_SMZ01_STATUS_NOT_IN_RANGE";
    public static final String EXCEPTION_FAR_SHIPPER_MAPPING_RECORD_ADD_USER_REQUIRED = "FAR_SMZ01_RECORD_ADD_USER_REQ";
    public static final String EXCEPTION_FAR_SHIPPER_MAPPING_RECORD_ADD_DATE_REQUIRED = "FAR_SMZ01_RECORD_ADD_DATE_REQ";
    public static final String EXCEPTION_FAR_SHIPPER_MAPPING_RECORD_CHANGE_DATE_REQUIRED = "FAR_SMZ01_RECORD_CHANGE_DATE_REQ";
    public static final String EXCEPTION_FAR_SHIPPER_MAPPING_VALUE_DUPULICATE_RECORD = "FAR_SMZ01_VALUE_DUP";
    public static final String EXCEPTION_FAR_SHIPPER_MAPPING_UPDATE_CONCURRENCY = "FAR_SMZ01_UPDATE_CON";
    public static final String EXCEPTION_FAR_SHIPPER_MAPPING_DELETE_CONCURRENCY = "FAR_SMZ01_DELETE_CON";
    public static final String EXCEPTION_FAR_SHIPPER_MAPPING_OBJECT_NOT_FOUND = "FAR_SMZ01_SHIPPER_MAP_NOT_FOUND";
    public static final String EXCEPTION_FAR_SHIPPER_MAPPING_BILL_TO_PARTY_EXISTS = "FAR_SMZ01_BILL_TO_PARTY_EXISTS";
    public static final String EXCEPTION_FAR_SHIPPER_MAPPING_BILL_TO_PARTY_NOT_VALID = "FAR_SMZ01_BILL_TO_PARTY_NOT_VALID";
    public static final String EXCEPTION_FAR_SHIPPER_MAPPING_SHIPPER_CODE_NOT_VALID = "FAR_SMZ01_SHIPPER_CODE_NOT_VALID";
    
    public static final String EXCEPTION_FAR_BOOKING_PARTY_MAPPING_PK_BOOKING_PARTY_MAP_ID_REQUIRED = "FAR_BPM01_BOOKING_PARTY_MAP_ID_REQ";
    public static final String EXCEPTION_FAR_BOOKING_PARTY_MAPPING_BILL_TO_PARTY_REQUIRED = "FAR_BPM01_BILL_TO_PARTY_REQ";
    public static final String EXCEPTION_FAR_BOOKING_PARTY_MAPPING_BOOKING_PARTY_REQUIRED = "FAR_BPM01_BOOKING_PARTY_REQ";
    public static final String EXCEPTION_FAR_BOOKING_PARTY_MAPPING_RECORD_STATUS_REQUIRED = "FAR_BPM01_RECORD_STATUS_REQ";
    public static final String EXCEPTION_FAR_BOOKING_PARTY_MAPPING_STATUS_NOT_IN_RANGE = "FAR_BPM01_STATUS_NOT_IN_RANGE";
    public static final String EXCEPTION_FAR_BOOKING_PARTY_MAPPING_RECORD_ADD_USER_REQUIRED = "FAR_BPM01_RECORD_ADD_USER_REQ";
    public static final String EXCEPTION_FAR_BOOKING_PARTY_MAPPING_RECORD_ADD_DATE_REQUIRED = "FAR_BPM01_RECORD_ADD_DATE_REQ";
    public static final String EXCEPTION_FAR_BOOKING_PARTY_MAPPING_RECORD_CHANGE_DATE_REQUIRED = "FAR_BPM01_RECORD_CHANGE_DATE_REQ";
    public static final String EXCEPTION_FAR_BOOKING_PARTY_MAPPING_VALUE_DUPULICATE_RECORD = "FAR_BPM01_VALUE_DUP";
    public static final String EXCEPTION_FAR_BOOKING_PARTY_MAPPING_UPDATE_CONCURRENCY = "FAR_BPM01_UPDATE_CON";
    public static final String EXCEPTION_FAR_BOOKING_PARTY_MAPPING_DELETE_CONCURRENCY = "FAR_BPM01_DELETE_CON";
    public static final String EXCEPTION_FAR_BOOKING_PARTY_MAPPING_OBJECT_NOT_FOUND = "FAR_BPM01_BOOKING_PARTY_MAP_NOT_FOUND";
    public static final String EXCEPTION_FAR_BOOKING_PARTY_MAPPING_BILL_TO_PARTY_EXISTS = "FAR_BPM01_BILL_TO_PARTY_EXISTS";
    public static final String EXCEPTION_FAR_BOOKING_PARTY_MAPPING_BILL_TO_PARTY_NOT_VALID = "FAR_BPM01_BILL_TO_PARTY_NOT_VALID";
    public static final String EXCEPTION_FAR_BOOKING_PARTY_MAPPING_BOOKING_PARTY_NOT_VALID = "FAR_BPM01_BOOKING_PARTY_NOT_VALID";
    
    // ##08 BEGIN
    //BSA_SERVICE_VARIANT package exception code
    public static final String EXCEPTION_BSA_SERVICE_VARIANT_BSA_SERVICE_VARIANT_ID_REQUIRED = "BSA_SVZ01_BSA_SERVICE_VARIANT_ID_REQ";
    public static final String EXCEPTION_BSA_SERVICE_VARIANT_BSA_MODEL_ID_REQUIRED = "BSA_SVZ01_BSA_MODEL_ID_REQ";
    public static final String EXCEPTION_BSA_SERVICE_VARIANT_VARIANT_CODE_REQUIRED = "BSA_SVZ01_VARIANT_CODE_REQ";
    public static final String EXCEPTION_BSA_SERVICE_VARIANT_PROFORMA_ID_REQUIRED = "BSA_SVZ01_PROFORMA_ID_REQ";
    public static final String EXCEPTION_BSA_SERVICE_VARIANT_USAGE_RULE_REQUIRED = "BSA_SVZ01_USAGE_RULE_REQ";
    public static final String EXCEPTION_BSA_SERVICE_VARIANT_CALCULATE_FREQUENCY_REQUIRED = "BSA_SVZ01_CALC_FREQUENCY_REQ";
    public static final String EXCEPTION_BSA_SERVICE_VARIANT_CALCULATE_DURATION_REQUIRED = "BSA_SVZ01_CALC_DURATION_REQ";
    public static final String EXCEPTION_BSA_SERVICE_VARIANT_DEF_SLOT_REQUIRED = "BSA_SVZ01_DEF_SLOT_TEU_REQ";
    public static final String EXCEPTION_BSA_SERVICE_VARIANT_DEF_SLOT_TONS_REQUIRED = "BSA_SVZ01_DEF_SLOT_TONS_REQ";
    public static final String EXCEPTION_BSA_SERVICE_VARIANT_DEF_SLOT_REEFER_PLUGS_REQUIRED = "BSA_SVZ01_DEF_SLOT_REEFER_PLUGS_REQ";
    public static final String EXCEPTION_BSA_SERVICE_VARIANT_DEF_AVG_COC_TEU_WEIGHT_REQUIRED = "BSA_SVZ01_DEF_AVG_COC_TEU_WEIGHT_REQ";
    public static final String EXCEPTION_BSA_SERVICE_VARIANT_DEF_AVG_SOC_TEU_WEIGHT_REQUIRED = "BSA_SVZ01_DEF_AVG_SOC_TEU_WEIGHT_REQ";
    public static final String EXCEPTION_BSA_SERVICE_VARIANT_DEF_MIN_TEU_REQUIRED = "BSA_SVZ01_DEF_MIN_TEU_REQ";
    public static final String EXCEPTION_BSA_SERVICE_VARIANT_RECORD_STATUS_REQUIRED = "BSA_SVZ01_RECORD_STATUS_REQ";
    public static final String EXCEPTION_BSA_SERVICE_VARIANT_STATUS_NOT_IN_RANGE = "BSA_SVZ01_STATUS_NOT_IN_RANGE";
    public static final String EXCEPTION_BSA_SERVICE_VARIANT_RECORD_ADD_USER_REQUIRED = "BSA_SVZ01_RECORD_ADD_USER_REQ";
    public static final String EXCEPTION_BSA_SERVICE_VARIANT_RECORD_ADD_DATE_REQUIRED = "BSA_SVZ01_RECORD_ADD_DATE_REQ";
    public static final String EXCEPTION_BSA_SERVICE_VARIANT_RECORD_CHANGE_USER_REQUIRED = "BSA_SVZ01_RECORD_CHANGE_USER_REQ";
    public static final String EXCEPTION_BSA_SERVICE_VARIANT_RECORD_CHANGE_DATE_REQUIRED = "BSA_SVZ01_RECORD_CHANGE_DATE_REQ";
    public static final String EXCEPTION_BSA_SERVICE_VARIANT_VALUE_DUPULICATE_RECORD = "BSA_SVZ01_VALUE_DUP";
    public static final String EXCEPTION_BSA_SERVICE_VARIANT_BSA_VESSEL_TYPE_INVALID = "BSA_SVZ01_BSA_VESSEL_TYPE_INVALID";
    public static final String EXCEPTION_BSA_SERVICE_VARIANT_BSA_VESSEL_TYPE_EXISTS_IN_SERVICE = "BSA_SVZ01_BSA_VESSEL_TYPE_EXISTS_IN_SERVICE";
    public static final String EXCEPTION_BSA_SERVICE_VARIANT_VARIANT_CODE_EXISTS_IN_SERVICE = "BSA_SVZ01_VARIANT_CODE_EXISTS_IN_SERVICE";
    public static final String EXCEPTION_BSA_SERVICE_VARIANT_UPDATE_CONCURRENCY = "BSA_SVZ01_UPDATE_CON";
    public static final String EXCEPTION_BSA_SERVICE_VARIANT_DELETE_CONCURRENCY = "BSA_SVZ01_DELETE_CON";
    public static final String EXCEPTION_BSA_SERVICE_VARIANT_OBJECT_NOT_FOUND = "BSA_SVZ01_BSA_SERVICE_VARIANT_NOT_FOUND";
    public static final String EXCEPTION_BSA_SERVICE_VARIANT_CHILD_RECORD_NOT_EXIST = "BSA_SVZ01_BSA_SERVICE_VARIANT_ICV_CHILD_EXC";
    public static final String EXCEPTION_BSA_SERVICE_VARIANT_PROFORMA_ITP086_NOT_EXIST = "BSA_SVZ01_ITP086_NOT_FOUND";
    public static final String EXCEPTION_BSA_OVERLAP_EXISTS_IN_SERVICE = "BSA_SVZ01_BSA_EFFECTIVE_DATE_AND_EXPIRY_DATE_EXC_SERVICE_VARIANT";
    
    //BSA_PORT_CALL package exception code
    public static final String EXCEPTION_BSA_PORT_CALL_BSA_PORT_CALL_ID_REQUIRED = "BSA_PCZ01_BSA_PORT_CALL_ID_REQ";
    public static final String EXCEPTION_BSA_PORT_CALL_BSA_SERVICE_VARIANT_ID_REQUIRED = "BSA_PCZ01_BSA_SERVICE_VARIANT_ID_REQ";
    public static final String EXCEPTION_BSA_PORT_CALL_SERVICE_REQUIRED = "BSA_PCZ01_SERVICE_REQ";
    public static final String EXCEPTION_BSA_PORT_CALL_PROFORMA_REF_NO_REQUIRED = "BSA_PCZ01_PROFORMA_REF_NO_REQ";
    public static final String EXCEPTION_BSA_PORT_CALL_PORT_REQUIRED = "BSA_PCZ01_PORT_REQ";
    public static final String EXCEPTION_BSA_PORT_CALL_PORT_SEQ_NO_FROM_REQUIRED = "BSA_PCZ01_PORT_SEQ_NO_FROM_REQ";
    public static final String EXCEPTION_BSA_PORT_CALL_DIRECTION_FROM_REQUIRED = "BSA_PCZ01_DIRECTION_FROM_REQ";
    public static final String EXCEPTION_BSA_PORT_CALL_PORT_SEQ_NO_TO_REQUIRED = "BSA_PCZ01_PORT_SEQ_NO_TO_REQ";
    public static final String EXCEPTION_BSA_PORT_CALL_DIRECTION_TO_REQUIRED = "BSA_PCZ01_DIRECTION_TO_REQ";
    public static final String EXCEPTION_BSA_PORT_CALL_LOAD_DISCHARGE_FLAG_REQUIRED = "BSA_PCZ01_LOAD_DISCHARGE_FLAG_REQ";
    public static final String EXCEPTION_BSA_PORT_CALL_TRANSHIPMENT_FLAG_REQUIRED = "BSA_PCZ01_TRANSHIPMENT_FLAG_REQ";
    public static final String EXCEPTION_BSA_PORT_CALL_WAYPORT_TRUNK_INDICATOR_REQUIRED = "BSA_PCZ01_WAYPORT_TRUNK_INDICATOR_REQ";
    public static final String EXCEPTION_BSA_PORT_CALL_PORT_CALL_LEVEL_REQUIRED = "BSA_PCZ01_PORT_CALL_LEVEL_REQ";
    public static final String EXCEPTION_BSA_PORT_CALL_SLOT_TEU_REQUIRED = "BSA_PCZ01_SLOT_TEU_REQ";
    public static final String EXCEPTION_BSA_PORT_CALL_SLOT_TONS_REQUIRED = "BSA_PCZ01_SLOT_TONS_REQ";
    public static final String EXCEPTION_BSA_PORT_CALL_SLOT_REEFER_PLUGS_REQUIRED = "BSA_PCZ01_SLOT_REEFER_PLUGS_REQ";
    public static final String EXCEPTION_BSA_PORT_CALL_AVG_COC_TEU_WEIGHT_REQUIRED = "BSA_PCZ01_AVG_COC_TEU_WEIGHT_REQ";
    public static final String EXCEPTION_BSA_PORT_CALL_AVG_SOC_TEU_WEIGHT_REQUIRED = "BSA_PCZ01_AVG_SOC_TEU_WEIGHT_REQ";
    public static final String EXCEPTION_BSA_PORT_CALL_MIN_TEU_REQUIRED = "BSA_PCZ01_MIN_TEU_REQ";
    public static final String EXCEPTION_BSA_PORT_CALL_RECORD_STATUS_REQUIRED = "BSA_PCZ01_RECORD_STATUS_REQ";
    public static final String EXCEPTION_BSA_PORT_CALL_STATUS_NOT_IN_RANGE = "BSA_PCZ01_STATUS_NOT_IN_RANGE";
    public static final String EXCEPTION_BSA_PORT_CALL_RECORD_ADD_USER_REQUIRED = "BSA_PCZ01_RECORD_ADD_USER_REQ";
    public static final String EXCEPTION_BSA_PORT_CALL_RECORD_ADD_DATE_REQUIRED = "BSA_PCZ01_RECORD_ADD_DATE_REQ";
    public static final String EXCEPTION_BSA_PORT_CALL_RECORD_CHANGE_USER_REQUIRED = "BSA_PCZ01_RECORD_CHANGE_USER_REQ";
    public static final String EXCEPTION_BSA_PORT_CALL_RECORD_CHANGE_DATE_REQUIRED = "BSA_PCZ01_RECORD_CHANGE_DATE_REQ";
    public static final String EXCEPTION_BSA_PORT_CALL_VALUE_DUPULICATE_RECORD = "BSA_PCZ01_VALUE_DUP";
    public static final String EXCEPTION_BSA_PORT_CALL_UPDATE_CONCURRENCY = "BSA_PCZ01_UPDATE_CON";
    public static final String EXCEPTION_BSA_PORT_CALL_DELETE_CONCURRENCY = "BSA_PCZ01_DELETE_CON";
    public static final String EXCEPTION_BSA_PORT_CALL_OBJECT_NOT_FOUND = "BSA_PCZ01_BSA_PORT_CALL_NOT_FOUND";
    public static final String EXCEPTION_BSA_PORT_CALL_CHILD_RECORD_NOT_EXIST = "BSA_PCZ01_BSA_PORT_CALL_ICV_CHILD_EXC";
        
    //BSA_ROUTE package exception code 
    public static final String EXCEPTION_BSA_ROUTE_BSA_ROUTE_ID_REQUIRED = "BSA_RZZ01_BSA_ROUTE_ID_REQ";    
    public static final String EXCEPTION_BSA_ROUTE_POL_BSA_PORT_CALL_ID_REQUIRED = "BSA_RZZ01_POL_BSA_PORT_CALL_ID_REQ";
    public static final String EXCEPTION_BSA_ROUTE_POD_BSA_PORT_CALL_ID_REQUIRED = "BSA_RZZ01_POD_BSA_PORT_CALL_ID_REQ";
    public static final String EXCEPTION_BSA_ROUTE_POL_BSA_PORT_CALL_CODE_NOT_FOUND = "BSA_RZZ01_POL_BSA_PORT_CALL_CODE_NOT_FOUND";
    public static final String EXCEPTION_BSA_ROUTE_POD_BSA_PORT_CALL_CODE_NOT_FOUND = "BSA_RZZ01_POD_BSA_PORT_CALL_CODE_NOT_FOUND";
    public static final String EXCEPTION_BSA_ROUTE_BSA_TS_PORT_CALL_ID_NOT_FOUND = "BSA_RZZ01_BSA_TS_PORT_CALL_ID_NOT_FOUND";    
    public static final String EXCEPTION_BSA_ROUTE_COC_TEU_LADEN_REQUIRED = "BSA_RZZ01_COC_TEU_LADEN_REQ";
    public static final String EXCEPTION_BSA_ROUTE_COC_TON_LADEN_REQUIRED = "BSA_RZZ01_COC_TON_LADEN_REQ";
    public static final String EXCEPTION_BSA_ROUTE_COC_TEU_MT_REQUIRED = "BSA_RZZ01_COC_TEU_MT_REQ";
    public static final String EXCEPTION_BSA_ROUTE_COC_20MT_REQUIRED = "BSA_RZZ01_COC_20MT_REQ";
    public static final String EXCEPTION_BSA_ROUTE_COC_40MT_REQUIRED = "BSA_RZZ01_COC_40MT_REQ";
    public static final String EXCEPTION_BSA_ROUTE_SOC_TEU_LADEN_REQUIRED = "BSA_RZZ01_SOC_TEU_LADEN_REQ";
    public static final String EXCEPTION_BSA_ROUTE_SOC_TON_LADEN_REQUIRED = "BSA_RZZ01_SOC_TON_LADEN_REQ";
    public static final String EXCEPTION_BSA_ROUTE_SOC_TEU_MT_REQUIRED = "BSA_RZZ01_SOC_TEU_MT_REQ";
    public static final String EXCEPTION_BSA_ROUTE_RECORD_STATUS_REQUIRED = "BSA_RZZ01_RECORD_STATUS_REQ";
    public static final String EXCEPTION_BSA_ROUTE_STATUS_NOT_IN_RANGE = "BSA_RZZ01_STATUS_NOT_IN_RANGE";
    public static final String EXCEPTION_BSA_ROUTE_RECORD_ADD_USER_REQUIRED = "BSA_RZZ01_RECORD_ADD_USER_REQ";
    public static final String EXCEPTION_BSA_ROUTE_RECORD_ADD_DATE_REQUIRED = "BSA_RZZ01_RECORD_ADD_DATE_REQ";
    public static final String EXCEPTION_BSA_ROUTE_RECORD_CHANGE_DATE_REQ = "BSA_RZZ01_RECORD_CHANGE_DATE_REQ";
    public static final String EXCEPTION_BSA_ROUTE_VALUE_DUPULICATE_RECORD = "BSA_RZZ01_VALUE_DUP";
    public static final String EXCEPTION_BSA_ROUTE_UPDATE_CONCURRENCY = "BSA_RZZ01_UPDATE_CON";
    public static final String EXCEPTION_BSA_ROUTE_DELETE_CONCURRENCY = "BSA_RZZ01_DELETE_CON";
    public static final String EXCEPTION_BSA_ROUTE_OBJECT_NOT_FOUND = "BSA_RZZ01_BSA_ROUTE_NOT_FOUND";
    public static final String EXCEPTION_BSA_ROUTE_CHILD_RECORD_NOT_EXIST = "BSA_RZZ01_BSA_ROUTE_ICV_CHILD_EXC";
    public static final String EXCEPTION_BSA_ROUTE_CONSTRAINT01 = "BSA_RZZ01_BSA_ROUTE_CONSTRAINT01";
    public static final String EXCEPTION_BSA_ROUTE_CONSTRAINT02 = "BSA_RZZ01_BSA_ROUTE_CONSTRAINT02";
    public static final String EXCEPTION_BSA_ROUTE_CONSTRAINT03 = "BSA_RZZ01_BSA_ROUTE_CONSTRAINT03";
    public static final String EXCEPTION_BSA_ROUTE_CONSTRAINT04 = "BSA_RZZ01_BSA_ROUTE_CONSTRAINT04";
    public static final String EXCEPTION_BSA_ROUTE_CONSTRAINT05 = "BSA_RZZ01_BSA_ROUTE_CONSTRAINT05";
    public static final String EXCEPTION_BSA_ROUTE_CONSTRAINT06 = "BSA_RZZ01_BSA_ROUTE_CONSTRAINT06";
    public static final String EXCEPTION_BSA_ROUTE_CONSTRAINT07 = "BSA_RZZ01_BSA_ROUTE_CONSTRAINT07";
    public static final String EXCEPTION_BSA_ROUTE_CONSTRAINT08 = "BSA_RZZ01_BSA_ROUTE_CONSTRAINT08";
    public static final String EXCEPTION_BSA_ROUTE_CONSTRAINT09 = "BSA_RZZ01_BSA_ROUTE_CONSTRAINT09";
    public static final String EXCEPTION_BSA_ROUTE_CONSTRAINT10 = "BSA_RZZ01_BSA_ROUTE_CONSTRAINT10";
    public static final String EXCEPTION_BSA_ROUTE_CONSTRAINT11 = "BSA_RZZ01_BSA_ROUTE_CONSTRAINT11";
    public static final String EXCEPTION_BSA_ROUTE_CONSTRAINT12 = "BSA_RZZ01_BSA_ROUTE_CONSTRAINT12";
    public static final String EXCEPTION_BSA_ROUTE_CONSTRAINT13 = "BSA_RZZ01_BSA_ROUTE_CONSTRAINT13";
    public static final String EXCEPTION_BSA_ROUTE_CONSTRAINT14 = "BSA_RZZ01_BSA_ROUTE_CONSTRAINT14";
    public static final String EXCEPTION_BSA_ROUTE_PROFORMA_REF_NO_NOT_EXIST = "VSS_PMZ01_PROFORMA_REF_NO_NOT_EXIST";
    public static final String EXCEPTION_BSA_ROUTE_PROFORMA_ETD_INVALID = "VSS_PMZ01_PROFORMA_ETD_INVALID";
    public static final String EXCEPTION_BSA_ROUTE_PROFORMA_EXIST = "VSS_PMZ01_SERVICE_PROFORMA_EXIST";
    public static final String EXCEPTION_BSA_ROUTE_DESIGNED_NO_OF_VESSELS_INVALID = "VSS_PMZ01_DESIGNED_NO_OF_VESSELS_INVALID";
    // ##08 END
    
    //VSA PORT CALL
    public static final String EXCEPTION_VSA_PORT_CALL_VSA_PORT_CALL_ID_REQUIRED = "BSA_PCZ02_VSA_PORT_CALL_ID_REQ";
    public static final String EXCEPTION_VSA_PORT_CALL_VSA_VOYAGE_HEADER_ID_REQUIRED = "BSA_PCZ02_VSA_VOY_HEADER_ID_REQ";
    public static final String EXCEPTION_VSA_PORT_CALL_BSA_PORT_CALL_ID_REQUIRED = "BSA_PCZ02_BSA_PORT_CALL_ID_REQ";
    public static final String EXCEPTION_VSA_PORT_CALL_PROFORMA_REF_NO_REQUIRED = "BSA_PCZ02_PROFORMA_REF_REQ";
    public static final String EXCEPTION_VSA_PORT_CALL_PORT_REQUIRED = "BSA_PCZ02_PORT_REQ";

    public static final String EXCEPTION_VSA_PORT_CALL_PORT_SEQ_NO_FROM_REQUIRED = "BSA_PCZ02_PORT_SEQ_NO_FROM_REQ";
    public static final String EXCEPTION_VSA_PORT_CALL_PORT_TERMINAL_REQUIRED = "BSA_PCZ02_TERMINAL_REQ";
    public static final String EXCEPTION_VSA_PORT_CALL_START_VOYNO_REQUIRED = "BSA_PCZ02_START_VOYNO_REQ";
    public static final String EXCEPTION_VSA_PORT_CALL_SLOT_TONS_REQUIRED = "BSA_PCZ02_SLOT_TONS_REQ";
    public static final String EXCEPTION_VSA_PORT_CALL_SLOT_TEU_REQUIRED = "BSA_PCZ02_SLOT_TEU_REQ";
    
    public static final String EXCEPTION_VSA_PORT_CALL_SLOT_REEFER_PLUGS_REQUIRED = "BSA_PCZ02_SLOT_REEFER_PLUGS_REQ";
    public static final String EXCEPTION_VSA_PORT_CALL_AVG_COC_TEU_WEIGHT_REQUIRED = "BSA_PCZ02_AVG_COC_TEU_WEIGHT_REQ";
    public static final String EXCEPTION_VSA_PORT_CALL_AVG_SOC_TEU_WEIGHT_REQUIRED = "BSA_PCZ02_AVG_SOC_TEU_WEIGHT_REQ";
    public static final String EXCEPTION_VSA_PORT_CALL_MIN_TEU_REQUIRED = "BSA_PCZ02_MIN_TEU_REQ";
    public static final String EXCEPTION_VSA_PORT_CALL_TOLERANT_REQUIRED = "BSA_PCZ02_TOLERANT_REQ";
    
    public static final String EXCEPTION_VSA_PORT_CALL_RECORD_STATUS_REQUIRED = "BSA_PCZ02_RECORD_STATUS_REQ";
    public static final String EXCEPTION_VSA_PORT_CALL_RECORD_ADD_USER_REQUIRED = "BSA_PCZ02_RECORD_ADD_USER_REQ";
    public static final String EXCEPTION_VSA_PORT_CALL_RECORD_ADD_DATE_REQUIRED = "BSA_PCZ02_RECORD_ADD_DATE_REQ";
    public static final String EXCEPTION_VSA_PORT_CALL_RECORD_CHANGE_USER_REQUIRED = "BSA_PCZ02_RECORD_CHANGE_USER_REQ";
    public static final String EXCEPTION_VSA_PORT_CALL_RECORD_CHANGE_DATE_REQUIRED = "BSA_PCZ02_RECORD_CHANGE_DATE_REQ";
    
    public static final String EXCEPTION_VSA_PORT_CALL_UPDATE_CONCURRENCY = "BSA_PCZ02_UPDATE_CON";
    public static final String EXCEPTION_VSA_PORT_CALL_VSA_PORT_CALL_NOT_EXISTS = "BSA_PCZ02_NOT_EXISTS";
    
     
    //VSS_PROFORMA_MASTER package exception code
    public static final String EXCEPTION_VOYAGE_PROFORMA_VESSEL_ASSIGNMENT_SERVICE_CODE_NOT_EXIST = "VSS_PMZ01_SERVICE_NOT_EXIST"; 
    public static final String EXCEPTION_VOYAGE_PROFORMA_VESSEL_ASSIGNMENT_PROFORMA_REFERENCE_NO_NOT_EXIST = "VSS_PMZ01_PROFORMA_REF_NO_NOT_EXIST";
    public static final String EXCEPTION_VOYAGE_PROFORMA_VESSEL_ASSIGNMENT_SERVICE_PROFORMA_EXIST = "VSS_PMZ01_SERVICE_PROFORMA_EXIST";
    public static final String EXCEPTION_VOYAGE_PROFORMA_VESSEL_ASSIGNMENT_DESIGNED_NO_OF_VESSELS_INVALID = "VSS_PMZ01_DESIGNED_NO_OF_VESSELS_INVALID";
    public static final String EXCEPTION_VOYAGE_PROFORMA_VESSEL_ASSIGNMENT_VOYAGE_PROFORMA_UPDATE_CONCURRENCY = "VSS_PMZ01_UPDATE_CON";
    public static final String EXCEPTION_VOYAGE_PROFORMA_VESSEL_ASSIGNMENT_PROFORMA_MASTER_CONSTRAINT01 = "VSS_PRFRM_MASTER_CONSTRAINT01";
    
    public static final String EXCEPTION_VOYAGE_PROFORMA_VESSEL_ASSIGNMENT_VESSEL_CODE_NOT_EXIST = "VSS_PVA01_VESSEL_CODE_NOT_EXIST";
    public static final String EXCEPTION_VOYAGE_PROFORMA_VESSEL_ASSIGNMENT_VESSEL_SEQ_NO_NOT_SAME_TYPE = "VSS_PVA01_VESSEL_SEQ_NO_NOT_SAME_TYPE";
    public static final String EXCEPTION_VOYAGE_PROFORMA_VESSEL_ASSIGNMENT_VESSEL_SEQ_NO_OVERLAP_DATE = "VSS_PVA01_VESSEL_SEQ_NO_OVERLAP_DATE"; 
    public static final String EXCEPTION_VOYAGE_PROFORMA_VESSEL_ASSIGNMENT_VESSEL_CODE_OVERLAP_DATE = "VSS_PVA01_VESSEL_CODE_OVERLAP_DATE"; 
    public static final String EXCEPTION_VOYAGE_PROFORMA_VESSEL_ASSIGNMENT_VESSEL_RANGE_NOT_IN_PROFORMA_RANGE = "VSS_PVA01_VESSEL_RANGE_NOT_IN_PROFORMA_RANGE"; 
    public static final String EXCEPTION_VOYAGE_PROFORMA_VESSEL_ASSIGNMENT_VESSEL_DAY_DIFF_IN_PROFORMA_MASTER = "VSS_PVA01_DAY_DIFF_IN_PROFORMA_MASTER";     
    public static final String EXCEPTION_VOYAGE_PROFORMA_VESSEL_ASSIGNMENT_VESSEL_DAY_DIFF_IN_PROFORMA_DETAIL = "VSS_PVA01_DAY_DIFF_IN_PROFORMA_DETAIL";     
    public static final String EXCEPTION_VOYAGE_PROFORMA_VESSEL_ASSIGNMENT_VESSEL_SEQ_NO_NOT_VALID = "VSS_PVA01_VESSEL_SEQ_NO_NOT_VALID";
    public static final String EXCEPTION_VOYAGE_PROFORMA_VESSEL_ASSIGNMENT_VESSEL_PROFORMA_ETD_INVALID = "VSS_PMZ01_PROFORMA_ETD_INVALID";
    
    public static final String EXCEPTION_VOYAGE_PROFORMA_VESSEL_ASSIGNMENT_VESSEL_ASSIGNMENT_UPDATE_CONCURRENCY = "VSS_PVA01_UPDATE_CON";
    public static final String EXCEPTION_VOYAGE_PROFORMA_VESSEL_ASSIGNMENT_VESSEL_ASSIGNMENT_DELETE_CONCURRENCY = "VSS_PVA01_DELETE_CON";
    public static final String EXCEPTION_VOYAGE_PROFORMA_VESSEL_ASSIGNMENT_VESSEL_ASSIGNMENT_NOT_FOUND = "VSS_PVA01_PRFRM_VSSL_ASSGN_NOT_FOUND";
    public static final String EXCEPTION_VOYAGE_PROFORMA_VESSEL_ASSIGNMENT_VESSEL_ASSIGNMENT_CONSTRAINT01 = "VSS_PVA01_VSS_ASSGN_CONSTRAINT01";
    public static final String EXCEPTION_VOYAGE_PROFORMA_VESSEL_ASSIGNMENT_VESSEL_ASSIGNMENT_CONSTRAINT02 = "VSS_PVA01_VSS_ASSGN_CONSTRAINT02";
    public static final String EXCEPTION_VOYAGE_PROFORMA_VESSEL_ASSIGNMENT_VESSEL_ASSIGNMENT_CONSTRAINT03 = "VSS_PVA01_VSS_ASSGN_CONSTRAINT03";
    public static final String EXCEPTION_VOYAGE_PROFORMA_VESSEL_ASSIGNMENT_VESSEL_ASSIGNMENT_CONSTRAINT07 = "VSS_PVA01_VSS_ASSGN_CONSTRAINT07";
    public static final String EXCEPTION_VOYAGE_PROFORMA_VESSEL_ASSIGNMENT_VESSEL_ASSIGNMENT_CONSTRAINT08 = "VSS_PVA01_VSS_ASSGN_CONSTRAINT08";
    public static final String EXCEPTION_VOYAGE_PROFORMA_VESSEL_ASSIGNMENT_VESSEL_ASSIGNMENT_CONSTRAINT09 = "VSS_PVA01_VSS_ASSGN_CONSTRAINT09";

    
    //##19 BEGIN
    // DIM_CARGO_MANIFEST package exception code
    public static final String EXCEPTION_DIM_CARGO_MANIFEST_NOT_FOUND = "DIM_DIM108_CARGO_MANIFEST_NOT_FOUND";
    public static final String EXCEPTION_DIM_CARGO_MANIFEST_BL_NO_REQUIRED = "DIM_DIM108_BL_NO_REQ";
    public static final String EXCEPTION_DIM_CARGO_MANIFEST_SESSION_ID_REQUIRED = "DIM_DIM108_SESSION_ID_REQ";
    public static final String EXCEPTION_DIM_CARGO_MANIFEST_RECORD_ADD_USER_REQUIRED = "DIM_DIM108_RECORD_ADD_USER_REQ";
    //##19 END 
    
    //##20 BEGIN
    // DND102_DEMURRAGE_AND_DETENTION_FREE_DAYS package exception code
    public static final String EXCEPTION_DND_FREE_DAYS_NO_DATA_FOUND = "DND_DND102_NO_DATA_FOUND";
    public static final String EXCEPTION_DND_FREE_DAYS_BL_NO_REQUIRED = "DND_DND102_BL_NO_REQ";
    public static final String EXCEPTION_DND_FREE_DAYS_SESSION_ID_REQUIRED = "DND_DND102_SESSION_ID_REQ";
    //##19 END 
    
    //end: Data access error constant 
    
    //begin: type
    public static final String GET_GENERAL = "GET_GENERAL";
    public static final String GET_DISCHARGE = "GET_DISCHARGE"; 
    public static final String GET_HELP_V02_GENERAL = "GET_HELP_V02_GENERAL";    
    public static final String GET_GENERAL_WITH_REGION_COUNTRY = "GET_GENERAL_WITH_REGION_COUNTRY";
    public static final String GET_WITH_ACTIVE_STATUS = "GET_WITH_ACTIVE_STATUS";
    public static final String GET_WITH_USER = "GET_WITH_USER";
    public static final String GET_WITH_USER_LEVEL_ACTIVE_STATUS = "GET_WITH_USER_LEVEL_ACTIVE_STATUS";
    public static final String GET_HELP_V02_WITH_USER_LEVEL_ACTIVE_STATUS = "GET_HELP_V02_WITH_USER_LEVEL_ACTIVE_STATUS";
    public static final String GET_REEFER_GENERAL = "GET_REEFER_GENERAL";
    public static final String GET_REEFER_IMP_GENERAL = "GET_REEFER_IMP_GENERAL";
    public static final String GET_TERMINAL_GENERAL = "GET_TERMINAL_GENERAL";
    public static final String GET_GENERAL_WITH_COMPLETED = "GET_GENERAL_WITH_COMPLETED";
    public static final String GET_SRV_VSS_VOY_POL = "GET_SRV_VSS_VOY_POL";
    public static final String GET_SRV_VSS_VOY_POD = "GET_SRV_VSS_VOY_POD";
    public static final String GET_SRV_VSS_VOY_PORT = "GET_SRV_VSS_VOY_PORT";    
    public static final String GET_SRV_VSS_VOY_INVOY = "GET_SRV_VSS_VOY_INVOY";
    public static final String GET_WITH_FSC = "GET_WITH_FSC";
    public static final String GET_HELP_V02_WITH_FSC = "GET_HELP_V02_WITH_FSC";
    public static final String GET_SUPPORTED_PORT_GROUP = "GET_SUPPORTED_PORT_GROUP";
    public static final String GET_HELP_V02__WITH_ACTIVE_STATUS = "GET_HELP_V02__WITH_ACTIVE_STATUS"; //##17
     public static final String GET_TERMINAL_FILTERED = "GET_TERMINAL_FILTERED";
     public static final String GET_VESSEL_FROM_VSA = "GET_VESSEL_FROM_VSA";
    
    public static final String GET_BL_FOR_DG_MANIFEST = "GET_BL_FOR_DG_MANIFEST";
    public static final String GET_TERMINAL_FSC_TAX = "GET_TERMINAL_FSC_TAX";
    public static final String GET_HOUSEBL_GENERAL = "GET_HOUSEBL_GENERAL"; //--##04
    public static final String GET_BL_GENERAL = "GET_BL_GENERAL"; //--##04
    public static final String GET_TEMPLATE_WITH_INVOICE = "I"; //--##05
    public static final String GET_TEMPLATE_WITH_BILLING = "B"; //--##05
    public static final String GET_POPUP_GENERAL = "OTHER";
    public static final String GET_SERVICE_VARIANT_WITH_SERVICE = "GET_SERVICE_VARIANT_WITH_SERVICE";
    public static final String GET_FILTERED_SERVICE = "GET_FILTERED_SERVICE";
    public static final String GET_FILTERED_RESULT  = "GET_FILTERED_RESULT";
    
    public static final String GET_VESSEL_OPR  = "GET_VESSEL_OPR";

    public static final String GET_STR_DEPOT = "GET_STR_DEPOT" ; // 30
    public static final String GET_STR_TERMINAL = "GET_STR_TERMINAL" ; // 30
    public static final String GET_STR_CHG_CODE = "GET_STR_CHG_CODE"; //30
    //end: type 
    
    // ##01 BEGIN
    //begin desc status bl
    public static final String BL_DESC_ONE   = "Entry";
    public static final String BL_DESC_TWO   = "Confirmed";
    public static final String BL_DESC_THREE = "Printed";
    public static final String BL_DESC_FOUR  = "Manifested";
    public static final String BL_DESC_FIVE  = "Invoiced";
    public static final String BL_DESC_SIX   = "Waitlisted";
    public static final String BL_DESC_SEVEN = "Multipart B/L";
    public static final String BL_DESC_NINE  = "Cancelled";
    //end desc status bl
    // ##01 END
    
    // ##03 BEGIN
    //begin: size
    public static final String SIZE_DEFAULT = "";
    public static final String SIZE_20 = "20";
    public static final String SIZE_40 = "40";
    public static final String SIZE_45 = "45";
    //end: size
    
    //begin: report format
    public static final String REPORT_FORMAT_PDF = "PDF";
    public static final String REPORT_FORMAT_EXCEL = "SPREADSHEET";
    //end: report format
    
    //begin: document type (import/export)
    public static final String DOCUMENT_TYPE_DEFAULT = "";
    public static final String DOCUMENT_TYPE_IMPORT = "I";
    public static final String DOCUMENT_TYPE_EXPORT = "E";
    //end: document type (import/export)
    
    //begin: bound type
    public static final String BOUND_TYPE_DEFAULT = "";
    public static final String BOUND_TYPE_ALL = "";
    public static final String BOUND_TYPE_INBOUND = "I";
    public static final String BOUND_TYPE_OUTBOUND = "O";
    public static final String BOUND_TYPE_CROSSTRADE = "X";
    //end: bound type
    
    //begin: direction
    public static final String DIRECTION_DEFAULT = "";
    public static final String DIRECTION_NORTH = "N";
    public static final String DIRECTION_SOUTH = "S";
    public static final String DIRECTION_EAST = "E";
    public static final String DIRECTION_WEST = "W";
    public static final String DIRECTION_ROUND = "R";
    public static final String DIRECTION_NORTH_EAST = "NE";
    public static final String DIRECTION_NORTH_WEST = "NW";
    public static final String DIRECTION_SOUTH_EAST = "SE";
    public static final String DIRECTION_SOUTH_WEST = "SW";
    //end: direction
    
    //begin: billing type
    public static final String BILLING_TYPE_DEFAULT = "AL";
    public static final String BILLING_TYPE_ALL = "AL";
    public static final String BILLING_TYPE_IMPORT_DEMURRAGE = "ID";
    public static final String BILLING_TYPE_IMPORT_DETENTION = "IN";
    public static final String BILLING_TYPE_EXPORT_DEMURRAGE = "ED";
    public static final String BILLING_TYPE_EXPORT_DETENTION = "EN";
    //end: billing type
    
    //begin: billing status
    public static final String BILLING_STATUS_DEFAULT = "-99";
    public static final String BILLING_STATUS_ALL = "-99";
    public static final String BILLING_STATUS_PENDING = "P";
    public static final String BILLING_STATUS_OPEN = "1";
    public static final String BILLING_STATUS_STARTED = "2";
    public static final String BILLING_STATUS_COMPLETED = "3";
    //end: billing status
    
    //begin: source
    public static final String SOURCE_DEFAULT = "DOC";
    public static final String SOURCE_DOCUMENTATION = "DOC";
    public static final String SOURCE_EQUIPMENT_TRACKING = "EMS";
    //end: source
    // ##03 END
    
    public static final String SORT_ASCENDING = "A";
    public static final String SORT_DESCENDING = "D";
    
    public static final String SHOW_LINK_PAGE_VISIBLE = "VISIBLE";
    public static final String SHOW_LINK_PAGE_INVISIBLE = "INVISIBLE";
    
    // ##09 BEGIN
    public static final String BOOKING_TYPE_DEFAULT = "";
    public static final String BOOKING_TYPE_ALL = "";
    public static final String BOOKING_TYPE_SOC = "S";
    public static final String BOOKING_TYPE_COC = "C";
    // ##09 END
    
    // ##11 BEGIN
    public static final String BOOKING_STATUS_DEFAULT = "A";
    public static final String BOOKING_STATUS_ALL = "A";
    public static final String BOOKING_STATUS_OPEN = "O";
    public static final String BOOKING_STATUS_CONFIRMED = "C";
    public static final String BOOKING_STATUS_WAITLISTED = "W";
    public static final String BOOKING_STATUS_CLOSED = "L";
    public static final String BOOKING_STATUS_PARTIAL = "P";
    // ##11 END
    
    // ##12 BEGIN
    public static final String ONE_WEEK = "1 week (7 days)";
    public static final String ONE_DECADE = "1 decade (10 days)";
    public static final String TWO_WEEK = "2 weeks (14 days)";
    public static final String ONE_MONTH = "1 month (30 days)";
    public static final String ONE_QUARTER = "1 quarter (91 days)";
    public static final String ONE_HALF = "1 half year (182 days)";
    public static final String THREEE_QUARTER = "3 quarter (273 days)";
    public static final String ONE_YEAR = "1 year (365 days)";
    public static final String ONE_NETWORK = "1 network rotation ";
    // ##12 END 
    
    // ##13 BEGIN
    public static final String CNTR_STATUS_F = "F"; //Laden
    public static final String CNTR_STATUS_M = "E"; //Empty
    // ##13 END 
    
    // ##14 BEGIN
    public static final String LOADING_TYPE_DEFAULT = "";
    public static final String LOADING_TYPE_BOTH = "";
    public static final String LOADING_TYPE_LOCAL = "L";
    public static final String LOADING_TYPE_TRANSHIPMENT = "T";
    // ##14 END 
    
    // ##15 BEGIN
    public static final String EXCEPTION_PORT_CODE_NOT_FOUND = "BSA_IMB01_BSA_IMBALANCE_NOT_FOUND";
    // ##15 END 
    
    // ##16 BEGIN
    public static final String PHILIPS_EXCEL = "FAR101_05_EXCEL";
    // ##16 END
    
    public static final String SEARCH_BY_DEFAULT = "";
    public static final String SEARCH_BY_INVOY = "INVOY";
    
    public static final String OPERATION_TYPE_DEFAULT = "S";
    public static final String OPERATION_TYPE_SHS = "S";
    public static final String OPERATION_TYPE_TOS = "T";
    
    public static final String FSC_CODE_DEFAULT = "***";
    public static final String FSC_CODE_ALL = "***";
    
    public static final String UTILITY_TYPE_DEFAULT = "F";
    public static final String UTILITY_TYPE_FILE = "F";
    public static final String UTILITY_TYPE_TEXT = "T";
    
    public static final String[] UTILITY_DETAIL_NAME = {
        "DIM111_HEADER"
        ,"DIM111_PRINTCLAUSE"
        ,"DIM111_SIGNATURE"
        ,"DIM128_HEADER"
        ,"DIM128_PRINTCLAUSE"
        ,"DIM128_SIGNATURE"
        ,"TOS123_HEADER"
    };
    
    public static final String[] SCREEN_CODE = {
        "DIM111"
        ,"DIM128"
        ,"DIMCGF"//##24
        ,"DEXCGF"//##24
        ,"DIM111CMB"//##27
        ,"TOS123"//##28
     };
    
    public static final String[] MODULE_CODE = {
        "BKG"
        ,"CAM"
        ,"CRM"
        ,"CTF"
        ,"DND"
        ,"DEX"
        ,"DIM"
        ,"EMS"
        ,"FAR"
        ,"IJS"
        ,"QTN"
        ,"SHS"
        ,"SPS"
        ,"TOS"
        ,"VMS"
        ,"VSS"
    };
    
    // ##22 BEGIN
    public static final String SCHEDULE_DIRECTORY_PATH_PROCESS_DEFAULT = "/ApplTop/FileDEV/RCLWebAppResource";
    public static final String SCHEDULE_DIRECTORY_PATH_HISTORY_DEFAULT = "/ApplTop/FileDEV/RCLWebAppResource";
    
    public static final String SERVICE_TYPE_DEFAULT = "";
    public static final String SERVICE_TYPE_REPORT = "R";
    public static final String SERVICE_TYPE_SCRIPT = "S";
    
    public static final String SCRIPT_CODE_REOPEN_LOAD_LIST = "TOS_RLL";
    public static final String SCRIPT_CODE_DELETE_DISCHARGE_LIST = "TOS_DDL";
    public static final String SCRIPT_CODE_QTN_BACK_DATING = "QTN_QBD"; //#23
    
    public static final String REPORT_FILE_FORMAT_DEFAULT = "A";
    public static final String REPORT_FILE_FORMAT_ALL = "A";
    public static final String REPORT_FILE_FORMAT_PDF = "P";
    public static final String REPORT_FILE_FORMAT_EXCEL = "E";
    
    public static final String INPUT_TYPE_TEXTBOX = "TXT";
    public static final String INPUT_TYPE_COMBOBOX = "CMB";
    public static final String INPUT_TYPE_DROPDOWN = "LST";
    public static final String INPUT_TYPE_CHECKBOX = "CHK";
    public static final String INPUT_TYPE_HIDDEN = "HID";
    
    public static final String PARAMETER_TYPE_DEFAULT = "";
    public static final String PARAMETER_TYPE_HELP = "HELP";
    public static final String PARAMETER_TYPE_CALENDAR = "CALENDAR";
    
    public static final String EXECUTE_TYPE_MANUAL = "M";
    public static final String EXECUTE_TYPE_SCHEDULE = "S";
    
    public static final String LOG_STATUS_PENDING = "P";
    public static final String LOG_STATUS_SUCCEEDED = "S";
    public static final String LOG_STATUS_FAILED = "F";
    public static final String LOG_STATUS_CANCELLED = "C";
    
    public static final String SCHEDULE_TYPE_DEFAULT = "O";
    public static final String SCHEDULE_TYPE_NOW = "O";
    public static final String SCHEDULE_TYPE_OVER_NIGHT = "N";
    public static final String SCHEDULE_TYPE_OVER_WEEKEND = "E";
    public static final String SCHEDULE_TYPE_HOURLY = "H";
    public static final String SCHEDULE_TYPE_DAILY = "D";
    public static final String SCHEDULE_TYPE_WEEKLY = "W";
    public static final String SCHEDULE_TYPE_MONTHLY = "M";
    public static final String SCHEDULE_TYPE_YEARLY = "Y";
    
    public static final String SCHEDULE_CHOICE_1 = "1";
    public static final String SCHEDULE_CHOICE_2 = "2";
    
    public static final String SCHEDULE_RUNDAY_DEFAULT = "MONDAY";
    public static final String SCHEDULE_RUNDAY_MONDAY = "MONDAY";
    public static final String SCHEDULE_RUNDAY_TUESDAY = "TUESDAY";
    public static final String SCHEDULE_RUNDAY_WEDNESDAY = "WEDNESDAY";
    public static final String SCHEDULE_RUNDAY_THURSDAY = "THURSDAY";
    public static final String SCHEDULE_RUNDAY_FRIDAY = "FRIDAY";
    public static final String SCHEDULE_RUNDAY_SATURDAY = "SATURDAY";
    public static final String SCHEDULE_RUNDAY_SUNDAY = "SUNDAY";
    
    public static final String SCHEDULE_RUNMONTH_DEFAULT = "JANUARY";
    public static final String SCHEDULE_RUNMONTH_JANUARY = "JANUARY";
    public static final String SCHEDULE_RUNMONTH_FEBRUARY = "FEBRUARY";
    public static final String SCHEDULE_RUNMONTH_MARCH = "MARCH";
    public static final String SCHEDULE_RUNMONTH_APRIL = "APRIL";
    public static final String SCHEDULE_RUNMONTH_MAY = "MAY";
    public static final String SCHEDULE_RUNMONTH_JUNE = "JUNE";
    public static final String SCHEDULE_RUNMONTH_JULY = "JULY";
    public static final String SCHEDULE_RUNMONTH_AUGUST = "AUGUST";
    public static final String SCHEDULE_RUNMONTH_SEPTEMBER = "SEPTEMBER";
    public static final String SCHEDULE_RUNMONTH_OCTOBER = "OCTOBER";
    public static final String SCHEDULE_RUNMONTH_NOVEMBER = "NOVEMBER";
    public static final String SCHEDULE_RUNMONTH_DECEMBER = "DECEMBER";
    
    public static final String SCHEDULE_ORDERLY_DEFAULT = "FIRST";
    public static final String SCHEDULE_ORDERLY_FIRST = "FIRST";
    public static final String SCHEDULE_ORDERLY_SECOND = "SECOND";
    public static final String SCHEDULE_ORDERLY_THIRD = "THIRD";
    public static final String SCHEDULE_ORDERLY_FOURTH = "FOURTH";
    public static final String SCHEDULE_ORDERLY_LAST = "LAST";
    
    public static final String SCHEDULE_ENDDATE_CHOICE_1 = "1";
    public static final String SCHEDULE_ENDDATE_CHOICE_2 = "2";
    public static final String SCHEDULE_ENDDATE_CHOICE_3 = "3";
    
    public static final String SCHEDULE_SPECIAL_DAY_FIRST_DAY = "F";
    public static final String SCHEDULE_SPECIAL_DAY_LAST_DAY = "L";
    public static final String SCHEDULE_SPECIAL_DAY_PREVIOUS_DAY = "P";
    public static final String SCHEDULE_SPECIAL_DAY_CURRENT_DAY = "C";
    public static final String SCHEDULE_SPECIAL_DAY_NEXT_DAY = "N";
    public static final String SCHEDULE_SPECIAL_DAY_PREVIOUS_WEEK_START = "PWS";
    public static final String SCHEDULE_SPECIAL_DAY_PREVIOUS_WEEK_END = "PWE";
    public static final String SCHEDULE_SPECIAL_DAY_CURRENT_WEEK_START = "CWS";
    public static final String SCHEDULE_SPECIAL_DAY_CURRENT_WEEK_END = "CWE";
    public static final String SCHEDULE_SPECIAL_DAY_NEXT_WEEK_START = "NWS";
    public static final String SCHEDULE_SPECIAL_DAY_NEXT_WEEK_END = "NWE";
    
    public static final String SCHEDULE_SPECIAL_MONTH_FIRST_MONTH = "F";
    public static final String SCHEDULE_SPECIAL_MONTH_LAST_MONTH = "L";
    public static final String SCHEDULE_SPECIAL_MONTH_PREVIOUS_MONTH = "P";
    public static final String SCHEDULE_SPECIAL_MONTH_CURRENT_MONTH = "C";
    public static final String SCHEDULE_SPECIAL_MONTH_NEXT_MONTH = "N";
    public static final String SCHEDULE_SPECIAL_MONTH_FIRST_QUARTER_START = "1QS";
    public static final String SCHEDULE_SPECIAL_MONTH_FIRST_QUARTER_END = "1QE";
    public static final String SCHEDULE_SPECIAL_MONTH_SECOND_QUARTER_START = "2QS";
    public static final String SCHEDULE_SPECIAL_MONTH_SECOND_QUARTER_END = "2QE";
    public static final String SCHEDULE_SPECIAL_MONTH_THIRD_QUARTER_START = "3QS";
    public static final String SCHEDULE_SPECIAL_MONTH_THIRD_QUARTER_END = "3QE";
    public static final String SCHEDULE_SPECIAL_MONTH_FOURTH_QUARTER_START = "4QS";
    public static final String SCHEDULE_SPECIAL_MONTH_FOURTH_QUARTER_END = "4QE";
    public static final String SCHEDULE_SPECIAL_MONTH_PREVIOUS_QUARTER_START = "PQS";
    public static final String SCHEDULE_SPECIAL_MONTH_PREVIOUS_QUARTER_END = "PQE";
    public static final String SCHEDULE_SPECIAL_MONTH_CURRENT_QUARTER_START = "CQS";
    public static final String SCHEDULE_SPECIAL_MONTH_CURRENT_QUARTER_END = "CQE";
    public static final String SCHEDULE_SPECIAL_MONTH_NEXT_QUARTER_START = "NQS";
    public static final String SCHEDULE_SPECIAL_MONTH_NEXT_QUARTER_END = "NQE";
    
    public static final String SCHEDULE_SPECIAL_YEAR_PREVIOUS_YEAR = "P";
    public static final String SCHEDULE_SPECIAL_YEAR_CURRENT_YEAR = "C";
    public static final String SCHEDULE_SPECIAL_YEAR_NEXT_YEAR = "N";
    
    public static final String SCHEDULE_STATUS_CREATED = "";
    public static final String SCHEDULE_STATUS_SCHEDULED = "SCHEDULED";
    public static final String SCHEDULE_STATUS_RUNNING = "RUNNING";
    public static final String SCHEDULE_STATUS_COMPLETED = "COMPLETED";
    public static final String SCHEDULE_STATUS_DISABLED = "DISABLED";
    
    public static final String[] SCHEDULE_SPECIAL_DAY = {
        SCHEDULE_SPECIAL_DAY_FIRST_DAY
        ,SCHEDULE_SPECIAL_DAY_LAST_DAY
        ,SCHEDULE_SPECIAL_DAY_PREVIOUS_DAY
        ,SCHEDULE_SPECIAL_DAY_CURRENT_DAY
        ,SCHEDULE_SPECIAL_DAY_NEXT_DAY
        ,SCHEDULE_SPECIAL_DAY_PREVIOUS_WEEK_START
        ,SCHEDULE_SPECIAL_DAY_PREVIOUS_WEEK_END
        ,SCHEDULE_SPECIAL_DAY_CURRENT_WEEK_START
        ,SCHEDULE_SPECIAL_DAY_CURRENT_WEEK_END
        ,SCHEDULE_SPECIAL_DAY_NEXT_WEEK_START
        ,SCHEDULE_SPECIAL_DAY_NEXT_WEEK_END
    };
    
    public static final String[] SCHEDULE_SPECIAL_MONTH = {
        SCHEDULE_SPECIAL_MONTH_FIRST_MONTH
        ,SCHEDULE_SPECIAL_MONTH_LAST_MONTH
        ,SCHEDULE_SPECIAL_MONTH_PREVIOUS_MONTH
        ,SCHEDULE_SPECIAL_MONTH_CURRENT_MONTH
        ,SCHEDULE_SPECIAL_MONTH_NEXT_MONTH
        ,SCHEDULE_SPECIAL_MONTH_FIRST_QUARTER_START
        ,SCHEDULE_SPECIAL_MONTH_FIRST_QUARTER_END
        ,SCHEDULE_SPECIAL_MONTH_SECOND_QUARTER_START
        ,SCHEDULE_SPECIAL_MONTH_SECOND_QUARTER_END
        ,SCHEDULE_SPECIAL_MONTH_THIRD_QUARTER_START
        ,SCHEDULE_SPECIAL_MONTH_THIRD_QUARTER_END
        ,SCHEDULE_SPECIAL_MONTH_FOURTH_QUARTER_START
        ,SCHEDULE_SPECIAL_MONTH_FOURTH_QUARTER_END
        ,SCHEDULE_SPECIAL_MONTH_PREVIOUS_QUARTER_START
        ,SCHEDULE_SPECIAL_MONTH_PREVIOUS_QUARTER_END
        ,SCHEDULE_SPECIAL_MONTH_CURRENT_QUARTER_START
        ,SCHEDULE_SPECIAL_MONTH_CURRENT_QUARTER_END
        ,SCHEDULE_SPECIAL_MONTH_NEXT_QUARTER_START
        ,SCHEDULE_SPECIAL_MONTH_NEXT_QUARTER_END
    };
    
    public static final String[] SCHEDULE_SPECIAL_YEAR = {
        SCHEDULE_SPECIAL_YEAR_PREVIOUS_YEAR
        ,SCHEDULE_SPECIAL_YEAR_CURRENT_YEAR
        ,SCHEDULE_SPECIAL_YEAR_NEXT_YEAR
    };
    // ##22 END
    
    //##27 BEGIN
     public static final String LOAD_DISCH_LOAD = "L";
     public static final String LOAD_DISCH_DISCHARGE = "D";
     public static final String LOAD_DISCH_BOTH = "B";
    
    public static final String TRANSHIPMENT = "Y";
    public static final String NO_TRANSHIPMENT = "N";

    // ##27 End
    
    //##28 BEGIN
     public static final String OPERATION_TYPE_STATUS_DEFAULT = "ALL";
     public static final String OPERATION_TYPE_STATUS_ENTRY = "ENTRY";
     public static final String OPERATION_TYPE_STATUS_ESTIMATED = "ESTIMATED";
     public static final String OPERATION_TYPE_STATUS_ESTIMATED_COMPLETED = "ESTIMATED_COMPLETED";
     public static final String OPERATION_TYPE_STATUS_NOT_CREATED = "NOT_CREATED";
     public static final String OPERATION_TYPE_STATUS_RE_OPENED = "RE_OPENED";
    //##28 End
    
    //for RSE Report 
    public static final String USER_LOGIN_ID_PARAM      = "P_USER_LOGIN_ID";
    public static final String USER_LOGIN_LINE_PARAM    = "P_USER_LOGIN_LINE";
    public static final String USER_LOGIN_TRADE_PARAM   = "P_USER_LOGIN_TRADE";
    public static final String USER_LOGIN_AGENT_PARAM   = "P_USER_LOGIN_AGENT";
    public static final String USER_LOGIN_FSC_PARAM     = "P_USER_LOGIN_FSC";
    public static final String USER_LOGIN_COUNTRY_PARAM = "P_USER_LOGIN_COUNTRY";
    public static final String USER_LOGIN_AREA_PARAM    = "P_USER_LOGIN_AREA";
    public static final String USER_LOGIN_ZONE_PARAM    = "P_USER_LOGIN_ZONE";
    public static final String P_START_DATE_PARAM       = "P_START_DATE";
 
    
    //for table cam_service_parameter_value
    public static final String PARAMETER_VALUE_SQL_TYPE      = "SQL";
    public static final String PARAMETER_VALUE_STATIC_TYPE   = "STT";
    
    public static final String PARAMETER_DISABLED_TYPE   = "D";
    
    public static final String SCHEMA_RCLAPPS           ="RCLAPPS";
    public static final String SCHEMA_VASAPPS           ="VASAPPS";
     
}


