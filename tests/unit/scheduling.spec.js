import { assert } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";
import Appointment from "@/components/Appointment.vue";

import Vuex from "vuex";
import Vuetify from "vuetify";
import store from "@/store";

describe("Scheduling Appointments / meetings", () => {
  let localVue;
  let vuetify;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(Vuetify);

    vuetify = new Vuetify();
  });
  it("Create a new Appointment", () => {
    const wrapper = mount(Appointment, {
      store,
      vuetify,
      localVue
    });
    wrapper.vm.$forceUpdate();
    const initialLength = 1;
    const appointments = wrapper.vm.appointments;
    assert.equal(appointments.length, initialLength);

    wrapper.vm.$data.appointment = {
      name: "test",
      description: "testDescription",
      date: "24/10/2020",
      startHour: "00:00",
      endHour: "23:59",
      participants: []
    };
    wrapper.vm.save();
    let expectedLength = 2;

    assert.equal(appointments.length, expectedLength);
  });
});
