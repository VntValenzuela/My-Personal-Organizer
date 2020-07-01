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
      localVue
    });

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
    wrapper.vm.$data.appointment.date = "2020/10/23";
    wrapper.vm.$data.appointment.endDate = "2020/10/31";
    wrapper.vm.recurrentevents(
      wrapper.vm.$data.appointment.date,
      wrapper.vm.$data.appointment.endDate
    );

    console.log(
      "Daily Appointments " + JSON.stringify(wrapper.vm.recurrentdates)
    );
    const dailyAppointments = wrapper.vm.recurrentdates;
    const expectedlength = 8;
    const secondappointment = '"2020-10-25"';
    const thirdappointmenent = '"2020-10-26"';

    assert.equal(JSON.stringify(dailyAppointments[0].date), secondappointment);
    assert.equal(JSON.stringify(dailyAppointments[1].date), thirdappointmenent);
    assert.equal(dailyAppointments.length, expectedlength);
  });
  it("Create 4 weekly appointment", () => {
    const wrapper = mount(Appointment, {
      store,
      vuetify,
      localVue
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
    wrapper.vm.$data.appointment.date = "2020/10/24";
    wrapper.vm.$data.appointment.endDate = "2020/11/26";
    const secondappointment = '"2020-11-01"';
    const thirdappointmenent = '"2020-11-08"';
    const fourthappointment = '"2020-11-15"';
    const fifthappointmenent = '"2020-11-22"';
    wrapper.vm.recurrentevents(
      wrapper.vm.$data.appointment.date,
      wrapper.vm.$data.appointment.endDate
    );

    console.log(
      "Weekly Appointments " + JSON.stringify(wrapper.vm.recurrentdates)
    );
    const weeklyAppointments = wrapper.vm.recurrentdates;
    const expectedlength = 4;
    assert.equal(JSON.stringify(weeklyAppointments[0].date), secondappointment);
    assert.equal(
      JSON.stringify(weeklyAppointments[1].date),
      thirdappointmenent
    );
    assert.equal(JSON.stringify(weeklyAppointments[2].date), fourthappointment);
    assert.equal(
      JSON.stringify(weeklyAppointments[3].date),
      fifthappointmenent
    );
    assert.equal(weeklyAppointments.length, expectedlength);
  });
  it("Create 2 monthly appointments", () => {
    const wrapper = mount(Appointment, {
      store,
      vuetify,
      localVue
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
    wrapper.vm.$data.appointment.date = "2020/10/15";
    wrapper.vm.$data.appointment.endDate = "2020/12/26";
    wrapper.vm.recurrentevents(
      wrapper.vm.$data.appointment.date,
      wrapper.vm.$data.appointment.endDate
    );

    console.log(
      "Monthly Appointments " + JSON.stringify(wrapper.vm.recurrentdates)
    );
    const monthlyAppointments = wrapper.vm.recurrentdates;
    const expectedlength = 2;
    const secondappointment = '"2020-11-16"';
    const thirdappointmenent = '"2020-12-16"';
    assert.equal(
      JSON.stringify(monthlyAppointments[0].date),
      secondappointment
    );
    assert.equal(
      JSON.stringify(monthlyAppointments[1].date),
      thirdappointmenent
    );
    assert.equal(monthlyAppointments.length, expectedlength);
  });
});
