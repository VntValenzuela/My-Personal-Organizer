export default {
  agendas: [
    {
      agendaId: "A-1",
      name: "Work",
      description: "my agenda for work",
      start: "08:30",
      end: "18:30",
      color: "#4DB6AC",
      appointments: ["not-null"]
    },
    {
      agendaId: "A-2",
      name: "Personal",
      description: "my agenda for my things",
      start: "18:30",
      end: "21:30",
      color: "#FFEA00",
      appointments: []
    },
    {
      agendaId: "A-3",
      name: "Entertainment",
      description: "for entertainment",
      start: "11:30",
      end: "14:30",
      color: "#90A4AE",
      appointments: []
    }
  ],
  scheduledAppointments: [
    {
      id: "SAP-0001",
      name: "Dentist",
      description: "I need to go to dentist",
      date: "2020-06-22",
      startHour: "10:00",
      endHour: "11:00",
      agendaId: "A-1",
      participants: ["PART-001", "PART-002"]
    },
    {
      id: "SAP-0002",
      name: "Viaje de Negocios",
      description: "Viaje a Argentina",
      date: "2020-06-23",
      startHour: "18:30",
      endHour: "21:00",
      agendaId: "A-2",
      participants: []
    }
  ],
  postponedAppointments: [],
  recursiveAppointments: [],
  participants: []
};
