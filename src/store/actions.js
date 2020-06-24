"use strict";

export default {
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
