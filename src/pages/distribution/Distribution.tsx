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
							<TrainingVideos
								videos={content.videos.items}
								playLabel={content.videos.play}
								openLabel={content.videos.open}
							/>
						</TrainingChapter>

						<TrainingChapter
							chapter={content.chapters[1]}
							index={1}
							prefix='distribution'>
							<p>{content.calculatorIntro}</p>
							<p className='note'>{content.calculatorExample}</p>
							<DistributionCalculator />
						</TrainingChapter>

						<TrainingChapter
							chapter={content.chapters[2]}
							index={2}
							prefix='distribution'>
							<ol className='distribution-lessons'>
								{content.verification.map(step => (
									<li key={step}>{step}</li>
								))}
							</ol>

							{content.photos.map(photo => (
								<figure
									key={photo.title}
									className='section-card'
									style={{
										padding: '1rem',
										margin: '1rem 0',
									}}>
									<div
										role='img'
										aria-label={photo.title}
										style={{
											border: '2px dashed currentColor',
											borderRadius: '0.5rem',
											minHeight: '8rem',
											display: 'grid',
											placeItems: 'center',
											padding: '1rem',
											textAlign: 'center',
										}}>
										<strong>{photo.title}</strong>
									</div>

									<figcaption className='note'>
										{photo.caption}
									</figcaption>
								</figure>
							))}
						</TrainingChapter>
					</div>
				</section>
			</main>

			<QuickNav sections={sections} scrollContainer={scrollContainer} />
		</>
	)
}
