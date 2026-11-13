
/** Image assets are uploaded individually to the media-v1 GitHub Release. */
const releaseAssets =
	'https://github.com/Brent-W-Anderson/GridTraining/releases/download/media-v1/'

export function releaseImage(filename: string): string {
	return `${releaseAssets}${filename}`
}
