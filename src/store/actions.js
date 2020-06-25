"use strict";

export default {
  createAgenda({ commit }, agendaCreated) {
    commit("mutateCreateAgenda", agendaCreated);
  },
  updateAgenda({ commit }, agendaUpdated) {
    commit("mutateUpdateAgenda", agendaUpdated);
  },
  deleteAgenda({ commit }, agendaDeleted) {
    commit("mutateDeleteAgenda", agendaDeleted);
  },

  addScheduledAppointment({ commit }, newScheduledAppointment) {
    commit("addScheduledAppointment", newScheduledAppointment);
  },
  deleteScheduledAppointment({ commit }, deletedScheduledAppointmentId) {
    commit("deleteScheduledAppointment", deletedScheduledAppointmentId);
  },
  updateScheduledAppointment({ commit }, updatedScheduledAppointment) {
    commit("updateScheduledAppointment", updatedScheduledAppointment);
  }
};
