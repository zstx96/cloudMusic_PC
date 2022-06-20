import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import viteCompression from 'vite-plugin-compression'

import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Inspect from 'vite-plugin-inspect'

const pathSrc = resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		viteCompression(),
		Inspect(),
		AutoImport({
			// Auto import functions from Vue, e.g. ref, reactive, toRef...
			// 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
			imports: ['vue', 'vue-router', '@vueuse/core', 'pinia'],

			// Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
			// 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
			resolvers: [
				ElementPlusResolver(),

				// Auto import icon components
				// 自动导入图标组件
				IconsResolver({
					prefix: 'Icon',
				}),
			],
			eslintrc: {
				enabled: false, // 只用一次就关掉，不然每次启动都会生成一次
				filepath: './.eslintrc-auto-import.json',
				globalsPropValue: true,
			},

			dts: resolve(pathSrc, 'auto-imports.d.ts'),
		}),

		Components({
			/* extensions: ['vue', 'md', 'svg'],
			directoryAsNamespace: true,
			globalNamespaces: ['global'],
			include: [/\.vue$/, /\.md$/], */

			resolvers: [
				// Auto register icon components
				// 自动注册图标组件
				IconsResolver({
					enabledCollections: ['ep'],
				}),
				// Auto register Element Plus components
				// 自动导入 Element Plus 组件
				ElementPlusResolver(),
			],

			dts: resolve(pathSrc, 'components.d.ts'),
		}),

		Icons({
			autoInstall: true,
		}),
	],
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
	build: {
		sourcemap: true,
	},
})
