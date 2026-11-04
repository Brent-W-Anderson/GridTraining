
import aerialOspImage from '../images/aerial-osp.jpg'
import aerialTerminalFieldImage from '../images/aerial-terminal-field.jpg'
import mstProductImage from '../images/mst-product.jpg'
import ospHandholeImage from '../images/osp-handhole.jpg'

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
		'OLT → FDH → Distribution Fiber → MST → Customer Drop → SmartNID / ONT → Gateway → Devices',

	subtitle:
		'Understand your job, the residential fiber network, and how to approach installations and repairs.',

	imageMissingText: 'Image missing.',

	sections: [
		{
			id: 'job',
			title: 'Your Role',
			blocks: [
				{
					type: 'strong-text',
					strong: 'Fiber Installation & Repair (I&R):',
					text:
						'Your job is to install, restore, and verify residential fiber service. That includes outside fiber connections, customer equipment, and basic home-network troubleshooting.',
				},
				{
					type: 'text',
					text:
						'As a GridSource technician, you work on AT&T and legacy Quantum Fiber infrastructure under the applicable contractor and provider procedures.',
				},
				{
					type: 'checklist',
					items: [
						'Verify the customer, work order, and assigned facilities.',
						'Identify and correct fiber connection problems within your authorized scope.',
						'Install or repair the customer drop and indoor equipment.',
						'Confirm optical service and internet connectivity.',
						'Help the customer understand their equipment and Wi-Fi coverage.',
						'Document the work, readings, and required photos.',
					],
				},
				{
					type: 'callout',
					style: 'tip',
					strong: 'FIELD TIP:',
					text:
						'A successful job means more than getting a green light. Verify that the customer can actually use the service.',
				},
			],
		},
		{
			id: 'network',
			title: 'The Fiber Network',
			blocks: [
				{
					type: 'text',
					text:
						'Fiber internet carries data using light. The signal travels from provider equipment through the outside fiber network to the customer’s home.',
				},
				{
					type: 'table',
					headers: [
						'Equipment',
						'What it does',
					],
					termColumn: 0,
					rows: [
						[
							'OLT',
							'Optical Line Terminal. Provider equipment that operates the passive optical network.',
						],
						[
							'FDH',
							'Fiber Distribution Hub. Cabinet used to organize splitter and distribution fiber connections.',
						],
						[
							'MST',
							'Multiport Service Terminal. Outside terminal where assigned customer drops connect.',
						],
						[
							'ASW / BSW',
							'Aerial Service Wire or Buried Service Wire. The customer fiber drop.',
						],
						[
							'ONT / SmartNID',
							'Terminates the optical connection at the customer premises.',
						],
						[
							'Gateway',
							'Connects the home network to the internet and provides routing, Ethernet, and often Wi-Fi.',
						],
					],
				},
				{
					type: 'strong-text',
					strong: 'Outside Plant (OSP):',
					text:
						'The outdoor infrastructure connecting the provider to customers, including aerial and buried cables, FDHs, terminals, handholes, pedestals, and splice closures.',
				},
				{
					type: 'image-grid',
					items: [
						{
							src: aerialOspImage,
							alt: 'Aerial fiber outside plant',
							title: 'Aerial Fiber',
							text:
								'Fiber cables and equipment installed along utility poles.',
						},
						{
							src: ospHandholeImage,
							alt: 'Underground fiber handhole',
							title: 'Underground Fiber',
							text:
								'Handholes provide access to underground cables and enclosures.',
						},
						{
							src: mstProductImage,
							alt: 'Multiport service terminal',
							title: 'MST',
							text:
								'Recognize the hardened ports used for customer drop connections.',
						},
						{
							src: aerialTerminalFieldImage,
							alt: 'Aerial fiber terminal in service',
							title: 'Field Terminal',
							text:
								'An example of fiber distribution equipment installed in the field.',
						},
					],
				},
				{
					type: 'callout',
					style: 'note',
					strong: 'REMEMBER:',
					text:
						'An FDH distributes optical connections. An MST provides customer drop ports. A SmartNID or ONT terminates optical service at the home. Each serves a different purpose.',
				},
			],
		},
		{
			id: 'field',
			title: 'Your Work in the Field',
			blocks: [
				{
					type: 'strong-text',
					strong: 'Residential installations:',
					text:
						'Confirm the serving facilities, install or connect the drop, install the required customer equipment, activate service through the approved process, and verify connectivity.',
				},
				{
					type: 'strong-text',
					strong: 'Residential repairs:',
					text:
						'Identify the failed portion of the service path. Common problems include damaged fiber, contaminated connectors, incorrect assignments, equipment faults, provisioning issues, and poor Wi-Fi.',
				},
				{
					type: 'strong-text',
					strong: 'FDH work:',
					text:
						'Technicians may need to identify or correct fiber jumper assignments inside distribution cabinets. Confirm the correct ports and approved work before making changes.',
				},
				{
					type: 'strong-text',
					strong: 'Home networking:',
					text:
						'Verify the gateway, wired internet, and wireless coverage. Understand when placement, interference, or a properly designed mesh system may improve the customer experience.',
				},
				{
					type: 'callout',
					style: 'danger',
					strong: 'PROTECT ACTIVE SERVICE:',
					text:
						'Never move an FDH jumper or customer connection by guesswork. Verify assignments and authorization first, and avoid disrupting neighboring customers.',
				},
				{
					type: 'callout',
					style: 'warn',
					strong: 'SAFETY FIRST:',
					text:
						'Never look into a fiber connector. Follow current procedures for optical testing, aerial work, buried utilities, traffic safety, and equipment handling.',
				},
			],
		},
		{
			id: 'mindset',
			title: 'The Right Troubleshooting Mindset',
			blocks: [
				{
					type: 'text',
					text:
						'Good troubleshooting is about finding where the problem begins instead of replacing equipment at random.',
				},
				{
					type: 'table',
					headers: [
						'Symptom',
						'Where to start',
					],
					termColumn: 0,
					rows: [
						[
							'No optical signal',
							'Fiber path, assigned ports, connectors, drop, and upstream network.',
						],
						[
							'Optical signal, no internet',
							'ONT registration, provisioning, gateway WAN status, and wired connectivity.',
						],
						[
							'Internet works, poor Wi-Fi',
							'Router placement, interference, signal coverage, and mesh options.',
						],
						[
							'One device has problems',
							'Check the individual device and its connection before replacing network equipment.',
						],
						[
							'Multiple customers offline',
							'Consider shared outside-plant or provider-side faults and follow escalation procedures.',
						],
					],
				},
				{
					type: 'callout',
					style: 'tip',
					strong: 'THE GOLDEN RULE:',
					text:
						'Verify the optical connection first, wired internet second, and Wi-Fi third. Let the symptoms and measurements guide the next step.',
				},
				{
					type: 'callout',
					style: 'note',
					strong: 'KEEP LEARNING:',
					text:
						'Use the Learning Manual for detailed explanations, Troubleshooting for fault isolation, and the Field Cheat Sheet for quick on-the-job references. Current GridSource and provider procedures always control field work.',
				},
			],
		},
	] satisfies RoleSection[],
} as const
