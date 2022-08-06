<script lang="ts" setup>
	import { defineProps } from "vue"
	defineProps({
		num: {
			type: Number,
			default: 0
		}
	})
</script>
<template>
	<div class="flex flex-col items-center overflow-hidden scroll-number-container">
		<Transition>
			<div class="nums" :style="{ top: `-${num * 47}px` }">
				<div class="num">0</div>
				<div class="num">1</div>
				<div class="num">2</div>
				<div class="num">3</div>
				<div class="num">4</div>
				<div class="num">5</div>
				<div class="num">6</div>
				<div class="num">7</div>
				<div class="num">8</div>
				<div class="num">9</div>
			</div>
		</Transition>
	</div>
</template>
<style lang="less" scoped>
	.scroll-number-container {
		margin-right: 7px;
		color: #fab31c;
		background-size: 100% 100%;
		width: 36px;
		height: 47px;
		font-size: 36px;
		background-image: url(assets/images/number-container.png);
		> .nums {
			position: relative;
			top: 0;
			transition: top 0.5s;
			> .num {
				font-size: 28px;
				height: 47px;
				line-height: 47px;
			}
		}
	}
</style>
