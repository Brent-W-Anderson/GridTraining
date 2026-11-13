export const networkChapter = {
 id: 'manual-network',
 title: 'The Complete Residential Fiber Network',
 description: 'See how service travels from the OLT to the customer.',
 path: ['OLT', 'FDH', 'Distribution terminal', 'Drop', 'ONT / SmartNID', 'Gateway', 'Customer devices'],
 explanation: 'OLT: Provider equipment originating the PON service. FDH: Distributes feeder signals through optical splitters. Distribution terminal: Provides assigned connections closer to homes. Drop: Connects terminal to premises. ONT / SmartNID: Terminates optical service. Gateway: Routes the home network. Customer devices: Connect using Ethernet or Wi-Fi.',
 note: 'Identify which segment is failing before replacing equipment. The exact layout and equipment vary by provider and deployment.',
 reference: { title: 'Fiber Optic Association — Illustrated Technical Reference', description: 'Diagrams and explanations of fiber systems and components', url: 'https://www.foa.org/tech/ref/contents.html' },
} as const

export const fdhChapter = {
 id: 'manual-fdh',
 title: 'FDH Cabinets and Fiber Assignments',
 description: 'Find the right cabinet, splitter, jumper, and distribution port.',
} as const

export const videos = [
	{
		title: 'Splitter Installation & Distribution Leg Assignment',
		source: 'Corning Optical Communications',
		description:
			'See how splitter installation and distribution-leg assignments are handled in a fiber distribution hub.',
		url: 'https://www.youtube.com/watch?v=sUJoTBIL2f0',
	},
	{
		title: 'FDH 3000 — Installing a Plug-and-Play Splitter',
		source: 'CommScope',
		description:
			'Recognize splitter modules, their placement, and how they fit into the FDH cabinet.',
		url: 'https://www.youtube.com/watch?v=3QIJ3BOUpjA',
	},
	{
		title: 'Connecting Splitter Outputs to Distribution Ports',
		source: 'CommScope FDH 3000',
		description:
			'Study how splitter output pigtails connect to the distribution side of the cabinet.',
		url: 'https://www.commscope.com/product-type/hubs-closures-terminals-boxes/distribution-hubs/fiber-distribution-hubs/fdh3000-standard-cabinet/',
	},
]

export const cabinetParts = [
	{
		name: 'Feeder fibers',
		description: 'Carry the provider-side optical signal into the cabinet.',
	},
	{
		name: 'Splitter modules',
		description:
			'Divide an incoming optical signal among multiple customer paths.',
	},
	{
		name: 'Splitter outputs',
		description:
			'Individual connections leaving a splitter. Their numbering is separate from distribution-port numbering.',
	},
	{
		name: 'Distribution ports',
		description:
			'Connect the cabinet to distribution fibers serving downstream terminals.',
	},
	{
		name: 'Jumpers and routing guides',
		description:
			'Provide the physical connections between assigned splitter outputs and distribution ports.',
	},
	{
		name: 'Parking or storage locations',
		description:
			'Hold unused or staged connectors in certain cabinet designs. They are not automatically active customer connections.',
	},
]

export const findingSteps = [
	{
		title: 'Confirm the correct cabinet',
		text: 'Compare the work order, cabinet identifier, and facility records before identifying a port.',
	},
	{
		title: 'Read the cabinet layout',
		text: 'Find the manufacturer label or numbering diagram. Determine where the distribution panels begin and how their ports are numbered.',
	},
	{
		title: 'Locate the assigned distribution port',
		text: 'Use the documented distribution assignment. Do not assume that a splitter output with the same number is the matching port.',
	},
	{
		title: 'Identify the documented splitter output',
		text: 'Use available splitter labels, jumper identification, and facility records to establish the expected connection.',
	},
	{
		title: 'Compare records with physical connections',
		text: 'Observe whether the documented path agrees with what is installed. Do not pull or move a live jumper simply to see where it goes.',
	},
	{
		title: 'Verify and document',
		text: 'Use approved optical tests and provider procedures to confirm the intended service path, then record discrepancies or escalate.',
	},
]

export const problems = [
	{
		symptom: 'Assigned port is difficult to find',
		action: 'Check the cabinet model, panel numbering direction, port ranges, and actual labeling. Do not count ports by eye from an assumed starting point.',
	},
	{
		symptom: 'Port appears occupied',
		action: 'Confirm the assignment and existing service records before taking action. An occupied port is not proof that its jumper is incorrect.',
	},
	{
		symptom: 'Splitter number does not match port number',
		action: 'This can be normal. Splitter outputs and distribution ports use separate numbering systems.',
	},
	{
		symptom: 'Labels and records disagree',
		action: 'Record the discrepancy, verify through authorized methods, and escalate when the correct path cannot be established.',
	},
	{
		symptom: 'Customer has no optical signal',
		action: 'Check the documented path and approved optical test points. A missing signal can originate outside the FDH; do not assume a mispatch.',
	},
]

