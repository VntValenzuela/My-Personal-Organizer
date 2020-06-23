import { assert } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";
import Agendas from "@/views/Agendas.vue";
import Calendary from "@/views/Home.vue";
import VueRouter from "vue-router";

import Vuex from "vuex";
import Vuetify from "vuetify";

import store from "@/store";

describe("Agenda Module", () => {
  it("Don't create agendas with name repeated", () => {
    const localVue = createLocalVue();

    localVue.use(Vuex);
    localVue.use(Vuetify);
    localVue.use(VueRouter);

    const vuetify = new Vuetify();
    const router = new VueRouter({
      routes: [
        {
          path: "/calendary/:id",
          name: "Calendary",
          component: Calendary
        }
      ]
    });
    global.alert = message => {
      console.log(message);
    };
    const wrapper = mount(Agendas, {
      store,
      router,
      vuetify,
      localVue
    });
    let expectedLength = 3;
    const agendas = wrapper.vm.agendas;
    wrapper.vm.creaagenda({
      name: "Work",
      description: "newAgenda description",
      start: "10:30",
      end: "12:30",
      appointments: []
    });
    assert.equal(agendas.length, expectedLength);
    expectedLength = 4;
    wrapper.vm.creaagenda({
      name: "newAgenda",
      description: "newAgenda description",
      start: "10:30",
      end: "12:30",
      appointments: []
    });
    assert.equal(agendas.length, expectedLength);
  });/*
  it("Don't delete agenda with appointments", () => {
    const localVue = createLocalVue();

    localVue.use(Vuex);
    localVue.use(Vuetify);
    localVue.use(VueRouter);

    const vuetify = new Vuetify();
    const router = new VueRouter({
      routes: [
        {
          path: "/calendary/:id",
          name: "Calendary",
          component: Calendary
        }
      ]
    });
    global.alert = message => {
      console.log(message);
    };
    const wrapper = mount(Agendas, {
      store,
      router,
      vuetify,
      localVue
    });
    let expectedLength = 4;
    const agendas = wrapper.vm.agendas;
    wrapper.vm.deleagenda("Work");
    assert.equal(agendas.length, expectedLength);
    expectedLength = 3;
    wrapper.vm.deleagenda("Personal");
    assert.equal(agendas.length, expectedLength);
  });*/
});
