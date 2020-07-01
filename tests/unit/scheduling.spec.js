import { assert } from "chai";
import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Appointment from "@/components/Appointment.vue";
import Calendar from "@/components/Calendar.vue";

import Vuex from "vuex";
import Vuetify from "vuetify";
//import store from "@/store";

import mockScheduledAppointments from "./mockScheduledAppointments";
import actions from "@/store/actions";
import mutations from "@/store/mutations";
import getters from "@/store/getters";

describe("Scheduling Appointments / meetings", () => {
  let localVue;
  let vuetify;
  let store;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(Vuetify);

    vuetify = new Vuetify();

    store = new Vuex.Store({
      state: mockScheduledAppointments,
      actions,
      mutations,
      getters,
      modules: {}
    });
  });
  it("Create a new Appointment", () => {
    const wrapper = mount(Appointment, {
      store,
      vuetify,
      localVue
    });
    const initialLength = 2;
    const appointments = wrapper.vm.appointments;
    assert.equal(appointments.length, initialLength);

    wrapper.vm.$data.appointment = {
      name: "test",
      description: "testDescription",
      date: "2020-10-24",
      startHour: "00:00",
      endHour: "23:59",
      participants: []
    };
    wrapper.vm.addScheduledAppointment();
    //console.log(JSON.stringify(wrapper.vm.$data.appointment));
    let expectedLength = 3;

    assert.equal(appointments.length, expectedLength);
  });

  it("Delete an Appointment", () => {
    global.alert = () => {};
    global.confirm = () => true;
    const wrapper = shallowMount(Calendar, {
      store,
      vuetify,
      localVue
    });
    const initialLength = 3;
    const appointments = wrapper.vm.appointments;
    //console.log(JSON.stringify(appointments));
    assert.equal(appointments.length, initialLength);

    const idToDelete = "SAP-0003";
    wrapper.vm.deleteScheduledAppointment({
      name: "Element To Delete",
      id: idToDelete
    });
    //console.log(JSON.stringify(wrapper.vm.appointments));
    const appointmentsAfterDetele = wrapper.vm.appointments;
    const expectedLength = 2;

    assert.equal(appointmentsAfterDetele.length, expectedLength);
  });

  it("Update an Appointment", () => {
    const updatedName = "Updated";
    const wrapper = mount(Appointment, {
      propsData: {
        newAppointment: false,
        selectedAppointment: {
          id: "SAP-0001",
          name: updatedName,
          description: "UpdatedDescription",
          agendaId: "A-1",
          date: "2020-06-24",
          startHour: "12:00",
          endHour: "13:59",
          participants: []
        }
      },
      store,
      vuetify,
      localVue
    });
    const initialLength = 2;
    const appointments = wrapper.vm.appointments;
    assert.equal(appointments.length, initialLength);
    wrapper.vm.updateScheduledAppointment();
    const appointmentsAfter = wrapper.vm.appointments;
    assert.equal(appointmentsAfter[0].name, updatedName);
  });

  it("Cant Update an Appointment with wrong Hours", () => {
    const updatedName = "Wrong Updated";
    const wrapper = mount(Appointment, {
      propsData: {
        newAppointment: true,
        selectedAppointment: {
          id: "SAP-0002",
          name: updatedName,
          description: "UpdatedDescription",
          agendaId: "A-1",
          date: "2020-06-24",
          startHour: "00:00",
          endHour: "01:00",
          participants: []
        }
      },
      store,
      vuetify,
      localVue
    });
    const initialLength = 2;
    const appointments = wrapper.vm.appointments;
    assert.equal(appointments.length, initialLength);
    //console.log(`Seleccionado${JSON.stringify(wrapper.vm.appointment)})`);
    //console.log(JSON.stringify(appointments));
    wrapper.vm.updateScheduledAppointment();
    //console.log(JSON.stringify(wrapper.vm.appointment));
    const appointmentsAfter = wrapper.vm.appointments;
    //console.log(JSON.stringify(appointmentsAfter));
    assert.notEqual(appointmentsAfter[1].name, updatedName);
  });

  it("Filter Events", () => {
    const wrapper = shallowMount(Calendar, {
      store,
      vuetify,
      localVue
    });

    const initialLength = 2;
    wrapper.vm.filterEvents();
    const appointments = wrapper.vm.events;
    //console.log(JSON.stringify(appointments));
    assert.equal(appointments.length, initialLength);
    //console.log(JSON.stringify(appointments));
    //filtering by Personal and Entertainment
    wrapper.vm.selectedAgendas = [1, 2];
    wrapper.vm.filterEvents();
    //console.log(wrapper.vm.selectedAgendas);
    const appointmentsAfterFilter = wrapper.vm.events;
    //console.log(JSON.stringify(appointmentsAfterFilter));

    const expectedLength = 1;
    assert.equal(appointmentsAfterFilter.length, expectedLength);
  });

  it("Rendering checkboxes", () => {
    const wrapper = shallowMount(Calendar, {
      store,
      vuetify,
      localVue
    });

    const listOfCheckboxes = wrapper.findAll(".checkbox-for-agenda");
    //console.log(wrapper.html());
    //console.log("size: " + list.length);
    const expectedLength = 3;
    assert.equal(listOfCheckboxes.length, expectedLength);
  });
  it("Postpone an Appointment", async () => {
    global.alert = () => {};
    global.confirm = () => true;
    const wrapper = shallowMount(Calendar, {
      store,
      vuetify,
      localVue
    });
    const initialLengthPostponed = 0;
    const initialLengthAppointments = 2;
    const appointments = wrapper.vm.appointments;
    const postponed = wrapper.vm.getPostponedAppointments;
    assert.equal(appointments.length, initialLengthAppointments);
    assert.equal(postponed.length, initialLengthPostponed);

    const appointmentToPostpone = appointments[1];
    wrapper.vm.addPostponeAppointment(appointmentToPostpone);
    wrapper.vm.deleteScheduledAppointment(appointmentToPostpone);

    let expectedLengths = 1;
    const appointmentsAfterPostpone = wrapper.vm.appointments;
    assert.equal(postponed.length, expectedLengths);
    assert.equal(appointmentsAfterPostpone.length, expectedLengths);
  });
});
