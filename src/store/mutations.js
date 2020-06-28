"use strict";

export default {
  //AGENDA
  mutateCreateAgenda(state, agenda) {
    state.agendas.push(agenda);
  },
  mutateUpdateAgenda(state, agendaNew) {
    const foudAgendaIndex2 = state.agendas.findIndex(
      agenda => agenda.agendaId === agendaNew.agendaId
    );
    state.agendas[foudAgendaIndex2] = agendaNew;
  },
  mutateDeleteAgenda(state, agendaId) {
    state.agendas = state.agendas.filter(
      agenda => agenda.agendaId !== agendaId
    );
  },

  //PARTICIPANTS
  mutateRegisterParticipant(state, newParticipant) {
    var existingParticipant = false;
    if (
      newParticipant.name !== "" ||
      newParticipant.contactNumber < 1000000 ||
      newParticipant.gender !== ""
    ) {
      state.participants.forEach(participant => {
        if (participant.name === newParticipant.name) {
          existingParticipant = true;
        }
      });
      if (!existingParticipant) {
        state.participants.push(newParticipant);
      }
    }
  },
  mutateUpdateParticipant(state, participantToUpdate) {
    var index;
    state.participants.forEach(participant => {
      if (participant.participantId === participantToUpdate.participantId) {
        index = state.participants.indexOf(participant);
        if (index > -1) {
          state.participants.splice(index, 1, participantToUpdate);
        }
      }
    });
  },
  mutateDeleteParticipant(state, participantToDelete) {
    var index;
    state.participants.forEach(participant => {
      if (participant.participantId === participantToDelete.participantId) {
        index = state.participants.indexOf(participant);
        if (index > -1) {
          state.participants.splice(index, 1);
        }
      }
    });
  },
  //SCHEDULED APPOINTMENTS
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
