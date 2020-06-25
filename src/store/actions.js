export default {
  //AGENDA
  createAgenda({ commit }, agendaCreated) {
    commit("mutateCreateAgenda", agendaCreated);
  },
  updateAgenda({ commit }, agendaUpdated) {
    commit("mutateUpdateAgenda", agendaUpdated);
  },
  deleteAgenda({ commit }, agendaDeleted) {
    commit("mutateDeleteAgenda", agendaDeleted);
  },
  //PARTICIPANTS
  registerParticipant({ commit }, newParticipant) {
    commit("mutateRegisterParticipant", newParticipant);
  },
  /*
  addParticipant({ commit }, ParticipantToAdd) {
    commit("mutateAddParticipant", ParticipantToAdd);
  },*/
  updateParticipant({ commit }, participantToUpdate) {
    commit("mutateUpdateParticipant", participantToUpdate);
  },
  deleteParticipant({ commit }, participantToDelete) {
    commit("mutateDeleteParticipant", participantToDelete);
  } /*,
  deleteParticipantFromAppointment({ commit }, participantToDelete) {
    commit("mutateDeleteParticipantFromAppoitment", participantToDelete);
  }*/
};
