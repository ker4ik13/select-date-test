import styles from './Container.module.scss';

interface Props {
	children?: React.ReactNode;
	className?: string;
}

export const Container = ({ children, className }: Props) => {
	return (
		<div className={[styles.container, className].join(' ')}>{children}</div>
	);
};
