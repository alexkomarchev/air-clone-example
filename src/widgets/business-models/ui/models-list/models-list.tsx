import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useSession } from 'next-auth/react'

import { AllowedModels, SwitchAccess } from '@/src/features/changeAccessToModel'
import { Search, translateTypeModel } from '@/src/shared'
import ArrowUpOrDown from '@/src/widgets/top-bar-model/ui/arrow-up-or-down'

import { getModels } from '../../api/get-models'

import styles from './models-list.module.scss'
export const ModelsList = () => {
	const [showModels, setShowModels] = useState(true)

	const [models, setModels] = useState<AllowedModels[]>([])

	const { data } = useSession()
	const updateAccess = (models: AllowedModels[]) => {
		setModels(models)
	}

	useEffect(() => {
		getModels(data?.access).then((res) => setModels(res))
	}, [data?.access])

	return (
		<Box className={styles.wrap}>
			<Box className={styles.title}>
				<Typography className={styles.name}>Нейросети</Typography>
				<Typography className={styles.count}>{models.length}</Typography>
				<ArrowUpOrDown anchorElModel={showModels} onClick={() => setShowModels((prev) => !prev)} className={styles.arrow} />
			</Box>

			{showModels && (
				<Box className={styles.listWrap}>
					{/*<Box className={styles.search}>*/}
					{/*	<Search fullWidth placeholder='Введите название или категорию программы'/>*/}
					{/*</Box>*/}
					<TableContainer className={styles.table} component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label='simple table'>
							<TableHead>
								<TableRow>
									<TableCell align='left'>Наименование</TableCell>
									<TableCell align='center'>Категория</TableCell>
									<TableCell align='center'>Доступ для сотрудников</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{models.map((model) => {
									return (
										<TableRow key={model.title} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
											<TableCell align='left'>{model.title}</TableCell>
											<TableCell align='center'>{translateTypeModel(model.model_type)}</TableCell>
											<TableCell className={styles.tableSwitch} align='center'>
												<Box>
													<SwitchAccess
														title={model.title}
														isAllowed={model.is_allowed}
														token={data?.access}
														updateAccessModels={updateAccess}
													/>
												</Box>
											</TableCell>
										</TableRow>
									)
								})}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			)}
		</Box>
	)
}
