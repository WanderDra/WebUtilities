import { RAForecastCellType } from "../../constants/ra-general-constants";

export interface IRACellConfig {
    cellType: RAForecastCellType;
    cellContent?: string;
    hideContent?: boolean;
}