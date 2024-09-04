import type { Metadata } from 'next';
import { Bebas_Neue, PT_Sans } from 'next/font/google';
import './globals.css';

const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400' });
const ptSant = PT_Sans({ subsets: ['cyrillic'], weight: ['400', '700'] });

export const metadata: Metadata = {
	title: 'Тестовое задание | Киреев Кирилл',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='ru'>
			<body className={[bebas.className, ptSant.className].join(' ')}>
				{children}
			</body>
		</html>
	);
}
