import axios from 'axios'
import process from 'process'

export const axiosAuth = axios.create({
	baseURL: process.env.NEXT_PUBLIC_MAIN_URL,
})
