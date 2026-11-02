import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type FocusEvent,
	type MouseEvent,
} from 'react'

import {
	getSectionElement,
	getSectionTarget,
	openSection,
	pulseElement,
	type QuickNavSection,
} from './navigation'

import { updateQuickNavLayout } from './quickNavLayout'

export type { QuickNavSection } from './navigation'

type QuickNavProps = {
	sections: readonly QuickNavSection[]
	scrollContainer: HTMLElement | null
}

type Tooltip = {
	text: string
	left: number
	top: number
}

export default function QuickNav({ sections, scrollContainer }: QuickNavProps) {
	const navRef = useRef<HTMLElement>(null)

	const pinnedIndex = useRef<number | null>(null)

	const [activeIndex, setActiveIndex] = useState(0)

	const [tooltip, setTooltip] = useState<Tooltip | null>(null)

	const updateLayout = useCallback(() => {
		if (!scrollContainer) {
			return
		}

		setTooltip(null)

		updateQuickNavLayout({
			navRef,
			scrollContainer,
			sectionCount: sections.length,
		})
	}, [scrollContainer, sections.length])

	const updateActiveSection = useCallback(() => {
		if (!scrollContainer || !sections.length) {
			return
		}

		if (pinnedIndex.current !== null) {
			setActiveIndex(pinnedIndex.current)

			return
		}

		const maxScroll = Math.max(
			0,
			scrollContainer.scrollHeight - scrollContainer.clientHeight,
		)

		if (maxScroll > 2 && scrollContainer.scrollTop >= maxScroll - 2) {
			setActiveIndex(sections.length - 1)

			return
		}

		const marker = scrollContainer.getBoundingClientRect().top + 28

		let nextActive = 0

		sections.forEach((section, index) => {
			const element = getSectionElement(section)

			if (
				element &&
				getSectionTarget(element).getBoundingClientRect().top <= marker
			) {
				nextActive = index
			}
		})

		setActiveIndex(nextActive)
	}, [scrollContainer, sections])

	const releasePinned = useCallback(() => {
		pinnedIndex.current = null

		requestAnimationFrame(updateActiveSection)
	}, [updateActiveSection])

	useEffect(() => {
		if (!scrollContainer) {
			return
		}

		const container = scrollContainer

		const resizeObserver = new ResizeObserver(updateLayout)

		const handleKeyDown = (event: KeyboardEvent) => {
			if (
				[
					'ArrowUp',
					'ArrowDown',
					'PageUp',
					'PageDown',
					'Home',
					'End',
					' ',
				].includes(event.key)
			) {
				releasePinned()
			}
		}

		const handleToggle = () => requestAnimationFrame(updateActiveSection)

		updateLayout()

		requestAnimationFrame(updateActiveSection)

		resizeObserver.observe(container)

		container.addEventListener('scroll', updateActiveSection, {
			passive: true,
		})

		container.addEventListener('wheel', releasePinned, {
			passive: true,
		})

		container.addEventListener('touchstart', releasePinned, {
			passive: true,
		})

		window.addEventListener('resize', updateLayout)

		window.addEventListener('manual-scroll-start', releasePinned)

		window.addEventListener('keydown', handleKeyDown)

		sections.forEach(section => {
			const element = getSectionElement(section)

			if (element instanceof HTMLDetailsElement) {
				element.addEventListener('toggle', handleToggle)
			}
		})

		return () => {
			resizeObserver.disconnect()

			container.removeEventListener('scroll', updateActiveSection)

			container.removeEventListener('wheel', releasePinned)

			container.removeEventListener('touchstart', releasePinned)

			window.removeEventListener('resize', updateLayout)

			window.removeEventListener('manual-scroll-start', releasePinned)

			window.removeEventListener('keydown', handleKeyDown)

			sections.forEach(section => {
				const element = getSectionElement(section)

				if (element instanceof HTMLDetailsElement) {
					element.removeEventListener('toggle', handleToggle)
				}
			})
		}
	}, [
		releasePinned,
		scrollContainer,
		sections,
		updateActiveSection,
		updateLayout,
	])

	function showTooltip(
		event: MouseEvent<HTMLButtonElement> | FocusEvent<HTMLButtonElement>,
		text: string,
	) {
		const rect = event.currentTarget.getBoundingClientRect()

		setTooltip({
			text,
			left: rect.right + 10,
			top: rect.top + rect.height / 2,
		})
	}

	function scrollToSection(index: number) {
		if (!scrollContainer) {
			return
		}

		const section = sections[index]

		const element = section ? getSectionElement(section) : null

		if (!element) {
			return
		}

		setTooltip(null)

		pinnedIndex.current = index

		setActiveIndex(index)

		openSection(element)

		requestAnimationFrame(() => {
			const target = getSectionTarget(element)

			const containerTop = scrollContainer.getBoundingClientRect().top

			const top =
				scrollContainer.scrollTop +
				target.getBoundingClientRect().top -
				containerTop -
				14

			scrollContainer.scrollTo({
				top: Math.max(0, top),
				behavior: 'smooth',
			})

			pulseElement(target)
		})
	}

	function scrollToEdge(edge: 'top' | 'bottom') {
		if (!scrollContainer || !sections.length) {
			return
		}

		setTooltip(null)

		const index = edge === 'top' ? 0 : sections.length - 1

		pinnedIndex.current = index

		setActiveIndex(index)

		scrollContainer.scrollTo({
			top: edge === 'top' ? 0 : scrollContainer.scrollHeight,
			behavior: 'smooth',
		})

		const element = getSectionElement(sections[index])

		pulseElement(
			edge === 'top'
				? scrollContainer.querySelector<HTMLElement>('h1')
				: element,
		)
	}

	if (!sections.length) {
		return null
	}

	return (
		<>
			<nav
				ref={navRef}
				className='quick-nav'
				aria-label='Quick section navigation'>
				<div className='quick-nav-scroll'>
					<button
						type='button'
						className='quick-nav-button quick-nav-edge quick-nav-top'
						aria-label='Jump to top of page'
						onClick={() => scrollToEdge('top')}
						onMouseEnter={event =>
							showTooltip(event, 'Top of page')
						}
						onMouseLeave={() => setTooltip(null)}
						onFocus={event => showTooltip(event, 'Top of page')}
						onBlur={() => setTooltip(null)}
					/>

					{sections.map((section, index) => (
						<button
							key={section.id}
							type='button'
							className={
								index === activeIndex
									? 'quick-nav-button quick-nav-section active'
									: 'quick-nav-button quick-nav-section'
							}
							aria-label={`Go to section ${index + 1}: ${section.title}`}
							aria-current={
								index === activeIndex ? 'true' : 'false'
							}
							onClick={() => scrollToSection(index)}
							onMouseEnter={event =>
								showTooltip(event, section.title)
							}
							onMouseLeave={() => setTooltip(null)}
							onFocus={event => showTooltip(event, section.title)}
							onBlur={() => setTooltip(null)}>
							{index + 1}
						</button>
					))}

					<button
						type='button'
						className='quick-nav-button quick-nav-edge quick-nav-bottom'
						aria-label='Jump to bottom of page'
						onClick={() => scrollToEdge('bottom')}
						onMouseEnter={event =>
							showTooltip(event, 'Bottom of page')
						}
						onMouseLeave={() => setTooltip(null)}
						onFocus={event => showTooltip(event, 'Bottom of page')}
						onBlur={() => setTooltip(null)}
					/>
				</div>
			</nav>

			{tooltip && (
				<div
					className='quick-nav-tooltip visible'
					role='tooltip'
					style={{
						left: tooltip.left,
						top: tooltip.top,
					}}>
					{tooltip.text}
				</div>
			)}
		</>
	)
}
