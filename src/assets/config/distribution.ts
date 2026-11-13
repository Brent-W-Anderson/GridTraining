import type { IconName } from '../../components/icon/Icon'

export const distributionContent = {
	title: 'FDH & Distribution',
	subtitle: 'Identify the assigned distribution path and verify the correct fiber.',

	chapters: [
		{
			id: 'fdh',
			title: 'Read the assignment',
			icon: 'network',
			description:
				'Keep cabinet, distribution, splitter, and terminal identifiers separate.',
		},
		{
			id: 'leg-math',
			title: 'Find the leg and strand',
			icon: 'fiber',
			description:
				'Use documented ranges, including mixed 32- and 64-port legs.',
		},
		{
			id: 'video',
			title: 'FDH field walkthrough',
			icon: 'play',
			description:
				'A field reference followed by assignment and strand practice.',
		},
		{
			id: 'verify',
			title: 'Verify before changing a connection',
			icon: 'check',
			description:
				'The calculation locates a numbered position; records establish the physical route.',
		},
	] satisfies {
		id: string
		title: string
		icon: IconName
		description: string
	}[],

	identifiers: {
		headers: ['Identifier', 'What to match'],
		rows: [
			[
				'FDH ID',
				'The cabinet identifier in the work order and on the cabinet. Proximity alone is not identification.',
			],
			[
				'Distribution port',
				'The labeled distribution position assigned to the customer. It is not automatically a splitter output number.',
			],
			[
				'Leg / cable ID',
				'The documented group or cable serving that distribution range. Use the actual label, not a calculated leg number.',
			],
			[
				'Strand',
				'The fiber label within the identified leg or cable. Confirm whether numbering starts at 1 or another value.',
			],
			[
				'Splitter output',
				'The assigned splitter connection. A 1:32 or 1:64 split ratio alone does not establish a distribution cable range.',
			],
			[
				'MST / terminal and port',
				'The assigned terminal ID and customer drop port. These are separate from the FDH distribution port.',
			],
		],
	},

	math: {
		intro:
			'Mixed leg sizes require a range lookup. Do not divide the customer port by one cabinet-wide leg size.',

		steps: [
			'Copy each relevant leg label and its first distribution port from the cabinet schedule or approved record.',
			'Enter the documented number of positions in that leg. A 32-position range beginning at 33 ends at 64; a 64-position range beginning at 33 ends at 96.',
			'Find the range containing the customer port: first port ≤ customer port ≤ last port.',
			'Subtract the first port to get the zero-based offset. Add the documented first strand number to get the strand label.',
		],

		assignment:
			'“Leg 2, port 145” is not enough to calculate a strand by itself. First identify what “leg 2” means in that record. If its documented distribution range is 129–192 and its first strand is 1, port 145 maps to strand 17: 145 − 129 + 1. The label “2” does not mean this must be the second 32- or 64-port block. If port 145 is a leg-local identifier instead, use that leg’s documented local numbering; do not subtract an assumed global offset.',

		formula:
			'Strand = customer distribution port − first distribution port in that leg + first strand number',

		example:
			'Practice example: A = 1–32, B = 33–96, C = 97–128, D = 129–192. Port 145 is in D. If D starts at strand 1: 145 − 129 + 1 = 17.',

		limit:
			'This works only when the entered port range maps sequentially, one-to-one, to the entered strand numbering. For restarted port numbers, nonsequential splices, or an undocumented map, use the cabinet/cable-specific assignment record instead.',
	},

	videos: {
		intro:
			'Your selected FDH field reference from Fiber Splice God. Compare the explanation with the labels and records for the cabinet you are working in.',

		items: [
            {
                kind: 'local',
                src: 'https://github.com/Brent-W-Anderson/GridTraining/releases/download/media-v1/fdh-overview.mp4',
                title: 'FDH Field Overview — Fiber Splice God',
                href: 'https://www.youtube.com/watch?v=NV2gkq8_NmM',
                watchFor: 'Watch how the FDH and distribution connections are identified in the field.',
                unavailableText: 'The local video could not be played. Open the original video instead.',
            },
		],

		play: 'Play field walkthrough',
		open: 'Open original video (opens a new tab)',
		source: 'More field videos from Fiber Splice God',
		sourceHref: 'https://www.youtube.com/@FiberSpliceGod/videos',
	},

	verification: [
		'Confirm the customer address and SA number, then match the physical FDH ID to the assignment.',
		'Match the distribution port, leg/cable ID, and strand against the cabinet schedule and applicable splice records.',
		'Confirm the MST/terminal ID and customer drop port independently. The calculator does not translate FDH ports into MST ports.',
		'If a port is occupied, a label conflicts, or a range is missing, resolve the discrepancy through approved records and escalation before disconnecting or moving anything.',
		'Use only the approved test procedure, equipment, and test point when physical verification is required. Do not infer a verified route from the arithmetic alone.',
		'Record the identifiers and any discrepancy in the assigned work order. Do not invent Quantum app fields or GridSource form names.',
	],

	reference: {
		label: 'Corning FDH-HD routing procedure (PDF)',
		href:
			'https://www.corning.com/catalog/coc/documents/standard-recommended-procedures/003-980-AEN.pdf',
	},
} as const

export const calculatorContent = {
	legend: 'Mixed-leg practice worksheet',
	note:
		'Example data, not a Quantum cabinet map. Replace every row with the documented leg ranges before using this as a field reference.',

	target: 'Customer distribution port',
	assignedLeg: 'Assigned leg label (optional)',
	assignedHelp:
		'Match the label in the table. If supplied, the calculated range must belong to that leg.',
	loadAssignment: 'Try: leg 2 / port 145',

	assignmentPractice: [
		{
			id: 1,
			label: '2',
			firstPort: '129',
			size: 64,
			firstStrand: '1',
		},
	] as const,

	region: 'Editable leg ranges',
	columns: [
		'Leg label',
		'First port',
		'Positions',
		'First strand',
		'Last port',
		'Remove',
	],

	add32: 'Add 32-position leg',
	add64: 'Add 64-position leg',
	reset: 'Reset practice example',
	remove: 'Remove leg',

	practice: [
		{
			id: 1,
			label: 'A',
			firstPort: '1',
			size: 32,
			firstStrand: '1',
		},
		{
			id: 2,
			label: 'B',
			firstPort: '33',
			size: 64,
			firstStrand: '1',
		},
		{
			id: 3,
			label: 'C',
			firstPort: '97',
			size: 32,
			firstStrand: '1',
		},
		{
			id: 4,
			label: 'D',
			firstPort: '129',
			size: 64,
			firstStrand: '1',
		},
	] as const,

	result: {
		leg: 'Matched leg',
		strand: 'Strand label',
		position: 'Position in leg',
		range: 'Distribution range',
	},

	errors: {
		invalid:
			'Enter a unique leg label, a whole-number first port of 0 or greater, and a whole-number first strand of 1 or greater in every row. Keep at least one row.',
		overlap:
			'Two leg ranges overlap. Correct the map; a port must identify only one listed leg. If port numbers restart in different groups, enter only the documented group for this assignment.',
		duplicate:
			'Leg labels must be unique within this worksheet. Include a cable or group identifier where needed.',
		legMissing:
			'The assigned leg is not in this map. Add its documented range or correct the label.',
		legConflict:
			'The entered port belongs to a different listed leg. Check the assigned leg, its documented range, and whether the work order uses global or leg-local port numbering. Do not assume a conversion.',
		port:
			'Enter a whole-number distribution port of 0 or greater.',
		missing:
			'This port is outside the listed ranges. Check the records and add the correct leg; do not assume a gap belongs to the next leg.',
	},
} as const