import type {
	RefObject,
} from 'react'

type LayoutOptions = {
	navRef: RefObject<HTMLElement | null>
	scrollContainer: HTMLElement
	sectionCount: number
}

export function updateQuickNavLayout({
	navRef,
	scrollContainer,
	sectionCount,
}: LayoutOptions) {
	const nav = navRef.current

	const main =
		scrollContainer.querySelector<HTMLElement>(
			'main',
		)

	const scrollbar =
		scrollContainer.querySelector<HTMLElement>(
			'.custom-scrollbar',
		)

	const tabScrollbar =
		document.querySelector<HTMLElement>(
			'.tab-scrollbar',
		)

	if (!nav || !main) {
		return
	}

	const isPhone =
		window.innerWidth <= 760

	if (isPhone) {
		main.style.width = '100%'
		main.style.marginLeft = '0'
		main.style.marginRight = '0'

		if (scrollbar) {
			scrollbar.style.left = ''
			scrollbar.style.right = ''
		}

		nav.style.left = ''
		nav.style.top = ''
		nav.style.height = ''

		return
	}

	const containerRect =
		scrollContainer.getBoundingClientRect()

	const viewportWidth =
		document.documentElement.clientWidth

	const navWidth =
		Math.ceil(
			nav.getBoundingClientRect()
				.width,
		)

	const scrollbarWidth =
		scrollbar
			? Math.ceil(
					scrollbar.getBoundingClientRect()
						.width,
				)
			: 24

	const gap = 10
	const edgeGap = 4
	const maxContentWidth = 1120

	const wideContentLeft =
		Math.max(
			0,
			(
				viewportWidth -
				maxContentWidth
			) / 2,
		)

	const hasLeftMargin =
		wideContentLeft >=
		navWidth + gap

	const hasRightMargin =
		wideContentLeft >=
		scrollbarWidth + gap

	const contentLeft =
		hasLeftMargin
			? wideContentLeft
			: navWidth + gap

	const contentRight =
		hasRightMargin
			? wideContentLeft
			: scrollbarWidth + gap

	const contentWidth =
		Math.max(
			220,
			viewportWidth -
				contentLeft -
				contentRight,
		)

	main.style.width =
		Math.min(
			maxContentWidth,
			contentWidth,
		) + 'px'

	main.style.marginLeft =
		contentLeft + 'px'

	main.style.marginRight = '0'

	const mainRect =
		main.getBoundingClientRect()

	const navRect =
		nav.getBoundingClientRect()

	const firstButton =
		nav.querySelector<HTMLElement>(
			'.quick-nav-button',
		)

	const buttonRightOffset =
		firstButton
			? firstButton.getBoundingClientRect()
					.right -
				navRect.left
			: navWidth

	const navLeft =
		Math.max(
			edgeGap,
			mainRect.left -
				gap -
				buttonRightOffset,
		)

	nav.style.left =
		navLeft + 'px'

	if (scrollbar) {
		const scrollbarLeft =
			Math.min(
				viewportWidth -
					scrollbarWidth -
					edgeGap,
				mainRect.right +
					gap,
			)

		scrollbar.style.left =
			Math.max(
				edgeGap,
				scrollbarLeft,
			) + 'px'

		scrollbar.style.right =
			'auto'
	}

	let top =
		containerRect.top + 8

	if (
		tabScrollbar &&
		tabScrollbar.classList.contains(
			'is-scrollable',
		)
	) {
		const tabScrollbarRect =
			tabScrollbar.getBoundingClientRect()

		top =
			Math.max(
				top,
				tabScrollbarRect.bottom + 8,
			)
	}

	const availableHeight =
		Math.max(
			0,
			containerRect.bottom -
				top,
		)

	const baseButtonSize = 45
	const minButtonSize = 30
	const baseGap = 10

	const fullSizeNeeded =
		baseButtonSize *
			(sectionCount + 2) +
		baseGap *
			(sectionCount + 3)

	let buttonSize =
		baseButtonSize

	if (
		fullSizeNeeded >
			availableHeight &&
		sectionCount > 0
	) {
		const fittedSize =
			(
				availableHeight -
				baseGap *
					(sectionCount + 3)
			) /
			(sectionCount + 2)

		buttonSize =
			Math.max(
				minButtonSize,
				Math.min(
					baseButtonSize,
					fittedSize,
				),
			)
	}

	nav.style.top =
		top + 'px'

	nav.style.height =
		availableHeight + 'px'

	nav.style.setProperty(
		'--quick-nav-gap',
		baseGap + 'px',
	)

	nav.style.setProperty(
		'--quick-button-size',
		buttonSize + 'px',
	)
}