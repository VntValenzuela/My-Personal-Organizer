<template>
  <v-dialog v-model="show" persistent max-width="550px">
    <v-card>
      <v-col cols="12">
        <v-text-field v-model="name" label="Name" required></v-text-field>
        <v-text-field
          v-model="description"
          label="Description"
          required
        ></v-text-field>
      </v-col>
      <v-container text-xs-center>
        <v-row>
          <v-col>
            <v-time-picker v-model="start" width="220">Start</v-time-picker>
          </v-col>
          <v-col>
            <v-time-picker v-model="end" width="220">End</v-time-picker>
          </v-col>
        </v-row>
      </v-container>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click.stop="show = false"
          >Cancel</v-btn
        >
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click.stop="creaagenda(), (show = false)"
          >Create</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "createAgenda",
  props: {
    value: Boolean
  },
  data() {
    return {
      name: "",
      description: "",
      start: "",
      end: ""
    };
  },
  methods: {
    creaagenda() {
      this.$emit("creaagenda", {
        agendaId: "",
        name: this.name,
        description: this.description,
        start: this.start,
        end: this.end,
        color: "",
        appointments: []
      });
    },
    closeDialog() {
      this.$emit("close-create");
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
