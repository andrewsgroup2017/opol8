module.exports = {
	lintOnSave: true,
	// proxy: {
	//   "/api": "http://localhost:8000"
	// },
	configureWebpack: {
		devtool: 'sourcemap',
		resolve: {
			// alias: {
			//   vue: "vue/dist/vue.js"
			// }
		}
	}
};
