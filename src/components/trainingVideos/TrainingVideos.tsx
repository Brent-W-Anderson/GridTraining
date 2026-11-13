import { useLayoutEffect, useRef, useState } from 'react'

import Icon from '../icon/Icon'

import './trainingVideos.scss'

type CaptionTrack = {
	src: string
	language: string
	label: string
	default?: boolean
}

type WalkthroughBase = {
	title: string
	href: string
	watchFor: string
}

export type Walkthrough = WalkthroughBase &
	(
		| {
				kind: 'youtube'
				videoId: string
		  }
		| {
				kind: 'local'
				src: string
				poster?: string
				captions?: readonly CaptionTrack[]
				unavailableText: string
		  }
	)

type TrainingVideosProps = {
	videos: readonly Walkthrough[]
	playLabel: string
	openLabel: string
}

export default function TrainingVideos({
	videos,
	playLabel,
	openLabel,
}: TrainingVideosProps) {
	const [activeKey, setActiveKey] = useState<string | null>(null)

	const [failedImages, setFailedImages] = useState<ReadonlySet<string>>(
		() => new Set(),
	)

	const [failedVideos, setFailedVideos] = useState<ReadonlySet<string>>(
		() => new Set(),
	)

	const playerRef = useRef<HTMLIFrameElement | HTMLVideoElement | null>(null)

	const sourceRef = useRef<HTMLAnchorElement | null>(null)

	useLayoutEffect(() => {
		if (!activeKey) return

		if (failedVideos.has(activeKey)) {
			sourceRef.current?.focus()
		} else {
			playerRef.current?.focus()
		}
	}, [activeKey, failedVideos])

	return (
		<div className='training-videos'>
			{videos.map(video => {
				const key =
					video.kind === 'local'
						? `local:${video.src}`
						: `youtube:${video.videoId}`

				const active = activeKey === key

				const poster =
					video.kind === 'local'
						? video.poster
						: `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`

				return (
					<article className='training-video' key={key}>
						<div className='training-video-media'>
							{active &&
							video.kind === 'local' &&
							failedVideos.has(key) ? (
								<p
									className='training-video-error'
									role='status'>
									{video.unavailableText}
								</p>
							) : active && video.kind === 'local' ? (
								<video
									ref={element => {
										playerRef.current = element
									}}
									src={video.src}
									poster={video.poster}
									aria-label={video.title}
									tabIndex={0}
									controls
									playsInline
									autoPlay
									preload='metadata'
									onError={() =>
										setFailedVideos(
											current =>
												new Set([...current, key]),
										)
									}>
									{video.captions?.map(track => (
										<track
											key={`${track.language}:${track.src}`}
											kind='captions'
											src={track.src}
											srcLang={track.language}
											label={track.label}
											default={track.default}
										/>
									))}

									{video.unavailableText}
								</video>
							) : active && video.kind === 'youtube' ? (
								<iframe
									ref={element => {
										playerRef.current = element
									}}
									title={video.title}
									src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&playsinline=1`}
									allow='autoplay; encrypted-media; picture-in-picture'
									referrerPolicy='strict-origin-when-cross-origin'
									allowFullScreen
								/>
							) : (
								<button
									type='button'
									className='training-video-preview'
									aria-label={`${playLabel}: ${video.title}`}
									onClick={() => setActiveKey(key)}>
									{poster && !failedImages.has(key) && (
										<img
											src={poster}
											alt=''
											width={480}
											height={360}
											loading='lazy'
											onError={() =>
												setFailedImages(
													current =>
														new Set([
															...current,
															key,
														]),
												)
											}
										/>
									)}

									<span className='training-video-play'>
										<Icon name='play' />
									</span>
								</button>
							)}
						</div>

						<div className='training-video-copy'>
							<h2>{video.title}</h2>
							<p>{video.watchFor}</p>

							<a
								ref={active ? sourceRef : undefined}
								href={video.href}
								target='_blank'
								rel='noopener noreferrer'>
								{openLabel}
							</a>
						</div>
					</article>
				)
			})}
		</div>
	)
}
