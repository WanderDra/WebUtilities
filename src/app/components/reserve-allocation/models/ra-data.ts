import { FCChartRecord } from "../components/ra-forecast-coverage-chart/ra-fc-chart.model";
import { RPCChartRecord } from "../components/ra-reserve-pilot-calendar/ra-rpc-model";
import { ISearchCriteriaForm } from "../components/ra-search-panel/ra-search-panel.interfaces";
import { URChartRecord } from "../components/ra-uncovered-requirements-chart/ra-ur-chart.model";
import { RAUserType } from "../constants/ra-general-constants";
import { PilotInfo } from "../reserve-allocation.model";

export class RAData {
    searchCriteria: ISearchCriteriaForm;
    userType: RAUserType;
    currentPilot: PilotInfo | null;
    uncoveredTripsAmount: number;
    uncoveredTripsDays: number;
    forecastCoverageRecords: FCChartRecord[];
    maxTripLength: number;
    backgroundColor: string;
    uncoveredRequirementsRecords: URChartRecord[];
    reservePilotCalendarRecords: RPCChartRecord[];
    rpcStartDate: string;
    rpcEndDate: string;
    rpcBidMonthEndDates: string[];
}