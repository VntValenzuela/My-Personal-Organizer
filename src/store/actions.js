"use strict";

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
  },
  /*
  deleteParticipantFromAppointment({ commit }, participantToDelete) {
    commit("mutateDeleteParticipantFromAppoitment", participantToDelete);
  }*/
  //SCHEDULED APPOINTMENTS
  addScheduledAppointment({ commit }, newScheduledAppointment) {
    commit("addScheduledAppointment", newScheduledAppointment);
  },
  deleteScheduledAppointment({ commit }, deletedScheduledAppointmentId) {
    commit("deleteScheduledAppointment", deletedScheduledAppointmentId);
  },
  updateScheduledAppointment({ commit }, updatedScheduledAppointment) {
    commit("updateScheduledAppointment", updatedScheduledAppointment);
  },
  addPostponeAppointment({ commit }, newPostponeAppointment) {
    commit("addPostponeAppointment", newPostponeAppointment);
  },
  deletePostponeAppointment({ commit }, deletedPostponeAppointmentName) {
    commit("deletePostponeAppointment", deletedPostponeAppointmentName);
  }
};
