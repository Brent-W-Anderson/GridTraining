import opmFieldImage from '../images/opm-field.jpg'
import otdrFieldImage from '../images/otdr-field.jpg'
import q1000kBottomImage from '../images/q1000k-bottom.png'
import q1000kImage from '../images/q1000k.png'
import vflImage from '../images/vfl.jpg'
import w1700kBottomImage from '../images/w1700k-bottom.png'
import w1700kImage from '../images/w1700k.png'
import w1701kImage from '../images/w1701k.png'

export type TroubleshootingInline = {
	text: string
	strong?: boolean
}

export type TroubleshootingSteps = {
	type: 'steps'
	items: TroubleshootingInline[][]
}

export type TroubleshootingCallout = {
	type: 'callout'
	style:
		| 'note'
		| 'tip'
		| 'warn'
		| 'danger'
	content: TroubleshootingInline[]
}

export type TroubleshootingPath = {
	type: 'path'
	text: string
}

export type TroubleshootingImage = {
	src: string
	alt: string
}

export type TroubleshootingImages = {
	type: 'images'
	items: TroubleshootingImage[]
}

export type TroubleshootingTable = {
	type: 'table'
	headers: string[]
	rows: string[][]
	termColumn?: number
}

export type TroubleshootingTool = {
	src: string
	alt: string
	title: string
	content: TroubleshootingInline[]
}

export type TroubleshootingTools = {
	type: 'tools'
	items: TroubleshootingTool[]
}

export type TroubleshootingLinks = {
	type: 'links'
	items: {
		label: string
		href: string
	}[]
}

export type TroubleshootingBlock =
	| TroubleshootingSteps
	| TroubleshootingCallout
	| TroubleshootingPath
	| TroubleshootingImages
	| TroubleshootingTable
	| TroubleshootingTools
	| TroubleshootingLinks

export type TroubleshootingCard = {
	id: string
	title: string
	subtitle?: string
	blocks: TroubleshootingBlock[]
}

export type TroubleshootingSection = {
	id: string
	title: string
	cards?: TroubleshootingCard[]
	blocks?: TroubleshootingBlock[]
}

export const troubleshootingContent = {
	title: 'Troubleshooting',

	subtitle:
		'Start at the earliest layer that can explain the symptom. Prove it, then move downstream.',

	intro: {
		style: 'note',
		content: [
			{
				strong: true,
				text: 'CORE RULE:',
			},
			{
				text:
					' Do not jump straight to Wi-Fi, equipment replacement or “bad fiber.” Follow the service path in order: OSP / drop → optical input → Q1000K → Ethernet → W1700K → Wi-Fi → customer device.',
			},
		],
	},

	sections: [
		{
			id: 'internet-down',
			title:
				'Customer says “internet is down”',
			cards: [
				{
					id: 'start-here',
					title: 'Start here',
					subtitle:
						'Customer has no service',
					blocks: [
						{
							type: 'steps',
							items: [
								[
									{
										text:
											'Verify the ',
									},
									{
										strong: true,
										text:
											'Q1000K has power',
									},
									{
										text:
											'. No power means stop here and solve power first.',
									},
								],
								[
									{
										text:
											'Read the ',
									},
									{
										strong: true,
										text:
											'Q1000K status light',
									},
									{
										text:
											'. The SmartNID state tells you whether to stay at the optical/network layer or move downstream.',
									},
								],
								[
									{
										text:
											'If Q1000K is healthy/green, verify the ',
									},
									{
										strong: true,
										text:
											'Ethernet handoff',
									},
									{
										text:
											' from Q1000K to the wired W1700K.',
									},
								],
								[
									{
										text:
											'Check the ',
									},
									{
										strong: true,
										text:
											'W1700K',
									},
									{
										text:
											'. If the pod layer is bad while Q1000K is healthy, stay downstream of the SmartNID.',
									},
								],
								[
									{
										text:
											'If both network devices are healthy, determine whether ',
									},
									{
										strong: true,
										text:
											'all devices',
									},
									{
										text:
											' or ',
									},
									{
										strong: true,
										text:
											'only one device',
									},
									{
										text:
											' is affected.',
									},
								],
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
										' The first bad layer is more useful than the customer’s description of the symptom.',
								},
							],
						},
					],
				},
				{
					id: 'q1000k-status',
					title:
						'Q1000K status light',
					subtitle:
						'Off, green, blue, red, amber, white or updating',
					blocks: [
						{
							type: 'images',
							items: [
								{
									src:
										q1000kImage,
									alt:
										'Q1000K SmartNID',
								},
								{
									src:
										q1000kBottomImage,
									alt:
										'Q1000K ports',
								},
							],
						},
						{
							type: 'table',
							headers: [
								'Observed state',
								'Quantum meaning',
								'Technician direction',
							],
							rows: [
								[
									'Solid green',
									'Connected with full internet access.',
									'SmartNID/network is reporting healthy. If the customer still has a problem, move downstream to Ethernet, W1700K, coverage or device isolation.',
								],
								[
									'Blinking blue',
									'Syncing with the network.',
									'Allow boot/sync. Quantum says if this continues longer than 10 minutes, further help is required; for field work follow current technician procedure.',
								],
								[
									'Solid blue',
									'Network sync complete; SmartNID ready for use.',
									'Continue setup/activation checks if service is not yet green/usable.',
								],
								[
									'Solid red',
									'Hardware test during boot-up.',
									'Observe boot progression. A persistent/final failure state needs current troubleshooting procedure.',
								],
								[
									'Blinking red',
									'Failed hardware test or service failure.',
									'Do not jump to Wi-Fi. Isolate SmartNID/service cause and follow technician escalation/replacement rules.',
								],
								[
									'Amber / orange',
									'Account action required to enable access.',
									'Think account/activation state rather than damaged Wi-Fi hardware; follow current provisioning/account workflow.',
								],
								[
									'Blinking orange + green',
									'Remote firmware update in progress.',
									'Do not interrupt an expected update unless current procedure directs otherwise.',
								],
								[
									'Solid white',
									'Transparent bridge mode; rare/manual advanced setting.',
									'Recognize this as a configured mode, not the normal green online state.',
								],
								[
									'Off',
									'No power / unplugged.',
									'Verify the power connection and outlet first. Do not troubleshoot fiber until power is established. If power is known-good and the unit remains off, follow the current hardware/escalation procedure.',
								],
							],
							termColumn: 0,
						},
						{
							type: 'links',
							items: [
								{
									label:
										'Official SmartNID light guide ↗',
									href:
										'https://www.quantumfiber.com/support/equipment/troubleshooting/smartnid-light-guide.html',
								},
								{
									label:
										'Official Q1000K guide ↗',
									href:
										'https://www.quantumfiber.com/support/equipment/user-guides/q1000k-smartnid.html',
								},
							],
						},
					],
				},
				{
					id: 'wifi-pod-status',
					title:
						'W1700K / W1701K light',
					subtitle:
						'Wi-Fi 7 pod state',
					blocks: [
						{
							type: 'images',
							items: [
								{
									src:
										w1700kImage,
									alt: 'W1700K',
								},
								{
									src:
										w1701kImage,
									alt: 'W1701K',
								},
							],
						},
						{
							type: 'table',
							headers: [
								'Observed state',
								'Meaning / direction',
							],
							rows: [
								[
									'Solid green',
									'Online. If the customer still has a problem, isolate Wi-Fi coverage versus one-device trouble.',
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
									text:
										'Quantum documentation is not perfectly consistent about an unlit pod during normal operation. Use the current app/status procedure along with the light state rather than treating “off” alone as proof of failure.',
								},
							],
						},
					],
				},
			],
		},

		{
			id: 'ethernet-handoff',
			title:
				'Q1000K is healthy but customer still has no service',
			cards: [
				{
					id: 'check-handoff',
					title:
						'Check Ethernet handoff',
					subtitle:
						'Move downstream',
					blocks: [
						{
							type: 'images',
							items: [
								{
									src:
										q1000kBottomImage,
									alt:
										'Q1000K ports',
								},
								{
									src:
										w1700kBottomImage,
									alt:
										'W1700K ports',
								},
							],
						},
						{
							type: 'path',
							text:
								'Q1000K 10G LAN → Ethernet → W1700K 10G WAN/LAN1',
						},
						{
							type: 'steps',
							items: [
								[
									{
										text:
											'Confirm the Ethernet cable is fully seated at both ends.',
									},
								],
								[
									{
										text:
											'Confirm the cable is in the intended Q1000K/W1700K ports.',
									},
								],
								[
									{
										text:
											'If available under current procedure, test or substitute the Ethernet cable.',
									},
								],
								[
									{
										text:
											'If the handoff is good, continue to W1700K state and Wi-Fi.',
									},
								],
							],
						},
					],
				},
			],
		},

		{
			id: 'wifi-problem',
			title: 'Wi-Fi problem',
			cards: [
				{
					id: 'all-devices',
					title:
						'All Wi-Fi devices affected',
					blocks: [
						{
							type: 'steps',
							items: [
								[
									{
										text:
											'First confirm the ',
									},
									{
										strong: true,
										text:
											'Q1000K is healthy',
									},
									{
										text: '.',
									},
								],
								[
									{
										text:
											'Confirm Ethernet handoff from Q1000K to the wired W1700K.',
									},
								],
								[
									{
										text:
											'Check the W1700K status and power.',
									},
								],
								[
									{
										text:
											'Confirm the expected SSID is broadcasting.',
									},
								],
								[
									{
										text:
											'If service exists near the pod but not in other areas, treat it as a coverage / placement problem rather than an optical problem.',
									},
								],
							],
						},
					],
				},
				{
					id: 'one-device',
					title:
						'Only one customer device affected',
					blocks: [
						{
							type: 'steps',
							items: [
								[
									{
										text:
											'Verify another device works on the same Wi-Fi.',
									},
								],
								[
									{
										text:
											'Confirm the affected device is using the correct SSID and password.',
									},
								],
								[
									{
										text:
											'Forget/rejoin the network if appropriate.',
									},
								],
								[
									{
										text:
											'Check device-specific settings or software before changing the fiber/network side.',
									},
								],
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
										' One bad client with other clients working is strong evidence against a whole-network fiber outage.',
								},
							],
						},
					],
				},
				{
					id: 'weak-wifi',
					title:
						'Weak Wi-Fi / dead area',
					subtitle:
						'Coverage problem',
					blocks: [
						{
							type: 'steps',
							items: [
								[
									{
										text:
											'Verify internet works near the primary W1700K first.',
									},
								],
								[
									{
										text:
											'Compare performance at the problem location.',
									},
								],
								[
									{
										text:
											'Look for poor pod placement, distance, floors, dense walls, metal or other obstructions.',
									},
								],
								[
									{
										text:
											'Use W1701K/additional pod placement only under the current supported design and workflow.',
									},
								],
							],
						},
					],
				},
			],
		},

		{
			id: 'optical',
			title:
				'Optical reading is bad or unstable',
			cards: [
				{
					id: 'opm-reading',
					title:
						'OPM reading outside current standard',
					subtitle:
						'Stay on the fiber path',
					blocks: [
						{
							type: 'images',
							items: [
								{
									src:
										opmFieldImage,
									alt:
										'Optical power meter',
								},
							],
						},
						{
							type: 'steps',
							items: [
								[
									{
										text:
											'Confirm the meter is configured for the correct wavelength / test condition required by current procedure.',
									},
								],
								[
									{
										text:
											'Inspect and clean the connector/end face using the approved process.',
									},
								],
								[
									{
										text:
											'Reseat and retest.',
									},
								],
								[
									{
										text:
											'If still bad, isolate backward through the customer drop toward the MST/OSP.',
									},
								],
								[
									{
										text:
											'Use the current GridSource / Quantum acceptance range. Do not invent a threshold.',
									},
								],
							],
						},
					],
				},
				{
					id: 'drop-damage',
					title:
						'Suspect drop damage',
					subtitle:
						'ASW / BSW / connector path',
					blocks: [
						{
							type: 'steps',
							items: [
								[
									{
										text:
											'Inspect the accessible route for obvious kinks, crushing, severe bends, damaged jacket, exposed cable or disturbed hardware.',
									},
								],
								[
									{
										text:
											'Check the customer-side connector and test setup before condemning the span.',
									},
								],
								[
									{
										text:
											'Use VFL/OTDR only when appropriate to the current procedure and fault question.',
									},
								],
								[
									{
										text:
											'Repair/replace/escalate according to the current field standard once the bad segment is isolated.',
									},
								],
							],
						},
					],
				},
			],
		},

		{
			id: 'fiber-test-tool',
			title:
				'Which fiber test tool should I use?',
			cards: [
				{
					id: 'tool-decision',
					title: 'Tool decision',
					blocks: [
						{
							type: 'tools',
							items: [
								{
									src:
										opmFieldImage,
									alt:
										'Optical power meter',
									title: 'OPM',
									content: [
										{
											text:
												'Use when the question is: ',
										},
										{
											strong: true,
											text:
												'How much optical power is here?',
										},
									],
								},
								{
									src:
										vflImage,
									alt:
										'Visual fault locator',
									title: 'VFL',
									content: [
										{
											text:
												'Use when visible red light can help identify a fiber or expose a nearby continuity/bend problem.',
										},
									],
								},
								{
									src:
										otdrFieldImage,
									alt: 'OTDR',
									title: 'OTDR',
									content: [
										{
											text:
												'Use when the question is: ',
										},
										{
											strong: true,
											text:
												'Where along the fiber is the event?',
										},
									],
								},
							],
						},
					],
				},
			],
		},

		{
			id: 'symptom-table',
			title:
				'Common symptom → first place to look',
			blocks: [
				{
					type: 'table',
					headers: [
						'Symptom',
						'Start at',
						'Then',
					],
					rows: [
						[
							'Nothing powered',
							'Power',
							'Outlet / adapters / equipment power',
						],
						[
							'Q1000K off',
							'Q1000K power',
							'Do not troubleshoot Wi-Fi first',
						],
						[
							'Q1000K not healthy',
							'SmartNID / optical service',
							'Fiber path / activation / device state',
						],
						[
							'Q1000K green, W1700K bad',
							'Ethernet handoff',
							'W1700K power/state',
						],
						[
							'Network good, all Wi-Fi poor',
							'W1700K / coverage',
							'Placement / supported additional pod',
						],
						[
							'Everything works except one device',
							'Client device',
							'SSID/password/device settings/local issue',
						],
						[
							'Optical reading outside current standard',
							'Fiber path',
							'Connector/drop/MST/OSP isolation',
						],
					],
				},
			],
		},

		{
			id: 'confirm-diagnosis',
			title:
				'Confirm the diagnosis before you act',
			blocks: [
				{
					type: 'steps',
					items: [
						[
							{
								strong: true,
								text:
									'Find the first failed layer.',
							},
							{
								text:
									' Start at power and the fiber path, then move downstream through Q1000K, Ethernet, W1700K, Wi-Fi and finally the customer device.',
							},
						],
						[
							{
								strong: true,
								text:
									'Prove the basics before blaming equipment.',
							},
							{
								text:
									' Verify power, connector seating and cleanliness, the test setup, and the current approved optical requirement.',
							},
						],
						[
							{
								strong: true,
								text:
									'Keep the fault domain separated.',
							},
							{
								text:
									' A fiber problem is not a Wi-Fi problem, and one failing customer device is not automatically a whole-network problem.',
							},
						],
						[
							{
								strong: true,
								text:
									'Repair or escalate only what you can demonstrate.',
							},
							{
								text:
									' Record the readings, photos and notes required by the current job workflow, then follow the current repair, replacement or escalation procedure for the failed layer.',
							},
						],
					],
				},
				{
					type: 'callout',
					style: 'note',
					content: [
						{
							strong: true,
							text:
								'GENERAL FIBER KNOWLEDGE:',
						},
						{
							text:
								' Troubleshooting is isolation. Start broad, prove each layer, and stop at the first failure you can demonstrate. Then test around that failure until the fault domain is small enough to repair or escalate.',
						},
					],
				},
			],
		},
	] satisfies TroubleshootingSection[],
} as const