import { Moment } from "moment";

export class SessionListFilterSearchCriteria {
    base: string[];
    eqNbr: string[];
    seat: string[];
}

export interface SessionFilterData {
    base: string[],
    eqNbr: string[],
    seat: string[],
    tripNbr: string,
    tripData: Moment
}