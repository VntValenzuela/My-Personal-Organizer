<template>
  <div class="participants">
    <div>
      <v-btn
        id="redirectToHome"
        class="ma-2"
        color="#DAA520"
        fab
        dark
        fixed
        right
        @click.stop="redirectToHome()"
      >
        <v-icon large>home</v-icon>
      </v-btn>
    </div>
    <v-container class="my-10" grid-list-md>
      <h1><b>PARTICIPANTS</b></h1>
      <br />
      <v-btn
        id="register"
        dark
        color="#D2691E"
        @click.stop="openRegisterParticipantDialog()"
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
          <v-card class="ma-3" max-width="250" color="#DFE1E5">
            <v-container>
              <v-img
                v-if="participant.gender === 'Male'"
                src="../assets/male.png"
                class="ma-3"
              ></v-img>
              <v-img
                v-if="participant.gender === 'Female'"
                src="../assets/female.png"
                class="ma-3"
              ></v-img>
            </v-container>
            <v-card-title>
              <div class="text-center">{{ participant.name }}</div>
            </v-card-title>
            <v-card-subtitle>
              <div class="text-center">{{ participant.contactNumber }}</div>
            </v-card-subtitle>
            <v-container center>
              <v-btn
                class="ma-2"
                id="update"
                color="#DAA520"
                :rounded="true"
                @click.stop="
                  openUpdateParticipantDialog(participant.participantId)
                "
                >Update</v-btn
              >
              <v-btn
                class="ma-2"
                id="delete"
                color="#E23C3C"
                :rounded="true"
                @click.stop="
                  openDeleteParticipantDialog(participant.participantId)
                "
                >Delete</v-btn
              >
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <participant ref="participantDialogs" />
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
      deleteForm: false,
      selectedId: 1
    };
  },
  computed: {
    ...mapGetters(["getParticipants"]),
    participants() {
      return this.getParticipants;
    }
  },
  methods: {
    openRegisterParticipantDialog() {
      this.$refs.participantDialogs.openRegister();
    },
    openUpdateParticipantDialog(participantId) {
      this.$refs.participantDialogs.openUpdate(participantId);
    },
    openDeleteParticipantDialog(participantId) {
      this.$refs.participantDialogs.openDelete(participantId);
    },
    redirectToHome() {
      this.$router.push("/");
    }
  }
};
</script>
