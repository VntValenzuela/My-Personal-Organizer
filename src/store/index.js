import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    agendas: [
      {
        agendaId: "ANG-0001",
        name: "Work",
        description: "My Agenda to manage my work",
        startHour: "10:00",
        endHour: "16:00",
        appointments: [
          // scheduledAppointments.filter(app => app.agendaId === this.agendaId)
          // concat
          // Iterate to simulate by clonning
          // recursiveAppointments.filter(app => app.agendaId === this.agendaId)
        ]
      }
    ],
    scheduledAppointments: [
      {
        name: "Dentist",
        description: "I need to go to dentist",
        date: "06/18/2020",
        startHour: "10:00",
        endHour: "11:00",
        agendaId: "ANG-0001",
        participants: ["PART-001"]
      }
    ],
    postponedAppointments: [
      {
        name: "Dentist",
        description: "I need to go to dentist"
        // date: "06/18/2020"
        // startHour: "10:00",
        // endHour: "11:00",
        // agendaId: "ANG-001"
      }
    ],
    recursiveAppointments: [
      {
        name: "Dentist",
        description: "I need to go to dentist",
        date: "06/19/2020",
        endDate: "12/18/2020",
        frequency: "Day|Week|Month",
        startHour: "10:00",
        endHour: "11:00",
        agendaId: "ANG-0001",
        participants: ["PART-001"]
      }
    ],
    participants: [
      {
        participantId: "PART-001",
        name: "Person A",
        contactNumber: "70710101"
      }
    ]
  },
  actions: {
    addScheduledAppointment({ commit }, newScheduledAppointment) {
      commit("addScheduledAppointment", newScheduledAppointment);
    }
  },
  mutations: {
    addScheduledAppointment(state, newScheduledAppointment) {
      state.scheduledAppointments.push(newScheduledAppointment);
    }
  },
  getters: {
    getScheduledAppointments(state) {
      return state.scheduledAppointments;
    }
  },
  modules: {}
});
