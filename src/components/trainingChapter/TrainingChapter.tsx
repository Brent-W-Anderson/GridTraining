import type { ReactNode } from 'react'

import type { IconName } from '../icon/Icon'
import { chapterIcons } from '../../assets/config/chapterIcons'

import Icon from '../icon/Icon'

type TrainingChapterProps = {
	chapter: {
		id: string
		title: string
		icon: IconName
		description?: string
		steps?: readonly string[]
	}
	index: number
	prefix: string
	children?: ReactNode
}

export default function TrainingChapter({
	chapter,
	index,
	prefix,
	children,
}: TrainingChapterProps) {
	const id = `${prefix}-${chapter.id}`
	const icon = chapterIcons[id] ?? chapter.icon

	return (
		<details id={id} className='section-card training-chapter' open>
			<summary>
				<span className='training-chapter-icon'>
					<Icon name={icon} />
				</span>

				<span className='training-chapter-heading'>
					<span className='training-chapter-number'>
						CHAPTER {String(index + 1).padStart(2, '0')}
					</span>

					<b className='training-chapter-title'>{chapter.title}</b>

					{chapter.description && (
						<span className='training-chapter-description'>
							{chapter.description}
						</span>
					)}
				</span>

				<span className='training-chapter-chevron'>
					<Icon name='expand' />
				</span>
			</summary>

			<div className='section-body training-chapter-body'>
				{children ?? (
					<ol className='training-steps'>
						{(chapter.steps ?? []).map(step => (
							<li key={step}>{step}</li>
						))}
					</ol>
				)}
			</div>
		</details>
	)
}
