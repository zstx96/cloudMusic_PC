import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	server: {
		proxy: {
			'/api': {
				target: 'http://43.138.70.181:3000/',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
})
