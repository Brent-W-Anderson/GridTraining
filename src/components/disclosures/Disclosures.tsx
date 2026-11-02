type DisclosureControlsProps = {
	container: HTMLElement | null
}

export default function DisclosureControls({
	container,
}: DisclosureControlsProps) {
	function setAllDisclosures(open: boolean) {
		if (!container) {
			return
		}

		container
			.querySelectorAll<HTMLDetailsElement>('details.section-card')
			.forEach(details => {
				details.open = open
			})
	}

	return (
		<div className='page-disclosure-controls' aria-label='Section controls'>
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
