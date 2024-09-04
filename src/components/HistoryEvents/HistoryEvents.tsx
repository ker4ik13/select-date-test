'use client';

import { ArrowIcon } from '@/shared/icons';
import type { IHistoryDate } from '@/shared/types';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Container } from '../Container/Container';
import styles from './HistoryEvents.module.scss';

interface Props {
	data: IHistoryDate;
	className?: string;
}

export const HistoryEvents = ({ data, className }: Props) => {
	const [visible, setVisible] = useState(true);
	const swiper = useSwiper();

	useEffect(() => {
		setVisible(false);

		const timeout = setTimeout(() => setVisible(true), 300);

		return () => clearTimeout(timeout);
	}, [data.id]);

	return (
		<div
			className={[
				styles.historyEventsBlock,
				!visible ? styles.hidden : '',
				className,
			].join(' ')}
		>
			<Container className={styles.container}>
				<button
					type='button'
					className={[styles.button, styles.prevButton].join(' ')}
					onClick={() => swiper && swiper.slidePrev()}
				>
					<ArrowIcon className={styles.arrow} />
				</button>
				<Swiper
					wrapperClass={styles.swiperWrapper}
					className={styles.swiper}
					direction='horizontal'
					slidesPerGroup={1}
					breakpoints={{
						100: {
							spaceBetween: 25,
							slidesPerView: 'auto',
						},
						768: {
							spaceBetween: 40,
							slidesPerView: 2,
						},
						1024: {
							spaceBetween: 80,
							slidesPerView: 3,
						},
					}}
					allowTouchMove={true}
					modules={[Navigation, Pagination]}
					pagination={{
						bulletActiveClass: styles.activeBullet,
						horizontalClass: styles.pagination,
						clickable: true,
						enabled: typeof window !== 'undefined' && window.innerWidth <= 768,
					}}
					navigation={{
						prevEl: `.${styles.prevButton}`,
						nextEl: `.${styles.nextButton}`,
						enabled: true,
					}}
				>
					{data.events.map((event, index) => (
						<SwiperSlide className={styles.historyEvent} key={index}>
							<p className={styles.eventDate}>{event.year}</p>
							<p className={styles.eventText}>{event.content}</p>
						</SwiperSlide>
					))}
				</Swiper>
				<button
					type='button'
					className={[styles.button, styles.nextButton].join(' ')}
					onClick={() => swiper && swiper.slideNext()}
				>
					<ArrowIcon className={styles.arrow} />
				</button>
			</Container>
		</div>
	);
};
