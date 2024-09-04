'use client';

import { calculateCoordinate } from '@/helpers';
import { ArrowIcon } from '@/shared/icons';
import { IHistoryDates } from '@/shared/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useCallback, useRef, useState } from 'react';
import { Container } from '../Container/Container';
import { HistoryEvents } from '../HistoryEvents/HistoryEvents';
import styles from './HistoryDates.module.scss';

interface Props {
	data: IHistoryDates;
}

export const HistoryDates = ({ data }: Props) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [prevActiveIndex, setPrevActiveIndex] = useState(0);
	const startYearRef = useRef<HTMLParagraphElement | null>(null);
	const endYearRef = useRef<HTMLParagraphElement | null>(null);
	const ellipseRef = useRef<HTMLDivElement | null>(null);

	const coordinates = useCallback(() => {
		return calculateCoordinate(
			data.dates.length,
			266,
			260,
			260,
			6,
			-60 * (activeIndex + 1),
		);
	}, [activeIndex]);

	useGSAP(() => {
		gsap.from(startYearRef.current, {
			textContent: data.dates[prevActiveIndex].startYear,
			duration: 0.3,
			ease: 'power1',
			snap: {
				textContent: 1,
			},
		});
		gsap.from(endYearRef.current, {
			textContent: data.dates[prevActiveIndex].endYear,
			duration: 0.3,
			ease: 'power1',
			snap: {
				textContent: 1,
			},
		});
	}, [activeIndex]);

	const handleDate = (index: number) => {
		setPrevActiveIndex(activeIndex);
		setActiveIndex(index);
	};

	return (
		<div className={styles.historyBlock}>
			<Container className={styles.container}>
				<h2 className={styles.title}>{data.title}</h2>
				<div className={styles.center}>
					<div className={styles.date}>
						<p className={styles.startYear} ref={startYearRef}>
							{data.dates[activeIndex].startYear}
						</p>
						<p className={styles.endYear} ref={endYearRef}>
							{data.dates[activeIndex].endYear}
						</p>
					</div>
					<div className={styles.ellipse} ref={ellipseRef}>
						{data.dates.map((date, index) => (
							<button
								type='button'
								key={date.id}
								className={[
									styles.ellipseItem,
									activeIndex === index && styles.ellipseItemActive,
								].join(' ')}
								onClick={() => handleDate(index)}
								style={{
									left: `${coordinates()[index].x}px`,
									top: `${coordinates()[index].y}px`,
								}}
							>
								<div className={styles.ellipseDot}></div>
								<p className={styles.ellipseItemIndex}>{index + 1}</p>
								<p className={styles.ellipseItemLabel}>{date.label}</p>
							</button>
						))}
					</div>
					<p className={styles.lowerLabel}>{data.dates[activeIndex].label}</p>
				</div>
				<div className={styles.arrowsAndDate}>
					<p className={styles.activeIndex}>{`${(activeIndex + 1)
						.toString()
						.padStart(2, '0')}/${data.dates.length
						.toString()
						.padStart(2, '0')}`}</p>
					<div className={styles.arrows}>
						<button
							className={styles.arrowButton}
							onClick={() => activeIndex > 0 && handleDate(activeIndex - 1)}
							disabled={activeIndex === 0}
						>
							<ArrowIcon
								className={[styles.arrowIcon, styles.arrowIconPrev].join(' ')}
							/>
						</button>
						<button
							className={styles.arrowButton}
							onClick={() =>
								activeIndex < data.dates.length && handleDate(activeIndex + 1)
							}
							disabled={activeIndex === data.dates.length - 1}
						>
							<ArrowIcon
								className={[styles.arrowIcon, styles.arrowIconNext].join(' ')}
							/>
						</button>
					</div>
				</div>
				<HistoryEvents
					className={styles.events}
					data={data.dates[activeIndex]}
				/>
			</Container>
		</div>
	);
};
