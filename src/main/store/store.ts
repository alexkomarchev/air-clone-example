import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import { balanceSlice } from '@/src/entities/balance'
import { themeSlice } from '@/src/entities/theme'
import { userSlice } from '@/src/entities/user-account'
import { stepperSlice } from '@/src/features/register-business'
export const store = configureStore({
	reducer: {
		theme: themeSlice.reducer,
		balance: balanceSlice.reducer,
		stepper: stepperSlice.reducer,
		user: userSlice.reducer,
	},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type loadingThunk = 'idle' | 'pending' | 'succeeded' | 'failed'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
