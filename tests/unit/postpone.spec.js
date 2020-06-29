import { assert } from "chai";
import { shallowMount, createLocalVue } from "@vue/test-utils";

import Vuex from "vuex";
import Vuetify from "vuetify";
import VueRouter from "vue-router";

import Calendar from "@/components/Calendar";
import Organizer from "@/views/Organizer.vue";
import PostponeListView from "@/views/PostponeList.vue";

import mockPostpone from "./mockPostpone";
import actions from "@/store/actions";
import mutations from "@/store/mutations";
import getters from "@/store/getters";

describe("Postpone Module", () => {
  let localVue;
  let vuetify;
  let router;
  let store;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(Vuetify);
    localVue.use(VueRouter);

    vuetify = new Vuetify();

    store = new Vuex.Store({
      state: mockPostpone,
      actions,
      mutations,
      getters
    });
  });

  it("Button postpone exist", async () => {
    router = new VueRouter({
      routes: [
        {
          path: "/organizer",
          name: "Organizer",
          component: Organizer
        }
      ]
    });

    const wrapper = shallowMount(Calendar, {
      store,
      vuetify,
      localVue,
      router
    });
    const options = wrapper.find(".PostList");
    assert.equal(options.exists(), true);
  });

  it("Table have dates", async () => {
    router = new VueRouter({
      routes: [
        {
          path: "/postponeList",
          name: "PostponeList",
          component: PostponeListView
        }
      ]
    });

    const wrapper = shallowMount(PostponeListView, {
      store,
      vuetify,
      localVue,
      router
    });

    const objectTable = wrapper.find(".postponeList");
    assert.equal(objectTable.exists(), true);

    const postponeArray = wrapper.vm.table;
    await wrapper.vm.$forceUpdate();

    assert.equal(postponeArray.length, 4);

    assert.equal(
      postponeArray.length,
      wrapper.vm.$data.postponedAppointments.length
    );
  });
});
