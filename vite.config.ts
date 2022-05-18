import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

import importToCDN, { autoComplete } from 'vite-plugin-cdn-import'
import viteCompression from 'vite-plugin-compression'

const cdnBase = 'https://cdn.bootcdn.net/ajax/libs/'
const genCdnUrl = (name: string, version: string) => `${cdnBase}${name}/`
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), viteCompression()],
	server: {
		proxy: {
			'/api': {
				target: 'http://101.42.162.54:3000/',
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
