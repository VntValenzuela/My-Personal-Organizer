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
          <v-btn large>CALENDARY</v-btn>
        </router-link>
        <v-spacer />
        <v-btn large id="create" color="blue" @click.stop="dialogCreate = true">
          NEW AGENDA
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
    ...mapGetters(["getAgendas"]),
    agendas() {
      return this.getAgendas;
    }
  },
  methods: {
    ...mapActions(["createAgenda", "updateAgenda", "deleteAgenda"]),
    creaagenda(agenda) {
      this.createAgenda(agenda);
    },
    updaagenda(agenda) {
      this.updateAgenda(agenda);
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
      this.$refs.updateDeleteDialog.setAgenda(agenda);
      this.dialogUpdateDelete = true;
    },
    getContrastYIQ(hexcolor) {
      hexcolor = hexcolor.slice(1);
      var r = parseInt(hexcolor.substr(0, 2), 16);
      var g = parseInt(hexcolor.substr(2, 2), 16);
      var b = parseInt(hexcolor.substr(4, 2), 16);
      var yiq = (r * 299 + g * 587 + b * 114) / 1000;
      return yiq >= 128 ? "black" : "white";
    }
  }
};
</script>
