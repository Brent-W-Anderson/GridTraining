import { useEffect, useRef } from 'react'

type ScrollbarProps = {
	scrollContainer: HTMLElement | null
}

type ScrollMetrics = {
	maxScroll: number
	thumbHeight: number
	travel: number
}

function getWheelPixels(event: WheelEvent, pageSize: number) {
	const rawDelta =
		Math.abs(event.deltaY) >= Math.abs(event.deltaX)
			? event.deltaY
			: event.deltaX

	switch (event.deltaMode) {
		case WheelEvent.DOM_DELTA_LINE:
			return rawDelta * 40

		case WheelEvent.DOM_DELTA_PAGE:
			return rawDelta * pageSize

		default:
			return rawDelta
	}
}

export default function Scrollbar({ scrollContainer }: ScrollbarProps) {
	const scrollbarRef = useRef<HTMLDivElement>(null)

	const thumbRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const scrollbarElement = scrollbarRef.current

		const thumbElement = thumbRef.current

		if (!scrollContainer || !scrollbarElement || !thumbElement) {
			return
		}

		const container = scrollContainer

		const scrollbar = scrollbarElement

		const thumb = thumbElement

		const tabScrollbar =
			document.querySelector<HTMLElement>('.tab-scrollbar')

		let dragging = false

		let dragPointerId: number | null = null

		let pointerOffset = 0

		let dragMetrics: ScrollMetrics | null = null

		let dragTrackTop = 0

		let updateFrame = 0

		function getTopOffset() {
			const containerRect = container.getBoundingClientRect()

			let top = Math.max(8, containerRect.top + 8)

			if (
				tabScrollbar &&
				tabScrollbar.classList.contains('is-scrollable')
			) {
				const tabScrollbarRect = tabScrollbar.getBoundingClientRect()

				top = Math.max(top, tabScrollbarRect.bottom + 8)
			}

			return top
		}

		function getMetrics(): ScrollMetrics {
			const viewportHeight = container.clientHeight

			const trackHeight = scrollbar.clientHeight

			const contentHeight = container.scrollHeight

			const maxScroll = Math.max(0, contentHeight - viewportHeight)

			if (maxScroll <= 0 || trackHeight <= 0 || contentHeight <= 0) {
				return {
					maxScroll: 0,
					thumbHeight: trackHeight,
					travel: 0,
				}
			}

			const proportionalHeight =
				(trackHeight * viewportHeight) / contentHeight

			const thumbHeight = Math.max(
				48,
				Math.min(trackHeight, proportionalHeight),
			)

			return {
				maxScroll,
				thumbHeight,
				travel: Math.max(0, trackHeight - thumbHeight),
			}
		}

		function getThumbTop(metrics: ScrollMetrics) {
			if (metrics.maxScroll <= 0 || metrics.travel <= 0) {
				return 0
			}

			const scrollTop = Math.max(
				0,
				Math.min(metrics.maxScroll, container.scrollTop),
			)

			return (scrollTop / metrics.maxScroll) * metrics.travel
		}

		function updateThumb() {
			updateFrame = 0

			scrollbar.style.setProperty(
				'--content-scrollbar-top',
				`${getTopOffset()}px`,
			)

			const metrics = getMetrics()

			if (metrics.maxScroll <= 0 || metrics.travel <= 0) {
				scrollbar.style.visibility = 'hidden'

				thumb.style.height = '0px'

				thumb.style.transform = 'translateY(0px)'

				return
			}

			scrollbar.style.visibility = 'visible'

			thumb.style.height = `${metrics.thumbHeight}px`

			thumb.style.transform = `translateY(${getThumbTop(metrics)}px)`
		}

		function scheduleThumbUpdate() {
			if (updateFrame) {
				return
			}

			updateFrame = requestAnimationFrame(updateThumb)
		}

		function dispatchManualScroll() {
			window.dispatchEvent(new Event('manual-scroll-start'))
		}

		function scrollFromPointer(clientY: number) {
			if (
				!dragMetrics ||
				dragMetrics.travel <= 0 ||
				dragMetrics.maxScroll <= 0
			) {
				return
			}

			const requestedTop = clientY - dragTrackTop - pointerOffset

			const clampedTop = Math.max(
				0,
				Math.min(dragMetrics.travel, requestedTop),
			)

			container.scrollTop =
				(clampedTop / dragMetrics.travel) * dragMetrics.maxScroll
		}

		function startDragging(event: PointerEvent) {
			if (event.button !== 0) {
				return
			}

			const metrics = getMetrics()

			if (metrics.maxScroll <= 0 || metrics.travel <= 0) {
				return
			}

			dispatchManualScroll()

			const trackRect = scrollbar.getBoundingClientRect()

			dragging = true

			dragPointerId = event.pointerId

			dragMetrics = metrics

			dragTrackTop = trackRect.top

			pointerOffset = event.clientY - dragTrackTop - getThumbTop(metrics)

			thumb.classList.add('dragging')

			document.documentElement.classList.add('scrollbar-dragging')

			thumb.setPointerCapture(event.pointerId)

			event.preventDefault()
			event.stopPropagation()
		}

		function stopDragging(event?: PointerEvent) {
			if (!dragging) {
				return
			}

			const pointerId = event?.pointerId ?? dragPointerId

			dragging = false

			dragPointerId = null

			dragMetrics = null

			dragTrackTop = 0

			pointerOffset = 0

			thumb.classList.remove('dragging')

			document.documentElement.classList.remove('scrollbar-dragging')

			if (pointerId !== null && thumb.hasPointerCapture(pointerId)) {
				thumb.releasePointerCapture(pointerId)
			}

			scheduleThumbUpdate()
		}

		function handlePointerMove(event: PointerEvent) {
			if (
				!dragging ||
				(dragPointerId !== null && event.pointerId !== dragPointerId)
			) {
				return
			}

			scrollFromPointer(event.clientY)

			event.preventDefault()
			event.stopPropagation()
		}

		function handleTrackPointerDown(event: PointerEvent) {
			if (event.target === thumb || event.button !== 0) {
				return
			}

			const metrics = getMetrics()

			if (metrics.maxScroll <= 0 || metrics.travel <= 0) {
				return
			}

			dispatchManualScroll()

			const rect = scrollbar.getBoundingClientRect()

			const requestedTop =
				event.clientY - rect.top - metrics.thumbHeight / 2

			const clampedTop = Math.max(
				0,
				Math.min(metrics.travel, requestedTop),
			)

			container.scrollTop =
				(clampedTop / metrics.travel) * metrics.maxScroll

			event.preventDefault()
		}

		function handleWheel(event: WheelEvent) {
			const metrics = getMetrics()

			if (metrics.maxScroll <= 0) {
				return
			}

			const delta = getWheelPixels(event, container.clientHeight)

			if (!delta) {
				return
			}

			const atStart = container.scrollTop <= 0

			const atEnd = container.scrollTop >= metrics.maxScroll

			if ((delta < 0 && atStart) || (delta > 0 && atEnd)) {
				return
			}

			dispatchManualScroll()

			/*
			 * Move the real scroll position directly.
			 *
			 * Do not use scrollBy({ behavior: 'auto' })
			 * here. "auto" can inherit CSS scroll-behavior
			 * and turn each wheel event into another smooth
			 * animation.
			 */
			container.scrollTop += delta

			event.preventDefault()
		}

		function handleWindowBlur() {
			stopDragging()
		}

		thumb.addEventListener('pointerdown', startDragging)

		thumb.addEventListener('pointermove', handlePointerMove)

		thumb.addEventListener('pointerup', stopDragging)

		thumb.addEventListener('pointercancel', stopDragging)

		scrollbar.addEventListener('pointerdown', handleTrackPointerDown)

		scrollbar.addEventListener('wheel', handleWheel, {
			passive: false,
		})

		container.addEventListener('scroll', scheduleThumbUpdate, {
			passive: true,
		})

		window.addEventListener('resize', scheduleThumbUpdate)

		window.addEventListener('blur', handleWindowBlur)

		const resizeObserver = new ResizeObserver(scheduleThumbUpdate)

		resizeObserver.observe(container)

		let observedMain: Element | null = null

		function observeMain() {
			const main = container.querySelector('main')

			if (!main || main === observedMain) {
				return
			}

			if (observedMain) {
				resizeObserver.unobserve(observedMain)
			}

			observedMain = main

			resizeObserver.observe(main)
		}

		observeMain()

		const contentObserver = new MutationObserver(() => {
			observeMain()

			scheduleThumbUpdate()
		})

		contentObserver.observe(container, {
			childList: true,
			subtree: true,
		})

		let tabScrollbarObserver: MutationObserver | null = null

		if (tabScrollbar) {
			tabScrollbarObserver = new MutationObserver(scheduleThumbUpdate)

			tabScrollbarObserver.observe(tabScrollbar, {
				attributes: true,
				attributeFilter: ['class', 'style'],
			})
		}

		function observeImage(image: HTMLImageElement) {
			if (image.complete) {
				return
			}

			image.addEventListener('load', scheduleThumbUpdate, {
				once: true,
			})

			image.addEventListener('error', scheduleThumbUpdate, {
				once: true,
			})
		}

		container
			.querySelectorAll<HTMLImageElement>('img')
			.forEach(observeImage)

		const imageObserver = new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				mutation.addedNodes.forEach(node => {
					if (!(node instanceof Element)) {
						return
					}

					if (node instanceof HTMLImageElement) {
						observeImage(node)
					}

					node.querySelectorAll<HTMLImageElement>('img').forEach(
						observeImage,
					)
				})
			})
		})

		imageObserver.observe(container, {
			childList: true,
			subtree: true,
		})

		scheduleThumbUpdate()

		return () => {
			if (updateFrame) {
				cancelAnimationFrame(updateFrame)
			}

			stopDragging()

			thumb.removeEventListener('pointerdown', startDragging)

			thumb.removeEventListener('pointermove', handlePointerMove)

			thumb.removeEventListener('pointerup', stopDragging)

			thumb.removeEventListener('pointercancel', stopDragging)

			scrollbar.removeEventListener('pointerdown', handleTrackPointerDown)

			scrollbar.removeEventListener('wheel', handleWheel)

			container.removeEventListener('scroll', scheduleThumbUpdate)

			window.removeEventListener('resize', scheduleThumbUpdate)

			window.removeEventListener('blur', handleWindowBlur)

			resizeObserver.disconnect()

			contentObserver.disconnect()

			imageObserver.disconnect()

			tabScrollbarObserver?.disconnect()
		}
	}, [scrollContainer])

	return (
		<div ref={scrollbarRef} className='custom-scrollbar' aria-hidden='true'>
			<div ref={thumbRef} className='custom-scrollbar-thumb' />
		</div>
	)
}
