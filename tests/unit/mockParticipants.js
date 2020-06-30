export default {
  participants: [
    {
      participantId: 1,
      name: "Andres Perez Rocha",
      contactNumber: 71234567,
      gender: "Male"
    },
    {
      participantId: 2,
      name: "Andrea Paredes López",
      contactNumber: 72244661,
      gender: "Female"
    },
    {
      participantId: 3,
      name: "Fernando Torrez Siles",
      contactNumber: 73467812,
      gender: "Male"
    },
    {
      participantId: 4,
      name: "Carla Andrade Rojas",
      contactNumber: 79983812,
      gender: "Female"
    },
    {
      participantId: 5,
      name: "Santiago Fernandez Rios",
      contactNumber: 72740037,
      gender: "Male"
    },
    {
      participantId: 6,
      name: "Fernanda Rojas Teran",
      contactNumber: 68580048,
      gender: "Female"
    },
    {
      participantId: 7,
      name: "Carlos Gomez Velarde",
      contactNumber: 73497105,
      gender: "Male"
    },
    {
      participantId: 8,
      name: "Valentina Flores Rios",
      contactNumber: 62707170,
      gender: "Female"
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
      participants: ["Valentina Flores Rios", "Carlos Gomez Velarde"]
    },
    {
      id: "SAP-0002",
      name: "Viaje de Negocios",
      description: "Viaje a Argentina",
      date: "2020-06-23",
      startHour: "22:00",
      endHour: "23:00",
      agendaId: "A-1",
      participants: ["Santiago Fernandez Rios"]
    }
  ]
};
