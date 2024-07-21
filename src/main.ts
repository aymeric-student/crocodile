import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./lib/vuetify.ts";
import router from "./router";
import "./assets/index.css";

const app = createApp(App);

app.use(vuetify);
app.use(router);

app.mount("#app");
