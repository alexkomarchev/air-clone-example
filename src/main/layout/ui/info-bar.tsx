import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'

import styles from '@/src/main/layout/styles/styles.module.css'
import { useAppSelector } from '@/src/main/store/store'
import { Balance } from '@/src/shared'
import { ModelPagesList } from '@/src/shared/lib/constants'
import { IProps } from '@/src/shared/lib/types/entities'
import { SelectUI } from '@/src/shared/ui/select'
import ArrowUpOrDown from '@/src/widgets/top-bar-model/ui/arrow-up-or-down'
import { NavigateTopBar } from '@/src/widgets/top-bar-model/ui/navigate-top-bar'

interface InfoBarProps extends IProps {
	title: string | React.ReactNode | null
}

type LangFull = 'Русский' | 'English'

type LangShort = 'ru' | 'en'

const languages: Record<LangFull, LangShort> = {
	Русский: 'ru',
	English: 'en',
}

type LangParam<T extends boolean> = T extends true ? LangFull : LangShort

type LangReturn<T extends boolean> = T extends true ? LangShort : LangFull

const convertLang = <T extends boolean>(toShort: T, lang: LangParam<T>): LangReturn<T> => {
	const arrLang = Object.entries(languages) as [LangFull, LangShort][]
	if (toShort) {
		return arrLang.find(([key]) => lang === key)![1] as LangReturn<T>
	}
	return arrLang.find(([_, value]) => lang === value)![0] as LangReturn<T>
}

const InfoBar: React.FC<InfoBarProps> = ({ title, device }) => {
	const theme = useAppSelector((state) => state.theme.theme)

	const balance = useAppSelector((state) => state.balance.balance)

	const [anchorElModel, setAnchorElModel] = React.useState<HTMLElement | null>(null)

	const desktop = device === 'desktop'

	const { status } = useSession()

	const [isModelPage, setIsModelPage] = React.useState(false)

	const { pathname, asPath, query, push, replace } = useRouter()

	React.useEffect(() => {
		Object.keys(ModelPagesList).forEach((el) => (el === pathname ? setIsModelPage(true) : null))
	}, [pathname])

	const { t, i18n } = useTranslation()

	const changeLanguage = async (newLang: LangShort) => {
		replace(pathname, pathname, { locale: newLang })
		await i18n.changeLanguage(newLang)
	}

	const closeMenuModel = () => setAnchorElModel(null)
	const openMenuModel = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorElModel(event.currentTarget)
	}
	const goToPayment = () => {
		Router.push('/account')
	}

	const LazyTutorial = dynamic(() => import('@/src/features/tutorial-gpt').then((component) => component.Tutorial))

	return (
		<Box className={styles.infoHeader}>
			<Box display='flex' alignItems='center'>
				<Typography sx={{ fontWeight: '500' }}>{title}</Typography>
				{isModelPage && (
					<>
						{desktop && (
							<span style={{ marginLeft: 1, cursor: 'pointer', marginTop: 3 }} onClick={openMenuModel}>
								<ArrowUpOrDown sx={{ color: '#BFBFBF' }} anchorElModel={anchorElModel} />
							</span>
						)}
						{desktop && <NavigateTopBar anchorEl={anchorElModel} closeMenu={closeMenuModel} />}
					</>
				)}
			</Box>

			<Box display='flex' alignItems='center'>
				{desktop && status === 'authenticated' && pathname === '/chatgpt' && <LazyTutorial />}
				{/*<SelectUI*/}
				{/*	list={Object.keys(languages)}*/}
				{/*	value={convertLang(false, i18n.language as LangShort)}*/}
				{/*	onChange={(e) => changeLanguage(convertLang(true, e.target.value as LangFull))}*/}
				{/*/>*/}
				<Stack
					direction='row'
					className='tutorial-balance'
					sx={{
						backgroundColor: theme === 'light' ? (desktop ? 'white' : 'transparent') : '#373737',
						marginRight: 1.2,
						padding: desktop ? '8px 15px' : '8px 0px',
						borderRadius: '10px',
						marginLeft: 3,
					}}
				>
					{status === 'authenticated' && (
						<>
							<Link href={'/account'}>
								<Balance balance={balance} />
							</Link>
							{desktop && (
								<Typography
									variant='body2'
									sx={{
										color: '#7F7DF3',
										lineHeight: '21px',
										fontSize: '15px',
										marginLeft: status === 'authenticated' ? 3 : 0,
										'&:hover': { cursor: 'pointer' },
									}}
									onClick={goToPayment}
								>
									Пополнить баланс
								</Typography>
							)}
						</>
					)}
				</Stack>
			</Box>
		</Box>
	)
}

export default InfoBar
