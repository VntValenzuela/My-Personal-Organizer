<template>
  <v-dialog v-model="show" persistent max-width="645px">
    <v-card>
      <v-col cols="12">
        <v-text-field v-model="name" label="Name" required></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="description"
          label="Description"
          required
        ></v-text-field>
      </v-col>
      <v-row justify="center" v-if="this.appointments.length == 0">
        <v-col>
          <div class="grey--text" text-xs-center>Start</div>
          <v-time-picker v-model="start"></v-time-picker>
        </v-col>
        <v-col>
          <div class="grey--text" text-xs-center>Start</div>
          <v-time-picker v-model="end"></v-time-picker>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click.stop="show = false"
          >Cancel</v-btn
        >
        <v-btn
          color="blue darken-1"
          text
          @click.stop="updaagenda(), (show = false)"
          >Update</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "updateAgenda",
  props: {
    value: Boolean
  },
  data() {
    return {
      agenda: "",
      name: "",
      description: "",
      start: "",
      end: "",
      appointments: ""
    };
  },
  methods: {
    updaagenda() {
      this.$emit("updaagenda", {
        agenda: {
          name: this.name,
          description: this.description,
          start: this.start,
          end: this.end,
          appointments: this.appointments
        },
        name: this.agenda.name
      });
      this.agenda = null;
    },
    closeDialog() {
      this.$emit("close-update");
    },
    setAgenda(agenda) {
      this.agenda = agenda;
      this.name = agenda.name;
      this.description = agenda.description;
      this.start = agenda.start;
      this.end = agenda.end;
      this.appointments = agenda.appointments;
    }
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>
