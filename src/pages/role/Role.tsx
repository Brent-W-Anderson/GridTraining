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
import './role.scss'

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

function ChapterIcon({ name }: { name: ChapterIconName }) {
	switch (name) {
		case 'user':
			return (
				<svg viewBox='0 0 24 24' fill='none' aria-hidden='true'>
					<circle cx='12' cy='7' r='4' />
					<path d='M4.5 21v-2a7.5 7.5 0 0 1 15 0v2' />
				</svg>
			)

		case 'network':
			return (
				<svg viewBox='0 0 24 24' fill='none' aria-hidden='true'>
					<rect x='9' y='2' width='6' height='5' rx='1' />
					<rect x='2' y='17' width='6' height='5' rx='1' />
					<rect x='16' y='17' width='6' height='5' rx='1' />
					<path d='M12 7v5M5 17v-5h14v5' />
				</svg>
			)

		case 'tools':
			return (
				<svg viewBox='0 0 24 24' fill='none' aria-hidden='true'>
					<path d='M14.5 6.5a5 5 0 0 0-6.8 6.8l-5.2 5.2a2 2 0 0 0 2.8 2.8l5.2-5.2a5 5 0 0 0 6.8-6.8l-3.2 3.2-3.8-1  -1-3.8z' />
				</svg>
			)

		case 'search':
			return (
				<svg viewBox='0 0 24 24' fill='none' aria-hidden='true'>
					<circle cx='10.5' cy='10.5' r='6.5' />
					<path d='m16 16 5 5M8 10.5l1.8 1.8L13.5 8.5' />
				</svg>
			)
	}
}

function ChevronIcon() {
	return (
		<svg viewBox='0 0 24 24' fill='none' aria-hidden='true'>
			<path d='m6 9 6 6 6-6' />
		</svg>
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
			<main ref={pageRef} className='role-page'>
				<section className='page'>
					<h1>{roleContent.title}</h1>

					<div className='path'>{roleContent.path}</div>

					<p className='sub'>{roleContent.subtitle}</p>

					<Disclosures container={page} />

					<div className='role-chapters'>
						{roleContent.sections.map((section, index) => {
							const meta = chapterMeta[section.id] ?? {
								description: 'Explore this training chapter.',
								icon: 'network' as const,
							}

							const number = String(index + 1).padStart(2, '0')

							return (
								<details
									id={`role-${section.id}`}
									key={section.id}
									className='section-card role-chapter'
									open>
									<summary>
										<span className='role-chapter-icon'>
											<ChapterIcon name={meta.icon} />
										</span>

										<span className='role-chapter-heading'>
											<span className='role-chapter-number'>
												CHAPTER {number}
											</span>

											<b className='role-chapter-title'>
												{section.title}
											</b>

											<span className='role-chapter-description'>
												{meta.description}
											</span>
										</span>

										<span className='role-chapter-chevron'>
											<ChevronIcon />
										</span>
									</summary>

									<div className='section-body role-chapter-body'>
										{section.blocks.map(
											(block, blockIndex) => (
												<ContentBlock
													key={`${section.id}-${blockIndex}`}
													block={block}
												/>
											),
										)}
									</div>
								</details>
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
