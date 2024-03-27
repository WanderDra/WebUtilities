import { RAUserType } from "../../constants/ra-general-constants";

export enum SearchCriteriaControls {
    BID_MONTH = 'bid_month',
    BASE = 'base',
    EQUIPMENT = 'equipment',
    SEAT = 'seat',
    VIEW_AS = 'view_as',
    RSV_PRD = 'rsv_prd',
    SIBA = 'siba',
    OPEN_TIME_CHECK = 'is_open_time',
    OPEN_TIME_STANDBYS_CHECK = 'is_open_time_standbys',
    PROJECTED_OPEN_TIME_CHECK = 'is_projected_open_time',
    FORECAST_CHECK = 'is_forecast'
}

export class SearchCriteriaConfigs {
    userType: RAUserType;
    minBidMonth: string;
    baseOptions: string[];
    equipmentOptions: string[];
    seatOptions: string[];
    rsvPrdOptions: string[];
    sibaOptions: string[];
    viewAsOptions: string[];
}

export interface SearchCriteriaForm {
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