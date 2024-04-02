import { RAForecastCellType } from "../constants/ra-general-constants";

export interface IRAConfig {
    backgroundColor: string;
}

export interface IRACellConfig {
    cellType: RAForecastCellType;
    cellContent?: string;
    hideContent?: boolean;
}