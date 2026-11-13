import { useEffect, useRef, useState, type SyntheticEvent } from 'react'

import {
	manualContent,
	type ManualBlock,
	type ManualImageCard,
	type ManualInline,
} from '../../assets/config/manual'

import Disclosures from '../../components/disclosures/Disclosures'
import QuickNav from '../../components/quickNav/QuickNav'
import { networkChapter, fdhChapter } from '../../assets/config/manualChapters'
import FdhChapter from './fdh/FdhChapter'
import './manual.scss'

import '../../components/quickNav/quickNav.scss'

function InlineContent({ content }: { content: readonly ManualInline[] }) {
	return (
		<>
			{content.map((segment, index) => {
				const value = (
					<>
						{index > 0 ? ' ' : ''}
						{segment.text}
					</>
				)

				if (segment.strong) {
					return <b key={index}>{value}</b>
				}

				return <span key={index}>{value}</span>
			})}
		</>
	)
}

function handleImageError(event: SyntheticEvent<HTMLImageElement>) {
	const image = event.currentTarget
	const missing = image.nextElementSibling

	image.style.display = 'none'

	if (missing?.classList.contains('missing')) {
		missing.classList.add('visible')
	}
}

function ImageCard({ card }: { card: ManualImageCard }) {
	return (
		<figure className='card'>
			<img src={card.src} alt={card.alt} onError={handleImageError} />

			<div className='missing'>{manualContent.imageMissingText}</div>

			<figcaption className='cap'>
				<b>{card.title}</b>
				<br />
				{card.text}
			</figcaption>
		</figure>
	)
}

function ContentBlock({ block }: { block: ManualBlock }) {
	switch (block.type) {
		case 'paragraph':
			return (
				<p>
					<InlineContent content={block.content} />
				</p>
			)

		case 'heading':
			return <h3>{block.text}</h3>

		case 'steps':
			return (
				<div className='steps'>
					{block.items.map((item, index) => (
						<div className='step' key={index}>
							<InlineContent content={item} />
						</div>
					))}
				</div>
			)

		case 'checklist':
			return (
				<div className='checklist'>
					{block.items.map((item, index) => (
						<div className='check' key={index}>
							<InlineContent content={item} />
						</div>
					))}
				</div>
			)

		case 'callout':
			return (
				<div className={block.style}>
					<InlineContent content={block.content} />
				</div>
			)

		case 'image-grid':
			return (
				<div className={block.three ? 'grid three' : 'grid'}>
					{block.items.map(card => (
						<ImageCard key={card.title} card={card} />
					))}
				</div>
			)
	}
}

function NetworkChapter() {
	return (
		<details
			id={networkChapter.id}
			className='section-card fdh-chapter'
			open>
			<summary>
				<span className='fdh-chapter-icon' aria-hidden='true'>
					◎
				</span>

				<span className='fdh-chapter-heading'>
					<span className='fdh-chapter-number'>CHAPTER 01</span>

					<b className='fdh-chapter-title'>{networkChapter.title}</b>

					<span className='fdh-chapter-description'>
						{networkChapter.description}
					</span>
				</span>

				<span className='fdh-chapter-chevron' aria-hidden='true'>
					⌄
				</span>
			</summary>

			<div className='section-body fdh-chapter-body'>
				<h2>Follow the signal</h2>

				<div
					className='network-path'
					aria-label='Optical line terminal to customer devices'>
					{networkChapter.path.map((item, index) => (
						<div className='network-path-item' key={item}>
							<span>{String(index + 1).padStart(2, '0')}</span>

							<strong>{item}</strong>
						</div>
					))}
				</div>

				<p>{networkChapter.explanation}</p>

				<div className='fdh-callout fdh-note'>
					<b>Field mindset:</b> {networkChapter.note}
				</div>

				<a
					className='fdh-reference'
					href={networkChapter.reference.url}
					target='_blank'
					rel='noopener noreferrer'>
					<span>
						<b>{networkChapter.reference.title}</b>
						<small>{networkChapter.reference.description}</small>
					</span>

					<span aria-hidden='true'>↗</span>
				</a>
			</div>
		</details>
	)
}

export default function Manual() {
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

	const quickNavSections = [
		{
			id: networkChapter.id,
			title: networkChapter.title,
		},
		{
			id: fdhChapter.id,
			title: fdhChapter.title,
		},
		...manualContent.sections.map(section => ({
			id: `manual-${section.id}`,
			title: section.title,
		})),
	]

	return (
		<>
			<main ref={pageRef}>
				<section className='page'>
					<h1>{manualContent.title}</h1>

					<p className='sub'>{manualContent.subtitle}</p>

					{manualContent.intro.map((block, index) => (
						<ContentBlock
							key={`manual-intro-${index}`}
							block={block}
						/>
					))}

					<Disclosures container={page} />

					<NetworkChapter />
					<FdhChapter />

					<h2 className='manual-existing-heading'>
						Existing Field Workflow Reference
					</h2>

					{manualContent.sections.map(section => (
						<details
							id={`manual-${section.id}`}
							key={section.id}
							className='section-card'
							open>
							<summary>
								<b>{section.title}</b>

								<span className='plus' aria-hidden='true' />
							</summary>

							<div className='section-body'>
								{section.blocks.map((block, index) => (
									<ContentBlock
										key={`${section.id}-${index}`}
										block={block}
									/>
								))}
							</div>
						</details>
					))}
				</section>
			</main>

			<QuickNav
				sections={quickNavSections}
				scrollContainer={scrollContainer}
			/>
		</>
	)
}
