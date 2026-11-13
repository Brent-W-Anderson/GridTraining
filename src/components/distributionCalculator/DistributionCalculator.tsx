import { useId, useRef, useState } from 'react'

import { calculatorContent as content } from '../../assets/config/distribution'

import {
	buildRanges,
	locatePort,
	wholeNumber,
	type LegInput,
} from './calculator'

import './distributionCalculator.scss'

type SerialLeg = LegInput & {
	serialNumber: string
}

function generateSerialNumber(): string {
	const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

	return Array.from(
		{ length: 12 },
		() => characters[Math.floor(Math.random() * characters.length)],
	).join('')
}

export default function DistributionCalculator() {
	const id = useId()

	const nextId = useRef(Math.max(...content.practice.map(leg => leg.id)) + 1)

	const [port, setPort] = useState('110')
	const [startingLeg, setStartingLeg] = useState('')

	const [legs, setLegs] = useState<SerialLeg[]>(() =>
		content.practice.map(leg => ({
			...leg,
			serialNumber: generateSerialNumber(),
		})),
	)

	const numberedLegs = legs.map((leg, index) => ({
		...leg,
		label: String(index + 1),
	}))

	const map = buildRanges(numberedLegs)
	const assignedNumber = wholeNumber(port)

	const startingIndex = startingLeg
		? numberedLegs.findIndex(leg => String(leg.id) === startingLeg)
		: 0

	const startingLegValid = startingIndex >= 0

	const offset = startingLegValid
		? numberedLegs
				.slice(0, startingIndex)
				.reduce((total, leg) => total + leg.size, 0)
		: 0

	const target =
		assignedNumber !== null &&
		startingLegValid &&
		Number.isSafeInteger(assignedNumber + offset)
			? assignedNumber + offset
			: null

	const match =
		map.error === null && target !== null
			? locatePort(target, map.ranges)
			: null

	const matchedLeg = match
		? numberedLegs.find(leg => leg.id === match.leg.id)
		: undefined

	const error = map.error
		? content.errors[map.error]
		: assignedNumber === null
			? content.errors.port
			: !startingLegValid
				? content.errors.startingLeg
				: target === null
					? content.errors.port
					: !match
						? content.errors.missing
						: null

	function updateSize(rowId: number, size: 32 | 64) {
		setLegs(current =>
			current.map(leg => (leg.id === rowId ? { ...leg, size } : leg)),
		)
	}

	function updateSerialNumber(rowId: number, serialNumber: string) {
		setLegs(current =>
			current.map(leg =>
				leg.id === rowId ? { ...leg, serialNumber } : leg,
			),
		)
	}

	function addLeg() {
		const rowId = nextId.current++

		setLegs(current => [
			...current,
			{
				id: rowId,
				label: String(current.length + 1),
				size: 32,
				serialNumber: generateSerialNumber(),
			},
		])
	}

	function removeLeg(rowId: number) {
		setLegs(current => current.filter(leg => leg.id !== rowId))

		if (startingLeg === String(rowId)) {
			setStartingLeg('')
		}
	}

	return (
		<fieldset
			className='distribution-calculator'
			aria-describedby={`${id}-note`}>
			<legend>{content.legend}</legend>

			<p id={`${id}-note`} className='note'>
				{content.note}
			</p>

			<label className='distribution-target' htmlFor={`${id}-port`}>
				{content.target}

				<input
					id={`${id}-port`}
					type='text'
					inputMode='numeric'
					pattern='[0-9]*'
					value={port}
					onChange={event => setPort(event.target.value)}
				/>
			</label>

			<label
				className='distribution-target'
				htmlFor={`${id}-starting-leg`}>
				{content.startingLeg}

				<select
					id={`${id}-starting-leg`}
					value={startingLeg}
					onChange={event => setStartingLeg(event.target.value)}>
					<option value=''>Leg 1 (default)</option>

					{numberedLegs.slice(1).map(leg => (
						<option key={leg.id} value={leg.id}>
							Leg {leg.label}
						</option>
					))}
				</select>
			</label>

			<div
				className='distribution-table'
				role='region'
				aria-label={content.region}
				tabIndex={0}>
				<table>
					<thead>
						<tr>
							{content.columns.map(column => (
								<th key={column} scope='col'>
									{column}
								</th>
							))}
						</tr>
					</thead>

					<tbody>
						{numberedLegs.map((leg, index) => {
							const range = map.ranges.find(
								item => item.id === leg.id,
							)

							const matched = !error && match?.leg.id === leg.id

							return (
								<tr
									key={leg.id}
									className={
										matched
											? 'distribution-match'
											: undefined
									}>
									<td>{index + 1}</td>

									<td>
										<input
											aria-label={`Simulated S/N for leg ${index + 1}`}
											value={leg.serialNumber}
											maxLength={12}
											onChange={event =>
												updateSerialNumber(
													leg.id,
													event.target.value.toUpperCase(),
												)
											}
										/>
									</td>

									<td>
										<select
											aria-label={`Positions for leg ${index + 1}`}
											value={leg.size}
											onChange={event =>
												updateSize(
													leg.id,
													event.target.value === '64'
														? 64
														: 32,
												)
											}>
											<option value={32}>32</option>
											<option value={64}>64</option>
										</select>
									</td>

									<td>{range?.firstPort ?? '—'}</td>

									<td>{range?.lastPort ?? '—'}</td>

									<td>
										<button
											type='button'
											disabled={numberedLegs.length === 1}
											aria-label={`Remove leg ${index + 1}`}
											onClick={() => removeLeg(leg.id)}>
											{content.remove}
										</button>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>

			<div className='distribution-actions'>
				<button type='button' onClick={addLeg}>
					{content.addLeg}
				</button>
			</div>

			<div
				className='distribution-result'
				role='status'
				aria-live='polite'
				aria-atomic='true'>
				{error ? (
					<p>{error}</p>
				) : (
					match &&
					matchedLeg &&
					target !== null &&
					assignedNumber !== null && (
						<>
							<h3>How We Found Your Strand</h3>

							{offset > 0 && (
								<>
									<p>
										Starting at Leg {startingIndex + 1}{' '}
										skips {offset} positions from the
										preceding legs.
									</p>

									<p>
										{assignedNumber} + {offset} ={' '}
										<strong>{target}</strong>
									</p>
								</>
							)}

							<ol>
								{map.ranges
									.filter(range => range.firstPort <= target)
									.map(range => (
										<li key={range.id}>
											Leg {range.label}: {range.firstPort}
											–{range.lastPort}
											{range.id === match.leg.id && (
												<strong> — Match</strong>
											)}
										</li>
									))}
							</ol>

							<p>
								<strong>
									{target} − {match.leg.firstPort} + 1 ={' '}
									{match.position}
								</strong>
							</p>

							<p>
								Leg {match.leg.label}, Position {match.position}
							</p>

							<hr />

							<h3>Find This Distribution Label</h3>

							<p className='distribution-equation'>
								<strong>
									{matchedLeg.serialNumber || 'S/N NOT SET'}{' '}
									{match.position}
								</strong>
							</p>

							<p className='note'>
								Simulated S/N for training. Match the actual
								serial number and strand position against the
								physical FDH labels and approved service
								records.
							</p>
						</>
					)
				)}
			</div>
		</fieldset>
	)
}
