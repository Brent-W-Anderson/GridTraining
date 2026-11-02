import {
	StrictMode,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react'

import { createRoot } from 'react-dom/client'

import { BrowserRouter, NavLink, useLocation } from 'react-router-dom'

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

		/*
		 * Run the initial alignment during React's
		 * layout phase so the browser never paints
		 * the title at its unmeasured position.
		 */
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

	const readyFrameRef = useRef<number | null>(null)

	const settleFrameRef = useRef<number | null>(null)

	const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(
		null,
	)

	const [pageReady, setPageReady] = useState(false)

	const cancelReadyFrames = useCallback(() => {
		if (readyFrameRef.current !== null) {
			cancelAnimationFrame(readyFrameRef.current)

			readyFrameRef.current = null
		}

		if (settleFrameRef.current !== null) {
			cancelAnimationFrame(settleFrameRef.current)

			settleFrameRef.current = null
		}
	}, [])

	const handlePageReady = useCallback(() => {
		cancelReadyFrames()

		/*
		 * Keep the routed page hidden while its
		 * page effects, QuickNav, content width,
		 * and scrollbar geometry initialize.
		 *
		 * The first frame lets React/effects
		 * establish their DOM-dependent state.
		 *
		 * The second frame lets ResizeObserver
		 * and the resulting layout measurements
		 * settle before anything becomes visible.
		 */
		readyFrameRef.current = requestAnimationFrame(() => {
			readyFrameRef.current = null

			settleFrameRef.current = requestAnimationFrame(() => {
				settleFrameRef.current = null

				setPageReady(true)
			})
		})
	}, [cancelReadyFrames])

	useEffect(() => {
		const page = pageRef.current

		if (!page) {
			return
		}

		page.scrollTop = 0

		setScrollContainer(page)

		return cancelReadyFrames
	}, [cancelReadyFrames])

	return (
		<>
			<div
				ref={pageRef}
				className={
					pageReady
						? 'training-page react-training-page active page-ready'
						: 'training-page react-training-page active'
				}>
				<Pages onPageReady={handlePageReady} />
			</div>

			<Scrollbar scrollContainer={scrollContainer} />
		</>
	)
}

function App() {
	return (
		<BrowserRouter>
			<TrainingApp />
		</BrowserRouter>
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
