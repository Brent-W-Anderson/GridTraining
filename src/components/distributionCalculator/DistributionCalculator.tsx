import { useId, useRef, useState } from 'react'

import { calculatorContent as content } from '../../assets/config/distribution'

import {
	buildRanges,
	locatePort,
	wholeNumber,
	type LegInput,
} from './calculator'

import './distributionCalculator.scss'

export default function DistributionCalculator() {
	const id = useId()
	const nextId = useRef(5)

	const [port, setPort] = useState('145')
	const [assignedLeg, setAssignedLeg] = useState('')

	const [legs, setLegs] = useState<LegInput[]>(() =>
		content.practice.map(leg => ({ ...leg })),
	)

	const map = buildRanges(legs)
	const target = wholeNumber(port)

	const match =
		map.error === null && target !== null
			? locatePort(target, map.ranges)
			: null

	const assigned = assignedLeg.trim().toLowerCase()

	const assignedRange = map.ranges.find(
		leg => leg.label.toLowerCase() === assigned,
	)

	const error = map.error
		? content.errors[map.error]
		: target === null
			? content.errors.port
			: assigned && !assignedRange
				? content.errors.legMissing
				: !match
					? content.errors.missing
					: assignedRange && assignedRange.id !== match.leg.id
						? content.errors.legConflict
						: null

	function update(rowId: number, patch: Partial<LegInput>) {
		setLegs(current =>
			current.map(leg => (leg.id === rowId ? { ...leg, ...patch } : leg)),
		)
	}

	function add(size: 32 | 64) {
		const rowId = nextId.current++

		setLegs(current => [
			...current,
			{
				id: rowId,
				label: '',
				firstPort: '',
				size,
				firstStrand: '1',
			},
		])
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

			<label className='distribution-target' htmlFor={`${id}-leg`}>
				{content.assignedLeg}

				<input
					id={`${id}-leg`}
					value={assignedLeg}
					aria-describedby={`${id}-leg-help`}
					onChange={event => setAssignedLeg(event.target.value)}
				/>
			</label>

			<p id={`${id}-leg-help`}>{content.assignedHelp}</p>

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
						{legs.map((leg, index) => {
							const first = wholeNumber(leg.firstPort)

							const last =
								first === null ||
								!Number.isSafeInteger(first + leg.size - 1)
									? '—'
									: first + leg.size - 1

							const matched = !error && match?.leg.id === leg.id

							return (
								<tr
									key={leg.id}
									className={
										matched
											? 'distribution-match'
											: undefined
									}>
									<td>
										<input
											aria-label={`${content.columns[0]} ${index + 1}`}
											value={leg.label}
											onChange={event =>
												update(leg.id, {
													label: event.target.value,
												})
											}
										/>
									</td>

									<td>
										<input
											aria-label={`${content.columns[1]} ${index + 1}`}
											inputMode='numeric'
											pattern='[0-9]*'
											value={leg.firstPort}
											onChange={event =>
												update(leg.id, {
													firstPort:
														event.target.value,
												})
											}
										/>
									</td>

									<td>
										<select
											aria-label={`${content.columns[2]} ${index + 1}`}
											value={leg.size}
											onChange={event =>
												update(leg.id, {
													size:
														event.target.value ===
														'32'
															? 32
															: 64,
												})
											}>
											<option value={32}>32</option>
											<option value={64}>64</option>
										</select>
									</td>

									<td>
										<input
											aria-label={`${content.columns[3]} ${index + 1}`}
											inputMode='numeric'
											pattern='[0-9]*'
											value={leg.firstStrand}
											onChange={event =>
												update(leg.id, {
													firstStrand:
														event.target.value,
												})
											}
										/>
									</td>

									<td>{last}</td>

									<td>
										<button
											type='button'
											aria-label={`${content.remove} ${leg.label || index + 1}`}
											onClick={() =>
												setLegs(current =>
													current.filter(
														row =>
															row.id !== leg.id,
													),
												)
											}>
											{content.columns[5]}
										</button>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>

			<div className='distribution-actions'>
				<button type='button' onClick={() => add(32)}>
					{content.add32}
				</button>

				<button type='button' onClick={() => add(64)}>
					{content.add64}
				</button>

				<button
					type='button'
					onClick={() => {
						setLegs(
							content.assignmentPractice.map(leg => ({ ...leg })),
						)
						setPort('145')
						setAssignedLeg('2')
					}}>
					{content.loadAssignment}
				</button>

				<button
					type='button'
					onClick={() => {
						setLegs(content.practice.map(leg => ({ ...leg })))
						setAssignedLeg('')
						setPort('145')
					}}>
					{content.reset}
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
					match && (
						<>
							<dl>
								<div>
									<dt>{content.result.leg}</dt>
									<dd>{match.leg.label}</dd>
								</div>

								<div>
									<dt>{content.result.strand}</dt>
									<dd>{match.strand}</dd>
								</div>

								<div>
									<dt>{content.result.position}</dt>
									<dd>{match.position}</dd>
								</div>

								<div>
									<dt>{content.result.range}</dt>
									<dd>
										{match.leg.firstPort}–
										{match.leg.lastPort}
									</dd>
								</div>
							</dl>

							<p className='distribution-equation'>
								{target} − {match.leg.firstPort} +{' '}
								{match.leg.firstStrand} = {match.strand}
							</p>
						</>
					)
				)}
			</div>
		</fieldset>
	)
}
