<script lang="ts" setup>
	import { ref } from "vue"
	import ScrollNumberContainer from "./ScrollNumberContainer.vue"
	import useState from "../utils/useState"

	const { numIDX } = useState()
	const list = ref([
		{
			index: 1,
			name: "学校",
			kwh: 1863.82
		},
		{
			index: 2,
			name: "医疗机构",
			kwh: 1863.82
		},
		{
			index: 3,
			name: "办公园区",
			kwh: 1863.82
		},
		{
			index: 4,
			name: "公共场所",
			kwh: 1863.82
		},
		{
			index: 5,
			name: "公共场所1",
			kwh: 1863.82
		},
		{
			index: 6,
			name: "公共场所2",
			kwh: 1863.82
		}
		// {
		// 	index: 7,
		// 	name: "公共场所3",
		// 	kwh: 1863.82
		// }
		// {
		// 	index: 8,
		// 	name: "公共场所4",
		// 	kwh: 1863.82
		// }
	])

	setInterval(() => {
		// list.value.push({
		// 	index: 8,
		// 	name: "公共场所4",
		// 	kwh: 1863.82
		// })
	}, 2000)
</script>
<template>
	<div class="base-container c-l2">
		<div class="title">能效管理</div>
		<div class="absolute base-content">
			<div class="flex items-center justify-center">
				<div>电量总能耗</div>
				<div class="flex nums">
					<ScrollNumberContainer />
					<ScrollNumberContainer />
					<ScrollNumberContainer />
					<ScrollNumberContainer />
					<ScrollNumberContainer />
					<ScrollNumberContainer />
				</div>
			</div>
			<div>
				<div class="mt-4 mb-3 text-center list-title">机构单位面积月能耗排名</div>
				<div class="flex flex-col m-auto mt-2 list">
					<div class="flex items-center t-title">
						<div style="flex: 1" class="text-center">排名</div>
						<div style="flex: 1" class="text-center">机构</div>
						<div style="flex: 3" class="text-center">单位面积耗能（kw·h/m²/月）</div>
					</div>
					<div class="flex-1 l2-content">
						<TransitionGroup name="list">
							<div
								class="flex items-center item"
								v-for="(item, index) in list"
								:key="item.name"
								:style="{ top: -`${list.length * 22}px` }"
							>
								<div style="flex: 1" class="text-center">{{ numIDX(index) }}</div>
								<div style="flex: 1" class="text-center">{{ item.name }}</div>
								<div style="flex: 3; color: #f7c903" class="text-center">{{ item.kwh }}</div>
							</div>
						</TransitionGroup>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped lang="less">
	.c-l2 {
		.base-content {
			.base-position-w();
			top: 67.36px;
			padding: 21px 34px;
			.nums {
				margin-left: 75px;
			}

			.list-title {
				.list-title {
					color: #fff;
					font-size: 16px;
					margin: auto;
					text-align: center;
				}
			}
			.list {
				width: 400px;
				height: 238px;
				border: 1px solid #0a96d1;
				color: #1cbbd9;
				font-size: 14px;
				overflow: hidden;
				> .t-title {
					min-height: 33px;
				}

				.l2-content {
					width: 400px;
					height: 203px;
					overflow: hidden;
					> .item {
						height: 29px;
						width: 100%;
						position: relative;
						top: 0;
						&:nth-child(2n) {
							background: #00468744;
						}
						&:nth-child(2n + 1) {
							background: #00468768;
						}
					}

					.list-enter-active,
					.list-leave-active {
						transition: all 0.5s ease initial;
					}
					.list-enter-from,
					.list-leave-to {
						// opacity: 0;
						transform: translateY(22px);
					}
				}
			}
		}
	}
</style>
