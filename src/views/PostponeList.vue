<template>
  <v-card>
    <v-card-title>
      Postpone List
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="postponedAppointments"
      v-model="table"
      class="postponeList"
    ></v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Description", value: "description" },
        { text: "Activate", value: "pActivate" }
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
  }
};
</script>
