<template>
  <div>
    <v-dialog v-model="dialogRegister" persistent max-width="645px">
      <v-card>
        <v-col cols="12">
          <v-text-field
            v-model="name"
            counter
            maxlength="30"
            required
            label="Name"
          ></v-text-field>
          <v-text-field
            v-model="contactNumber"
            counter="7"
            required
            label="Contact Number"
          ></v-text-field>
          <v-select
            v-model="gender"
            :items="genders"
            required
            label="Gender"
          ></v-select>
        </v-col>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialogRegister = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click.stop="_registerParticipant()"
            >Register</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogUpdate" persistent max-width="645px">
      <v-card>
        <v-col cols="12">
          <v-text-field
            v-model="name"
            counter
            maxlength="30"
            required
            label="New Name"
          ></v-text-field>
          <v-text-field
            v-model="contactNumber"
            counter="7"
            required
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
          <v-btn color="blue darken-1" text @click="dialogUpdate = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click.stop="_updateParticipant()"
            >Update</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" persistent max-width="500px">
      <v-card>
        <v-card-title>Please, confirm to delete the participant</v-card-title>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialogDelete = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click.stop="_deleteParticipant()"
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
  props: {
    dialogRegister: {
      type: Boolean,
      default: false
    },
    dialogUpdate: {
      type: Boolean,
      default: false
    },
    dialogDelete: {
      type: Boolean,
      default: false
    },
    selectedParticipant: Number
  },
  data() {
    return {
      participantId: 0,
      name: "",
      contactNumber: 0,
      upcomingAppointments: [],
      gender: "",
      genders: ["Female", "Male"]
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
            contactNumber: parseInt(this.contactNumber),
            upcomingAppointments: [],
            gender: this.gender
          });
          this.clearBoxes();
          //this.dialogRegister = false;
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
              contactNumber: parseInt(this.contactNumber),
              upcomingAppointments: [],
              gender: this.gender
            });
            this.clearBoxes();
            //this.dialogUpdate = false;
          }
        });
      }
    },
    _deleteParticipant() {
      this.participantList.forEach(participant => {
        if (participant.participantId === this.selectedParticipant) {
          if (participant.upcomingAppointments.length === 0) {
            this.deleteParticipant(participant);
            this.dialogDelete = false;
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
        return;
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
    }
  }
};
</script>
