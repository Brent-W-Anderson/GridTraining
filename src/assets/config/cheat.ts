import aerialTerminalFieldImage from '../images/aerial-terminal-field.jpg'
import mstProductImage from '../images/mst-product.jpg'
import opmFieldImage from '../images/opm-field.jpg'
import otdrFieldImage from '../images/otdr-field.jpg'
import q1000kBottomImage from '../images/q1000k-bottom.png'
import q1000kImage from '../images/q1000k.png'
import vflImage from '../images/vfl.jpg'
import w1700kImage from '../images/w1700k.png'
import w1701kImage from '../images/w1701k.png'

export type CheatInline = {
	text: string
	strong?: boolean
}

export type CheatText = {
	type: 'text'
	content: CheatInline[]
}

export type CheatPath = {
	type: 'path'
	text: string
}

export type CheatCallout = {
	type: 'callout'
	style:
		| 'note'
		| 'warn'
		| 'tip'
		| 'danger'
	content: CheatInline[]
}

export type CheatChecklist = {
	type: 'checklist'
	items: string[]
}

export type CheatImageCard = {
	src: string
	alt: string
	title: string
	text: string
}

export type CheatImageGrid = {
	type: 'image-grid'
	items: CheatImageCard[]
}

export type CheatTable = {
	type: 'table'
	headers: string[]
	rows: string[][]
	termColumn?: number
}

export type CheatBlock =
	| CheatText
	| CheatPath
	| CheatCallout
	| CheatChecklist
	| CheatImageGrid
	| CheatTable

export type CheatSection = {
	id: string
	title: string
	blocks: CheatBlock[]
}

export const cheatContent = {
	title: 'Field Cheat Sheet',

	subtitle:
		'Fast field reference. Open only the section you need.',

	imageMissingText:
		'Image missing.',

	sections: [
		{
			id: 'network-path',
			title: 'Network path',
			blocks: [
				{
					type: 'path',
					text:
						'OLT → feeder fiber → splitter / serving infrastructure → distribution fiber → MST → customer drop → Q1000K → Ethernet → W1700K → customer devices',
				},
				{
					type: 'callout',
					style: 'tip',
					content: [
						{
							strong: true,
							text:
								'FIELD TIP:',
						},
						{
							text:
								'Troubleshoot in this order. Prove each layer before moving downstream.',
						},
					],
				},
			],
		},

		{
			id: 'mst',
			title:
				'Serving terminal · MST',
			blocks: [
				{
					type: 'image-grid',
					items: [
						{
							src:
								mstProductImage,
							alt:
								'Multiport Service Terminal',
							title:
								'MST · Multiport Service Terminal',
							text:
								'The outside-plant terminal where the assigned customer drop connects to the distribution network.',
						},
						{
							src:
								aerialTerminalFieldImage,
							alt:
								'Aerial fiber terminal',
							title:
								'Aerial terminal example',
							text:
								'Field appearance varies. Confirm the assigned terminal and port from the current work order.',
						},
					],
				},
				{
					type: 'callout',
					style: 'warn',
					content: [
						{
							strong: true,
							text:
								'DO NOT GUESS:',
						},
						{
							text:
								'terminal, port or customer assignment. Use the current GridSource / Quantum job information.',
						},
					],
				},
			],
		},

		{
			id: 'customer-drop',
			title:
				'ASW vs BSW · customer drop',
			blocks: [
				{
					type: 'table',
					headers: [
						'Drop',
						'Meaning',
						'Route',
					],
					rows: [
						[
							'ASW',
							'Aerial Service Wire',
							'Drop is routed overhead between the serving plant and customer premises.',
						],
						[
							'BSW',
							'Buried Service Wire',
							'Drop is routed underground between the serving plant and customer premises.',
						],
					],
					termColumn: 0,
				},
				{
					type: 'callout',
					style: 'danger',
					content: [
						{
							strong: true,
							text:
								'DO NOT GUESS:',
						},
						{
							text:
								'burial depth, aerial clearance, utility separation, attachment hardware, conduit requirements or company sketch symbols.',
						},
					],
				},
			],
		},

		{
			id: 'fiber-connectors',
			title:
				'Fiber connectors · before testing',
			blocks: [
				{
					type: 'checklist',
					items: [
						'Never look into an unknown fiber or connector.',
						'Keep connector caps on until needed.',
						'Do not touch the ferrule/end face.',
						'Inspect and clean using the approved process before blaming the plant.',
						'Respect bend radius and avoid crushing, kinking or excessive pulling force.',
					],
				},
				{
					type: 'callout',
					style: 'tip',
					content: [
						{
							strong: true,
							text:
								'FIELD TIP:',
						},
						{
							text:
								'A connector can look fine from the outside and still have contamination on the optical end face.',
						},
					],
				},
			],
		},

		{
			id: 'dbm-db',
			title:
				'dBm and dB · do not mix them up',
			blocks: [
				{
					type: 'table',
					headers: [
						'Unit',
						'Meaning',
						'Field use',
					],
					rows: [
						[
							'dBm',
							'Absolute power level referenced to 1 milliwatt.',
							'An optical power meter reading is commonly expressed in dBm.',
						],
						[
							'dB',
							'Relative gain or loss between two levels.',
							'Used when discussing loss through a connector, splice, splitter, span or other optical event.',
						],
					],
					termColumn: 0,
				},
				{
					type: 'callout',
					style: 'warn',
					content: [
						{
							strong: true,
							text:
								'QUANTUM REQUIREMENT:',
						},
						{
							text:
								'Use the current approved optical acceptance range. This guide intentionally does not invent a pass/fail dBm threshold.',
						},
					],
				},
			],
		},

		{
			id: 'fiber-test-tools',
			title:
				'Fiber test tools · which one?',
			blocks: [
				{
					type: 'image-grid',
					items: [
						{
							src:
								opmFieldImage,
							alt:
								'Optical power meter',
							title:
								'OPM · Optical Power Meter',
							text:
								'Question: “How much optical power is present here?”',
						},
						{
							src:
								vflImage,
							alt:
								'Visual fault locator',
							title:
								'VFL · Visual Fault Locator',
							text:
								'Question: “Can visible red light help identify this fiber or expose a nearby continuity/bend problem?”',
						},
						{
							src:
								otdrFieldImage,
							alt: 'OTDR',
							title:
								'OTDR · Optical Time-Domain Reflectometer',
							text:
								'Question: “Where along the fiber is a significant event, reflection, loss or break?”',
						},
					],
				},
				{
					type: 'table',
					headers: [
						'Need to know...',
						'Start with...',
					],
					rows: [
						[
							'Optical power at the endpoint',
							'OPM',
						],
						[
							'Simple continuity / visual identification on an appropriate fiber',
							'VFL',
						],
						[
							'Approximate distance to an event or fault',
							'OTDR',
						],
					],
					termColumn: 1,
				},
			],
		},

		{
			id: 'q1000k',
			title:
				'Q1000K · SmartNID',
			blocks: [
				{
					type: 'image-grid',
					items: [
						{
							src:
								q1000kImage,
							alt:
								'Q1000K SmartNID',
							title:
								'Q1000K SmartNID',
							text:
								'Customer-side fiber termination / ONT function and network handoff.',
						},
						{
							src:
								q1000kBottomImage,
							alt:
								'Q1000K bottom ports',
							title:
								'Q1000K ports',
							text:
								'Know the fiber input and Ethernet handoff before troubleshooting the Wi-Fi layer.',
						},
					],
				},
				{
					type: 'text',
					content: [
						{
							text:
								'The Q1000K incorporates the customer-side optical termination function and provides Ethernet handoff. It does ',
						},
						{
							strong: true,
							text: 'not',
						},
						{
							text:
								' itself provide the customer’s Wi-Fi.',
						},
					],
				},
				{
					type: 'table',
					headers: [
						'Q1000K light',
						'Meaning',
					],
					rows: [
						[
							'Solid green',
							'Connected with full internet access.',
						],
						[
							'Blinking blue',
							'Synchronizing / connecting.',
						],
						[
							'Solid blue',
							'Synchronization complete / ready.',
						],
						[
							'Solid red',
							'Hardware test during startup.',
						],
						[
							'Blinking red',
							'Hardware test or service failure.',
						],
						[
							'Amber / orange',
							'Account action may be required.',
						],
						[
							'Blinking orange + green',
							'Remote firmware update.',
						],
						[
							'Solid white',
							'Transparent bridge mode.',
						],
						[
							'Off',
							'No power / unplugged.',
						],
					],
					termColumn: 0,
				},
			],
		},

		{
			id: 'wifi',
			title:
				'W1700K / W1701K · Wi-Fi layer',
			blocks: [
				{
					type: 'image-grid',
					items: [
						{
							src:
								w1700kImage,
							alt: 'W1700K',
							title: 'W1700K',
							text:
								'Primary wired Wi-Fi 7 pod / gateway.',
						},
						{
							src:
								w1701kImage,
							alt: 'W1701K',
							title: 'W1701K',
							text:
								'Additional Wi-Fi pod used where the supported design calls for one.',
						},
					],
				},
				{
					type: 'path',
					text:
						'Q1000K 10G LAN → Ethernet → W1700K 10G WAN/LAN1 → Wi-Fi → customer devices',
				},
				{
					type: 'table',
					headers: [
						'Pod light',
						'Quick meaning',
					],
					rows: [
						[
							'Solid green',
							'Online.',
						],
						[
							'Blinking green',
							'Boot progression.',
						],
						[
							'Blinking blue',
							'Sync / auto-discovery.',
						],
						[
							'Solid blue',
							'Sync complete.',
						],
						[
							'Solid red',
							'Startup hardware test or service failure depending on state.',
						],
						[
							'Blinking red',
							'Failed hardware test.',
						],
						[
							'Magenta',
							'Software test.',
						],
						[
							'Amber',
							'Reset started.',
						],
					],
					termColumn: 0,
				},
				{
					type: 'callout',
					style: 'note',
					content: [
						{
							strong: true,
							text:
								'DOCUMENTATION NOTE:',
						},
						{
							text:
								'Quantum documentation is not perfectly consistent about an unlit pod during normal operation. Use the current app/status procedure along with the light state rather than treating “off” alone as proof of failure.',
						},
					],
				},
			],
		},

		{
			id:
				'install-verification',
			title:
				'Install verification · before leaving',
			blocks: [
				{
					type: 'checklist',
					items: [
						'Correct serving terminal / port used.',
						'Drop route is safe, protected and documented.',
						'Fiber connectors are clean and properly seated.',
						'Optical layer passes the current company requirement.',
						'Q1000K is powered and online.',
						'Ethernet handoff to W1700K is correct.',
						'Wi-Fi is online and usable.',
						'Customer device successfully reaches the internet.',
						'Required photos, coordinates, sketch, readings and notes are captured.',
						'Customer understands the equipment and basic Wi-Fi use.',
						'Job is closed using the current GridSource / Quantum workflow.',
					],
				},
			],
		},

		{
			id: 'troubleshooting',
			title:
				'Troubleshooting shortcut',
			blocks: [
				{
					type: 'path',
					text:
						'Drop / OSP → optical input → Q1000K → Ethernet → W1700K → Wi-Fi → customer device',
				},
				{
					type: 'text',
					content: [
						{
							text:
								'Start at the earliest layer that can explain the symptom. Once that layer is proven healthy, move downstream.',
						},
					],
				},
				{
					type: 'callout',
					style: 'tip',
					content: [
						{
							strong: true,
							text:
								'FIELD TIP:',
						},
						{
							text:
								'If the Q1000K is not receiving a healthy optical service, changing Wi-Fi settings cannot fix the actual problem.',
						},
					],
				},
				{
					type: 'text',
					content: [
						{
							text:
								'For symptom-specific steps, equipment light interpretation, optical troubleshooting and tool selection, use ',
						},
						{
							strong: true,
							text:
								'Tab 4 · Troubleshooting',
						},
						{
							text: '.',
						},
					],
				},
			],
		},
	] satisfies CheatSection[],
} as const