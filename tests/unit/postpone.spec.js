import { assert } from "chai";
import { mount, shallowMount, createLocalVue } from "@vue/test-utils";

import Vuex from "vuex";
import Vuetify from "vuetify";
import VueRouter from "vue-router";

import Calendar from "@/components/Calendar";
import Organizer from "@/views/Organizer.vue";
import PostponeListView from "@/views/PostponeList.vue";
import Appointment from "@/components/Appointment.vue";

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
    const buttonPostList = wrapper.find(".PostList");
    assert.equal(buttonPostList.exists(), true);
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

  it("Button return exist", async () => {
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

    const buttonReturn = wrapper.find(".buttonBack");
    assert.equal(buttonReturn.exists(), true);
  });

  it("Delete a Appointment and add a new appointment", async () => {
    const wrapperPostpone = shallowMount(PostponeListView, {
      store,
      vuetify,
      localVue,
      router
    });

    const wrapper = mount(Appointment, {
      store,
      vuetify,
      localVue
    });
    const initialLength = 2;
    const appointments = wrapper.vm.appointments;
    assert.equal(appointments.length, initialLength);

    const appointment = (wrapper.vm.$data.appointment = {
      name: "Dentist",
      description: "I need to go to dentist",
      date: "24/10/2020",
      startHour: "00:00",
      endHour: "23:59",
      participants: []
    });
    wrapper.vm.addScheduledAppointment();

    wrapperPostpone.vm.deleteItem(appointment);

    let expectedLength = 3;

    const postponeArray = wrapperPostpone.vm.table;

    assert.equal(postponeArray.length, expectedLength);
    assert.equal(appointments.length, expectedLength);
  });

  it("Delete a Appointment", async () => {
    const wrapperPostpone = shallowMount(PostponeListView, {
      store,
      vuetify,
      localVue,
      router
    });

    const appointment = (wrapperPostpone.vm.$data.item = {
      name: "Dentist",
      description: "I need to go to dentist",
      date: "24/10/2020",
      startHour: "00:00",
      endHour: "23:59",
      participants: []
    });

    wrapperPostpone.vm.deleteItem(appointment);

    let expectedLength = 2;

    const postponeArray = wrapperPostpone.vm.table;

    assert.equal(postponeArray.length, expectedLength);
  });
});
