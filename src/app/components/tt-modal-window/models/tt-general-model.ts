export class TripTradeWindowData {
    positionsMonitoring: TripTradePosition[];
    totalTrades: number;
    positionsAvailable: TripTradePosition[];
    positionsPreference: TripTradePosition[];
}

export class TripTradePosition {
    base: string;
    equipment: string;
    seat: string;
    status?: TripTradePositionStatus;
    isProcessingByOther?: boolean;
    
    isShowingErrorDetail?: boolean;
    isSelected?: boolean;

    constructor(config: TripTradePositionConfig) {
        Object.apply(this, config);
    }
}

export enum TripTradePositionStatus {
    PROCESSING = 'processing',
    STOPPED = 'stopped',
    PAUSED = 'paused'
}

export interface TripTradePositionConfig {
    base: string;
    equipment: string;
    seat: string;
    status?: TripTradePositionStatus;
    isProcessingByOther?: boolean;
}
