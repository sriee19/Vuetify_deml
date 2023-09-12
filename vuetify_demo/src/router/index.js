// import Vue from 'vue'
// import VueRouter from 'vue-router'

// Vue.use(VueRouter)

// const routes = [
  
//   {
//     path: '/',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   }
// ]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

// export default router


import Vue from "vue";
import VueRouter from "vue-router";
import PdfPreview from "@/components/PdfPreview.vue";
import PdfPreviewButton from "@/components/PdfPreviewButton.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: PdfPreviewButton },
  { path: "/pdf-preview", name: "pdf-preview", component: PdfPreview },
];

const router = new VueRouter({
  routes,
});

export default router;
