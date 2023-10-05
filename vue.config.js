const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // TODO 需要修改下面的参数
  pwa: {
    name: 'netPlayer PWA',
    themeColor: '#ffffff',
    msTileColor: '#ffffff',
    manifestOptions: {
      start_url: '.',
      background_color: '#ffffff'
    },
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      // swDest: 'src/registerServiceWorker.js',
    },
  }
})
