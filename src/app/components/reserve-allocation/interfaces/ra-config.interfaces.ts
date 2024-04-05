import { RACellType } from "../constants/ra-general-constants";

export interface IRAConfig {
    backgroundColor: string;
}

export interface IRACellConfig {
    cellType: RACellType;
    cellContent?: string;
    hideContent?: boolean;
}