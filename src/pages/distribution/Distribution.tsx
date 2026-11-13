import { useLayoutEffect, useRef, useState } from 'react'

import { distributionContent as content } from '../../assets/config/distribution'

import Disclosures from '../../components/disclosures/Disclosures'
import DistributionCalculator from '../../components/distributionCalculator/DistributionCalculator'
import TrainingVideos from '../../components/trainingVideos/TrainingVideos'
import QuickNav from '../../components/quickNav/QuickNav'
import TrainingChapter from '../../components/trainingChapter/TrainingChapter'

export default function Distribution() {
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
		id: `distribution-${chapter.id}`,
		title: chapter.title,
	}))

	return (
		<>
			<main ref={pageRef} className='distribution-page'>
				<section className='page'>
					<h1>{content.title}</h1>
					<p className='sub'>{content.subtitle}</p>

					<Disclosures container={page} />

					<div className='training-chapters'>
						<TrainingChapter
							chapter={content.chapters[0]}
							index={0}
							prefix='distribution'>
							<div
								className='distribution-table'
								role='region'
								aria-label={content.chapters[0].title}
								tabIndex={0}>
								<table>
									<thead>
										<tr>
											{content.identifiers.headers.map(
												header => (
													<th
														key={header}
														scope='col'>
														{header}
													</th>
												),
											)}
										</tr>
									</thead>

									<tbody>
										{content.identifiers.rows.map(
											([label, detail]) => (
												<tr key={label}>
													<th scope='row'>{label}</th>
													<td>{detail}</td>
												</tr>
											),
										)}
									</tbody>
								</table>
							</div>
						</TrainingChapter>

						<TrainingChapter
							chapter={content.chapters[1]}
							index={1}
							prefix='distribution'>
							<p>{content.math.intro}</p>

							<ol className='distribution-lessons'>
								{content.math.steps.map(step => (
									<li key={step}>{step}</li>
								))}
							</ol>

							<p className='distribution-formula'>
								{content.math.formula}
							</p>

							<p>{content.math.example}</p>

							<p className='note'>{content.math.assignment}</p>

							<p className='note'>{content.math.limit}</p>

							<DistributionCalculator />
						</TrainingChapter>

						<TrainingChapter
							chapter={content.chapters[2]}
							index={2}
							prefix='distribution'>
							<p>{content.videos.intro}</p>

							<TrainingVideos
								videos={content.videos.items}
								playLabel={content.videos.play}
								openLabel={content.videos.open}
							/>

							<a
								href={content.videos.sourceHref}
								target='_blank'
								rel='noopener noreferrer'>
								{content.videos.source}
							</a>
						</TrainingChapter>

						<TrainingChapter
							chapter={content.chapters[3]}
							index={3}
							prefix='distribution'>
							<ol className='distribution-lessons'>
								{content.verification.map(step => (
									<li key={step}>{step}</li>
								))}
							</ol>

							<a
								href={content.reference.href}
								target='_blank'
								rel='noopener noreferrer'>
								{content.reference.label}
							</a>
						</TrainingChapter>
					</div>
				</section>
			</main>

			<QuickNav sections={sections} scrollContainer={scrollContainer} />
		</>
	)
}
