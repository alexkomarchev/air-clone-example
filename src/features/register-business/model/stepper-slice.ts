import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { createAccount } from '@/src/features/register-business/api/create-account/create-account'
import { CompanyData } from '@/src/features/register-business/api/get-company-date/types'
import { loadingThunk, RootState } from '@/src/main/store/store'

import { getCompanyData } from '../api/get-company-date/get-company-date'
import { FieldActivity, Frequency } from '../lib/constants-step-information'

export type DataForCreate = {
	fieldActivity: FieldActivity
	frequency: Frequency
	numberStuff: number
	companyName: string | ''
	inn: string | ''
	ogrn: string | ''
	name: string
	email: string
	phone: string
	job_title: string
}

type StepperState = {
	activeStep: number
	loadingCreate: loadingThunk
	company: CompanyData[] | []
	dataForCreate: DataForCreate
}

const initialState: StepperState = {
	activeStep: 0,
	company: [],
	loadingCreate: 'idle',
	dataForCreate: {
		fieldActivity: 'IT',
		frequency: 'Часто',
		numberStuff: 1,
		companyName: '',
		inn: '',
		ogrn: '',
		name: '',
		email: '',
		phone: '',
		job_title: '',
	},
}
export const getDataCompany = createAsyncThunk('stepper/getDataCompany', async (prompt: string) => {
	return await getCompanyData(prompt)
})

export const createBusinessCompany = createAsyncThunk<unknown, string | null, { state: RootState }>(
	'stepper/createAccount',
	async (token: string | null, { getState }) => {
		const state = getState()
		return await createAccount(state.stepper.dataForCreate, token)
	}
)

export const stepperSlice = createSlice({
	name: 'stepperSlice',
	initialState,
	reducers: {
		switchNextStep(state) {
			state.activeStep++
		},
		switchPreviousStep(state) {
			state.activeStep--
		},
		switchStep(state, action: PayloadAction<number>) {
			state.activeStep = action.payload
		},
		setFieldActivity(state, action: PayloadAction<FieldActivity>) {
			state.dataForCreate.fieldActivity = action.payload
		},
		setFrequency(state, action: PayloadAction<Frequency>) {
			state.dataForCreate.frequency = action.payload
		},
		setNumberStuff(state, action: PayloadAction<number>) {
			state.dataForCreate.numberStuff = action.payload
		},
		setCompanyName(state, action: PayloadAction<string>) {
			state.dataForCreate.companyName = action.payload
		},
		setInn(state, action: PayloadAction<string>) {
			state.dataForCreate.inn = action.payload
		},
		setOgrn(state, action: PayloadAction<string>) {
			state.dataForCreate.ogrn = action.payload
		},
		setProcessCreate(state, action: PayloadAction<loadingThunk>) {
			state.loadingCreate = action.payload
		},
		setContact(state, action: PayloadAction<{ name: string; email: string; phone: string; job_title: string }>) {
			const { phone, email, name, job_title } = action.payload
			state.dataForCreate.phone = phone
			state.dataForCreate.email = email
			state.dataForCreate.name = name
			state.dataForCreate.job_title = job_title
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getDataCompany.fulfilled, (state, action) => {
			state.company = action.payload?.suggestions || []
		}),
			builder.addCase(createBusinessCompany.pending, (state) => {
				state.loadingCreate = 'pending'
			})
		builder.addCase(createBusinessCompany.fulfilled, (state) => {
			state.loadingCreate = 'succeeded'
		})
		builder.addCase(createBusinessCompany.rejected, (state) => {
			state.loadingCreate = 'failed'
		})
	},
})

export const {
	setProcessCreate,
	switchPreviousStep,
	switchNextStep,
	setFrequency,
	setFieldActivity,
	setNumberStuff,
	setInn,
	setCompanyName,
	setOgrn,
	setContact,
	switchStep,
} = stepperSlice.actions
