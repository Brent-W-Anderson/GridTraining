
import type { IconName } from '../../components/icon/Icon'

export const distributionContent = {
	title: 'FDH & Distribution',
	subtitle:
		'Watch the walkthrough, locate the assigned strand, and verify the connection.',

	chapters: [
		{
			id: 'overview',
			title: 'FDH Overview',
			icon: 'box',
			description: 'Watch the field walkthrough.',
		},
		{
			id: 'calculator',
			title: 'Find Your Distribution Strand',
			icon: 'fiber',
			description:
				'Find the assigned distribution leg and strand position.',
		},
		{
			id: 'verify',
			title: 'Locate & Verify',
			icon: 'check',
			description:
				'Identify the matching serial number and strand label.',
		},
	] satisfies {
		id: string
		title: string
		icon: IconName
		description: string
	}[],

	calculatorIntro:
		'Use the calculator to find the assigned distribution leg and strand position.',

	calculatorExample:
		'Example: distribution 110, starting at leg 2 with 32 positions in leg 1, maps to leg 5, position 14.',

	verification: [
		'Find the matching serial number on the FDH distribution leg.',
		'Find the distribution strand labeled with that S/N and the calculated position.',
	],

	photos: [
		{
			title: 'Leg serial number',
			caption:
				'Photo coming soon — location of the leg S/N on the FDH.',
		},
		{
			title: 'Distribution strand label',
			caption:
				'Photo coming soon — S/N and position on the distribution strand.',
		},
	],

	videos: {
		items: [
			{
				kind: 'local',
				src: 'https://github.com/Brent-W-Anderson/GridTraining/releases/download/media-v1/fdh-overview.mp4',
				title: 'FDH Field Overview — Fiber Splice God',
				href: 'https://www.youtube.com/watch?v=NV2gkq8_NmM',
				watchFor:
					'Watch how FDH distribution connections are identified in the field.',
				unavailableText:
					'The hosted video could not be played. Open the original video instead.',
			},
		],

		play: 'Play field walkthrough',
		open: 'Open original video (opens a new tab)',
	},
} as const

export const calculatorContent = {
	legend: 'Distribution strand locator',

	note:
		'Enter the assigned distribution number and configure the legs below.',

	target: 'Assigned distribution number',

	startingLeg: 'Starting Leg (optional)',

	startingLegHelp: '',

	physical: 'Physical distribution number',

	region: 'Distribution legs',

	columns: [
		'Leg',
		'S/N',
		'Positions',
		'First port',
		'Last port',
		'Remove',
	],

	serialNumber: 'Simulated leg serial number',

	addLeg: 'Add leg',
	remove: 'Remove',

	practice: [
		{ id: 1, label: '1', size: 32 },
		{ id: 2, label: '2', size: 32 },
		{ id: 3, label: '3', size: 32 },
		{ id: 4, label: '4', size: 32 },
		{ id: 5, label: '5', size: 32 },
	] as const,

	result: {
		leg: 'Matched leg',
		position: 'Position in leg',
		range: 'Distribution range',
	},

	errors: {
		invalid:
			'Enter a valid leg label and position count for every leg.',

		duplicate:
			'Each leg needs a unique label.',

		port:
			'Enter a valid assigned distribution number.',

		startingLeg:
			'Select a starting leg from the configured distribution legs.',

		missing:
			'The distribution number is outside the configured legs. Add the necessary legs or check the assignment.',
	},
} as const
