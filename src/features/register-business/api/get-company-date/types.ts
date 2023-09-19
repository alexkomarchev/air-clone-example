export type CompanyData = {
	value: string
	unrestricted_value: string
	data: {
		kpp: string
		capital: null
		management: {
			name: string
			post: string
			disqualified: null
		}
		founders: null
		managers: null
		predecessors: null
		successors: null
		branch_type: string
		branch_count: number
		source: null
		qc: null
		hid: string
		type: string
		state: {
			status: string
			actuality_date: number
			registration_date: number
			liquidation_date: null
		}
		opf: {
			type: string
			code: string
			full: string
			short: string
		}
		name: {
			full_with_opf: string
			short_with_opf: string
			latin: null
			full: string
			short: string
		}
		inn: string
		ogrn: string
		okato: string
		oktmo: string
		okpo: string
		okogu: string
		okfs: string
		okved: string
		okveds: null
		authorities: null
		documents: null
		licenses: null
		finance: null
		phones: null
		emails: null
		ogrn_date: number
		okved_type: string
		employee_count: null
	}
}

export type DaDataResponse = {
	suggestions: CompanyData[]
}
