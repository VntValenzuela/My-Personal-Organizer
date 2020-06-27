<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn
            color="primary"
            class="mr-4"
            dark
            @click="sendData(selectedAppointment, true)"
          >
            New Event
          </v-btn>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
            class="mr-4"
          >
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>

      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-btn @click="deleteScheduledAppointment(selectedEvent.id)" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <p>{{ selectedEvent.description }}</p>
              <p>{{ selectedEvent.startHour }} - {{ selectedEvent.endHour }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">
                Close
              </v-btn>
              <v-btn
                text
                color="secondary"
                @click="sendData(selectedEvent, false)"
              >
                Edit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
    <Appointment
      :selectedAppointment="selectedAppointment"
      :dialog="dialog"
      :newAppointment="newAppointment"
      @close="dialog = false"
    />
  </v-row>
</template>

<script>
import Appointment from "@/components/Appointment.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Appointment
  },
  data: () => ({
    today: new Date().toISOString().substr(0, 10),
    focus: new Date().toISOString().substr(0, 10),
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days"
    },
    start: null,
    end: null,
    color: "#1976D2",
    currentlyEditing: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    dialog: false,
    newAppointment: false,
    selectedAppointment: {}
    /*events: [
      {
        name: "Cita con el doctor",
        details: "Revision medica con el Dr.Jaldin",
        start: "2020-06-22",
        end: "2020-06-22",
        color: "#ff8080"
      },
      {
        name: "Viaje de Negocios",
        details:
          "Viaje a Argentina para la reunion con el presidente de la Mercosur",
        start: "2020-06-23",
        end: "2020-07-01",
        color: "#ff8080"
      }
    ]*/
  }),
  computed: {
    ...mapGetters(["getScheduledAppointments", "getAgendas"]),
    appointments() {
      return this.getScheduledAppointments;
    },
    agendas() {
      return this.getAgendas;
    },
    events() {
      //console.log("CALENDAR -> events Changed");
      return this.getScheduledAppointments.map(appointment => {
        return {
          ...appointment,
          start: `${appointment.date} ${appointment.startHour}`,
          end: `${appointment.date} ${appointment.endHour}`,
          color: "#ff8080"
        };
      });
    }
  },
  mounted() {
    this.getEvents();
  },
  methods: {
    getEvents() {}, //Falta implementar
    updateEvent() {}, //Falta implementar
    deleteEvent() {}, //Falta implementar
    addEvent() {}, // Falta implentar

    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    editEvent(event) {
      this.currentlyEditing = event.id;
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      this.start = start;
      this.end = end;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    deleteScheduledAppointment(deletedScheduledAppointmentId) {
      this.$store.dispatch(
        "deleteScheduledAppointment",
        deletedScheduledAppointmentId
      );
      this.selectedOpen = false;
    },
    sendData(selectedAppointment, newAppointment) {
      //console.log(`CALENDAR-> Sending data`);
      if (newAppointment) {
        this.selectedAppointment = {};
        /*console.log(
          `CALENDAR-> New ${JSON.stringify(this.selectedAppointment)}`
        );*/
      } else {
        this.selectedAppointment = selectedAppointment;
        /*console.log(
          `CALENDAR-> New ${JSON.stringify(this.selectedAppointment)}`
        );*/
      }
      this.newAppointment = newAppointment;
      this.dialog = true;
    }
  },
  watch: {
    appointments: {
      deep: true,
      handler() {
        console.log("CALENDAR -> events Changed");
      }
    }
  }
};
</script>
