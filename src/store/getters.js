"use strict";

export default {
  getAgendas(state) {
    return state.agendas;
  },
  getScheduledAppointments(state) {
    return state.scheduledAppointments;
  },
  getPostponedAppointments(state) {
    return state.postponedAppointments;
  },
  getRecursiveAppointments(state) {
    return state.recursiveAppointments;
  },
  getParticipants(state) {
    return state.participants;
  }
};
