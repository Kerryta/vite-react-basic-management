import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '')

	return {
		base: './',
		plugins: [react()],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src')
			}
		},
		server: {
			host: true,
			port: 4000,
			open: false,
			cors: true,
			proxy: {
				'/api': {
					target: 'https://gdhongkang.cn:40001/api/doctor',
					changeOrigin: true,
					secure: false,
					rewrite: (path) => path.replace('/api', '/')
				}
			}
		},
		build: {
			minify: 'esbuild',
			outDir: 'dist',
			assetsDir: 'assets',
			chunkSizeWarningLimit: 1000,
			rollupOptions: {
				plugins: [
					visualizer({
						emitFile: false,
						open: true
					})
				],
				output: {
					manualChunks: {
						vandor: ['react', 'axios'],
						antd: ['antd']
					}
				}
			}
		},
		esbuild: {
			drop: env.ENV !== 'development' ? ['console', 'debugger'] : []
		}
	}
})
