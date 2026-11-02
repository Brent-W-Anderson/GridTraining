import aerialOspImage from '../images/aerial-osp.jpg'
import aerialServiceLoopsImage from '../images/aerial-service-loops.jpg'
import aerialSpliceClosureImage from '../images/aerial-splice-closure.jpg'
import aerialTerminalFieldImage from '../images/aerial-terminal-field.jpg'
import apcConnectorsImage from '../images/apc-connectors.jpg'
import bswTrenchImage from '../images/bsw-trench.jpg'
import dbLossImage from '../images/db-loss.jpg'
import dbmPowerImage from '../images/dbm-power.jpg'
import ethernetRj45Image from '../images/ethernet-rj45.jpg'
import gponOltImage from '../images/gpon-olt.jpg'
import gpsFieldImage from '../images/gps-field.webp'
import mstProductImage from '../images/mst-product.jpg'
import oltRackImage from '../images/olt-rack.jpg'
import opmFieldImage from '../images/opm-field.jpg'
import otdrFieldImage from '../images/otdr-field.jpg'
import pedestalFtthImage from '../images/pedestal-ftth.jpg'
import ponSplitterImage from '../images/pon-splitter.png'
import q1000kBottomImage from '../images/q1000k-bottom.png'
import q1000kImage from '../images/q1000k.png'
import scApcConnectorImage from '../images/sc-apc-connector.jpg'
import vflImage from '../images/vfl.jpg'
import w1700kBottomImage from '../images/w1700k-bottom.png'
import w1700kImage from '../images/w1700k.png'

export type Acronym = {
	key: string
	full: string
	category: string
	image: string
	meaning: string
	field: string
}

export type AcronymCategory = {
	id: string
	title: string
	items: Acronym[]
}

const acronyms: Acronym[] = [
	{
		key: 'OSP',
		full: 'Outside Plant',
		category: 'Network architecture and fiber plant',
		image: aerialOspImage,
		meaning:
			'The fiber, terminals, closures, handholes, pedestals, poles, conduit, and related network infrastructure outside the customer premises.',
		field:
			'You are in OSP whenever you are tracing, installing, testing, or repairing the outside path toward the customer.',
	},
	{
		key: 'FTTH',
		full: 'Fiber to the Home',
		category: 'Network architecture and fiber plant',
		image: pedestalFtthImage,
		meaning:
			'A network design that carries optical fiber all the way to a residence instead of stopping at an older copper or coax handoff.',
		field:
			'The drop and customer optical terminal complete the fiber path into the premises.',
	},
	{
		key: 'ODN',
		full: 'Optical Distribution Network',
		category: 'Network architecture and fiber plant',
		image: aerialSpliceClosureImage,
		meaning:
			'The passive optical path between provider-side optical equipment and customer-side optical termination.',
		field:
			'Think fiber, splitters, terminals, connectors, closures, and the physical path between OLT and ONT.',
	},
	{
		key: 'PON',
		full: 'Passive Optical Network',
		category: 'Passive optical technologies',
		image: ponSplitterImage,
		meaning:
			'A fiber architecture that uses passive optical components through the distribution path rather than powered electronics at every intermediate point.',
		field:
			'GPON and XGS-PON are PON technologies you may encounter.',
	},
	{
		key: 'OLT',
		full: 'Optical Line Terminal',
		category: 'Network architecture and fiber plant',
		image: oltRackImage,
		meaning:
			'Provider-side equipment that originates and manages the passive optical network connection.',
		field:
			'It is the upstream optical endpoint feeding the outside fiber plant toward customer ONTs.',
	},
	{
		key: 'ONT',
		full: 'Optical Network Terminal',
		category: 'Network architecture and fiber plant',
		image: q1000kImage,
		meaning:
			'Customer-side equipment that terminates the optical connection and provides an electrical network handoff.',
		field:
			'The Q1000K SmartNID used in this guide incorporates the ONT function.',
	},
	{
		key: 'MST',
		full: 'Multiport Service Terminal',
		category: 'Network architecture and fiber plant',
		image: mstProductImage,
		meaning:
			'A field terminal with multiple service ports used to connect individual customer drops into the distribution network.',
		field:
			'It may be aerial or buried depending on the network build.',
	},
	{
		key: 'ASW',
		full: 'Aerial Service Wire',
		category: 'Customer drop',
		image: aerialServiceLoopsImage,
		meaning:
			'The customer service drop routed aerially from serving infrastructure toward the premises.',
		field:
			'Follow current attachment, clearance, routing, and safety requirements rather than assuming a universal standard.',
	},
	{
		key: 'BSW',
		full: 'Buried Service Wire',
		category: 'Customer drop',
		image: bswTrenchImage,
		meaning:
			'The customer service drop intended for a buried route between serving infrastructure and the premises.',
		field:
			'Locate, excavation, depth, and clearance requirements must follow the assigned workflow and local rules.',
	},
	{
		key: 'FSA',
		full: 'Fiber Serving Area',
		category: 'Network architecture and fiber plant',
		image: pedestalFtthImage,
		meaning:
			'A defined geographic or network serving area associated with a group of fiber customers and distribution facilities.',
		field:
			'Use assigned network records for exact boundaries and naming.',
	},
	{
		key: 'FSAI',
		full: 'Fiber Serving Area Interface',
		category: 'Network architecture and fiber plant',
		image: aerialTerminalFieldImage,
		meaning:
			'A serving-area interface point used in fiber distribution terminology.',
		field:
			'Its exact physical form and labeling can vary; identify it from the job records rather than assuming a specific enclosure.',
	},
	{
		key: 'GPON',
		full: 'Gigabit-capable Passive Optical Network',
		category: 'Passive optical technologies',
		image: gponOltImage,
		meaning:
			'A passive optical network technology used to deliver fiber service.',
		field:
			'The Q1000K supports GPON as well as XGS-PON.',
	},
	{
		key: 'XGS-PON',
		full: '10-Gigabit Symmetric Passive Optical Network',
		category: 'Passive optical technologies',
		image: q1000kBottomImage,
		meaning:
			'A higher-capacity PON technology designed for symmetric multi-gigabit service.',
		field:
			'The Q1000K supports XGS-PON; verify the serving network and assigned procedure rather than guessing technology from speed alone.',
	},
	{
		key: 'SC',
		full: 'SC fiber connector format',
		category: 'Fiber connectors and optical measurements',
		image: scApcConnectorImage,
		meaning:
			'The rectangular push-pull fiber connector format used for the optical connection discussed in this guide.',
		field:
			'SC identifies connector format; polish such as APC is a separate property.',
	},
	{
		key: 'APC',
		full: 'Angled Physical Contact',
		category: 'Fiber connectors and optical measurements',
		image: apcConnectorsImage,
		meaning:
			'A fiber connector end-face polish with an angled mating surface intended to reduce optical reflections.',
		field:
			'Commonly encountered here as SC/APC. Keep connectors clean and do not casually mix polish types.',
	},
	{
		key: 'OPM',
		full: 'Optical Power Meter',
		category: 'Fiber connectors and optical measurements',
		image: opmFieldImage,
		meaning:
			'A test instrument used to measure received optical power.',
		field:
			'Use the approved wavelength and company acceptance limits; this guide does not invent pass/fail thresholds.',
	},
	{
		key: 'VFL',
		full: 'Visual Fault Locator',
		category: 'Fiber connectors and optical measurements',
		image: vflImage,
		meaning:
			'A visible-light fiber tool used for continuity checks and for locating certain breaks, severe bends, or incorrect paths.',
		field:
			'Use it only where appropriate and never look directly into an active fiber or optical source.',
	},
	{
		key: 'OTDR',
		full: 'Optical Time-Domain Reflectometer',
		category: 'Fiber connectors and optical measurements',
		image: otdrFieldImage,
		meaning:
			'A diagnostic instrument that sends optical pulses into fiber and analyzes reflections and loss events along the route.',
		field:
			'It can help estimate event locations and characterize a fiber path.',
	},
	{
		key: 'dB',
		full: 'decibel',
		category: 'Fiber connectors and optical measurements',
		image: dbLossImage,
		meaning:
			'A relative logarithmic measurement used to describe gain or loss.',
		field:
			'In fiber work, use dB when discussing relative loss through a component or path.',
	},
	{
		key: 'dBm',
		full: 'decibel-milliwatts',
		category: 'Fiber connectors and optical measurements',
		image: dbmPowerImage,
		meaning:
			'An absolute logarithmic power level referenced to one milliwatt.',
		field:
			'Optical power meters commonly report received optical power in dBm; do not confuse it with relative dB loss.',
	},
	{
		key: 'LAN',
		full: 'Local Area Network',
		category: 'Ethernet, Wi-Fi and customer networking',
		image: ethernetRj45Image,
		meaning:
			'The customer-side local network.',
		field:
			'LAN ports provide Ethernet connectivity toward customer networking equipment. LAN1 is a numbered LAN port, not a separate acronym.',
	},
	{
		key: 'WAN',
		full: 'Wide Area Network',
		category: 'Ethernet, Wi-Fi and customer networking',
		image: w1700kBottomImage,
		meaning:
			'The upstream network side of a router or gateway.',
		field:
			'On the primary Wi-Fi pod, think of WAN as the side facing the SmartNID/provider service.',
	},
	{
		key: 'SSID',
		full: 'Service Set Identifier',
		category: 'Ethernet, Wi-Fi and customer networking',
		image: w1700kImage,
		meaning:
			'The Wi-Fi network name that customer devices see when choosing a wireless network.',
		field:
			'During verification, confirm the expected customer network is available and devices can connect.',
	},
	{
		key: 'GPS',
		full: 'Global Positioning System',
		category: 'Field workflow and location',
		image: gpsFieldImage,
		meaning:
			'Satellite-based positioning used by phones and mapping tools to determine location.',
		field:
			'Latitude and longitude can document serving points, routes, and job locations.',
	},
	{
		key: 'SOP',
		full: 'Standard Operating Procedure',
		category: 'Field workflow and location',
		image: aerialTerminalFieldImage,
		meaning:
			'A defined procedure for performing work consistently and safely.',
		field:
			'When an approved company SOP exists, follow it instead of generic assumptions in this guide.',
	},
]

const categoryIds: Record<string, string> = {
	'Network architecture and fiber plant':
		'network-architecture',
	'Passive optical technologies':
		'passive-optical',
	'Customer drop':
		'customer-drop',
	'Fiber connectors and optical measurements':
		'fiber-connectors-measurements',
	'Ethernet, Wi-Fi and customer networking':
		'customer-networking',
	'Field workflow and location':
		'field-workflow',
}

export const acronymContent = {
	title: 'Acronym Reference',

	subtitle:
		'One authoritative, no-duplicate reference for acronyms used throughout this training app. The acronym, expansion, explanation, image assignment, and field note all have one owner in this config.',

	tip: {
		label: 'FIELD TIP:',
		text:
			'Start with the acronym, connect it to the physical part of the network in the image, then read why it matters in the field.',
	},

	fieldLabel: 'Why you care: ',

	note: {
		label: 'Not treated as acronyms:',
		text:
			'equipment/model identifiers such as Q1000K, W1700K, and W1701K stay in their equipment sections. LAN1 is a numbered LAN port and is covered under LAN.',
	},

	categories: Object.entries(
		acronyms.reduce<Record<string, Acronym[]>>(
			(groups, acronym) => {
				;(groups[acronym.category] ??= []).push(acronym)

				return groups
			},
			{},
		),
	).map(([title, items]) => ({
		id:
			categoryIds[title] ??
			title
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/^-|-$/g, ''),
		title,
		items,
	})) satisfies AcronymCategory[],
} as const

export function getAcronym(key: string) {
	const normalizedKey =
		key.trim().toLowerCase()

	return (
		acronyms.find(
			acronym =>
				acronym.key.toLowerCase() === normalizedKey,
		) ?? null
	)
}