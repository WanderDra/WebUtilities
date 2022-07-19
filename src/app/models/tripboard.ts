export class GetTripOfferedRequest {
    pilotNbr: number;
    sessionRefNumber: number;
}

export class GetTripOfferedResponse {
    pilotNbr: number;
    sessionRefNumber: number;
    vccTripsOffered: VccTrip[];
}

export class TripPreferencesRequest {
    pilotNbr: number;
    tripPreferences: {
        commTripId: number;
        tripPref: number;
    }[];
}

export class TripPreferencesResponse {
    
}

export class VccTrip {
    vtId: number;
    vtVsId: number;
    vtVciId: number;
    vtNbr: number;
    vtBase: string;
    vtEq: string;
    vtOpDt: string;
    vtRevNbr: number;
    vtSeatCd: string;
    vtStatusCd: string;
    vtAsgnTm: String;
    vtAsgnPilotNbr: number;
    vtJsonTxt: string;
    vtlvrTxt: string;
    vtAddTm: string;
    vtAddPrgmNm: string;
    vtUpdtUsrId: number;
    vtUpdtTm: string;
    vtUpdtPrgmNm: string;
}

