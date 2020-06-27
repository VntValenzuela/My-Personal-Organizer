"use strict";

export default {
  mutateCreateAgenda(state, agenda) {
    const foudAgendatIndex = state.agendas.findIndex(
      agendaFind => agendaFind.name === agenda.name
    );
    if (state.agendas[foudAgendatIndex] == null) {
      agenda.agendaId =
        "A-" +
        (Number(
          state.agendas[state.agendas.length - 1].agendaId.split("-")[1]
        ) +
          1);
      var color = "#";
      for (var i = 0; i < 6; i++) {
        var letters = "0123456789ABCDEF";
        color += letters[Math.floor(Math.random() * 16)];
      }
      agenda.color = color;
      state.agendas.push(agenda);
    } else {
      alert("Yout can't repeate a name");
    }
  },
  mutateUpdateAgenda(state, agendaNew) {
    const foudAgendaIndex = state.agendas.findIndex(
      agenda => agenda.agendaId === agendaNew.agendaId
    );
    state.agendas[foudAgendaIndex] = agendaNew;
  },
  mutateDeleteAgenda(state, agendaId) {
    state.agendas = state.agendas.filter(
      agenda => agenda.agendaId !== agendaId
    );
  },

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
      state.scheduledAppointments.splice(
        updateIndex,
        1,
        updatedScheduledAppointment
      );
    }
  }
};
