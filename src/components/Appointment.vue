<template>
  <div>
    <v-btn color="primary" class="mr-4" @click="dialog = true" dark>
      New Event
    </v-btn>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-container>
          <v-form @submit.prevent="addEvent">
            <v-text-field
              v-model="appointment.name"
              type="text"
              label="event name (required)"
            >
            </v-text-field>
            <v-text-field
              v-model="appointment.details"
              type="text"
              label="detail"
            >
            </v-text-field>
            <v-text-field
              v-model="appointment.startHour"
              type="date"
              label="start(required)"
            >
            </v-text-field>
            <v-text-field
              v-model="appointment.endHour"
              type="date"
              label="end (required)"
            >
            </v-text-field>
            <v-text-field
              v-model="color"
              type="color"
              label="color (click to opend color menu)"
            >
            </v-text-field>
            <v-btn
              type="submit"
              color="primary"
              class="mr-4"
              @click.stop="dialog = false"
            >
              Create Event
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Appointment",
  data() {
    return {
      dialog: false,
      appointment: {
        name: null,
        description: null,
        date: null,
        startHour: null,
        endHour: null,
        participants: []
      },
      color: "#1976D2"
    };
  },
  methods: {
    save() {
      this.$store.dispatch("addScheduledAppointment", this.appointment);
    }
  },
  computed: {
    ...mapGetters(["getScheduledAppointments"]),
    appointments() {
      return this.getScheduledAppointments;
    }
  }
};
</script>
