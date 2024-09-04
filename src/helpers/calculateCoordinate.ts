export const calculateCoordinate = (
	count: number,
	r: number,
	cx: number,
	cy: number,
	maxCard = 6,
	startAngle = -130,
) => {
	const sectors = [];
	let endAngle = 0;

	for (let i = 0; i < count; i++) {
		if (i <= maxCard - 1) {
			const angle = 360 / maxCard;
			endAngle += angle;
			const rad = Math.PI / 180;

			const x = cx + r * +Math.cos(startAngle * rad).toFixed(2);
			const y = cy + r * +Math.sin(startAngle * rad).toFixed(2);

			startAngle += angle;
			sectors.push({ x, y });
		} else {
			const angle = 360 / (count - maxCard);
			endAngle += angle;
			const rad = Math.PI / 180;

			const x = cx + r * 2 * +Math.cos(startAngle * rad).toFixed(2);
			const y = cy + r * 2 * +Math.sin(startAngle * rad).toFixed(2);

			startAngle += angle;
			sectors.push({ x, y });
		}
	}
	return sectors;
};
