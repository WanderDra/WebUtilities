import { RATypeOfRequirement } from "../../constants/ra-general-constants";

export class RACoverageDetailTrip {
    tripName: string;
    pilot: RACoverageDetailPilot;
    tripType: RATypeOfRequirement;
}

export class RACoverageDetailPilot {
    pilotId: string;
    pilotName: string;
    pilotType: string;
}