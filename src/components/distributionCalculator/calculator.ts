export type LegInput = {
	id: number
	label: string
	firstPort: string
	size: 32 | 64
	firstStrand: string
}

export type LegRange = {
	id: number
	label: string
	firstPort: number
	lastPort: number
	firstStrand: number
}

type RangeResult =
	| {
			error: 'invalid' | 'overlap' | 'duplicate'
			ranges: []
	  }
	| {
			error: null
			ranges: LegRange[]
	  }

export function wholeNumber(
	value: string,
	minimum = 0,
): number | null {
	if (!/^\d+$/.test(value.trim())) return null

	const number = Number(value)

	return Number.isSafeInteger(number) && number >= minimum
		? number
		: null
}

export function buildRanges(
	inputs: readonly LegInput[],
): RangeResult {
	const ranges: LegRange[] = []
	const labels = new Set<string>()

	if (!inputs.length) {
		return { error: 'invalid', ranges: [] }
	}

	for (const input of inputs) {
		const firstPort = wholeNumber(input.firstPort)
		const firstStrand = wholeNumber(input.firstStrand, 1)
		const label = input.label.trim()

		if (
			!label ||
			firstPort === null ||
			firstStrand === null ||
			(input.size !== 32 && input.size !== 64) ||
			!Number.isSafeInteger(firstPort + input.size - 1) ||
			!Number.isSafeInteger(firstStrand + input.size - 1)
		) {
			return { error: 'invalid', ranges: [] }
		}

		if (labels.has(label.toLowerCase())) {
			return { error: 'duplicate', ranges: [] }
		}

		labels.add(label.toLowerCase())

		ranges.push({
			id: input.id,
			label,
			firstPort,
			lastPort: firstPort + input.size - 1,
			firstStrand,
		})
	}

	const sorted = [...ranges].sort(
		(a, b) => a.firstPort - b.firstPort,
	)

	const overlapping = sorted.some(
		(range, index) =>
			index > 0 &&
			range.firstPort <= sorted[index - 1].lastPort,
	)

	if (overlapping) {
		return { error: 'overlap', ranges: [] }
	}

	return { error: null, ranges }
}

export function locatePort(
	port: number,
	ranges: readonly LegRange[],
) {
	if (!Number.isSafeInteger(port) || port < 0) return null

	const matches = ranges.filter(
		range =>
			port >= range.firstPort &&
			port <= range.lastPort,
	)

	if (matches.length !== 1) return null

	const leg = matches[0]
	const offset = port - leg.firstPort

	return {
		leg,
		position: offset + 1,
		strand: leg.firstStrand + offset,
	}
}