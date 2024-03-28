import { RAUserType } from "../../constants/ra-general-constants";
import { SearchCriteriaControls } from "./ra-search-panel.model";

/** Form output on search */
export interface ISearchCriteriaForm {
    [SearchCriteriaControls.BID_MONTH]: string,
    [SearchCriteriaControls.BASE]: string,
    [SearchCriteriaControls.EQUIPMENT]: string,
    [SearchCriteriaControls.SEAT]: string,
    [SearchCriteriaControls.VIEW_AS]: string,
    [SearchCriteriaControls.RSV_PRD]: string,
    [SearchCriteriaControls.SIBA]: string,
    [SearchCriteriaControls.OPEN_TIME_CHECK]: boolean,
    [SearchCriteriaControls.OPEN_TIME_STANDBYS_CHECK]: boolean,
    [SearchCriteriaControls.PROJECTED_OPEN_TIME_CHECK]: boolean,
    [SearchCriteriaControls.FORECAST_CHECK]: boolean
}

/** Search configuration */
export interface ISearchCriteriaConfigs {
    userType: RAUserType;
    minBidMonth: string;    //ISOString
    baseOptions: string[];
    equipmentOptions: string[];
    seatOptions: string[];
    rsvPrdOptions: string[];
    sibaOptions: string[];
    viewAsOptions: string[];
}