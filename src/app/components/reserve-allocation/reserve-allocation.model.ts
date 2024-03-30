import { ForecastCoverageUIData } from "./components/ra-forecast-coverage-chart/ra-forecast-coverage-chart.model";
import { ISearchCriteriaForm } from "./components/ra-search-panel/ra-search-panel.interfaces";
import { RAUserType } from "./constants/ra-general-constants";

export class RAData {
    searchCriteria: ISearchCriteriaForm;
    userType: RAUserType;
    currentPilot: PilotInfo | null;
    uncoveredTripsAmount: number;
    uncoveredTripsDays: number;
    forecastCoverageUIData: ForecastCoverageUIData[];
    maxTripLength: number;
}

export class PilotInfo {
    firstName: string;
    lastName: string;
    pilotId: string;
    base: string;
    equipment: string;
    seat: string;
}