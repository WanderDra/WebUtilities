import { RACoverageDetailPilot, RACoverageDetailTrip } from "./ra-cd.model";

export interface IRACoverageDetail {
    totalTrips: number;
    openTimeTrips: number;
    openStandbyTrips: number;
    projectedTrips: number;
    forecast: number;
    totalForecast: number;
    trips: RACoverageDetailTrip[];
    pilots: RACoverageDetailPilot[];
}