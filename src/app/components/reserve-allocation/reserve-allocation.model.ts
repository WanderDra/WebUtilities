import { ISearchCriteriaForm } from "./components/ra-search-panel/ra-search-panel.interfaces";
import { RAUserType } from "./constants/ra-general-constants";

export class RAData {
    searchCriteria: ISearchCriteriaForm;
    currentPilot: PilotInfo | null;
    uncoveredTripsAmount: number;
    uncoveredTripsDays: number;
}

export class PilotInfo {
    firstName: string;
    lastName: string;
    pilotId: string;
    base: string;
    equipment: string;
    seat: string;
}