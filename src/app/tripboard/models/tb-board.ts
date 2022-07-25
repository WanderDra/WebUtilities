export class TripCard{
    tripId: number;
    showtime: string;
    endtime: string;
    pay: number;
    deadheads: number;
    destinations: string;
    rankchoice: number;
}

export class TBBoardInfo {
    pilotNbr: number;
    sessionRefNumber: number;
    tripcards: TripCard[];
}