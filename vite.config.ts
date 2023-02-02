import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// const child_process = require("child_process");
// process.env.VITE_APP_TITLE = child_process.execSync("git rev-parse --short HEAD").toString().trim()
// console.log(process.env.VITE_TITLE)
//利用child_process执行shell拿到git commit id,有时我们项目上线后需要commit id 去追踪错误 
const child_process = require('child_process')
const commitHash = child_process.execSync('git rev-parse --short HEAD').toString().trim()

export default ({ command, mode }: any) => {
  /*
   console.log(command, mode)
  * serve serve-dev
  * */
  const env = loadEnv(mode, process.cwd(), '')
  return {
    /**
    配置基础路径
    如访问地址为http://8.135.1.141/vue3-admin-plus/
    那么此路径需要配置为/vue3-admin-plus/
    如果此路径配置为/， 则只能访问到http://8.135.1.141/， 则会报404错误
    **/
    // base: setting.viteBasePath,
    //定义全局变量
    define: {
      //修复引入path模块时报错问题
      'process.platform': null,
      'process.version': null,
      // GLOBAL_VAR为定义的全局变量，可以直接在页面是哪个访问GLOBAL_VAR获取定义的变量
      GLOBAL_VAR: {
        GIT_COMMIT_ID: commitHash
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
      //代理跨域配置
      //proxy look for https://vitejs.cn/config/#server-proxy
      // proxy: {
      //   '/api': {
      //     target: loadEnv(mode, process.cwd()).VITE_APP_PROXY_URL,
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, '')
      //   }
      // }
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
      //默认modules ， esnext会打包更小
      //官方文档：https://vitejs.cn/config/#build-target
      //minify: 'esnext',
      //启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
      brotliSize: false,
      // chunk 大小警告的限制（以 kbs 为单位）。
      chunkSizeWarningLimit: 5000,
      //在生产时移除console.log
      terserOptions: {
        //detail to look https://terser.org/docs/api-reference#compress-options
        compress: {
          //drop_console:false和pure_funcs配置，则将console.log和console.info进行移除，但是console.error不移除
          drop_console: false,
          pure_funcs: ['console.log', 'console.info'],
          //将调试去除
          drop_debugger: true
        }
      },
      //配置静态资源路径
      assetsDir: 'static/assets',
      //将打包后的资源分开
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    //resolve：路径别名配置
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
      //此处官方不建议配置.vue扩展名,因此在引入vue文件时，必须写.vue扩展名
      //why remove it , look for https://github.com/vitejs/vite/issues/6026
      // extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs']
    },
    //默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包
    // optimizeDeps: {
    //   include: ['element-plus/lib/locale/lang/zh-cn', 'element-plus/lib/locale/lang/en']
    // }
  }
}
