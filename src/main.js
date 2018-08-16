import Vue from "vue";
import App from "./App.vue";
import { createRouter } from "./router";
import { createProvider } from "./vue-apollo";

Vue.config.productionTip = false;

export async function createApp({
  context,
  beforeApp = () => {},
  afterApp = () => {}
} = {}) {
  const router = createRouter();

  await beforeApp({
    router
  });

  const app = new Vue({
    router,
    provide: createProvider().provide(),
    render: h => h(App)
  });

  const result = {
    app,
    router
  };

  await afterApp(result);

  return result;
}
