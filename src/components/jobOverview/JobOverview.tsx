import { useLayoutEffect, useRef, useState } from 'react'
import type { JobPageContent } from '../../assets/config/jobTopics'
import Disclosures from '../disclosures/Disclosures'
import QuickNav from '../quickNav/QuickNav'
import TrainingChapter from '../trainingChapter/TrainingChapter'

type JobOverviewProps = {
	content: JobPageContent
	prefix: string
}

export default function JobOverview({ content, prefix }: JobOverviewProps) {
	const pageRef = useRef<HTMLElement>(null)
	const [page, setPage] = useState<HTMLElement | null>(null)
	const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(
		null,
	)

	useLayoutEffect(() => {
		const current = pageRef.current

		if (!current) return

		setPage(current)
		setScrollContainer(current.closest<HTMLElement>('.react-training-page'))
	}, [])

	const sections = content.chapters.map(chapter => ({
		id: `${prefix}-${chapter.id}`,
		title: chapter.title,
	}))

	return (
		<>
			<main ref={pageRef} className='job-overview'>
				<section className='page'>
					<h1>{content.title}</h1>

					<p className='sub'>{content.subtitle}</p>

					<div className='training-path'>
						{content.path.map((step, index) => (
							<span key={step}>
								{index > 0 && (
									<span
										className='training-path-arrow'
										aria-hidden='true'>
										→
									</span>
								)}

								<b>{step}</b>
							</span>
						))}
					</div>

					<Disclosures container={page} />

					<div className='training-chapters'>
						{content.chapters.map((chapter, index) => (
							<TrainingChapter
								key={chapter.id}
								chapter={chapter}
								index={index}
								prefix={prefix}
							/>
						))}
					</div>
				</section>
			</main>

			<QuickNav sections={sections} scrollContainer={scrollContainer} />
		</>
	)
}
