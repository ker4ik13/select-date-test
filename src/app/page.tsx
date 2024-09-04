import { HistoryDates } from '@/components';
import { mockHistoryDates } from '@/data/mockHistoryDates';

export default function Home() {
	return (
		<div>
			<HistoryDates data={mockHistoryDates} />
		</div>
	);
}
