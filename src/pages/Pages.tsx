import { lazy, Suspense } from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

const Role = lazy(() => import('./role/Role'))

const Manual = lazy(() => import('./manual/Manual'))

const Cheat = lazy(() => import('./cheat/Cheat'))

const Troubleshooting = lazy(() => import('./troubleshooting/Troubleshooting'))

const Acronyms = lazy(() => import('./acronyms/Acronyms'))

const Inventory = lazy(() => import('./inventory/Inventory'))

export default function Pages() {
	return (
		<Suspense fallback={null}>
			<Routes>
				<Route path='/' element={<Role />} />

				<Route path='/manual' element={<Manual />} />

				<Route path='/cheat' element={<Cheat />} />

				<Route path='/troubleshooting' element={<Troubleshooting />} />

				<Route path='/acronyms' element={<Acronyms />} />

				<Route path='/inventory' element={<Inventory />} />

				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
		</Suspense>
	)
}
