export interface ReserveAllocationSummaryResponse {
    rsvDate: string;
    type: string;
    reserveAllocationDayDetails: ReserveAllocationDayDetail[]
}

export interface ReserveAllocationDayDetail {
    lengthOfTrip: number;
    rasTripCount: {
        count: number;
        type: ServerRASCellType;
    };
    rasTripInfos: RASTripInfo[];
    reserveCount: number;
    rasPilotInfos: RASPilotInfo[];
    reserveCountType: ServerRASCellType;
}

export interface RASTripInfo {
    tripKey: {
        number: string;
        operatingDate: string;
        baseStation: string;
        aircraftType: string;       
    },
    pilotInfo: {
        pilotid: string;
        firstname: string;
        lastname: string;
    }
    type: ServerRASTypeOfRequirement;
}

export interface RASPilotInfo {
    pilotid: string;
    firstname: string;
    lastname: string;
    reserveType: string;
}

export enum ServerRASCellType {
    // WIP

}

export enum ServerRASTypeOfRequirement {
    // WIP
    FORECAST_TRIP,
    OPEN_TIME,
    PROJECTED_OPEN_TIME,
    OPEN_STAND_BY
}