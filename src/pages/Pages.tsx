import { lazy, Suspense, useLayoutEffect, type ReactNode } from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

const Role = lazy(() => import('./role/Role'))

const Manual = lazy(() => import('./manual/Manual'))

const Cheat = lazy(() => import('./cheat/Cheat'))

const Troubleshooting = lazy(() => import('./troubleshooting/Troubleshooting'))

const Acronyms = lazy(() => import('./acronyms/Acronyms'))

const Inventory = lazy(() => import('./inventory/Inventory'))

type PagesProps = {
	onPageReady: () => void
}

type PageRouteProps = {
	children: ReactNode
	onReady: () => void
}

function PageRoute({ children, onReady }: PageRouteProps) {
	useLayoutEffect(() => {
		onReady()
	}, [onReady])

	return children
}

export default function Pages({ onPageReady }: PagesProps) {
	return (
		<Suspense fallback={null}>
			<Routes>
				<Route
					path='/'
					element={
						<PageRoute onReady={onPageReady}>
							<Role />
						</PageRoute>
					}
				/>

				<Route
					path='/manual'
					element={
						<PageRoute onReady={onPageReady}>
							<Manual />
						</PageRoute>
					}
				/>

				<Route
					path='/cheat'
					element={
						<PageRoute onReady={onPageReady}>
							<Cheat />
						</PageRoute>
					}
				/>

				<Route
					path='/troubleshooting'
					element={
						<PageRoute onReady={onPageReady}>
							<Troubleshooting />
						</PageRoute>
					}
				/>

				<Route
					path='/acronyms'
					element={
						<PageRoute onReady={onPageReady}>
							<Acronyms />
						</PageRoute>
					}
				/>

				<Route
					path='/inventory'
					element={
						<PageRoute onReady={onPageReady}>
							<Inventory />
						</PageRoute>
					}
				/>

				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
		</Suspense>
	)
}
