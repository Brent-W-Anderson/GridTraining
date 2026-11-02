export type TrainingPageId =
	| 'role-page'
	| 'manual-page'
	| 'cheat-page'
	| 'troubleshooting-page'
	| 'acronyms-page'
	| 'inventory-page'

export type TrainingPagePath =
	| '/'
	| '/manual'
	| '/cheat'
	| '/troubleshooting'
	| '/acronyms'
	| '/inventory'

export type TrainingPageConfig = {
	id: TrainingPageId
	path: TrainingPagePath
	tabLabel: string
	title: string
}

export const trainingConfig = {
	appTitle:
		'Fiber Installation & Repair Technician Training',

	tabAriaLabel:
		'Training sections',

	pageNavigationAriaLabel:
		'Training page navigation',

	navigationLabels: {
		previous:
			'Previous',
		next:
			'Next',
	},

	pages: [
		{
			id:
				'role-page',
			path:
				'/',
			tabLabel:
				'I · Role & Network',
			title:
				'Role and Network',
		},
		{
			id:
				'manual-page',
			path:
				'/manual',
			tabLabel:
				'II · Learning Manual',
			title:
				'Learning Manual',
		},
		{
			id:
				'cheat-page',
			path:
				'/cheat',
			tabLabel:
				'III · Field Cheat Sheet',
			title:
				'Field Cheat Sheet',
		},
		{
			id:
				'troubleshooting-page',
			path:
				'/troubleshooting',
			tabLabel:
				'IV · Troubleshooting',
			title:
				'Troubleshooting',
		},
		{
			id:
				'acronyms-page',
			path:
				'/acronyms',
			tabLabel:
				'V · Acronym Reference',
			title:
				'Acronym Reference',
		},
		{
			id:
				'inventory-page',
			path:
				'/inventory',
			tabLabel:
				'VI · Tools & Inventory',
			title:
				'Tools and Inventory',
		},
	] satisfies TrainingPageConfig[],
} as const