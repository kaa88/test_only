export interface IEvent {
  year: number;
  descr?: string;
}

export interface IPeriod {
  title: string;
  items: IEvent[];
}

export type IData = IPeriod[];

export type IActivePeriod = number;

export type PeriodChangeHandler = (activePeriod: IActivePeriod) => void;
