<template>
  <div>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-container>
          <v-form>
            <v-text-field
              v-model="appointment.name"
              autocomplete="off"
              label="Appointment Name"
            >
            </v-text-field>
            <v-text-field
              v-model="appointment.details"
              autocomplete="off"
              label="Description"
            >
            </v-text-field>
            <v-select
              v-model="appointment.agendaID"
              :items="agendasNames"
              label="Choose an Agenda"
            ></v-select>
            <v-menu
              v-model="menu0"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="200px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  append-icon="event"
                  v-model="appointment.date"
                  label="Date"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                :no-title="true"
                min="2020-06-23"
                max="2020-12-31"
                v-model="appointment.date"
                @input="menu0 = false"
              ></v-date-picker>
            </v-menu>
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="appointment.startHour"
              transition="scale-transition"
              max-width="290px"
              min-width="200px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="appointment.startHour"
                  append-icon="access_time"
                  label="Starting Hour"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menu1"
                v-model="appointment.startHour"
                full-width
                ampm-in-title
                @click:minute="$refs.menu1.save(appointment.startHour)"
              ></v-time-picker>
            </v-menu>
            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="appointment.endHour"
              transition="scale-transition"
              max-width="290px"
              min-width="200px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  append-icon="access_time"
                  v-model="appointment.endHour"
                  label="Ending Hour"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menu2"
                v-model="appointment.endHour"
                full-width
                ampm-in-title
                @click:minute="$refs.menu2.save(appointment.endHour)"
              ></v-time-picker>
            </v-menu>
            <v-select
              v-model="appointment.participants"
              :items="participants"
              label="Choose an Agenda"
            ></v-select>
            <v-btn
              type="submit"
              color="primary"
              class="mr-4"
              @click.stop="dialog = false"
            >
              Create Event
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Appointment",
  data() {
    return {
      // dialog: false,
      appointment: {
        id: null,
        name: null,
        description: null,
        date: null,
        startHour: null,
        endHour: null,
        agendaID: null,
        participants: []
      },
      color: "#1976D2",
      time: null,
      menu0: false,
      menu1: false,
      menu2: false
    };
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    selectedAppointment: {
      type: Object,
      default: function() {
        return {
          id: null,
          name: null,
          description: null,
          date: null,
          startHour: null,
          endHour: null,
          agendaID: null,
          participants: []
        };
      }
    },
    newAppointment: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      "getScheduledAppointments",
      "getAgendas",
      "getParticipants"
    ]),
    appointments() {
      return this.getScheduledAppointments;
    },
    agendas() {
      return this.getAgendas;
    },
    participants() {
      return this.getParticipants;
    },
    agendasNames() {
      const defaultArray = ["Default"];
      const agendasNames = this.agendas.map(agenda => agenda.name);
      return defaultArray.concat(agendasNames);
    }
  },
  methods: {
    addScheduledAppointment() {
      this.generateNewId();
      this.$store.dispatch("addScheduledAppointment", this.appointment);
    },
    generateNewId() {
      const numberOfAppointments = this.appointments.length;
      let newId = 0;
      if (numberOfAppointments > 0) {
        const lastId = this.appointments[numberOfAppointments - 1].id;
        newId = parseInt(lastId.split("-")[1]) + 1;
        newId = ("000" + newId).slice(-4);
      }
      this.appointment.id = `SAP-${newId}`;
    },
    initializeData() {
      if (!this.newAppointment) {
        this.appointment = this.selectedAppointment;
      }
    }
  },
  mounted() {
    this.initializeData();
  }
};
</script>
