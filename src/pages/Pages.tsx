import { Navigate, Route, Routes } from 'react-router-dom'

import Acronyms from './acronyms/Acronyms'
import Role from './role/Role'
import Distribution from './distribution/Distribution'
import Outside from './outside/Outside'
import Inside from './inside/Inside'
import Troubleshooting from './troubleshooting/Troubleshooting'
import Inventory from './inventory/Inventory'

export default function Pages() {
	return (
		<Routes>
			<Route path='/acronyms' element={<Acronyms />} />
			<Route path='/' element={<Role />} />
			<Route path='/distribution' element={<Distribution />} />
			<Route path='/outside' element={<Outside />} />
			<Route path='/inside' element={<Inside />} />
			<Route path='/troubleshooting' element={<Troubleshooting />} />
			<Route path='/inventory' element={<Inventory />} />
			<Route
				path='/manual'
				element={<Navigate to='/outside' replace />}
			/>
			<Route
				path='/cheat'
				element={<Navigate to='/troubleshooting' replace />}
			/>
			<Route path='*' element={<Navigate to='/' replace />} />
		</Routes>
	)
}
