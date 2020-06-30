"use strict";

export default {
  getAgendas(state) {
    return state.agendas;
  },
  getScheduledAppointments(state) {
    return state.scheduledAppointments;
  },
  getParticipants(state) {
    return state.participants;
  },
  getPostponeList(state) {
    return state.postponedAppointments;
  }
};
