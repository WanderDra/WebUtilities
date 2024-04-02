import { FCChartRecord } from "../components/ra-forecast-coverage-chart/ra-fc-chart.model";
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
}