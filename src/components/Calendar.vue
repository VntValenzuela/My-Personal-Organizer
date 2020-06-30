<template>
  <div>
    <v-app-bar app flat color="white" clipped-left height="50">
      <v-app-bar-nav-icon
        id="nav-var-calendar"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <img class="mr-3" :src="require('../assets/Calendar.png')" height="40" />
      <v-toolbar-title>
        Calendar
      </v-toolbar-title>
      <v-btn outlined class="ms-4 " color="grey darken-2" @click="setToday">
        Today
      </v-btn>
      <v-btn fab text small color="grey darken-2" @click="prev">
        <v-icon small>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn fab text small color="grey darken-2" @click="next" class="mr-4">
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
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" clipped class="nav-element">
      <v-btn
        id="btn-create"
        dark
        rounded
        large
        color="white"
        class="black--text"
        @click="sendData(selectedAppointment, true)"
      >
        <v-icon large color="light-blue" left>mdi-plus</v-icon> Create
      </v-btn>
      <v-list dense>
        <v-list-item link @click="redirectToView('')">
          <v-list-item-action>
            <v-icon>mdi-notebook-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Agendas
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="redirectToView('participant')">
          <v-list-item-action>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Participants
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="redirectToView('postponeList')">
          <v-list-item-action>
            <v-icon>mdi-calendar</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              PostponeList
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-subheader>Agendas</v-subheader>
      <v-list flat>
        <v-list-item-group v-model="selectedAgendas" multiple color="indigo">
          <v-list-item v-for="agenda in agendas" :key="agenda.id">
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox
                  :input-value="active"
                  :color="agenda.color"
                ></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ agenda.name }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  agenda.description
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col>
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
                offset-y
              >
                <v-card color="grey lighten-4" min-width="350px" flat>
                  <v-toolbar :color="selectedEvent.color" dark>
                    <v-toolbar-title
                      v-html="selectedEvent.name"
                    ></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>mdi-calendar-clock</v-icon>
                    </v-btn>
                    <v-btn
                      @click="deleteScheduledAppointment(selectedEvent.id)"
                      icon
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text>
                    <h3>{{ selectedEvent.description }}</h3>
                    <h3>
                      {{ selectedEvent.startHour }} -
                      {{ selectedEvent.endHour }}
                    </h3>
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
                      Update
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
      </v-container>
    </v-main>
  </div>
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
    drawer: false,
    newAppointment: false,
    selectedAppointment: {},
    selectedAgendas: [],
    filteredEvents: []
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
      let eventsToShow = [];
      if (this.filteredEvents) {
        eventsToShow = this.filteredEvents.map(appointment => {
          return {
            ...appointment,
            start: `${appointment.date} ${appointment.startHour}`,
            end: `${appointment.date} ${appointment.endHour}`
          };
        });
      }
      return eventsToShow;
    }
  },
  mounted() {
    this.initSelectedAgendas();
  },
  methods: {
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
      if (newAppointment) {
        this.selectedAppointment = {};
      } else {
        this.selectedAppointment = selectedAppointment;
      }
      this.newAppointment = newAppointment;
      this.dialog = true;
    },
    filterEvents() {
      let eventsFiltered = [];
      if (this.selectedAgendas.length > 0) {
        this.selectedAgendas.forEach(index => {
          const foundAgenda = this.agendas[index];
          eventsFiltered = eventsFiltered.concat(
            this.appointments
              .filter(
                appointmentF => appointmentF.agendaId === foundAgenda.agendaId
              )
              .map(appointment => {
                return { ...appointment, color: foundAgenda.color };
              })
          );
        });
      }
      this.filteredEvents = eventsFiltered;
    },
    initSelectedAgendas() {
      const numberOfAgendas = this.getAgendas.length;
      this.selectedAgendas = Array.from(Array(numberOfAgendas).keys());
    },
    redirectToView(route) {
      this.$router.push(`/${route}`);
    }
  },
  watch: {
    selectedAgendas() {
      this.filterEvents();
    },
    appointments: {
      deep: true,
      handler() {
        this.filterEvents();
      }
    }
  }
};
</script>
