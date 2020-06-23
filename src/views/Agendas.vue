<template>
  <div class="agendas">
    <v-container class="my-10" grid-list-md>
      <h1 id="title">AGENDAS</h1>
      <br />
      <v-btn id="create" color="blue" @click.stop="dialogCreate = true"
        >CREATE</v-btn
      >
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
          <v-card class="mx-auto" max-width="250">
            <router-link
              :to="{
                name: 'Calendary',
                params: { id: agenda.name }
              }"
            >
              <v-card-title>
                <div class="subheading">{{ agenda.name }}</div>
              </v-card-title>
              <v-card-subtitle>
                <div class="grey--text">{{ agenda.description }}</div>
              </v-card-subtitle>
              <v-card-text>
                <div class="grey--text">
                  {{ agenda.start }} - {{ agenda.end }}
                </div>
              </v-card-text>
            </router-link>
            <v-container center>
              <v-btn
                id="update"
                color="blue"
                @click.stop="
                  openUpdateDialog(agenda);
                  dialogUpdate = true;
                "
                >Update</v-btn
              >
              <v-btn
                id="delete"
                color="red"
                v-if="agenda.appointments.length == 0"
                @click.stop="openDeleteDialog(agenda)"
                >Detele</v-btn
              >
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <createAgendaDialog
      ref="createDialog"
      v-model="dialogCreate"
      @creaagenda="creaagenda"
    />
    <updateAgendaDialog
      ref="updateDialog"
      v-model="dialogUpdate"
      @updaagenda="updaagenda"
    />
    <deleteAgendaDialog
      ref="deleteDialog"
      v-model="dialogDelete"
      @deleagenda="deleagenda"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import deleteAgendaDialog from "../components/DeleteAgenda.vue";
import updateAgendaDialog from "../components/UpdateAgenda.vue";
import createAgendaDialog from "../components/CreateAgenda.vue";

export default {
  name: "Agendas",
  components: {
    createAgendaDialog,
    updateAgendaDialog,
    deleteAgendaDialog
  },
  data() {
    return {
      dialogCreate: false,
      dialogDelete: false,
      dialogUpdate: false
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
    updaagenda(agendaName) {
      this.updateAgenda(agendaName);
    },
    deleagenda(name) {
      this.deleteAgenda(name);
    },
    closeCreate() {
      this.dialogDelete = false;
    },
    closeUpdate() {
      this.dialogDelete = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    openUpdateDialog(agenda) {
      this.$refs.updateDialog.setAgenda(agenda);
    },
    openDeleteDialog(agenda) {
      this.$refs.deleteDialog.setName(agenda.name);
      this.dialogDelete = true;
    }
  }
};
</script>
