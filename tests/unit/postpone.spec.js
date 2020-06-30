/*import { assert } from "chai";
import { shallowMount, createLocalVue } from "@vue/test-utils";

import Vuex from "vuex";
import Vuetify from "vuetify";
import store from "@/store";
import VueRouter from "vue-router";

import Calendar from "@/components/Calendar";
import Organizer from "@/views/Organizer.vue";

describe("Postpone Module", () => {
  let localVue;
  let vuetify;
  let router;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(Vuetify);
    localVue.use(VueRouter);

    vuetify = new Vuetify();
    router = new VueRouter({
      routes: [
        {
          path: "/organizer",
          name: "Organizer",
          component: Organizer
        }
      ]
    });
  });
  it("Button postpone exist", async () => {
    const wrapper = shallowMount(Calendar, {
      store,
      vuetify,
      localVue,
      router
    });
    const options = wrapper.find(".PostList");
    assert.equal(options.exists(), true);
  });
});*/
