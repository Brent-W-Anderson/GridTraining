
export type TrainingPageId =
	| 'acronyms-page'
	| 'role-page'
	| 'distribution-page'
	| 'outside-page'
	| 'inside-page'
	| 'troubleshooting-page'
	| 'inventory-page'

export type TrainingPagePath =
	| '/acronyms'
	| '/'
	| '/distribution'
	| '/outside'
	| '/inside'
	| '/troubleshooting'
	| '/inventory'

export type TrainingPageConfig = {
	id: TrainingPageId
	path: TrainingPagePath
	tabLabel: string
	title: string
}

export const trainingConfig = {
	appTitle: 'Fiber Installation & Repair Technician Training',
	tabAriaLabel: 'Training sections',
	pageNavigationAriaLabel: 'Training page navigation',
	navigationLabels: {
		previous: 'Previous',
		next: 'Next',
	},
	pages: [
		{ id: 'acronyms-page', path: '/acronyms', tabLabel: '00 · Acronyms', title: 'Acronyms' },
		{ id: 'role-page', path: '/', tabLabel: '01 · Role & Network', title: 'Role & Network' },
		{ id: 'distribution-page', path: '/distribution', tabLabel: '02 · FDH & Distribution', title: 'FDH & Distribution' },
		{ id: 'outside-page', path: '/outside', tabLabel: '03 · Outside Installation', title: 'Outside Installation' },
		{ id: 'inside-page', path: '/inside', tabLabel: '04 · Inside Installation', title: 'Inside Installation' },
		{ id: 'troubleshooting-page', path: '/troubleshooting', tabLabel: '05 · Troubleshooting', title: 'Troubleshooting' },
		{ id: 'inventory-page', path: '/inventory', tabLabel: '06 · Tools & Inventory', title: 'Tools & Inventory' },
	] satisfies TrainingPageConfig[],
} as const
