//import { assert } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";
import Appointment from "@/components/Appointment.vue";


import Vuex from "vuex";
import Vuetify from "vuetify";
//import store from "@/store";

import mockScheduledAppointments from "./mockScheduledAppointments";
import actions from "@/store/actions";
import mutations from "@/store/mutations";
import getters from "@/store/getters";
import { assert } from "chai";
describe("Create 3 types of recurrent appointments", () => {
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
  it("Create 8 daily appointments", () => {
    const wrapper = mount(Appointment, {
      store,
      vuetify,
      localVue,
    });
    //const initialLength = 2;
   // const appointments = wrapper.vm.appointments;
  //  assert.equal(appointments.length, initialLength);


    wrapper.vm.$data.appointment = {
      name: "test",
      description: "testDescription",
      date: "2020/10/24",
      startHour: "01:00",
      endHour: "23:00",
      endDate: "2020/11/01",
      participants: []
    };

    wrapper.vm.$data.active = "daily";
    wrapper.vm.recurrentevents(
      wrapper.vm.$data.appointment.date,
      wrapper.vm.$data.appointment.endDate
    );

    console.log(
      "Daily Appointments " + JSON.stringify(wrapper.vm.recurrentdates)
    );
    const dailyAppointments = wrapper.vm.recurrentdates;
    const expectedlength = 8;
    assert.equal(dailyAppointments.length, expectedlength);

  });
  it("Create weekly appointment", () => {
    const wrapper = mount(Appointment, {
      store,
      vuetify,
      localVue,
    });


    wrapper.vm.$data.appointment = {
      name: "test",
      description: "testDescription",
      date: "2020/10/25",
      startHour: "01:00",
      endHour: "23:00",
      endDate: "2020/11/27",
      participants: []
    };

    wrapper.vm.$data.active = "weekly";
    wrapper.vm.recurrentevents(
      wrapper.vm.$data.appointment.date,
      wrapper.vm.$data.appointment.endDate
    );

    console.log(
      "Weekly Appointments " + JSON.stringify(wrapper.vm.recurrentdates)
    );
    const weeklyAppointments = wrapper.vm.recurrentdates;
    const expectedlength = 4;
    assert.equal(weeklyAppointments.length, expectedlength);

  });
  it("Create 2 monthly appointments", () => {
    const wrapper = mount(Appointment, {
      store,
      vuetify,
      localVue,
    });

    wrapper.vm.$data.appointment = {
      name: "test",
      description: "testDescription",
      date: "2020/10/16",
      startHour: "01:00",
      endHour: "23:00",
      endDate: "2020/12/27",
      participants: []
    };

      wrapper.vm.$data.active = "monthly";
      wrapper.vm.recurrentevents(
      wrapper.vm.$data.appointment.date,
      wrapper.vm.$data.appointment.endDate
    );

    console.log(
      "Monthly Appointments " + JSON.stringify(wrapper.vm.recurrentdates)
    );
      const monthlyAppointments = wrapper.vm.recurrentdates;
      const expectedlength = 2;
      assert.equal(monthlyAppointments.length, expectedlength);

  });
});
 
