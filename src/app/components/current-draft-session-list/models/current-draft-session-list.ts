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
    trips: Trip[];
    legalities: Legality[];
}

export class SessionData {
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
    trips: Trip[];
    legalities: Legality[];
    selected: boolean;
}

export class Trip {
    id: string;
    date: Moment;
    status: string;
    info: string;
}

export class Legality {
    id: string;
    percentage: number;
    amount: number;
    info: string;
}
