
export default {
  mode: 'universal',
  server: {
    port: 8081, // default: 3000
    host: '0.0.0.0' // default: localhost,
  },
  vue: {
    config: {
      productionTip: true,
      devtools: false,
      performance: {
        hints: 'warning',
        maxEntrypointSize: 900000001,
        maxAssetSize: 500000000,
        assetFilter: function (assetFilename) {
          return assetFilename.endsWith('.js');
        }
      }
    }
  },
  head: {
    title: 'Hugh BLOG 前端博客',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      //禁止百度等搜索引擎自动转码
      { hid: 'Cache-Contro', content: 'no-transform', 'http-equiv': 'Cache-Control' },
      { hid: 'Cache-Contro2', content: 'no-siteapp', 'http-equiv': 'Cache-Control' },

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { hid: 'prism', rel: 'stylesheet', href: '/css/prism.css' },
      //font-awesome 4.2.0
      { hid: 'font-awesome', rel: 'stylesheet', href: 'http://lib.baomitu.com/font-awesome/4.2.0/css/font-awesome.min.css', type: 'text/css' },
    ],
    script: [
      { src: '//at.alicdn.com/t/font_556506_8c5mvyqjye4.js' },
      { src: '/js/prism.js' },
      // 百度主推文章收录用
      { src: 'https://zz.bdstatic.com/linksubmit/push.js', async: true },
      // 加入百度统计js，使用时自行添加为自己的
      { src: 'https://hm.baidu.com/hm.js?9ad747f5c0569abe42935fb32fece08f', async: true},
      //谷歌
      { src: 'https://www.googletagmanager.com/gtag/js?id=G-TPC877MB0L', async: true },
      //waifu-tips.js 依赖 JQuery 库
      { src: 'https://cdn.bootcss.com/jquery/3.3.1/jquery.js' },
      //实现拖动效果，需引入 JQuery UI
      { src: 'https://cdn.bootcss.com/jqueryui/1.12.1/jquery-ui.min.js' },
      //key 
      { innerHTML: 'XlchKey="hu990605112";', type: 'text/javascript', charset: 'utf-8' },
      //JQuery-mousewheel  3.1.9 
      { src: 'http://lib.baomitu.com/jquery-mousewheel/3.1.9/jquery.mousewheel.min.js' },
      //  Scrollbar 
      { src: 'http://static.badapple.top/BadApplePlayer/js/scrollbar.js' },
      // BadApplePlayer
      { src: 'http://static.badapple.top/BadApplePlayer/Player.js', async: true  },
      
    ],
    __dangerouslyDisableSanitizersByTagID: {
      oldbrowser: 'innerHTML'
    },
    __dangerouslyDisableSanitizers: ['script']
  },
  loading: './components/Loading',
  router: {
    middleware: 'global'
  },
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/scss/global.scss'
  ],
  styleResources: {
    scss: ['./assets/scss/variable.scss']
  },
  plugins: [
    '@/plugins/axios','@/plugins/element-ui','@/plugins/message','@/plugins/icon',{src:'@/plugins/common',mode:'client'}
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],
  build: {
    transpile: [/^element-ui/,'/plugins'],
    extractCSS: true,
    vendors: ['@nuxtjs/axios', 'element-ui'],
  },
}
