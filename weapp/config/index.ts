/** 构建时在 Node 下读取；写入 defineConstants，避免小程序运行时出现 process is not defined */
const TARO_APP_API_BASE_FOR_BUILD = process.env.TARO_APP_API_BASE || ''

export default {
  projectName: 'xhdshg-weapp',
  date: '2026-5-9',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ['@tarojs/plugin-framework-react', '@tarojs/plugin-platform-weapp'],
  defineConstants: {
    TARO_APP_REQUEST_BASE: JSON.stringify(TARO_APP_API_BASE_FOR_BUILD),
  },
  copy: {
    patterns: [],
    options: {},
  },
  framework: 'react',
  compiler: {
    type: 'webpack5',
    prebundle: { enable: false },
  },
  cache: { enable: false },
  mini: {
    postcss: {
      pxtransform: { enable: true, config: {} },
      url: { enable: true, config: { limit: 1024 } },
      cssModules: {
        enable: false,
        config: {
          namingPattern: 'module',
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
}
