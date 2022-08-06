<script lang="ts" setup>
	import { ref, onMounted } from "vue"
	import { EChartsOption, graphic } from "echarts"
	import Echarts from "./Echarts.vue"
	import useState from "@/utils/useState"
	import ScrollNumberContainer from "./ScrollNumberContainer.vue"

	const { transactionsData, nums, initNums } = useState()

	// echarts图表配置
	const option = ref<EChartsOption>()
	option.value = {
		tooltip: {
			trigger: "axis",
			formatter: (params: any) => {
				// console.log(params[0], ":params")
				return `<div style="width: 4.75rem; height: 3.75rem; font-size: 0.875rem; line-height: 1;background-color: transparent;">
													<div style="color: #000; padding: 0.7125rem 0; padding-left: 0.5625rem;">${params[0].name}</div>
													<div style="color: #000; padding-left: 0.5625rem;" class="flex"><span>${params[0].marker}</span> <span>${params[0].value}条</span> </div>
												</div>`
			},
			axisPointer: {
				lineStyle: {
					width: 1,
					color: "#248cee"
				}
			},
			padding: 0
		},
		grid: {
			top: 50,
			bottom: 30,
			left: 76,
			right: 30
		},
		xAxis: {
			type: "category",
			data: transactionsData.value.map((item: any) => item.time.replace(`${item.time.slice(0, 5)}`, "")),
			triggerEvent: true,
			splitLine: {
				show: false
			},
			axisLine: {
				show: true,
				lineStyle: {
					width: 1.5,
					color: "#043e8250"
				}
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				color: "#fff",
				fontSize: 14
			}
		},
		yAxis: {
			minInterval: 1,
			name: "设备可信采集数（单位：条）",
			nameTextStyle: {
				color: "#fff",
				padding: [0, 0, 10, 95],
				fontSize: 14
			},
			type: "value",
			splitLine: {
				show: false
			},
			axisLine: {
				show: true,
				lineStyle: {
					width: 1.5,
					color: "#043e8250"
				}
			},
			axisLabel: {
				color: "#fff",
				fontSize: 14
			}
		},
		series: [
			{
				data: transactionsData.value.map((item: any) => item.dataCount),
				type: "line",
				symbolSize: 0,
				// color: "#000",
				lineStyle: {
					width: 2,
					color: "#f95455"
				},
				zlevel: 0,
				areaStyle: {
					color: new graphic.LinearGradient(
						0,
						0,
						0,
						1,
						[
							{
								offset: 0,
								color: "#71496B"
							},
							{
								offset: 0.8,
								color: "#71496B30"
							}
						],
						false
					)
				}
			},
			{
				type: "bar",
				zlevel: 1,
				animation: false,
				barWidth: 7,
				data: transactionsData.value.map((item: any) => item.dataCount),
				tooltip: {
					show: false
				},
				itemStyle: {
					color: {
						type: "linear",
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: "#c9ff24" // 0% 处的颜色
							},
							{
								offset: 1,
								color: "#506d8f10" // 100% 处的颜色
							}
						]
					}
				}
			}
		]
	}

	onMounted(() => {
		initNums(123)
	})
</script>
<template>
	<div class="base-container c-l1">
		<div class="title">数据采集</div>
		<div class="absolute base-content">
			<div class="flex items-center justify-center">
				<div>终端总数</div>
				<div class="flex nums">
					<ScrollNumberContainer :num="nums[0]" />
					<ScrollNumberContainer :num="nums[1]" />
					<ScrollNumberContainer :num="nums[2]" />
					<ScrollNumberContainer :num="nums[3]" />
					<ScrollNumberContainer :num="nums[4]" />
					<ScrollNumberContainer :num="nums[5]" />
				</div>
			</div>

			<!-- 图表 -->
			<div class="absolute echarts">
				<Echarts :option="option" />
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
	.c-l1 {
		.base-content {
			.base-position-w();
			top: 67.36px;
			padding: 21px 34px;
			.echarts {
				left: 0;
				bottom: 33.6px;
				height: 220px;
				width: 500px;
			}

			.nums {
				margin-left: 75px;
			}
		}
	}
</style>
