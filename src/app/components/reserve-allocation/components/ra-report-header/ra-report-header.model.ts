import { RAUserType } from "../../constants/ra-general-constants";
import { PilotInfo } from "../../reserve-allocation.model";

export class RAReportHeaderUIParams {
    bidMonth: string;
    bidMonthDisplay: string;
    base: string;
    equipment: string;
    seat: string;
    updateTime: string;
    rsvPrd: string;
    siba: string;
    pilotInfo: PilotInfo;
    uncoveredTripsAmount: number;
    uncoveredTripsDays: number;
    userType: RAUserType;
    includedChecks: string;
    excludedChecks: string;
}