<template>
  <div>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
      class="dialog-element"
    >
      <v-card>
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              id="name-appointment"
              v-model="appointment.name"
              autocomplete="off"
              label="Appointment Name"
              :rules="[required('Name')]"
            >
            </v-text-field>
            <v-text-field
              id="description-appointment"
              v-model="appointment.description"
              autocomplete="off"
              label="Description"
              :rules="[required('Description')]"
            >
            </v-text-field>
            <v-select
              id="agenda-appointment"
              v-model="appointment.agendaId"
              :items="agendas"
              item-text="name"
              item-value="agendaId"
              label="Choose an Agenda"
              :rules="[required('Agenda')]"
            ></v-select>
            <v-menu
              class="menu-date"
              v-model="menu0"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="200px"
            >
              <template v-slot:activator="{ on, attrs }" class="template-date">
                <v-text-field
                  id="date-appointment"
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
            <v-container fluid>
              <v-switch
                :label="`Recurrent: ${recurrentToggle}`"
                v-model="recurrentToggle"
              ></v-switch>
            </v-container>
            <div id="RecurrentDIV">
              <v-menu
                v-model="menu3"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="200px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    append-icon="event"
                    v-model="appointment.endDate"
                    label="End Date"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  :no-title="true"
                  min="2020-06-23"
                  max="2020-12-31"
                  v-model="appointment.endDate"
                  @input="menu3 = false"
                ></v-date-picker>
              </v-menu>
              <v-radio-group v-model="active" row>
                <v-radio label="Daily:" value="daily"></v-radio>
                <v-radio label="Weekly" value="weekly"></v-radio>
                <v-radio label="Monthly" value="monthly"></v-radio>
              </v-radio-group>
            </div>
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
                  id="start-appointment"
                  v-model="appointment.startHour"
                  append-icon="access_time"
                  label="Starting Hour"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :rules="[]"
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
                  id="end-appointment"
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
              :items="participants"
              item-text="name"
              item-value="participantId"
              multiple
              append-icon="mdi-plus"
              label="Select participants"
            ></v-select>
            <v-btn
              id="btn-close"
              color="primary"
              class="mr-4"
              @click.stop="reset"
              >CLOSE
            </v-btn>
            <v-btn
              id="btn-save-update"
              color="primary"
              class="mr-4"
              @click.stop="
                dispatchAction();
                addRecurrentEvents();
              "
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
      menu3: false,
      valid: false,
      active: 0,
      recurrentToggle: false,
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
  watch: {
    recurrentToggle(newValue) {
      var x = document.getElementById("RecurrentDIV");
      if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = "block";
      }
      console.log(newValue);
    }
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
          participants: [],
          recurrentdates: []
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
          //console.log("New appointment" + this.naddRecurrentEventsewAppointment)
          this.generateNewId();
          const objectToSend = {};
          Object.assign(objectToSend, this.appointment);
          this.$store.dispatch("addScheduledAppointment", objectToSend);
          // console.log("sending appointment");
        } else {
          this.$store.dispatch("updateScheduledAppointment", this.appointment);
        }
        this.reset();
      }
    },
    reset() {
      this.$refs.form.reset();
      this.$emit("close");
    },
    // Calculo de lo eventos reccurentes
    recurrentevents() {
      let startDate = new Date(this.appointment.date);
      let endDate = new Date(this.appointment.endDate);

      // Evento recurrente diario
      if (this.active === "daily") {
        this.recurrentdates = [];
        let nextOccurrence = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() + 1
        );
        while (endDate.getTime() >= nextOccurrence.getTime()) {
          startDate = nextOccurrence;
          nextOccurrence = new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate() + 1
          );
          let date = nextOccurrence.toISOString().substr(0, 10);
          console.log("Fecha del siguiente appointment: " + date);
          //Insertando todas la fechas calculadas en un array
          this.recurrentdates.push({
            date
          });
          console.log("Fecha de fin :" + endDate);
        }
        // Evento recurrente semanal
      } else if (this.active === "weekly") {
        let weeklyEndDate = new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate() + 1
        );
        this.recurrentdates = [];
        let nextOccurrence = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() + 8
        );
        while (weeklyEndDate.getTime() >= nextOccurrence.getTime()) {
          console.log("Fecha Inicial----" + startDate);
          startDate = nextOccurrence;
          console.log("Fecha del siguiente appointment: " + nextOccurrence);
          if (nextOccurrence.getTime() > weeklyEndDate.getTime()) {
            console.log("La fecha sobrepasa la fecha limite");
          } else {
            let date = nextOccurrence.toISOString().substr(0, 10);
            this.recurrentdates.push({
              date
            });
            console.log("Fecha de fin :" + weeklyEndDate);
            console.log("Fecha del siguiente appointment formato ISO: " + date);
          }
          nextOccurrence = new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate() + 7
          );
        }
        // Evento recurrente mensual
      } else if (this.active === "monthly") {
        let monthlyStartDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() + 1
        );
        let nextOccurrence = new Date(
          monthlyStartDate.getFullYear(),
          monthlyStartDate.getMonth(),
          monthlyStartDate.getDate() + 30
        );
        let monthlyEndDate = new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate() + 1
        );
        this.recurrentdates = [];
        if (
          this.getDaysinMonth(
            monthlyStartDate.getMonth(),
            monthlyStartDate.getFullYear()
          ) === 31 &&
          monthlyStartDate.getDate() == 31 &&
          this.getDaysinMonth(
            nextOccurrence.getMonth(),
            nextOccurrence.getFullYear()
          ) === 31
        ) {
          nextOccurrence = new Date(
            monthlyStartDate.getFullYear(),
            monthlyStartDate.getMonth(),
            monthlyStartDate.getDate() + 31
          );
        } else if (
          this.getDaysinMonth(
            monthlyStartDate.getMonth(),
            monthlyStartDate.getFullYear()
          ) === 31 &&
          monthlyStartDate.getDate() == 31 &&
          this.getDaysinMonth(
            nextOccurrence.getMonth(),
            nextOccurrence.getFullYear()
          ) === 30
        ) {
          nextOccurrence = new Date(
            monthlyStartDate.getFullYear(),
            monthlyStartDate.getMonth(),
            monthlyStartDate.getDate() + 30
          );
        } else if (
          this.getDaysinMonth(
            monthlyStartDate.getMonth(),
            monthlyStartDate.getFullYear()
          ) === 31 &&
          this.getDaysinMonth(
            nextOccurrence.getMonth(),
            nextOccurrence.getFullYear()
          ) === 30
        ) {
          nextOccurrence = new Date(
            monthlyStartDate.getFullYear(),
            monthlyStartDate.getMonth(),
            monthlyStartDate.getDate() + 31
          );
        } else {
          nextOccurrence = new Date(
            monthlyStartDate.getFullYear(),
            monthlyStartDate.getMonth(),
            monthlyStartDate.getDate() + 30
          );
        }
        while (monthlyEndDate.getTime() >= nextOccurrence.getTime()) {
          console.log("Fecha Inicial----" + monthlyStartDate);
          let previousOccurence = monthlyStartDate;
          monthlyStartDate = nextOccurrence;
          console.log("Fecha del siguiente appointment: " + nextOccurrence);
          if (nextOccurrence.getTime() > monthlyEndDate.getTime()) {
            console.log("La fecha sobrepasa la fecha limite");
          } else {
            let date = nextOccurrence.toISOString().substr(0, 10);
            this.recurrentdates.push({
              date
            });
            console.log("Fecha del siguiente appointment formato ISO: " + date);
            console.log("Fecha de fin :" + monthlyEndDate);
            nextOccurrence = new Date(
              monthlyStartDate.getFullYear(),
              monthlyStartDate.getMonth(),
              monthlyStartDate.getDate() + 30
            );
            if (
              this.getDaysinMonth(
                monthlyStartDate.getMonth(),
                monthlyStartDate.getFullYear()
              ) === 31 &&
              monthlyStartDate.getDate() == 31 &&
              this.getDaysinMonth(
                nextOccurrence.getMonth(),
                nextOccurrence.getFullYear()
              ) === 31
            ) {
              nextOccurrence = new Date(
                monthlyStartDate.getFullYear(),
                monthlyStartDate.getMonth(),
                monthlyStartDate.getDate() + 31
              );
            } else if (
              this.getDaysinMonth(
                monthlyStartDate.getMonth(),
                monthlyStartDate.getFullYear()
              ) === 31 &&
              monthlyStartDate.getDate() == 31 &&
              this.getDaysinMonth(
                nextOccurrence.getMonth(),
                nextOccurrence.getFullYear()
              ) === 30
            ) {
              nextOccurrence = new Date(
                monthlyStartDate.getFullYear(),
                monthlyStartDate.getMonth(),
                monthlyStartDate.getDate() + 30
              );
            } else if (
              this.getDaysinMonth(
                monthlyStartDate.getMonth(),
                monthlyStartDate.getFullYear()
              ) === 31 &&
              this.getDaysinMonth(
                nextOccurrence.getMonth(),
                nextOccurrence.getFullYear()
              ) === 30
            ) {
              nextOccurrence = new Date(
                monthlyStartDate.getFullYear(),
                monthlyStartDate.getMonth(),
                monthlyStartDate.getDate() + 31
              );
            } else if (
              this.getDaysinMonth(
                monthlyStartDate.getMonth(),
                monthlyStartDate.getFullYear()
              ) === 30 &&
              previousOccurence.getDate() === 31 &&
              this.getDaysinMonth(
                nextOccurrence.getMonth(),
                nextOccurrence.getFullYear()
              ) === 31
            ) {
              nextOccurrence = new Date(
                monthlyStartDate.getFullYear(),
                monthlyStartDate.getMonth(),
                monthlyStartDate.getDate() + 31
              );
            } else {
              nextOccurrence = new Date(
                monthlyStartDate.getFullYear(),
                monthlyStartDate.getMonth(),
                monthlyStartDate.getDate() + 30
              );
            }
          }
        }
      }
    },
    //Por cada fecha que hay en el array creo un appointment
    addRecurrentEvents() {
      this.recurrentevents();
      this.recurrentdates.forEach(element => {
        console.log("Fechas" + element.date);
        this.appointment.date = element.date; // Asigno a cada appoint su fecha correspondiente
        this.dispatchAction();
      });
    },
    getDaysinMonth(month, year) {
      return new Date(year, month + 1, 0).getDate();
    }
  },

  mounted() {
    // this.initializeData();
  }
};
</script>
