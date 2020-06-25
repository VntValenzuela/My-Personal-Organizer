import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

Vue.use(Vuex);

const state = {
  agendas: [
    {
      name: "Work",
      description: "my agenda for work",
      start: "8:30",
      end: "18:30",
      appointments: ["not-null"]
    },
    {
      name: "Personal",
      description: "my agenda for my things",
      start: "18:30",
      end: "21:30",
      appointments: []
    },
    {
      name: "Entertainment",
      description: "for entertainment",
      start: "11:30",
      end: "14:30",
      appointments: []
    }
  ],
  participants: [
    {
      name: "Juan Perez",
      contactNumber: 71234567,
      amountOfAppointments: 0,
      appointments: []
    },
    {
      name: "Andrea Teran",
      contactNumber: 72244661,
      amountOfAppointments: 0,
      appointments: []
    },
    {
      name: "Fernando Torrez",
      contactNumber: 73467812,
      amountOfAppointments: 0,
      appointments: []
    },
    {
      name: "Carla Andrade",
      contactNumber: 79983812,
      amountOfAppointments: 0,
      appointments: []
    },
    {
      name: "Luis Torrico",
      contactNumber: 67420345,
      amountOfAppointments: 0,
      appointments: []
    },
    {
      name: "Camila Cossio",
      contactNumber: 67234591,
      amountOfAppointments: 0,
      appointments: []
    },
    {
      name: "Karen Flores",
      contactNumber: 75588992,
      amountOfAppointments: 0,
      appointments: []
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
