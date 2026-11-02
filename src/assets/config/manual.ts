import AerialTerminalFieldImage from '../images/aerial-terminal-field.jpg'
import AerialOspImage from '../images/aerial-osp.jpg'
import OpmFieldImage from '../images/opm-field.jpg'
import VflImage from '../images/vfl.jpg'
import OtdrFieldImage from '../images/otdr-field.jpg'
import Q1000KImage from '../images/q1000k.png'
import Q1000KBottomImage from '../images/q1000k-bottom.png'
import W1700KImage from '../images/w1700k.png'
import W1701KImage from '../images/w1701k.png'

export type ManualInline = {
	strong: boolean
	text: string
}

export type ManualBlock =
	| {
			type: 'paragraph'
			content: ManualInline[]
	  }
	| {
			type: 'heading'
			text: string
	  }
	| {
			type: 'steps'
			items: ManualInline[][]
	  }
	| {
			type: 'checklist'
			items: ManualInline[][]
	  }
	| {
			type: 'callout'
			style: 'note' | 'warn' | 'tip' | 'danger'
			content: ManualInline[]
	  }
	| {
			type: 'image-grid'
			three: boolean
			items: ManualImageCard[]
	  }

export type ManualImageCard = {
	src: string
	alt: string
	title: string
	text: string
}

export type ManualSection = {
	id: string
	title: string
	blocks: ManualBlock[]
}

export const manualContent = {
	title: 'Learning Manual',

	subtitle:
		'A start-to-finish field workflow. Open one section at a time and use it like a job companion instead of trying to memorize the whole page.',

	imageMissingText: 'Image missing.',

	intro: [
		{
			type: 'callout',
			style: 'note',
			content: [
				{
					strong: true,
					text: 'How to use this manual:',
				},
				{
					strong: false,
					text:
						'Public Quantum Fiber, Connecteam, Google Maps, manufacturer and Fiber Optic Association documentation can verify many general steps. GridSource-specific QMate screens, required fields, sketch symbols, optical limits, burial/clearance rules and closeout codes are not publicly documented well enough to teach as fact. Those items are clearly marked so this guide does not train you to press a made-up button.',
				},
			],
		},
	] satisfies ManualBlock[],

	sections: [
		{
			id: 'before-first-job',
			title:
				'1. Before the first job · phone, apps, tools and readiness',
			blocks: [
				{
					type: 'steps',
					items: [
						[
							{
								strong: true,
								text: 'Charge and prepare the phone.',
							},
							{
								strong: false,
								text:
									'You may need navigation, photos, coordinates, job applications and communication throughout the day.',
							},
						],
						[
							{
								strong: true,
								text: 'Confirm app access.',
							},
							{
								strong: false,
								text:
									'Make sure Connecteam, QMate and any Quantum/company tools you were issued open before leaving for the field.',
							},
						],
						[
							{
								strong: true,
								text:
									'Enable required location permissions.',
							},
							{
								strong: false,
								text:
									'Connecteam can require location services for clock-in/out and may use geofences or breadcrumb tracking depending on the employer configuration.',
							},
						],
						[
							{
								strong: true,
								text:
									'Check test equipment and consumables.',
							},
							{
								strong: false,
								text:
									'Optical Power Meter (OPM), Visual Fault Locator (VFL), cleaning supplies, approved connectors/adapters, drop material, Ethernet cable and required safety equipment should be ready before the route starts.',
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
								'CONNECTEAM — VERIFIED GENERAL BEHAVIOR:',
						},
						{
							strong: false,
							text:
								"Connecteam's employee system supports time clock, jobs, schedules, forms and tasks. The exact GridSource layout and which features are enabled are administrator-controlled.",
						},
					],
				},
			],
		},

		{
			id: 'connecteam',
			title:
				'2. Connecteam · start of day and time tracking',
			blocks: [
				{
					type: 'paragraph',
					content: [
						{
							strong: true,
							text: 'Connecteam',
						},
						{
							strong: false,
							text:
								'is a workforce-management application. Its public documentation confirms mobile clock-in/out, job selection, schedules, forms, tasks and optional Global Positioning System (GPS) location controls.',
						},
					],
				},
				{
					type: 'steps',
					items: [
						[
							{
								strong: true,
								text: 'Open Connecteam.',
							},
							{
								strong: false,
								text:
									'Review your schedule, assigned work and company updates that are visible in your GridSource account.',
							},
						],
						[
							{
								strong: true,
								text:
									'Clock in using the company-required job/activity.',
							},
							{
								strong: false,
								text:
									'Connecteam can require the user to select a job when clocking in. GridSource controls the actual job names and policy.',
							},
						],
						[
							{
								strong: true,
								text:
									'If location is required, allow it.',
							},
							{
								strong: false,
								text:
									'Connecteam says location may be recorded at clock-in/out and, if configured, while you are on the clock. A geofence can restrict where clock actions are allowed.',
							},
						],
						[
							{
								strong: true,
								text:
									'Use forms/tasks only as assigned.',
							},
							{
								strong: false,
								text:
									'Connecteam supports forms, checklists, photo fields and GPS-required fields, but the forms GridSource gives you are company-specific.',
							},
						],
						[
							{
								strong: true,
								text:
									'Clock out / switch jobs according to GridSource policy.',
							},
							{
								strong: false,
								text:
									'Do not invent your own timekeeping sequence. If the app prevents a clock action or shows the wrong job, contact the appropriate supervisor rather than creating false time data.',
							},
						],
					],
				},
				{
					type: 'callout',
					style: 'warn',
					content: [
						{
							strong: true,
							text: 'PRIVACY / LOCATION:',
						},
						{
							strong: false,
							text:
								'Connecteam states that employer-visible location depends on administrator configuration. Its public user documentation says an employer does not receive your location while you are off the clock, although the phone may locally detect entry into a geofence.',
						},
					],
				},
			],
		},

		{
			id: 'qmate',
			title: '3. QMate · work-order workflow',
			blocks: [
				{
					type: 'paragraph',
					content: [
						{
							strong: true,
							text: 'QMate',
						},
						{
							strong: false,
							text:
								'is part of the work workflow you reported using for this job. I could not verify a public GridSource/Quantum technician manual that documents the exact QMate screens, buttons, status codes or required fields. This section therefore teaches the safe workflow around the app without fabricating the interface.',
						},
					],
				},
				{
					type: 'steps',
					items: [
						[
							{
								strong: true,
								text:
									'Open the assigned work order.',
							},
							{
								strong: false,
								text:
									'Verify customer, service address, appointment/window, work type and any notes visible in the order.',
							},
						],
						[
							{
								strong: true,
								text:
									'Identify network assignment information.',
							},
							{
								strong: false,
								text:
									'Look for the serving terminal / Multiport Service Terminal (MST), assigned port, plant notes and any route or construction information provided by the work system.',
							},
						],
						[
							{
								strong: true,
								text:
									'Read before changing status.',
							},
							{
								strong: false,
								text:
									"Do not mark travel, arrival, completion, no-access or other statuses until you know GridSource's required meaning for each status.",
							},
						],
						[
							{
								strong: true,
								text:
									'Capture required evidence as the job progresses.',
							},
							{
								strong: false,
								text:
									'Keep optical readings, equipment identifiers, photos, coordinates, sketch information and notes available for the closeout fields your QMate workflow requires.',
							},
						],
						[
							{
								strong: true,
								text:
									'Before final submission, review the order.',
							},
							{
								strong: false,
								text:
									'Confirm required fields are complete and the status accurately describes what happened.',
							},
						],
					],
				},
				{
					type: 'callout',
					style: 'danger',
					content: [
						{
							strong: true,
							text: 'QMate GAP TO FILL:',
						},
						{
							strong: false,
							text:
								'Exact tap-by-tap QMate instructions need GridSource screenshots/training or observation from your live account. When you learn a screen, capture the sequence and we can replace this block with a literal click-by-click procedure.',
						},
					],
				},
			],
		},

		{
			id: 'read-job',
			title:
				'4. Read the job before touching the network',
			blocks: [
				{
					type: 'steps',
					items: [
						[
							{
								strong: true,
								text:
									'Confirm customer and address.',
							},
							{
								strong: false,
								text:
									'Make sure the physical location matches the work order.',
							},
						],
						[
							{
								strong: true,
								text:
									'Confirm the assigned serving point.',
							},
							{
								strong: false,
								text:
									'Know the terminal/MST and assigned port before connecting anything. An unused-looking port is not automatically yours.',
							},
						],
						[
							{
								strong: true,
								text: 'Walk the route.',
							},
							{
								strong: false,
								text:
									'Identify aerial, buried, existing, damaged, obstructed and unsafe portions before pulling or attaching anything.',
							},
						],
						[
							{
								strong: true,
								text:
									'Plan the customer entry.',
							},
							{
								strong: false,
								text:
									'Think fiber path first, SmartNID location second, Ethernet path third, then Wi-Fi coverage.',
							},
						],
						[
							{
								strong: true,
								text:
									'Identify anything that changes the job.',
							},
							{
								strong: false,
								text:
									'No access, unsafe pole/route, blocked conduit, missing plant, wrong assignment, construction need or customer-requested changes may require escalation instead of improvisation.',
							},
						],
					],
				},
			],
		},

		{
			id: 'google-maps',
			title:
				'5. Google Maps · get latitude and longitude coordinates',
			blocks: [
				{
					type: 'paragraph',
					content: [
						{
							strong: true,
							text:
								'Global Positioning System (GPS) coordinates',
						},
						{
							strong: false,
							text:
								'identify a point using latitude and longitude. Google Maps officially supports copying coordinates in decimal-degree format.',
						},
					],
				},
				{
					type: 'heading',
					text: 'Android phone',
				},
				{
					type: 'steps',
					items: [
						[
							{
								strong: false,
								text: 'Open',
							},
							{
								strong: true,
								text: 'Google Maps',
							},
							{
								strong: false,
								text: '.',
							},
						],
						[
							{
								strong: false,
								text:
									'Touch and hold the exact unlabeled point on the map until a red pin drops.',
							},
						],
						[
							{
								strong: false,
								text:
									'Google says the coordinates appear in the search box. Copy them exactly.',
							},
						],
					],
				},
				{
					type: 'heading',
					text: 'iPhone / iPad',
				},
				{
					type: 'steps',
					items: [
						[
							{
								strong: false,
								text: 'Open',
							},
							{
								strong: true,
								text: 'Google Maps',
							},
							{
								strong: false,
								text: '.',
							},
						],
						[
							{
								strong: false,
								text:
									'Touch and hold an unlabeled point to drop a red pin.',
							},
						],
						[
							{
								strong: false,
								text:
									'Open the place sheet and copy the displayed coordinates.',
							},
						],
					],
				},
				{
					type: 'heading',
					text: 'Computer',
				},
				{
					type: 'steps',
					items: [
						[
							{
								strong: false,
								text:
									'Open Google Maps and find the exact point.',
							},
						],
						[
							{
								strong: false,
								text:
									'Right-click that point.',
							},
						],
						[
							{
								strong: false,
								text:
									'The latitude and longitude appear at the top of the pop-up. Click them to copy.',
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
							text: 'FORMAT:',
						},
						{
							strong: false,
							text:
								'Google recommends decimal degrees such as',
						},
						{
							strong: true,
							text: '44.12345, -92.12345',
						},
						{
							strong: false,
							text:
								'. Latitude comes first, longitude second. A coordinate copied for the house instead of the MST is still the wrong coordinate, so verify what the work order is asking you to locate.',
						},
					],
				},
				{
					type: 'callout',
					style: 'warn',
					content: [
						{
							strong: true,
							text: 'FIELD ACCURACY:',
						},
						{
							strong: false,
							text:
								"A phone's GPS/map point is not survey-grade. Drop the pin on the actual feature you are documenting and follow GridSource rules if the company requires a particular capture method or precision.",
						},
					],
				},
			],
		},

		{
			id: 'site-sketch',
			title:
				'6. Site sketch · make the route understandable',
			blocks: [
				{
					type: 'paragraph',
					content: [
						{
							strong: false,
							text:
								'A good field sketch should let another person understand the proposed or completed route without standing beside you. The exact GridSource/Quantum symbols and required fields still control.',
						},
					],
				},
				{
					type: 'steps',
					items: [
						[
							{
								strong: true,
								text:
									'Mark the serving point.',
							},
							{
								strong: false,
								text:
									'Show the terminal/MST location clearly.',
							},
						],
						[
							{
								strong: true,
								text:
									'Mark the customer premise.',
							},
							{
								strong: false,
								text:
									'Make the destination obvious.',
							},
						],
						[
							{
								strong: true,
								text: 'Show the route.',
							},
							{
								strong: false,
								text:
									'Indicate how the drop gets from the serving point to the premise.',
							},
						],
						[
							{
								strong: true,
								text:
									'Include useful measurements and landmarks.',
							},
							{
								strong: false,
								text:
									'Distances, direction changes, driveways, sidewalks, roads, fences and other obstacles can make the sketch understandable.',
							},
						],
						[
							{
								strong: true,
								text:
									'Use company-required symbols.',
							},
							{
								strong: false,
								text:
									'Do not invent a symbol set if QMate/GridSource requires specific notation.',
							},
						],
					],
				},
			],
		},

		{
			id: 'bsw',
			title:
				'7. Buried Service Wire (BSW) · dig / locate request workflow',
			blocks: [
				{
					type: 'paragraph',
					content: [
						{
							strong: true,
							text:
								'Buried Service Wire (BSW)',
						},
						{
							strong: false,
							text:
								'is the underground customer drop path from the serving plant toward the premise.',
						},
					],
				},
				{
					type: 'steps',
					items: [
						[
							{
								strong: true,
								text:
									'Identify the proposed route.',
							},
							{
								strong: false,
								text:
									'Walk it before requesting or performing buried work.',
							},
						],
						[
							{
								strong: true,
								text:
									'Document the route clearly.',
							},
							{
								strong: false,
								text:
									'The serving point, premise, route, distances and obstacles should be understandable.',
							},
						],
						[
							{
								strong: true,
								text:
									'Follow the required locate/dig process.',
							},
							{
								strong: false,
								text:
									'Use GridSource/local procedures for utility locating and authorization before disturbing soil.',
							},
						],
						[
							{
								strong: true,
								text:
									'Do not guess burial requirements.',
							},
							{
								strong: false,
								text:
									'Depth, protection, conduit requirements and utility clearances are controlled by current company/local rules.',
							},
						],
					],
				},
				{
					type: 'callout',
					style: 'danger',
					content: [
						{
							strong: true,
							text: 'DO NOT GUESS:',
						},
						{
							strong: false,
							text:
								'burial depth, utility clearances, locate procedure, direct-bury versus conduit requirements or approved digging methods. Use the current GridSource/Quantum procedure and local requirements.',
						},
					],
				},
			],
		},

		{
			id: 'asw',
			title:
				'8. Aerial Service Wire (ASW) · route mindset',
			blocks: [
				{
					type: 'paragraph',
					content: [
						{
							strong: true,
							text:
								'Aerial Service Wire (ASW)',
						},
						{
							strong: false,
							text:
								'is the overhead customer service drop from the serving plant toward the premise.',
						},
					],
				},
				{
					type: 'image-grid',
					three: false,
					items: [
						{
							src: AerialTerminalFieldImage,
							alt: 'Aerial terminal',
							title: 'Serving terminal',
							text:
								'Verify assignment before connecting.',
						},
						{
							src: AerialOspImage,
							alt: 'Aerial fiber route',
							title: 'Aerial route',
							text:
								'Evaluate the complete span and attachment path before installation.',
						},
					],
				},
				{
					type: 'steps',
					items: [
						[
							{
								strong: true,
								text:
									'Verify the serving terminal and port.',
							},
							{
								strong: false,
								text:
									'Do not choose an open-looking port on your own.',
							},
						],
						[
							{
								strong: true,
								text:
									'Inspect the complete route.',
							},
							{
								strong: false,
								text:
									'Look for unsafe conditions, obstructions and anything that changes the intended path.',
							},
						],
						[
							{
								strong: true,
								text:
									'Protect the fiber path.',
							},
							{
								strong: false,
								text:
									'Avoid sharp bends, crushing, abrasion and unsupported routing.',
							},
						],
						[
							{
								strong: true,
								text:
									'Use current attachment and clearance standards.',
							},
							{
								strong: false,
								text:
									'Those requirements are company/local-rule items and should not be guessed from a generic training page.',
							},
						],
					],
				},
				{
					type: 'callout',
					style: 'warn',
					content: [
						{
							strong: true,
							text:
								'COMPANY / LOCAL STANDARD:',
						},
						{
							strong: false,
							text:
								'Required sag, clearances, attachment hardware, pole rules and road/driveway crossing requirements must come from current training and applicable local standards.',
						},
					],
				},
			],
		},

		{
			id: 'fiber-handling',
			title:
				'9. Fiber handling · connectors, bends and cleanliness',
			blocks: [
				{
					type: 'steps',
					items: [
						[
							{
								strong: true,
								text:
									'Protect connector endfaces.',
							},
							{
								strong: false,
								text:
									'Keep caps on until the connection is ready.',
							},
						],
						[
							{
								strong: true,
								text:
									'Inspect and clean correctly.',
							},
							{
								strong: false,
								text:
									'Contamination can create loss and intermittent optical problems.',
							},
						],
						[
							{
								strong: true,
								text:
									'Do not touch polished fiber surfaces.',
							},
							{
								strong: false,
								text:
									'Oil and debris from fingers can contaminate the connection.',
							},
						],
						[
							{
								strong: true,
								text:
									'Respect bend radius.',
							},
							{
								strong: false,
								text:
									'Do not kink, sharply bend, crush or staple fiber in a way that damages the cable.',
							},
						],
						[
							{
								strong: true,
								text:
									'Manage fiber shards safely.',
							},
							{
								strong: false,
								text:
									'Cleaved fiber pieces are sharp and should go into the proper shard container.',
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
								'GOOD TROUBLESHOOTING HABIT:',
						},
						{
							strong: false,
							text:
								'Before assuming equipment failure, verify the connector is correct, clean and fully seated.',
						},
					],
				},
			],
		},

		{
			id: 'optical-testing',
			title:
				'10. Optical testing · prove the fiber layer',
			blocks: [
				{
					type: 'image-grid',
					three: true,
					items: [
						{
							src: OpmFieldImage,
							alt: 'Optical power meter',
							title:
								'Optical Power Meter (OPM)',
							text:
								'Measures optical power at the test point.',
						},
						{
							src: VflImage,
							alt: 'Visual fault locator',
							title:
								'Visual Fault Locator (VFL)',
							text:
								'Visible red-light tracing / nearby fault aid.',
						},
						{
							src: OtdrFieldImage,
							alt:
								'Optical time-domain reflectometer',
							title:
								'Optical Time-Domain Reflectometer (OTDR)',
							text:
								'Shows events/loss versus distance along a fiber.',
						},
					],
				},
				{
					type: 'paragraph',
					content: [
						{
							strong: false,
							text:
								'Use the correct instrument for the question you are trying to answer.',
						},
					],
				},
				{
					type: 'steps',
					items: [
						[
							{
								strong: true,
								text:
									'Optical Power Meter (OPM):',
							},
							{
								strong: false,
								text:
									'Use it to measure received optical power at the test point.',
							},
						],
						[
							{
								strong: true,
								text:
									'Visual Fault Locator (VFL):',
							},
							{
								strong: false,
								text:
									'Use visible red light as a tracing / nearby fault aid where appropriate.',
							},
						],
						[
							{
								strong: true,
								text:
									'Optical Time-Domain Reflectometer (OTDR):',
							},
							{
								strong: false,
								text:
									'Use it when you need event/loss information versus distance along the fiber and your workflow calls for it.',
							},
						],
						[
							{
								strong: true,
								text:
									'Record the result.',
							},
							{
								strong: false,
								text:
									'If QMate/closeout requires an optical reading, capture the actual measured value rather than relying on memory.',
							},
						],
					],
				},
				{
					type: 'callout',
					style: 'danger',
					content: [
						{
							strong: true,
							text:
								'OPTICAL LIMITS:',
						},
						{
							strong: false,
							text:
								'Do not invent a pass/fail dBm threshold. Use the current Quantum/GridSource acceptance range for the service and test point you are working on.',
						},
					],
				},
			],
		},

		{
			id: 'q1000k',
			title:
				'11. Q1000K SmartNID · install and prove the handoff',
			blocks: [
				{
					type: 'image-grid',
					three: false,
					items: [
						{
							src: Q1000KImage,
							alt: 'Q1000K SmartNID',
							title: 'Q1000K',
							text:
								'Quantum Fiber SmartNID incorporating the customer optical termination function.',
						},
						{
							src: Q1000KBottomImage,
							alt: 'Q1000K ports',
							title: 'Q1000K ports',
							text:
								'Identify fiber and Ethernet ports before connecting.',
						},
					],
				},
				{
					type: 'steps',
					items: [
						[
							{
								strong: true,
								text:
									'Choose the location deliberately.',
							},
							{
								strong: false,
								text:
									'Consider fiber entry, power, Ethernet path and serviceability.',
							},
						],
						[
							{
								strong: true,
								text:
									'Route the fiber cleanly.',
							},
							{
								strong: false,
								text:
									'Protect bend radius and avoid creating a stressed connector.',
							},
						],
						[
							{
								strong: true,
								text:
									'Connect the assigned optical path.',
							},
							{
								strong: false,
								text:
									'Clean/inspect as required and fully seat the proper connector.',
							},
						],
						[
							{
								strong: true,
								text:
									'Apply power and allow the device to initialize.',
							},
							{
								strong: false,
								text:
									'Do not immediately assume failure during normal startup.',
							},
						],
						[
							{
								strong: true,
								text:
									'Verify the optical/service state.',
							},
							{
								strong: false,
								text:
									'If service does not establish, return to the optical path before treating the problem as Wi-Fi.',
							},
						],
					],
				},
			],
		},

		{
			id: 'wifi',
			title:
				'12. W1700K / W1701K · build the Wi-Fi layer',
			blocks: [
				{
					type: 'image-grid',
					three: false,
					items: [
						{
							src: W1700KImage,
							alt: 'W1700K',
							title: 'W1700K',
							text:
								'Primary wired Wi-Fi 7 pod.',
						},
						{
							src: W1701KImage,
							alt: 'W1701K',
							title: 'W1701K',
							text:
								'Optional wireless pod for locations needing additional coverage.',
						},
					],
				},
				{
					type: 'steps',
					items: [
						[
							{
								strong: true,
								text:
									'Prove the SmartNID first.',
							},
							{
								strong: false,
								text:
									'Do not troubleshoot Wi-Fi on top of an unproven optical handoff.',
							},
						],
						[
							{
								strong: true,
								text:
									'Connect the primary W1700K by Ethernet.',
							},
							{
								strong: false,
								text:
									'The primary pod should have a solid wired path back to the SmartNID.',
							},
						],
						[
							{
								strong: true,
								text:
									'Choose placement for coverage.',
							},
							{
								strong: false,
								text:
									'Avoid hiding the Wi-Fi equipment where construction/materials unnecessarily block coverage.',
							},
						],
						[
							{
								strong: true,
								text:
									'Add W1701K only where appropriate.',
							},
							{
								strong: false,
								text:
									'Additional wireless pods should solve an actual coverage need rather than being added automatically.',
							},
						],
						[
							{
								strong: true,
								text:
									'Verify customer devices.',
							},
							{
								strong: false,
								text:
									'Confirm useful connectivity where the customer actually uses the service.',
							},
						],
					],
				},
			],
		},

		{
			id: 'verify-service',
			title:
				'13. Verify service before calling the job complete',
			blocks: [
				{
					type: 'checklist',
					items: [
						[
							{
								strong: false,
								text:
									'Correct serving terminal / port used.',
							},
						],
						[
							{
								strong: false,
								text:
									'Drop route is complete and protected.',
							},
						],
						[
							{
								strong: false,
								text:
									'Fiber connectors are clean and seated.',
							},
						],
						[
							{
								strong: false,
								text:
									'Required optical reading captured.',
							},
						],
						[
							{
								strong: false,
								text:
									'Q1000K SmartNID is online / in the expected service state.',
							},
						],
						[
							{
								strong: false,
								text:
									'Primary W1700K has a good Ethernet path.',
							},
						],
						[
							{
								strong: false,
								text:
									'Customer Wi-Fi / Internet access verified.',
							},
						],
						[
							{
								strong: false,
								text:
									'Required photos, notes, coordinates and sketch information captured.',
							},
						],
					],
				},
			],
		},

		{
			id: 'customer-handoff',
			title: '14. Customer handoff',
			blocks: [
				{
					type: 'steps',
					items: [
						[
							{
								strong: true,
								text:
									'Show the customer what was installed.',
							},
							{
								strong: false,
								text:
									'Identify the SmartNID and primary Wi-Fi equipment.',
							},
						],
						[
							{
								strong: true,
								text:
									'Confirm they can use the service.',
							},
							{
								strong: false,
								text:
									'Do not leave immediately after seeing equipment lights.',
							},
						],
						[
							{
								strong: true,
								text:
									'Explain anything they need to know.',
							},
							{
								strong: false,
								text:
									'Keep the explanation practical and specific to the installation.',
							},
						],
						[
							{
								strong: true,
								text:
									'Leave the work area clean.',
							},
							{
								strong: false,
								text:
									'Remove scraps, fiber shards, packaging and other installation debris.',
							},
						],
					],
				},
			],
		},

		{
			id: 'closeout',
			title:
				'15. Photos, notes and closeout',
			blocks: [
				{
					type: 'steps',
					items: [
						[
							{
								strong: true,
								text:
									'Capture required photos before leaving.',
							},
							{
								strong: false,
								text:
									'Do not discover after departure that a required view is missing.',
							},
						],
						[
							{
								strong: true,
								text:
									'Record actual readings.',
							},
							{
								strong: false,
								text:
									'Use the measured optical values required by the workflow.',
							},
						],
						[
							{
								strong: true,
								text:
									'Finish coordinates and sketch information.',
							},
							{
								strong: false,
								text:
									'Make sure they describe the correct feature and route.',
							},
						],
						[
							{
								strong: true,
								text:
									'Write useful notes.',
							},
							{
								strong: false,
								text:
									'Document what another technician or reviewer actually needs to understand the job.',
							},
						],
						[
							{
								strong: true,
								text:
									'Review before submitting.',
							},
							{
								strong: false,
								text:
									'Check required fields and make sure the final status accurately represents the work.',
							},
						],
					],
				},
				{
					type: 'callout',
					style: 'warn',
					content: [
						{
							strong: true,
							text:
								'GRIDSource CLOSEOUT:',
						},
						{
							strong: false,
							text:
								'Exact required photos, QMate fields, status codes and closeout sequence should come from current company training. We can make this section literal once those screens/rules are available.',
						},
					],
				},
			],
		},

		{
			id: 'abnormal-job',
			title:
				'16. When the job does not go normally',
			blocks: [
				{
					type: 'paragraph',
					content: [
						{
							strong: false,
							text:
								'Not every job should be forced to completion. Stop and escalate when the condition exceeds your authorization, training, equipment or safe working limits.',
						},
					],
				},
				{
					type: 'steps',
					items: [
						[
							{
								strong: true,
								text:
									'Wrong or missing plant assignment:',
							},
							{
								strong: false,
								text:
									'verify the work order and escalate rather than choosing plant on your own.',
							},
						],
						[
							{
								strong: true,
								text:
									'Unsafe route or access:',
							},
							{
								strong: false,
								text:
									'do not improvise around a safety restriction.',
							},
						],
						[
							{
								strong: true,
								text:
									'Blocked or unavailable route:',
							},
							{
								strong: false,
								text:
									'document what you found and follow the construction/escalation process.',
							},
						],
						[
							{
								strong: true,
								text:
									'Optical service will not prove:',
							},
							{
								strong: false,
								text:
									'work the optical path logically before swapping customer Wi-Fi hardware.',
							},
						],
						[
							{
								strong: true,
								text:
									'Customer request changes scope:',
							},
							{
								strong: false,
								text:
									'confirm what you are authorized to change before proceeding.',
							},
						],
					],
				},
				{
					type: 'callout',
					style: 'danger',
					content: [
						{
							strong: true,
							text:
								'CORE FIELD RULE:',
						},
						{
							strong: false,
							text:
								'Do not create a second problem while trying to solve the first one. Verify, isolate, document and escalate when required.',
						},
					],
				},
			],
		},
	] satisfies ManualSection[],
} as const