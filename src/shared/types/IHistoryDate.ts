import type { IEvent } from './IEvent';

export interface IHistoryDate {
	id: number;
	label: string;
	startYear: number;
	endYear: number;
	events: IEvent[];
}
