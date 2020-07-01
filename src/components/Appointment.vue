<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px" id="dialog-element">
      <v-card>
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              id="name-appointment"
              v-model="appointment.name"
              autocomplete="off"
              label="Appointment Name"
              :rules="[required('Name')]"
              counter
              maxlength="15"
              outlined
              rounded
              dense
            >
            </v-text-field>
            <v-text-field
              id="description-appointment"
              v-model="appointment.description"
              autocomplete="off"
              label="Description"
              :rules="[required('Description')]"
              counter
              maxlength="30"
              outlined
              rounded
              dense
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
              outlined
              rounded
              dense
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
                  outlined
                  rounded
                  dense
                ></v-text-field>
              </template>
              <v-date-picker
                :no-title="true"
                min="2019-01-23"
                max="2020-12-31"
                v-model="appointment.date"
                @input="menu0 = false"
              ></v-date-picker>
            </v-menu>
            <v-container fluid> </v-container>
            <div id="RecurrentDIV">
              <v-radio-group v-model="active" row>
                <v-radio label="Daily:" value="daily"></v-radio>
                <v-radio label="Weekly" value="weekly"></v-radio>
                <v-radio label="Monthly" value="monthly"></v-radio>
                <v-radio label="None" value="none"></v-radio>
              </v-radio-group>
              <v-menu
                v-if="active !== 'none'"
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
                    :disabled="validated == 0"
                    outlined
                    rounded
                    dense
                  ></v-text-field>
                </template>
                <v-date-picker
                  :no-title="true"
                  min="2019-01-23"
                  max="2020-12-31"
                  v-model="appointment.endDate"
                  @input="menu3 = false"
                ></v-date-picker>
              </v-menu>
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
                  :rules="[
                    required('Start Hour'),
                    higherAgenda('Starting'),
                    lowerAgenda('Starting')
                  ]"
                  outlined
                  rounded
                  dense
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
                  outlined
                  rounded
                  dense
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
              outlined
              rounded
              chips
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
      // dialog: false,
      color: "#1976D2",
      time: null,
      menu0: false,
      menu1: false,
      menu2: false,
      menu3: false,
      valid: false,
      active: "none",
      recurrentToggle: false,
      validated: 0,
      recurrentdates: [],
      postpone: false,
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
    active(newValue) {
      if (newValue === "none") {
        this.validated = 0;
      } else if (
        newValue === "daily" ||
        newValue == "weekly" ||
        newValue == "monthly"
      ) {
        this.validated = 1;
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
          endDate: null
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
      /*console.log(
        `APPOINTMENT-> Change ${JSON.stringify(this.selectedAppointment)}`
      );*/
      return Object.assign({}, this.selectedAppointment);
    }
  },
  methods: {
    addScheduledAppointment() {
      if (this.validAgendaHours()) {
        this.generateNewId();
        //console.log("Adding Appointment" + JSON.stringify(this.appointment));
        this.$store.dispatch("addScheduledAppointment", this.appointment);
      }
    },
    updateScheduledAppointment() {
      if (this.validAgendaHours()) {
        //console.log("Updating Event" + JSON.stringify(this.appointment.id));
        this.$store.dispatch("updateScheduledAppointment", this.appointment);
      }
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
    initPostpone() {
      this.postpone = true;
      //console.log(postponeAppoitnment);
      //this.appointment.name = postponeAppoitnment.name;
      //this.appointment.description = postponeAppoitnment.description;
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
          if (this.postpone) {
            this.$emit("save");
            this.postpone = false;
          }
          this.$emit("close");
        } else {
          const objectToSend = {};
          Object.assign(objectToSend, this.appointment);
          this.$store.dispatch("updateScheduledAppointment", objectToSend);
          this.reset();
        }
        //this.reset();
      }
    },
    reset() {
      //this.$refs.form.resetValidation();
      //this.active = "none";
      this.$emit("close");
    },
    //same logis as form validation in dialog
    validAgendaHours() {
      if (this.newAppointment) {
        const value = this.appointment.startHour;
        let agenda = {};
        let msg = "Select a Agenda for this Appointment";
        if (typeof this.appointment.agendaId === "string") {
          agenda = this.agendas.find(
            agenda => agenda.agendaId === this.appointment.agendaId
          );
          msg = `${this.appointment.startHour}Starting Hour Hour must be higher than Agenda Starting hour ${agenda.start}`;
        }
        console.log(msg);
        return value && (value + "").length > 0 && value >= agenda.start;
      } else {
        return true;
      }
    },
    // Calculo de lo eventos reccurentes
    recurrentevents(sDate, eDate) {
      let startDate = new Date(sDate);
      let endDate = new Date(eDate);

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
          //Insertando todas la fechas calculadas en un array
          this.recurrentdates.push({
            date
          });
          // console.log("Fecha de fin :" + endDate);
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
          startDate = nextOccurrence;
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
          monthlyStartDate.getDate() + 28
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
        }
        ///////////////////////// Febrero 29 dias
        else if (
          this.getDaysinMonth(
            monthlyStartDate.getMonth(),
            monthlyStartDate.getFullYear()
          ) === 31 &&
          monthlyStartDate.getDate() === 31 &&
          this.getDaysinMonth(
            nextOccurrence.getMonth(),
            nextOccurrence.getFullYear()
          ) === 29
        ) {
          nextOccurrence = new Date(
            monthlyStartDate.getFullYear(),
            monthlyStartDate.getMonth(),
            monthlyStartDate.getDate() + 29
          );
        } else if (
          this.getDaysinMonth(
            monthlyStartDate.getMonth(),
            monthlyStartDate.getFullYear()
          ) === 31 &&
          monthlyStartDate.getDate() === 30 &&
          this.getDaysinMonth(
            nextOccurrence.getMonth(),
            nextOccurrence.getFullYear()
          ) === 29
        ) {
          nextOccurrence = new Date(
            monthlyStartDate.getFullYear(),
            monthlyStartDate.getMonth(),
            monthlyStartDate.getDate() + 29
          );
        } else if (
          this.getDaysinMonth(
            monthlyStartDate.getMonth(),
            monthlyStartDate.getFullYear()
          ) === 31 &&
          this.getDaysinMonth(
            nextOccurrence.getMonth(),
            nextOccurrence.getFullYear()
          ) === 29
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
          ) === 29
        ) {
          nextOccurrence = new Date(
            monthlyStartDate.getFullYear(),
            monthlyStartDate.getMonth(),
            monthlyStartDate.getDate() + 29
          );
        }
        ///////////////////// Febrero
        else if (
          this.getDaysinMonth(
            monthlyStartDate.getMonth(),
            monthlyStartDate.getFullYear()
          ) === 31 &&
          monthlyStartDate.getDate() === 31 &&
          this.getDaysinMonth(
            nextOccurrence.getMonth(),
            nextOccurrence.getFullYear()
          ) === 28
        ) {
          nextOccurrence = new Date(
            monthlyStartDate.getFullYear(),
            monthlyStartDate.getMonth(),
            monthlyStartDate.getDate() + 28
          );
        } else if (
          this.getDaysinMonth(
            monthlyStartDate.getMonth(),
            monthlyStartDate.getFullYear()
          ) === 31 &&
          monthlyStartDate.getDate() === 30 &&
          this.getDaysinMonth(
            nextOccurrence.getMonth(),
            nextOccurrence.getFullYear()
          ) === 28
        ) {
          nextOccurrence = new Date(
            monthlyStartDate.getFullYear(),
            monthlyStartDate.getMonth(),
            monthlyStartDate.getDate() + 29
          );
        } else if (
          this.getDaysinMonth(
            monthlyStartDate.getMonth(),
            monthlyStartDate.getFullYear()
          ) === 31 &&
          monthlyStartDate.getDate() === 29 &&
          this.getDaysinMonth(
            nextOccurrence.getMonth(),
            nextOccurrence.getFullYear()
          ) === 28
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
          ) === 28
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
          ) === 28
        ) {
          nextOccurrence = new Date(
            monthlyStartDate.getFullYear(),
            monthlyStartDate.getMonth(),
            monthlyStartDate.getDate() + 28
          );
        }
        //////////////////////
        else if (
          this.getDaysinMonth(
            monthlyStartDate.getMonth(),
            monthlyStartDate.getFullYear()
          ) === 31 &&
          monthlyStartDate.getDate() === 31 &&
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
              monthlyStartDate.getDate() === 31 &&
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
              monthlyStartDate.getDate() === 31 &&
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
            }
            ///////////// Febrero 29 dias
            else if (
              this.getDaysinMonth(
                monthlyStartDate.getMonth(),
                monthlyStartDate.getFullYear()
              ) === 31 &&
              monthlyStartDate.getDate() === 31 &&
              this.getDaysinMonth(
                nextOccurrence.getMonth(),
                nextOccurrence.getFullYear()
              ) === 29
            ) {
              nextOccurrence = new Date(
                monthlyStartDate.getFullYear(),
                monthlyStartDate.getMonth(),
                monthlyStartDate.getDate() + 29
              );
            } else if (
              this.getDaysinMonth(
                monthlyStartDate.getMonth(),
                monthlyStartDate.getFullYear()
              ) === 31 &&
              monthlyStartDate.getDate() === 30 &&
              this.getDaysinMonth(
                nextOccurrence.getMonth(),
                nextOccurrence.getFullYear()
              ) === 29
            ) {
              nextOccurrence = new Date(
                monthlyStartDate.getFullYear(),
                monthlyStartDate.getMonth(),
                monthlyStartDate.getDate() + 29
              );
            } else if (
              this.getDaysinMonth(
                monthlyStartDate.getMonth(),
                monthlyStartDate.getFullYear()
              ) === 29 &&
              previousOccurence.getDate() === 31
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
              ) === 29 &&
              previousOccurence.getDate() === 30
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
              ) === 29
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
              ) === 29
            ) {
              nextOccurrence = new Date(
                monthlyStartDate.getFullYear(),
                monthlyStartDate.getMonth(),
                monthlyStartDate.getDate() + 29
              );
            }
            /////////////////  Febrero
            else if (
              this.getDaysinMonth(
                monthlyStartDate.getMonth(),
                monthlyStartDate.getFullYear()
              ) === 28 &&
              previousOccurence.getDate() === 31
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
              ) === 28 &&
              previousOccurence.getDate() === 30
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
              ) === 28 &&
              previousOccurence.getDate() === 29
            ) {
              nextOccurrence = new Date(
                monthlyStartDate.getFullYear(),
                monthlyStartDate.getMonth(),
                monthlyStartDate.getDate() + 29
              );
            } else if (
              this.getDaysinMonth(
                monthlyStartDate.getMonth(),
                monthlyStartDate.getFullYear()
              ) === 31 &&
              monthlyStartDate.getDate() === 31 &&
              this.getDaysinMonth(
                nextOccurrence.getMonth(),
                nextOccurrence.getFullYear()
              ) === 28
            ) {
              nextOccurrence = new Date(
                monthlyStartDate.getFullYear(),
                monthlyStartDate.getMonth(),
                monthlyStartDate.getDate() + 28
              );
            } else if (
              this.getDaysinMonth(
                monthlyStartDate.getMonth(),
                monthlyStartDate.getFullYear()
              ) === 31 &&
              monthlyStartDate.getDate() === 30 &&
              this.getDaysinMonth(
                nextOccurrence.getMonth(),
                nextOccurrence.getFullYear()
              ) === 28
            ) {
              nextOccurrence = new Date(
                monthlyStartDate.getFullYear(),
                monthlyStartDate.getMonth(),
                monthlyStartDate.getDate() + 29
              );
            } else if (
              this.getDaysinMonth(
                monthlyStartDate.getMonth(),
                monthlyStartDate.getFullYear()
              ) === 31 &&
              monthlyStartDate.getDate() === 29 &&
              this.getDaysinMonth(
                nextOccurrence.getMonth(),
                nextOccurrence.getFullYear()
              ) === 28
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
              ) === 28
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
              ) === 28
            ) {
              nextOccurrence = new Date(
                monthlyStartDate.getFullYear(),
                monthlyStartDate.getMonth(),
                monthlyStartDate.getDate() + 28
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
      this.recurrentevents(this.appointment.date, this.appointment.endDate);
      if (
        this.recurrentdates === undefined ||
        this.recurrentdates.length == 0
      ) {
        console.log("No hay datos");
      } else {
        this.recurrentdates.forEach(element => {
          console.log("Fechas" + element.date);
          this.appointment.date = element.date; // Asigno a cada appoint su fecha correspondiente
          this.dispatchAction();
        });
      }
      //this.reset();
    },
    getDaysinMonth(month, year) {
      return new Date(year, month + 1, 0).getDate();
    }
  }
};
</script>
