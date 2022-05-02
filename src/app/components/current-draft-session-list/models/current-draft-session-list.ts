import { Moment } from "moment";

export class SessionDataResponse {
    sessionId: string;
    status: number;
    tripCount: number;
    startTime: Moment;
    base: string;
    eqNbr: number;
    seat: string;
    tripAssigned: number;
    tripAllMatch: number;
    pilotAttempted: number;
    pilotAllMatch: number;
    estTime: number;
    trips: TripResponse[];
    legalities: LegalityOutcomeResponse[];
}

export class SessionItem {
    sessionId: string;
    status: number;
    tripCount: number;
    startTime: string;
    base: string;
    eqNbr: number;
    seat: string;
    tripAssigned: number;
    tripAllMatch: number;
    tripAssignedPercentage: string;
    pilotAttempted: number;
    pilotAllMatch: number;
    pilotAttemptedPercentage: string;
    estTime: number;
    trips: TripItem[];
    legalities: LegalityOutcomeItem[];
    selected: boolean;
    class: string;
    isViewTripExtended: boolean;
    isLegalityOutcomesExtended: boolean;
}

export class TripResponse {
    id: string;
    date: Moment;
    status: string;
    info: string;
}

export class TripItem {
    id: string;
    date: string;
    status: string;
    info: string;
}

export class LegalityOutcomeResponse {
    id: string;
    percentage: number;
    amount: number;
    info: string;
}

export class LegalityOutcomeItem {
    id: string;
    percentage: number;
    amount: number;
    info: string;
}
