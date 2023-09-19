import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getBalance } from '../api/get-balance'
export const getUserBalance = createAsyncThunk('users/fetchByIdStatus', async (token: string | undefined | null) => {
	if (!token) {
		return 0
	}
	return await getBalance(token)
})

const initialState = {
	balance: 0,
}

export const balanceSlice = createSlice({
	name: 'balance',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getUserBalance.fulfilled, (state, action) => {
			state.balance = action.payload
		})
	},
})

export default balanceSlice.reducer
