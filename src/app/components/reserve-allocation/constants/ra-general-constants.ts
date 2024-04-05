export enum RAUserType {
    ADMIN = 'ADMIN',
    PILOT = 'PILOT'
}

export const RA_DATE_FORMAT = {
    parse: {
      dateInput: 'MMMDD',
    },
    display: {
      dateInput: 'MMMDD',
      monthYearLabel: 'MMMDD',
      dateA11yLabel: 'MMMDD',
      monthYearA11yLabel: 'MMMDD',
    },
};

export enum RACellType {
  FORECAST_EXCEED,
  FORECAST_EQUAL,
  FORECAST_SHORT,
  OPENTIME_COUNT_INCLUDED,
  OPENTIME_COUNT_OVER_FORECAST,
  ONLY_FORECAST,
  NO_FORECAST_REQUIREMENT,
  FORECAST_TRIP,
  OPENTIME_TRIP,
  PROJECTED_OPEN_TRIP,
  ASSIGNED_TRIP,
  NO_TRIP_ASSIGNMENT,
  PILOT_UNAVAILABLE
}

export const RA_MAX_TRIP_LENGTH = 17;

export enum RATypeOfRequirement {
  OPEN_TIME,
  PROJECTED_OPEN_TIME,
  FORECAST_TRIP
}