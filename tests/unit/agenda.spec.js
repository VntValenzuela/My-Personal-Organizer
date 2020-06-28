import { assert } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";
import Agendas from "@/views/Agendas.vue";
import Organizer from "@/views/Organizer.vue";
import VueRouter from "vue-router";

import Vuex from "vuex";
import Vuetify from "vuetify";

import mockAgendaState from "./mockAgenda";
import actions from "@/store/actions";
import mutations from "@/store/mutations";
import getters from "@/store/getters";

describe("Agenda Module", () => {
  let localVue;
  let vuetify;
  let store;
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

    store = new Vuex.Store({
      state: mockAgendaState,
      actions,
      mutations,
      getters,
      modules: {}
    });

    global.alert = message => {
      console.log(message);
    };
  });

  it("Don't create agendas with name repeated", () => {
    const wrapper = mount(Agendas, {
      store,
      router,
      vuetify,
      localVue
    });

    let expectedLength = 3;
    let expectedAgendaId = "A-3";
    const agendas = wrapper.vm.agendas;
    wrapper.vm.creaagenda({
      agendaId: "",
      name: "Work",
      description: "work description",
      start: "10:30",
      end: "12:30",
      color: "#4DB6AC",
      appointments: []
    });
    assert.equal(agendas[agendas.length - 1].agendaId, expectedAgendaId);
    assert.equal(agendas.length, expectedLength);

    expectedLength = 4;
    expectedAgendaId = "A-4";
    wrapper.vm.creaagenda({
      agendaId: "",
      name: "newAgenda",
      description: "newAgenda description",
      start: "10:30",
      end: "12:30",
      color: "#4DB6AC",
      appointments: []
    });
    assert.equal(agendas.length, expectedLength);
    assert.equal(agendas[agendas.length - 1].agendaId, expectedAgendaId);
  });

  it("Don't delete agendas with appointments", () => {
    const wrapper = mount(Agendas, {
      store,
      router,
      vuetify,
      localVue
    });

    let expectedLength = 4;
    wrapper.vm.deleagenda("A-1");
    assert.equal(wrapper.vm.agendas.length, expectedLength);

    expectedLength = 3;
    wrapper.vm.deleagenda("A-2");
    assert.equal(wrapper.vm.agendas.length, expectedLength);
  });
});
