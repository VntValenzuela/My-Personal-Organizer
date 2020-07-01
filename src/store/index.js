import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate";

import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

Vue.use(Vuex);

const state = {
  agendas: [
    {
      agendaId: "A-1",
      name: "Work",
      description: "My agenda for work",
      start: "08:30",
      end: "19:30",
      color: "#4DB6AC",
      appointments: ["not-null", "nor-null"]
    },
    {
      agendaId: "A-2",
      name: "Personal",
      description: "My agenda for my things",
      start: "12:00",
      end: "18:30",
      color: "#FFEA00",
      appointments: []
    },
    {
      agendaId: "A-3",
      name: "Entertainment",
      description: "My agenda for entertainment",
      start: "19:00",
      end: "23:30",
      color: "#283593",
      appointments: []
    }
  ],
  participants: [
    {
      participantId: 1,
      name: "Andres Peredo Rocha",
      contactNumber: 71234567,
      gender: "Male"
    },
    {
      participantId: 2,
      name: "Andrea Paredes López",
      contactNumber: 72244661,
      gender: "Female"
    },
    {
      participantId: 3,
      name: "Fernando Torrez Siles",
      contactNumber: 73467812,
      gender: "Male"
    },
    {
      participantId: 4,
      name: "Carla Andrade Rojas",
      contactNumber: 79983812,
      gender: "Female"
    },
    {
      participantId: 5,
      name: "Sergio Fernandez Rios",
      contactNumber: 72740037,
      gender: "Male"
    },
    {
      participantId: 6,
      name: "Fernanda Rojas Teran",
      contactNumber: 68580048,
      gender: "Female"
    },
    {
      participantId: 7,
      name: "Carlos Gomez Velarde",
      contactNumber: 73497105,
      gender: "Male"
    },
    {
      participantId: 8,
      name: "Valentina Flores Rios",
      contactNumber: 62707170,
      gender: "Female"
    }
  ],
  scheduledAppointments: [
    {
      id: "SAP-0001",
      name: "Certi II Test",
      description: "I have to defend my project",
      date: "2020-07-01",
      startHour: "19:00",
      endHour: "19:30",
      agendaId: "A-1",
      participants: [3, 5, 6]
    },
    {
      id: "SAP-0002",
      name: "Barber",
      description: "I have to get my mane cut",
      date: "2020-07-24",
      startHour: "12:00",
      endHour: "12:30",
      agendaId: "A-2",
      participants: []
    },
    {
      id: "SAP-0003",
      name: "Concert",
      description: "party with friends",
      date: "2020-07-26",
      startHour: "19:00",
      endHour: "23:30",
      agendaId: "A-3",
      participants: [1, 2]
    }
  ],
  postponedAppointments: [
    {
      name: "Homework",
      description: "I have to finish my homework"
    },
    {
      name: "Cleaning",
      description: "I have to clean my room"
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
      agendaId: "A-1",
      participants: ["PART-001"]
    }
  ]
};
export default new Vuex.Store({
  plugins: [createPersistedState()],
  state,
  actions,
  mutations,
  getters,
  modules: {}
});
