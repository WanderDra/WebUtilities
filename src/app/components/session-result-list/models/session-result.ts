export class SessionResultResponse {
    seniorityNbr: string;
    pilotName: string;
    empId: string;
    tripsOffered: number;
    contactOutcome: string;
    tripLegalities: TripLegalityResponse[];
    outcomes: ContactOutcomeResponse[];
    isCallAttempting: boolean;
    isRecordResponseAvailable: boolean;
}

export class SessionResultItem {
    seniorityNbr: string;
    pilotName: string;
    empId: string;
    tripsOffered: string;
    contactOutcome: string;
    tripLegalities: TripLegality[];
    outcomes: ContactOutcome[];
    isTripLegalityExtended: boolean;
    isContactOutcomesExtended: boolean;
    isCallAttempting: boolean;
    isRecordResponseAvailable: boolean;
}

export class TripLegalityResponse {
    tripNbr: string;
    legalityCheckOutcome: string;
    pilotSelection: string;
}

export class TripLegality {
    tripNbr: string;
    legalityCheckOutcome: string;
    isLegalityDetailsAvailable: boolean;
    pilotSelection: string;
}

export class ContactOutcomeResponse {
    phoneNbr: string;
    contactOutcome: string;
}

export class ContactOutcome {
    phoneNbr: string;
    contactOutcome: string;
}