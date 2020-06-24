export default {
  createAgenda({ commit }, agendaCreated) {
    commit("mutateCreateAgenda", agendaCreated);
  },
  updateAgenda({ commit }, agendaUpdated) {
    commit("mutateUpdateAgenda", agendaUpdated);
  },
  deleteAgenda({ commit }, agendaDeleted) {
    commit("mutateDeleteAgenda", agendaDeleted);
  }
};
