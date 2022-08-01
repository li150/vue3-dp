<script lang="ts" setup>
	import { ref, watchEffect } from "vue"
	import { EChartsOption } from "echarts"
	import Echarts from "./Echarts.vue"
	import useState from "@/utils/useState"
	import CountTo from "./CountTo.vue"

	// 统一管理响应式值
	const { colors, largeScreenData, sectorData } = useState()

	// watchEffect(() => {
	// 	// 用来做响应性追踪
	// 	console.log(largeScreenData.value.customerCount)
	// })
	// largeScreenData.value.customerCount = 11

	// 初始化数据

	// echarts图表配置
	const option = ref<EChartsOption | any>({
		tooltip: {
			trigger: "item",
			formatter: (params: any) => {
				return `<div style="width: 13.75rem; height: 3.75rem; font-size: 0.875rem; line-height: 1;background-color: transparent;">
						<div style="color: #000; padding: 0.7125rem 0; padding-left: 0.5625rem;">${params.name}</div>
						<div style="color: #000; padding-left: 0.5625rem;" class="flex"><span>${params.marker}</span> <span>设备数:${params.value}台</span> <span style="margin-left: 0.8rem; padding-right: 0.5625rem;" class="flex justify-end flex-1">占比:${params.percent}%</span></div>
					</div>`
			},
			borderColor: "#ffffff86",
			position: "top",
			backgroundColor: "#ffffff86",
			padding: 0
		},
		legend: {
			orient: "vertical",
			itemGap: 18,
			bottom: 70,
			right: 74,
			itemWidth: 16,
			itemHeight: 16,
			icon: "circle",
			formatter: (name) => {
				let total = 0
				let target = 0
				for (let i = 0, l = sectorData.value.length; i < l; i++) {
					total += sectorData.value[i].value
					if (sectorData.value[i].name == name) {
						target = sectorData.value[i].value
					}
				}
				return (
					"{a|" +
					name +
					"}" +
					`{${
						name === sectorData.value[0].name
							? "b"
							: name === sectorData.value[1].name
							? "c"
							: name === sectorData.value[2].name
							? "d"
							: name === sectorData.value[3].name
							? "e"
							: ""
					}|` +
					`${(target / total) * 100 > 0 ? ((target / total) * 100).toFixed(2) : 0}` +
					"%}"
				)
			},
			textStyle: {
				//自定义颜色
				rich: {
					a: {
						// width: px2em(74),
						width: 75,
						color: "#fff",
						padding: [0, 0, 0, 4],
						align: "left",
						fontSize: 14
					},
					b: {
						color: colors.value[0],
						fontSize: 14
					},
					c: {
						color: colors.value[1],
						fontSize: 14
					},
					d: {
						color: colors.value[2],
						fontSize: 14
					},
					e: {
						color: colors.value[3],
						fontSize: 14
					}
				}
			}
		},
		series: [
			{
				name: "",
				type: "pie",
				radius: ["30%", "65%"],
				avoidLabelOverlap: false,
				itemStyle: {
					borderColor: "#141C5A",
					borderWidth: 4
				},
				color: colors.value,
				label: {
					show: false
				},
				emphasis: {
					label: {
						show: false,
						fontSize: 20,
						fontWeight: "bold"
					}
				},
				labelLine: {
					show: false
				},
				data: sectorData.value,
				clockwise: false,
				// startAngle: 180, //起始角度
				top: 100,
				left: -234
			}
		]
	})
</script>
<template>
	<div class="base-container c-r1">
		<div class="title">智能运维</div>
		<div class="absolute base-content">
			<div class="absolute flex text-center text-white smart-nav">
				<div class="flex-1">
					<div class="title1">客户数量</div>
					<div class="relative title2 t1">
						<CountTo :startVal="0" separator="" :endVal="largeScreenData?.customerCount" :duration="2000" />
					</div>
				</div>
				<div class="flex-1">
					<div class="title1">设备数量</div>
					<div class="relative title2 t2">
						<CountTo :startVal="0" separator="" :endVal="largeScreenData?.terminalsTotal" :duration="2000" />
					</div>
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
	.c-r1 {
		.base-content {
			.base-position-w();
			//汇总
			.smart-nav {
				top: 91.36px;
				left: 55px;
				right: 55px;

				.title1 {
					line-height: 1;
					font-size: @dp-font-base;
					margin: 0 0 9px 0;
				}

				.title2 {
					height: 39px;
					line-height: 39px;
					font-size: @dp-font-xl;

					span {
						position: relative;
						color: #fab31c;
					}

					&::before {
						position: absolute;
						top: 0;
						bottom: 0;
						left: 24px;
						right: 24px;
						content: "";
						background-image: url("assets/bj/smart.png");
						background-repeat: no-repeat;
						background-size: 147px 39px;
					}

					&.t1::after {
						position: absolute;
						top: 1.6px;
						right: 40px;
						content: "位";
						font-size: 14px;
						color: rgba(220, 220, 220, 0.8);
					}

					&.t2::after {
						position: absolute;
						top: 1.6px;
						right: 40px;
						content: "台";
						font-size: 14px;
						color: rgba(220, 220, 220, 0.8);
					}
				}
			}
			// echarts图表
			.echarts {
				.base-position-w();
				top: 67.36px;
			}
		}
	}
</style>
