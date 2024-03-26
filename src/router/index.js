import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
  routes: [
    //Login
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/Home/HomeView.vue"),
    },
    {
      path: "/clients",
      name: "Clientes",
      component: () => import("@/views/Clients/ClientsView.vue"),
    },
    {
      path: "/products",
      name: "Produtos",
      component: () => import("@/views/Products/ProductsView.vue"),
    },
    {
      path: "/sales",
      name: "Vendas",
      component: () => import("@/views/Sales/SalesView.vue"),
    },
    //404
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: () => import("@/views/404/404View.vue"),
    },
  ],
});

export default router;
