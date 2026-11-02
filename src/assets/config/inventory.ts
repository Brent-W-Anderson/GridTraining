import aerialServiceLoopsImage from '../images/aerial-service-loops.jpg'
import bswTrenchImage from '../images/bsw-trench.jpg'
import cableClipsImage from '../images/cable-clips.jpg'
import caulkGunImage from '../images/caulk-gun.jpg'
import drillDriverImage from '../images/drill-driver.jpg'
import dropCableStripperImage from '../images/drop-cable-stripper.jpg'
import ethernetCableTesterImage from '../images/ethernet-cable-tester.jpg'
import ethernetRj45Image from '../images/ethernet-rj45.jpg'
import extensionLadderImage from '../images/extension-ladder.jpg'
import fiberCleaverImage from '../images/fiber-cleaver.png'
import fiberCleaningWipesImage from '../images/fiber-cleaning-wipes.png'
import fiberInspectionScopeImage from '../images/fiber-inspection-scope.jpg'
import fiberShardContainerImage from '../images/fiber-shard-container.jpg'
import fiberStripperImage from '../images/fiber-stripper.jpg'
import fishTapeImage from '../images/fish-tape.jpg'
import fusionSplicerImage from '../images/fusion-splicer.webp'
import kevlarScissorsImage from '../images/kevlar-scissors.png'
import mstProductImage from '../images/mst-product.jpg'
import oneClickCleanerImage from '../images/one-click-cleaner.jpg'
import opticalLightSourceImage from '../images/optical-light-source.jpg'
import opmFieldImage from '../images/opm-field.jpg'
import otdrFieldImage from '../images/otdr-field.jpg'
import q1000kImage from '../images/q1000k.png'
import rj45CrimperImage from '../images/rj45-crimper.jpg'
import scApcConnectorImage from '../images/sc-apc-connector.jpg'
import scApcCouplerImage from '../images/sc-apc-coupler.jpg'
import scApcPatchCordImage from '../images/sc-apc-patch-cord.jpg'
import vflImage from '../images/vfl.jpg'
import w1700kImage from '../images/w1700k.png'
import w1701kImage from '../images/w1701k.png'

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
						opmFieldImage,
					alt:
						'Optical power meter',
				},
				{
					name:
						'Visual Fault Locator (VFL)',
					description:
						'Red-light tool for tracing fiber and finding visible faults.',
					image:
						vflImage,
					alt:
						'Visual fault locator',
				},
				{
					name:
						'OTDR',
					description:
						'Locates and characterizes loss events along a fiber.',
					image:
						otdrFieldImage,
					alt:
						'OTDR',
				},
				{
					name:
						'Optical Light Source',
					description:
						'Known light source used with a power meter for loss testing.',
					image:
						opticalLightSourceImage,
					alt:
						'Optical light source',
				},
				{
					name:
						'Fiber Inspection Scope',
					description:
						'Shows dirt or damage on connector end faces.',
					image:
						fiberInspectionScopeImage,
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
						fiberCleaverImage,
					alt:
						'Fiber cleaver',
				},
				{
					name:
						'Fiber Stripper',
					description:
						'Removes fiber coating or buffer without damaging the glass.',
					image:
						fiberStripperImage,
					alt:
						'Fiber optic stripper',
				},
				{
					name:
						'Drop Cable Stripper',
					description:
						'Opens and prepares FTTH drop cable.',
					image:
						dropCableStripperImage,
					alt:
						'FTTH drop cable stripper',
				},
				{
					name:
						'Kevlar Scissors',
					description:
						'Cuts aramid or Kevlar strength yarn in fiber cable.',
					image:
						kevlarScissorsImage,
					alt:
						'Fiber optic Kevlar scissors',
				},
				{
					name:
						'2.5 mm One-Click Cleaner',
					description:
						'Cleans SC connector ferrules and compatible adapters.',
					image:
						oneClickCleanerImage,
					alt:
						'2.5 millimeter one-click fiber cleaner',
				},
				{
					name:
						'Lint-Free Fiber Wipes',
					description:
						'Cleans prepared fiber and connector surfaces.',
					image:
						fiberCleaningWipesImage,
					alt:
						'Lint-free fiber optic cleaning wipes',
				},
				{
					name:
						'Fiber Shard Container',
					description:
						'Safe disposal for cleaved glass-fiber scraps.',
					image:
						fiberShardContainerImage,
					alt:
						'Fiber optic shard disposal container',
				},
				{
					name:
						'Fusion Splicer · if issued',
					description:
						'Joins prepared fiber by fusion when the job requires splicing.',
					image:
						fusionSplicerImage,
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
						scApcConnectorImage,
					alt:
						'SC APC connector',
				},
				{
					name:
						'SC/APC Patch Cord',
					description:
						'Short fiber jumper between compatible optical points.',
					image:
						scApcPatchCordImage,
					alt:
						'SC APC fiber patch cord',
				},
				{
					name:
						'SC/APC Coupler / Adapter',
					description:
						'Joins two compatible SC/APC connectors.',
					image:
						scApcCouplerImage,
					alt:
						'SC APC fiber coupler',
				},
				{
					name:
						'ASW Fiber Drop',
					description:
						'Aerial service drop toward the customer.',
					image:
						aerialServiceLoopsImage,
					alt:
						'Aerial fiber drop',
				},
				{
					name:
						'BSW Fiber Drop',
					description:
						'Buried service drop toward the customer.',
					image:
						bswTrenchImage,
					alt:
						'Buried fiber drop',
				},
				{
					name:
						'MST / Service Terminal',
					description:
						'Serving terminal where customer drops connect to the distribution network.',
					image:
						mstProductImage,
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
						q1000kImage,
					alt:
						'Q1000K SmartNID',
				},
				{
					name:
						'W1700K',
					description:
						'Primary Quantum Wi-Fi 7 unit.',
					image:
						w1700kImage,
					alt:
						'W1700K Wi-Fi 7 unit',
				},
				{
					name:
						'W1701K',
					description:
						'Additional Quantum Wi-Fi 7 unit.',
					image:
						w1701kImage,
					alt:
						'W1701K Wi-Fi 7 unit',
				},
				{
					name:
						'Ethernet Cable / Patch Cord',
					description:
						'Copper network connection between equipment.',
					image:
						ethernetRj45Image,
					alt:
						'Ethernet cable',
				},
				{
					name:
						'RJ45 Crimper',
					description:
						'Terminates modular Ethernet plugs when field termination is used.',
					image:
						rj45CrimperImage,
					alt:
						'RJ45 crimper',
				},
				{
					name:
						'Ethernet Cable Tester',
					description:
						'Checks basic continuity and wire map.',
					image:
						ethernetCableTesterImage,
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
						drillDriverImage,
					alt:
						'Cordless drill driver',
				},
				{
					name:
						'Fish Tape / Fish Rods',
					description:
						'Routes cable through walls, conduit and other spaces.',
					image:
						fishTapeImage,
					alt:
						'Fish tape',
				},
				{
					name:
						'Extension Ladder',
					description:
						'Access for exterior and aerial work.',
					image:
						extensionLadderImage,
					alt:
						'Fiberglass extension ladder',
				},
				{
					name:
						'Caulk Gun / Approved Sealant',
					description:
						'Seals approved exterior or wall-entry penetrations.',
					image:
						caulkGunImage,
					alt:
						'Caulk gun',
				},
				{
					name:
						'Cable Clips / Fasteners',
					description:
						'Secures cable along an approved route.',
					image:
						cableClipsImage,
					alt:
						'Cable clips and fasteners',
				},
			],
		},
	] satisfies InventorySection[],
} as const