import { Moment } from "moment";

export enum PdSessionStatus {
    EMPTY = 'empty',
    LEVELING = 'leveling',
    IMMEDIATE = 'immediate',
    END = 'end'
}

export enum TripCardActionStatus {
    RANKING = 'ranking',
    IMMEDIATE = 'immediate',
    MISSED = 'missed',
    RESPONSED = 'responsed',
    ASSIGNED = 'assigned',
    ERROR = 'error'
}

export class DestinationInfo {
    base: string;
    isDeadhead: boolean;
    isLayover: boolean;
}

export class TripCard {
    tripId: number;
    rankSelected: number;
    status: TripCardActionStatus;
    route: DestinationInfo[];
    showtime: Moment;
    countdown: number;
}