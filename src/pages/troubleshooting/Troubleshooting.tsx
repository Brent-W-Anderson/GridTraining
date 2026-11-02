import { useEffect, useRef, useState } from 'react'

import {
	troubleshootingContent,
	type TroubleshootingBlock,
	type TroubleshootingCard,
	type TroubleshootingInline,
	type TroubleshootingTable,
} from '../../assets/config/troubleshooting'

import Disclosures from '../../components/disclosures/Disclosures'
import QuickNav from '../../components/quickNav/QuickNav'

import '../../components/quickNav/quickNav.scss'
import './troubleshooting.scss'

function InlineContent({
	content,
}: {
	content: readonly TroubleshootingInline[]
}) {
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

function TrainingTable({ table }: { table: TroubleshootingTable }) {
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

function ContentBlock({ block }: { block: TroubleshootingBlock }) {
	switch (block.type) {
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

		case 'callout':
			return (
				<div className={block.style}>
					<InlineContent content={block.content} />
				</div>
			)

		case 'path':
			return <div className='path'>{block.text}</div>

		case 'images':
			return (
				<div
					className={
						block.items.length > 1 ? 'ref-images two' : 'ref-images'
					}>
					{block.items.map(image => (
						<img key={image.src} src={image.src} alt={image.alt} />
					))}
				</div>
			)

		case 'table':
			return <TrainingTable table={block} />

		case 'tools':
			return (
				<div className='tool-grid'>
					{block.items.map(tool => (
						<div className='tool-card' key={tool.title}>
							<img src={tool.src} alt={tool.alt} />

							<b>{tool.title}</b>

							<span>
								<InlineContent content={tool.content} />
							</span>
						</div>
					))}
				</div>
			)

		case 'links':
			return (
				<div className='resource-links'>
					{block.items.map(link => (
						<a
							key={link.href}
							href={link.href}
							target='_blank'
							rel='noreferrer'>
							{link.label}
						</a>
					))}
				</div>
			)
	}
}

function TroubleshootingCardContent({ card }: { card: TroubleshootingCard }) {
	return (
		<details className='ref-card' open>
			<summary>
				<span>
					<b>{card.title}</b>

					{card.subtitle && <small>{card.subtitle}</small>}
				</span>

				<span className='plus' aria-hidden='true' />
			</summary>

			<div className='ref-body'>
				{card.blocks.map((block, index) => (
					<ContentBlock key={`${card.id}-${index}`} block={block} />
				))}
			</div>
		</details>
	)
}

export default function Troubleshooting() {
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

	const quickNavSections = troubleshootingContent.sections.map(section => ({
		id: `troubleshooting-${section.id}`,
		title: section.title,
	}))

	return (
		<>
			<main ref={pageRef}>
				<section className='page'>
					<h1>{troubleshootingContent.title}</h1>

					<p className='sub'>{troubleshootingContent.subtitle}</p>

					<div className={troubleshootingContent.intro.style}>
						<InlineContent
							content={troubleshootingContent.intro.content}
						/>
					</div>

					<Disclosures container={page} />

					{troubleshootingContent.sections.map(section => (
						<details
							id={`troubleshooting-${section.id}`}
							key={section.id}
							className='section-card'
							open>
							<summary>
								<b>{section.title}</b>

								<span className='plus' aria-hidden='true' />
							</summary>

							<div className='section-body'>
								{section.cards && (
									<div className='ref-stack'>
										{section.cards.map(card => (
											<TroubleshootingCardContent
												key={card.id}
												card={card}
											/>
										))}
									</div>
								)}

								{section.blocks?.map((block, index) => (
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
