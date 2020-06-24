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
        id: "SAP-0001",
        name: "Dentist",
        description: "I need to go to dentist",
        date: "2020-06-22",
        startHour: "10:00",
        endHour: "11:00",
        agendaId: "ANG-0001",
        participants: ["PART-001", "PART-002"]
      },
      {
        id: "SAP-0002",
        name: "Viaje de Negocios",
        description: "Viaje a Argentina",
        date: "2020-06-23",
        startHour: "22:00",
        endHour: "23:00",
        agendaId: "ANG-0001",
        participants: []
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
    },
    deleteScheduledAppointment({ commit }, deletedScheduledAppointmentId) {
      commit("deleteScheduledAppointment", deletedScheduledAppointmentId);
    },
    updateScheduledAppointment({ commit }, updatedScheduledAppointment) {
      commit("updateScheduledAppointment", updatedScheduledAppointment);
    }
  },
  mutations: {
    addScheduledAppointment(state, newScheduledAppointment) {
      state.scheduledAppointments.push(newScheduledAppointment);
    },
    deleteScheduledAppointment(state, deletedScheduledAppointmentId) {
      state.scheduledAppointments = state.scheduledAppointments.filter(
        scheduledAppointment =>
          scheduledAppointment.id !== deletedScheduledAppointmentId
      );
    },
    updateScheduledAppointment(state, updatedScheduledAppointment) {
      const updateIndex = state.scheduledAppointments.findIndex(
        scheduledAppointment =>
          scheduledAppointment.id === updatedScheduledAppointment.id
      );
      if (updateIndex >= 0) {
        state.scheduledAppointments[updateIndex] = updatedScheduledAppointment;
      }
    }
  },
  getters: {
    getScheduledAppointments(state) {
      return state.scheduledAppointments;
    },
    getAgendas(state) {
      return state.agendas;
    },
    getParticipants(state) {
      return state.participants;
    }
  },
  modules: {}
});
