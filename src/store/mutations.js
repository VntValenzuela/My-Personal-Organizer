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
      if (participant.name === participantToUpdate.name) {
        index = state.participants.indexOf(participant);
        if (index > -1) {
          if (participantToUpdate.contactNumber > 1000000) {
            state.participants.splice(index, 1, participantToUpdate);
          }
        }
      }
    });
  },
  mutateDeleteParticipant(state, participantToDelete) {
    var index;
    state.participants.forEach(participant => {
      if (participant.name === participantToDelete.name) {
        index = state.participants.indexOf(participant);
        if (index > -1) {
          state.participants.splice(index, 1);
        }
      }
    });
  } /*,
  mutateDeleteParticipantFromAppointment(state, participantToDelete) {
    
  }*/
};
