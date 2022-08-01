import { ref } from "vue"
import { PicType } from "./type"

// 初始化大屏容器
export default function useInitScreen(): PicType {
	// 指定的容器
	const appRef = ref()
	// 定时函数
	const timer = ref()
	//默认值缩放
	const scale = {
		width: "1920",
		height: "1080"
	}
	// 设计稿（px）
	const baseWidth = 1920
	const baseHeight = 1080
	// 需保持的比例
	const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5))
	const calcRate = () => {
		// 当前宽高比
		const currentRate = parseFloat((window.innerWidth / window.innerHeight).toFixed(5))

		if (appRef.value) {
			if (currentRate > baseProportion) {
				// 表示为更宽时
				scale.width = ((window.innerHeight * baseProportion) / baseWidth).toFixed(5)
				scale.height = (window.innerHeight / baseHeight).toFixed(5)
				appRef.value.style.transform = `scale(${scale.width},${scale.height}) translate(-50%,-50%)`
			} else {
				// 表示为更高时
				scale.width = (window.innerWidth / baseProportion / baseHeight).toFixed(5)
				scale.height = (window.innerWidth / baseWidth).toFixed(5)
				appRef.value.style.transform = `scale(${scale.width},${scale.height}) translate(-50%,-50%)`
			}
		}
	}
	// 浏览器缩放
	const resize = () => {
		clearInterval(timer.value)
		timer.value = setTimeout(() => {
			calcRate()
		}, 200)
	}
	// 改变窗口大小重新绘制
	const windowScreen = () => {
		window.addEventListener("resize", resize)
	}
	return {
		appRef,
		calcRate,
		windowScreen
	}
}
