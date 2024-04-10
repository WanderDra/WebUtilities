import { RACellType } from "../constants/ra-general-constants";
import { IRACoverageDetail } from "../popups/ra-coverage-detail-popup/ra-cd.interface";

export interface IRAConfig {
    backgroundColor: string;
}

export interface IRACellConfig {
    cellType: RACellType;
    cellContent?: string;
    hideContent?: boolean;
}

export interface IRAForecastCoverageConfig extends IRACellConfig{
    raCoverageDetail: IRACoverageDetail
}