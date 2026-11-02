import aerialOspImage from '../images/aerial-osp.jpg'
import aerialPoleClosureImage from '../images/aerial-pole-closure.jpg'
import aerialServiceLoopsImage from '../images/aerial-service-loops.jpg'
import aerialSpliceClosureImage from '../images/aerial-splice-closure.jpg'
import aerialTerminalFieldImage from '../images/aerial-terminal-field.jpg'
import mstProductImage from '../images/mst-product.jpg'
import ospHandholeImage from '../images/osp-handhole.jpg'
import pedestalFtthImage from '../images/pedestal-ftth.jpg'

export type RoleText = {
	type: 'text'
	text: string
}

export type RoleStrongText = {
	type: 'strong-text'
	strong: string
	text: string
}

export type RoleCallout = {
	type: 'callout'
	style: 'note' | 'warn' | 'tip' | 'danger'
	strong: string
	text: string
}

export type RoleChecklist = {
	type: 'checklist'
	items: string[]
}

export type RoleImageCard = {
	src: string
	alt: string
	title: string
	text: string
}

export type RoleImageGrid = {
	type: 'image-grid'
	items: RoleImageCard[]
}

export type RoleTable = {
	type: 'table'
	headers: string[]
	rows: string[][]
	termColumn?: number
}

export type RoleBlock =
	| RoleText
	| RoleStrongText
	| RoleCallout
	| RoleChecklist
	| RoleImageGrid
	| RoleTable

export type RoleSection = {
	id: string
	title: string
	blocks: RoleBlock[]
}

export const roleContent = {
	title: 'Role & Network Overview',

	path:
		'OLT → feeder / distribution network → MST → ASW or BSW customer drop → Q1000K SmartNID → Ethernet → W1700K → customer devices',

	subtitle:
		'What you are responsible for, what each part of the network does, and how the customer path fits together.',

	imageMissingText: 'Image missing.',

	sections: [
		{
			id: 'job',
			title: 'Your job in plain English',
			blocks: [
				{
					type: 'text',
					text:
						'A Fiber Installation & Repair technician works the last part of the provider network and the customer handoff. Your goal is to identify the assigned serving point, get a healthy optical path to the customer, install or repair the customer-side equipment, prove service, and document the work.',
				},
				{
					type: 'checklist',
					items: [
						'Identify the correct serving terminal and assigned port.',
						'Route or verify the customer drop safely and cleanly.',
						'Protect fiber bend radius and connectors.',
						'Verify optical service before chasing Wi-Fi symptoms.',
						'Bring the SmartNID and Wi-Fi layer online.',
						'Capture required readings, photos, sketches and notes.',
					],
				},
			],
		},
		{
			id: 'osp',
			title: 'Outside Plant (OSP)',
			blocks: [
				{
					type: 'strong-text',
					strong: 'OSP = Outside Plant.',
					text:
						'It is the telecommunications infrastructure outside buildings: aerial and buried fiber, poles, conduit, handholes/vaults, pedestals, splice closures, terminals, slack storage and passive distribution hardware.',
				},
				{
					type: 'image-grid',
					items: [
						{
							src: ospHandholeImage,
							alt: 'Fiber handhole',
							title: 'Underground handhole',
							text:
								'Below-grade access. Expect cable, slack, conduit and enclosures—not a clean showroom layout.',
						},
						{
							src: aerialOspImage,
							alt: 'Aerial fiber OSP',
							title: 'Aerial OSP',
							text:
								'Fiber plant on utility poles. Learn to notice telecom-space cable, stored slack, terminals and closures.',
						},
						{
							src: pedestalFtthImage,
							alt: 'Fiber pedestal',
							title: 'Pedestal',
							text:
								'Ground-level protection/access for fiber hardware. What is inside varies with network design.',
						},
						{
							src: aerialSpliceClosureImage,
							alt: 'Aerial splice closure',
							title: 'Splice closure',
							text:
								'Sealed enclosure protecting fiber splices. A closure is not automatically an MST.',
						},
					],
				},
				{
					type: 'callout',
					style: 'tip',
					strong: 'FIELD TIP:',
					text:
						'“OSP problem” means think outdoor network path first. Do not start by swapping customer Wi-Fi hardware.',
				},
			],
		},
		{
			id: 'mst',
			title: 'MST — Multiport Service Terminal',
			blocks: [
				{
					type: 'text',
					text:
						'The MST is a hardened subscriber-drop terminal in the outside plant. Distribution fiber feeds the serving infrastructure and customer drops connect at assigned terminal ports. MST housings, port counts and mounting methods vary.',
				},
				{
					type: 'image-grid',
					items: [
						{
							src: mstProductImage,
							alt: 'MST product',
							title: 'Clean MST example',
							text:
								'Use this to recognize the enclosure and hardened subscriber ports.',
						},
						{
							src: aerialTerminalFieldImage,
							alt: 'Aerial FTTH terminal',
							title: 'Aerial multiport terminal in service',
							text:
								'A real FTTH field example. It teaches visual recognition; it is not claimed to be the exact model on every Quantum job.',
						},
						{
							src: aerialServiceLoopsImage,
							alt: 'Aerial service loops',
							title: 'Stored slack / service loops',
							text:
								'Real aerial plant often has stored cable near closures and terminals.',
						},
						{
							src: aerialPoleClosureImage,
							alt: 'Pole fiber hardware',
							title: 'Pole-mounted hardware',
							text:
								'Learn the whole scene: enclosure, slack and cables entering/leaving.',
						},
					],
				},
				{
					type: 'table',
					headers: ['Mounting', 'What to picture', 'Why you care'],
					termColumn: 0,
					rows: [
						[
							'Handhole',
							'Terminal below grade in an access enclosure.',
							'Identify the correct hardware among slack and other plant.',
						],
						[
							'Pedestal',
							'Terminal protected at ground level.',
							'Drop may enter/leave at grade.',
						],
						[
							'Pole',
							'Terminal mounted directly on a pole.',
							'Common aerial access situation.',
						],
						[
							'Strand',
							'Terminal supported from aerial strand.',
							'Not every aerial terminal is bolted to the pole.',
						],
					],
				},
				{
					type: 'callout',
					style: 'warn',
					strong: 'COMPANY / QUANTUM REQUIREMENT:',
					text:
						'Use the assigned serving terminal and port from the current work system. An open port is not automatically yours.',
				},
			],
		},
		{
			id: 'customer-drop',
			title: 'ASW and BSW — the customer drop',
			blocks: [
				{
					type: 'table',
					headers: ['Term', 'Full name', 'What it means'],
					termColumn: 0,
					rows: [
						[
							'ASW',
							'Aerial Service Wire',
							'Customer service drop is routed overhead from the serving plant toward the premise.',
						],
						[
							'BSW',
							'Buried Service Wire',
							'Customer service drop is routed underground toward the premise.',
						],
					],
				},
				{
					type: 'image-grid',
					items: [
						{
							src: aerialOspImage,
							alt: 'Aerial route',
							title: 'ASW mindset',
							text:
								'Trace the aerial path from serving terminal toward the customer. Watch routing, attachment, sag/clearance and bend radius under the current SOP.',
						},
						{
							src: ospHandholeImage,
							alt: 'Underground route',
							title: 'BSW mindset',
							text:
								'Trace the underground path from serving point toward the house. Route, locate/dig process, depth and protection are controlled by current local/company standards.',
						},
					],
				},
				{
					type: 'strong-text',
					strong: 'For BSW:',
					text:
						'your company process includes route/sketch information and a dig/locate workflow. A useful sketch normally makes the serving point, customer premise, proposed route, distances/direction and major obstacles/landmarks understandable—but use the actual GridSource/Quantum symbols and submission process you are trained on.',
				},
				{
					type: 'callout',
					style: 'danger',
					strong: 'DO NOT GUESS:',
					text:
						'burial depth, utility clearances, aerial clearances, attachment hardware, sketch symbols, locate procedure and whether a route is direct-buried or in conduit. Those are current SOP / local-rule items.',
				},
			],
		},
		{
			id: 'olt-odn-ont',
			title: 'OLT, ODN and ONT',
			blocks: [
				{
					type: 'table',
					headers: ['Term', 'Full name', 'Job'],
					termColumn: 0,
					rows: [
						[
							'OLT',
							'Optical Line Terminal',
							'Provider-side active equipment that serves the passive optical network.',
						],
						[
							'ODN',
							'Optical Distribution Network',
							'The passive path between provider equipment and customer termination: fiber, splitters, terminals, closures and connectors.',
						],
						[
							'ONT',
							'Optical Network Terminal',
							'Customer-side optical termination function. The Q1000K SmartNID incorporates this function.',
						],
					],
				},
				{
					type: 'callout',
					style: 'note',
					strong: 'GENERAL FIBER KNOWLEDGE:',
					text:
						'ODN is a network path, not one box. MST is a terminal role, not a guarantee that a particular enclosure contains a splitter.',
				},
			],
		},
	] satisfies RoleSection[],
} as const