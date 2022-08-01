<script lang="ts" setup>
	import { onMounted } from "vue"
	import ContentL1 from "./components/ContentL1.vue"
	import ContentL2 from "./components/ContentL2.vue"
	import ContentR1 from "./components/ContentR1.vue"
	import ContentR2 from "./components/ContentR2.vue"
	import ContentC1 from "./components/ContentC1.vue"
	import useScreen from "./utils/useScreen"
	import logo from "assets/logo.png"
	// 适配器
	const { appRef, calcRate, windowScreen } = useScreen()
	onMounted(() => {
		calcRate()
		windowScreen()
	})
</script>
<template>
	<div class="text-center">
		<img alt="Vue logo" :src="logo" />
	</div>
	<div ref="appRef" class="appRef">
		<div class="text-center header"> 高速上链区块链大屏 </div>
		<div class="absolute content">
			<!-- 左上 -->
			<div class="absolute l1">
				<ContentL1 />
			</div>
			<!-- 左下 -->
			<div class="absolute l2">
				<ContentL2 />
			</div>
			<!-- 中间 -->
			<div class="absolute c1">
				<ContentC1 />
			</div>
			<!-- 右上 -->
			<div class="absolute r1">
				<ContentR1 />
			</div>
			<!-- 右下 -->
			<div class="absolute r2">
				<ContentR2 />
			</div>
		</div>
	</div>
</template>

<style lang="less">
	html,
	body,
	#app {
		width: 100%;
		height: 100%;
		background-color: @dp-bg;
		color: #fff;
	}
	.appRef {
		width: 1920px;
		height: 1080px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		transform-origin: left top;
		background-image: url("@/assets/bj/bj.png");
		background-repeat: no-repeat;
		background-size: 100% 100%;
		// 头部
		.header {
			height: 106px;
			line-height: 86px;
			background-image: url("@/assets/images/header.png");
			background-repeat: no-repeat;
			background-size: cover;
			font-size: 28px;
			font-family: "Microsoft YaHei";
			color: @baseColor-1;
			font-weight: bold;
		}
		//内容
		.content {
			top: 106px;
			left: 0;
			right: 0;
			bottom: 0;
			// 左上
			.l1 {
				left: 29px;
				.baseWidth-2();
			}
			// 左下
			.l2 {
				top: 478px;
				left: 29px;
				.baseWidth-2();
			}
			// 中间
			.c1 {
				left: 547px;
				.baseWidth-center-1();
			}
			// 右上
			.r1 {
				left: 1392px;
				.baseWidth-2();
			}
			// 右下
			.r2 {
				top: 478px;
				left: 1395px;
				.baseWidth-2();
			}
		}
	}
</style>
