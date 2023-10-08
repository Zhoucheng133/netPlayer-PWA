const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
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
