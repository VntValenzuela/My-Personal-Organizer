<template>
  <v-card>
    <v-card-title>
      Postpone List
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="postponedAppointments"
      :single-select="singleSelect"
      v-model="table"
      class="postponeList"
    >
      <template v-slot:item.pActivate="{ item }">
        <v-icon small class="mr-2" @click="Respone(selectedEvent, true, item)">
          mdi-pencil
        </v-icon>
        <Appointment
          :selectedAppointment="selectedAppointment"
          :dialog="dialog"
          :newAppointment="newAppointment"
          @close="dialog = false"
          @save="deleteItem(item)"
        />

        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
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
      selectedEvent: {},
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
      this.postponedAppointments = this.getPostponeList;
      return this.getPostponeList;
    }
  },
  methods: {
    Respone(selectedAppointment, newAppointment, item) {
      if (newAppointment) {
        this.selectedAppointment = {};
      } else {
        this.selectedAppointment = selectedAppointment;
        this.deleteItem(item);
      }
      this.newAppointment = newAppointment;
      this.dialog = true;
    },
    deleteItem(item) {
      this.postpone = { name: item.name, description: item.description };
      this.$store.dispatch("deletePostponeAppointment", this.postpone);
      const index = this.getPostponeList.indexOf(item);
      this.getPostponeList.splice(index, 1);
      console.log("tamaño: " + this.getPostponeList.length);
    }
  }
};
</script>
