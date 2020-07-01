import Vue from "vue";
import VueRouter from "vue-router";
import Agendas from "../views/Agendas.vue";
import Organizer from "../views/Organizer.vue";
import ParticipantView from "../views/Participant.vue";
import PostponeListView from "../views/PostponeList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Agendas",
    component: Agendas
  },
  {
    path: "/organizer",
    name: "Organizer",
    component: Organizer
  },
  {
    path: "/postponeList",
    name: "PostponeList",
    component: PostponeListView
  },
  {
    path: "/participant",
    name: "Participant",
    component: ParticipantView
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
