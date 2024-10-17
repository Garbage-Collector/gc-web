/* eslint-env node */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

import { configure } from 'quasar/wrappers';

export default configure((/* ctx */) => {
  return {
    // https://v2.quasar.dev/quasar-cli-vite/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-vite/boot-files
    boot: ['axios', 'maps'],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
    css: ['app.scss'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      'roboto-font',
      'material-icons',
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#build
    build: {
      publicPath: 'gc',
      rollupOptions: {
        external: ['register-service-worker'],
      },
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20',
      },
      vueRouterMode: 'hash',
    },

    // Updated devServer configuration
    devServer: {
      host: '0.0.0.0',  // Make the server accessible on the network
      port: 3001,        // Use port 3001 for development server
      open: true,        // Automatically open the browser
      https: false,      // Disable HTTPS for development
    },

    framework: {
      config: {},
      plugins: ['Notify'],
    },

    animations: [],

    ssr: {
      pwa: true,
      prodPort: 3000,
      middlewares: [
        'render', // keep this as last one
      ],
    },

    pwa: {
      workboxMode: 'GenerateSW',

      manifest: {
      	name: 'Garbage-Collector',
	short_name: 'GC',
	display: 'standalone',
	orientation: 'portrait',
	background_color: '#ffffff',
	theme_color: '#027be3',
	icons: [
          {
            src: 'public/icons/apple-icon-120x120.png',
            sizes: '120x120',
            type: 'image/png'
          },
          {
            src: 'public/icons/apple-icon-152x152png.png',
            sizes: '152x152',
            type: 'image/png'
          },
          {
            src: 'public/icons/apple-icon-167x167.png',
            sizes: '167x167',
            type: 'image/png'
          },
          {
            src: 'public/icons/apple-icon-180x180.png',
            sizes: '180x180',
            type: 'image/png'
          }
        ]
      }
    },

    capacitor: {
      hideSplashscreen: true,
    },

    electron: {
      inspectPort: 5858,
      bundler: 'packager',
      builder: {
        appId: 'quasar-practice2',
      },
    },

    bex: {
      contentScripts: ['my-content-script'],
    },
  };
});

