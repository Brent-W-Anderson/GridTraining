import { StrictMode, useEffect, useLayoutEffect, useRef, useState } from 'react'

import { createRoot } from 'react-dom/client'

import { HashRouter, NavLink, useLocation } from 'react-router-dom'

import { trainingConfig } from './assets/config/training'

import Scrollbar from './components/scrollbar/Scrollbar'

import Pages from './pages/Pages'

import { initializeTabScrollbar } from './tabs/tabs'

import './index.scss'
import './tabs/tabs.scss'
import './tabs/scrollbar.scss'

function TrainingApp() {
	const location = useLocation()

	const tabsRef = useRef<HTMLElement>(null)
	const titleRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const cleanup = initializeTabScrollbar()

		return cleanup
	}, [])

	useLayoutEffect(() => {
		const tabs = tabsRef.current
		const title = titleRef.current

		if (!tabs || !title) {
			return
		}

		const alignTitle = () => {
			const firstTab = tabs.querySelector<HTMLElement>('.tab')

			if (!firstTab) {
				return
			}

			const tabsRect = tabs.getBoundingClientRect()
			const firstTabRect = firstTab.getBoundingClientRect()

			const left = firstTabRect.left - tabsRect.left + tabs.scrollLeft

			title.style.paddingLeft = `${left}px`
		}

		alignTitle()

		const resizeObserver = new ResizeObserver(alignTitle)

		resizeObserver.observe(tabs)

		window.addEventListener('resize', alignTitle)

		return () => {
			resizeObserver.disconnect()
			window.removeEventListener('resize', alignTitle)
		}
	}, [])

	return (
		<>
			<header>
				<div className='top'>
					<div ref={titleRef} className='title'>
						{trainingConfig.appTitle}
					</div>

					<div className='tabs-wrap'>
						<nav
							ref={tabsRef}
							className='tabs'
							aria-label={trainingConfig.tabAriaLabel}>
							{trainingConfig.pages.map(page => (
								<NavLink
									key={page.id}
									to={page.path}
									end={page.path === '/'}
									className={({ isActive }) =>
										isActive ? 'tab active' : 'tab'
									}>
									{page.tabLabel}
								</NavLink>
							))}
						</nav>
					</div>
				</div>
			</header>

			<div className='viewer'>
				<div className='tab-scrollbar' aria-hidden='true'>
					<div className='tab-scrollbar-thumb' />
				</div>

				<RoutePage key={location.pathname} />
			</div>
		</>
	)
}

function RoutePage() {
	const pageRef = useRef<HTMLDivElement>(null)

	const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(
		null,
	)

	useEffect(() => {
		const page = pageRef.current

		if (!page) {
			return
		}

		page.scrollTop = 0
		setScrollContainer(page)
	}, [])

	return (
		<>
			<div
				ref={pageRef}
				className='training-page react-training-page active page-ready'>
				<Pages />
			</div>

			<Scrollbar scrollContainer={scrollContainer} />
		</>
	)
}

function App() {
	return (
		<HashRouter>
			<TrainingApp />
		</HashRouter>
	)
}

const root = document.getElementById('root')

if (!root) {
	throw new Error('Root element was not found.')
}

createRoot(root).render(
	<StrictMode>
		<App />
	</StrictMode>,
)
