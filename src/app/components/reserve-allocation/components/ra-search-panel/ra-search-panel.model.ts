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

export enum ViewAsOption {
    ADMIN = 'Admin',
    PILOT = 'Pilot'
}