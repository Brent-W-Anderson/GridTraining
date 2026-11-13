import {
	videos,
	cabinetParts,
	findingSteps,
	problems,
	fdhChapter,
} from '../../../assets/config/manualChapters'
import './fdh.scss'

export default function FdhChapter() {
	return (
		<details id={fdhChapter.id} className='section-card fdh-chapter' open>
			<summary>
				<span className='fdh-chapter-icon' aria-hidden='true'>
					<svg viewBox='0 0 24 24' fill='none'>
						<rect x='4' y='2' width='16' height='20' rx='2' />
						<path d='M8 6h8M8 10h8M8 14h8M8 18h8' />
					</svg>
				</span>

				<span className='fdh-chapter-heading'>
					<span className='fdh-chapter-number'>CHAPTER 02</span>

					<b className='fdh-chapter-title'>{fdhChapter.title}</b>

					<span className='fdh-chapter-description'>
						{fdhChapter.description}
					</span>
				</span>

				<span className='fdh-chapter-chevron' aria-hidden='true'>
					<svg viewBox='0 0 24 24' fill='none'>
						<path d='m6 9 6 6 6-6' />
					</svg>
				</span>
			</summary>

			<div className='section-body fdh-chapter-body'>
				<div className='fdh-intro'>
					<h2>Learn to navigate the cabinet</h2>

					<p>
						A <b>Fiber Distribution Hub (FDH)</b> connects
						provider-side feeder fibers to downstream distribution
						fibers, often through passive optical splitters.
					</p>

					<p>
						Your goal is to identify the customer's documented
						distribution path, understand the corresponding splitter
						connection, and verify the assignment without
						interrupting another customer.
					</p>
				</div>

				<section className='fdh-section'>
					<div className='fdh-section-heading'>
						<span className='fdh-eyebrow'>WATCH FIRST</span>

						<h2>Real FDH Training Videos</h2>

						<p>
							Start with actual manufacturer demonstrations. These
							show specific cabinet families, so their layouts may
							differ from your field equipment.
						</p>
					</div>

					<div className='fdh-video-grid'>
						{videos.map((video, index) => (
							<a
								key={video.url}
								className='fdh-video'
								href={video.url}
								target='_blank'
								rel='noopener noreferrer'>
								<div className='fdh-video-cover'>
									<span className='fdh-video-index'>
										VIDEO{' '}
										{String(index + 1).padStart(2, '0')}
									</span>

									<span
										className='fdh-play'
										aria-hidden='true'>
										<svg viewBox='0 0 24 24'>
											<path d='m9 6 10 6-10 6z' />
										</svg>
									</span>

									<span className='fdh-video-source'>
										{video.source}
									</span>
								</div>

								<div className='fdh-video-content'>
									<h3>{video.title}</h3>
									<p>{video.description}</p>

									<span className='fdh-video-action'>
										Watch training ↗
									</span>
								</div>
							</a>
						))}
					</div>

					<div className='fdh-callout fdh-note'>
						<b>What to watch for:</b> Where splitter modules sit,
						how output jumpers are routed, how distribution ports
						are numbered, and where unused connectors are stored.
					</div>
				</section>

				<section className='fdh-section'>
					<div className='fdh-section-heading'>
						<span className='fdh-eyebrow'>CABINET ANATOMY</span>

						<h2>Know What You're Looking At</h2>
					</div>

					<div className='fdh-parts'>
						{cabinetParts.map((part, index) => (
							<div className='fdh-part' key={part.name}>
								<span className='fdh-part-number'>
									{String(index + 1).padStart(2, '0')}
								</span>

								<div>
									<h3>{part.name}</h3>
									<p>{part.description}</p>
								</div>
							</div>
						))}
					</div>

					<div className='fdh-callout fdh-warning'>
						<b>Important:</b> Distribution port 18 does not
						necessarily connect to splitter output 18. Never assume
						those numbers represent the same connection.
					</div>
				</section>

				<section className='fdh-section'>
					<div className='fdh-section-heading'>
						<span className='fdh-eyebrow'>FIELD WALKTHROUGH</span>

						<h2>How to Find an Assigned Fiber</h2>

						<p>
							Follow this sequence when reading a work order and
							locating its documented connection inside an FDH.
						</p>
					</div>

					<div className='fdh-steps'>
						{findingSteps.map((step, index) => (
							<div className='fdh-step' key={step.title}>
								<div className='fdh-step-number'>
									{index + 1}
								</div>

								<div>
									<h3>{step.title}</h3>
									<p>{step.text}</p>
								</div>
							</div>
						))}
					</div>
				</section>

				<section className='fdh-section'>
					<div className='fdh-section-heading'>
						<span className='fdh-eyebrow'>PRACTICE EXAMPLE</span>

						<h2>Find Distribution Port 58</h2>

						<p>
							This example is illustrative, not a universal
							cabinet numbering rule.
						</p>
					</div>

					<div className='fdh-example'>
						<div className='fdh-example-order'>
							<span>EXAMPLE WORK ORDER</span>
							<strong>FDH-12 · Distribution Port 58</strong>
						</div>

						<div className='fdh-example-arrow'>↓</div>

						<div className='fdh-example-box'>
							<b>Identify the distribution panel</b>
							<p>
								If this cabinet's documentation assigns ports
								49–72 to panel 3, port 58 belongs to panel 3.
							</p>
						</div>

						<div className='fdh-example-arrow'>↓</div>

						<div className='fdh-example-box'>
							<b>Locate port 58</b>
							<p>
								Follow the actual numbering diagram and labels,
								not an assumed left-to-right or top-to-bottom
								sequence.
							</p>
						</div>

						<div className='fdh-example-arrow'>↓</div>

						<div className='fdh-example-box'>
							<b>Confirm the documented connection</b>
							<p>
								Compare the assigned splitter output, jumper
								identification, and physical connection with
								facility records.
							</p>
						</div>
					</div>

					<div className='fdh-callout fdh-note'>
						<b>Remember:</b> Finding the distribution port is not
						the same as identifying the correct splitter output.
						Both must be established independently.
					</div>
				</section>

				<section className='fdh-section'>
					<div className='fdh-section-heading'>
						<span className='fdh-eyebrow'>TROUBLESHOOTING</span>

						<h2>When Something Doesn't Match</h2>
					</div>

					<div className='fdh-problems'>
						{problems.map(problem => (
							<div className='fdh-problem' key={problem.symptom}>
								<h3>{problem.symptom}</h3>
								<p>{problem.action}</p>
							</div>
						))}
					</div>

					<div className='fdh-callout fdh-danger'>
						<b>Protect active service:</b> Never disconnect,
						relocate, or swap an unverified live jumper. Follow the
						provider's authorization, testing, and escalation
						procedures.
					</div>
				</section>

				<section className='fdh-section'>
					<div className='fdh-section-heading'>
						<span className='fdh-eyebrow'>
							MANUFACTURER REFERENCE
						</span>

						<h2>Cabinet Diagrams and Port Layouts</h2>
					</div>

					<a
						className='fdh-reference'
						href='https://www.commscope.com/globalassets/digizuite/1014341-tc-1596-ip-fdh3000-144.pdf'
						target='_blank'
						rel='noopener noreferrer'>
						<span>
							<b>CommScope FDH 3000 — Illustrated Manual</b>
							<small>
								Cabinet components, installation, and
								distribution-port references
							</small>
						</span>

						<span aria-hidden='true'>↗</span>
					</a>

					<div className='fdh-callout fdh-note'>
						<b>Equipment varies:</b> Always use the documentation
						and labeling for the actual cabinet in front of you.
						Manufacturer examples are training references, not AT&T
						or Quantum Fiber authorization.
					</div>
				</section>
			</div>
		</details>
	)
}
