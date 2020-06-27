<template>
  <v-dialog v-model="show" persistent max-width="560px">
    <v-card>
      <v-col cols="12">
        <v-text-field
          v-model="name"
          outlined=""
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="description"
          outlined=""
          label="Description"
          required
        ></v-text-field>
      </v-col>
      <v-row justify="center" align="center">
        <v-spacer />
        <v-time-picker
          color="blue-grey"
          v-model="start"
          width="220"
          ampm-in-title=""
          :disabled="this.appointments.length != 0"
          >Start</v-time-picker
        >
        <v-spacer />
        <v-time-picker
          color="blue-grey"
          v-model="end"
          width="220"
          ampm-in-title=""
          :disabled="this.appointments.length != 0"
          >End</v-time-picker
        >
        <v-spacer />
      </v-row>
      <v-spacer />
      <v-card-actions>
        <v-btn color="gray darken-1" @click.stop="show = false">CANCEL</v-btn>
        <v-spacer />
        <v-btn color="blue darken-1" @click.stop="updaagenda()">UPDATE</v-btn>
        <v-spacer />
        <v-btn
          color="red darken-1"
          :disabled="this.appointments.length != 0"
          @click.stop="deleagenda()"
          >DELETE</v-btn
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
      agendaId: "",
      name: "",
      description: "",
      start: "",
      end: "",
      color: "",
      appointments: ""
    };
  },
  methods: {
    updaagenda() {
      if (this.name !== "") {
        if (this.description !== "") {
          if (this.start !== this.end) {
            this.$emit("updaagenda", {
              agendaId: this.agendaId,
              name: this.name,
              description: this.description,
              start: this.start,
              end: this.end,
              color: this.color,
              appointments: this.appointments
            });
            this.show = false;
          } else {
            alert("Hour range is 0");
          }
        } else {
          alert("Description can't be empty");
        }
      } else {
        alert("Name can't be empty");
      }
    },
    deleagenda() {
      this.$emit("deleagenda", this.agendaId);
      this.show = false;
    },
    closeDialog() {
      this.$emit("close-update");
    },
    setAgenda(agenda) {
      this.agendaId = agenda.agendaId;
      this.name = agenda.name;
      this.description = agenda.description;
      this.start = agenda.start;
      this.end = agenda.end;
      this.color = agenda.color;
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
