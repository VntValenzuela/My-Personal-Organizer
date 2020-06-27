<template>
  <div>
    <v-dialog v-model="dialogRegister" max-width="645px">
      <v-card>
        <v-col cols="12">
          <v-text-field
            v-model="name"
            counter
            maxlength="40"
            label="Name"
          ></v-text-field>
          <v-text-field
            v-model="contactNumber"
            counter="8"
            label="Contact Number"
          ></v-text-field>
          <v-select v-model="gender" :items="genders" label="Gender"></v-select>
        </v-col>
        <v-card-actions>
          <v-btn
            class="ma-2"
            outlined
            color="#4682B4"
            @click.stop="cancelDelete()"
            >Cancel</v-btn
          >
          <v-btn
            class="ma-2"
            outlined
            color="#4682B4"
            @click.stop="_registerParticipant()"
            >Register</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogUpdate" max-width="645px">
      <v-card>
        <v-col cols="12">
          <v-text-field
            v-model="name"
            counter
            maxlength="40"
            label="New Name"
          ></v-text-field>
          <v-text-field
            v-model="contactNumber"
            counter="8"
            label="New Contact Number"
          ></v-text-field>
          <v-select
            v-model="gender"
            :items="genders"
            required
            label="Gender"
          ></v-select>
        </v-col>
        <v-card-actions>
          <v-btn
            class="ma-2"
            outlined
            color="#4682B4"
            @click.stop="cancelUpdate()"
            >Cancel</v-btn
          >
          <v-btn
            class="ma-2"
            outlined
            color="#4682B4"
            @click.stop="_updateParticipant()"
            >Update</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title> Please, confirm to delete the participant</v-card-title>
        <v-card-actions>
          <v-btn
            class="ma-2"
            outlined
            color="#4682B4"
            @click.stop="cancelDelete()"
            >Cancel</v-btn
          >
          <v-btn
            class="ma-2"
            outlined
            color="#4682B4"
            @click.stop="_deleteParticipant()"
            >Confirm</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Participant",
  data() {
    return {
      participantId: 0,
      name: "",
      contactNumber: 0,
      upcomingAppointments: [],
      selectedParticipant: null,
      gender: "",
      genders: ["Female", "Male"],
      dialogUpdate: false,
      dialogRegister: false,
      dialogDelete: false
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
              "This participant's name already exists!. Please introduce another one or write the complete name."
            );
          }
        });
        if (!existingName) {
          this.participantId = this.getId();
          this.registerParticipant({
            participantId: this.participantId,
            name: this.name,
            contactNumber: this.contactNumber,
            upcomingAppointments: [],
            gender: this.gender
          });
          this.clearBoxes();
          this.cancelRegister();
        }
      }
    },
    _updateParticipant() {
      if (this.validateData()) {
        alert("All fields must be filled.");
      } else {
        console.log(this.selectedParticipant + "uno");
        this.participantList.forEach(participant => {
          if (participant.participantId === this.selectedParticipant) {
            console.log(this.selectedParticipant + "dos");
            this.updateParticipant({
              participantId: participant.participantId,
              name: this.name,
              contactNumber: this.contactNumber,
              upcomingAppointments: [],
              gender: this.gender
            });
            this.clearBoxes();
            this.cancelUpdate();
          }
        });
      }
    },
    _deleteParticipant() {
      this.participantList.forEach(participant => {
        if (participant.participantId === this.selectedParticipant) {
          if (participant.upcomingAppointments.length === 0) {
            console.log(
              this.selectedParticipant,
              participant.upcomingAppointments.length
            );
            this.deleteParticipant(participant);
            this.cancelDelete();
          } else {
            alert(
              "The participant has upcoming appointments, it can't be removed."
            );
          }
        }
      });
    },
    validateData() {
      if (
        this.name === "" ||
        this.contactNumber < 1000000 ||
        this.gender === ""
      ) {
        return true;
      }
    },
    getId() {
      let lastId = this.participantList[this.participantList.length - 1]
        .participantId;
      return parseInt(lastId + 1);
    },
    clearBoxes() {
      this.name = "";
      this.contactNumber = 0;
      this.gender = "";
    },
    cancelRegister() {
      this.selectedParticipant = null;
      this.dialogRegister = false;
    },
    cancelUpdate() {
      this.selectedParticipant = null;
      this.dialogUpdate = false;
    },
    cancelDelete() {
      this.selectedParticipant = null;
      this.dialogDelete = false;
    },
    openRegister() {
      this.dialogUpdate = true;
    },
    openUpdate(participantId) {
      this.selectedParticipant = participantId;
      this.dialogUpdate = true;
    },
    openDelete(participantId) {
      this.selectedParticipant = participantId;
      this.dialogDelete = true;
    }
  }
};
</script>
