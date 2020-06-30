<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="appointment.name"
              autocomplete="off"
              label="Appointment Name"
              :rules="[required('Name')]"
            >
            </v-text-field>
            <v-text-field
              v-model="appointment.description"
              autocomplete="off"
              label="Description"
              :rules="[required('Description')]"
            >
            </v-text-field>
            <v-select
              v-model="appointment.agendaId"
              :items="agendas"
              item-text="name"
              item-value="agendaId"
              label="Choose an Agenda"
              :rules="[required('Agenda')]"
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
                  :rules="[required('Date')]"
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
                  :rules="[
                    required('Start Hour'),
                    higherAgenda('Starting'),
                    lowerAgenda('Starting')
                  ]"
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
                  :rules="[
                    required('Ending Hour'),
                    higher(),
                    higherAgenda('Ending'),
                    lowerAgenda('Ending')
                  ]"
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
              :items="participantsNames"
              multiple
              append-icon="mdi-plus"
              label="Select participants"
            ></v-select>
            <v-btn color="primary" class="mr-4" @click.stop="reset"
              >CLOSE
            </v-btn>
            <v-btn
              color="primary"
              class="mr-4"
              @click.stop="dispatchAction"
              :disabled="!valid"
              >{{ newAppointment ? "SAVE" : "UPDATE" }}
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
      color: "#1976D2",
      time: null,
      menu0: false,
      menu1: false,
      menu2: false,
      valid: false,
      required(propertyType) {
        return value =>
          (value && (value + "").length > 0) || `${propertyType} is required`;
      },
      higher() {
        return value =>
          value >= this.appointment.startHour ||
          `Ending Hour must be higher than Starting hour`;
      },
      higherAgenda(propertyType) {
        let agenda = {};
        let msg = "Select a Agenda for this Appointment";
        if (typeof this.appointment.agendaId === "string") {
          agenda = this.agendas.find(
            agenda => agenda.agendaId === this.appointment.agendaId
          );
          msg = `${propertyType} Hour must be higher than Agenda Starting hour ${agenda.start}`;
        }
        return value => value >= agenda.start || msg;
      },
      lowerAgenda(propertyType) {
        let agenda = {};
        let msg = "Select a Agenda for this Appointment";
        if (typeof this.appointment.agendaId === "string") {
          agenda = this.agendas.find(
            agenda => agenda.agendaId === this.appointment.agendaId
          );
          msg = `${propertyType} Hour must be lower than Agenda Ending hour ${agenda.end}`;
        }
        return value => value <= agenda.end || msg;
      }
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
          agendaId: null,
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
    },
    participantsNames() {
      return this.participants.map(participant => participant.name);
    },
    appointment() {
      return Object.assign({}, this.selectedAppointment);
    }
  },
  methods: {
    addScheduledAppointment() {
      this.generateNewId();
      this.$store.dispatch("addScheduledAppointment", this.appointment);
      this.reset();
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
    dispatchAction() {
      if (this.$refs.form.validate()) {
        if (this.newAppointment) {
          this.generateNewId();
          this.$store.dispatch("addScheduledAppointment", this.appointment);
          this.$emit("save");
        } else {
          this.$store.dispatch("updateScheduledAppointment", this.appointment);
        }
        this.reset();
      }
    },
    reset() {
      //this.$refs.form.reset();
      this.$emit("close");
    }
  }
};
</script>
