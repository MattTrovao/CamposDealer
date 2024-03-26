import { createApp } from 'vue'
import './sass/app.scss'
import App from './App.vue'

import router from "./router";
import axios from "axios";

const app = createApp(App);

app.use(router);


// Imports
import Header from "@/components/Layout/Header.vue";
import Footer from "@/components/Layout/Footer.vue";
import Container from "@/components/Layout/Container.vue";
import Page from "@/components/Layout/Page.vue";
app.component("Header", Header);
app.component("Footer", Footer);
app.component("Container", Container);
app.component("Page", Page);



// Axios
axios.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
axios.defaults.method = "POST";
axios.defaults.baseURL = import.meta.env.VITE_URL_API;
axios.defaults.withCredentials = true;

app.mount('#app')
