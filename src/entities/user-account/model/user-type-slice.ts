import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { loadingThunk } from '@/src/main/store/store'

import { getAccountType } from '../api/get-account-type'
import { AccountType } from '../model/types'

type UserState = {
	status: loadingThunk
	type: AccountType | null
}

const initialState: UserState = {
	status: 'idle',
	type: null,
}

export const getUserType = createAsyncThunk('user/getUserType', async (token: string | null | undefined) => {
	return await getAccountType(token)
})

export const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getUserType.fulfilled, (state, action) => {
			state.status = 'succeeded'
			state.type = action.payload
		}),
			builder.addCase(getUserType.pending, (state) => {
				state.status = 'pending'
			})
		builder.addCase(getUserType.rejected, (state) => {
			state.status = 'failed'
		})
	},
})

export const {} = userSlice.actions
