import { useEffect, useRef, useState } from 'react'

import {
	inventoryContent,
	type InventoryItem,
} from '../../assets/config/inventory'

import Disclosures from '../../components/disclosures/Disclosures'
import QuickNav from '../../components/quickNav/QuickNav'

import '../../components/quickNav/quickNav.scss'
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

					{inventoryContent.sections.map(section => (
						<details
							id={`inventory-${section.id}`}
							key={section.id}
							className='section-card'
							open>
							<summary>
								<b>{section.title}</b>

								<span className='plus' aria-hidden='true' />
							</summary>

							<div className='section-body'>
								<div className='inventory-list'>
									{section.items.map(item => (
										<InventoryCard
											key={item.name}
											item={item}
										/>
									))}
								</div>
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
