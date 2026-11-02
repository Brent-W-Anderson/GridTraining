export type QuickNavSection = {
	id: string
	title: string
}

export function getSectionElement(
	section: QuickNavSection,
) {
	return document.getElementById(
		section.id,
	)
}

export function getSectionTarget(
	section: HTMLElement,
) {
	if (
		section instanceof
		HTMLDetailsElement
	) {
		return (
			section.querySelector<HTMLElement>(
				':scope > summary',
			) ?? section
		)
	}

	return section
}

export function openSection(
	section: HTMLElement,
) {
	if (
		section instanceof
		HTMLDetailsElement
	) {
		section.open = true
	}
}

export function pulseElement(
	element: HTMLElement | null,
) {
	if (!element) {
		return
	}

	element.classList.remove(
		'quick-nav-focus-pulse',
	)

	void element.offsetWidth

	element.classList.add(
		'quick-nav-focus-pulse',
	)

	element.addEventListener(
		'animationend',
		() => {
			element.classList.remove(
				'quick-nav-focus-pulse',
			)
		},
		{
			once: true,
		},
	)
}