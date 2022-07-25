const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
	transpileDependencies: true,
	css: {
		loaderOptions: {
			less: {
				additionalData: '@import "@/base.less";' //导入全局样式
			}
		}
	}
})
