<template>
  <v-dialog v-model="show" persistent max-width="560px">
    <v-card>
      <v-row>
        <v-col justify="center">
          <v-sheet class="pa-3">
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
          </v-sheet>
          <v-row>
            <v-spacer />
            <v-time-picker
              color="blue-grey"
              v-model="start"
              width="200"
              ampm-in-title=""
              >Start</v-time-picker
            >
            <v-spacer />
            <v-time-picker
              color="blue-grey"
              v-model="end"
              width="200"
              ampm-in-title=""
              >End</v-time-picker
            >
            <v-spacer />
          </v-row>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-btn @click.stop="closeDialog()">Cancel</v-btn>
        <v-spacer />
        <v-btn color="blue darken-1" @click.stop="creaagenda()">Create</v-btn>
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
      if (this.name !== "") {
        if (this.description !== "") {
          if (this.start !== "") {
            if (this.end !== "") {
              if (this.start < this.end) {
                this.$emit("creaagenda", {
                  agendaId: "",
                  name: this.name,
                  description: this.description,
                  start: this.start,
                  end: this.end,
                  color: this.getRandomColor(),
                  appointments: []
                });
                this.closeDialog();
              } else {
                alert("Hour range invalide");
              }
            } else {
              alert("End time can't be empty");
            }
          } else {
            alert("Start time can't be empty");
          }
        } else {
          alert("Description can't be empty");
        }
      } else {
        alert("Name can't be empty");
      }
    },
    closeDialog() {
      this.$emit("close-create");
      this.name = "";
      this.description = "";
      this.start = "";
      this.end = "";
      this.show = false;
    },
    getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
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
