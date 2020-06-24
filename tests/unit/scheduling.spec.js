import { assert } from "chai";
import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Appointment from "@/components/Appointment.vue";
import Calendar from "@/components/Calendar.vue";

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
    wrapper.vm.addScheduledAppointment();
    console.log(JSON.stringify(wrapper.vm.$data.appointment));
    let expectedLength = 2;

    assert.equal(appointments.length, expectedLength);
  });
  it("Delete an Appointment", () => {
    const wrapper = shallowMount(Calendar, {
      store,
      vuetify,
      localVue
    });
    const initialLength = 2;
    const appointments = wrapper.vm.appointments;
    console.log(JSON.stringify(appointments));
    assert.equal(appointments.length, initialLength);

    const idToDelete = "SAP-0001";
    wrapper.vm.deleteScheduledAppointment(idToDelete);
    console.log(JSON.stringify(wrapper.vm.appointments));
    const appointmentsAfterDetele = wrapper.vm.appointments;
    let expectedLength = 1;

    assert.equal(appointmentsAfterDetele.length, expectedLength);
  });
});
