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

import { LimitModal } from '@/src/features/change-limit'
import { InviteModal, ResponseGetPersons, RoleSelect } from '@/src/features/invite-person-in-business'
import { XMark } from '@/src/features/remove-person'
import { Search, Success, useShowData } from '@/src/shared'
import styles from '@/src/widgets/business-models/ui/models-list/models-list.module.scss'
import { getPersons } from '@/src/widgets/business-persons/api/get-persons'
import ArrowUpOrDown from '@/src/widgets/top-bar-model/ui/arrow-up-or-down'

import { translateEmailStatus } from '../../lib/lib'

export const PersonsList = () => {
	const [persons, setPersons] = useState<ResponseGetPersons[] | null>([])

	const [searchPersons, setSearchPersons] = useState<ResponseGetPersons[] | null>(persons)

	const [inviteModal, setInviteModal] = useState(false)

	const [currentPerson, setCurrentPerson] = useState<ResponseGetPersons | null>(null)

	const { data } = useSession()

	useEffect(() => {
		getPersons(data?.access).then((res) => setPersons(res ? res?.reverse() : null))
	}, [data?.access])

	const showNewPerson = (data: ResponseGetPersons) => {
		setShowPersons(true)
		setPersons((prev) => {
			if (prev !== null) {
				return [data, ...prev]
			}
			return [data]
		})

		showError('Пользователь успешно приглашен!')
	}

	const [search, setSearch] = useState('')

	const [showPersons, setShowPersons] = useState(true)

	const { error: message, showError } = useShowData()

	const updateLimit = (limit: string, email?: string) => {
		setPersons((prev) =>
			prev!.map((el) => {
				if (el.email === email) {
					el.token_limit = limit
					return el
				}

				return el
			})
		)
		setCurrentPerson(null)
		showError(`Лимит пользователя ${email} успешно изменён!`)
	}

	useEffect(() => {
		setSearchPersons((pre) => {
			if (!persons) {
				return null
			}

			if (search) {
				return persons?.filter((el) => el.email.includes(search))
			}
			return persons
		})
	}, [search])

	useEffect(() => {
		if (search === '') {
			setSearchPersons(persons)
		}
		setSearchPersons(persons)
	}, [persons])

	return (
		<Box className={styles.wrap}>
			<Box className={styles.title2}>
				<Box>
					<Typography className={styles.name}>Сотрудники </Typography>
					{persons?.length !== 0 && <Typography className={styles.count}>{persons?.length}</Typography>}
					<ArrowUpOrDown anchorElModel={showPersons} onClick={() => setShowPersons((prev) => !prev)} className={styles.arrow} />
				</Box>
				<Typography onClick={() => setInviteModal(true)}>Добавить сотрудника</Typography>
			</Box>
			{showPersons && (
				<Box className={styles.listWrap}>
					{persons?.length === 0 ? (
						<Box className={styles.zero_person}>
							<Typography>Добавьте первого сотрудника</Typography>
						</Box>
					) : (
						<>
							<Box className={styles.search}>
								<Search
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									fullWidth
									placeholder='Введите почту пользователя'
								/>
							</Box>
							<TableContainer className={styles.table} component={Paper}>
								<Table sx={{ minWidth: 650 }} aria-label='simple table'>
									<TableHead>
										<TableRow>
											<TableCell align='left'>Пользователь</TableCell>
											<TableCell align='center'>Роль</TableCell>
											<TableCell align='center'>Статус</TableCell>
											<TableCell align='center'>Лимит токенов</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{searchPersons?.map((person) => {
											return (
												<TableRow key={person.email} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
													<TableCell className={styles.tableEmail} align='left'>
														{person.email}
													</TableCell>
													<TableCell align='center'>{RoleSelect[person.account_type]}</TableCell>
													<TableCell align='center'>
														{translateEmailStatus(person.acceptance_status)}
													</TableCell>
													<TableCell
														onClick={() =>
															setCurrentPerson(persons?.find((el) => el.email === person.email) || null)
														}
														className={styles.tableLimit}
														align='center'
													>
														{Math.floor(+person.token_limit)}
														<span className={styles.change}>Изменить</span>
														<XMark
															setNewPersons={(persons) =>
																setPersons(
																	(prev) =>
																		prev?.filter((el) => el.email !== persons.email) || null
																)
															}
															email={person.email}
														/>
													</TableCell>
												</TableRow>
											)
										})}
									</TableBody>
								</Table>
							</TableContainer>
						</>
					)}
				</Box>
			)}
			<Success message={message} open={Boolean(message)} />
			<InviteModal open={inviteModal} onClose={() => setInviteModal(false)} showNewPersons={showNewPerson} />
			{currentPerson && <LimitModal person={currentPerson} onClose={() => setCurrentPerson(null)} updateLimitProp={updateLimit} />}
		</Box>
	)
}
