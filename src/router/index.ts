import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import LoginView from "../views/LoginView.vue";
import SessionHistoryPageView from "../views/SessionHistoryPageView.vue";
import Profile from "../views/ProfileView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import UserModule, { MANAGE_PROFILES } from "@/store/modules/user";
import i18n from "@/i18n";
import ResetPasswordView from "@/views/ResetPasswordView.vue";
import ForgetPasswordView from "@/views/ForgetPasswordView.vue";
import ImportProgramsView from "@/views/ImportProgramsView.vue";
import AdminPageView from "@/views/AdminPageView.vue"

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "login",
    component: LoginView,
    meta: {
      icon: "mdi-account-multiple",
      navigation: true,
      requiresAuth: true,
      requiresPermissions: [MANAGE_PROFILES],
      title: i18n.t("page.session")
    }
  },
  {
    path: "/session-history",
    name: "session-history",
    component: SessionHistoryPageView,
    meta: {
      icon: "mdi-account-multiple",
      navigation: true,
      requiresAuth: true,
      requiresPermissions: [MANAGE_PROFILES],
      title: i18n.t("page.session")
    }
  },
  {
    path: "/profile/:id",
    name: "user-profile",
    component: Profile,
    meta: {
      navigation: false,
      requiresAuth: true,
      title: i18n.t("page.user-profile")
    }
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      navigation: false,
      title: i18n.t("page.login")
    }
  },
  {
    path: "/reset-password/:hash",
    name: "reset-password",
    component: ResetPasswordView,
    meta: {
      navigation: false,
      title: i18n.t("page.reset-password")
    }
  },
  {
    path: "/forget-password",
    name: "forget-password",
    component: ForgetPasswordView,
    meta: {
      navigation: false,
      title: i18n.t("page.forget-password")
    }
  },
  {
    path: "/404",
    name: "404",
    component: NotFoundView,
    meta: {
      navigation: false,
      title: i18n.t("page.not-found")
    }
  },
  {
    path: "/import-programs/:id/:hash",
    name: "import-programs",
    component: ImportProgramsView,
    meta: {
      navigation: false,
      title: "Import programs"
    }
  },
  {
    path: "/admin-page",
    name: "admin-page",
    component: AdminPageView,
    meta: {
      navigation: false,
      requiresAdmin: true,
      title: "admin page"
    }
  },
  {
    path: "*",
    redirect: "/404"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env["BASE_URL"],
  routes
});

// router.beforeEach((to, from, next) => {
//   window.document.title =
//     (to.meta?.title ? to.meta.title + " - " : "") + "InHealion";
    
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (UserModule.isAuthorized) {
//       next();
//       return;
//     }
//     next("/login");
//   } else {
//     if (to.name === "login" && UserModule.isAuthorized) {
//       next("/");
//     } else {
//       next();
//     }
//   }
  // if (to.matched.some(record => record.meta.requiresAdmin)) {
  //   if (UserModule.isAuthorized) {
  //     next();
  //     return;
  //   }
  //   next("/admin-page");
  // } else {
  //   if (to.name === "login" && UserModule.isAuthorized) {
  //     next("/session-history");
  //   } else {
  //     next();
  //   }
  // }
// });

export default router;
