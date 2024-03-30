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

export enum RAForecastCellType {
  FORECAST_EXCEED,
  FORECAST_EQUAL,
  FORECAST_SHORT,
  OPENTIME_COUNT_INCLUDED,
  OPENTIME_COUNT_OVER_FORECAST,
  ONLY_FORECAST,
  NO_FORECAST_REQUIREMENT
}

export const RA_MAX_TRIP_LENGTH = 17;