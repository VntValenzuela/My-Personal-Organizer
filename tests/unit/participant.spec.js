import { assert } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";
import Participant from "@/components/Participant.vue";

import Vuex from "vuex";
import Vuetify from "vuetify";

import mockParticipantsState from "./mockParticipants";
import actions from "@/store/actions";
import mutations from "@/store/mutations";
import getters from "@/store/getters";

describe("Participants CRUD methods.", () => {
  let localVue;
  let vuetify;
  let store;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(Vuetify);

    vuetify = new Vuetify();

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

  it("Register a new participant works correctly.", () => {
    const wrapper = mount(Participant, {
      store,
      vuetify,
      localVue
    });
    const initialLength = wrapper.vm.$store.state.participants.length;
    const expectedLength = initialLength + 1;
    //If all fields are valid
    wrapper.vm.$data.participantId = 5;
    wrapper.vm.$data.name = "Vanessa Bustillos";
    wrapper.vm.$data.contactNumber = 67427046;
    wrapper.vm.$data.gender = "Female";
    wrapper.vm._registerParticipant();
    assert.equal(wrapper.vm.$store.state.participants.length, expectedLength);
  });

  it("Don't add a participant if there was another participant with the same name", () => {
    const wrapper = mount(Participant, {
      store,
      vuetify,
      localVue
    });
    const initialLength = wrapper.vm.$store.state.participants.length;
    const expectedLength = initialLength;
    //If all fields are valid
    wrapper.vm.$data.name = "Vanessa Bustillos";
    wrapper.vm.$data.contactNumber = 67412346;
    wrapper.vm.$data.gender = "Female";
    wrapper.vm._registerParticipant();
    assert.equal(wrapper.vm.$store.state.participants.length, expectedLength);
  });

  it("Don't add a participant if there are empty fields.", () => {
    const wrapper = mount(Participant, {
      store,
      vuetify,
      localVue
    });
    const initialLength = wrapper.vm.$store.state.participants.length;
    const expectedLength = initialLength;
    //If one field is invalid
    wrapper.vm.$data.name = "";
    wrapper.vm.$data.contactNumber = 67456789;
    wrapper.vm.$data.gender = "Male";
    wrapper.vm._registerParticipant();
    assert.equal(wrapper.vm.$store.state.participants.length, expectedLength);
  });

  it("Don't add a participant if the contact number doesn't have at least 7 digits.", () => {
    const wrapper = mount(Participant, {
      store,
      vuetify,
      localVue
    });
    const initialLength = wrapper.vm.$store.state.participants.length;
    const expectedLength = initialLength;
    //If one field is invalid
    wrapper.vm.$data.name = "Andres Rojas";
    wrapper.vm.$data.contactNumber = 123;
    wrapper.vm.$data.gender = "Male";
    wrapper.vm._registerParticipant();
    assert.equal(wrapper.vm.$store.state.participants.length, expectedLength);
  });

  it("Updating a participant works correctly.", () => {
    const wrapper = mount(Participant, {
      store,
      vuetify,
      localVue
    });
    let participantId = wrapper.vm.$store.state.participants[0].participantId;
    const initialLength = wrapper.vm.$store.state.participants.length;
    const expectedLength = initialLength;
    const expectedContactNumber = wrapper.vm.$store.state.participants.find(
      participant => participant.participantId === participantId
    ).contactNumber;
    //If all fields are valid
    wrapper.vm.$data.selectedParticipant = participantId;
    wrapper.vm.$data.name = "Juan Torrez";
    wrapper.vm.$data.contactNumber = 72740037;
    wrapper.vm.$data.gender = "Male";
    wrapper.vm._updateParticipant();
    assert.equal(wrapper.vm.$store.state.participants.length, expectedLength);
    assert.notEqual(
      wrapper.vm.$store.state.participants.find(
        participant => participant.participantId === participantId
      ).contactNumber,
      expectedContactNumber
    );
  });

  it("Delete a participant from the global list if it doesn't have any upcoming appointment.", () => {
    const wrapper = mount(Participant, {
      store,
      vuetify,
      localVue
    });
    const initialLength = wrapper.vm.$store.state.participants.length;
    const expectedLength = initialLength - 1;
    let selectedId = wrapper.vm.$store.state.participants[2].participantId;

    wrapper.vm.$data.selectedParticipant = selectedId;

    wrapper.vm._deleteParticipant();
    assert.equal(wrapper.vm.$store.state.participants.length, expectedLength);
  });

  it("Don't delete a participant from the global list if it has upcoming appointments.", () => {
    const wrapper = mount(Participant, {
      store,
      vuetify,
      localVue
    });
    let initialLength = wrapper.vm.$store.state.participants.length;
    let expectedLength = initialLength;
    let selectedId =
      wrapper.vm.$store.state.participants[initialLength - 2].participantId;

    wrapper.vm.$data.selectedParticipant = selectedId;

    wrapper.vm._deleteParticipant();
    assert.equal(wrapper.vm.$store.state.participants.length, expectedLength);
  });
});
