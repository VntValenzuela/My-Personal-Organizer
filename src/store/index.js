import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
    ]
  },
  actions: {
    createAgenda({ commit }, agendaCreated) {
      commit("mutateCreateAgenda", agendaCreated);
    },
    updateAgenda({ commit }, agendaUpdated) {
      commit("mutateUpdateAgenda", agendaUpdated);
    },
    deleteAgenda({ commit }, agendaDeleted) {
      commit("mutateDeleteAgenda", agendaDeleted);
    }
  },
  mutations: {
    mutateCreateAgenda(state, agenda) {
      const foudAgendatIndex = state.agendas.findIndex(
        agendaFind => agendaFind.name === agenda.name
      );
      if (state.agendas[foudAgendatIndex] == null) {
        state.agendas.push(agenda);
      } else {
        alert("Yout can't repeate a name");
      }
    },
    mutateUpdateAgenda(state, agendaName) {
      const foudAgendaIndex = state.agendas.findIndex(
        agenda => agenda.name === agendaName.name
      );
      state.agendas[foudAgendaIndex] = agendaName.agenda;
    },
    mutateDeleteAgenda(state, name) {
      state.agendas = state.agendas.filter(agenda => agenda.name !== name);
    }
  },
  getters: {
    getAgendas(state) {
      return state.agendas;
    }
  },
  modules: {}
});
