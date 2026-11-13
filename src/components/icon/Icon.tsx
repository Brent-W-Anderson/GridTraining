import type { IconType } from 'react-icons'

import {
	MdAccountTree,
	MdArrowForward,
	MdOpenInNew,
	MdVerticalAlignTop,
	MdVerticalAlignBottom,
	MdAdd,
	MdApartment,
	MdBuild,
	MdCable,
	MdCheckCircleOutline,
	MdCleaningServices,
	MdDescription,
	MdElectricalServices,
	MdExpandMore,
	MdHome,
	MdInventory2,
	MdLan,
	MdLightMode,
	MdLocationOn,
	MdOutlineRouter,
	MdPersonOutline,
	MdPlayCircleOutline,
	MdRoute,
	MdSearch,
	MdSettingsInputAntenna,
	MdSpeed,
	MdTroubleshoot,
	MdWifi,
	MdWifiOff,
} from 'react-icons/md'

const icons = {
	network: MdAccountTree,
	next: MdArrowForward,
	external: MdOpenInNew,
	top: MdVerticalAlignTop,
	bottom: MdVerticalAlignBottom,
	pole: MdSettingsInputAntenna,
	home: MdHome,
	route: MdRoute,
	box: MdInventory2,
	building: MdApartment,
	wifi: MdWifi,
	check: MdCheckCircleOutline,
	user: MdPersonOutline,
	tools: MdBuild,
	search: MdSearch,
	expand: MdExpandMore,
	toggle: MdAdd,
	document: MdDescription,
	play: MdPlayCircleOutline,
	fiber: MdCable,
	optical: MdLightMode,
	ethernet: MdLan,
	connector: MdElectricalServices,
	router: MdOutlineRouter,
	location: MdLocationOn,
	cleaning: MdCleaningServices,
	test: MdSpeed,
	diagnose: MdTroubleshoot,
	offline: MdWifiOff,
} satisfies Record<string, IconType>

export type IconName = keyof typeof icons

export default function Icon({ name }: { name: IconName }) {
	const MaterialIcon = icons[name]

	return (
		<MaterialIcon
			className='app-icon'
			aria-hidden='true'
			focusable='false'
			style={{ stroke: 'none' }}
		/>
	)
}
