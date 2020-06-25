<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Participant",
  data() {
    return {
      name: String,
      contactNumber: Number,
      upcomingAppointments: Array
    };
  },
  computed: {
    ...mapGetters(["getParticipants"]),
    participantList() {
      return this.getParticipants;
    }
  },
  methods: {
    ...mapActions(["registerParticipant"]),
    ...mapActions(["updateParticipant"]),
    ...mapActions(["deleteParticipant"]),
    _registerParticipant() {
      if (this.validateData()) {
        alert("All fields must be filled.");
      } else {
        var existingName = false;
        this.participantList.forEach(participant => {
          if (participant.name === this.name) {
            existingName = true;
            alert(
              "This participant's name already exists!. Please introduce another one."
            );
          }
        });
        if (!existingName) {
          this.registerParticipant({
            name: this.name,
            contactNumber: this.contactNumber,
            upcomingAppointments: []
          });
        }
      }
    },
    _updateParticipant() {
      if (this.contactNumber < 1000000) {
        alert("The contact number must contain at least 7 digits.");
      } else {
        this.participantList.forEach(participant => {
          if (participant.name === this.name) {
            this.updateParticipant({
              name: this.name,
              contactNumber: this.contactNumber,
              upcomingAppointments: []
            });
          }
        });
      }
    },
    _deleteParticipant() {
      this.participantList.forEach(participant => {
        if (participant.name === this.name) {
          if (participant.upcomingAppointments.length === 0) {
            this.deleteParticipant(participant);
          } else {
            alert(
              "The participant has upcoming appointments, it can't be removed."
            );
          }
        }
      });
    },
    validateData() {
      if (this.name === "" || this.contactNumber < 1000000) {
        return;
      }
    }
  }
};
</script>
