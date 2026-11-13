import { useLayoutEffect, useRef } from 'react'

type DisclosureControlsProps = {
	container: HTMLElement | null
}

const STORAGE_PREFIX = 'gridtraining:disclosures:v1:'

function getStorageKey() {
	return `${STORAGE_PREFIX}${window.location.pathname}${window.location.hash.split('?')[0]}`
}

function readSavedState(key: string): Record<string, boolean> {
	try {
		const saved = localStorage.getItem(key)

		if (!saved) return {}

		const parsed: unknown = JSON.parse(saved)

		if (
			typeof parsed !== 'object' ||
			parsed === null ||
			Array.isArray(parsed)
		) {
			return {}
		}

		return Object.fromEntries(
			Object.entries(parsed).filter(
				(entry): entry is [string, boolean] =>
					typeof entry[1] === 'boolean',
			),
		)
	} catch {
		return {}
	}
}

function getDisclosures(container: HTMLElement) {
	return Array.from(
		container.querySelectorAll<HTMLDetailsElement>('details.section-card'),
	)
}

function saveState(container: HTMLElement, key: string) {
	const state: Record<string, boolean> = {}

	getDisclosures(container).forEach((details, index) => {
		state[details.id || `section-${index}`] = details.open
	})

	try {
		localStorage.setItem(key, JSON.stringify(state))
	} catch {
		// Disclosures remain usable when storage is unavailable.
	}
}

export default function DisclosureControls({
	container,
}: DisclosureControlsProps) {
	const controlsRef = useRef<HTMLDivElement>(null)
	const activeContainerRef = useRef<HTMLElement | null>(null)
	const storageKeyRef = useRef('')

	useLayoutEffect(() => {
		const current =
			container ?? controlsRef.current?.closest<HTMLElement>('main')

		if (!current) return

		const key = getStorageKey()
		const disclosures = getDisclosures(current)
		const savedState = readSavedState(key)

		activeContainerRef.current = current
		storageKeyRef.current = key

		disclosures.forEach((details, index) => {
			const id = details.id || `section-${index}`
			details.open = savedState[id] ?? true
		})

		const handleToggle = () => saveState(current, key)

		disclosures.forEach(details => {
			details.addEventListener('toggle', handleToggle)
		})

		return () => {
			disclosures.forEach(details => {
				details.removeEventListener('toggle', handleToggle)
			})

			activeContainerRef.current = null
		}
	}, [container])

	function setAllDisclosures(open: boolean) {
		const current = activeContainerRef.current

		if (!current) return

		getDisclosures(current).forEach(details => {
			details.open = open
		})

		saveState(current, storageKeyRef.current)
	}

	return (
		<div
			ref={controlsRef}
			className='page-disclosure-controls'
			aria-label='Section controls'>
			<button
				className='page-disclosure-button'
				type='button'
				onClick={() => setAllDisclosures(false)}>
				Collapse all
			</button>

			<button
				className='page-disclosure-button'
				type='button'
				onClick={() => setAllDisclosures(true)}>
				Expand all
			</button>
		</div>
	)
}
