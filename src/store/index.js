import Vue from "vue";
import Vuex from "vuex";

import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

Vue.use(Vuex);

const state = {
  agendas: [
    {
      agendaId: "ANG-0001",
      name: "Work",
      description: "my agenda for work",
      start: "8:30",
      end: "18:30",
      appointments: ["not-null"]
    },
    {
      agendaId: "ANG-0002",
      name: "Personal",
      description: "my agenda for my things",
      start: "18:30",
      end: "21:30",
      appointments: []
    },
    {
      agendaId: "ANG-0003",
      name: "Entertainment",
      description: "for entertainment",
      start: "11:30",
      end: "14:30",
      appointments: []
    }
  ],
  participants: [
    {
      participantId: 1,
      name: "Juan Perez Rocha",
      contactNumber: 71234567,
      upcomingAppointments: [],
      gender: "Male"
    },
    {
      participantId: 2,
      name: "Andrea Paredes López",
      contactNumber: 72244661,
      upcomingAppointments: [],
      gender: "Female"
    },
    {
      participantId: 3,
      name: "Fernando Torrez Siles",
      contactNumber: 73467812,
      upcomingAppointments: [],
      gender: "Male"
    },
    {
      participantId: 4,
      name: "Carla Andrade Rojas",
      contactNumber: 79983812,
      upcomingAppointments: [],
      gender: "Female"
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
  ]
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {}
});
