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
      state.agendas.push(agenda);
    } else {
      alert("Yout can't repeate a name");
    }
  },
  mutateUpdateAgenda(state, agendaNew) {
    const foudAgendatIndex = state.agendas.findIndex(
      agendaFind =>
        agendaFind.name === agendaNew.name &&
        agendaFind.agendaId !== agendaNew.agendaId
    );
    if (state.agendas[foudAgendatIndex] == null) {
      const foudAgendaIndex2 = state.agendas.findIndex(
        agenda => agenda.agendaId === agendaNew.agendaId
      );
      state.agendas[foudAgendaIndex2] = agendaNew;
    } else {
      alert("Yout can't repeate a name");
    }
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
      state.scheduledAppointments[updateIndex] = updatedScheduledAppointment;
    }
  }
};
