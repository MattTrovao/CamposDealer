import { createApp } from 'vue'
import './sass/app.scss'
import App from './App.vue'

import router from "./router";
import axios from "axios";

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App);

app.use(router);

app.component('VueDatePicker', VueDatePicker);

// Imports
import Header from "@/components/Layout/Header.vue";
import Footer from "@/components/Layout/Footer.vue";
import Container from "@/components/Layout/Container.vue";
import Page from "@/components/Layout/Page.vue";

import Title from "@/components/Elements/Title.vue";
import Modal from "@/components/Elements/Modal.vue";
import Search from "@/components/Elements/Search.vue";

import Clients from "@/components/Cards/Clients.vue";
import Products from "@/components/Cards/Products.vue";
import Sales from "@/components/Cards/Sales.vue";

app.component("Header", Header);
app.component("Footer", Footer);
app.component("Container", Container);
app.component("Page", Page);
app.component("Title", Title);
app.component("Modal", Modal);
app.component("Search", Search);
app.component("Clients", Clients);
app.component("Products", Products);
app.component("Sales", Sales);



// Axios
axios.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
axios.defaults.method = "POST";
axios.defaults.baseURL = import.meta.env.VITE_URL_API;
axios.defaults.withCredentials = true;

app.mount('#app')
