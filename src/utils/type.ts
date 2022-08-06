import { Ref } from "vue"
/**
 * 适配器类型
 */
export interface PicType {
	appRef: Ref<HTMLElement>
	calcRate: () => void
	windowScreen: () => void
}

/**
 * 能源图形类型
 */
export interface EnergyType {
	value: number
	name: string
}
