import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: '/cesonblog'
    },
    {
      path: '/cesonblog',
      component: () => import("/src/views/cesonBlog/CesonBlog.vue")
    }, {
      path: '/blogroll',
      component: () => import("/src/views/blogroll/Blogroll.vue")
    }, {
      path: '/blogbytype',
      component: () => import('/src/views/blogByType/BlogByType.vue')
    }, {
      path: '/blogbytype/:tid',
      component: () => import('/src/views/blogByType/BlogByType.vue')
    }, {
      path: '/blogbytag',
      component: () => import('/src/views/blogByTag/BlogByTag.vue')
    }, {
      path: '/blogbytag/:gid',
      component: () => import('/src/views/blogByTag/BlogByTag.vue')
    }, {
      path: '/about',
      component: () => import('/src/views/about/About.vue')
    }, {
      path: '/archives',
      component: () => import('/src/views/archives/Archives.vue')
    }, {
      path: '/search',
      component: () => import('/src/views/search/Search.vue')
    }, {
      path: '/blog',
      component: () => import('/src/views/blog/Blog.vue')
    }, {
      path: '/blog/:bid',
      component: () => import('/src/views/blog/Blog.vue')
    }, {
      path: '/traffic',
      component: () => import('/src/views/traffic/Traffic.vue')
    }
  ]
})

export default router