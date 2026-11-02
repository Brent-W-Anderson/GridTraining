import { useEffect, useRef, useState, type SyntheticEvent } from 'react'

import {
	manualContent,
	type ManualBlock,
	type ManualImageCard,
	type ManualInline,
} from '../../assets/config/manual'

import Disclosures from '../../components/disclosures/Disclosures'
import QuickNav from '../../components/quickNav/QuickNav'

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

	const quickNavSections = manualContent.sections.map(section => ({
		id: `manual-${section.id}`,
		title: section.title,
	}))

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
