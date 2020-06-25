import { assert } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";
import Participants from "@/components/Participant.vue";
import Calendary from "@/views/Home.vue";
import VueRouter from "vue-router";

import Vuex from "vuex";
import Vuetify from "vuetify";

import mockParticipantsState from "./mockParticipants";
import actions from "@/store/actions";
import mutations from "@/store/mutations";
import getters from "@/store/getters";

describe("Participants CRUD methods.", () => {
  let localVue;
  let router;
  let vuetify;
  let store;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(Vuetify);
    vuetify = new Vuetify();
    localVue.use(VueRouter);
    router = new VueRouter({
      routes: [
        {
          path: "/calendary/:id",
          name: "Calendary",
          component: Calendary
        }
      ]
    });
    store = new Vuex.Store({
      state: mockParticipantsState,
      actions,
      mutations,
      getters,
      modules: {}
    });
    global.alert = message => {
      console.log(message);
    };
  });

  it("Adding new participant works correctly.", () => {
    const wrapper = mount(Participants, {
      store,
      router,
      vuetify,
      localVue
    });
    const initialLength = wrapper.vm.$store.state.participants.length;
    const expectedLength = initialLength + 1;
    //If all fields are valid
    wrapper.vm.$data.name = "Vanessa Bustillos";
    wrapper.vm.$data.contactNumber = 67427046;

    wrapper.vm._registerParticipant();
    assert.equal(wrapper.vm.$store.state.participants.length, expectedLength);
  });
/*  it("Selecting a participant from global participants list works correctly.", () => {
    const wrapper = mount(Participants, {
      store,
      router,
      vuetify,
      localVue
    });
  });*/
  it("Don't add a participant if it has already been added to an appointment.", () => {
    const wrapper = mount(Participants, {
      store,
      router,
      vuetify,
      localVue
    });
    const initialLength = wrapper.vm.$store.state.participants.length;
    const expectedLength = initialLength;
    //If all fields are valid
    wrapper.vm.$data.name = "Vanessa Bustillos";
    wrapper.vm.$data.contactNumber = 67412346;

    wrapper.vm._registerParticipant();
    assert.equal(wrapper.vm.$store.state.participants.length, expectedLength);
  });
  it("Updating as participant works correctly.", () => {
    const wrapper = mount(Participants, {
      store,
      router,
      vuetify,
      localVue
    });
    const initialLength = wrapper.vm.$store.state.participants.length;
    const expectedLength = initialLength;
    const expectedContactNumber = wrapper.vm.$store.state.participants.find(
      participant => participant.name === "Vanessa Bustillos"
    ).contactNumber;
    //If all fields are valid
    wrapper.vm.$data.name = "Vanessa Bustillos";
    wrapper.vm.$data.contactNumber = 72740037;

    wrapper.vm._updateParticipant();
    assert.equal(wrapper.vm.$store.state.participants.length, expectedLength);
    assert.notEqual(
      wrapper.vm.$store.state.participants.find(
        participant => participant.name === "Vanessa Bustillos"
      ).contactNumber,
      expectedContactNumber
    );
  });
  /*
  it("Delete a participant only from the appointment, not from global list. ", () => {

  });*/
  it("Delete a participant from the global list if it was belonging to past appointments.", () => {
    const wrapper = mount(Participants, {
      store,
      router,
      vuetify,
      localVue
    });
    const initialLength = wrapper.vm.$store.state.participants.length;
    const expectedLength = initialLength - 1;
    //If all fields are valid
    wrapper.vm.$data.name = "Vanessa Bustillos";

    wrapper.vm._deleteParticipant();
    assert.equal(wrapper.vm.$store.state.participants.length, expectedLength);
  });
});
