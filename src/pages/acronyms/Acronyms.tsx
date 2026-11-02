import { useEffect, useRef, useState } from 'react'

import { acronymContent, type Acronym } from '../../assets/config/acronyms'

import Disclosures from '../../components/disclosures/Disclosures'
import QuickNav from '../../components/quickNav/QuickNav'

import '../../components/quickNav/quickNav.scss'

function AcronymCard({ acronym }: { acronym: Acronym }) {
	return (
		<div className='card'>
			<img src={acronym.image} alt={acronym.full} />

			<div className='cap'>
				<b>
					{acronym.key} — {acronym.full}
				</b>

				<p>{acronym.meaning}</p>

				<p>
					<b>{acronymContent.fieldLabel}</b>

					{acronym.field}
				</p>
			</div>
		</div>
	)
}

export default function Acronyms() {
	const pageRef = useRef<HTMLElement>(null)

	const [page, setPage] = useState<HTMLElement | null>(null)

	const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(
		null,
	)

	useEffect(() => {
		const currentPage = pageRef.current

		if (!currentPage) {
			return
		}

		setPage(currentPage)

		setScrollContainer(
			currentPage.closest<HTMLElement>('.react-training-page'),
		)
	}, [])

	const quickNavSections = acronymContent.categories.map(category => ({
		id: `acronyms-${category.id}`,
		title: category.title,
	}))

	return (
		<>
			<main ref={pageRef}>
				<section className='page'>
					<h1>{acronymContent.title}</h1>

					<p className='sub'>{acronymContent.subtitle}</p>

					<div className='tip'>
						<b>{acronymContent.tip.label}</b>{' '}
						{acronymContent.tip.text}
					</div>

					<Disclosures container={page} />

					{acronymContent.categories.map(category => (
						<details
							id={`acronyms-${category.id}`}
							key={category.id}
							className='section-card'
							open>
							<summary>
								<b>{category.title}</b>

								<span className='plus' aria-hidden='true' />
							</summary>

							<div className='section-body'>
								<div className='grid'>
									{category.items.map(acronym => (
										<AcronymCard
											key={acronym.key}
											acronym={acronym}
										/>
									))}
								</div>
							</div>
						</details>
					))}

					<div className='note'>
						<b>{acronymContent.note.label}</b>{' '}
						{acronymContent.note.text}
					</div>
				</section>
			</main>

			<QuickNav
				sections={quickNavSections}
				scrollContainer={scrollContainer}
			/>
		</>
	)
}
