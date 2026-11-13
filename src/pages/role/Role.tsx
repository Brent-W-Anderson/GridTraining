import { useLayoutEffect, useRef, useState, type SyntheticEvent } from 'react'

import {
	roleContent,
	type RoleBlock,
	type RoleImageCard,
	type RoleTable,
} from '../../assets/config/role'

import Icon from '../../components/icon/Icon'
import TrainingChapter from '../../components/trainingChapter/TrainingChapter'
import Disclosures from '../../components/disclosures/Disclosures'
import QuickNav from '../../components/quickNav/QuickNav'

type ChapterIconName = 'user' | 'network' | 'tools' | 'search'

type ChapterMeta = {
	description: string
	icon: ChapterIconName
}

const chapterMeta: Record<string, ChapterMeta> = {
	job: {
		description: 'Responsibilities, expectations, and a successful job.',
		icon: 'user',
	},
	network: {
		description: 'Follow the fiber connection from provider to home.',
		icon: 'network',
	},
	field: {
		description: 'Installations, repairs, FDH work, and equipment.',
		icon: 'tools',
	},
	mindset: {
		description: 'Find the problem, verify the fix, and document it.',
		icon: 'search',
	},
}

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
							<Icon name='check' />
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

	useLayoutEffect(() => {
		const currentPage = pageRef.current

		if (!currentPage) return

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
			<main ref={pageRef} className='role-page'>
				<section className='page'>
					<h1>{roleContent.title}</h1>

					<div className='path'>{roleContent.path}</div>
					<p className='sub'>{roleContent.subtitle}</p>

					<Disclosures container={page} />

					<div className='training-chapters'>
						{roleContent.sections.map((section, index) => {
							const meta = chapterMeta[section.id] ?? {
								description: 'Explore this training chapter.',
								icon: 'network' as const,
							}

							return (
								<TrainingChapter
									key={section.id}
									prefix='role'
									index={index}
									chapter={{
										id: section.id,
										title: section.title,
										...meta,
									}}>
									{section.blocks.map((block, blockIndex) => (
										<ContentBlock
											key={`${section.id}-${blockIndex}`}
											block={block}
										/>
									))}
								</TrainingChapter>
							)
						})}
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
