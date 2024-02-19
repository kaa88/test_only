export interface IEvent {
  year: number;
  descr?: string;
}

export type IPeriod = IEvent[];

export type IData = IPeriod[];

export type IActivePeriod = number;

export type PeriodChangeHandler = (activePeriod: IActivePeriod) => void;
