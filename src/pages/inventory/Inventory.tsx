import { useLayoutEffect, useRef, useState } from 'react'

import {
	inventoryContent,
	type InventoryItem,
} from '../../assets/config/inventory'

import TrainingChapter from '../../components/trainingChapter/TrainingChapter'
import Disclosures from '../../components/disclosures/Disclosures'
import QuickNav from '../../components/quickNav/QuickNav'

import './inventory.scss'

function InventoryCard({ item }: { item: InventoryItem }) {
	const [imageFailed, setImageFailed] = useState(false)

	return (
		<div className='inventory-item'>
			{!imageFailed ? (
				<img
					src={item.image}
					alt={item.alt}
					onError={() => setImageFailed(true)}
				/>
			) : (
				<div className='missing'>
					{inventoryContent.imageMissingText}
				</div>
			)}

			<div className='inventory-copy'>
				<b>{item.name}</b>
				<span>{item.description}</span>
			</div>
		</div>
	)
}

export default function Inventory() {
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

	const quickNavSections = inventoryContent.sections.map(section => ({
		id: `inventory-${section.id}`,
		title: section.title,
	}))

	return (
		<>
			<main ref={pageRef}>
				<section className='page'>
					<h1>{inventoryContent.title}</h1>
					<p className='sub'>{inventoryContent.subtitle}</p>

					<Disclosures container={page} />

					<div className='training-chapters'>
						{inventoryContent.sections.map((section, index) => (
							<TrainingChapter
								key={section.id}
								prefix='inventory'
								index={index}
								chapter={{
									id: section.id,
									title: section.title,
									icon: 'box',
								}}>
								<div className='inventory-list'>
									{section.items.map(item => (
										<InventoryCard
											key={item.name}
											item={item}
										/>
									))}
								</div>
							</TrainingChapter>
						))}
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
