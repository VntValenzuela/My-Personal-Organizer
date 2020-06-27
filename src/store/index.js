import Vue from "vue";
import Vuex from "vuex";

import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

Vue.use(Vuex);

const state = {
  agendas: [
    {
      agendaId: "A-1",
      name: "Work",
      description: "my agenda for work",
      start: "08:30",
      end: "18:30",
      color: "#A00CFF",
      appointments: ["not-null"]
    },
    {
      agendaId: "A-2",
      name: "Personal",
      description: "my agenda for my things",
      start: "18:30",
      end: "21:30",
      color: "#F000F0",
      appointments: []
    },
    {
      agendaId: "A-3",
      name: "Entertainment",
      description: "for entertainment",
      start: "11:30",
      end: "14:30",
      color: "#0000FF",
      appointments: []
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
      agendaId: "A-1",
      participants: ["PART-001", "PART-002"]
    },
    {
      id: "SAP-0002",
      name: "Viaje de Negocios",
      description: "Viaje a Argentina",
      date: "2020-06-23",
      startHour: "22:00",
      endHour: "23:00",
      agendaId: "A-1",
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
      // agendaId: "A-1"
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
  ],
  participants: [
    {
      participantId: "PART-001",
      name: "Person A",
      contactNumber: "70710101"
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
