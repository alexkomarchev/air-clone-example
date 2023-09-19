import { createSlice } from '@reduxjs/toolkit'

export interface Theme {
	theme: 'light' | 'dark'
}

const initialState: Theme = {
	theme: 'dark',
}

export const themeSlice = createSlice({
	name: 'themeSlice',
	initialState,
	reducers: {
		change: (state, action) => {
			if (action.payload) {
				state.theme = action.payload
				localStorage.setItem('theme', state.theme)
				return
			}
			state.theme = state.theme === 'dark' ? 'light' : 'dark'
			localStorage.setItem('theme', state.theme)
		},
	},
})

export const { change } = themeSlice.actions

export default themeSlice.reducer
