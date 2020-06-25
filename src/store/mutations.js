"use strict";

export default {
  //AGENDA
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
  },

  //PARTICIPANTS
  mutateRegisterParticipant(state, newParticipant) {
    var existingParticipant = false;
    if (newParticipant.name !== "" || newParticipant.contactNumber < 1000000) {
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
  /*
  mutateAddParticipant(state, participantToAdd) {
    
  },*/
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
  /*
  mutateDeleteParticipantFromAppointment(state, participantToDelete) {
    
  }*/
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
      state.scheduledAppointments[updateIndex] = updatedScheduledAppointment;
    }
  }
};
