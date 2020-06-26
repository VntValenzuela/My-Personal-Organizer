<template>
  <div class="participants">
    <v-container class="my-10" grid-list-md>
      <h1><b>PARTICIPANTS</b></h1>
      <br />
      <v-btn
        id="register"
        dark
        color="#D2691E"
        @click.stop="registerForm = true"
      >
        REGISTER
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <br />
      <br />
      <v-layout row wrap>
        <v-flex
          xs12
          sm6
          md4
          lg3
          v-for="(participant, index) in participants"
          :key="index"
        >
          <v-card class="text-center" max-width="250" color="#F5F5F5">
            <v-container>
              <v-img
                v-if="participant.gender === 'Male'"
                src="../assets/male.png"
                class="grey darken-4"
              ></v-img>
              <v-img
                v-if="participant.gender === 'Female'"
                src="../assets/female.png"
                position="center"
                class="grey darken-4"
              ></v-img>
              <!-- <v-icon light :size="60" right>mdi-account-circle</v-icon> -->
            </v-container>
            <v-card-title>
              <div class="text-center">{{ participant.name }}</div>
            </v-card-title>
            <v-card-subtitle>
              <div class="grey--text">{{ participant.contactNumber }}</div>
            </v-card-subtitle>
            <v-container center>
              <v-btn
                class="ma-2"
                id="update"
                color="blue"
                :rounded="true"
                @click.stop="
                  (updateForm = true), (selectedId = participant.participantID)
                "
                >Update</v-btn
              >
              <v-btn
                class="ma-2"
                id="delete"
                color="red"
                :rounded="true"
                v-if="participant.upcomingAppointments.length === 0"
                @click.stop="
                  (deleteOption = true),
                    (selectedId = participant.participantID)
                "
                >Delete</v-btn
              >
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <participant
      :dialog-register="registerForm"
      :dialog-update="updateForm"
      :dialog-delete="deleteOption"
      :selected-participant="selectedId"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Participant from "../components/Participant.vue";

export default {
  name: "ParticipantView",
  components: {
    Participant
  },
  data() {
    return {
      registerForm: false,
      updateForm: false,
      deleteOption: false,
      selectedId: 0
    };
  },
  computed: {
    ...mapGetters(["getParticipants"]),
    participants() {
      return this.getParticipants;
    }
  }
};
</script>
