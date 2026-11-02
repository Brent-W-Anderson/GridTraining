import { useEffect, useRef, useState, type SyntheticEvent } from 'react'

import {
	roleContent,
	type RoleBlock,
	type RoleImageCard,
	type RoleTable,
} from '../../assets/config/role'

import Disclosures from '../../components/disclosures/Disclosures'
import QuickNav from '../../components/quickNav/QuickNav'

import '../../components/quickNav/quickNav.scss'

function handleImageError(event: SyntheticEvent<HTMLImageElement>) {
	const image = event.currentTarget

	const missing = image.nextElementSibling

	image.style.display = 'none'

	if (missing?.classList.contains('missing')) {
		missing.classList.add('visible')
	}
}

function ImageCard({ card }: { card: RoleImageCard }) {
	return (
		<figure className='card'>
			<img src={card.src} alt={card.alt} onError={handleImageError} />

			<div className='missing'>{roleContent.imageMissingText}</div>

			<figcaption className='cap'>
				<b>{card.title}</b>

				<br />

				{card.text}
			</figcaption>
		</figure>
	)
}

function TrainingTable({ table }: { table: RoleTable }) {
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

function ContentBlock({ block }: { block: RoleBlock }) {
	switch (block.type) {
		case 'text':
			return <p>{block.text}</p>

		case 'strong-text':
			return (
				<p>
					<b>{block.strong}</b> {block.text}
				</p>
			)

		case 'callout':
			return (
				<div className={block.style}>
					<b>{block.strong}</b> {block.text}
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

export default function Role() {
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

	const quickNavSections = roleContent.sections.map(section => ({
		id: `role-${section.id}`,
		title: section.title,
	}))

	return (
		<>
			<main ref={pageRef}>
				<section className='page'>
					<h1>{roleContent.title}</h1>

					<div className='path'>{roleContent.path}</div>

					<p className='sub'>{roleContent.subtitle}</p>

					<Disclosures container={page} />

					{roleContent.sections.map(section => (
						<details
							id={`role-${section.id}`}
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
