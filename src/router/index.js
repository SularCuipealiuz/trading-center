import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Header from "@/components/Header";
import BankTransfer from "@/views/BankTransfer";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    components: {
      head: Header,
      body: Home
    }
  },
  {
    path: "/bank-transfer",
    name: "BankTransfer",
    components: {
      head: Header,
      body: BankTransfer
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(function (to, from, next) {
  if (from.name === null && to.name !== "Home") {
    next("/");
  } else {
    next()
  }
});


export default router;
