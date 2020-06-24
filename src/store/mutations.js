export default {
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
  }
};
