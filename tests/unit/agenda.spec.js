import { assert } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";
import Agendas from "@/views/Agendas.vue";
import CreateAgenda from "@/components/CreateAgenda.vue";
import UpdateDeleteAgenda from "@/components/UpdateDeleteAgenda.vue";
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

  it("1. Don't create agendas with name repeated", () => {
    const wrapper = mount(Agendas, {
      store,
      router,
      vuetify,
      localVue
    });

    let expectedLength = 3;
    let expectedLastAgendaId = "A-3";
    wrapper.findComponent(CreateAgenda).vm.name = "Work";
    wrapper.findComponent(CreateAgenda).vm.description = "description";
    wrapper.findComponent(CreateAgenda).vm.start = "10:30";
    wrapper.findComponent(CreateAgenda).vm.end = "11:30";
    wrapper.findComponent(CreateAgenda).vm.creaagenda();
    assert.equal(wrapper.vm.agendas.length, expectedLength);
    assert.equal(
      wrapper.vm.agendas[wrapper.vm.agendas.length - 1].agendaId,
      expectedLastAgendaId
    );

    expectedLength = 4;
    expectedLastAgendaId = "A-4";
    wrapper.findComponent(CreateAgenda).vm.name = "Work2";
    wrapper.findComponent(CreateAgenda).vm.description = "description";
    wrapper.findComponent(CreateAgenda).vm.start = "10:30";
    wrapper.findComponent(CreateAgenda).vm.end = "11:30";
    wrapper.findComponent(CreateAgenda).vm.creaagenda();
    assert.equal(wrapper.vm.agendas.length, expectedLength);
    assert.equal(
      wrapper.vm.agendas[wrapper.vm.agendas.length - 1].agendaId,
      expectedLastAgendaId
    );
  });

  it("2. Don't delete agendas with appointments", () => {
    const wrapper = mount(Agendas, {
      store,
      router,
      vuetify,
      localVue
    });

    let expectedLength = 4;
    wrapper.findComponent(UpdateDeleteAgenda).vm.setAgenda({
      agendaId: "A-1",
      name: "Work",
      description: "my agenda for work",
      start: "08:30",
      end: "18:30",
      color: "#4DB6AC",
      appointments: ["not-null"]
    });
    wrapper.findComponent(UpdateDeleteAgenda).vm.deleagenda();
    assert.equal(wrapper.vm.agendas.length, expectedLength);

    expectedLength = 3;
    wrapper.findComponent(UpdateDeleteAgenda).vm.setAgenda({
      agendaId: "A-2",
      name: "Personal",
      description: "my agenda for my things",
      start: "18:30",
      end: "21:30",
      color: "#FFEA00",
      appointments: []
    });
    wrapper.findComponent(UpdateDeleteAgenda).vm.deleagenda();
    assert.equal(wrapper.vm.agendas.length, expectedLength);
  });

  it("3. Check if time range isn't invalid when updating", () => {
    const wrapper = mount(Agendas, {
      store,
      router,
      vuetify,
      localVue
    });

    let expectedStartHour = "10:30";
    wrapper.findComponent(UpdateDeleteAgenda).vm.setAgenda({
      agendaId: "A-4",
      name: "newAgenda",
      description: "newAgenda description",
      start: "12:30",
      end: "10:30",
      color: "#4DB6AC",
      appointments: ["not-null"]
    });
    wrapper.findComponent(UpdateDeleteAgenda).vm.updaagenda();
    assert.equal(wrapper.vm.agendas[2].start, expectedStartHour);
  });

  it("3. Check name doesn't repeate when updating", () => {
    const wrapper = mount(Agendas, {
      store,
      router,
      vuetify,
      localVue
    });

    let expectedName = "Work";
    console.log(wrapper.vm.agendas[0].name);
    wrapper.findComponent(UpdateDeleteAgenda).vm.setAgenda({
      agendaId: "A-1",
      name: "Work2",
      description: "my agenda for work",
      start: "08:30",
      end: "18:30",
      color: "#4DB6AC",
      appointments: ["not-null"]
    });
    wrapper.findComponent(UpdateDeleteAgenda).vm.updaagenda();
    assert.equal(wrapper.vm.agendas[0].name, expectedName);

    expectedName = "Work3";
    wrapper.findComponent(UpdateDeleteAgenda).vm.setAgenda({
      agendaId: "A-1",
      name: "Work3",
      description: "my agenda for work",
      start: "08:30",
      end: "18:30",
      color: "#4DB6AC",
      appointments: ["not-null"]
    });
    wrapper.findComponent(UpdateDeleteAgenda).vm.updaagenda();
    assert.equal(wrapper.vm.agendas[0].name, expectedName);
  });
});
