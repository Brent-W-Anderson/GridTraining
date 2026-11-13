import { useLayoutEffect, useRef, useState } from 'react'

import { acronymContent, type Acronym } from '../../assets/config/acronyms'

import TrainingChapter from '../../components/trainingChapter/TrainingChapter'
import Disclosures from '../../components/disclosures/Disclosures'
import QuickNav from '../../components/quickNav/QuickNav'

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

	useLayoutEffect(() => {
		const currentPage = pageRef.current

		if (!currentPage) return

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

					<div className='training-chapters'>
						{acronymContent.categories.map((category, index) => (
							<TrainingChapter
								key={category.id}
								prefix='acronyms'
								index={index}
								chapter={{
									id: category.id,
									title: category.title,
									icon: 'network',
								}}>
								<div className='grid'>
									{category.items.map(acronym => (
										<AcronymCard
											key={acronym.key}
											acronym={acronym}
										/>
									))}
								</div>
							</TrainingChapter>
						))}
					</div>

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
