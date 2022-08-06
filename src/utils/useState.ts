import { ref, readonly } from "vue"
import { EnergyType } from "@/utils/type"
import { CountUp } from "countup.js"

// 整体大屏数据
const largeScreenData = ref({
	customerCount: 4,
	terminalsTotal: 24,
	annualNumber: 12,
	plannedNumber: 24,
	responseNumber: 20,
	listdata: ["2021年", "2020年", "2019年"], //年份列表
	selectshow: false,
	currentValue: "选择年份",
	responseGraphs: {
		xData: ["响应申报", "计划响应", "执行响应"],
		wcolor: ["#2ceaff", "#146574"],
		data1: [12, 24, 20]
	} //
})
/**
 * ---左上---
 */
const transactionsData = ref([
	{ time: "2021-11-12", dataCount: 39 },
	{ time: "2021-11-11", dataCount: 32 },
	{ time: "2021-11-10", dataCount: 123 },
	{ time: "2021-11-09", dataCount: 34 },
	{ time: "2021-11-08", dataCount: 53 },
	{ time: "2021-11-07", dataCount: 13 },
	{ time: "2021-11-06", dataCount: 43 }
])

// 动画展示的数据
const nums = ref([0, 0, 0, 0, 0, 0])
// num 传入总端总数
const initNums = (num: number) => {
	const count = num
	const num6 = count % 10
	nums.value[5] = num6
	const num5 = ~~((count / 10) % 10)
	nums.value[4] = num5
	const num4 = ~~((count / 100) % 10)
	nums.value[3] = num4
	const num3 = ~~((count / 1000) % 10)
	nums.value[2] = num3
	const num2 = ~~((count / 10000) % 10)
	nums.value[1] = num2
	const num1 = ~~((count / 100000) % 10)
	nums.value[0] = num1
	for (let i = 6; i >= 1; i--) {
		const countUp = new CountUp(`num-${i}`, eval(`num${i}`))
		countUp.start()
	}
}

/**
 * 左下
 */
const numIDX = (num: number) => {
	return +num + 1
}
/**
 * ---右上---
 */
// 图形颜色
const colors = ref(["#0bcfc9", "#fa940b", "#4088f1", "#f13533"])
// 初始化数据-右上的值
const sectorData = ref<EnergyType[]>([
	{ value: 10, name: "电能源" },
	{ value: 2, name: "环境能源" },
	{ value: 8, name: "水能源" },
	{ value: 6, name: "其他能源" }
])

/**
 * ---右下---
 */

/**
 * transactionsData 左上数据
 * colors 图形颜色
 * largeScreenData 右上数据
 * sectorData  右上数据
 */
const useState = () => {
	// 设置只读响应式值
	return {
		transactionsData: readonly(transactionsData),
		colors: readonly(colors),
		largeScreenData, //: readonly(largeScreenData),
		sectorData: readonly(sectorData),
		nums,
		initNums,
		numIDX
	}
}

export default useState
