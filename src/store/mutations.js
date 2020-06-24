"use strict";

export default {
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
};
