import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/components/Home";
import Restaurant from "@/components/Restaurant";
import User from "@/components/User";
import LoginForm from "@/components/authentification/LoginForm";
import SignUpForm from "@/components/authentification/SignUpForm";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/restaurant/:restaurantId",
    name: "Restaurant",
    component: Restaurant,
  },
  {
    path: "/user",
    name: "User",
    component: User,
  },
  {
    path: "/user/:userid",
    name: "User profil",
    component: User
  },
  {
    path: "/login",
    name: "Login",
    component: LoginForm
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignUpForm
  }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
