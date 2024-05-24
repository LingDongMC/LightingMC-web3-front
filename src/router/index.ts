import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue"
import Content from "../views/Content.vue"

const router = createRouter(
  {
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: "/",
        name: "HomePage",
        component: HomePage,
      },

      {
        path: "/${table_name}/${link}",
        name: "Content",
        component: Content,
      },
    ]
  }
)

// router.beforeEach((to, from, next) => {
//     if (to.path === "/manager") {
//         if (localStorage.getItem("token") && localStorage.getItem("islogin") == "true") {
//             next()
//         }else{
//             next("/login")
//         }
//     }
// })

export default router;