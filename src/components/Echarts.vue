<script setup lang="ts">
	import { defineProps, ref, onMounted, PropType } from "vue"
	import { EChartsOption } from "echarts"
	import * as echarts from "echarts"

	const echartRef = ref<HTMLElement>()
	const props = defineProps({
		width: {
			type: String as PropType<string>,
			default: "100%"
		},
		height: {
			type: String as PropType<string>,
			default: "100%"
		},
		option: {
			type: Object as PropType<EChartsOption>
		}
	})
	// 初始化
	const init = (option: EChartsOption) => {
		if (!echartRef.value || !option) return
		let myChart = echarts.init(echartRef.value)
		myChart.setOption(option)
	}
	onMounted(() => {
		init(props.option as EChartsOption)
	})
</script>
<template>
	<div ref="echartRef" :style="{ height, width }"></div>
</template>
<!-- <script lang="ts">
	import { defineComponent, ref, PropType, watch, onMounted } from "vue"
	import { EChartsOption } from "echarts"
	import * as echarts from "echarts"

	export default defineComponent({
		props: {
			width: {
				type: String as PropType<string>,
				default: "100%"
			},
			height: {
				type: String as PropType<string>,
				default: "100%"
			},
			option: {
				type: Object as PropType<EChartsOption>
			}
		},
		setup(props) {
			const echartRef = ref<HTMLElement>()

			// 初始化
			const init = (option: EChartsOption) => {
				if (!echartRef.value) return
				let myChart = echarts.init(echartRef.value)
				myChart.setOption(option)
			}

			// 监听数据是否变化渲染图表
			watch(
				() => props.option,
				() => {
					// console.log(props.option, ":props.option")

					init(props.option as EChartsOption)
				},
				{
					deep: true,
					immediate: true
				}
			)

			onMounted(() => {
				init(props.option as EChartsOption)
			})

			return {
				echartRef
			}
		}
	})
</script> -->
