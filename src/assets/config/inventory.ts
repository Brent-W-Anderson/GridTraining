import { releaseImage } from './releaseMedia'
export type InventoryItem = {
	name: string
	description: string
	image: string
	alt: string
}

export type InventorySection = {
	id: string
	title: string
	items: InventoryItem[]
}

export const inventoryContent = {
	title:
		'Tools & Inventory',

	subtitle:
		'Quick visual inventory: what it is and what it is for.',

	imageMissingText:
		'Image unavailable.',

	sections: [
		{
			id: 'fiber-test-equipment',
			title: 'Fiber test equipment',
			items: [
				{
					name:
						'Optical Power Meter (OPM)',
					description:
						'Measures received optical power.',
					image:
						releaseImage('opm-field.jpg'),
					alt:
						'Optical power meter',
				},
				{
					name:
						'Visual Fault Locator (VFL)',
					description:
						'Red-light tool for tracing fiber and finding visible faults.',
					image:
						releaseImage('vfl.jpg'),
					alt:
						'Visual fault locator',
				},
				{
					name:
						'OTDR',
					description:
						'Locates and characterizes loss events along a fiber.',
					image:
						releaseImage('otdr-field.jpg'),
					alt:
						'OTDR',
				},
				{
					name:
						'Optical Light Source',
					description:
						'Known light source used with a power meter for loss testing.',
					image:
						releaseImage('optical-light-source.jpg'),
					alt:
						'Optical light source',
				},
				{
					name:
						'Fiber Inspection Scope',
					description:
						'Shows dirt or damage on connector end faces.',
					image:
						releaseImage('fiber-inspection-scope.jpg'),
					alt:
						'Fiber inspection scope',
				},
			],
		},
		{
			id: 'fiber-prep-cleaning',
			title:
				'Fiber prep & cleaning',
			items: [
				{
					name:
						'Fiber Cleaver',
					description:
						'Makes a precision cleave on stripped fiber.',
					image:
						releaseImage('fiber-cleaver.png'),
					alt:
						'Fiber cleaver',
				},
				{
					name:
						'Fiber Stripper',
					description:
						'Removes fiber coating or buffer without damaging the glass.',
					image:
						releaseImage('fiber-stripper.jpg'),
					alt:
						'Fiber optic stripper',
				},
				{
					name:
						'Drop Cable Stripper',
					description:
						'Opens and prepares FTTH drop cable.',
					image:
						releaseImage('drop-cable-stripper.jpg'),
					alt:
						'FTTH drop cable stripper',
				},
				{
					name:
						'Kevlar Scissors',
					description:
						'Cuts aramid or Kevlar strength yarn in fiber cable.',
					image:
						releaseImage('kevlar-scissors.png'),
					alt:
						'Fiber optic Kevlar scissors',
				},
				{
					name:
						'2.5 mm One-Click Cleaner',
					description:
						'Cleans SC connector ferrules and compatible adapters.',
					image:
						releaseImage('one-click-cleaner.jpg'),
					alt:
						'2.5 millimeter one-click fiber cleaner',
				},
				{
					name:
						'Lint-Free Fiber Wipes',
					description:
						'Cleans prepared fiber and connector surfaces.',
					image:
						releaseImage('fiber-cleaning-wipes.png'),
					alt:
						'Lint-free fiber optic cleaning wipes',
				},
				{
					name:
						'Fiber Shard Container',
					description:
						'Safe disposal for cleaved glass-fiber scraps.',
					image:
						releaseImage('fiber-shard-container.jpg'),
					alt:
						'Fiber optic shard disposal container',
				},
				{
					name:
						'Fusion Splicer · if issued',
					description:
						'Joins prepared fiber by fusion when the job requires splicing.',
					image:
						releaseImage('fusion-splicer.webp'),
					alt:
						'Fusion splicer',
				},
			],
		},
		{
			id: 'fiber-parts',
			title:
				'Fiber parts',
			items: [
				{
					name:
						'SC/APC Connector',
					description:
						'Green SC connector with an angled-polish fiber end face.',
					image:
						releaseImage('sc-apc-connector.jpg'),
					alt:
						'SC APC connector',
				},
				{
					name:
						'SC/APC Patch Cord',
					description:
						'Short fiber jumper between compatible optical points.',
					image:
						releaseImage('sc-apc-patch-cord.jpg'),
					alt:
						'SC APC fiber patch cord',
				},
				{
					name:
						'SC/APC Coupler / Adapter',
					description:
						'Joins two compatible SC/APC connectors.',
					image:
						releaseImage('sc-apc-coupler.jpg'),
					alt:
						'SC APC fiber coupler',
				},
				{
					name:
						'ASW Fiber Drop',
					description:
						'Aerial service drop toward the customer.',
					image:
						releaseImage('aerial-service-loops.jpg'),
					alt:
						'Aerial fiber drop',
				},
				{
					name:
						'BSW Fiber Drop',
					description:
						'Buried service drop toward the customer.',
					image:
						releaseImage('bsw-trench.jpg'),
					alt:
						'Buried fiber drop',
				},
				{
					name:
						'MST / Service Terminal',
					description:
						'Serving terminal where customer drops connect to the distribution network.',
					image:
						releaseImage('mst-product.jpg'),
					alt:
						'Multiport service terminal',
				},
			],
		},
		{
			id:
				'customer-equipment-ethernet',
			title:
				'Customer equipment & Ethernet',
			items: [
				{
					name:
						'Q1000K SmartNID',
					description:
						'Quantum fiber termination, ONT and Ethernet handoff.',
					image:
						releaseImage('q1000k.png'),
					alt:
						'Q1000K SmartNID',
				},
				{
					name:
						'W1700K',
					description:
						'Primary Quantum Wi-Fi 7 unit.',
					image:
						releaseImage('w1700k.png'),
					alt:
						'W1700K Wi-Fi 7 unit',
				},
				{
					name:
						'W1701K',
					description:
						'Additional Quantum Wi-Fi 7 unit.',
					image:
						releaseImage('w1701k.png'),
					alt:
						'W1701K Wi-Fi 7 unit',
				},
				{
					name:
						'Ethernet Cable / Patch Cord',
					description:
						'Copper network connection between equipment.',
					image:
						releaseImage('ethernet-rj45.jpg'),
					alt:
						'Ethernet cable',
				},
				{
					name:
						'RJ45 Crimper',
					description:
						'Terminates modular Ethernet plugs when field termination is used.',
					image:
						releaseImage('rj45-crimper.jpg'),
					alt:
						'RJ45 crimper',
				},
				{
					name:
						'Ethernet Cable Tester',
					description:
						'Checks basic continuity and wire map.',
					image:
						releaseImage('ethernet-cable-tester.jpg'),
					alt:
						'Ethernet cable tester',
				},
			],
		},
		{
			id:
				'core-install-tools',
			title:
				'Core install tools',
			items: [
				{
					name:
						'Drill / Driver',
					description:
						'Drilling, mounting and fastening.',
					image:
						releaseImage('drill-driver.jpg'),
					alt:
						'Cordless drill driver',
				},
				{
					name:
						'Fish Tape / Fish Rods',
					description:
						'Routes cable through walls, conduit and other spaces.',
					image:
						releaseImage('fish-tape.jpg'),
					alt:
						'Fish tape',
				},
				{
					name:
						'Extension Ladder',
					description:
						'Access for exterior and aerial work.',
					image:
						releaseImage('extension-ladder.jpg'),
					alt:
						'Fiberglass extension ladder',
				},
				{
					name:
						'Caulk Gun / Approved Sealant',
					description:
						'Seals approved exterior or wall-entry penetrations.',
					image:
						releaseImage('caulk-gun.jpg'),
					alt:
						'Caulk gun',
				},
				{
					name:
						'Cable Clips / Fasteners',
					description:
						'Secures cable along an approved route.',
					image:
						releaseImage('cable-clips.jpg'),
					alt:
						'Cable clips and fasteners',
				},
			],
		},
	] satisfies InventorySection[],
} as const