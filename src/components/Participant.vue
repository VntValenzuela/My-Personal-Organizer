<template>
  <div>
    <v-dialog
      id="dialogRegister"
      v-model="dialogRegister"
      max-width="645px"
      persistent
    >
      <v-card shaped>
        <v-col cols="12">
          <v-text-field
            id="newNameInput"
            v-model="name"
            counter
            maxlength="40"
            label="Name"
            outlined
            shaped
            required
          ></v-text-field>
          <v-text-field
            id="newContactNumberInput"
            v-model="contactNumber"
            counter="8"
            label="Contact Number"
            outlined
            shaped
            required
          ></v-text-field>
          <v-select
            id="newGenderInput"
            v-model="gender"
            :items="genders"
            label="Gender"
            outlined
            shaped
            required
          ></v-select>
        </v-col>
        <v-card-actions>
          <v-btn
            id="cancelRegisterButton"
            class="ma-2"
            outlined
            color="#4682B4"
            @click.stop="cancelRegister()"
            >Cancel</v-btn
          >
          <v-btn
            id="registerButton"
            class="ma-2"
            outlined
            color="#4682B4"
            @click.stop="_registerParticipant()"
            >Register</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      id="dialogUpdate"
      v-model="dialogUpdate"
      max-width="645px"
      persistent
    >
      <v-card shaped>
        <v-col cols="12">
          <v-text-field
            id="updatedNameInput"
            v-model="name"
            counter
            maxlength="40"
            label="New Name"
            outlined
            shaped
            required
          ></v-text-field>
          <v-text-field
            id="updatedContactNumberInput"
            v-model="contactNumber"
            counter="8"
            label="New Contact Number"
            outlined
            shaped
            required
          ></v-text-field>
          <v-select
            id="updatedGenderInput"
            v-model="gender"
            :items="genders"
            required
            label="Gender"
            outlined
            shaped
          ></v-select>
        </v-col>
        <v-card-actions>
          <v-btn
            id="cancelUpdateButton"
            class="ma-2"
            outlined
            color="#4682B4"
            @click.stop="cancelUpdate()"
            >Cancel</v-btn
          >
          <v-btn
            id="updateButton"
            class="ma-2"
            outlined
            color="#4682B4"
            @click.stop="_updateParticipant()"
            >Update</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      id="dialogDelete"
      v-model="dialogDelete"
      max-width="500px"
      persistent
    >
      <v-card shaped>
        <v-card-title> Please, confirm to delete the participant</v-card-title>
        <v-card-actions>
          <v-btn
            id="cancelDeleteButton"
            class="ma-2"
            outlined
            color="#4682B4"
            @click.stop="cancelDelete()"
            >Cancel</v-btn
          >
          <v-btn
            id="deleteButton"
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
      contactNumber: null,
      upcomingAppointments: [],
      selectedParticipant: 1,
      gender: "",
      genders: ["Female", "Male"],
      dialogUpdate: false,
      dialogRegister: false,
      dialogDelete: false
    };
  },
  computed: {
    ...mapGetters(["getParticipants", "getScheduledAppointments"]),
    participantList() {
      return this.getParticipants;
    },
    scheduledAppointmentsList() {
      return this.getScheduledAppointments;
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
        this.participantList.forEach(participant => {
          if (participant.participantId === this.selectedParticipant) {
            this.updateParticipant({
              participantId: participant.participantId,
              name: this.name,
              contactNumber: this.contactNumber,
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
          if (this.getAmountUpcomingAppointments() === 0) {
            this.deleteParticipant(participant);
            this.cancelDelete();
          } else {
            alert(
              "The participant can't be removed, it has upcoming appointments:. \n  " +
                this.upcomingAppointments +
                "\n Please, remove the participant from each appointment and try again."
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
      this.dialogRegister = true;
    },
    openUpdate(participantId) {
      this.selectedParticipant = participantId;
      this.dialogUpdate = true;
      let participantSelected = this.participantList.find(
        participant => participant.participantId === participantId
      );
      if (participantSelected !== null) {
        this.name = participantSelected.name;
        this.contactNumber = participantSelected.contactNumber;
        this.gender = participantSelected.gender;
      }
    },
    openDelete(participantId) {
      this.selectedParticipant = participantId;
      this.dialogDelete = true;
    },
    getAmountUpcomingAppointments() {
      let amount = 0;
      this.upcomingAppointments = [];
      this.scheduledAppointmentsList.forEach(appointment => {
        let participantSelected = this.participantList.find(
          participant => participant.participantId === this.selectedParticipant
        );
        if (appointment.participants.includes(participantSelected.name)) {
          amount++;
          this.upcomingAppointments.push(appointment.name);
        }
      });
      return amount;
    }
  }
};
</script>
