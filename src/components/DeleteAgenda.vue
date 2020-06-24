<template>
  <v-dialog v-model="show" persistent max-width="230px">
    <v-card>
      <v-card-title>
        <span class="headline">Are you sure?</span>
      </v-card-title>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click.stop="show = false"
          >Cancel</v-btn
        >
        <v-btn
          color="blue darken-1"
          text
          @click.stop="deleagenda(), (show = false)"
          >Yes</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "deleteAgenda",
  props: {
    value: Boolean
  },
  data() {
    return {
      name: ""
    };
  },
  methods: {
    deleagenda() {
      this.$emit("deleagenda", this.name);
      this.name = "";
    },
    closeDialog() {
      this.$emit("close-delete");
    },
    setName(name) {
      this.name = name;
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
