import { boot } from 'quasar/wrappers';
import { createNaverMap } from 'vue3-naver-maps';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {

  app.use(createNaverMap, {
    clientId: 'aopxhxa5qu'
  });
});
