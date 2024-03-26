import { createApp } from 'vue'
import './sass/app.scss'
import App from './App.vue'

import router from "./router";
import axios from "axios";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const app = createApp(App);

app.use(VueSweetalert2);
app.use(router);

// Imports
import Header from "@/components/Layout/Header.vue";
import Footer from "@/components/Layout/Footer.vue";
import Container from "@/components/Layout/Container.vue";
import Page from "@/components/Layout/Page.vue";

import Title from "@/components/Elements/Title.vue";

app.component("Header", Header);
app.component("Footer", Footer);
app.component("Container", Container);
app.component("Page", Page);
app.component("Title", Title);



// Axios
axios.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
axios.defaults.method = "POST";
axios.defaults.baseURL = import.meta.env.VITE_URL_API;
axios.defaults.withCredentials = true;

app.mount('#app')
