<template>
  <div class="agendas">
    <v-container class="my-10" grid-list-md>
      <v-row>
        <h1 id="title">AGENDAS</h1>
        <v-spacer />
        <router-link
          :to="{
            name: 'Organizer'
          }"
          style="text-decoration: none"
        >
          <v-btn large
            >CALENDARY
            <v-icon>mdi-calendar-month</v-icon>
          </v-btn>
        </router-link>
        <v-spacer />
        <v-btn
          large
          id="create"
          class="ma-2"
          color="blue"
          @click.stop="dialogCreate = true"
        >
          NEW AGENDA
          <v-icon color="white">mdi-plus</v-icon>
        </v-btn>
        <v-spacer />
        <v-btn
          id="redirectToParticipants"
          class="ma-2"
          color="#CD853F"
          dark
          large
          @click.stop="redirectToParticipant()"
        >
          Participants
          <v-icon light :size="30">mdi-account-circle</v-icon>
        </v-btn>
      </v-row>
      <br />
      <br />
      <v-layout row wrap>
        <v-flex
          xs12
          sm6
          md4
          lg3
          v-for="(agenda, index) in agendas"
          :key="index"
        >
          <v-card
            id="update"
            :style="{ backgroundColor: agenda.color }"
            class="mx-auto"
            max-width="250"
            @click.stop="openUpdateDeleteDialog(agenda)"
          >
            <v-card-title>
              <div
                class="subheading"
                :style="{ color: getContrastYIQ(agenda.color) }"
              >
                {{ agenda.name }}
              </div>
            </v-card-title>
            <v-card-subtitle>
              <div :style="{ color: getContrastYIQ(agenda.color) }">
                {{ agenda.description }}
              </div>
            </v-card-subtitle>
            <v-card-text>
              <div :style="{ color: getContrastYIQ(agenda.color) }">
                {{ agenda.start }} - {{ agenda.end }}
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <createAgendaDialog
      ref="createDialog"
      v-model="dialogCreate"
      @creaagenda="creaagenda"
    />
    <updateDeleteAgendaDialog
      ref="updateDeleteDialog"
      v-model="dialogUpdateDelete"
      @updaagenda="updaagenda"
      @deleagenda="deleagenda"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import updateDeleteAgendaDialog from "../components/UpdateDeleteAgenda.vue";
import createAgendaDialog from "../components/CreateAgenda.vue";

export default {
  name: "Agendas",
  components: {
    createAgendaDialog,
    updateDeleteAgendaDialog
  },
  data() {
    return {
      dialogCreate: false,
      dialogUpdateDelete: false
    };
  },
  computed: {
    ...mapGetters(["getAgendas", "getScheduledAppointments"]),
    agendas() {
      return this.getAgendas;
    },
    scheduledAppointments() {
      return this.getScheduledAppointments;
    }
  },
  methods: {
    ...mapActions(["createAgenda", "updateAgenda", "deleteAgenda"]),
    creaagenda(agenda) {
      const foudAgendatIndex = this.agendas.findIndex(
        agendaFind => agendaFind.name === agenda.name
      );
      if (this.agendas[foudAgendatIndex] == null) {
        agenda.agendaId =
          "A-" +
          (Number(
            this.agendas[this.agendas.length - 1].agendaId.split("-")[1]
          ) +
            1);
        this.createAgenda(agenda);
      } else {
        alert("Yout can't repeate a name");
      }
    },
    updaagenda(agendaNew) {
      const foudAgendatIndex = this.agendas.findIndex(
        agendaFind =>
          agendaFind.name === agendaNew.name &&
          agendaFind.agendaId !== agendaNew.agendaId
      );
      if (this.agendas[foudAgendatIndex] == null) {
        this.updateAgenda(agendaNew);
      } else {
        alert("Yout can't repeate a name");
      }
    },
    deleagenda(agendaId) {
      this.deleteAgenda(agendaId);
    },
    closeCreate() {
      this.dialogDelete = false;
    },
    closeUpdate() {
      this.dialogDelete = false;
    },
    openUpdateDeleteDialog(agenda) {
      agenda.appointments = this.getA(agenda.agendaId);
      this.$refs.updateDeleteDialog.setAgenda(agenda);
      this.dialogUpdateDelete = true;
    },
    redirectToParticipant() {
      this.$router.push("participant");
    },
    getContrastYIQ(hexcolor) {
      hexcolor = hexcolor.slice(1);
      var r = parseInt(hexcolor.substr(0, 2), 16);
      var g = parseInt(hexcolor.substr(2, 2), 16);
      var b = parseInt(hexcolor.substr(4, 2), 16);
      var yiq = (r * 299 + g * 587 + b * 114) / 1000;
      return yiq >= 128 ? "black" : "white";
    },
    getA(agendaId) {
      return this.scheduledAppointments.filter(
        scheduledAppointment => scheduledAppointment.agendaId == agendaId
      );
    }
  }
};
</script>
