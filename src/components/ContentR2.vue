<script lang="ts" setup>
	import { ref } from "vue"
	import { EChartsOption, graphic } from "echarts"
	import CountTo from "./CountTo.vue"
	import Echarts from "./Echarts.vue"
	import useState from "@/utils/useState"

	const { largeScreenData } = useState()

	// 选择年份
	const selectClick = () => {
		largeScreenData.value.selectshow = !largeScreenData.value.selectshow
	}
	const selectName = (value: string) => {
		largeScreenData.value.currentValue = value
		largeScreenData.value.selectshow = false
	}

	// 图表配置
	const option = ref<EChartsOption | any>({
		grid: {
			top: 139,
			left: 76,
			bottom: 59,
			right: 130
		},
		xAxis: {
			data: largeScreenData.value.responseGraphs.xData,
			axisTick: {
				show: false
			},
			axisLine: {
				show: true,
				lineStyle: {
					width: 1,
					color: largeScreenData.value.responseGraphs.wcolor[1]
				}
			},
			axisLabel: {
				interval: 0,
				color: "#fff",
				fontSize: 16,
				margin: 20 //刻度标签与轴线之间的距离。
			}
		},
		yAxis: {
			minInterval: 1,
			name: "用户(单位：位)",
			nameTextStyle: {
				fontSize: 14,
				padding: [0, 0, 2, 10],
				color: largeScreenData.value.responseGraphs.wcolor[0]
			},
			splitLine: {
				show: true,
				lineStyle: {
					width: 1,
					color: largeScreenData.value.responseGraphs.wcolor[1]
				}
			},
			axisLine: {
				show: true,
				lineStyle: {
					width: 1,
					color: largeScreenData.value.responseGraphs.wcolor[1]
				}
			},
			axisLabel: {
				color: largeScreenData.value.responseGraphs.wcolor[0],
				fontSize: 14
			}
			// max: 10
			// max: Math.max(...data1.value) + Math.ceil(Math.max(...data1.value) / 5)
		},
		series: [
			{
				name: "2020",
				type: "bar",
				barWidth: 20,
				barGap: "-100%",
				itemStyle: {
					//lenged文本
					opacity: 1,
					color: ((params) => {
						return new graphic.LinearGradient(
							0,
							0,
							0,
							1,
							[
								{
									offset: 0,
									color: "#eb5a58" // 0% 处的颜色
								},
								{
									offset: 1,
									color: "#fcfe2a" // 100% 处的颜色
								}
							],
							false
						)
					})()
				},
				data: largeScreenData.value.responseGraphs.data1
			},
			{
				type: "bar",
				barWidth: 20,
				barGap: "-100%",
				stack: "广告",
				itemStyle: {
					color: "transparent"
				},
				data: largeScreenData.value.responseGraphs.data1
			},
			{
				//顶部圆片
				name: "",
				type: "pictorialBar",
				symbolSize: [20, 10],
				symbolOffset: [0, -5],
				z: 12,
				itemStyle: {
					opacity: 1,
					color: "#eb5a58"
				},
				label: {
					show: true,
					position: "top",
					fontSize: 16,
					color: "#fff"
				},
				symbolPosition: "end",
				data: largeScreenData.value.responseGraphs.data1
			},
			{
				//底部圆片
				name: "",
				type: "pictorialBar",
				symbolSize: [20, 8],
				symbolOffset: [0, 5],
				z: 10,
				itemStyle: {
					opacity: 1,
					color: "#fcfe2a"
				},
				data: [1, 1, 1]
			}
		]
	})
</script>
<template>
	<div class="base-container c-r2">
		<div class="title">需求响应</div>
		<div class="absolute base-content">
			<div class="absolute flex text-center text-white demand-nav">
				<div class="flex-1">
					<div class="title">年度申报用户数</div>
					<div class="relative warp-t2">
						<CountTo :startVal="0" separator="" :endVal="largeScreenData.annualNumber" :duration="2000" />
					</div>
				</div>
				<div class="flex-1">
					<div class="title">计划响应用户数</div>
					<div class="relative warp-t2 t2">
						<CountTo :startVal="0" separator="" :endVal="largeScreenData.plannedNumber" :duration="2000" />
					</div>
				</div>
				<div class="flex-1">
					<div class="title">执行响应用户数</div>
					<div class="relative warp-t2 t3">
						<CountTo :startVal="0" separator="" :endVal="largeScreenData.responseNumber" :duration="2000" />
					</div>
				</div>
			</div>
			<!-- 选择年份 -->
			<div class="absolute select-warp">
				<div class="relative xbsjselect">
					<div class="xbsjselect-selectdiv" @click="selectClick">
						<span class="xbsjselect-selectText">{{ largeScreenData.currentValue }}</span>
						<button class="absolute xbsjselect-selectButton" :class="{ triangle: largeScreenData.selectshow }"></button>
					</div>
					<ul class="absolute xbsjselect-selectOption" v-show="largeScreenData.selectshow">
						<li v-for="(ct, index) in largeScreenData.listdata" :key="index" @click="selectName(ct)">
							<span>{{ ct }}</span>
						</li>
					</ul>
				</div>
			</div>
			<!-- 图表 -->
			<div class="absolute echarts">
				<Echarts :option="option" />
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
	.c-r2 {
		.base-content {
			.base-position-w();
			// 顶部
			.demand-nav {
				top: 83.36px;
				left: 19px;
				right: 19px;

				.title {
					line-height: 1;
					font-size: @dp-font-base;
				}

				.warp-t2 {
					font-size: @dp-font-lg;
					color: #ffbb19;
					z-index: 99;

					&.t2 {
						color: #0cd0ca;
					}

					&.t3 {
						color: #4086f0;
					}

					&::before {
						position: absolute;
						content: "";
						top: 0;
						bottom: 0;
						left: 12px;
						right: 12px;
						height: 33px;
						line-height: 33px;
						margin: auto;
						background-image: url("assets/bj/demand.png");
						background-repeat: no-repeat;
						background-size: 132px 33px;
						z-index: -1;
					}
				}
			}
			// 底部
			.select-warp {
				top: 160px;
				right: 29px;
				z-index: 999;
				color: #fff;

				.xbsjselect {
					width: 100px;
					-webkit-user-select: none; /* Chrome/Safari/Opera */
					-ms-user-select: none; /* Internet Explorer/Edge */
					user-select: none;

					.xbsjselect-selectdiv {
						display: inline-block;
						width: 100%;
						background: transparent;
						height: 28px;
						position: relative;
						text-align: left;
						cursor: pointer;
						padding-left: 13px;
						border-radius: 3px;
						border: 1px solid #3695d8;
						.xbsjselect-selectText {
							font-size: 14px;
						}
						.xbsjselect-selectButton {
							top: 8.4px;
							right: 6px;
							width: 9.6px;
							height: 11.2px;
							border: none;
							background: url("assets/images/triangle.png") no-repeat;
							background-size: contain;
							cursor: pointer;
							outline: none;

							&.triangle {
								width: 9.6px;
								height: 11.2px;
								background: url("assets/images/theabove.png") no-repeat;
								background-size: contain;
							}
						}
					}

					.xbsjselect-selectOption {
						width: 100%;
						background: transparent;
						border: 1px solid #3695d8;
						border-top: 0;
						border-radius: 0 0 4px 4px;
						list-style: none;
						overflow: auto;
						z-index: 1;

						li {
							width: 100%;
							height: 26px;
							font-size: 14px;
							color: rgba(221, 221, 221, 1);
							line-height: 26px;
							cursor: pointer;
							span {
								display: inline-block;
								height: 26px;
								position: relative;
								left: 11px;
							}

							&:hover {
								background: rgba(107, 107, 107, 1);
							}
						}
					}
				}
			}
			.echarts {
				.base-position-w();
				top: 67.36px;
			}
		}
	}
</style>
