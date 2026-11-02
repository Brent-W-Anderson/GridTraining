import { useEffect, useRef, useState, type SyntheticEvent } from 'react'

import {
	cheatContent,
	type CheatBlock,
	type CheatImageCard,
	type CheatInline,
	type CheatTable,
} from '../../assets/config/cheat'

import Disclosures from '../../components/disclosures/Disclosures'
import QuickNav from '../../components/quickNav/QuickNav'

import '../../components/quickNav/quickNav.scss'

function InlineContent({ content }: { content: readonly CheatInline[] }) {
	return (
		<>
			{content.map((segment, index) =>
				segment.strong ? (
					<b key={index}>{segment.text}</b>
				) : (
					<span key={index}>{segment.text}</span>
				),
			)}
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

function ImageCard({ card }: { card: CheatImageCard }) {
	return (
		<figure className='card'>
			<img src={card.src} alt={card.alt} onError={handleImageError} />

			<div className='missing'>{cheatContent.imageMissingText}</div>

			<figcaption className='cap'>
				<b>{card.title}</b>

				<br />

				{card.text}
			</figcaption>
		</figure>
	)
}

function TrainingTable({ table }: { table: CheatTable }) {
	return (
		<table>
			<tbody>
				<tr>
					{table.headers.map(header => (
						<th key={header}>{header}</th>
					))}
				</tr>

				{table.rows.map((row, rowIndex) => (
					<tr key={rowIndex}>
						{row.map((cell, columnIndex) => (
							<td
								key={columnIndex}
								className={
									columnIndex === table.termColumn
										? 'term'
										: undefined
								}>
								{cell}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}

function ContentBlock({ block }: { block: CheatBlock }) {
	switch (block.type) {
		case 'text':
			return (
				<p>
					<InlineContent content={block.content} />
				</p>
			)

		case 'path':
			return <div className='path'>{block.text}</div>

		case 'callout':
			return (
				<div className={block.style}>
					<InlineContent content={block.content} />
				</div>
			)

		case 'checklist':
			return (
				<div className='checklist'>
					{block.items.map(item => (
						<div className='check' key={item}>
							{item}
						</div>
					))}
				</div>
			)

		case 'image-grid':
			return (
				<div className='grid'>
					{block.items.map(card => (
						<ImageCard key={card.title} card={card} />
					))}
				</div>
			)

		case 'table':
			return <TrainingTable table={block} />
	}
}

export default function Cheat() {
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

	const quickNavSections = cheatContent.sections.map(section => ({
		id: `cheat-${section.id}`,
		title: section.title,
	}))

	return (
		<>
			<main ref={pageRef}>
				<section className='page'>
					<h1>{cheatContent.title}</h1>

					<p className='sub'>{cheatContent.subtitle}</p>

					<Disclosures container={page} />

					{cheatContent.sections.map(section => (
						<details
							id={`cheat-${section.id}`}
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
