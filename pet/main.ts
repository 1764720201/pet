import { createSSRApp } from "vue";
import App from "./App.vue";
import mitt from "mitt";
const Mitt = mitt();
declare module "vue" {
  export interface ComponentCustomProperties {
    $Bus: typeof Mitt;
  }
}
export function createApp() {
  const app = createSSRApp(App);
  app.config.globalProperties.$Bus = Mitt;
  return {
    app,
  };
}
