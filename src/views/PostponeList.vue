<template>
  <div>
    <v-card>
      <v-card-title>
        Postpone List
      </v-card-title>
      <v-btn
        class="buttonBack"
        color="orange darken-2"
        dark
        @click="redirectToView('organizer')"
      >
        <v-icon dark left>mdi-arrow-left</v-icon>Back
      </v-btn>
      <v-data-table
        :headers="headers"
        :items="table"
        :single-select="singleSelect"
        v-model="postponedAppointments"
        class="postponeList"
      >
        <template v-slot:item.pActivate="{ item }">
          <v-icon small class="mr-2" @click="respone(item, true)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <Appointment
      ref="appointmentDialog"
      :selectedAppointment="selectedPostpone"
      :dialog="dialog"
      :newAppointment="newAppointment"
      @close="dialog = false"
      @save="deleteItem(selectedPostpone)"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Appointment from "@/components/Appointment.vue";

export default {
  components: {
    Appointment
  },
  data() {
    return {
      newAppointment: false,
      selectedAppointment: {},
      dialog: false,
      singleSelect: "",
      postpone: {},
      selectedPostpone: {},
      item: {},
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Description", value: "description" },
        { text: "Activate", value: "pActivate", sortable: false }
      ],
      postponedAppointments: []
    };
  },
  computed: {
    ...mapGetters(["getPostponeList"]),
    table() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      //this.postponedAppointments = this.getPostponeList;
      return this.getPostponeList;
    }
  },
  methods: {
    respone(selectedPostpone, newAppointment) {
      /*if (newAppointment) {
        this.selectedPostpone = {};
      } else {
        this.selectedPostpone = selectedPostpone;
      }*/
      this.selectedPostpone = selectedPostpone;
      this.newAppointment = newAppointment;
      this.$refs.appointmentDialog.initPostpone();
      this.dialog = true;
    },
    deleteItem(item) {
      this.postpone = { name: item.name, description: item.description };
      this.$store.dispatch("deletePostponeAppointment", this.postpone.name);
      //const index = this.getPostponeList.indexOf(item);
      //this.getPostponeList.splice(index, 1);
    },
    redirectToView(route) {
      this.$router.push(`/${route}`);
    }
  }
};
</script>
