import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

const child_process = require('child_process')
const commitHash = child_process.execSync('git rev-parse --short HEAD').toString().trim()
const commitTime = child_process.execSync('git log --pretty=format:"%cd" HEAD -1 --date=format:"%Y %b"').toString().trim()

export default ({  mode } :any) => {
 const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      //修复引入path模块时报错问题
      'process.platform': null,
      'process.version': null,
      //GLOBAL_VAR为定义的全局变量，可以直接在页面是哪个访问GLOBAL_VAR获取定义的变量
      GLOBAL_VAR: {
        GIT_COMMIT_ID: commitHash,
        GIT_COMMIT_TIME:commitTime
      }
    },
    //设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息
    clearScreen: false,

    //server 开发时相关配置
    server: {
      //设置 server.hmr.overlay 为 false 可以禁用开发服务器错误的屏蔽
      hmr: { overlay: false },
      //开发时启动的端口
      port: 5001,
      //在服务器启动时自动在浏览器中打开应用程序
      open: false,
      //true, 启用并允许任何源
      cors: true,
    },
    //plugins：插件配置相关
    plugins: [
      //vue3相关插件
      vue(),
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
    ],
    //构建相关
    build: {
      brotliSize: false,
      // chunk 大小警告的限制（以 kbs 为单位）。
      chunkSizeWarningLimit: 5000,
      //在生产时移除console.log
      terserOptions: {
        compress: {
          drop_console: false,
          pure_funcs: ['console.log', 'console.info'],
          drop_debugger: true
        }
      },
      assetsDir: 'static/assets',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
  }
}
