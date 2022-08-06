const { defineConfig } = require("@vue/cli-service")

module.exports = defineConfig({
	transpileDependencies: true,
	configureWebpack: {
		resolve: {
			alias: {
				assets: "@/assets" //配置路径别名，注意@是vue-cli自带的
			}
		}
	},
	css: {
		loaderOptions: {
			less: {
				additionalData: '@import "@/base.less";' //导入全局样式
			}
		}
	}
})
