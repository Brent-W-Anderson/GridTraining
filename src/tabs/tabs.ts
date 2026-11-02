type TabScrollMetrics = {
	maxScroll: number
	thumbWidth: number
	travel: number
}

function getWheelPixels(
	event: WheelEvent,
	pageSize: number,
) {
	const rawDelta =
		Math.abs(event.deltaX) >
		Math.abs(event.deltaY)
			? event.deltaX
			: event.deltaY

	switch (event.deltaMode) {
		case WheelEvent.DOM_DELTA_LINE:
			return rawDelta * 40

		case WheelEvent.DOM_DELTA_PAGE:
			return rawDelta * pageSize

		default:
			return rawDelta
	}
}

export function initializeTabScrollbar() {
	const tabsElement =
		document.querySelector<HTMLElement>(
			'.tabs',
		)

	const scrollbarElement =
		document.querySelector<HTMLElement>(
			'.tab-scrollbar',
		)

	const thumbElement =
		document.querySelector<HTMLElement>(
			'.tab-scrollbar-thumb',
		)

	if (
		!tabsElement ||
		!scrollbarElement ||
		!thumbElement
	) {
		return
	}

	const tabs = tabsElement

	const scrollbar =
		scrollbarElement

	const thumb = thumbElement

	let dragging = false

	let dragPointerId:
		| number
		| null = null

	let pointerOffset = 0

	let dragMetrics:
		| TabScrollMetrics
		| null = null

	let dragTrackLeft = 0

	let updateFrame = 0

	let settleFrame = 0

	function getMetrics():
		TabScrollMetrics {
		const viewportWidth =
			tabs.clientWidth

		const contentWidth =
			tabs.scrollWidth

		const trackWidth =
			scrollbar.clientWidth

		const maxScroll =
			Math.max(
				0,
				contentWidth -
					viewportWidth,
			)

		if (
			maxScroll <= 0 ||
			trackWidth <= 0 ||
			contentWidth <= 0
		) {
			return {
				maxScroll: 0,
				thumbWidth:
					trackWidth,
				travel: 0,
			}
		}

		const proportionalWidth =
			(
				trackWidth *
				viewportWidth
			) /
			contentWidth

		const thumbWidth =
			Math.max(
				48,
				Math.min(
					trackWidth,
					proportionalWidth,
				),
			)

		return {
			maxScroll,
			thumbWidth,
			travel:
				Math.max(
					0,
					trackWidth -
						thumbWidth,
				),
		}
	}

	function getThumbLeft(
		metrics:
			TabScrollMetrics,
	) {
		if (
			metrics.maxScroll <= 0 ||
			metrics.travel <= 0
		) {
			return 0
		}

		const scrollLeft =
			Math.max(
				0,
				Math.min(
					metrics.maxScroll,
					tabs.scrollLeft,
				),
			)

		return (
			(scrollLeft /
				metrics.maxScroll) *
			metrics.travel
		)
	}

	function updateThumb() {
		updateFrame = 0

		const metrics =
			getMetrics()

		if (
			metrics.maxScroll <= 0 ||
			metrics.travel <= 0
		) {
			scrollbar.style.visibility =
				'hidden'

			scrollbar.classList.remove(
				'is-scrollable',
			)

			thumb.style.width =
				'0px'

			thumb.style.transform =
				'translateX(0px)'

			return
		}

		scrollbar.style.visibility =
			'visible'

		scrollbar.classList.add(
			'is-scrollable',
		)

		thumb.style.width =
			`${metrics.thumbWidth}px`

		thumb.style.transform =
			`translateX(${getThumbLeft(
				metrics,
			)}px)`
	}

	function scheduleThumbUpdate() {
		if (!updateFrame) {
			updateFrame =
				requestAnimationFrame(
					updateThumb,
				)
		}

		if (settleFrame) {
			cancelAnimationFrame(
				settleFrame,
			)
		}

		settleFrame =
			requestAnimationFrame(
				() => {
					settleFrame =
						requestAnimationFrame(
							() => {
								settleFrame = 0

								updateThumb()
							},
						)
				},
			)
	}

	function scrollFromPointer(
		clientX: number,
	) {
		if (
			!dragMetrics ||
			dragMetrics.travel <= 0 ||
			dragMetrics.maxScroll <= 0
		) {
			return
		}

		const requestedLeft =
			clientX -
			dragTrackLeft -
			pointerOffset

		const clampedLeft =
			Math.max(
				0,
				Math.min(
					dragMetrics.travel,
					requestedLeft,
				),
			)

		const progress =
			clampedLeft /
			dragMetrics.travel

		tabs.scrollLeft =
			progress *
			dragMetrics.maxScroll
	}

	function startDragging(
		event: PointerEvent,
	) {
		if (event.button !== 0) {
			return
		}

		const metrics =
			getMetrics()

		if (
			metrics.maxScroll <= 0 ||
			metrics.travel <= 0
		) {
			return
		}

		const trackRect =
			scrollbar.getBoundingClientRect()

		const thumbLeft =
			getThumbLeft(
				metrics,
			)

		dragging = true

		dragPointerId =
			event.pointerId

		dragMetrics =
			metrics

		dragTrackLeft =
			trackRect.left

		pointerOffset =
			event.clientX -
			dragTrackLeft -
			thumbLeft

		thumb.classList.add(
			'is-dragging',
		)

		document.documentElement
			.classList.add(
				'is-scroll-dragging',
			)

		thumb.setPointerCapture(
			event.pointerId,
		)

		event.preventDefault()
		event.stopPropagation()
	}

	function stopDragging(
		event?: PointerEvent,
	) {
		if (!dragging) {
			return
		}

		const pointerId =
			event?.pointerId ??
			dragPointerId

		dragging = false

		dragPointerId = null

		dragMetrics = null

		dragTrackLeft = 0

		pointerOffset = 0

		thumb.classList.remove(
			'is-dragging',
		)

		document.documentElement
			.classList.remove(
				'is-scroll-dragging',
			)

		if (
			pointerId !== null &&
			thumb.hasPointerCapture(
				pointerId,
			)
		) {
			thumb.releasePointerCapture(
				pointerId,
			)
		}

		scheduleThumbUpdate()
	}

	function handlePointerMove(
		event: PointerEvent,
	) {
		if (!dragging) {
			return
		}

		if (
			dragPointerId !== null &&
			event.pointerId !==
				dragPointerId
		) {
			return
		}

		scrollFromPointer(
			event.clientX,
		)

		event.preventDefault()
		event.stopPropagation()
	}

	function handleTrackPointerDown(
		event: PointerEvent,
	) {
		if (
			event.target === thumb ||
			event.button !== 0
		) {
			return
		}

		const metrics =
			getMetrics()

		if (
			metrics.maxScroll <= 0 ||
			metrics.travel <= 0
		) {
			return
		}

		const rect =
			scrollbar.getBoundingClientRect()

		const requestedLeft =
			event.clientX -
			rect.left -
			metrics.thumbWidth /
				2

		const clampedLeft =
			Math.max(
				0,
				Math.min(
					metrics.travel,
					requestedLeft,
				),
			)

		const progress =
			clampedLeft /
			metrics.travel

		tabs.scrollLeft =
			progress *
			metrics.maxScroll

		event.preventDefault()
	}

	function handleWheel(
		event: WheelEvent,
	) {
		const metrics =
			getMetrics()

		if (
			metrics.maxScroll <= 0
		) {
			return
		}

		const delta =
			getWheelPixels(
				event,
				tabs.clientWidth,
			)

		if (!delta) {
			return
		}

		const atStart =
			tabs.scrollLeft <= 0

		const atEnd =
			tabs.scrollLeft >=
				metrics.maxScroll

		if (
			(delta < 0 && atStart) ||
			(delta > 0 && atEnd)
		) {
			return
		}

		/*
		 * Directly update the real horizontal scroll
		 * position. This avoids repeatedly starting
		 * smooth programmatic scroll animations while
		 * the wheel is moving.
		 */
		tabs.scrollLeft += delta

		event.preventDefault()
	}

	function handleWindowBlur() {
		stopDragging()
	}
	thumb.addEventListener(
		'pointerdown',
		startDragging,
	)

	thumb.addEventListener(
		'pointermove',
		handlePointerMove,
	)

	thumb.addEventListener(
		'pointerup',
		stopDragging,
	)

	thumb.addEventListener(
		'pointercancel',
		stopDragging,
	)

	thumb.addEventListener(
		'lostpointercapture',
		handleWindowBlur,
	)

	scrollbar.addEventListener(
		'pointerdown',
		handleTrackPointerDown,
	)

	scrollbar.addEventListener(
		'wheel',
		handleWheel,
		{
			passive: false,
		},
	)

	tabs.addEventListener(
		'wheel',
		handleWheel,
		{
			passive: false,
		},
	)

	tabs.addEventListener(
		'scroll',
		scheduleThumbUpdate,
		{
			passive: true,
		},
	)

	window.addEventListener(
		'resize',
		scheduleThumbUpdate,
	)

	window.addEventListener(
		'blur',
		handleWindowBlur,
	)

	const resizeObserver =
		new ResizeObserver(
			scheduleThumbUpdate,
		)

	resizeObserver.observe(
		tabs,
	)

	const tabsWrap =
		document.querySelector<HTMLElement>(
			'.tabs-wrap',
		)

	if (tabsWrap) {
		resizeObserver.observe(
			tabsWrap,
		)
	}

	scheduleThumbUpdate()

	return () => {
		if (updateFrame) {
			cancelAnimationFrame(
				updateFrame,
			)
		}

		if (settleFrame) {
			cancelAnimationFrame(
				settleFrame,
			)
		}

		stopDragging()

		thumb.removeEventListener(
			'pointerdown',
			startDragging,
		)

		thumb.removeEventListener(
			'pointermove',
			handlePointerMove,
		)

		thumb.removeEventListener(
			'pointerup',
			stopDragging,
		)

		thumb.removeEventListener(
			'pointercancel',
			stopDragging,
		)

		thumb.removeEventListener(
			'lostpointercapture',
			handleWindowBlur,
		)

		scrollbar.removeEventListener(
			'pointerdown',
			handleTrackPointerDown,
		)

		scrollbar.removeEventListener(
			'wheel',
			handleWheel,
		)

		tabs.removeEventListener(
			'wheel',
			handleWheel,
		)

		tabs.removeEventListener(
			'scroll',
			scheduleThumbUpdate,
		)

		window.removeEventListener(
			'resize',
			scheduleThumbUpdate,
		)

		window.removeEventListener(
			'blur',
			handleWindowBlur,
		)

		resizeObserver.disconnect()
	}
}